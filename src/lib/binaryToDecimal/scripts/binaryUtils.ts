export function decimalToBinary(decimal: number): string {
  return decimal.toString(2);
}

export function binaryToDecimal(binary: string): number {
  return parseInt(binary, 2);
}
