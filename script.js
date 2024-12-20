
let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
let percentageBase = 0;

const screen = document.querySelector(".screen-result");

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'AC':
            buffer = "0";
            runningTotal = 0;
            percentageBase = 0;
            previousOperator = null;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '⌫':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        case '%':
            handlePercentage();
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }

    const floatBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = floatBuffer;
    } else {
        flushOperation(floatBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(floatBuffer) {
    switch (previousOperator) {
        case '+':
            runningTotal += floatBuffer;
            break;
        case '-':
            runningTotal -= floatBuffer;
            break;
        case '×':
            runningTotal *= floatBuffer;
            break;
        case '÷':
            runningTotal /= floatBuffer;
            break;
        // Removed percentage case from here, it will be handled separately
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function handlePercentage() {
    if (buffer === "0" || runningTotal === 0) {
        return;
    }

    const floatBuffer = parseFloat(buffer);
    // Calculate the percentage of the current runningTotal
    buffer = ((runningTotal * floatBuffer) / 100).toString();
    // No need to update runningTotal or percentageBase here
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (!event.target.matches('button')) {
            return;
        }
        buttonClick(event.target.innerText);
    });
}

init();

