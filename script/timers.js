//global variables
var showDebug = true;
var outputNumber = 0; //number of debug outputs
var stopwatch = true; //stopwatch can be started
var ctdwnTimer = true; //countdown Timer can be started
var countUp = 0; //count the number of hundredths of a sec for stopwatch
var inputCountDown; //user input countdown in hundredths of a sec 
var minCountDown = 1; //minimum countdown - one hundredth of a sec
var maxCountDown = 60000; //maximum countdown - 10 mins in hundredths of sec 
var regexTest = false; //regular expression for entry validation
var stopwatchInterval; //setInterval() for stopwatch
var ctdwnTimerInterval; //setInterval() for countdown timer
//for indications of when functions have been called
var timeFormatFuncCalled = false;
var startStopwatchFuncCalled = false;
var resetStopwatchFuncCalled = false;
var startCtdwnTimerFuncCalled = false;
var resetCtdwnTimerFuncCalled = false;

//window.onload function
window.onload = function() {
    //get HTML elements
    var format = document.getElementById("timeFormat");
    var stopwatchOption = document.getElementById("stopwatchOption");
    var ctdwnTimerOption = document.getElementById("ctdwnTimerOption");
    var startStopButton = document.getElementById("startStopButton");
    var resetButton = document.getElementById("resetButton");
    var startPauseButton = document.getElementById("startPauseButton");
    var stopwatchApp = document.getElementById("stopwatchApp");
    var ctdwnTimerApp = document.getElementById("ctdwnTimerApp");
    var inputField = document.getElementById("inputField");
    var userInput = document.getElementById("userInput");
    var timeElapsed = document.getElementById("timeElapsed");
    var prompt = document.getElementById("prompt");
    var debugOnOff = document.getElementById("debugOnOff");
    var clearOutput = document.getElementById("clearOutput");
    
    format.innerHTML = "00:00:00"; //show current time
    stopwatchOption.style.fontWeight = "bold";
    ctdwnTimerApp.style.display = "none"; //hide countdown timer
    userInput.value = ""; //set empty input value
    
    //stopwatch option button
    stopwatchOption.onclick = function(evt){
        stopwatch = true;
        resetStopWatch(); //reset stop watch
        resetCtdwnTimer(); //reset countdown timer
        stopwatchApp.style.display = "block"; //show stopwatch 
        startStopButton.innerHTML = "Start";
        stopwatchOption.style.fontWeight = "bold";
        ctdwnTimerOption.style.fontWeight = "normal";
        ctdwnTimerApp.style.display = "none"; //hide countdown timer
        
        if (showDebug) {//if debug mode is on - display debug output
            outputNumber++;
            buttonClickedFunctionCalled(stopwatchOption);
        }
    }
    
    //countdown timer option button
    ctdwnTimerOption.onclick = function(evt){
        ctdwnTimer = true; 
        resetCtdwnTimer(); //reset countdown timer
        resetStopWatch(); //reset stopwatch
        ctdwnTimerApp.style.display = "block"; //display countdown timer
        inputField.style.display = "block"; //display input field
        startPauseButton.innerHTML = "Start";
        ctdwnTimerOption.style.fontWeight = "bold";
        prompt.innerHTML = ""; //no prompt
        //display time elapsed
        timeElapsed.innerHTML = "0 min 0 sec 0 hundredths of a sec has passed."; 
        stopwatchOption.style.fontWeight = "normal";
        stopwatchApp.style.display = "none"; //hide stopwatch
        
        if (showDebug) { //if debug mode is on - display debug output
            outputNumber++;
            buttonClickedFunctionCalled(ctdwnTimerOption);
        }
    }
    
    //stopwatch start/stop button
    startStopButton.onclick = function(evt){
        //check if stopwatch is true
        if (stopwatch) {
            stopwatch = false; //set stopwatch to false
            startStopWatch(); //start stopwatch
            startStopButton.innerHTML = "Stop";
        }
        //check if stopwatch is false
        else {
            stopwatch = true; //set stopwatch to true
            clearInterval(stopwatchInterval); //stop stopwatch
            startStopButton.innerHTML = "Start";
        }
        
        if (showDebug) {//if debug mode is on - display debug output
            outputNumber++;
            buttonClickedFunctionCalled(startStopButton);
        }
    }
    
    //stopwatch reset button
    resetButton.onclick = function(evt){
        stopwatch = true;
        resetStopWatch(); //reset stopwatch
        startStopButton.innerHTML = "Start";
        
        if (showDebug) { //if debug mode is on - display debug output
            outputNumber++;
            buttonClickedFunctionCalled(resetButton);
        }
    }
    
    //countdown timer start/pause button
    startPauseButton.onclick = function(evt){
        //check if ctdwnTimer is true
        if (ctdwnTimer) {
            startCtdwnTimer(); //start countdown timer
        }
        //check if ctdwnTimer is false
        else {
            ctdwnTimer = true; //set ctdwnTimer to true
            clearInterval(ctdwnTimerInterval); //stop countdown timer
            inputField.style.display = "block"; 
            startPauseButton.innerHTML = "Start";
        }
        
        if (showDebug) { //if debug mode is on - display debug output
            outputNumber++;
            buttonClickedFunctionCalled(startPauseButton);
            entryValidation();
        }
    }
    
    //debug mode button
    debugOnOff.onclick = function(evt){
        if (showDebug) {
            //if debug mode is on, turn off debug mode
            showDebug = false; 
            debugOnOff.innerHTML = "Debug Mode is Off";
        }
        else {
            //if debug mode is off, turn on debug mode
            showDebug = true;
            debugOnOff.innerHTML = "Debug Mode is On";
        }
    }
    
    //clear debug output button
    clearOutput.onclick = function(evt){
        clearDebugOutput();
    }
}

