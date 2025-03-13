import { UniqueArray } from "./data_util.js";
import {StringUtil,stringf} from "./string_util.js"
import {MathUtil} from "./math_util.js"

var uArray = new UniqueArray(13,4,15,1,1,1,1,1);
let resultString = StringUtil.replaceFromIndex("test1234",5,"||||||");
let rd = MathUtil.randomInt(1,45);

window.onload = ()=>{
    const testarea=document.querySelector("#testarea");

    /* 데이터 넣을 곳 */
    let p = new Array();
    let testCnt = 5;
    for(let i=0;i<testCnt;++i)
        p[i]=document.createElement("p");

    /* 테스트 데이터 삽입 */
    p[0].innerText= uArray.toArray();
    p[1].innerText = resultString;
    p[2].innerText = rd; 
    let score=100;
    p[3].innerText = stringf("%s : %d%%","진도율",score);
    /* 화면 출력 */
    p.forEach((element)=>{
        testarea.appendChild(element);
    })
}

