

// Generate quiz questins and possible answers
function buildQuiz(){
    const output = [];

    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
      const answers = [];
        for(letter in currentQuestion.answers){
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>

          </div>`
        );
      }
    );

    quizContainer.innerHTML = output.join("");
}

  // Working out how many correct answers and tallying the score

  function showResults(){
   
    const answerContainers = quizContainer.querySelectorAll('.answers');
      
    let numCorrect = 0;

    myQuestions.forEach( 
      (currentQuestion, questionNumber) => {

      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
     
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        
        numCorrect++;
      }

    });

    // show number of correct answers out of total
    
    prompt(`You scored ${numCorrect} out of ${myQuestions.length}`, "Please enter your initials");
    
  }
// Apply pagination to show only one question at a time

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
      restartButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
      restartButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const timerEl = document.getElementById("clockdiv");
  

// Questions and answers for the quiz
let myQuestions = [
  {
    question: "1. Who invented JavaScript?",
    answers: {
      a: "Mark Zuckerberg",
      b: "Brendan Eich",
      c: "Bill Gates",
      d: "Jeff Bezos"
    },
    correctAnswer: "b"
  },
  {
    question: "2. What does DOM stand for in Javascript?",
    answers: {
      a: "Dedicated Object Methods",
      b: "Document Object Methods",
      c: "Decision On Model",
      d: "Document Object Model"
    },
    correctAnswer: "d"
  },
  {
    question: "3. JavaScript can display 'data' in different ways. Which of the below is NOT a way to display data?",
    answers: {
      a: "Writing into an HTML element, using innerHTML",
      b: "Writing into an alert box, using window.alert()",
      c: "Writing into the browser console, using console.log()",
      d: "Writing into the HTML output using document.style()"

    },
    correctAnswer: "d"
  },
  {
    question: "4. In JavaScript, the first character of an identifier (such as a variable, keyword or function) cannot be:",
    answers: {
      a: "a letter",
      b: "a number",
      c: "an underscore (_)",
      d: "a dollar sign ($)"
    },
    correctAnswer: "b"
  },
  {
    question: "5. Which company developed JavaScript?",
    answers: {
      a: "Netscape",
      b: "Microsoft",
      c: "Facebook",
      d: "Google"
    },
    correctAnswer: "a"
  },
  {
    question: "6. Which symbol is NOT used for comments in Javascript?",
    answers: {
      a: "//",
      b: "/*",
      c: "$",
      d: "*/"
    },
    correctAnswer: "c"
  },
  {
    question: "7. What would be the result of 3+2+'7'?",
    answers: {
      a: "12",
      b: "57",
      c: "327",
      d: "39"
    },
    correctAnswer: "b"
  },
  {question: "8. What is NOT a type of Pop Up box available in JavaScript?",
  answers: {
    a: "Alert",
    b: "Confirm",
    c: "Prompt",
    d: "Button"
  },
  correctAnswer: "d"
},
{question: "9. What is an anonymous function in JavaScript?",
answers: {
  a: "A function that is declared without any named identifier",
  b: "A function called 'anonymous'",
  c: "A function with no value",
  d: "A function with arrays"
},
correctAnswer: "a"
},
{question: "10. What is event bubbling?",
answers: {
  a: "An event where bubbles are formed",
  b: "When the event listener is the 'bubble' icon",
  c: "If the handler of the child is clicked, the handler of parent will also work as if it were clicked too",
  d: "Where an error message appears when the event listener is clicked"
},
correctAnswer: "c"
}
]

// Start the quiz
buildQuiz();

// Moving between questions

const restartButton = document.getElementById("restart");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// Show the first slide
showSlide(currentSlide);


// Setting the timer
function setTimer() {
  var timeLeft = 3;

  var timeInterval = setInterval(function() {
    timerEl.textContent = timeLeft + " seconds";
    timeLeft--;

    if (timeLeft === 0) {
      timerEl.textContent = "Your time is up!";
      clearInterval(timeInterval);
      alert("The quiz is over");

      }   
    

  }, 1000);
}

setTimer();

// Event listeners

submitButton.addEventListener("click", showResults);
nextButton.addEventListener("click", showNextSlide);



