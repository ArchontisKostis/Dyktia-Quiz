
// Reference to Elements of Html File
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById('loader');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];


//====== Fetch Questions from Local JSON File ======
fetch("js/questions.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    })
    .catch( err => {
        console.log(err);
});

// CONSTANTS
const CORRECT_BONUS = 1;
let MAX_QUESTIONS = 21;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];     // [ ...smth ] --> Select smth and copy its elements to the array
    MAX_QUESTIONS = availableQuestions.length;

    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = "Ερώτηση: " + questionCounter + "/" + MAX_QUESTIONS;

    // Update the Progress Bar
    let progressNumber = (questionCounter/MAX_QUESTIONS) * 100;
    progressBarFull.style.width = progressNumber + '%';

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const colorToApply = selectedAnswer == currentQuestion.answer ? '#28a745' : '#dc3545';

        if(colorToApply == '#28a745'){
            incrementScore(CORRECT_BONUS);
        }

        const correctChoice = document.getElementById(currentQuestion.answer);
        correctChoice.style.backgroundColor = '#28a745'
        selectedChoice.style.backgroundColor = colorToApply;

        setTimeout(() => {
            selectedChoice.style.backgroundColor = '#0f5e68';
            correctChoice.style.backgroundColor = '#0f5e68';

            getNewQuestion();
        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score + '/' + MAX_QUESTIONS;
};
