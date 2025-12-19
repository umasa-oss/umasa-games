import { hexToBinary } from '$lib/utils/conversionUtils';

export type Question = {
	bitCount: number;
	hexNumbers: string[];
	areIndicatorsEnabled: boolean;
	isSumEnabled: boolean;
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
	const hexNumbers = new Set<string>();

	while (hexNumbers.size < 3) {
		const num = Math.floor(Math.random() * maxNumber + 1);
		const hex = num.toString(16).toUpperCase();
		hexNumbers.add(hex);
	}

	return {
		bitCount: bits,
		hexNumbers: Array.from(hexNumbers),
		areIndicatorsEnabled,
		isSumEnabled: areIndicatorsEnabled && bits > 4
	};
}
