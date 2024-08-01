import {Jamo, EncodingKorEng} from "./jamo.js"


//테스트 코드
const inputData=document.querySelector("#input_data");
const separateBtn = document.querySelector("#separ");
const concateBtn = document.querySelector("#concat");

const jamoToEngBtn = document.querySelector("#jamo_eng");
const engToJamoBtn = document.querySelector("#eng_jamo");


//자모 분리 테스트
separateBtn.addEventListener("click",function(){
    const strValue = new String(inputData.value);
    let jamoOper=new Jamo(strValue);
    let result=jamoOper.getSeparateString();
    console.log(result); 
    inputData.value="";
});

//자모 결합 테스트
concateBtn.addEventListener("click",function(){
    const strValue = new String(inputData.value);
    let jamoOper=new Jamo(strValue);
    let result=jamoOper.getBindString();
    console.log(result); 
    inputData.value="";
});

//한글 => 영문자 변환
jamoToEngBtn.addEventListener("click",function(){
    const strValue = new String(inputData.value);
    let kor = new EncodingKorEng(strValue);
    let result = kor.encodeToEng();
    console.log(result);
    inputData.value="";
});

//영문자 => 한글 변환
engToJamoBtn.addEventListener("click",function(){
    const strValue = new String(inputData.value);
    let eng = new EncodingKorEng(strValue);
    let result = eng.encodeToKor(); 
    console.log(result);
    inputData.value="";
});