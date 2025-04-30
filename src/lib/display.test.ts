import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { toPrintableValue, toImageName } from "./display";

describe("Display helper functions", () => {
  it("Displays A for Ace", () => {
    const text = toPrintableValue(1);
    assert.strictEqual(text, "A");
  });

  it("Displays J for Jack", () => {
    const text = toPrintableValue(11);
    assert.strictEqual(text, "J");
  });

  it("Displays Q for Queen", () => {
    const text = toPrintableValue(12);
    assert.strictEqual(text, "Q");
  });

  it("Displays K for King", () => {
    const text = toPrintableValue(13);
    assert.strictEqual(text, "K");
  });

  it("Hearts are suit 0", () => {
    const suit = toImageName(0);
    assert.strictEqual(suit, "Hearts");
  });

  it("Diamonds are suit 1", () => {
    const suit = toImageName(1);
    assert.strictEqual(suit, "Diamonds");
  });

  it("Clubs are suit 2", () => {
    const suit = toImageName(2);
    assert.strictEqual(suit, "Clubs");
  });

  it("Spades are suit 3", () => {
    const suit = toImageName(3);
    assert.strictEqual(suit, "Spades");
  });
});
