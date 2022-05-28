//Function to store the high score and initials
var displayHighScore = function() {

    //Scope variable to display the initial and score when inputted
    var displayInitial = document.querySelector("#score-initials");
    var displayScore = document.querySelector("#highest-score");

    //Parsing the object to a text format
    var userInitial = JSON.parse(localStorage.getItem("initialAndScore")) || [];

    //Pop the last initial in the array of object
    var lastInitial = userInitial.pop();

    //If the last initial isn't empty, it will be display in the high score page
    if (lastInitial) {

        //Remove the hide class if no initials is inputted and will display the background color 
        document.querySelector(".display-score").classList.remove("hide");

        //Display the initials and score onto html 
        displayInitial.textContent = lastInitial[0].storeInitials;
        displayScore.textContent = lastInitial[0].storeScore;
    }
};

//Call the function display high score
displayHighScore();