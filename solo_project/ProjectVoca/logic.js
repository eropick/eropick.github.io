var timerID = null;
var tableOption=null;
var worker= new Worker("fileProc.js");
window.onload=function(e){
    let voca = getWordsFromLocal();
    loadListFromVoca(voca);
    worker.onmessage=workerProc; 
};
//키보드 이벤트
window.onkeypress = function(e){
    if(e.keyCode == 13)
        addVoca();
};

//워커 메시지 처리
function workerProc(e){
    let type = e.data[0];
    switch(type){
        case "fileToLocal":
            initVoca(); 
            localStorage.setItem("words",e.data[1]);
            localStorage.setItem("means",e.data[2]);    
            let voca = getWordsFromLocal();
            loadListFromVoca(voca);
            searchList();
            break;
        case "backupFromLocal":
            backupFile(e.data[1]);
            break;
    }
}
/*===================퀴즈 생성===================*/
function openQuiz(){
    let words = localStorage.getItem("words");
    words = JSON.parse(words);
    if(isEmptyList()||words.length<4) //퀴즈 유효성 검사
        myAlert("퀴즈 최소 단어 수 : 4",2);
    else //만족하는 경우 생성
        window.open("./vocaQuiz.html","_blank","toolbar=yes");
}
/*===================테이블 생성===================*/
function openTable(option){
    if(isEmptyList()) //테이블 유효성 검사
        myAlert("테이블 최소 단어 수 : 1",2);
    else{
        tableOption = option.value=="테이블 생성1"?0:1;
        window.open("./vocaTable.html","_blank","toolbar=yes");
    }
}
/*===================기타===================*/
//스토리지 비어있는지 여부 판단
function isEmptyList(){
    let words = localStorage.getItem("words");
    let means = localStorage.getItem("means");
    if(words==null||means==null)
        return true;
    else if(words=="-1"||means=="-1")
        return true;
    else false;
}

//local에 단어 저장하기
function saveWordsInLocal(){
    let vocaList = document.getElementsByTagName("li"); 
    let vocaWord = new Array();
    let vocaMean = new Array();
    for(let i=0;i<vocaList.length;++i){
        let word = vocaList[i].innerHTML.split(" | ")[0];
        let mean = vocaList[i].innerHTML.split(" | ")[1];
        vocaWord.push(word);
        vocaMean.push(mean);
    }
    if(vocaList.length>0){
        localStorage.setItem("words",JSON.stringify(vocaWord));
        localStorage.setItem("means",JSON.stringify(vocaMean));    
    }
    else{
        localStorage.setItem("words","-1");
        localStorage.setItem("means","-1");    
    }
}

//local에 있는 단어 가져오기
function getWordsFromLocal(){
    let words = localStorage.getItem("words");
    let means = localStorage.getItem("means");
    let voca = new Array();
    if(!isEmptyList()){
        voca.push(JSON.parse(words));
        voca.push(JSON.parse(means)); 
        return voca;
    }
    return null;
}

//경고문
function myAlert(msg,sec){
    if(timerID == null){
        let warning = document.getElementsByClassName("warning")[0];
        warning.innerHTML = msg;
        warning.hidden=false;
        timerID=setTimeout(function(){
            warning.hidden=true;
            timerID=null;
        },1000*sec); 
    }
}

//텍스트 교체
function replaceAll(fullStr,oldStr,newStr){
    let arrStr = new String(fullStr).split(oldStr);
    return arrStr.join(newStr);
}

/*===================검색===================*/
function searchList(){
    let txtWord = document.getElementById("txtWord"); 
    let txtMean = document.getElementById("txtMean"); 
    let word = new String(txtWord.value).toLowerCase();
    let mean = new String(txtMean.value);
    let wordList = document.getElementsByTagName("li");
    
    if(word !=""&&mean ==""){ //단어만 있는 경우
        for(let i=0;i<wordList.length;++i){ 
            let wordOfList = new String(wordList[i].innerHTML).split(" | ")[0].toLowerCase();
            if(wordOfList.indexOf(word)!=-1) // 단어가 존재하면 
                wordList[i].hidden=false;
            else //존재하지 않으면
                wordList[i].hidden=true;
        }
    }
    else if(word ==""&&mean !=""){ //의미만 있는 경우
        for(let i=0;i<wordList.length;++i){ 
            let meanOfList = new String(wordList[i].innerHTML).split(" | ")[1];
            if(meanOfList.indexOf(mean)!=-1) // 단어가 존재하면 
                wordList[i].hidden=false;
            else //존재하지 않으면
                wordList[i].hidden=true;
        }
    }
    else{ //둘 다 있는 경우 or연산
        for(let i=0;i<wordList.length;++i){ 
            let wordOfList = new String(wordList[i].innerHTML).split(" | ")[0].toLowerCase();
            let meanOfList = new String(wordList[i].innerHTML).split(" | ")[1];
            if(wordOfList.indexOf(word)!=-1 || meanOfList.indexOf(mean)!=-1) //or
                wordList[i].hidden=false;
            else //존재하지 않으면
                wordList[i].hidden=true;
        }
    }
}

