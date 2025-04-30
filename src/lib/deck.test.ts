import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  getTopCardOfDeck,
  getTopXCardsOfDeck,
  initializeDeck,
  setupOrderedDeck,
} from "./deck";

describe("Initialize deck", () => {
  it("Creates a deck with 52 cards", () => {
    const deck = initializeDeck();
    assert.strictEqual(deck.length, 52);
  });

  it("Shuffles the deck", () => {
    const deck = initializeDeck();
    assert.notDeepStrictEqual(deck, setupOrderedDeck());
  });

  it("Gets the top card of the deck", () => {
    const deck = initializeDeck();
    const topCard = getTopCardOfDeck(deck);
    assert.ok(topCard.suit <= 3);
    assert.ok(topCard.value <= 13);
  });

  it("Gets the top two cards of the deck", () => {
    const deck = initializeDeck();
    const topCards = getTopXCardsOfDeck(2, deck);
    assert.ok(topCards[0].suit <= 3);
    assert.ok(topCards[0].value <= 13);
    assert.ok(topCards[1].suit <= 3);
    assert.ok(topCards[1].value <= 13);
    assert.notDeepStrictEqual(topCards[0], topCards[1]);
  });
});
