const deck = initializeDeck();
let playerCards = [];
let dealerCards = [];
dealStartingHands();

function initializeDeck() {
  const deck = [];
  const availableCards = setupOrderedDeck();
  while (availableCards.length > 0) {
    const randomCard = randomInt(0, availableCards.length);
    deck.push(availableCards[randomCard]);
    availableCards.splice(randomCard, 1);
  }
  return deck;
}

function setupOrderedDeck() {
  const deckInProgress = [];
  for (let i = 1; i < 14; i++) { // 1 = ace, 11 = jack, 12 = queen, 13 = king
    for (let j = 0; j < 4; j++) { // 0 = hearts, 1 = diamonds, 2 = clubs, 3 = spades
      deckInProgress.push({value: i, suit: j, numericValue: i > 10 ? 10 : i});
    }
  }
  return deckInProgress;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function dealStartingHands() {
  deal(2, "player");
  deal(2, "dealer");
  checkForBlackJack();
}

function deal(numberOfCards, whichPlayer) {
  const hand = whichPlayer === "player" ? playerCards : dealerCards;
  const newCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    const topCard = deck.pop();
    hand.push(topCard);
    newCards.push(topCard);
  }
  updateUI(newCards, whichPlayer);
}

function checkForBlackJack() {
  if (hasBlackJack(dealerCards) && hasBlackJack(playerCards)) {
    endGame("Both players have BlackJack!  Double win!");
  }
  else if (hasBlackJack(dealerCards)) {
    endGame("The dealer has BlackJack!  You lose!");
  }
  else if (hasBlackJack(playerCards)) {
    endGame("You have BlackJack!  You win!");
  }
}

function hasBlackJack(hand) {
  return ((hand[0].numericValue === 10 && hand[1].value === 1) ||
          (hand[1].numericValue === 10 && hand[0].value === 1));
}

function updateUI(cards, whichPlayer) {
  const uiHand = whichPlayer === "player" ? "playerCards" : "dealerCards";
  for (let i = 0; i < cards.length; i++) {
    const isHidden = whichPlayer === "dealer" && i === 0 && cards.length === 2;
    const card = createCardInUI(cards[i], isHidden);
    const hand = document.getElementById(uiHand);
    hand.appendChild(card);
  }
  if (playerCards.length >= 11) { // decided max hand size is 11
    disableButton("hit");
  }
}

function createCardInUI(cardObject, hidden) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = hidden ? "&nbsp;" : toPrintableValue(cardObject.value);
  div.style.backgroundImage = hidden ? makeImageUrl(4) : makeImageUrl(cardObject.suit);
  return div;
}

function toPrintableValue(numericValue) {
  const numbers = [1, 11, 12, 13];
  const symbols = ["A", "J", "Q", "K"];
  const index = numbers.indexOf(numericValue);
  if (index !== -1) {
    return symbols[index];
  }
  else return numericValue;
}

function makeImageUrl(suit) {
  const images = ["Hearts.png", "Diamonds.png", "Clubs.png", "Spades.png", "CardBack.png"];
  const url = images[suit];
  return `url('${url}')`;
}

function finishGame() {
  const dealerHandValue = resolveDealerHand();
  const playerHandValue = getTotalHandValue(playerCards);
  determineWinner(playerHandValue, dealerHandValue);
}

function resolveDealerHand() {
  let value = getTotalHandValue(dealerCards);
  while (value < 17) { // dealer hits on 16, stays on 17
    deal(1, "dealer");
    value = getTotalHandValue(dealerCards);
  }
  return value;
}

function determineWinner(player, dealer) {
  if (player > 21 && dealer > 21) {
    endGame("Both players went over 21!  Double-loss!");
  }
  else if (player > 21) {
    endGame("You went over 21!  You lose!");
  }
  else if (dealer > 21) {
    endGame("The dealer went over 21.  You win!");
  }
  else if (player > dealer) { // dealer wins ties
    endGame("You beat the dealer.  You win!");
  }
  else {
    endGame("The dealer beat your hand.  You lose!");
  }
}

function getTotalHandValue(cards) {
  let total = 0;
  for (let i = 0; i < cards.length; i++) {
    total += cards[i].numericValue;
  }
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value === 1 && total < 12) {
      total += 10; // treat an ace as an 11 instead of the default 1
    }
  }
  return total;
}

function endGame(result) {
  showDealerCards();
  updateMessage(result);
  updateButtonsForEndGame();
}

function showDealerCards() {
  const hand = document.getElementById("dealerCards");
  const firstCard = hand.childNodes[0];
  firstCard.innerHTML = toPrintableValue(dealerCards[0].value);
  firstCard.style.backgroundImage = makeImageUrl(dealerCards[0].suit);
}

function updateMessage(result) {
  const message = document.getElementById("message");
  message.innerHTML = result;
}

function updateButtonsForEndGame() {
  disableButton("hit");
  disableButton("stay");
  const resetButton = document.getElementById("restartGame");
  resetButton.classList.add("greenBorder");
}

function disableButton(buttonName) {
  const button = document.getElementById(buttonName);
  button.disabled = true;
}
