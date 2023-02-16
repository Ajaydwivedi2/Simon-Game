var computerSequence = [];
var userSequence = [];

var level = 0;
var started = false;

$(document).keydown(function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

function nextSequence() {

    level++;
    userSequence = [];

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = document.querySelectorAll(".btn")[randomNumber].id;
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    computerSequence.push(randomColor);
    playMusic(randomColor);

}

$(".btn").click(function () {

    var pressedColor = this.id;
    $("#" + pressedColor).addClass("pressed");

    setTimeout(() => {
        $("#" + pressedColor).removeClass("pressed");
    }, 100);
    
    userSequence.push(pressedColor);
    MatchColor();
    playMusic(pressedColor);
})

function MatchColor() {

    if (computerSequence[userSequence.length - 1] === userSequence[userSequence.length - 1]) {

        if (computerSequence[userSequence.length] === userSequence[userSequence.length]) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }

    } else {
        $("*").addClass("game-over");
        $("#level-title").text("game over, press any key to restart");
        playMusic("wrong");

        setTimeout(() => {
            $("*").removeClass("game-over");
            startOver();
        }, 200);
    }
}

function startOver() {
    started = false;
    computerSequence = [];
    level = 0;
}

function playMusic(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}