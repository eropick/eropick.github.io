import { Vector2D, GameObject, Person, Bullet, Enemy, Reddd } from "./object.js"

$(document).ready(function(){
    const canvas = document.getElementById("wall");
    const ctx = canvas.getContext("2d");
    canvas.width = 420; //css와 비율 맞춤
    canvas.height = 500;
        
    /******************************게임 설정 데이터**********************************/


    /******************************오브젝트 관리**********************************/
    
    let person = null; let bullets = []; let enemies = [];
    let objects = []; //모든 오브젝트 

    //사람 초기화
    function initPerson(){
        const personWidth = 30; const personHeight = 40;
        const personX = canvas.width/2-personHeight/2;
        const personY = canvas.height/7;
        person = new Person(personX, personY, personWidth, personHeight,"#000000");
        //총알 설정
        let bWidth = 5; 
        let bHeight = 20;
        person.setBullet(new Bullet(0,0,bWidth,bHeight,"#ff0000"));//빨간 총알
    }

    function initEnemies(){
        enemies.push(new Reddd(5,canvas.height-50));
    }

    function initObject(){
        initPerson();
        initEnemies();
        //오브젝트 관리용 배열
        objects = new Array();
        objects.push(person);
        enemies.forEach(enemy=>{
            objects.push(enemy);
        });
    }
    initObject();
    
    /******************************이벤트 관리**********************************/
    let rightPressed = false;
    let leftPressed = false;
    
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight")
            rightPressed = true;
        else if (e.key === "Left" || e.key === "ArrowLeft")
            leftPressed = true;
        if(e.key === "z")
            person.isAttack = true;
    }
    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight")
            rightPressed = false; 
        else if (e.key === "Left" || e.key === "ArrowLeft")
            leftPressed = false;
        if(e.key === "z")
            person.isAttack = false;
    }

    /******************************오브젝트 값 수정**********************************/

    //사람
    function personMove(){ //이동
        let movedUnit = 5;
        let min = 10;
        let max = canvas.width-person.width-min;
        if(rightPressed)
            person.move(movedUnit,new Vector2D(min,max),new Vector2D(0,0));
        else if(leftPressed)
            person.move(-movedUnit,new Vector2D(min,max),new Vector2D(0,0));
    }

    function personAttack(){ //공격
        let interval = 0.05; //sec
        if(person.isAttack&&person.attackInterval==null){
            person.setAttackInterval(interval);
            let bullet = person.getShootingBullet();
            bullets.push(bullet); //총알 계산을 위한 배열
            objects.push(bullet); //그리기 위한 오브젝트 넣기
        }

        //총알 이동시키기
        let unit = 5; //이동 단위
        let dirVec = new Vector2D(0,1); //위쪽 방향
        bullets.forEach(bullet=>{
            bullet.move(unit,dirVec);
        });
    }

    function deleteBullet(index){ //총알 삭제
        let bullet=bullets.splice(index,1)[0];
        let collideBulletIndex=objects.indexOf(bullet);
        objects.splice(collideBulletIndex,1);
    }

    function updatePerson(){
        personMove();
        personAttack();
    }

    //적


    /******************************충돌 관리**********************************/

    //두 점 사이 거리 구하기
    function getDistAtoB(sx,sy,ex,ey){
        let result = Math.sqrt(Math.pow(sx-ex,2)+Math.pow(sy-ey,2));
        return result;
    }

    function isCollidedWall(bullet){
        //벽과 충돌
        if(bullet.point.y>=canvas.height)
            return true;
        else
            return false;
    }

    function isCollidedEnemy(bullet){
        return false;
    }

    function processCollision(){
        //총알 제거
        for(let i=0;i<bullets.length;++i){
            //벽에 맞았을 때
            if(isCollidedWall(bullets[i])) 
                deleteBullet(i);
        }
    }

    /******************************canvas 그리기**********************************/

    function update(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //그리기 위한 모든 오브젝트를 canvas 좌표계로 변환 
        GameObject.mapCoordLB2CanvasFromList(canvas,objects);
        objects.forEach((object)=>{ 
            object.draw(ctx);
        });
        
        //값의 변경을 위해 LB 좌표계로 변환
        GameObject.mapCoordCanvas2LBFromList(canvas,objects);
        /* 좌표 계산할 부분 */
        updatePerson(); //사람의 동작 업데이트
        processCollision();  //충돌 처리

        requestAnimationFrame(update);
    }
    update();
});
