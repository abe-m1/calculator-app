const toggleButton = document.querySelector('.tw-toggle');

console.log('connected');
toggleButton.addEventListener('click', (e) => {
  console.log('toggle', e.target.value);
  // toggleButton.classList.toggle('toggle-light');

  // console.log(toggleButton.classList.contains('toggle-light'));

  if (e.target.value === '-1') {
    console.log('here');
    document.documentElement.setAttribute('data-theme', 'two');
  } else if (e.target.value === 'true') {
    document.documentElement.setAttribute('data-theme', 'three');
  } else {
    document.documentElement.setAttribute('data-theme', 'one');
  }
});

var operations = {
  '÷': function (a, b) {
    return a / b;
  },
  '×': function (a, b) {
    return a * b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '+': function (a, b) {
    return parseFloat(a) + parseFloat(b);
  },
};

//fix clear and delete buttons
var operatorChars = Object.keys(operations);
var input = document.getElementById('input');
var numbers = document.querySelectorAll('.numbers div');
var operators = document.querySelectorAll('.operators div');
var result = document.getElementById('result');
var clear = document.querySelector('.reset');
var del = document.querySelector('.clear');
var resultDisplayed = false;

for (var i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', function (e) {
    var currentString = input.innerHTML;

    var lastChar = currentString[currentString.length - 1];

    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      resultDisplayed === true &&
      operatorChars.indexOf(lastChar) >= 0
    ) {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      resultDisplayed = false;
      input.innerHTML = e.target.innerHTML;
    }
  });
}

for (var i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', function (e) {
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];
    if (operatorChars.indexOf(lastChar) >= 0) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length !== 0) {
      input.innerHTML += e.target.innerHTML;
    }
  });
}

result.addEventListener('click', function () {
  var inputString = input.innerHTML;
  var numbers = inputString.split(/\+|\-|\×|\÷/g);

  var operators = inputString.replace(/[0-9]|\./g, '').split('');
  var operatorChars = Object.keys(operations);
  for (var i = 0; i < operatorChars.length; i++) {
    var currentOperator = operatorChars[i];

    var currentOperation = operations[currentOperator];

    var nextOperationToExecute = operators.indexOf(currentOperator);
    console.log(nextOperationToExecute);

    while (nextOperationToExecute !== -1) {
      var nextResult = currentOperation(
        numbers[nextOperationToExecute],
        numbers[nextOperationToExecute + 1]
      );
      numbers.splice(nextOperationToExecute, 2, nextResult);

      operators.splice(nextOperationToExecute, 1);

      var nextOperationToExecute = operators.indexOf(currentOperator);
      console.log(nextOperationToExecute);
    }
  }

  input.innerHTML = numbers[0];
  resultDisplayed = true;
});

clear.addEventListener('click', function () {
  input.innerHTML = '';
});

del.addEventListener('click', function () {
  console.log(input.innerHTML);
  input.innerHTML = input.innerHTML.slice(0, -1);
});
