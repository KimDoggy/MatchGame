$(document).ready(function(){
    MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
    $('.resetButton').click(function() {
      MatchGame.renderCards(MatchGame.generateCardValues(), $('#game'));
    });
  });

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */
// Generate a random array
MatchGame.generateCardValues = function () {
  var a = [1, 2, 3, 4, 5, 6, 7, 8];
  var inOrderedArray = [];
  var randomOrderedArray = [];
  for(var i = 0; i < 8;  i++){
    inOrderedArray.push(a[i]);
    inOrderedArray.push(a[i]);
  }
  while(inOrderedArray.length !== 0){
    var randomIndex = Math.floor(Math.random() * inOrderedArray.length);
    randomOrderedArray.push(inOrderedArray[randomIndex]);
    inOrderedArray.splice(randomIndex, 1);
  }
  return randomOrderedArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
// To keep track of the flipped cards


// Render cards on the board
MatchGame.renderCards = function(cardValues, $game) {
  var colorArray = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $game.empty();
  $game.data('flipStatus', []);
  for(var i = 0; i < cardValues.length; i++){
    var $newCard = $('<div class="card col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>');
    $newCard.data('value', cardValues[i]);
    $newCard.data('flipped', false);
    $newCard.data('color', colorArray[cardValues[i]-1]);
    $game.append($newCard);
  }

     $('.card').click(function() {
       MatchGame.flipCard($(this), $('#game'))
     });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('flipped') === false){
    $('.card').css('font-weight', '900');
    $('.card').css('font-size', '7rem');
    $('.card').css('color', 'rgb(255, 255, 255)');
    $card.data('flipped', true);
    $game.data("flipStatus").push($card);
    $card.css('background-color', $card.data('color'));
    $card.text($card.data("value"));
  }else{
    return;
  }

  if ($game.data("flipStatus").length === 2) {
  $('body').css("background-color", " rgb(255, 242, 242)")
  if(($game.data('flipStatus')[0].data('value')) === ($game.data('flipStatus')[1].data('value'))){

    $game.data("flipStatus")[0].css("background-color", "rgb(153, 153, 153)");
    $game.data("flipStatus")[0].css("color", "rgb(204, 204, 204)");
    $game.data("flipStatus")[1].css("background-color", "rgb(153, 153, 153)");
    $game.data("flipStatus")[1].css("color", "rgb(204, 204, 204)");


    while($game.data('flipStatus').length !== 0){
      $game.data('flipStatus').pop();
    }
  }else{
    var card1 = $game.data('flipStatus')[0];
    var card2 = $game.data('flipStatus')[1];
    window.setTimeout(function(){
      card1.css("background-color", "rgb(32, 64, 86)");
      card1.text("");
      card1.data("flipped", false);
      card2.css("background-color", "rgb(32, 64, 86)");
      card2.text("");
      card2.data("flipped", false);
    }, 350);
    $game.data("flipStatus", []);
  }
}
};
