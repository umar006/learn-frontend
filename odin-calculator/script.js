const field = document.querySelector("#container input");
const numpad = document.querySelectorAll("#numpad button");
numpad.forEach((numpad) => {
  numpad.addEventListener("click", function inputValue(e) {
    let value = e.target.textContent;

    if (value === "clear") {
      field.value = "";
      return;
    }

    const operators = ["+", "-", "*", "/"];
    if (operators.includes(value)) value = ` ${value} `;

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
