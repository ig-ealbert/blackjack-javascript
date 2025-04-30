export function toPrintableValue(numericValue: number) {
  const printableValueMap: Record<number, string> = {
    1: "A",
    11: "J",
    12: "Q",
    13: "K",
  };

  if (numericValue in printableValueMap) {
    return printableValueMap[numericValue];
  } else return numericValue.toString();
}

export function toImageName(suit: number) {
  const suitToImageMap: Record<number, string> = {
    0: "Hearts",
    1: "Diamonds",
    2: "Clubs",
    3: "Spades",
  };
  return suitToImageMap[suit];
}
