import { cardInfo } from "@/types/cardInfo";

export function checkForBlackJack(
  playerCards: cardInfo[],
  dealerCards: cardInfo[]
) {
  if (hasBlackJack(dealerCards) && hasBlackJack(playerCards)) {
    return "Both players have BlackJack!  Double win!";
  } else if (hasBlackJack(dealerCards)) {
    return "The dealer has BlackJack!  You lose!";
  } else if (hasBlackJack(playerCards)) {
    return "You have BlackJack!  You win!";
  }
  return "";
}

function hasBlackJack(hand: cardInfo[]) {
  return (
    (hand[0].value >= 10 && hand[1].value === 1) ||
    (hand[1].value >= 10 && hand[0].value === 1)
  );
}

export function determineWinner(player: number, dealer: number) {
  if (player > 21 && dealer > 21) {
    return "Both players went over 21!  Double-loss!";
  } else if (player > 21) {
    return "You went over 21!  You lose!";
  } else if (dealer > 21) {
    return "The dealer went over 21.  You win!";
  } else if (player > dealer) {
    return "You beat the dealer.  You win!";
  } else {
    // dealer wins ties
    return "The dealer matched or beat your hand.  You lose!";
  }
}

export function getTotalHandValue(cards: cardInfo[]) {
  let total = 0;
  for (let i = 0; i < cards.length; i++) {
    total += cards[i].value < 10 ? cards[1].value : 10;
  }
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === 1 && total < 12) {
      total += 10; // treat an ace as an 11 instead of the default 1
    }
  }
  return total;
}
