//Pseudocode-logic-
//when an operator is chosen
//then the currentvalue is stored
//then maindisplaywindow is cleared



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
let calculatedResult = 0;
let userNumber1 = 0;
let userNumber2 = 0;
let currentValue = "";
let totalValue = 0;
const deciValue = 3;

// Add function
const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) =>  num1 / num2,
    modulo: (num1, num2) => num1 % num2,
}

//Calculates user input-called by the operatorBtn event listener and equalBtn event listener
//Remove operand from maindisplaywindow
//push current value to uppersdisplay after operator is clicked
function operate(value) {
    if(userChoiceOperator != ""){
        equals();
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
        case '%':
            userChoiceOperator = "modulo";
            break;
        case '+':
            userChoiceOperator = "add";
            break;   
    }
    
}

//number button event listener- 
//!!clear screen but save userNumber1/current value!!
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentValue.length >= 9) {
            userNumber2 = 0
            return;
        }
        currentValue += button.textContent;
        mainDisplayWindow.textContent += button.textContent;
    });
});
   
//Operator button event listener-
operatorButtons.forEach((buttons) => {
    buttons.addEventListener("click", () => {
        if((userNumber1 != 0) && (userChoiceOperator != "")) {
            userNumber2 = 0;
        }
        operate(buttons.textContent);
        if((userNumber1 != 0) && (userChoiceOperator != "")) {
            upperDisplayWindow.textContent = (userNumber1 + buttons.textContent);
            mainDisplayWindow.textContent = currentValue;
        }
        return;
    });     
});
    
//equal button event listener-
equalButton.addEventListener("click", () => {
    if(currentValue != 0){
        upperDisplayWindow.textContent += currentValue;
    }
    equals();
});

//Decimal button even listener
deciButton.addEventListener("click", () => {
    if(mainDisplayWindow.textContent.length == 0) {
        userNumber2 = 0;
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
    if( userNumber2 == 0){
        userNumber2 = parseFloat(currentValue);
    } else {
        userNumber1 = (currentValue == "") ? 0 : parseFloat(currentValue);
        if(userChoiceOperator == "subtract" || userChoiceOperator == "divide"){
            [userNumber1, userNumber2] = [userNumber2, userNumber1];
        };
    };
    if (userChoiceOperator == "divide" && userNumber2 == 0){

        //fix size of "cannot divide by zero" 
        upperDisplayWindow.textContent = "Cannot divide by zero";
        clearMain();
        return;
    }
    if (userChoiceOperator != ""){
        totalValue = operations[userChoiceOperator](userNumber1,userNumber2);
    } else {
        if(isNaN(parseFloat(currentValue))){
            currentValue = 0;
        }
        totalValue = currentValue;
    }
    mainDisplayWindow.textContent = totalValue;
    mainDisplayWindow.textContent = +(Math.round(totalValue + `e+${deciValue}`) + `e-${deciValue}`);
    userNumber2 = parseFloat(totalValue);
};

//Clear function
function clearMain() {
    mainDisplayWindow.textContent = "";
    currentValue = "";
    userNumber1 = 0;
    userNumber2 = 0;
    totalValue = 0;
    userChoiceOperator = "";
}

function clearUpper() {
    upperDisplayWindow.textContent = "";
}

//Delete button works
function deleteUserInput() {
    mainDisplayWindow.textContent = mainDisplayWindow.textContent.slice(0, -1);
};