function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b === 0){
        return "error"
    }
    return a/b;
}

let firstNumber = null;
let operator = null ;
let secondNumber = null ;
let currentValue = "";

const display = document.getElementById("display");
const numberButtons= document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click",()=>{
        currentValue += button.textContent;
        display.textContent = currentValue;
    })
})

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click",()=>{
    currentValue="";
    display.textContent = "0";
})

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        if(currentValue === "") return;
        firstNumber= currentValue;
        operator = button.textContent;
        currentValue=""
    })
})
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
  // must have first number, operator, and second number
  if (firstNumber === null || operator === null || currentValue === "") return;

  secondNumber = currentValue;

  let result = operate(operator, firstNumber, secondNumber);

  // handle divide by zero
  if (result === "Error: Divide by 0") {
    display.textContent = result;
    currentValue = "";
    firstNumber = null;
    operator = null;
    return;
  }

  // round long decimals
  result = Math.round(result * 100000) / 100000;

  display.textContent = result;

  // prepare for next operation
  currentValue = result.toString();
  firstNumber = null;
  operator = null;
});

function operate(op, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  if (op === "+") return add(num1, num2);
  if (op === "-") return subtract(num1, num2);
  if (op === "*") return multiply(num1, num2);
  if (op === "/") return divide(num1, num2);

  return null;
}

