import type { Level } from '$lib/decimalToBinary/types/level';

export function generateQuestions(score: number): Level {
	let bitCount = 4;
	let isSumEnabled = false;
	let areIndicatorsEnabled = false;

	// Increase difficulty based on score
	if (score >= 5 && score < 10) {
		isSumEnabled = true;
	} else if (score >= 10 && score < 15) {
		isSumEnabled = true;
		bitCount = 5;
	} else if (score >= 15 && score < 20) {
		isSumEnabled = true;
		areIndicatorsEnabled = true;
		bitCount = 5;
	} else if (score >= 20 && score < 30) {
		isSumEnabled = true;
		areIndicatorsEnabled = true;
		bitCount = 6;
	} else if (score >= 30) {
		isSumEnabled = true;
		areIndicatorsEnabled = true;
		bitCount = 8;
	}

	const maxValue = Math.pow(2, bitCount) - 1;
	const numbers: number[] = [];

	for (let i = 0; i < 3; i++) {
		// Generate two numbers that when added don't overflow
		const num1 = Math.floor(Math.random() * (maxValue / 2));
		const num2 = Math.floor(Math.random() * (maxValue / 2));
		
		// Store the sum as the question (we'll need both addends in the component)
		numbers.push(num1 + num2);
	}

	return {
		bitCount,
		isSumEnabled,
		areIndicatorsEnabled,
		numbers
	};
}

export type { Level };
