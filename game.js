const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Inside which HTML element do we put the Javascript??",
    choice1: "<script>",
    choice2: "<javscript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js>'",
    choice2: "<script name='xxx.js>'",
    choice3: "<script src='xxx.js>'",
    choice4: "<script filef='xxx.js>'",
    answer: 3
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4
  }
]

// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {

  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // Go to end page
    return window.location.assign('/end.html');
  }

  // Each new question, the available question gets up
  // And after that update the innerText
  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${MAX_QUESTIONS}`;

  // Update Progress Bar
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion[`choice${number}`];
  })

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    // Is the selected answer same as the correct answer? Yes, correct. No, incorrect.
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';

    // If you get the correct answer, score will increase by the constant you set.
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    // Debug answer
    // console.log(selectedAnswer == currentQuestion.answer);

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  })
})

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();