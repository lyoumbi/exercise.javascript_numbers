function compute(expression) {

    let operators = new Array();
    for (let i = 0; i < expression.split(/[^\D]/).length; i++) {
        if (expression.split(/[^\D]/)[i] != "") operators.push(expression.split(/[^\D]/)[i]);
    }

    let numbers = expression.split(/\D/);
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = parseInt(numbers[i]);
    }

    let jsonOp = jsonOfOperators(operators);
    let arrayOfUsedOperants = new Array();
    let result = null;

    result = calcOnOperator( "*", result, numbers, operators, arrayOfUsedOperants, jsonOp.multiplication);
    result = calcOnOperator("/", result, numbers, operators, arrayOfUsedOperants, jsonOp.division);
    result = calcOnOperator("-", result, numbers, operators, arrayOfUsedOperants, jsonOp.subtraction);

    return calcOnOperator("+",result, numbers, operators, arrayOfUsedOperants, jsonOp.addition);
}

// Operate the calculation base on the operator
function calculation(operator, operant1, operant2) {
    switch (operator) {
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

// Return a JSON object of each operator and its occurence, will be use to determine the order of operation
let jsonOfOperators = (arrayOfOperators) => {
    return {
        multiplication: arrayOfOperators.filter(element => element == "*").length,
        division: arrayOfOperators.filter(element => element == "/").length,
        addition: arrayOfOperators.filter(element => element == "+").length,
        subtraction: arrayOfOperators.filter(element => element == "-").length
    };
}

// Check the current operator position from the calculation already done, and update the result array
let checkUpdateResult = (result, numbers, operators, arrayOfUsedOperants, operator) => {

    // Check the current operation base on the last result
    if (result == numbers[operators.indexOf(operator)] || result == numbers[operators.indexOf(operator) + 1]) {
        // When the current operation does affect the previous operation, update all the element already used in a calculation to the current result
        // Also update the array of the index of operants already used
        result = calculation(operator, numbers[operators.indexOf(operator)], numbers[operators.indexOf(operator) + 1]);
        arrayOfUsedOperants.push(operators.indexOf(operator));
        arrayOfUsedOperants.push(operators.indexOf(operator) + 1);
        for (let j = 0; j < arrayOfUsedOperants.length; j++) {
            numbers[arrayOfUsedOperants[j]] = result;
        }
    } else {
        // When the current operation does not affect the previous operation result, do not update all the element already used in a calculation to the current result
        result = calculation(operator, numbers[operators.indexOf(operator)], numbers[operators.indexOf(operator) + 1]);
        numbers[operators.indexOf(operator)] = result;
        numbers[operators.indexOf(operator) + 1] = result;
    }
    // Delete the current operator to evoid using it twice
    operators[operators.indexOf(operator)] = "";
}

let calcOnOperator = (operator, result, numbers, operators, arrayOfUsedOperants, numberOfOccurence) => {
    if (numberOfOccurence != 0) {
        if (result == null) result = numbers[operators.indexOf(operator)];
        for (let i = 0; i < numberOfOccurence; i++) {
            checkUpdateResult(result, numbers, operators, arrayOfUsedOperants, operator);

            // Debugger
            // console.log("++++++++++++++++");
            // console.log(i + " " + operator + " iteration array of used indexes " + arrayOfUsedOperants);
            // console.log(i + " " + operator + " iteration operators = " + operators);
            // console.log(i + " " + operator + " iteration numbers = " + numbers);
            // console.log("++++++++++++++++");
        }
    }
    return numbers[arrayOfUsedOperants[arrayOfUsedOperants.length - 1]];
}


