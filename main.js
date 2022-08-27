let tempValue = ""
let runningTotal = ""
let currOperator = ""

const numBtns = document.querySelectorAll('.num')
const operatorBtns = document.querySelectorAll('.operator')
const display = document.querySelector('#display')
const equalsBtn = document.querySelector('.equals')
const subtractBtn = document.querySelector('#subtract')
const addBtn = document.querySelector('#add')
const divideBtn = document.querySelector('#divide')
const multiplyBtn = document.querySelector('#multiply')
const clearBtn = document.querySelector('#clear')
const decimalBtn = document.querySelector('#decimal')
const percentBtn = document.getElementById('percent-btn')
const deleteBtn = document.getElementById('delete-btn')

for(let num of numBtns) {
    num.addEventListener('click', () => {
        tempValue += num.innerText
        console.log(typeof tempValue)
        display.textContent = tempValue
    })
}

clearBtn.addEventListener('click', () => {
    runningTotal = ""
    tempValue = ""
    display.textContent = ""
    decimalBtn.disabled = false;
})

deleteBtn.onclick = () => {
    if(display.textContent === tempValue) {
        tempValue = tempValue.toString()
        tempValue = [...tempValue].slice(0,-1).join("")
        display.textContent = tempValue
    }
}

percentBtn.onclick = () => {
    if(display.textContent === tempValue) {
        tempValue = tempValue / 100
        display.textContent = tempValue
    } else {
        runningTotal = runningTotal / 100
        display.textContent = runningTotal
    }
}

decimalBtn.addEventListener('click', () =>  decimalBtn.disabled = true )
equalsBtn.addEventListener('click', updateValues)

addBtn.addEventListener('click', () => {
    updateValues()
    currOperator = addBtn.innerText
    decimalBtn.disabled = false
})

subtractBtn.addEventListener('click', () => {
    updateValues()
    currOperator = subtractBtn.innerText
    decimalBtn.disabled = false
})

divideBtn.addEventListener('click', () => {
    updateValues()
    currOperator = divideBtn.innerText
    decimalBtn.disabled = false
})

multiplyBtn.addEventListener('click', () => {
    updateValues()
    currOperator = multiplyBtn.innerText
    decimalBtn.disabled = false
})

function updateValues() {
    if (tempValue === "") return

    if(runningTotal === "") {
        runningTotal = Number(tempValue)
        tempValue = ""
        return
    }

    if (typeof runningTotal === 'number') {
        tempValue = Number(tempValue)
        operate(currOperator, runningTotal, tempValue)
        tempValue = ""
    }

}

function add(...args) {
    const sum = [...args].reduce((accum, currentValue) => accum + currentValue)
    runningTotal = sum
    display.textContent = runningTotal
}

function subtract(...args){
    const difference = [...args].reduce((accum, currentValue) => accum - currentValue)
    runningTotal = difference
    display.textContent = runningTotal
}

function multiply(...args){
    const product = [...args].reduce((accum, currentValue) => accum * currentValue)
    runningTotal = product
    display.textContent = runningTotal
}

function divide(...args){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
    if (quotient === Infinity) {
        display.textContent = "Error: DIV/0"
        return
    }
    runningTotal = quotient
    display.textContent = runningTotal

}

function operate(operator, num1, num2){
    switch(operator) {
        case "+":
            add(num1, num2)
            break
        case "-":
            subtract(num1,num2)
            break
        case "x":
            multiply(num1, num2)
            break   
        case "÷":
            divide(num1, num2)
            break 
        default: 
            break       
    }
}

function roundNumber(num) {
    if(num.toString().length >= 8)
        {
            display.textContent = num.toFixed(8)
        } else if (num % 1 === 0 || num.toString().length < 5) {
            display.textContent = num
        }
}