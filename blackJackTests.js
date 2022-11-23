QUnit.test( "The deck should have 52 cards in it after it is initialized", function (assert ) {
  const deck = initializeDeck();
  assert.equal( deck.length, 52, "The deck has 52 cards in it." );
});

QUnit.test( "A randomly generated number is exclusive of the maximum value", function (assert ) {
  const number = randomInt(0, 52);
  assert.ok( number < 52, "The number must be less than the max (not equal)." );
});

QUnit.test( "A randomly generated number is inclusive of the minimum value", function (assert ) {
  const number = randomInt(0, 52);
  assert.ok( number >= 0, "The number must be greater than or equal to the min." );
});

QUnit.test( "The player should start by being dealt 2 cards", function (assert ) {
  assert.equal( playerCards.length, 2, "The player has 2 cards." );
});

QUnit.test( "The dealer should start by being dealt 2 cards", function (assert ) {
  assert.equal( dealerCards.length, 2, "The dealer has 2 cards." );
});

QUnit.test( "If the player starts with blackjack, they win immediately", function (assert ) {
  playerCards = [{value: 11, suit: 1, numericValue: 10}, {value: 1, suit: 0, numericValue: 11}];
  assert.equal( hasBlackJack(playerCards), true, "The player wins with blackjack." );
});

QUnit.test( "If the dealer starts with blackjack, they win immediately", function (assert ) {
  dealerCards = [{value: 11, suit: 1, numericValue: 10}, {value: 1, suit: 0, numericValue: 11}];
  assert.equal( hasBlackJack(dealerCards), true, "The dealer wins with blackjack." );
});

QUnit.test( "The first card dealt to the dealer should be hidden", function (assert ) {
  dealerCards = [{value: 9, suit: 0, numericValue: 9}, {value: 8, suit: 1, numericValue: 8}];
  const hand = document.getElementById("dealerCards");
  hand.innerHTML = "";
  updateUI(dealerCards, "dealer");
  assert.equal( hand.childNodes[0].innerHTML, "&nbsp;", "The dealer's first card is hidden." );
});

QUnit.test( "Dealing 1 card to a player increases their hand size by 1", function (assert ) {
  deal(1, "player");
  assert.equal( playerCards.length, 3, "The player has 3 cards." );
});

QUnit.test( "Dealing 1 card to the dealer increases their hand size by 1", function (assert ) {
  deal(1, "dealer");
  assert.equal( dealerCards.length, 3, "The dealer has 3 cards." );
});

QUnit.test( "The player cannot have more than 11 cards", function (assert ) {
  for (let i = 0; i < 9; i++) {
    deal(1, "player");
  }
  const hitButton = document.getElementById("hit");
  assert.equal( hitButton.disabled, true, "The hit button is disabled if the hand has 11 cards.");
});

QUnit.test( "An ace is displayed as an A", function (assert ) {
  const value = toPrintableValue(1);
  assert.equal( value, "A", "An ace has a printable value of A." );
});

QUnit.test( "A jack is displayed as a J", function (assert ) {
  const value = toPrintableValue(11);
  assert.equal( value, "J", "A jack has a printable value of J." );
});

QUnit.test( "A queen is displayed as a Q", function (assert ) {
  const value = toPrintableValue(12);
  assert.equal( value, "Q", "A queen has a printable value of Q." );
});

QUnit.test( "A king is displayed as an K", function (assert ) {
  const value = toPrintableValue(13);
  assert.equal( value, "K", "A king has a printable value of K." );
});

QUnit.test( "Any number from 2 to 9 is displayed as that number", function (assert ) {
  const value = randomInt(2, 9);
  const print = toPrintableValue(value);
  assert.equal( print, value, "A number is displayed as that number." );
});

