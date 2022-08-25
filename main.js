function add(...args) {
    const sum = [...args].reduce((accum, currentValue) => accum + currentValue, 0)
    console.log(sum)
    return sum  
}

function subtract(...args){
    const difference = [...args].reduce((accum, currentValue) => accum - currentValue)
    console.log(difference)
    return difference
}

function multiply(...args){
    const product = [...args].reduce((accum, currentValue) => accum * currentValue)
    console.log(product)
    return product
}

function divide(...args){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
    console.log(quotient)
    return quotient
}

function operate(operator, num1, num2){
    switch(operator) {
        case "+":
            add(num1,num2)
            break
        case "-":
            subtract(num1,num2)
            break
        case "*":
            multiply(num1,num2)
            break   
        case "/":
            divide(num1,num2)
            break        
    }
}
