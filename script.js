//Pseudocode-logic-
//when an operator is chosen
//then the currentvalue is stored
//then maindisplaywindow is cleared

///work through currentvalue and usernumber2 issue-- after basic math currentvalue is the last value
//and usernumber2 is also the totalvalue-- both of which display the same number


// DOM
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const deleteButton = document.querySelector(".delete")
const mainDisplayWindow = document.querySelector("#display")
const upperDisplayWindow = document.querySelector("#upperdisplay")
const equalButton = document.querySelector(".equal")
const deciButton = document.querySelector(".deci")

//Variables
let userChoiceOperator = "";
let userNumber1 = ""; //change back to 0
let userNumber2 = ""; //change back to 0
let currentValue = "";
let totalValue = ""; //return to 0 if doesnt work
const deciValue = 3;

//Arithmetic function
const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) =>  num1 / num2,
}

//Calculates user input-called by the operatorBtn event listener and equalBtn event listener
function operate(value) {
    if(userChoiceOperator != ""){
        equals();
        return;
    }
    userNumber1 = (currentValue == "") ? 0 : parseFloat(currentValue);
    currentValue = "";
    switch (value) {
        case '-':
            userChoiceOperator = "subtract";
            break;
        case '*':
            userChoiceOperator = "multiply";
            break;    
        case '/':
            userChoiceOperator = "divide";
            break;
        case '+':
            userChoiceOperator = "add";
            break;   
    }
}

//number button event listener- 
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentValue.length >= 9) {
            userNumber2 = "";
            return;
        }  
        currentValue += button.textContent;
        mainDisplayWindow.textContent += button.textContent;
    });
    console.log(currentValue, userNumber1, userNumber2, userChoiceOperator);
});
   
//Operator button event listener-
//remove nan when operator double clicked-- the eventlistener sees second operator click as userNumber2
//may be best to turn off click then resume
//when calculating 1+1+1 currentvalue
operatorButtons.forEach((buttons) => {
    buttons.addEventListener("click", () => {
        operate(buttons.textContent);
        if((userNumber1 != "") && (userChoiceOperator != "")) {
            upperDisplayWindow.textContent += (userNumber1 + buttons.textContent);
            mainDisplayWindow.textContent = currentValue;
        }
        checkOperators();
    }); 
});

function checkOperators () { //doesnt do anything
    if(upperDisplayWindow.textContent.length != 0) {
        return true;
    }else {
        return false;
    }
};
    
//equal button event listener-
equalButton.addEventListener("click", () => {
    if(currentValue != ""){ //needed for calc
        upperDisplayWindow.textContent += currentValue;
    }
    if(upperDisplayWindow.textContent.length >= 19){ //works
        document.querySelector("#upperdisplay").style.fontSize = "25px";
    }
    equals();
});

//Decimal button even listener
deciButton.addEventListener("click", () => {
    if(mainDisplayWindow.textContent.length == 0) {
        userNumber2 = "";
    }
    if(!currentValue.includes(".") || currentValue == ""){
        currentValue += ".";
        mainDisplayWindow.textContent += ".";
    }
});

//delete button even listener calls deleteuserinput function
deleteButton.addEventListener("click", deleteUserInput);

//clear all button- calls clear function
clearButton.addEventListener("click", () => {
    clearMain();
    clearUpper();
});

//Equals function
//make large numbers scientific notation
function equals() {
    if( userNumber2 == ""){
        userNumber2 = parseFloat(currentValue);
    } else {
        userNumber1 = (currentValue == "") ? 0 : parseFloat(currentValue);
        if(userChoiceOperator == "subtract" || userChoiceOperator == "divide"){
            [userNumber1, userNumber2] = [userNumber2, userNumber1];
        };
    };
    if (userChoiceOperator == "divide" && userNumber2 == ""){
        document.querySelector("#upperdisplay").style.fontSize = "20px";
        upperDisplayWindow.textContent = "Cannot divide by zero";
        return;
    }
    if (userChoiceOperator != ""){
        totalValue = operations[userChoiceOperator](userNumber1,userNumber2);
    } else {
        if(isNaN(parseFloat(currentValue))){
            currentValue = "";
        }
        totalValue = currentValue;
    }
    
    if(currentValue.length >= 9) { //resizes font for large numbers
        document.querySelector("#display").style.fontSize = "30px";
        mainDisplayWindow.textContent = totalValue;
        mainDisplayWindow.textContent = +(Math.round(totalValue + `e+${deciValue}`) + `e-${deciValue}`);
        userNumber2 = parseFloat(totalValue);
    } else {
        mainDisplayWindow.textContent = totalValue;
        mainDisplayWindow.textContent = +(Math.round(totalValue + `e+${deciValue}`) + `e-${deciValue}`);
        userNumber2 = parseFloat(totalValue);
    }
};

//Clear function
function clearMain() {
    mainDisplayWindow.textContent = "";
    currentValue = "";
    userNumber1 = "";
    userNumber2 = "";
    totalValue = "";
    userChoiceOperator = "";
    document.querySelector("#display").style.fontSize = "50px";
}

function clearUpper() {
    upperDisplayWindow.textContent = "";
    currentValue = "";
    userNumber1 = "";
    userNumber2 = "";
    totalValue = "";
    userChoiceOperator = "";
    document.querySelector("#upperdisplay").style.fontSize = "35px";
}

//Delete button doesnt work on complicated math
//if total has been calculated the delete button should clear instead
//if user deletes on current value and chooses another number it concatenates instead of recalculating
//values of currentvalue are still held in upper display
function deleteUserInput() {
    if(currentValue != "") {
         mainDisplayWindow.textContent = mainDisplayWindow.textContent.slice(0, -1);
         currentValue = mainDisplayWindow.textContent;
         return;
    }
};