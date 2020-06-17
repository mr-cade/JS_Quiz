//html element variables
var countdownDisplay = document.getElementById("countdown");
var scoreDisplay = document.getElementById("score");
var highscoreBtn = document.getElementById("highscore");
var saveHighscoreBtn = document.getElementById("saveHighscore");
var newHighscoreInput = document.getElementById("newHighscore");
var highscoreList = document.getElementById("highscoreList");
var startBtn = document.getElementById("start");
var question = document.getElementById("question");
var questionBlock = document.getElementById("questionBlock");
var answer1 = document.getElementById("opt1");
var answer2 = document.getElementById("opt2");
var answer3 = document.getElementById("opt3");
var answer4 = document.getElementById("opt4");
var lastResultDisplay = document.getElementById("lastResult");

//function variables
var totalSeconds = 30;
var secondsElapsed = 0;
var interval;
var i = 0;
var score = 0;

// Questions from: https://www.latestinterviewquestions.com/javascript-multiple-choice-questions-answers
var questions = [
    {
        question: "1. JavaScript is ______ language.",
        opt1: "Scripting",
        opt2: "Programming",
        opt3: "a Computer",
        opt4: "Application",
        correct: "opt1"
    },{
        question: "2. The behavior of the document elements can be defined by",
        opt1: "Using document object",
        opt2: "Registering appropriate event handlers",
        opt3: "Using element object",
        opt4: "All of the above",
        correct: "opt2"
    },{
        question: "3. JavaScript code between a pair of “script” tags are called",
        opt1: "Non-inline",
        opt2: "External",
        opt3: "Referenced",
        opt4: "Inline",
        correct: "opt4"
    },{
        question: "4. What is the programming philosophy that argues that content and behavior should as much as possible be kept separate?",
        opt1: "Unobtrusive JavaScript",
        opt2: "Obtrusive JavaScript",
        opt3: "Inherited JavaScript",
        opt4: "Modular JavaScript",
        correct: "opt1"
    }
]

//functions
function startCountdown() {
    interval = setInterval(function() {
        var secondsLeft = totalSeconds - secondsElapsed;
        if (secondsLeft >= 0) {
        secondsElapsed++;
        countdownDisplay.textContent = secondsLeft;
        } else {
            questionBlock.style.display = "none";
            alert("Pencils Down!");
            totalSeconds = 30;
            clearInterval(interval);
        }
    }, 1000);
} 

function startQuiz() {
    score = 0;
    scoreDisplay.textContent = score;
    totalSeconds = 60;
    secondsElapsed = 0;
    startCountdown();
    renderQuestion();
    questionBlock.style.display = "block";
}

function renderQuestion() {
    if (i < questions.length) {
        question.textContent = questions[i].question;
        answer1.textContent = questions[i].opt1;
        answer2.textContent = questions[i].opt2;
        answer3.textContent = questions[i].opt3;
        answer4.textContent = questions[i].opt4;
    } else {
        console.log("score" + score);
        scoreDisplay.textContent = score; //score doesn't update on last question before quiz complete alert triggers
        alert("Quiz Complete!");
        $('#highscoreModal').modal('show');
        totalSeconds = 60;
        i = 0;
        clearInterval(interval);
        questionBlock.style.display = "none";
        lastResultDisplay.textContent = "";
    }
}

function checkAnswer() {
    if (event.target.id === questions[i].correct) {
        lastResultDisplay.textContent = "correct!";
        score++;
        scoreDisplay.textContent = score;
    } else {
        lastResultDisplay.textContent = "incorrect :( -5 seconds";
        scoreDisplay.textContent = score;
        secondsElapsed = secondsElapsed + 5;
    }
    i++;
    renderQuestion();
}

function addHighscore() {
    var newLi = document.createElement("li");
    newLi.textContent = newHighscoreInput.value + ": " + score;
    highscoreList.appendChild(newLi);
    newHighscoreInput.textContent = "";
}

//local storage
function setHighscores() {
    localStorage.setItem("Highscores", JSON.stringify(highscoreList));
}

function getHighscores() {

}

//event listeners
startBtn.addEventListener("click", startQuiz);
answer1.addEventListener("click", checkAnswer);
answer2.addEventListener("click", checkAnswer);
answer3.addEventListener("click", checkAnswer);
answer4.addEventListener("click", checkAnswer);
saveHighscoreBtn.addEventListener("click", addHighscore);