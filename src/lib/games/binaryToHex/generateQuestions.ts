import { binaryToHex } from '$lib/utils/conversionUtils';
import type { Choice } from '$lib/components/ChoiceInput.svelte';

export type Question = {
	bitCount: number;
	binaryNumbers: string[];
	areIndicatorsEnabled: boolean;
};

type LevelToBits = {
	level: number;
	bits: number;
};

export function generateQuestions(level: number): Question {
	const levelBits: LevelToBits[] = [
		{ level: 0, bits: 4 }, // Level 1: 4 Bits (0-F)
		{ level: 6, bits: 8 }, // Level 2: 8 Bits (00-FF)
		{ level: 15, bits: 12 }, // Level 3: 12 Bits (000-FFF)
		{ level: 30, bits: 16 } // Level 4: 16 Bits (0000-FFFF)
	];

	const bits = levelBits.reduce((acc, lb) => (lb.level <= level ? lb.bits : acc), 16);
	const areIndicatorsEnabled = levelBits.find((lb) => lb.level === level) !== undefined;

	const maxNumber = Math.pow(2, bits) - 1;
	const binaryNumbers = new Set<string>();

	while (binaryNumbers.size < 3) {
		const num = Math.floor(Math.random() * maxNumber + 1);
		const binary = num.toString(2).padStart(bits, '0');
		binaryNumbers.add(binary);
	}

	return {
		bitCount: bits,
		binaryNumbers: Array.from(binaryNumbers),
		areIndicatorsEnabled
	};
}

export function generateHexChoices(binaryString: string): Choice[] {
	const correctHex = binaryToHex(binaryString);
	const choices: Choice[] = [{ value: correctHex, isCorrect: true }];
	const usedValues = new Set<string>([correctHex]);
	const wrongChoices: Choice[] = [];

	// Generate wrong answers by flipping nibbles (4 bits)
	for (let i = 0; i < binaryString.length; i += 4) {
		const binaryArray = binaryString.split('');
		// Flip one bit in the nibble
		const bitIndex = i + Math.floor(Math.random() * 4);
		if (bitIndex < binaryArray.length) {
			binaryArray[bitIndex] = binaryArray[bitIndex] === '0' ? '1' : '0';
			const flippedBinary = binaryArray.join('');
			const flippedHex = binaryToHex(flippedBinary);

			if (!usedValues.has(flippedHex)) {
				wrongChoices.push({ value: flippedHex, isCorrect: false });
				usedValues.add(flippedHex);
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
