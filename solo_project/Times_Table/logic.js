var loop=true;
function gugudan(){ //구구단 
    return new Promise((resolve,reject)=>{
        const timesTable = document.getElementById("dan");
        const br = document.createElement("br");
        const hr = document.createElement("hr");          
        while(timesTable.firstChild){ //이전 작업 삭제
            timesTable.firstChild.remove();
        }
        let n=prompt("몇 단을 입력할까요?","1");
        if(n!==null&&n!==undefined&&n!==NaN&&isFinite(n)){
            n = parseInt(n);
            const ndan = document.createElement("p");
            ndan.innerText=n+"단";
            timesTable.appendChild(ndan);
            for(let i=1;i<=9;++i){
                let content=document.createElement("p");
                content.innerText = n+" x "+i+" = "+n*i;
                timesTable.appendChild(content);
                timesTable.appendChild(br);
            }
            timesTable.appendChild(hr);
            setTimeout(()=>{
                resolve(confirm);
            },1000);
        }
        else{
            let content=document.createElement("p");
            content.innerText="-입력 오류 중단-"
            timesTable.appendChild(content);
            reject("error : invalid error");
        }
    });
}
async function run(){
    do{
        await gugudan().then(question=>{
            let check=question("그만할까요?");
            if(check) loop=false;
        }).catch(error=>{
            loop=false;
            console.log(error);
        });
    }while(loop);
}

window.addEventListener("load",run);