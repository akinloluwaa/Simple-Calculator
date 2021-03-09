const calculator ={
    displayVAlue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator:null,
};

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayVAlue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:

        if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
        }
    }
    updateDisplay();
});

function inputDigit(digit) {
    const { displayVAlue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayVAlue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayVAlue = displayVAlue === '0' ? digit : displayVAlue + digit;
    }

    console.log(calculator)
}

function inputDecimal(dot) {

    if (calculator.waitingForSecondOperand === true) {
        calculator.displayVAlue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }

    if (!calculator.displayVAlue.includes(dot)) {
        calculator.displayVAlue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayVAlue, operator } = calculator

    const inputValue = parseFloat(displayVAlue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayVAlue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator ==='/') {
        return firstOperand / secondOperand;
    } 

    return secondOperand;
}

function resetCalculator() {
    calculator.displayVAlue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}