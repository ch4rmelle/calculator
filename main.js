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
const percentBtn = document.querySelector('#percent-btn')
const deleteBtn = document.querySelector('#delete-btn')
const changeSignBtn = document.querySelector('#change-sign')

clearBtn.addEventListener('click', resetCalc)
deleteBtn.addEventListener('click', deleteValue)
percentBtn.addEventListener('click', togglePercent)
changeSignBtn.addEventListener('click', changeSign)
equalsBtn.addEventListener('click', updateValues)
decimalBtn.addEventListener('click', () =>  decimalBtn.disabled = true )

for(let num of numBtns) {
    num.addEventListener('click', () => {
        tempValue += num.innerText
        console.log(typeof tempValue)
        display.textContent = tempValue
    })
}

for (let op of operatorBtns) {
    op.addEventListener('click', () => {
       updateValues()
       currOperator = op.innerText
       decimalBtn.disabled = false
    })
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
        runningTotal = ""
        return
    }
    runningTotal = quotient
    display.textContent = runningTotal

}

function deleteValue() {
    if(display.textContent === tempValue) {
        tempValue = tempValue.toString()
        tempValue = [...tempValue].slice(0,-1).join("")
        display.textContent = tempValue
    } else {
        display.textContent = 0
    }
}

function resetCalc() {
    runningTotal = ""
    tempValue = ""
    display.textContent = ""
    decimalBtn.disabled = false;
}

function togglePercent() {
    if(display.textContent === tempValue) {
        tempValue = tempValue / 100
        display.textContent = tempValue
    } else {
        runningTotal = runningTotal / 100
        display.textContent = runningTotal
    }
}

function changeSign() {
    if (Math.sign(tempValue) === 1) {
        tempValue = -tempValue
        display.textContent = tempValue
        } 
    else if (Math.sign(tempValue) === -1){
        tempValue = tempValue * (-1)
        display.textContent = tempValue
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