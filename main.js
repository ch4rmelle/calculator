let tempValue = ""
let runningTotal = ""
let currOperator = ""
let isBtnSelected = false;

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
    updateValues()
})

window.addEventListener('keydown', (e) => {
    if(!isNaN(e.key)) {
        displayValues(e.key)
    } else if ( 
    e.key === "/" || e.key === "*" || 
    e.key === "+" || e.key === "-" ) {
        updateValues()
        currOperator = e.key
    } else if (e.key === "=" || e.key === "Enter"){
        updateValues(e.key)
        
    } else if (e.key === "Backspace"){
        deleteValue()
    } else if (e.key === "Escape") {
        resetCalc()
    } else if (e.key === ".") {
        if(tempValue.includes(".")){
            e.preventDefault()
        } else {
            displayValues(e.key)
        }
    }
})

for(let num of numBtns) {
    num.addEventListener('click', () => {
        displayValues(num.innerText)
        clickOperators()
        }
    )
}

function displayValues(value) {
    tempValue += value
    inputValues.textContent= tempValue
}

function clickOperators() {
    for (let op of operatorBtns) {
        op.addEventListener('click', () =>{
            if (inputValues.textContent === "") return

            updateValues()
            currOperator = op.innerText
    })
}
    
}

// if btn is currently selected === change background color
// if a new btn is selected remove current selected button === change background color to new button

function updateValues(key = "") {
    if (tempValue === "") return

    if(runningTotal === "") {
        runningTotal = Number(tempValue)
        tempValue = ""
        return
    }

    if (typeof runningTotal === 'number' || key === "Enter" || key === "=" ) {
        tempValue = Number(tempValue)
        prevValues.textContent = `${runningTotal} ${currOperator} ${tempValue} =`
        operate(currOperator, runningTotal, tempValue)
        tempValue = ""
    }
}
/* Operator functions */
function operate(operator, num1, num2){
    switch(operator) {
        case "+":
            add(num1, num2)
            break
        case "-":
            subtract(num1,num2)
            break
        case "*":
            multiply(num1, num2)
            break   
        case "/":
            divide(num1, num2)
            break     
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
        runningTotal = 0
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
        prevValues.textContent = tempValue
    } else {
        inputValues.textContent = ""
    }
}

function resetCalc() {
    runningTotal = ""
    tempValue = ""
    inputValues.textContent = ""
    prevValues.textContent = ""
    currOperator = ""
    decimalBtn.disabled = false;
}

function togglePercent() {
    if(inputValues.textContent === tempValue) {
        tempValue = (tempValue / 100).toString()
        inputValues.textContent = tempValue
        prevValues.textContent = tempValue

    } else {
        console.log(typeof runningTotal)
        runningTotal = runningTotal / 100
        console.log(typeof runningTotal)
        inputValues.textContent = runningTotal
    }
}

function changeSign() {
    if(inputValues.textContent === tempValue) {
        tempValue = Math.sign(tempValue) === 1 ? (-tempValue).toString() : 
        (tempValue * (-1).toString())
        inputValues.textContent = tempValue
        prevValues.textContent = tempValue
    }
    else {
        runningTotal = Math.sign(runningTotal) === 1 ? -runningTotal : (runningTotal * (-1))
        inputValues.textContent = runningTotal
    }
}

function roundNumber(num) {
    let numStr = num.toString().split("")
    console.log(numStr)
    if(numStr.length > 11) {
        num = Number(numStr.join("")).toPrecision(6)
        return num
    }
    return num
}