function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch(operator) {
        case '=':
            return a;
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b)
    }
}

function calculate(operator) {
    
}

const mem = {
    input: [],
    a: 0,
    b: 0,
    operator: null,
}
const valueDisplay = document.querySelector('#valueDisplay');
const operatorDisplay = document.querySelector('#operatorDisplay');
valueDisplay.textContent = mem.a; // Initial display on page load
const buttons = document.querySelector('#buttons');

function display(value) {
    // Reduce font size based on number of characters
    const testLength = String(value).length;
    valueDisplay.classList.remove('small', 'smaller');
    if (testLength > 6) valueDisplay.classList.add('small');
    if (testLength > 9) valueDisplay.classList.add('smaller');
    const testDecimal = String(value).split('.');
    // Max number of decimal places
    if (testDecimal.length > 1 && testDecimal[1].length > 4) {  
        value = value.toFixed(4)            
    }
    // Switch to scientific notation at hard length limit
    if (testLength > 13) value = value.toExponential(4);
    if (value === Infinity) value = '😈';
    valueDisplay.textContent = value;
}

function clear() {
    mem.input = [0];
    mem.a = 0;
    mem.b = 0;
    mem.operator = null;
    display(mem.a);
    operatorDisplay.textContent = '';
}

buttons.addEventListener('click', event => {
    const value = event.target.textContent;

    if (event.target.classList.contains('clearKey')) {
        clear();
    }
    if (event.target.classList.contains('numberKey')) {
        mem.input.push(value);
        display(Number(mem.input.join('')));
    }
    if (event.target.classList.contains('operatorKey')) {
        // Second operator press (effectively an "=", i.e. "2 + 5 +").
        // Concatenate second input string, calculate with operate()
        operatorDisplay.textContent = event.target.textContent;
        if (mem.a && mem.input.length > 1) {
            mem.b = Number(mem.input.join(''));
            const result = operate(mem.a, mem.b, mem.operator);

            display(result);

            // Move result to mem.a, zero out the rest
            mem.a = result;
            mem.b = 0;
            mem.operator = event.target.textContent;
            mem.input = [0];
        } else {
            // mem.a either exists from previous calculation, or is set
            mem.a = mem.a ? mem.a : Number(mem.input.join(''));
            mem.input = [0];
            mem.operator = event.target.textContent;
        }
    }
})