/*===================추가===================*/

//voca를 리스트로 만들기
function loadListFromVoca(voca){
    if(voca!=null){
        let words = voca[0];
        let means = voca[1];
        for(let i=0;i<words.length;++i){
            addVocaToList(words[i],means[i]);
        }
    }
}

//voca 추가
function addVoca(){
    let word = document.getElementById("txtWord").value;
    let mean = document.getElementById("txtMean").value;
    if(word!=""&&mean!=""){
        addVocaToList(word,mean);
        clearForm();
        searchList();
        saveWordsInLocal();
    }
    else //경고문
        myAlert("단어와 의미를 모두 입력해주세요.",2);
}

//voca를 리스트에 추가
function addVocaToList(word,mean){
    let voca = document.createElement("li");
    voca.innerHTML = word + " | " + mean;
    voca.onclick=function(){
        let btnKey = document.getElementById("delBtn");
        if(btnKey.value=="선택 완료"){ //키 선택
            checker(this);
        }
    };
    let list = document.getElementById("list");
    list.appendChild(voca);
}

//입력 폼 클리어
function clearForm(){
    let word = document.getElementById("txtWord");
    let mean = document.getElementById("txtMean");
    word.value="";
    mean.value="";
    word.focus();
}

/*===================삭제===================*/

//초기화
function initVoca(){
    let list = document.getElementById("list");
    let li = list.children;
    let nodes = new Array();
    for(let i=0;i<li.length;++i)
        nodes.push(li[i]);
    for(let i=0;i<nodes.length;++i)
        list.removeChild(nodes[i]);
}

//삭제 버튼 눌렸을 때 이벤트
function delVoca(){
    let btnKey = document.getElementById("delBtn");
    if(btnKey.value=="삭제") //삭제 버튼 비활성화 시
        btnKey.value="선택 완료";
    else{ //체크된 단어를 삭제
        //단어 삭제하는 함수 호출
        let list = document.getElementById("list");
        let voca = getCheckedVoca();
        for(let i=0;i<voca.length;++i){
            list.removeChild(voca[i]);
        }
        searchList();
        saveWordsInLocal();
        btnKey.value="삭제";
    }
}

//체크된 voca를 반환하는 함수
function getCheckedVoca(){
    let vocaList = document.getElementById("list");
    let node = vocaList.children; //li 목록
    let voca = new Array();
    for(let i=0;i<node.length;++i){
        if(node[i].style.color=="red") //취소 처리된 인덱스를 받아온다.
            voca.push(node[i]); 
    }
    return voca;
}

//목록 체크 함수
function checker(voca){
    let cancle = voca.style.textDecoration;
    if(cancle==""){ //변동값
        voca.style.textDecoration="line-through";
        voca.style.color="red";
    }
    else{ //기본값
        voca.style.textDecoration="";
        voca.style.color="";
    }
}

/*===================파일 처리===================*/

//텍스트 파싱
function parseText(textFile){
    let text = replaceAll(textFile,"\r","");
    text = new String(text).split("\n");
    if(text[0].indexOf("#wordlist#")!=-1)
        return text;    
    else
        return null;
}

//파일 업로드
function createFileUploader(){
    let fileInput = document.createElement("input");
    fileInput.type="file";
    fileInput.accept="text/plain";
    fileInput.id="fileUpload";    
    let handleFile = function(){
        let selectedFile = fileInput.files[0];
        let fr = new FileReader();
        fr.readAsText(selectedFile); //텍스트로 읽기
        fr.onload = function(){ //파일 로드 완료시 수행할 작업
            let vocaSet = parseText(fr.result); 
            if(vocaSet==null){
                myAlert("단어장 형식이 아닙니다.",2);
            }
            else{
                let fileToLocal=new Array();
                fileToLocal.push("fileToLocal");
                fileToLocal.push(vocaSet);
                worker.postMessage(fileToLocal);
            }
        };
    };
    fileInput.addEventListener("change",handleFile);
    let fp = document.getElementById("fileprocess");
    fp.appendChild(fileInput);
}

//파일 백업 요청
function sendBackupReq(){
    let backupFromLocal = new Array();
    backupFromLocal.push("backupFromLocal");
    backupFromLocal.push(localStorage.getItem("words"));
    backupFromLocal.push(localStorage.getItem("means"));
    worker.postMessage(backupFromLocal);
}

//파일 백업
function backupFile(strSets){
    let txtFileName = document.getElementById("backupName");
    let fileName = new String(txtFileName.value);
    let txt = strSets; //여기로 현재 단어를 불러와서 저장
    //파일 이름 초기화
    txtFileName.value="";
    let blob = new Blob([txt], {type:'text/plain'}); //txt blob
    let url = window.URL.createObjectURL(blob); //blob 파일 주소 생성
    
    //파일 다운을 위한 a태그 생성
    let a = document.createElement("a");
    a.hidden = true;
    a.href = url;
    a.download = fileName!=""?fileName:"words";
    document.body.appendChild(a);
    a.click();
    
    //일정 시간이 지난 뒤 삭제처리
    setTimeout(function(){
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); //url 취소
    }, 100);
}