let values = []
let tempValue = ""
let operatorClick = false
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
const percentBtn = document.querySelector('#percent')

for(let num of numBtns) {
    num.addEventListener('click', () => {
        tempValue += num.innerText
        display.textContent = tempValue
    })
}

clearBtn.addEventListener('click', () => {
    values = []
    tempValue = ""
    display.textContent = ""
    decimalBtn.disabled = false;
})

decimalBtn.addEventListener('click', () =>  decimalBtn.disabled = true )
equalsBtn.addEventListener('click', calculate)

addBtn.addEventListener('click', () => {
    operatorChoice(currOperator)
    currOperator = addBtn.innerText
})

subtractBtn.addEventListener('click', () => {
    operatorChoice(currOperator)
    currOperator = subtractBtn.innerText
})

divideBtn.addEventListener('click', () => {
    operatorChoice(currOperator)
    currOperator = divideBtn.innerText
})

multiplyBtn.addEventListener('click', () => {
    operatorChoice(currOperator)
    currOperator = multiplyBtn.innerText
})

function operatorChoice(currOperator) {
    operatorClick = true
    updateArray()
    operate(currOperator, values)
}

function updateArray() {
    if (tempValue === "" ) return
    if (operatorClick && tempValue !== "") {
        values.push(Number(tempValue))
        console.log(values)
        tempValue = ""
    }
}

function add([...args]) {
    const sum = [...args].reduce((accum, currentValue) => accum + currentValue)
    roundNumber(sum)
    values = []
    values.push(sum)
}

function subtract([...args]){
    const difference = [...args].reduce((accum, currentValue) => accum - currentValue)
    roundNumber(difference)
    values = []
    values.push(difference)
}

function multiply([...args]){
    const product = [...args].reduce((accum, currentValue) => accum * currentValue)
    roundNumber(product)
    values = []
    values.push(product)
}

function divide([...args]){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
    if (quotient === Infinity) {
        display.textContent = "Error: DIV/0"
        let rmValues = values.splice(0,2)
        return
    }
    roundNumber(quotient)
    values = []
    values.push(quotient)
}

function operate(operator, [...args]){
    switch(operator) {
        case "+":
            add([...args])
            break
        case "-":
            subtract([...args])
            break
        case "x":
            multiply([...args])
            break   
        case "÷":
            divide([...args])
            break 
        default: 
            break       
    }
}

function calculate() {
    if (values.length === 0) return
    updateArray()
    operate(currOperator, values)
}

function roundNumber(num) {
    if(num % 1 === 0)
        {
            display.textContent = num
        } else {
            display.textContent = num.toFixed(5)
        }
}