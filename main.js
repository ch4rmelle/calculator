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

clearBtn.addEventListener('click', () => {
    values = []
    tempValue = ""
    display.value = ""
})
//display numbers on the input screen
for(let num of numBtns) {
    num.addEventListener('click', () => {
        tempValue += num.innerText
        display.value = tempValue
        console.log(tempValue)
    })
}

equalsBtn.addEventListener('click', calculate)

function operatorChoice() {
    addBtn.addEventListener('click', () => 
    {   
        operatorClick = true
        updateArray()
        operate(currOperator, values)
        currOperator = addBtn.innerText
        console.log(values)
    })

    subtractBtn.addEventListener('click', () => 
    {
        operatorClick = true
        updateArray()
        operate(currOperator, values)  
        currOperator = subtractBtn.innerText
        console.log(values)
    })

    divideBtn.addEventListener('click', () => 
    {
        operatorClick = true
        updateArray()
        operate(currOperator, values)
        currOperator = divideBtn.innerText
        console.log(values)
    })

    multiplyBtn.addEventListener('click', () => 
    {
        operatorClick = true
        updateArray()
        operate(currOperator, values)
        currOperator = multiplyBtn.innerText
        console.log(values)
    })

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
    const sum = [...args].reduce((accum, currentValue) => accum + currentValue, 0)
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
    const product = [...args].reduce((accum, currentValue) => accum * currentValue, 1)
    roundNumber(product)
    values = []
    values.push(product)

}

function divide([...args]){
    const quotient = [...args].reduce((accum, currentValue) => accum / currentValue)
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
    updateArray()
    operate(currOperator, values)
}

function roundNumber(num) {
    if(num % 1 === 0)
        {
            display.value = num
        } else {
            display.value = num.toFixed(4)
        }

}

operatorChoice()