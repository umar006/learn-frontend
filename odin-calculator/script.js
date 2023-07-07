const operators = ["+", "-", "*", "/"];
const operatorPrecedence = {
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
};

const field = document.querySelector("#container input");
const numpad = document.querySelectorAll("#numpad button");
numpad.forEach((numpad) => {
  numpad.addEventListener("click", function inputValue(e) {
    let value = e.target.textContent;

    if (!field.value.length && operators.includes(value)) {
      return;
    }

    if (operators.includes(value)) value = ` ${value} `;

    if (value === "=") {
      const input = field.value.split(" ");
      field.value = calculate(input);
      return;
    }

    if (value === "clear") {
      field.value = "";
      return;
    }

    field.value += value;
  });
});

function calculate(input) {
  const outputQueue = [];
  const operatorStack = [];

  // ref1: https://en.wikipedia.org/wiki/Shunting_yard_algorithm
  // ref2: https://brilliant.org/wiki/shunting-yard-algorithm
  while (input.length) {
    const token = input.shift();

    if (!isNaN(token)) {
      outputQueue.push(Number(token));
    } else if (operators.includes(token)) {
      while (
        operatorStack.length &&
        operatorPrecedence[token] <=
          operatorPrecedence[operatorStack[operatorStack.length - 1]]
      ) {
        const secondNumber = outputQueue.pop();
        const firstNumber = outputQueue.pop();
        const total = operate(firstNumber, secondNumber, operatorStack.pop());
        outputQueue.push(total);
      }
      operatorStack.push(token);
    }

    while (!input.length && operatorStack.length) {
      const secondNumber = outputQueue.pop();
      const firstNumber = outputQueue.pop();
      const total = operate(firstNumber, secondNumber, operatorStack.pop());
      outputQueue.push(total);
    }
  }

  return outputQueue[0];
}

function operate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return substract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Wrong operator";
  }
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
