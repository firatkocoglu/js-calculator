let number = [];
let numbers = [];
let operator = [];
let result = '';
let tempResult = '';
let lastButton = '';
let negativeNumber = false;

function operation(operator) {
  result = numbers.reduce((prev, current) => {
    if (operator === 'add') {
      return prev + current;
    } else if (operator === 'subtract') {
      return prev - current;
    } else if (operator === 'multiply') {
      return prev * current;
    } else if (operator === 'divide') {
      return prev / current;
    }
  });
  return result;
}

$(document).ready(function () {
  const display = $('#display')[0];
  $('.number').click((event) => {
    if (result !== '' && lastButton === 'equals') {
      result = '';
      tempResult = '';
      number = [];
      operator = [];
      numbers = [];
    }
    const numberButton = event.currentTarget.value;
    lastButton = numberButton;
    if (number[0] === '0' && number.length === 1 && numberButton === '0') {
      number;
    } else if (number.includes('.') && numberButton === '.') {
      number;
    } else {
      number.push(numberButton);
      display.textContent = number.join('');
    }
  });

  $('#clear').click(() => {
    number = [];
    numbers = [];
    display.textContent = '0';
    result = '';
    operator = [];
    newResult = '';
    lastButton = '';
  });

  $('.operator').click((event) => {
    let newOperator = event.currentTarget;
    let newNumber = Number(number.join(''));
    if (lastButton !== 'equals' && lastButton !== 'operator') {
      numbers.push(newNumber);
    }
    number = [];
    newNumber = '';
    operator.push(newOperator.id);
    display.textContent = newOperator.textContent;

    if (lastButton === 'operator' && newOperator.id === 'subtract') {
      negativeNumber = true;
    }

    if (numbers.length === 2) {
      tempResult = operation(operator[operator.length - 2]);
      numbers = [];
      numbers.push(tempResult);
      negativeNumber = false;
    }
    lastButton = 'operator';
    console.log(negativeNumber);
  });

  $('#equals').click((event) => {
    lastButton = event.currentTarget.id;
    let newNumber = Number(number.join(''));
    if (negativeNumber === true) {
      numbers.push(newNumber * -1);
    } else {
      numbers.push(newNumber);
    }
    console.log(numbers, operator, negativeNumber);

    if (numbers.length === 2) {
      let operatorSign = negativeNumber
        ? operator[operator.length - 2]
        : operator[operator.length - 1];
      tempResult = operation(operatorSign);
      numbers = [];
      numbers.push(tempResult);
      newNumber = '';
      negativeNumber = false;
    }
    display.textContent = tempResult;
  });
});