//function clears all debug outputs
function clearDebugOutput(){
    outputNumber = 0; //reset output number to zero
    var node = document.getElementById("debugOutput"); //get <div> element
    //while <div> has a child node, remove it
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

//function displays debug output for buttons clicked and functions called
function buttonClickedFunctionCalled(button) {
    var timeFormatFunc = "";
    var startStopwatchFunc = "";
    var resetStopwatchFunc = "";
    var startCtdwnTimerFunc = "";
    var resetCtdwnTimerFunc = "";
    var buttonClicked = button.id + " is clicked.";
    
    if (timeFormatFuncCalled) {
        timeFormatFunc = "timeFormat() function has been called.";
    }
    if (startStopwatchFuncCalled) {
        startStopwatchFunc = "startStopwatch() function has been called.";
    }
    if (resetStopwatchFuncCalled) {
        resetStopwatchFunc = "resetStopWatch() function has been called.";
    }
    if (startCtdwnTimerFuncCalled) {
        startCtdwnTimerFunc = "startCtdwnTimer() function has been called.";
    }
    if (resetCtdwnTimerFuncCalled) {
        resetCtdwnTimerFunc = "resetCtdwnTimer() function has been called.";
    }

    var output = outputNumber + ". " + buttonClicked + " " + timeFormatFunc + " " + startStopwatchFunc + " " + resetStopwatchFunc + " " + startCtdwnTimerFunc + " " + resetCtdwnTimerFunc;
    
    document.getElementById("debugOutput").innerHTML += "<p>" + output + "</p>";
    
    //reset these variables to false
    timeFormatFuncCalled = false;
    startStopwatchFuncCalled = false;
    resetStopwatchFuncCalled = false;
    startCtdwnTimerFuncCalled = false;
    resetCtdwnTimerFuncCalled = false;
}

//function displays debug output for entry validation
function entryValidation() {
    var userEntry;
    if(!regexTest) { //wrong time format
        userEntry = "User input is in an incorrect format.";
    }
    else if (inputCountDown < minCountDown || inputCountDown > maxCountDown) {
        //incorrect time range
        userEntry = "User input is greater than 10 minutes or less than one hundredth of a second.";
    }
    else { //correct input
        userEntry = "User input is correct.";
    }
    
    document.getElementById("debugOutput").innerHTML += "<p class='entry'>" + userEntry + "</p>";
}

//function returns time in dd:dd:dd format - min, sec, hundredths of a sec
function timeFormat(hSecCount) {
    timeFormatFuncCalled = true;
    var min1 = Math.floor(((hSecCount / (60 * 100)) / 10) % 10); //min 1st digit
    var min2 = Math.floor((hSecCount / (60 * 100)) % 10); //min 2nd digit
    var sec1 = Math.floor(((hSecCount / 100) % 60) / 10); //sec 1st digit
    var sec2 = Math.floor((hSecCount / 100) % 10); //sec 2nd digit
    var hSec1 = Math.floor((hSecCount / 10) % 10); //hundredths of a sec 1st digit
    var hSec2 = hSecCount % 10; //hundredths of a sec 2nd digit
    return "" + min1 + min2 + ":" + sec1 + sec2 + ":" + hSec1 + hSec2;
}

//function displays incrementing time every hundredth of a sec in dd:dd:dd format
function startStopWatch() {
    startStopwatchFuncCalled = true;
    //setInterval() executes function every hundredth of a second
    stopwatchInterval = setInterval(function(){
        //add one to countUp for every hundredth of a second
        countUp++;
        //display current time
        document.getElementById("timeFormat").innerHTML = timeFormat(countUp);
    }, 10);
}

//function resets stopwatch 
function resetStopWatch() {
    resetStopwatchFuncCalled = true;
    countUp = 0; //reset countUp to zero
    clearInterval(stopwatchInterval); //stop stopwatch
    //display current time
    document.getElementById("timeFormat").innerHTML = timeFormat(countUp);
}

function resetCtdwnTimer() {
    resetCtdwnTimerFuncCalled = true;
    clearInterval(ctdwnTimerInterval); //stop countdown timer
    document.getElementById("userInput").value = ""; //set empty input value
}

//function displays decrementing time every hundredth of a sec in dd:dd:dd format
function startCtdwnTimer() {
    startCtdwnTimerFuncCalled = true;
    var format = document.getElementById("timeFormat");
    var startPauseButton = document.getElementById("startPauseButton");
    var userInput = document.getElementById("userInput").value;
    var prompt = document.getElementById("prompt");
    var timeElapsed = document.getElementById("timeElapsed");
    var inputField = document.getElementById("inputField");
    
    prompt.innerHTML = ""; //no prompt
    //test if input is in dd:dd:dd format
    regexTest = /^\d{2}:\d{2}:\d{2}$/.test(userInput);
    var min = userInput[0] + userInput[1]; //min digits 
    var sec = userInput[3] + userInput[4]; //sec digits
    var hSec = userInput[6] + userInput[7]; //hundredths of a sec digits
    //convert string to integer
    min = parseInt(min); 
    sec = parseInt(sec);
    hSec = parseInt(hSec);
    //user's input countdown in hundredths of a second
    inputCountDown = ((min * 60) + sec) * 100 + hSec;
    
    if(!regexTest) { //incorrect input format
        prompt.innerHTML = "Please set a time in dd:dd:dd format";
    }
    else if (inputCountDown < minCountDown || inputCountDown > maxCountDown) {
        //time entered in incorrect range
        prompt.innerHTML = "Maximum time is 10 minutes and minimum time is one hundredth of a second";
    }
    else { //correct input
        ctdwnTimer = false;
        inputField.style.display = "none"; //hide input field
        startPauseButton.innerHTML = "Pause";
        //count the number of hundredths of a sec for countdown timer
        var countDown = inputCountDown;
        //setInterval() executes function for every hundredth of a second
        ctdwnTimerInterval = setInterval(function(){
            //subtract one from countDown for every hundredth of a second
            countDown--;
            //calculate time elapsed
            var elapsedMinutes = Math.floor((inputCountDown - countDown) / (60 * 100));
            var elapsedSeconds = Math.floor(((inputCountDown - countDown) / 100) % 60);
            var elapsedHundredths = (inputCountDown - countDown) % 100;
            //display time elapsed
            timeElapsed.innerHTML = elapsedMinutes + " min " +  elapsedSeconds + " sec " + elapsedHundredths + " hundredths of a sec has passed.";
            
            if (countDown == 0) { //time is up
                ctdwnTimer = true;
                resetCtdwnTimer(); //reset countdown timer
                format.innerHTML = timeFormat(countDown); //display current time
                inputField.style.display = "block"; //show input field
                startPauseButton.innerHTML = "Start";
                //display time elapsed
                timeElapsed.innerHTML = elapsedMinutes + " min " +  elapsedSeconds + " sec " + elapsedHundredths + " hundredths of a sec has passed.";
                return;
            }
            //display current time
            format.innerHTML = timeFormat(countDown);
            //set input value as current time
            document.getElementById("userInput").value = timeFormat(countDown);
        }, 10);
    }
}