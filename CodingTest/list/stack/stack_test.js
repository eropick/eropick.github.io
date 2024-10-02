import {Stack} from "./stack.js"

var stack = new Stack();
var printStack = document.querySelector("#stack");
var printOutValue = document.querySelector("#out_value");

var insertBtn = document.querySelector("#insert");
var getDataBtn = document.querySelector("#get_data");
var removeBtn = document.querySelector("#remove");

function insert(){
    let data = document.querySelector("#data").value;
    if(stack.push(data)){
        printStack.innerText += stack.peek()+" ";
    }else{
        console.log(data+" : 삽입 실패");
    }
    document.querySelector("#data").value = "";
}

function getData(){
    printOutValue.innerText = (stack.peek()===null)?"값이 없음":stack.peek();
}

function removeData(){
    let removeValue = stack.pop();
    let arr = stack.toArray();
    printStack.innerText = "";
    //재설정
    for(let i=0;i<arr.length;i+=1){
        printStack.innerText += arr[i]+" ";
    }
    printOutValue.innerText = (removeValue === null)?"값이 없음":removeValue;
}

insertBtn.addEventListener("click",insert);
getDataBtn.addEventListener("click",getData);
removeBtn.addEventListener("click",removeData);