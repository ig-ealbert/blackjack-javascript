import { cardProps } from "@/types/cardProps";
import { toImageName, toPrintableValue } from "@/lib/display";

export function getImage(props: cardProps) {
  return props.isFaceUp
    ? `url(${toImageName(props.suit)}.png)`
    : `url(CardBack.png)`;
}

export function getText(props: cardProps) {
  return props.isFaceUp ? toPrintableValue(props.value) : "";
}
