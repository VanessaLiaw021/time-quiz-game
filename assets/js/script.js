//Global Variables
var showScoreButton = document.querySelector("#view-score");
var quizSection = document.querySelector("#quiz");
var restartButton = document.querySelector("#restart");
var highScoreSection = document.querySelector("#high-score");
var startButton = document.querySelector("#start-button");
var startMenuSection = document.querySelector("#start-menu");
var choiceButton = document.querySelector(".quiz-choices");
var decisionButton = document.querySelector(".quiz-choices button");
var initialsSection = document.querySelector("#initials");
var submitScore = document.querySelector("#submit");
var countDownTimer = document.querySelector("#timer");
var finalScore = document.querySelector("#final-score");
var timerInterval;
var listOfInitial = 1;
var score = 0;
var currentQuestionDisplay = 0;
var countDownTime = 75;

//List of question stored in an array
var listOfQuestions = [
    {
        //Question 1
        question: "What is NOT considered a front end developer tool?",
        choices: ["A. HTML", "B. JavaScript", "C. CSS", "D. Node"],
        answer: "D. Node"
    },
    {
        //Question 2
        question: "What method to used if you want to alert a message to a user?",
        choices: ["A. random()", "B. confirm()", "C. alert()", "D. prompt()"],
        answer: "C. alert()"
    }, 
    {
        //Question 3
        question: "What event listener would you use to make a button click and make it do something?",
        choices: ["A. mouseover", "B. keyboard", "C. click", "D. change"],
        answer: "C. click"
    }, 
    {
        //Question 4
        question: "What is the highest hierachy for a h tag",
        choices: ["A. h9", "B. h1", "C. h6", "D. h3"],
        answer: "C. h6"
    },
    {
        //Question 5
        question: "What does CSS stand for?",
        choices: ["A. Casting Style Sheet", "B. Cascading Style Sheet", "C. Cascading Sheet Style", "D. Casting Sheet Style"],
        answer: "B. Cascading Style Sheet"
    }, 
    {
        //Question 6
        question: "What is NOT considered a semantic HTML tag",
        choices: ["A. <section>", "B. <main>", "C. <aside>", "D. <span>"],
        answer: "D. <span>"
    }
];

//Function that make the timer display at 75 and not 74
var displayTimer = function() {

    //Set the counter to display the maximum amount of time for the quiz
    countDownTimer.textContent = "" + countDownTime;
};

//Function for the countdown timer
var setTimer = function() {

    //Call the function to display the timer
    displayTimer();

    //Set the interval of the timer
    timerInterval = setInterval(function() {

         //Derement the counter to count down
         countDownTime--;

        //Call the function to display the timer
        displayTimer();

        //If counter hits zero, it clear interval and display the initials section of the page
        if (countDownTime === 0) {

            //Clear the interval to stop the timer
            clearInterval(timerInterval);

            //Once timer hits 0, it will display the initials section
            initialsSection.classList.remove("hide");

            //Add hide to the quiz section 
            quizSection.classList.add("hide");
        }

        //Set the score to the count down timer when they are done
        score = countDownTime;

    }, 1000);
};


//Function that display the list of question and choices
var displayQuizQuestion = function(getQuestion) {

    //Scope Variable that get the questions div 
    var displayQuestion = document.querySelector("#questions");

    //Get the text content of the question in the array
    displayQuestion.textContent = getQuestion.question;

    //Loop through the choices and display it in the correct button 
    for (var i = 0; i < getQuestion.choices.length; i++) {
        document.getElementById(`choice-${i+1}`).textContent = getQuestion.choices[i];
    }
}

//Function that will display the next question of the array objects 
var displayNextQuestion = function() {

    //Call the function to get the object current question and choices and it will display on screen
    displayQuizQuestion(listOfQuestions[currentQuestionDisplay]);
};

//When the "Start Quiz" button is clicked, the timer start and display the first question 
startButton.addEventListener("click", function() {
    
    //Call the function timer to start the countdown 
    setTimer();

    //Add the class hide to not display the start menu 
    startMenuSection.classList.add("hide");

    //Remove the class hide to display the question and choices
    quizSection.classList.remove("hide");

    //Call the function to display next question
    displayNextQuestion();
});

////When one of the choices for the question is clicked, it will display correct/wrong answer and continue to next question
choiceButton.addEventListener("click", function(event) {

    //Scope Variable
    var correctOrWrong = document.querySelector("#answer");
    var displayCorrectOrWrong = document.querySelector("#correct-wrong-answer");
    var element = event.target;

    //Check to see which answers are correct and which are wrong
    if (element.textContent === listOfQuestions[currentQuestionDisplay].answer) {

        //Remove the class hide to display the text
        correctOrWrong.classList.remove("hide");

        //Display this text when it answer corrected
        displayCorrectOrWrong.textContent = ("Correct!");
    
    } else {

        //Remove the class hide to display the text
        correctOrWrong.classList.remove("hide");

        //Remove the class hide to display the text
        displayCorrectOrWrong.textContent = ("Wrong!");

        //Deduct the score if user got a wrong answer
        countDownTime -= 10;

        //Score is set to whatever the remaining timer is 
        score = countDownTime;
    }

    //If the current index of the question is less than the list of question in array of object, it will display the question
    if (currentQuestionDisplay < listOfQuestions.length - 1) {

        //Increment to the next question
        currentQuestionDisplay++; 

        //Call the function to get the next question in the quiz 
        displayNextQuestion();

    } else {

        //Stop the timer 
        clearInterval(timerInterval);

        //Display the final score in the initial score 
        finalScore.textContent = score;

        //Remove the hide class for the initial section
        initialsSection.classList.remove("hide");

        //Add the hide class for the quiz to disappear when finish
        quizSection.classList.add("hide");

        //Return when there no questions left
        return;
    }
});

//When the "Submit" button is clicked, it saves it to local storage and display it in high score html page
submitScore.addEventListener("click", function(event) {

    //Stop the default event from happening
    event.preventDefault();

    //Scrope variable to get the user initials input
    var initialInput = document.querySelector("#user-initials");
    var userInitial = [];

    //Store the initial and score in an array object
    var initialAndScore = [
        {
            storeInitials: initialInput.value,
            storeScore: score
        }
    ]

    //Parsing the object to a text format
    var storedValue = localStorage.getItem("initialAndScore");

    //Push the user initial to the array of objects
    userInitial.push(initialAndScore);

    if (storedValue === "") {

        //Passed the initialAndScore as the key name, and push the userInitial to the object 
        localStorage.setItem("initialAndScore", JSON.stringify(userInitial));

    } else {

        //Get the existinf score from the initial and score object
        var existingScores = JSON.parse(localStorage.getItem("initialAndScore")) || [];

        //Push the existing score into the user initials and score
        existingScores.push(userInitial[0]);

        //Passed the initialAndScore as the key name, and push the userInitial to the object 
        localStorage.setItem("initialAndScore", JSON.stringify(existingScores));
    }

    //This will display the high score page, once the user click on sumbit button in initials section
    window.location.href="highScore.html";
});