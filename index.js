document.addEventListener("DOMContentLoaded", function() {
  // Array to hold the suit of each card
  var suitArray = ["Clubs", "Diamonds", "Hearts", "Spades"];
  // Array to hold the rank of each suit
  var rankArray = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q"];
  // Array to hold the value of each card
  var rankValue = {"A" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : 10, "J" : 10, "K" : 10, "Q" : 10};
  // Deck to hold every suit of card with every rank
  var deck = {Clubs : rankArray, Diamonds : rankArray, Hearts : rankArray, Spades : rankArray};

  // Constructor for a Card object
  var Card = function(suit, rank) {
    // Assign member variables to store suit and rank as strings
    this.suit = suit;
    this.rank = rank;
    // Return the value of the card using 'rankValue' object of key-value pairs with the key as the card rank string
    this.getCardValue = function() {
      return rankValue[this.rank];
    }
    // Alters the html to display the card number and suit
    this.displayCard = function() {
      // Access and change the element of the html that displays the card number
      var numberElementCard2 = document.getElementById('card2-number');
      var numberElement2Card2 = document.getElementById('card2-number2');
      displayNumber(this.rank, numberElementCard2);
      displayNumber(this.rank, numberElement2Card2);
      // Change the element of the html that displays the card suit
      var suitElementCard2 = document.getElementById('card2-suit');
      var suitElement2Card2 = document.getElementById('card2-suit2');
      displaySuitSymbol(this.suit, suitElementCard2);
      displaySuitSymbol(this.suit, suitElement2Card2);
    }
    this.displayCard2 = function() {
      // Access and change the element of the html that displays the card number
      var numberElementCard4 = document.getElementById('card4-number');
      var numberElement2Card4 = document.getElementById('card4-number2');
      displayNumber(this.rank, numberElementCard4);
      displayNumber(this.rank, numberElement2Card4);
      // Change the element of the html that displays the card suit
      var suitElementCard2 = document.getElementById('card4-suit');
      var suitElement2Card2 = document.getElementById('card4-suit2');
      displaySuitSymbol(this.suit, suitElementCard2);
      displaySuitSymbol(this.suit, suitElement2Card2);
    }
  }
  // Display suit symbol on each card
  function displaySuitSymbol(cardSuit, element) {
    switch (cardSuit) {
      case "Spades":
        // Set element to 'Spades' symbol
        element.innerHTML = "&#9824";
        break;
      case "Diamonds":
      element.innerHTML = "&#9830";
        break;
      case "Clubs":
      element.innerHTML = "&#9827";
        break;
      case "Hearts":
      element.innerHTML = "&#9829";
        break;
      default: "No suit passed"
    }
  }
  // Display number on each card
  function displayNumber(cardNumber, element) {
    element.innerHTML = cardNumber;
  }

  // Returns a card object
  function dealCard() {
  // ACCESS A RANDOM CARD FROM THE DECK:
    // Access a random index from the suit array
    var randomSuit = Math.floor(Math.random()*suitArray.length);
    // Access a random index from the rank array that is held within deck
    // The use of 'deck[suitArray[cardSuit]]' is to search the remaining deck after the removal of cards from the deck with each 'dealCard()' call
    var randomRank = Math.floor(Math.random()*(deck[suitArray[randomSuit]].length-1));
    // Use the random indices to get the rank and suit strings from their arrays
    var rank = rankArray[randomRank];
    var suit = suitArray[randomSuit];

  // REMOVE THAT CARD FROM THE DECK:
    // Create a temporary array to hold the rank array for that suit
    var tempArray = deck[suitArray[randomSuit]];
    // Remove the card from the temporary array
    tempArray.splice(randomRank, 1);
    // Update the deck using the temporary array (to remove the card)
    deck[suitArray[randomSuit]] = tempArray;
    // Create a 'Card' object using the Card() constructor
    var card = new Card(suit, rank);
    // Return the 'Card' object
    return card;
  }


  function playerOneTurn() {
    // Create a card from the deck
    var card = dealCard();
    // Access the card value and add it to their score
    playerOneScore += card.getCardValue();
    card.displayCard();
    updateScore();
    checkOver21();
  }

  function playerTwoTurn() {
    // Create a card from the deck
    var card = dealCard();
    // Access the card value and add it to their score
    playerTwoScore += card.getCardValue();
    card.displayCard2();
    updateScore();
    checkOver21();
  }

  // Update the score displayed in the html
  function updateScore() {
    var scores = document.getElementsByClassName('playerScores');
    scores[0].innerHTML = "Your Score: " + playerOneScore;
    scores[1].innerHTML = "Your Score: " + playerTwoScore;
  }

  // Runs when player one's stick button is clicked
  function onStickPlayerOne() {
    // log that player one has selected stick and check win result
    hasStuckPlayerOne = true;
    checkWin();
  }
  // Runs when player two's stick button is clicked
  function onStickPlayerTwo() {
    // log that player two has selected stick and check win result
    hasStuckPlayerTwo = true;
    checkWin();
  }
  // Access html elements to display the result
  var displayResults = document.getElementsByClassName('displayResult');

  function checkWin() {
    // win result is displayed only if both player's have stuck
    if (hasStuckPlayerOne && hasStuckPlayerTwo) {
      if (playerOneScore > playerTwoScore) {
        displayResults[0].innerHTML = ("You win!");
        displayResults[0].style.marginRight = "255px"; // Sets it to display beneath player one
      }
      else if (playerTwoScore > playerOneScore) {
        displayResults[1].innerHTML = ("You win!");
        displayResults[1].style.marginLeft = "255px";
      }
      disableButtons();
    }
  }

  function checkOver21() {
    if (playerOneScore > 21) {
      // Display losing message
      displayResults[0].innerHTML = ("Bust, you lose!");
      // Styling
      displayResults[0].style.marginRight = "255px"; // Sets it to display beneath player one
      displayResults[0].style.padding = "10px 0 0 0";
    }
    if (playerTwoScore > 21) {
      displayResults[1].innerHTML = ("Bust, you lose!");
      displayResults[1].style.marginLeft = "255px";
      displayResults[1].style.padding = "10px 0 0 0";
    }
    // disable all buttons after a win
    if (playerOneScore > 21 || playerTwoScore > 21) {
      disableButtons();
    }
  }

  function disableButtons() {
    hitButtons[0].removeEventListener("click", playerOneTurn);
    hitButtons[1].removeEventListener("click", playerTwoTurn);
    stickButtons[0].removeEventListener("click", onStickPlayerOne);
    stickButtons[1].removeEventListener("click", onStickPlayerTwo);
  }

  function dealInitialCards() {
    // Select first card to be displayed for player one
    var card1 = dealCard();
    // Select the corresponding html elements in order to display the card
    var suitElementCard1 = document.getElementById('card1-suit');
    var suitElement2Card1 = document.getElementById('card1-suit2');
    var numberElementCard1 = document.getElementById('card1-number');
    var numberElement2Card1 = document.getElementById('card1-number2');
    // Set the elements and update player score
    displayNumber(card1.rank, numberElementCard1);
    displayNumber(card1.rank, numberElement2Card1);
    displaySuitSymbol(card1.suit, suitElementCard1);
    displaySuitSymbol(card1.suit, suitElement2Card1);
    playerOneScore += card1.getCardValue();

    // Select first card to be displayed for player two
    var card3 = dealCard();
    // Select the corresponding html elements in order to display the card
    var suitElementCard3 = document.getElementById('card3-suit');
    var suitElement2Card3 = document.getElementById('card3-suit2');
    var numberElementCard3 = document.getElementById('card3-number');
    var numberElement2Card3 = document.getElementById('card3-number2');
    // Set the elements to a value and update player score
    displayNumber(card3.rank, numberElementCard3);
    displayNumber(card3.rank, numberElement2Card3);
    displaySuitSymbol(card3.suit, suitElementCard3);
    displaySuitSymbol(card3.suit, suitElement2Card3)
    playerTwoScore += card3.getCardValue();

    // Deals and displays a second card for each player
    playerOneTurn();
    playerTwoTurn();
  }

  // Event listeners for the 'Hit' buttons
  var hitButtons = document.getElementsByClassName('hit');
  hitButtons[0].addEventListener("click", playerOneTurn);
  hitButtons[1].addEventListener("click", playerTwoTurn);
  // Event listeners for the 'Stick' buttons
  var stickButtons = document.getElementsByClassName('stick');
  stickButtons[0].addEventListener("click", onStickPlayerOne);
  stickButtons[1].addEventListener("click", onStickPlayerTwo);

  // Inititalise scores
  var playerOneScore = 0;
  var playerTwoScore = 0;
  // Variable to log if either player has chosen to stick
  var hasStuckPlayerOne = false;
  var hasStuckPlayerTwo = false;

  // Run the game
  function playBlackJack() {
    // Deal two cards for the player to start the game
    dealInitialCards();
    // Further functions are run using event listeners to detect each player's clicks on each button
  }

  playBlackJack();
});
