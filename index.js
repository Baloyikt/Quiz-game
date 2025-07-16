const questions = [
    {
        question: "Which South African invented the first successful heart transplant?",
        answers: [
            {text: "Elon Mask", correct: false},
            {text: "Christiaan Barnard", correct: true},
            {text: "Desmond Tutu", correct: false},
            {text: "Mark Shuttleworth", correct: false},
        ]
    },
    {
       question: "Which country is famous for inventing pizza?",
        answers: [
            {text: "Spain", correct: false},
            {text: "Italy", correct: true},
            {text: "Greece", correct: false},
            {text: "France", correct: false},
        ] 
    },
    {
      question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: "Pablo Picasso", correct: false},
            {text: "Michelangelo", correct: false},
            {text: "Leonardo da Vinci", correct: true},
        ]   
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Mars", correct: true},
            {text: "Earth", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Venus", correct: false},
        ] 
    },
    {
        question: "Which South African city is known as the Mother City?",
        answers: [
            {text: "Durban", correct: false},
            {text: "Johannesburg", correct: false},
            {text: "Cape Town", correct: true},
            {text: "Pretoria", correct: false},
        ] 
    },
    {
        question: "Who wrote Romeo and Juliet?",
        answers: [
            {text: "William Wordsworth", correct: false},
            {text: "William Shakespeare", correct: true},
            {text: "Charles Dickens", correct: false},
            {text: "Jane Austen", correct: false},
        ] 
    }
];

const  questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

