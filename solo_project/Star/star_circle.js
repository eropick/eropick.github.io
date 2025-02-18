function drawCircle(radius){
    const main = document.getElementById("container");
    const br = document.createElement("br");
    for(let y=0;y<=radius*2;++y){
        const div = document.createElement("div");
        for(let x=0;x<=radius*2+1;++x){
            let result1 = radius+Math.sqrt(Math.pow(radius,2)-Math.pow((y-radius),2));
            let result2 = radius-Math.sqrt(Math.pow(radius,2)-Math.pow((y-radius),2));

            let iResult1 = parseInt(String(result1));
            let iResult2 = parseInt(String(result2));
            
            /* 오차 구하기 */
            let error1 = Math.abs(result1 - iResult1);
            let error2 = Math.abs(result2 - iResult2);

            /* 실수 오차 범위 조정 */
            if(error1 < 0.4)
                result1 = iResult1;
            else if(error1 > 0.6)
                result1 = iResult1>0 ? iResult1+1 : iResult1-1;
            if(error2 < 0.4)
                result2 = iResult2;
            else if(error2>0.6)
                result2 = iResult2>0? iResult2+1:iResult2-1;
            
            let p = document.createElement("p");
            /* 출력 */
            if(x==result1||x==result2){
                /* 
                    공백 : &nbsp; -> HTML에서 인식 
                    공백 : \u00A0 -> JS에서 인식 
                */
                p.innerText = "\u00A0*\u00A0"; 
                div.appendChild(p);
            }
            else{
                p.innerText = "\u00A0\u00A0\u00A0";
                div.appendChild(p);
            }
            main.appendChild(div);
        }    
    }
}