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

    if (operators.includes(value)) value = ` ${value} `;

    if (value === "=") {
      const decode = field.value.split(" ");
      const outputQueue = [];
      const operatorStack = [];

      // ref1: https://en.wikipedia.org/wiki/Shunting_yard_algorithm
      // ref2: https://brilliant.org/wiki/shunting-yard-algorithm
      while (decode.length) {
        const token = decode.shift();

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
            const total = operate(
              firstNumber,
              secondNumber,
              operatorStack.pop()
            );
            outputQueue.push(total);
          }
          operatorStack.push(token);
        }

        while (!decode.length && operatorStack.length) {
          const secondNumber = outputQueue.pop();
          const firstNumber = outputQueue.pop();
          const total = operate(firstNumber, secondNumber, operatorStack.pop());
          outputQueue.push(total);
        }
      }

      field.value = outputQueue[0];
      return;
    }

    if (value === "clear") {
      field.value = "";
      return;
    }

    field.value += value;
  });
});

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
