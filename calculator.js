let answer;
// round to three decimal places if result not whole
let checkWhole = answer => {
  if (answer % 1 === 0) {
    return answer;
  } else {
    return answer.toFixed(3);
  }
};

let multiply = (x, y) => {
  answer = x * y;
  return checkWhole(answer);
};

let divide = (x, y) => {
  answer = x / y;
  return checkWhole(answer);
};

let add = (x, y) => {
  answer = parseFloat(x) + parseFloat(y);
  return checkWhole(answer);
};

let subtract = (x, y) => {
  answer = x - y;
  return checkWhole(answer);
};
let res = 0;
let result = 0;
let clear = () => {
  inputX = [];
  inputY = [];
  operation = [];

  result = 0;
  answer = 0;
};

let printResults = (outputArea, a, o, b, res) => {
  outputArea.innerHTML =
    '' + a.join('') + '' + o + '' + b.join('') + ' = ' + res;
};

let inputX = [],
  inputY = [],
  operation = [],
  decimalX = 0,
  decimalY = 0;

function calculator() {
  let output = document.getElementById('output');

  let result = 0;
  // digit and operators clicked
  document.addEventListener('click', event => {
    let value = event.target.id;
    result = 0;
    if (value.length < 6) {
      if (value === 'clear') {
        clear();
        output.innerHTML = ' = 0';
      } else if (
        (!isNaN(value) || value === '.') &&
        operation.length === 0 &&
        value != ''
      ) {
        inputX.push(value);
        if (decimalX > 0 && value === '.') {
          inputX.pop();
        }
        printResults(output, inputX, operation, inputY, result);
        if (value === '.') decimalX++;
      } else if (
        isNaN(value) &&
        value != '.' &&
        value != '=' &&
        !operation.length > 0 &&
        inputX.length != 0
      ) {
        operation.push(value);
        printResults(output, inputX, operation, inputY, result);
      } else if (
        operation.length > 0 &&
        (!isNaN(value) || value === '.') &&
        value != ''
      ) {
        inputY.push(value);
        if (decimalY > 0 && value === '.') {
          inputY.pop();
        }
        printResults(output, inputX, operation, inputY, result);
        if (value === '.') decimalY++;
      }
    }
    // equals clicked
    if (inputY.length != 0) {
      document.getElementById('=').addEventListener('click', () => {
        if (operation[0] === '+') {
          result = add(inputX.join(''), inputY.join(''));
          printResults(output, inputX, operation, inputY, result);
        } else if (operation[0] === '-') {
          result = subtract(inputX.join(''), inputY.join(''));
          printResults(output, inputX, operation, inputY, result);
        } else if (operation[0] === '*') {
          result = multiply(inputX.join(''), inputY.join(''));
          printResults(output, inputX, operation, inputY, result);
        } else if (operation[0] === '/') {
          result = divide(inputX.join(''), inputY.join(''));
          printResults(output, inputX, operation, inputY, result);
        }
        decimalY = 0;
        decimalX = 0;
      });
    }
  });
}

window.addEventListener('load', calculator());
