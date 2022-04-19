// Add function
function add(num1, num2) {
    return num1 + num2;
}

//Subtract function
function subtract(num1, num2) {
    return num1 - num2;
}

//Multiply function
function multiply(num1, num2) {
    return num1 * num2;
}

//Divide function
function divide(num1, num2) {
    return num1 / num2;
}

function modulo(num1, num2) {
    return num1 % num2;
}

//Operate function that takes input and calls an above function
function operate(mum1, num2, operand) {
    switch (operand) {
        case '-':
            return num1 - num2;
            break;
        case '*':
            return num1 * num2;
            break;    
        case '/':
            return num1 / num2;
            break;
        default:
            return num1 + num2;    
    }
}
console.log(operate);