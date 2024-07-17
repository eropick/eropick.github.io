import {Floor, Button, ElevatorButtons, Elevator,ElevatorSystem } from "./elevator.js"

window.addEventListener("load",()=>{
    const groundFloors = 5;
    const underFloors = 0;
    const elevatorSystem = new ElevatorSystem(groundFloors,underFloors);
    
    //시스템 동작 버튼 추가
    const sysBtn = document.querySelector("#sysbutton");
    sysBtn.addEventListener("click",()=>{ 
        //버튼 토글
        if(elevatorSystem.isActivated){
            elevatorSystem.stop();
            sysBtn.innerText="시작";
        }
        else{
            elevatorSystem.run();
            sysBtn.innerText="중단";
        }
    });

    /**************************구현****************************/

    //elevator 객체
    let elevator = elevatorSystem.elevator;
    
    //컨트롤할 버튼
    let eBtns=elevator.Buttons;

    //오픈 버튼
    let open = new Button();

    /**************************UI 연동****************************/
    let floorEboardUI = document.querySelector("#elevator .eboard p:nth-of-type(1)");
    let updownEboardUI = document.querySelector("#elevator .eboard p:nth-of-type(2)");


    function InitUI(){
        floorEboardUI.innerText = elevator.currentFloor;
        updownEboardUI.innerText = elevator.state;
    }

    /**************************업데이트****************************/
    function update(){
        InitUI();
    }
    update();
});

/*
const ebtns=document.querySelectorAll(".ebtn");

window.onload = ()=>{
    //버튼 처리
    ebtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            btn.classList.toggle("select");
        })
    });
};


$(document).ready(function(){

    let openButton = new Button("open");
    let closeButton = new Button("close");


    // 엘베 문 버튼 함수 설정 
    function openLDoor(autoCloseId){
        if(autoCloseId) //closeTimer가 설정된 경우 제거
            clearTimeout(autoCloseId);
        //기존에 설정된 .door_left에 대한 애니메이션 중단 => 열기 우선
        $(".door_left").stop();
        $(".door_left").animate({
            width : "1%",
        },3000);
    }

    function openRDoor(autoCloseId){
        if(autoCloseId) //closeTimer가 설정된 경우 제거
            clearTimeout(autoCloseId);
        $(".door_right").stop();
        $(".door_right").animate({
            width : "1%",
        },3000);
    }

    function closeLDoor(){ 
        $(".door_left").animate({
            width : "50%",
        },3000);
    }

    function closeRDoor(){
        $(".door_right").animate({
            width : "50%",
        },3000);
    }

    //닫히는 기능은 따로

    // 인식하려면 css에 해당 클래스가 반드시 존재해야 한다.
    let open = document.querySelector(".open");
    let close = document.querySelector(".close");
    let autoCloseLDoor = null;
    let autoCloseRDoor = null;

    open.addEventListener("mousedown",(e)=>{
        open.classList.add("select");
        openLDoor(autoCloseLDoor);
        openRDoor(autoCloseRDoor);
    });

    open.addEventListener("mouseup",(e)=>{
        open.classList.remove("select");
        //4초뒤 문닫힘
        autoCloseLDoor=setTimeout(function(){
            closeLDoor();
        },4000);
        autoCloseRDoor=setTimeout(function(){
            closeRDoor();
        },4000);
    });

    close.addEventListener("mousedown",(e)=>{
        close.classList.add("select");
        //여기에서 Elevator의 open이 활성화 되고 있는지 판단
        closeLDoor();
        closeRDoor();
    });

    close.addEventListener("mouseup",(e)=>{
        close.classList.remove("select"); 
    });
});

*/