QUnit.test( "The hearts suit uses the hearts image", function (assert ) {
  const suit = 0;
  const image = makeImageUrl(suit);
  assert.equal( image, "url('Hearts.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The diamonds suit uses the diamonds image", function (assert ) {
  const suit = 1;
  const image = makeImageUrl(suit);
  assert.equal( image, "url('Diamonds.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The clubs suit uses the clubs image", function (assert ) {
  const suit = 2;
  const image = makeImageUrl(suit);
  assert.equal( image, "url('Clubs.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "The spades suit uses the spades image", function (assert ) {
  const suit = 3;
  const image = makeImageUrl(suit);
  assert.equal( image, "url('Spades.png')", "An appropriate image is chosen for the suit." );
});

QUnit.test( "A hidden card uses the card back image", function (assert ) {
  const suit = 4;
  const image = makeImageUrl(suit);
  assert.equal( image, "url('CardBack.png')", "A hidden card shows the back of the card." );
});

QUnit.test( "The total hand value of two cards is the sum of those cards", function (assert ) {
  playerCards = [{value: 5, suit: 0, numericValue: 5}, {value: 12, suit: 1, numericValue: 10}];
  const total = getTotalHandValue(playerCards);
  assert.equal( total, 15, "The cards are summed correctly." );
});

QUnit.test( "The total hand value of three cards is the sum of those cards", function (assert ) {
  playerCards = [{value: 5, suit: 0, numericValue: 5},
                 {value: 6, suit: 1, numericValue: 6},
                 {value: 7, suit: 2, numericValue: 7}];
  const total = getTotalHandValue(playerCards);
  assert.equal( total, 18, "The cards are summed correctly." );
});

QUnit.test( "An ace is counted as an 11 if the total hand value is less than 12", function (assert ) {
  playerCards = [{value: 1, suit: 0, numericValue: 1}, {value: 6, suit: 1, numericValue: 6}];
  const total = getTotalHandValue(playerCards);
  assert.equal( total, 17, "The cards are summed correctly." );
});

QUnit.test( "An ace is counted as a 1 if the total hand value is greater than 11", function (assert ) {
  playerCards = [{value: 1, suit: 0, numericValue: 1},
                 {value: 6, suit: 1, numericValue: 6},
                 {value: 5, suit: 2, numericValue: 5}];
  const total = getTotalHandValue(playerCards);
  assert.equal( total, 12, "The cards are summed correctly." );
});

QUnit.test( "The dealer will hit if their hand value is 16 or lower", function (assert ) {
  const dealerTotal = resolveDealerHand();
  assert.ok( dealerTotal > 16, "The dealer cannot keep a hand of 16 or lower." );
});

QUnit.test( "The dealer must reveal their hidden card at the end of the game", function (assert ) {
  showDealerCards();
  const hand = document.getElementById("dealerCards");
  const card = hand.childNodes[0];
  const cardValue = card.innerHTML;
  assert.notEqual( cardValue, "&nbsp;", "The dealer reveals the hidden card." );
});

QUnit.test( "Both players lose if they both go over 21", function (assert ) {
  determineWinner(22, 22);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "Both players went over 21!  Double-loss!", "Both players lose." );
});

QUnit.test( "The player loses if they are over 21 and the dealer is not", function (assert ) {
  determineWinner(22, 19);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "You went over 21!  You lose!", "The player loses." );
});

QUnit.test( "The player wins if they are not over 21 and the dealer is", function (assert ) {
  determineWinner(19, 22);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "The dealer went over 21.  You win!", "The player wins." );
});

QUnit.test( "The player wins if they beat the hand of the dealer", function (assert ) {
  determineWinner(19, 18);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "You beat the dealer.  You win!", "The player wins." );
});

QUnit.test( "The player loses if the dealer beats their hand", function (assert ) {
  determineWinner(18, 19);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "The dealer beat your hand.  You lose!", "The player loses." );
});

QUnit.test( "The player loses if they tie with the dealer", function (assert ) {
  determineWinner(18, 18);
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "The dealer beat your hand.  You lose!", "The player loses." );
});

QUnit.test( "The hit button should be disabled when the game is over", function (assert ) {
  updateButtonsForEndGame();
  const hitButton = document.getElementById("hit");
  assert.equal( hitButton.disabled, true, "The hit button should be disabled." );
});

QUnit.test( "The stay button should be disabled when the game is over", function (assert ) {
  updateButtonsForEndGame();
  const stayButton = document.getElementById("stay");
  assert.equal( stayButton.disabled, true, "The stay button should be disabled." );
});

QUnit.test( "The reset button should be highlighted when the game is over", function (assert ) {
  updateButtonsForEndGame();
  const resetButton = document.getElementById("restartGame");
  assert.equal( resetButton.classList.contains("greenBorder"), true, "The reset button should have a green border." );
});

QUnit.test( "A message should be displayed when the game is over", function (assert ) {
  endGame("You win!");
  const message = document.getElementById("message");
  assert.equal( message.innerHTML, "You win!", "A message should be displayed when the game is over." );
});
