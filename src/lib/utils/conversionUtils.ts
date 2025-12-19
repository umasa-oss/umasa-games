// Conversion utilities for binary, decimal, and hexadecimal

// Binary conversions
export function binaryToDecimal(binary: string): number {
	return parseInt(binary, 2);
}

export function binaryArrayToDecimal(binaryArray: number[]): number {
	return binaryArray.reduce((acc, val, index) => acc + val * Math.pow(2, binaryArray.length - index - 1), 0);
}

export function decimalToBinary(decimal: number): string {
	return decimal.toString(2);
}

export function binaryToHex(binary: string): string {
	return parseInt(binary, 2).toString(16).toUpperCase();
}

export function hexToBinary(hex: string): string {
	return parseInt(hex, 16).toString(2);
}

// Decimal conversions
export function decimalToHex(decimal: number): string {
	return decimal.toString(16).toUpperCase();
}

export function hexToDecimal(hex: string): number {
	return parseInt(hex, 16);
}
