//global variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;
var level = 0;
var started = false;
var currentYear = new Date().getFullYear();
$("footer").html("Created By Ashraf Ramadan @ " + currentYear);

function reset() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  var currentYear = new Date().getFullYear();
  $("footer").html("Created By Ashraf Ramadan @ " + currentYear);
  $("h1").html("Press A Key to Start");
}

// add click event handler to the buttons
$(".btn").click(function () {
  if (started) {
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // check if the user made the same number of clicks stored in game pattern
    if (gamePattern.length == userClickedPattern.length) {
      // if same check if he made correct sequance
      if (gamePattern.toString() == userClickedPattern.toString()) {
        userClickedPattern = [];
        setTimeout(function () {
          nextSequence();
        }, 200);
      } else {
        GameOver();
        reset();
      }
    }
  } else {
    started = true;
    userChosenColour = $(this).attr("id");
    gamePattern.push(userChosenColour);
    nextSequence();
  }
  $("footer").html(gamePattern + " >>>> " + userClickedPattern);
});

// add keypress event handler
$(document).keypress(function (event) {
  if (!started) {
    started = true;
    nextSequence();
  }
});

$(document).on("keydown", function (event) {
  if (event.key === "Escape") {
    reset();
  }
});

function nextSequence() {
  setTimeout(function () {}, 10000);
  level++;
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function () {
    animatePress(randomChosenColour);
  }, 400);
  $("footer").html(gamePattern + " === " + userClickedPattern);
}

function animatePress(pressedKey) {
  playSound(pressedKey);
  $("#" + pressedKey).addClass("pressed");
  setTimeout(function () {
    $("#" + pressedKey).removeClass("pressed");
  }, 100);
}

function playSound(btn) {
  var x = new Audio("./sounds/" + btn + ".mp3");
  x.play();
}

function GameOver() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
  $("h1").html("Game Over press any key to continue.");
}

