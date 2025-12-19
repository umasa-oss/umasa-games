import { binaryToDecimal, decimalToBinary } from '$lib/utils/conversionUtils';
import type { Choice } from '$lib/components/ChoiceInput.svelte';

type BinaryQuestion = {
	bitCount: number;
	binaryNumbers: string[];
	areIndicatorsEnabled: boolean;
};

type LevelToBits = {
	level: number;
	bits: number;
};

function generateQuestions(level: number): BinaryQuestion {
	const levelBits: LevelToBits[] = [
		{ level: 0, bits: 2 }, // Level 1: bis zu 2 Binärstellen (Zahlen bis 3)
		{ level: 6, bits: 3 }, // Level 2: bis zu 3 Binärstellen (Zahlen bis 7)
		{ level: 12, bits: 4 }, // Level 3: bis zu 4 Binärstellen (Zahlen bis 15)
		{ level: 21, bits: 5 }, // Level 4: bis zu 5 Binärstellen (Zahlen bis 31)
		{ level: 30, bits: 6 }, // Level 5: bis zu 6 Binärstellen (Zahlen bis 63)
		{ level: 42, bits: 7 }, // Level 6: bis zu 7 Binärstellen (Zahlen bis 127)
		{ level: 60, bits: 8 } // Level 7: bis zu 8 Binärstellen (Zahlen bis 256)
	];

	// Ermittle die Anzahl der Bits für das angegebene Level
	const bits = levelBits.reduce((acc, lb) => (lb.level <= level ? lb.bits : acc), 8);
	const areIndicatorsEnabled = levelBits.find((lb) => lb.level === level) !== undefined;
	console.log('Indicators:' + areIndicatorsEnabled + ' for level: ' + level);

	const maxNumber = Math.pow(2, bits) - 1;
	const binaryNumbers = new Set<string>();

	// Generiere drei einzigartige Binärzahlen
	while (binaryNumbers.size < 3) {
		const num = Math.floor(Math.random() * maxNumber + 1);
		const binary = decimalToBinary(num).padStart(bits, '0');
		binaryNumbers.add(binary);
	}

	// Konvertiere das Set zurück in ein Array
	const uniqueBinaryNumbers = Array.from(binaryNumbers);

	const question: BinaryQuestion = {
		bitCount: bits,
		binaryNumbers: uniqueBinaryNumbers,
		areIndicatorsEnabled: areIndicatorsEnabled
	};
	console.log('Generated question for level ' + level + ': ', question);
	return question;
}

// Generiere genau 3 Antwortmöglichkeiten: 1 richtige + 2 falsche durch Flippen einzelner Bits
function generateDecimalChoices(binaryString: string): Choice[] {
	const correctDecimal = binaryToDecimal(binaryString);
	const choices: Choice[] = [{ value: correctDecimal.toString(), isCorrect: true }];
	const usedValues = new Set<number>([correctDecimal]);
	const wrongChoices: Choice[] = [];

	// Für jedes Bit: Flip und erstelle falsche Antwort
	for (let i = 0; i < binaryString.length; i++) {
		const binaryArray = binaryString.split('');
		binaryArray[i] = binaryArray[i] === '0' ? '1' : '0';
		const flippedBinary = binaryArray.join('');
		const flippedDecimal = binaryToDecimal(flippedBinary);

		// Nur hinzufügen, wenn noch nicht vorhanden
		if (!usedValues.has(flippedDecimal)) {
			wrongChoices.push({ value: flippedDecimal.toString(), isCorrect: false });
			usedValues.add(flippedDecimal);
		}
	}

	// Wähle zufällig 2 falsche Antworten aus
	const shuffledWrong = wrongChoices.sort(() => Math.random() - 0.5);
	choices.push(...shuffledWrong.slice(0, 2));

	// Shuffle alle 3 Choices
	for (let i = choices.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[choices[i], choices[j]] = [choices[j], choices[i]];
	}

	return choices;
}

export { generateQuestions, generateDecimalChoices };
