'use client'

import React from "react";
import Card from "./card";
import { cardInfo } from "@/types/cardInfo";
import { deckInfo } from "@/types/deckInfo";
import { getTopCardOfDeck, getTopXCardsOfDeck, initializeDeck } from "@/lib/deck";
import { checkForBlackJack, determineWinner, getTotalHandValue } from "@/lib/evaluation";

export default function Board() {
  const [deck, setDeck] = React.useState<deckInfo>(initializeDeck());
  const [playerCards, setPlayerCards] = React.useState<cardInfo[]>([]);
  const [dealerCards, setDealerCards] = React.useState<cardInfo[]>([]);
  const [message, setMessage] = React.useState<string>("");
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  React.useEffect(initializeGame, []);

  function initializeGame() {
    const playerStartingHand = getTopXCardsOfDeck(2, deck);
    setPlayerCards(playerStartingHand);
    const newDeck = deck.slice();
    newDeck.splice(newDeck.length - 2, 2);
    const dealerStartingHand = getTopXCardsOfDeck(2, newDeck)
    setDealerCards(dealerStartingHand);
    newDeck.splice(newDeck.length - 2, 2);
    setDeck(newDeck);
    const blackJackMessage = checkForBlackJack(playerStartingHand, dealerStartingHand);
    setMessage(blackJackMessage);
    setIsGameOver(blackJackMessage.length > 0);
  }

  function drawCardForPlayer() {
    const hand = playerCards.slice();
    hand.push(getTopCardOfDeck(deck));
    if (getTotalHandValue(hand) > 21) {
      setMessage("You went over 21!  You lose!");
      setIsGameOver(true);
    }
    const newDeck = deck.slice();
    newDeck.splice(deck.length - 1, 1);
    setDeck(newDeck);
    setPlayerCards(hand);
  }

  function resolveDealerHand() {
    let value = getTotalHandValue(dealerCards);
    const newHand = dealerCards.slice();
    const newDeck = deck.slice();
    while (value < 17) { // dealer hits on 16, stays on 17
      newHand.push(getTopCardOfDeck(newDeck));
      newDeck.splice(newDeck.length - 1, 1);
      value = getTotalHandValue(newHand);
    }
    setDealerCards(newHand);
    return value;
  }

  function finishGame() {
    const dealerHandValue = resolveDealerHand();
    const playerHandValue = getTotalHandValue(playerCards);
    const result = determineWinner(playerHandValue, dealerHandValue);
    setIsGameOver(true);
    setMessage(result);
  }

  return (
    <>
    <table id="cardTable">
      <thead>
        <tr>
          <th>Player's Hand</th>
          <th>Dealer's Hand</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td id="playerCards">
            {playerCards.map((card) => (
              <Card key={`${card.value}${card.suit}`}
                value={card.value} suit={card.suit} isFaceUp={true}></Card>
            ))}
          </td>
          <td id="dealerCards">
            {dealerCards.map((card, index) => (
              <Card key={`${card.value}${card.suit}`}
                value={card.value} suit={card.suit} isFaceUp={isGameOver || index >= 1}></Card>
            ))}
          </td>
        </tr>
      </tbody>
  </table>
  <div id="buttonsAndMessage">
    <input id="hit" type="button" value="Hit" disabled={isGameOver || deck.length < 1}
      onClick={drawCardForPlayer} />
    <input id="stay" type="button" value="Stay" disabled={isGameOver}
      onClick={finishGame} />
    <input id="restartGame" type="button" value="Reset" disabled={!isGameOver}
      onClick={() => window.location.reload()} />
    <label id="message">{message}</label>
  </div>
  </>
  )
}
