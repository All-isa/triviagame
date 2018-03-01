//begin with a button that starts game
//set timer for 30 seconds for each question
//once question is answered the question changes to the next unanswerd 
//add wrong or right when each question is answered 
//after all 15 questions are asked tally corrects and incorrects
//display score and alert win or loss
//
///////////////////////////////////////


//LIST VARIABLES HERE////////////
var startScreen;
var gameHTML;
var counter = 20;
var questions = ["Which state has the capital Olympia?", "Which state does the the city of Helena located?", "Where is Lake Okeechobee located", "Which of these states is the second smallest?", "Where is Mount McKinley located?", "What state has the highest population?", "Where is Mesa Verde National Park located?", "What is the capital of Kentucky?"];
var answers = [["Washington", "Montana", "Oregon", "Idaho"], ["Wyoming","Idaho","North Dakota","Montana"], ["Tennessee", "Louisiana", "Florida", "Oklahoma"], ["Rhode Island","Hawaii","Deleware", "Conneticut"], ["California", "Alaska", "Colorado", "Washington"], ["California","New York","Texas","Alaska"], ["New Mexico", "Arizona", "Utah", "Colorado"], ["Frankfort","Louisville","Lexington","Georgetown"]];
var correctAnswers = ["A. Washington", "D. Montana", "C. Florida", "C. Deleware", "B. Alaska", "A. California", "D. Colorado", "A. Frankfort"];
var questionCounter = 0;
var selecterAnswer;
var theClock; //20 seconds
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

//START FUNCTIONS HERE///////////////
////////OPENING SCREEN FUNCTION///////////
/// SET UP WHAT OUR INITIAL SCREEN LOOKS LIKE HTML WISE //

$(document).ready(function() {
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-danger btn-sm btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".questions").html(startScreen);
    }
    
    initialScreen();

//GENERATE COUNTDOWN AND QUESTION WHEN WE CLICK THE START BUTTON /////

$("body").on("click", ".start-button", function(event){
        generateHTML();
    
        timer();
});
//WHEN WE CHOOSE AN ANSWER AND SUBMIT, WHAT HAPPENS /////////

$("body").on("click", ".answer", function(event){
    selectedAnswer = $(this).text();
    if(selectedAnswer === correctAnswers[questionCounter]) {
        clearInterval(theClock);
        generateWin();
    }
    else {
        clearInterval(theClock);
        generateLoss();
    }
});

//RESET THE GAME WHEN WE CLICK THE RESET BUTTON///////

$("body").on("click", ".reset-button", function(event){
    resetGame();
});

///DISPLAY HTML ELEMENTS TEXT ETC //////////////

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. "+answers[questionCounter][1]+"</p><p class='answer'>C. "+answers[questionCounter][2]+"</p><p class='answer'>D. "+answers[questionCounter][3]+"</p>";
    $(".questions").html(gameHTML);
}

///RESET GAME AFTER RESET CLICK FUNCTION ////////////

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 20;
    generateHTML();
    timer();
}


function timer() {
    theClock = setInterval(twentySeconds, 1000);
    function twentySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}
//FUNCTION// SCREEN INBETWEEN QUESTIONS//////////
function wait() {
    if (questionCounter < 7) {
    questionCounter++;
    generateHTML();
    counter = 20;
    timer();
    }
    else {
        finalScreen();
    }
}

//WHAT HAPPENS WHEN WE RUN OUT OF TIME/////////
function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + 
    $(".questions").html(gameHTML);
    setTimeout(wait, 3000);
}
//WHAT HAPPENS WHEN WE GUESS CORRECTLY /////////////

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>"
    $(".questions").html(gameHTML);
    setTimeout(wait, 3000);
}

//WHAT HAPPENS WHEN WE GUESS INCORRECTLY ///////////
function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter]
    $(".questions").html(gameHTML);
    setTimeout(wait, 3000)
}
//GAMES ENDING SCREEN DISPLAY, TALLY, AND RESTART OPTION ////////////////////
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Great Job, look how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-danger btn-sm btn-block reset-button' href='#' role='button'>Restart the Quiz!</a></p>";
        $(".questions").html(gameHTML);
    }
});