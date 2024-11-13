//Access DOM element of the calculator

const inputBox = document.getElementById("input");
const expressionBox= document.getElementById("expression");
const resultBox = document.getElementById("result");

//Define expression and results values

let expression ="";
let result = "";

//Event handlers when buttons are clicked

function buttonClick(e){
    //getValues from clicked buttons
    const target = e.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    //console.log(target,value,action);

    //switch case to control the calc

    switch(action){
        case'number':
       addValues(value);
        break;

        case'clear':
        clear();
        break;

        case'backspace':
        backspace();
        break;

        //add result to expression as a starting point

        case'addiction':
        case'subtration':
        case'multiplication':
        case'division':
        if(expression === "" && result !== ""){
            starFromResults(value);
        }
        else if(expression !== "" && !isLastCharOperator()){
            addValues(value);
        }
        break;

        case'submit':
            submit();
            break;
        
        case'negate':
            negate();
            break;

        case'mod':
        percentage();
        break;

        case'decimal':
        decimal(value);
        break;
    }
    //update display

    updateDisplay(expression,result)
}

inputBox.addEventListener('click', buttonClick);

function addValues(value){
    //Finding the last Index of operator
   if(value === '.'){
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    const lastDecimalIndex = expression.lastIndexOf('.');

    const lastNumberIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );

    //Check if this is first decima in the current expression number

    if(lastDecimalIndex < lastOperatorIndex ||
        lastDecimalIndex < lastNumberIndex ||
        lastDecimalIndex === -1 && (expression ===''
        || expression.slice(lastNumberIndex+1).indexOf('-') === -1))
    {
        expression+=value;
    }
    
   }
   else{
    expression += value;
   }
   
}

function updateDisplay(requiredExpression, requiredResults){
    expressionBox.textContent = requiredExpression;
    resultBox.textContent = requiredResults;
}

//Clear Function
function clear(){
    expression = "";
    result = "";
}

function backspace(){
    expression = expression.slice(0,-1)
}

function isLastCharOperator(){
    //ParseInt convert string to interger/number
    return isNaN(parseInt(expression.slice(-1)));
}

function starFromResults(value){
    expression += result+value;
}

function submit(){
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression(){
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult)
    ?''
    :evalResult < 1
    ?parseFloat(evalResult.toFixed(10))
    :parseFloat(evalResult.toFixed(2));
}

function negate(){
    if(expression === "" && result !== ""){
        result = -result
    }
    //toggle the sign if it's not negative
    else if(!expression.startsWith('-')&& expression !==''){
        expression = '-'+ expression;
    }
    //remove the negative sign from expression if its already negative
    else if(expression.startsWith('-')){
        expression = expression.slice(1)
    }

}

function percentage(){
    //evaluate expression, it must take the value of the first
    //number

    if(expression !== ''){
        result = evaluateExpression();
        expression ="";

        if(!isNaN(result)&& isFinite(result)){
            result /=100;
        }
        else{
            result="";
        }
    } 
    else if(result !== ""){
        //if expression is empty but the result exists divide by 100
        result = parseFloat(result)/100;
    }  


}

function decimal(value){
    if(!expression.endsWith('-')&& !isNaN(expression.slice(-1))){
        addValues(value);
    }
}