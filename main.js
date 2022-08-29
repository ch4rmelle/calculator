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

clearBtn.addEventListener('mousedown', resetCalc)
deleteBtn.addEventListener('mousedown', deleteValue)
percentBtn.addEventListener('mousedown', togglePercent)
changeSignBtn.addEventListener('mousedown', changeSign)
decimalBtn.addEventListener('mousedown', () =>  decimalBtn.disabled = true )
equalsBtn.addEventListener('mousedown', () => {
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
        updateValues()
        
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
    } else if (e.key === "%") {
        togglePercent()
    } else {
        return
    }
})

for(let num of numBtns) {
    num.addEventListener('mousedown', () => {
        displayValues(num.innerText)
        clickOperators()
        }
    )
}

function displayValues(value) {
    tempValue += value
    inputValues.innerText = roundNumber(tempValue)
}

function clickOperators() {
    for (let op of operatorBtns) {
        op.addEventListener('mousedown', () =>{
            if (inputValues.innerText === "") return

            updateValues()
            currOperator = op.innerText
            decimalBtn.disabled = false
    })
}
    
}

// if btn is selected === change background color
// if a new btn is selected remove current selected button === change background color to new button

function updateValues() {
    if (tempValue === "") return

    if(runningTotal === "") {
        runningTotal = roundNumber(tempValue)
        tempValue = ""
        return
    }

    if (runningTotal) {
        tempValue = roundNumber(tempValue)
        prevValues.innerText = `${runningTotal} ${currOperator} ${tempValue} =`
        operate(currOperator, runningTotal, tempValue)
        tempValue = ""
    }
}
/* Operator functions */
function operate(operator, num1, num2){
    num1 = Number(num1)
    num2 = Number(num2)
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
    runningTotal = sum
    inputValues.innerText = runningTotal
}

function subtract(...args){
    const difference = [...args].reduce((accum, currentValue) => accum - currentValue)
    runningTotal = difference
    inputValues.innerText = runningTotal
}

function multiply(...args){
    const product = [...args].reduce((accum, currentValue) => accum * currentValue)
    runningTotal = roundNumber(product)
    inputValues.innerText = runningTotal
}

function divide(...args){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
    if (quotient === Infinity) {
        inputValues.innerText = "Error: DIV/0"
        runningTotal = ""
        return
    }
    runningTotal = roundNumber(quotient)
    inputValues.innerText = runningTotal
}

function deleteValue() {
    if(inputValues.innerText === tempValue) {
        tempValue = tempValue.toString()
        tempValue = [...tempValue].slice(0,-1).join("")
        inputValues.innerText = tempValue
        prevValues.innerText = tempValue
    } else {
        inputValues.innerText = ""
    }
}

function resetCalc() {
    runningTotal = ""
    tempValue = ""
    inputValues.innerText = ""
    prevValues.innerText = ""
    currOperator = ""
    decimalBtn.disabled = false;
}

function togglePercent() {
    if(inputValues.innerText === tempValue) {
        tempValue = (tempValue / 100).toString()
        inputValues.innerText = roundNumber(tempValue)
        prevValues.innerText = roundNumber(tempValue)

    } else {
        console.log(typeof runningTotal)
        runningTotal = runningTotal / 100
        console.log(typeof runningTotal)
        inputValues.innerText = roundNumber(runningTotal)
    }
}

function changeSign() {
    if(inputValues.innerText == tempValue) {
        tempValue = Math.sign(tempValue) === 1 ? (-tempValue).toString() : 
        (tempValue * (-1).toString())
        inputValues.innerText = tempValue
        prevValues.innerText = tempValue
    }
    else {
        runningTotal = Math.sign(runningTotal) === 1 ? -runningTotal : (runningTotal * (-1))
        inputValues.innerText = runningTotal
    }
}

function roundNumber(num) {
    let numStr = num.toString().split("")
    console.log(numStr)
    if(numStr.length > 15) {
        num = Number(numStr.join("")).toExponential(6)
        return num
    }
    return num
}
