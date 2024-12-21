const questions = [
    {
        question: "Which is the largest animal in the world ?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world ?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    },
];

const startBtn = document.getElementById('startBtn');
const questionsEl = document.getElementById('questions');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    updateScore();
}

function updateScore() {
    scoreEl.style.display = "inline";
    scoreEl.innerText = `Score > ${score} / ${questions.length}`;
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsEl.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        console.log(answer);
        const button = document.createElement("button");;
        button.innerHTML = answer.text;
        button.classList.add("ansBtn");
        answersEl.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function selectAnswer(event) {
    const selectedAns = event.target;
    const isCorrect = selectedAns.dataset.correct === "true";

    if (isCorrect) {
        selectedAns.classList.add("correct");
        score++;
        updateScore();
    } else {
        selectedAns.classList.add("incorrect");
    }

    Array.from(answersEl.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    const button = nextBtn.querySelector("button");
    button.innerText = "Next";
    nextBtn.style.display = "block";
}

function resetState() {
    nextBtn.style.display = "none";
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild);
    }
}

function showScore() {
    resetState();
    questionsEl.innerHTML = `You scored ${score} out of ${questions.length} !`;
    const button = nextBtn.querySelector("button");
    button.innerText = "Play Again!";
    nextBtn.style.display = "block";
    scoreEl.style.display = "none";
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showLandingPage() {
    const quiz = document.getElementById('quiz');
    quiz.style.display = "none";
    startBtn.style.display = "block";
}
function hideLandingPage() {
    const quiz = document.getElementById('quiz');
    quiz.style.display = "block";
    startBtn.style.display = "none";
    startQuiz();
}



nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextQuestion();
    } else {
        showLandingPage();
    }
});

startBtn.addEventListener("click", () => {
    hideLandingPage();
});

showLandingPage();