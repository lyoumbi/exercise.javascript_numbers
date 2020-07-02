function compute(expression) {

let operators = new Array();
for(let i = 0; i < expression.split(/[^\D]/).length; i++) {
    if(expression.split(/[^\D]/)[i] != "") operators.push(expression.split(/[^\D]/)[i]);
}

let numbers = expression.split(/\D/);
for(let i = 0; i < numbers.length; i++) {
    numbers[i] = parseInt(numbers[i]);
}

let jsonOp = jsonOfOperators(operators);
let result = 0;

if(jsonOp.multiplication == operators.length) {
    result = numbers[0];
    for(let i = 0; i < operators.length; i++) {
        result = calculation("*", result, numbers[i + 1]);
    }
    return result;
}

if(jsonOp.division == operators.length) {
    result = numbers[0];
    for(let i = 0; i < operators.length; i++) {
        result = calculation("/", result, numbers[i + 1]);
    }
    return result;
}

if(jsonOp.addition == operators.length) {
    result = numbers[0];
    for(let i = 0; i < operators.length; i++) {
        result = calculation("+", result, numbers[i + 1]);
    }
    return result;
}

if(jsonOp.subtraction == operators.length) {
    result = numbers[0];
    for(let i = 0; i < operators.length; i++) {
        result = calculation("-", result, numbers[i + 1]);
    }
    return result;
}

return result;
}

// Operate the calculation base on the operator
function calculation(operator, operant1, operant2) {
    switch(operator) {
        case "+":
            return operant1 + operant2;
        case "-":
            return operant1 - operant2;
        case "*":
            return operant1 * operant2;
        case "/":
            return operant1 / operant2;
    } 
}

// Count each operator occurence, will be use to determine the order of operation
let jsonOfOperators = (arrayOfOperators) => {
    return {
                multiplication: arrayOfOperators.filter(element => element == "*").length,
                division: arrayOfOperators.filter(element => element == "/").length,
                addition: arrayOfOperators.filter(element => element == "+").length,
                subtraction: arrayOfOperators.filter(element => element == "-").length
            };
}
