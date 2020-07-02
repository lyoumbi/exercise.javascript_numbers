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
let result = null;

if(jsonOp.multiplication != 0) {
    result = numbers[operators.indexOf("*")];
    for(let i = 0; i < jsonOp.multiplication; i++) {
        result = calculation("*", result, numbers[operators.indexOf("*") + 1]);
        numbers[operators.indexOf("*")] = result;
        operators[operators.indexOf("*")] = "";
        console.log("++++++++++++++++");
        console.log(i + " * iteration operators = " + operators);
        console.log(i + " * iteration numbers = " + numbers);
        console.log("++++++++++++++++");
    }
    
} 

if(jsonOp.division != 0) {
    if(result == null) {
        result = numbers[operators.indexOf("/")];
    } 
    for(let i = 0; i < jsonOp.division; i++) {
        result = calculation("/", result, numbers[operators.indexOf("/") + 1]);
        numbers[operators.indexOf("/")] = result;
        operators[operators.indexOf("/")] = "";
        console.log("++++++++++++++++");
        console.log(i + " / iteration operators = " + operators);
        console.log(i + " / iteration numbers = " + numbers);
        console.log("++++++++++++++++");
    }

}

if(jsonOp.subtraction != 0) {
    if(result == null) {
        result = numbers[operators.indexOf("-")];
    } 
    for(let i = 0; i < jsonOp.subtraction; i++) {
        result = calculation("-", result, numbers[operators.indexOf("-") + 1]);
        numbers[operators.indexOf("-")] = result;
        operators[operators.indexOf("-")] = "";
        console.log("++++++++++++++++");
        console.log(i + " - iteration operators = " + operators);
        console.log(i + " - iteration numbers = " + numbers);
        console.log("++++++++++++++++");
    }
}

if(jsonOp.addition != 0) {
    if(result == null) {
        result = numbers[operators.indexOf("+")];
    } 
    for(let i = 0; i < jsonOp.addition; i++) {
        console.log("result inside + =" + result);
        result = calculation("+", result, numbers[operators.indexOf("+")]);
        numbers[operators.indexOf("+")] = result;
        operators[operators.indexOf("+")] = "";
        console.log("++++++++++++++++");
        console.log(i + " + iteration operators = " + operators);
        console.log(i + " + iteration numbers = " + numbers);
        console.log("++++++++++++++++");
    }
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
