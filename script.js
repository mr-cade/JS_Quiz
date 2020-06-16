var countdownDisplay = document.getElementById("countdown");
var scoreDisplay = document.getElementById("score");
var highscoreBtn = document.getElementById("highscore");
var startBtn = document.getElementById("start");
var question = document.getElementById("question");
var answer1 = document.getElementById("opt1");
var answer2 = document.getElementById("opt2");
var answer3 = document.getElementById("opt3");
var answer4 = document.getElementById("opt4");
var lastResultDisplay = document.getElementById("lastResult");
var questions = [
    {
        question: "test",
        opt1: "correct",
        opt2: "wrong",
        opt3: "wrong",
        opt4: "wrong",
        correct: "opt1"
    },{
        question: "test 2",
        opt1: "wrong",
        opt2: "correct",
        opt3: "wrong",
        opt4: "wrong",
        correct: "opt2"
    },{
        question: "test 3",
        opt1: "wrong",
        opt2: "wrong",
        opt3: "correct",
        opt4: "wrong",
        correct: "opt3"
    }
]
var totalSeconds = 60;
var secondsElapsed = 0;
var interval;
var i = 0;
var score = 0;

function startCountdown() {
        interval = setInterval(function() {
            var secondsLeft = totalSeconds - secondsElapsed;
            if (secondsLeft >= 0) {
            secondsElapsed++;
            countdownDisplay.textContent = secondsLeft;
            } else {
                alert("Pencils Down!");
                clearInterval(interval);
                totalSeconds = 60;
            }
        }, 1000);
    } 

function renderQuestion() {
    if (i < questions.length) {
        question.textContent = questions[i].question;
        answer1.textContent = questions[i].opt1;
        answer2.textContent = questions[i].opt2;
        answer3.textContent = questions[i].opt3;
        answer4.textContent = questions[i].opt4;
    } else {
        clearInterval(interval);
        alert("Quiz Complete!");
        totalSeconds = 60;
        i = 0
        document.getElementById("questionBlock").style.display = "none";
        lastResultDisplay.textContent = "";

    }
}

function startQuiz() {
    startCountdown();
    renderQuestion();
    document.getElementById("questionBlock").style.display = "block";
}

function checkAnswer() {
    console.log("event target: " + event.target)
    console.log(questions[i].correct)
    if (event.target.matches(questions[i].correct)) {
        lastResultDisplay.textContent = "correct!";
        score++;
        console.log(score);
        scoreDisplay.textContent = score;
    } else {
        lastResultDisplay.textContent = "incorrect :(";
        score--;
        scoreDisplay.textContent = score;
    }
    i++;
    renderQuestion();
}

function addHighscore() {

}

startBtn.addEventListener("click", startQuiz);
answer1.addEventListener("click", checkAnswer);
answer2.addEventListener("click", checkAnswer);
answer3.addEventListener("click", checkAnswer);
answer4.addEventListener("click", checkAnswer);