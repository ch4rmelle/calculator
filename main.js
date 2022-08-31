let currentOperand = ""
let lastOperand = ""
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

clearBtn.addEventListener('mousedown', resetCalc)
deleteBtn.addEventListener('mousedown', deleteValue)
percentBtn.addEventListener('mousedown', togglePercent)
changeSignBtn.addEventListener('mousedown', changeSign)
decimalBtn.addEventListener('mousedown', () =>  decimalBtn.disabled = true )
equalsBtn.addEventListener('mousedown', () => {
    if(inputValues.textContent === "") return
    updateValues()
})

for(let num of numBtns) {
    num.addEventListener('mousedown', () => {
        displayValues(num.innerText)
        clickOperators()
        }
    )
}

function displayValues(value) {
    currentOperand += value
    inputValues.innerText = sciNotation(currentOperand)
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

function updateValues() {
    if (currentOperand === "") return
    if(lastOperand === "") {
        lastOperand = sciNotation(currentOperand)
        currentOperand = ""
        return
    }
    if (lastOperand) {
        currentOperand = sciNotation(currentOperand)
        prevValues.innerText = `${lastOperand} ${currOperator} ${currentOperand} =`
        operate(currOperator, lastOperand, currentOperand)
        currentOperand = ""
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

function add(a, b) {
    const sum = a+b
    lastOperand = sum
    inputValues.innerText = sciNotation(lastOperand)
}

function subtract(a,b){
    const difference = a - b
    inputValues.innerText = sciNotation(lastOperand)
}

function multiply(a,b){
    const product = a * b
    lastOperand = product
    inputValues.innerText = sciNotation(lastOperand)
}

function divide(a, b){
    const quotient = a / b
    if (quotient === Infinity) {
        inputValues.innerText = "Error: DIV/0"
        return
    }
    lastOperand = sciNotation(quotient)
    inputValues.innerText = lastOperand
}

function deleteValue() {
    if(inputValues.innerText === currentOperand) {
        currentOperand = [...currentOperand].slice(0,-1).join("")
        inputValues.innerText = currentOperand
    } else {
        inputValues.innerText = ""
        prevValues.innerText = ""
        lastOperand = ""
    }
}

function resetCalc() {
    lastOperand = ""
    currentOperand = ""
    inputValues.innerText = ""
    prevValues.innerText = ""
    currOperator = ""
    decimalBtn.disabled = false;
}

function togglePercent() {
    if (inputValues.innerText == "") return
    if(inputValues.innerText == currentOperand) {
        currentOperand = currentOperand / 100
        inputValues.innerText = sciNotation(currentOperand)
        prevValues.innerText = sciNotation(currentOperand)
    } else {
        lastOperand = lastOperand / 100
        inputValues.innerText = sciNotation(lastOperand)
    }
}

function changeSign() {
    if (!inputValues.textContent) return
    if(inputValues.innerText == currentOperand) {
        currentOperand = Math.sign(currentOperand) === 1 ? (-currentOperand) : 
        (currentOperand * (-1))
        inputValues.innerText = currentOperand
        prevValues.innerText = currentOperand
    }
    else {
        lastOperand = Math.sign(lastOperand) === 1 ? -lastOperand : (lastOperand * (-1))
        inputValues.innerText = lastOperand
    }
}

function sciNotation(num) {
    let numStr = num.toString().split("")
    if(numStr.length > 12) {
        num = Number(numStr.join("")).toExponential(6)
        return num
    }
    return num
}

/* Keyboard Support*/
window.addEventListener('keydown', (e) => {
    chkNumberKey(e.key)
    chkOperatorKey(e.key)
 })
 
function chkNumberKey(num) {
    switch(true) {
        case !isNaN(num) === true:
            displayValues(num)
            break
    }
}

function chkOperatorKey(operator) {
    switch(operator) {
        case "+":case "/":case "-":case "*":
            updateValues()
            currOperator = operator
            break
        case "=":case "Enter":
            inputValues.textContent === "" ? operator.preventDefault : updateValues()
            break
        case "Backspace":
            deleteValue()
            break
        case "Delete":
            resetCalc()
            break
        case ".":
            currentOperand.includes(".") ? e.preventDefault() : displayValues(operator)
            break
        case "%":
            togglePercent()
            break
        default: break
    }
}