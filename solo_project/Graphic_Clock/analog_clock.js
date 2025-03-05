var canvas = null;
var ctx = null;

//Fill : 채우기 - 도형
//Stroke : 긋기?? - 선

// PI = 180도
// 1도 = PI/180
// degree*1도 = (degree*PI)/180
function deg2rad(degree){
    return (degree*Math.PI)/180;
}

window.addEventListener("load",()=>{
    let container = document.querySelector("#container");
    canvas=document.createElement("canvas");
    // getContext('2d') 랜더링
    ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    let x=container.clientWidth/2;
    let y=container.clientHeight/2;
    setInterval(()=>{
        drawClockFrame(x,y,250);
        drawClockHands(x,y,250,new Date());
    },100);
});

function drawClockFrame(x,y,r){
    /*****  시계 틀 그리기  *****/
    ctx.beginPath();
    //x,y,반지름,시작각도, 끝각도, 반시계방향으로 그릴지 여부
    ctx.arc(x,y,r,0,Math.PI*2,false); 
    ctx.fillStyle = "black";
    ctx.lineWidth = "10";
    ctx.strokeStyle = "magenta";
    ctx.fill(); 
    ctx.stroke();
    ctx.closePath();

    /*****  시계 시간 그리기 *****/
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "20px bold";
    ctx.textBaseline = "middle";
     
    const div = 12; //나누는 수
    const unitDeg = 360/div; //단위 각도
    
    //텍스트 위치 조절 인수
    const textX = -15; //x값 
    const textR = r*0.9; //반지름 값

    //시간 채워넣기
    for(let i=1;i<=div;++i){
        let hour = ((i+2)%div)+1; //0도 -> 3시를 바라봄 [1~12]
        let degree = unitDeg*i; //
        //원점에서 x,y를 가리키는 벡터와의 합으로 표기 가능
        ctx.fillText(hour+"시",x+(textR*Math.cos(deg2rad(degree)))+textX,y+(textR*Math.sin(deg2rad(degree))));    
    }
    ctx.closePath();
}

function drawClockHands(x,y,r,date){

    /*** 현재 시간 -> 초단위로 변경 ***/
    let hour2SecUnit = (date.getHours()%12)*60*60 + date.getMinutes()*60 + date.getSeconds();
    let min2SecUnit = date.getMinutes()*60 + date.getSeconds();
    let sec2SecUnit = date.getSeconds();
    /*** 기준 각도 -> 기본 90도 앞에 있으므로 -90도 처리 ***/
    const baseDeg = -90;

    /*** 시간,분,초 ***/
    let hourDeg = baseDeg + hour2deg(hour2SecUnit);
    let minDeg = baseDeg + minute2deg(min2SecUnit);
    let secDeg = baseDeg + second2deg(sec2SecUnit);

    /***** 시침 그리기 *****/
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "orange";
    ctx.moveTo(x,y);
    let hLength = r*0.6; //시침 길이 조정상수
    ctx.lineTo(x+(hLength*Math.cos(deg2rad(hourDeg))),y+(hLength*Math.sin(deg2rad(hourDeg))));
    ctx.stroke();
    ctx.closePath();

    /***** 분침 그리기 *****/
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "green";
    ctx.moveTo(x,y);
    let mLength = r*0.85; //분침 길이 조정상수
    ctx.lineTo(x+(mLength*Math.cos(deg2rad(minDeg))),y+(mLength*Math.sin(deg2rad(minDeg))));
    ctx.stroke();
    ctx.closePath();

    /***** 초침 그리기 *****/
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.moveTo(x,y);
    let sLength = r*0.95; //초침 길이 조정상수
    ctx.lineTo(x+(sLength*Math.cos(deg2rad(secDeg))),y+(sLength*Math.sin(deg2rad(secDeg))));
    ctx.stroke();
    ctx.closePath();

    /***** 고정축 그리기 *****/
    ctx.beginPath();
    ctx.arc(x,y,r*0.05,0,Math.PI*2,false); 
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

/* 
360도 : 60초 = sec도 : 1초
sec = 6 deg/sec

6도 : 1분 => 6도 : 60초
min = 0.1 deg/sec

30도 : 60분 => 30도 : 3600초
hour = 1/120 deg/sec
*/

//시간을 각도로 변환
function hour2deg(times){
    return times*(1/120); // 초당 -> 1/120도 이동
}

//분을 각도로 변환
function minute2deg(times){
    return times*0.1; // 초당 -> 0.1도 이동
}

//초를 각도로 변환
function second2deg(times){
    return times*6; //초당 6도 이동
}