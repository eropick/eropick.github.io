class Floor{ //각 층
    constructor(num){
        this.number = num;
        this.upButton = new Button("up");
        this.downButton = new Button("down");
    }
    //버튼 누르기
    selectUpBtn(){
        this.upButton.select();
    }
    selectDownBtn(){
        this.downButton.select();
    }
}

//버튼
class Button{
    constructor(id){
        this.id=id;
        this.isSelected=false;
        this.isActivated=true;
    }
    select(){ //toggle Button
        this.isSelected=this.isSelected?false:true;
    }
    activate(){
        this.isActivated=true;
    }
    deactivate(){
        this.isActivated=false;
    }
}

//엘리베이터 버튼
class ElevatorButtons{
    constructor(groundF,underF){ 
        this.groundFloorBtns = []; //지상층 버튼
        this.underFloorBtns = []; //지하층 버튼
        this.maxGroundFloor = groundF; //지상층 최대
        this.maxUnderFloor = underF; //지하층 최대
        this.initButton(); //버튼 생성
    }
    initButton(){
        const maxGF = this.maxGroundFloor;
        const maxUF = this.maxUnderFloor;
        for(let i=0;i<maxGF;++i)
            this.groundFloorBtns.push(new Button(i+1));    
        for(let i=0;i<maxUF;++i)
            this.underFloorBtns.push(new Button((i+1)*-1));
    }

    //버튼 추가
    addGroundBtn(){ //지상층 버튼 추가
        this.maxGroundFloor+=1;
        this.groundFloorBtns.push(new Button(this.maxGroundFloor));
    }
    addUnderBtn(){
        this.maxUnderFloor+=1;
        this.underFloorBtns.push(new Button(this.maxUnderFloor*-1));
    }

    //버튼 삭제
    //참고 : Array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
    //참고2 : Array.indexOf("값"); -1 => 못찾음 
    delGroundBtn(){ //최소 제한 1층은 반드시 존재
        if(this.maxGroundFloor>1){
            this.maxGroundFloor-=1;
            this.groundFloorBtns.pop();
        }
    }
    delUnderBtn(){
        if(this.maxUnderFloor>0){
            this.maxUnderFloor-=1;
            this.underFloorBtns.pop();
        }
    }

    //버튼 누르기
    select(btn){
        let btnNumToStr = String(btn); 
        //지상, 지하 버튼 분리
        let button = (btnNumToStr.indexOf("F")==-1)?
            this.groundFloorBtns[parseInt(btnNumToStr)-1]:
            this.underFloorBtns[parseInt(btnNumToStr.split("F")[1])-1];
        if(button.isActivated)
            button.select();
    }

    //눌려진 층 수를 반환
    getSelectedFloors(){
        let buttonIds = [];
        for(let i=this.maxUnderFloor-1;i>=0;--i){ //지하
            let btn = this.underFloorBtns[i];
            if(btn.isSelected)
                buttonIds.push(btn.id);
        }
        for(let i=0;i<this.maxGroundFloor;++i){ //지상
            let btn = this.groundFloorBtns[i];
            if(btn.isSelected)
                buttonIds.push(btn.id);
        }
        return buttonIds;
    }
}

class Elevator{ //문열기, 문닫기, 층수 카운팅
    constructor(id,groundFloor,underFloor){
        this.id=id; //엘리베이터 id
        this.isOpen=true; //문이 열렸는지 여부
        this.Buttons = new ElevatorButtons(groundFloor,underFloor); //버튼
        this.currentFloor = 1; //현재 층 수
        /* ... -4 -3 -2 -1 1 2 3 4 ... */
    }

    getId(){ return this.id; }

    //elevator의 층수 올리고 내림
    upFloor(){
        const maxF = this.Buttons.maxGroundFloor;
        if(this.currentFloor<maxF){
            this.currentFloor++;
            if(this.currentFloor==0) //지하 1층 => 1층
                this.currentFloor++;
        }
    }
    downFloor(){
        //지하층이 없으면 최소 층을 1로 지정
        const minF = (this.Buttons.maxUnderFloor*-1)==0?1:this.Buttons.maxUnderFloor*-1;
        if(this.currentFloor>minF){
            this.currentFloor--;
            if(this.currentFloor==0) //1층 => 지하 1층
                this.currentFloor--;
        }
    }

    open(){ this.isOpen=true; }

    close(){ this.isOpen=false; }
}

//엘리베이터-층 - 제어 클래스
class ElevatorSystem{ 
    constructor(groundFloors,underFloors){
        this.maxGroundFloors = groundFloors; //지상층 최대 높이
        this.maxUnderFloors = underFloors; //지하층 최대 높이
        this.Floors = (()=>{ //지하층 ~ 지상층
            let Floors = [];
            //지하층 버튼 추가
            for(let i=underFloors; i>0; --i)
                Floors.push(new Floor(i*-1));
            //지상층 버튼 추가
            for(let i=1; i<=groundFloors; ++i)
                Floors.push(new Floor(i));
            return Floors;
        })();
        this.elevator = new Elevator(1,groundFloors,underFloors); //엘리베이터
        
        this.isActivated = false;
    }
    
    //초기화
    initSystem(){
        this.Floors = [];
        //지하층 버튼 추가
        for(let i=this.maxUnderFloors; i>0; --i)
            this.Floors.push(new Floor(i*-1));
        //지상층 버튼 추가
        for(let i=1; i<=this.maxGroundFloors; ++i)
            this.Floors.push(new Floor(i));
        //엘리베이터 추가
        this.elevator=new Elevator(1,maxGroundFloors,maxUnderFloors);
    }

    //실행
    async run(){
        this.isActivated = true;
        /*
        while(this.isActivated){
            //눌린 버튼 목록 가져오기

        }
        */
        console.log("실행중!");
    }

    //중단
    stop(){
        this.isActivated = false;
        console.log("중단!");
    }
}

var elevatorSystem = null;
function simulate(groundFloor,underFloor){
    elevatorSystem = new ElevatorSystem(groundFloor,underFloor);
    //시스템 동작 버튼
    const button = document.querySelector("button");
    button.addEventListener("click",()=>{ 
        //버튼 토글
        if(elevatorSystem.isActivated){
            elevatorSystem.stop();
            button.innerText="시작";
        }
        else{
            elevatorSystem.run();
            button.innerText="중단";
        }
    });
    
    //컨트롤할 버튼
    const eBtns = elevatorSystem.elevator.Buttons;
    //--> GUI 버튼과 연동
}
window.addEventListener("load",()=>{
    simulate(5,4);
});