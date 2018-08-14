// Create an array to hold the suit of each card
var suitArray = ["clubs", "diamonds", "hearts", "spades"];
// Create an array to hold the rank of each suit
var rankArray = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "King", "Queen"];
// Array to hold the value of each card
var rankValue = {"Ace" : 1, "2" : 2, "3" : 3, "4" : 4, "5" : 5, "6" : 6, "7" : 7, "8" : 8, "9" : 9, "10" : 10, "Jack" : 10, "King" : 10, "Queen" : 10};
// Create a deck to hold every suit of card with every rank
var deck = {clubs : rankArray, diamonds : rankArray, hearts : rankArray, spades : rankArray};

// Constructor for a Card object
var Card = function(suit, rank) {
  // Assign member variables to store suit and rank as strings
  this.suit = suit;
  this.rank = rank;
  // Return the value of the card using 'rankValue' object of key-value pairs with the key as the card rank string
  this.getCardValue = function() {
    return rankValue[this.rank];
  }
}

// Returns a card object which can be used to get the value
function dealCard() {
// ACCESS A RANDOM CARD FROM THE DECK:  
  // Access a random index from the suit array
  var randomSuit = Math.floor(Math.random()*suitArray.length);
  // Access a random index from the rank array that is held within deck
  // The use of 'deck[suitArray[cardSuit]]' is to search the remaining deck after the removal of cards from the deck with each 'dealCard()' call
  var randomRank = Math.floor(Math.random()*(deck[suitArray[randomSuit]].length-1));
  // Use the random indices to get the rank and suit strings from their arrays
  var rank = rankArray[randomRank];
  var suit = suitArray[randomSuit]

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

// Demonstrate that the value of the card can be accessed through the 'Card' object member function
var testCard = dealCard();
console.log(testCard.getCardValue());
