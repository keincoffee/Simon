var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;


//Start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level: " + level );
    nextSequence();
    started = true;
  }
});

//update and store the userClickedPattern
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  // console.log(userClickPattern);

  checkAnswer(userClickPattern.length-1);
});

//check users answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

    console.log("success");

    if (userClickPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence()
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    startOver();
  }
}

function nextSequence() {

  userClickPattern = [];
  //update level everytime function is called
  level++;
  $("#level-title").text("Level: "+level);
  //select random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log(gamePattern);

  //Flash color block
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}




function playSound(name) {
  //Make Color sound
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}

//reset game after failure
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
