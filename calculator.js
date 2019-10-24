let multiply = (x, y) => {
  answer = x * y;
  return answer;
};

let divide = (x, y) => {
  answer = x / y;
  return answer;
};

let add = (x, y) => {
  answer = parseFloat(x) + parseFloat(y);
  return answer;
};

let subtract = (x, y) => {
  answer = x - y;
  return answer;
};

let res = 0;
let result = 0;
let answer;
//inputs
let clear = () => {
  inputX = [];
  inputY = [];
  operation = [];
  res = 0;
  result = 0;
  answer = 0;
  decimalX = 0;
  decimalY = 0;
  equalClicked = false;
};

// prints result to screen
let printResults = (outputArea, a, o, b, res) => {
  if (res === 0) {
    outputArea.innerHTML = '' + a.join('') + '' + o + '' + b.join('');
  } else {
    outputArea.innerHTML =
      '' + a.join('') + '' + o + '' + b.join('') + ' = ' + res;
  }
};
// processes input
let takeInput = (value, output) => {
  if (value.length < 6) {
    if (value === 'C') {
      clear();
      //clears screen
      output.innerHTML = '';
    } else if (
      (!isNaN(value) || value === '.') &&
      operation.length === 0 &&
      value != '' &&
      equalClicked != true
    ) {
      inputX.push(value);
      if (value === '.') decimalX++;
      if (decimalX > 1 && value === '.') {
        inputX.pop();
        decimalX++;
      }
      printResults(output, inputX, operation, inputY, result);
    } else if (
      isNaN(value) &&
      value != '.' &&
      value != '=' &&
      !operation.length > 0 &&
      inputX.length != 0 &&
      equalClicked != true
    ) {
      operation.push(value);
      printResults(output, inputX, operation, inputY, result);
    } else if (
      operation.length > 0 &&
      (!isNaN(value) || value === '.') &&
      value != '' &&
      equalClicked != true
    ) {
      inputY.push(value);
      if (value === '.') decimalY++;
      if (decimalY > 1 && value === '.') {
        inputY.pop();
        decimalY++;
      }
      printResults(output, inputX, operation, inputY, result);
    }
  }
};

// calculates result
let calculate = () => {
  if (inputY.length != 0) {
    if (operation[0] === '+') {
      result = add(inputX.join(''), inputY.join(''));
      printResults(output, inputX, operation, inputY, result);
    } else if (operation[0] === '-') {
      result = subtract(inputX.join(''), inputY.join(''));
      printResults(output, inputX, operation, inputY, result);
    } else if (operation[0] === 'x' || operation[0] === '*') {
      result = multiply(inputX.join(''), inputY.join(''));
      printResults(output, inputX, operation, inputY, result);
    } else if (operation[0] === '/') {
      result = divide(inputX.join(''), inputY.join(''));
      printResults(output, inputX, operation, inputY, result);
    }
  }
};

let inputX = [],
  inputY = [],
  operation = [],
  decimalX = 0,
  decimalY = 0;
let equalClicked = false;
let calculator = () => {
  let output = document.getElementById('output');

  // digit and operators clicked
  document.addEventListener('click', event => {
    let value = event.target.textContent;
    takeInput(value, output);
  });
  // if keys are used for input
  document.addEventListener('keydown', event => {
    let value = event.key;
    if (
      (!value.shiftKey && !isNaN(value) && equalClicked != true) ||
      value === '+' ||
      value === '-' ||
      value === '*' ||
      value === '/' ||
      value === '.' ||
      value === 'c'
    ) {
      if (value === 'c') value = value.toUpperCase();
      if (value === '*') value = 'x';
      takeInput(value, output);
    }
  });
  // equal key pressed
  document.addEventListener('keydown', event => {
    if (event.key === '=') {
      calculate();
      equalClicked = true;
    }
  });
  // equals clicked
  document.getElementById('equals').addEventListener('click', () => {
    calculate();
    equalClicked = true;
  });
};

window.addEventListener('load', calculator());
