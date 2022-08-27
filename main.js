let tempValue = ""
let runningTotal = ""
let currOperator = ""

const numBtns = document.querySelectorAll('.num')
const operatorBtns = document.querySelectorAll('.operator')
const inputValues = document.querySelector('#values')
const prevValues = document.querySelector('#prev-values')
const equalsBtn = document.querySelector('.equals')
const clearBtn = document.querySelector('#clear')
const decimalBtn = document.querySelector('#decimal')
const percentBtn = document.querySelector('#percent-btn')
const deleteBtn = document.querySelector('#delete-btn')
const changeSignBtn = document.querySelector('#change-sign')

clearBtn.addEventListener('click', resetCalc)
deleteBtn.addEventListener('click', deleteValue)
percentBtn.addEventListener('click', togglePercent)
changeSignBtn.addEventListener('click', changeSign)
decimalBtn.addEventListener('click', () =>  decimalBtn.disabled = true )
equalsBtn.addEventListener('click', () => {
    prevValues.textContent = `${runningTotal} ${currOperator} ${tempValue}`
    updateValues()
})

for(let num of numBtns) {
    num.addEventListener('click', (e) => {
        tempValue += num.innerText
        console.log(typeof tempValue)
        inputValues.textContent = tempValue
    })
}

for (let op of operatorBtns) {
    op.addEventListener('click', (e) => {
       updateValues()
       currOperator = op.innerText
       prevValues.textContent = `${runningTotal} ${currOperator} ${tempValue}`
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
    runningTotal = roundNumber(sum)
    inputValues.textContent = runningTotal
}

function subtract(...args){
    const difference = [...args].reduce((accum, currentValue) => accum - currentValue)
    runningTotal = difference
    inputValues.textContent = runningTotal
}

function multiply(...args){
    const product = [...args].reduce((accum, currentValue) => accum * currentValue)
    runningTotal = product
    inputValues.textContent = runningTotal
}

function divide(...args){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
    if (quotient === Infinity) {
        inputValues.textContent = "Error: DIV/0"
        runningTotal = ""
        return
    }
    runningTotal = roundNumber(quotient)
    inputValues.textContent = runningTotal

}

function deleteValue() {
    if(inputValues.textContent === tempValue) {
        tempValue = tempValue.toString()
        tempValue = [...tempValue].slice(0,-1).join("")
        inputValues.textContent = tempValue
    } else {
        inputValues.textContent = ""
    }
}

function resetCalc() {
    runningTotal = ""
    tempValue = ""
    inputValues.textContent = ""
    prevValues.textContent = ""
    decimalBtn.disabled = false;
}

function togglePercent() {
    if(inputValues.textContent === tempValue) {
        tempValue = tempValue / 100
        inputValues.textContent = tempValue
    } else {
        runningTotal = runningTotal / 100
        inputValues.textContent = runningTotal
    }
}

function changeSign() {
    if (Math.sign(tempValue) === 1) {
        tempValue = -tempValue
        inputValues.textContent = tempValue
        } 
    else if (Math.sign(tempValue) === -1){
        tempValue = tempValue * (-1)
        inputValues.textContent = tempValue
        }
}

function roundNumber(num) {
    let numStr = num.toString().split("")
    console.log(numStr)
    if(numStr.length > 11) {
        numStr = Number(numStr.join("")).toPrecision(6)
        return Number(numStr)
    }
    return num
}