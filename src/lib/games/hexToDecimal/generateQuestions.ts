import { hexToDecimal } from '$lib/utils/conversionUtils';
import type { Choice } from '$lib/components/ChoiceInput.svelte';

export type Question = {
	hexNumbers: string[];
	areIndicatorsEnabled: boolean;
};

export function generateQuestions(level: number): Question {
	const levelBits = [
		{ level: 0, maxHex: 0xf }, // 0-15
		{ level: 6, maxHex: 0xff }, // 0-255
		{ level: 15, maxHex: 0xfff }, // 0-4095
		{ level: 30, maxHex: 0xffff } // 0-65535
	];

	const maxHex = levelBits.reduce((acc, lb) => (lb.level <= level ? lb.maxHex : acc), 0xffff);
	const areIndicatorsEnabled = levelBits.find((lb) => lb.level === level) !== undefined;

	const hexNumbers = new Set<string>();

	while (hexNumbers.size < 3) {
		const num = Math.floor(Math.random() * maxHex + 1);
		const hex = num.toString(16).toUpperCase();
		hexNumbers.add(hex);
	}

	return {
		hexNumbers: Array.from(hexNumbers),
		areIndicatorsEnabled
	};
}

export function generateDecimalChoices(hexString: string): Choice[] {
	const correctDecimal = hexToDecimal(hexString);
	const choices: Choice[] = [{ value: correctDecimal.toString(), isCorrect: true }];
	const usedValues = new Set<number>([correctDecimal]);
	const wrongChoices: Choice[] = [];

	// Generate variations
	const variations = [
		correctDecimal + 1,
		correctDecimal - 1,
		correctDecimal + 16,
		correctDecimal - 16,
		Math.floor(correctDecimal * 1.1),
		Math.floor(correctDecimal * 0.9)
	];

	for (const value of variations) {
		if (value > 0 && !usedValues.has(value)) {
			wrongChoices.push({ value: value.toString(), isCorrect: false });
			usedValues.add(value);
		}
	}

	const shuffledWrong = wrongChoices.sort(() => Math.random() - 0.5);
	choices.push(...shuffledWrong.slice(0, 2));

	// Shuffle all choices
	for (let i = choices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[choices[i], choices[j]] = [choices[j], choices[i]];
	}

	return choices;
}
