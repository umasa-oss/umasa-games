export function binaryArrayToDecimal(binaryArray: number[]): number {
  return binaryArray.reduce((acc, val, index) => acc + val * Math.pow(2, binaryArray.length - index - 1), 0);
}
