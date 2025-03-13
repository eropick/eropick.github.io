addEventListener("message",fileProc);

//main쓰레드로부터 날아온 이벤트처리
function fileProc(e){
    let type = e.data[0];
    switch(type){
        case "fileToLocal":
            fileToLocal(e.data[1]);
            break;
        case "backupFromLocal":
            backupFromLocal(e.data[1],e.data[2]);
            break;
    }
}

//local->file로 데이터 저장
function backupFromLocal(w,m){
    let sumFormat = new Array();
    sumFormat.push("backupFromLocal");
    let text = new String("#wordlist#");
    if(w!=null&&m!=null){
        let words = JSON.parse(w);
        let means = JSON.parse(m);
        for(let i=0;i<words.length;++i){
            text += "\n"+words[i]+"\n"+means[i]
        }
    }
    sumFormat.push(text);
    postMessage(sumFormat);
}

//file->local로 데이터 저장
function fileToLocal(vocaSet){
    if(vocaSet.length>1){
        let words = new Array();
        let means = new Array();
        let sumFormat = new Array();
        for(let i=1;i<vocaSet.length;++i){
            if(i%2==1) //홀수면 단어 
                words.push(vocaSet[i]);
            else //짝수면 뜻
                means.push(vocaSet[i]);
        }
        sumFormat.push("fileToLocal");
        sumFormat.push(JSON.stringify(words));
        sumFormat.push(JSON.stringify(means));
        postMessage(sumFormat);
    }
}