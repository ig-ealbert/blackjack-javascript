import { describe, it } from "@jest/globals";
import assert from "node:assert";
import { getImage, getText } from "./card";

describe("Card helper functions", () => {
  const faceUpProps = {
    value: 1,
    suit: 0,
    isFaceUp: true,
    isHidden: false,
    onClick: () => null,
  };

  const faceDownProps = {
    value: 1,
    suit: 0,
    isFaceUp: false,
    isHidden: false,
    onClick: () => null,
  };

  it("Gets face up image", () => {
    const image = getImage(faceUpProps);
    assert.strictEqual(image, `url(Hearts.png)`);
  });

  it("Gets face down image", () => {
    const image = getImage(faceDownProps);
    assert.strictEqual(image, `url(CardBack.png)`);
  });

  it("Gets text when face up", () => {
    const text = getText(faceUpProps);
    assert.strictEqual(text, "A");
  });

  it("Gets text when face down", () => {
    const text = getText(faceDownProps);
    assert.strictEqual(text, "");
  });
});
