import { describe, it } from "@jest/globals";
import assert from "node:assert";
import {
  checkForBlackJack,
  determineWinner,
  getTotalHandValue,
} from "./evaluation";

describe("Evaluate hands", () => {
  it("Finds blackjack in player starting hand", () => {
    const playerHand = [
      { suit: 0, value: 1 },
      { suit: 0, value: 11 },
    ];
    const dealerHand = [
      { suit: 1, value: 4 },
      { suit: 1, value: 5 },
    ];
    const blackJack = checkForBlackJack(playerHand, dealerHand);
    assert.strictEqual(blackJack, "You have BlackJack!  You win!");
  });

  it("Finds blackjack in dealer starting hand", () => {
    const playerHand = [
      { suit: 1, value: 4 },
      { suit: 1, value: 5 },
    ];
    const dealerHand = [
      { suit: 0, value: 1 },
      { suit: 0, value: 11 },
    ];
    const blackJack = checkForBlackJack(playerHand, dealerHand);
    assert.strictEqual(blackJack, "The dealer has BlackJack!  You lose!");
  });

  it("Finds blackjack in both players' starting hands", () => {
    const playerHand = [
      { suit: 1, value: 1 },
      { suit: 1, value: 13 },
    ];
    const dealerHand = [
      { suit: 0, value: 1 },
      { suit: 0, value: 11 },
    ];
    const blackJack = checkForBlackJack(playerHand, dealerHand);
    assert.strictEqual(blackJack, "Both players have BlackJack!  Double win!");
  });

  it("Finds no blackjack in either starting hand", () => {
    const playerHand = [
      { suit: 0, value: 2 },
      { suit: 0, value: 3 },
    ];
    const dealerHand = [
      { suit: 1, value: 4 },
      { suit: 1, value: 5 },
    ];
    const blackJack = checkForBlackJack(playerHand, dealerHand);
    assert.strictEqual(blackJack, "");
  });

  it("Detects both players went over 21", () => {
    const result = determineWinner(22, 23);
    assert.strictEqual(result, "Both players went over 21!  Double-loss!");
  });

  it("Detects the player went over 21", () => {
    const result = determineWinner(22, 20);
    assert.strictEqual(result, "You went over 21!  You lose!");
  });

  it("Detects the dealer went over 21", () => {
    const result = determineWinner(20, 22);
    assert.strictEqual(result, "The dealer went over 21.  You win!");
  });

  it("Detects that you beat the dealer", () => {
    const result = determineWinner(20, 19);
    assert.strictEqual(result, "You beat the dealer.  You win!");
  });

  it("Detects that you lost to the dealer", () => {
    const result = determineWinner(19, 20);
    assert.strictEqual(
      result,
      "The dealer matched or beat your hand.  You lose!"
    );
  });

  it("Detects that you tied with the dealer (loss)", () => {
    const result = determineWinner(19, 19);
    assert.strictEqual(
      result,
      "The dealer matched or beat your hand.  You lose!"
    );
  });

  it("Computes a total hand value with no aces", () => {
    const playerHand = [
      { suit: 0, value: 10 },
      { suit: 0, value: 8 },
    ];
    const value = getTotalHandValue(playerHand);
    assert.strictEqual(value, 18);
  });

  it("Computes a total hand value with an ace as a 1", () => {
    const playerHand = [
      { suit: 0, value: 10 },
      { suit: 0, value: 8 },
      { suit: 1, value: 1 },
    ];
    const value = getTotalHandValue(playerHand);
    assert.strictEqual(value, 19);
  });

  it("Computes a total hand value with an ace as an 11", () => {
    const playerHand = [
      { suit: 0, value: 8 },
      { suit: 1, value: 1 },
    ];
    const value = getTotalHandValue(playerHand);
    assert.strictEqual(value, 19);
  });
});
