import { decimalToHex } from '$lib/utils/conversionUtils';
import type { Choice } from '$lib/components/ChoiceInput.svelte';

export type Question = {
	decimalNumbers: number[];
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

	const decimalNumbers = new Set<number>();

	while (decimalNumbers.size < 3) {
		const num = Math.floor(Math.random() * maxHex + 1);
		decimalNumbers.add(num);
	}

	return {
		decimalNumbers: Array.from(decimalNumbers),
		areIndicatorsEnabled
	};
}

export function generateHexChoices(decimal: number): Choice[] {
	const correctHex = decimalToHex(decimal);
	const choices: Choice[] = [{ value: correctHex, isCorrect: true }];
	const usedValues = new Set<string>([correctHex]);
	const wrongChoices: Choice[] = [];

	// Generate wrong hex values from nearby decimals
	const variations = [decimal + 1, decimal - 1, decimal + 16, decimal - 16];

	for (const value of variations) {
		if (value > 0) {
			const hex = decimalToHex(value);
			if (!usedValues.has(hex)) {
				wrongChoices.push({ value: hex, isCorrect: false });
				usedValues.add(hex);
			}
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
