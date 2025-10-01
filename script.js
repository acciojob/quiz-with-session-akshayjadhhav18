// your JS code here.

// --- Global Variables and DOM Elements ---
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve progress from Session Storage. If none, initialize as an empty array.
// 'userAnswers' will store the selected choice for each question index.
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// --- Functions to implement functionality requirements ---

/**
 * Updates the user's answer array and saves it to Session Storage.
 * This function is called every time a radio button changes state (i.e., when a user makes a selection).
 */
function saveProgress(event) {
    const radio = event.target;
    // Extract the question index from the name attribute "question-i"
    const questionIndex = parseInt(radio.name.split('-')[1]); 
    const choiceValue = radio.value;

    // Save the selected value to the userAnswers array at the corresponding index
    userAnswers[questionIndex] = choiceValue;

    // Save the updated array to Session Storage
    sessionStorage.setItem("progress", JSON.stringify(userAnswers));
}

/**
 * Calculates the score, displays it, and saves it to Local Storage.
 */
function submitQuiz() {
    let score = 0;
    const totalQuestions = questions.length;

    for (let i = 0; i < totalQuestions; i++) {
        // userAnswers[i] will be the selected answer (string) or undefined/null if not answered
        const selectedAnswer = userAnswers[i];
        const correctAnswer = questions[i].answer;

        // Edge Case: Still evaluate based on answered questions
        if (selectedAnswer && selectedAnswer === correctAnswer) {
            score++;
        }
    }

    // Display the final score
    scoreElement.textContent = `Your score is ${score} out of ${totalQuestions}.`;

    // Store the final score in Local Storage
    localStorage.setItem("score", score);

    // Optional: Clear session storage after submission since the quiz is done
    sessionStorage.removeItem("progress"); 
}

// --- Event Listeners and Initial Load ---

// 1. Check for and display the last score from Local Storage on load
const lastScore = localStorage.getItem("score");
if (lastScore !== null) {
    const total = questions.length;
    scoreElement.textContent = `Your last score was: ${lastScore} out of ${total}.`;
}

// 2. Add an event listener to the parent element (#questions) to detect changes on radio buttons.
// This uses event delegation for efficiency and ensures we capture choices even after refresh.
questionsElement.addEventListener('change', (event) => {
    if (event.target.type === 'radio') {
        saveProgress(event);
    }
});

// 3. Attach the submit function to the button
submitButton.addEventListener("click", submitQuiz);


// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      // Critical: This checks the loaded progress (userAnswers) and sets 'checked'
      if (userAnswers[i] === choice) { 
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();