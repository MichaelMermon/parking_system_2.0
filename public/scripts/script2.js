const resultDisplay = document.getElementById("result");
const historyList = document.getElementById("historyList");

let currentInput = "";

function appendValue(value) {
  currentInput += value;
  resultDisplay.value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  resultDisplay.value = "";
}

function calculate() {
  try {
    const result = eval(currentInput);
    if (result !== undefined) {
      addToHistory(`${currentInput} = ${result}`);
      currentInput = result.toString();
      resultDisplay.value = result;
    }
  } catch (error) {
    resultDisplay.value = "Error";
    currentInput = "";
  }
}

function addToHistory(calculation) {
  const listItem = document.createElement("li");
  listItem.textContent = calculation;
  historyList.appendChild(listItem);
}
s
function backspace() {
  currentInput = currentInput.slice(0, -1);
  resultDisplay.value = currentInput;
}
