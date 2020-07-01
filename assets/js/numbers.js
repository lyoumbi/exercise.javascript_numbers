function compute(expression) {

let operators = new Array();
for(let i = 0; i < expression.split(/[^\D]/).length; i++) {
    if(expression.split(/[^\D]/)[i] != "") operators.push(expression.split(/[^\D]/)[i]);
}

let numbers = expression.split(/\D/);
for(let i = 0; i < numbers.length; i++) {
    numbers[i] = parseInt(numbers[i]);
}

let result = numbers[0];

for(let i = 0; i < operators.length; i++) {
    result = calculation(operators[i], result, numbers[i + 1]);
}
return result; 
}

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