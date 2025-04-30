import { cardInfo } from "@/types/cardInfo";

export function initializeDeck() {
  const deck = [];
  const availableCards = setupOrderedDeck();
  while (availableCards.length > 0) {
    const randomCard = randomInt(0, availableCards.length);
    deck.push(availableCards[randomCard]);
    availableCards.splice(randomCard, 1);
  }
  return deck;
}

export function setupOrderedDeck() {
  const deck = [];
  for (let i = 1; i < 14; i++) {
    // 1 = ace, 11 = jack, 12 = queen, 13 = king
    for (let j = 0; j < 4; j++) {
      // 0 = hearts, 1 = diamonds, 2 = clubs, 3 = spades
      deck.push({ value: i, suit: j });
    }
  }
  return deck;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getTopCardOfDeck(deck: cardInfo[]) {
  return deck[deck.length - 1];
}

export function getTopXCardsOfDeck(x: number, deck: cardInfo[]) {
  const cards = [];
  for (let i = 0; i < x; i++) {
    cards.push(deck[deck.length - 1 - i]);
  }
  return cards;
}
