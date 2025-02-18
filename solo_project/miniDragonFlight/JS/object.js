import { Vector2D } from "./vector.js"
export { Vector2D, GameObject, Person, Bullet, Enemy, Reddd };

class GameObject{
    constructor(x,y){
        this.point = new Vector2D(x,y);
        this.coordinate = "LeftBottom origin";
    }
    draw(ctx){
        console.log("Object"); /* 오버라이드 => 자식 클래스에 적용 */
    }

    //==> 캔버스 매퍼
    mapCoordLB2Canvas(canvas){ 
        let vec = this.point;
        if(this.coordinate =="LeftBottom origin"&&typeof canvas == "object"){
            let height = canvas.height;
            vec.y = height - vec.y;
            this.coordinate = "Canvas origin";
        }
    }//change origin LeftBottom to Canvas

    mapCoordCanvas2LB(canvas){
        let vec = this.point;
        if(this.coordinate=="Canvas origin"&&typeof canvas == "object"){
            let height = canvas.height;
            vec.y = (vec.y - height)*-1;
            this.coordinate = "LeftBottom origin";
        }
    }//change origin Canvas to LeftBottom

    static mapCoordLB2CanvasAll(canvas,...objs){
        objs.forEach((object)=>{
            object.mapCoordLB2Canvas(canvas);
        });
    } //여러 벡터를 한 번에 좌표계 변경

    static mapCoordLB2CanvasFromList(canvas,objs){
        objs.forEach((object)=>{
            object.mapCoordLB2Canvas(canvas);
        });
    } //배열로 인자 받는 경우

    static mapCoordCanvas2LBAll(canvas,...objs){
        objs.forEach((object)=>{
            object.mapCoordCanvas2LB(canvas);
        });
    } //여러 벡터를 한 번에 좌표계 변경

    static mapCoordCanvas2LBFromList(canvas,objs){
        objs.forEach((object)=>{
            object.mapCoordCanvas2LB(canvas);
        });
    } //배열로 인자 받는 경우
}

/* 사람 */
class Person extends GameObject{
    constructor(x,y,width,height,color){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color
        this.bullet = null;
        this.isAttack = false; //공격 제어
        this.attackInterval = null; //공격 간격 제어
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.point.x, this.point.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    //이동 값 상하좌우 범위를 제공
    move(movedUnit,xRange,yRange){ //이동 단위, Vector2D, Vector2D 
        try{
            if(!(xRange instanceof Vector2D))
                throw "xRange 잘못된 인수";
            else if(!(yRange instanceof Vector2D))
                throw "yRange 잘못된 인수";
            if(xRange.x != xRange.y){ //x축 이동 범위가 존재하면
                let max = (xRange.x>xRange.y)?xRange.x:xRange.y;
                let min = (xRange.x<xRange.y)?xRange.x:xRange.y;
                let movedVec = this.point.add(new Vector2D(movedUnit,0));
                if(min<=movedVec.x&&movedVec.x<=max) //범위 이내라면
                    this.point = movedVec;
            }
            if(yRange.x != yRange.y){ //y축 이동 범위가 존재하면
                let max = (yRange.x>yRange.y)?yRange.x:yRange.y;
                let min = (yRange.x<yRange.y)?yRange.x:yRange.y;
                let movedVec = this.point.add(new Vector2D(0,movedUnit));
                if(min<=movedVec.x&&movedVec.x<=max)
                    this.point = movedVec;
            }
        }
        catch(msg){
            console.error(msg);
        }
    }

    //총알 설정
    setBullet(bullet){
        try{
            if(!(bullet instanceof Bullet))
                throw "bullet 잘못된 인수";
            this.bullet = bullet;
        }
        catch(msg){
            console.error(msg);
        }
    }

    //총알 위치 설정
    setPosBullet(){
        let bWidth = this.bullet.width;
        let bHeight = this.bullet.height;
        let centerX = this.point.x+(this.width/2)-(bWidth/2);
        let centerY = this.point.y-(this.height/2)+(bHeight/2);
        let vector = new Vector2D(centerX,centerY);
        this.bullet.setPosition(vector);
    }

    //공격에 사용할 총알 반환
    getShootingBullet(){
        this.setPosBullet();
        return this.bullet.copy(); //공격한 총알 반환
    }

    //공격 갭 모듈러 연산
    setAttackInterval(unit){
        this.attackInterval=setTimeout(()=>{
            this.attackInterval = null;
        },unit*1000);
    }
    //공격 간격 제어
}

/* 총알 */
class Bullet extends GameObject{
    constructor(x,y,width,height,color){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    setPosition(pos){
        try{
            if(!(pos instanceof Vector2D))
                throw "pos 잘못된 인수";
            this.point = pos;
        }catch(err){
            console.log(err);
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.point.x, this.point.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(unit,dirVec){ //총알을 조금씩 이동시킵니다.
        try{
            if( typeof unit !== "number")
                throw "unit 잘못된 인수";
            else if(!(dirVec instanceof Vector2D))
                throw "dirVec 잘못된 인수";
            let movedUnit = dirVec.normalize().mul(unit);
            this.point=this.point.add(movedUnit);
        }catch(err)
        {
            console.log(err);
        }
    }

    //복사
    copy(){
        let object = new Bullet(this.point.x,this.point.y,this.width,this.height,this.color);
        return object;
    }
}

/* 적 */
class Enemy extends GameObject{
    constructor(x,y,width,height,color){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(this.point.x, this.point.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move(unit,dirVec){ //적을 조금씩 이동시킵니다.
        try{
            if( typeof unit !== "number")
                throw "unit 잘못된 인수";
            else if(!(dirVec instanceof Vector2D))
                throw "dirVec 잘못된 인수";
            let movedUnit = dirVec.normalize().mul(unit);
            this.point=this.point.add(movedUnit);
        }catch(err)
        {
            console.log(err);
        }
    }
}

//적 종류 임시로 생성
class Reddd extends Enemy{
    constructor(x,y){
        super(x,y,40,60,"#ff00ff");
    }
}
































/* 벽돌 */
class Block extends GameObject{
    constructor(x,y,width,height,life){
        super(x,y);
        this.width = width;
        this.height = height;
        this.life = life;
        this.hit=false;
    }
    //생명 종속
    static color = ["#007bff","#8ed973","#fc932a","#ff9393","#78206e"];

    setLife(value){
        this.life=value;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.point.x + this.width / 2, this.point.y + this.height / 2);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-(this.point.x + this.width / 2), -(this.point.y + this.height / 2));
        ctx.beginPath();
        ctx.rect(this.point.x, this.point.y, this.width, this.height);
        ctx.fillStyle = Block.color[this.life - 1];
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        if (this.hit) {
            this.scale = 2.0; // 충돌 시 크기 증가
            this.hit = false; // 한 프레임 후에 원래 상태로 되돌림
        } else {
            if (this.scale > 1.0) {
                this.scale -= 0.1; // 원래 크기로 돌아옴
            }
        }
    }

     // 블럭 충돌 함수
     hitBlock() {
        this.hit = true;
    }
}

/* 선 */
class Line extends GameObject{
    constructor(sx,sy,ex,ey,color){
        super(0,0);
        this.start = new Vector2D(sx,sy);
        this.end = new Vector2D(ex,ey);
        this.color = color;
    }

    //Object의 메서드 오버라이드
    mapCoordLB2Canvas(canvas){ 
        let start = this.start;
        let end = this.end;
        if(this.coordinate =="LeftBottom origin"&&typeof canvas == "object"){
            let height = canvas.height;
            start.y = height - start.y;
            end.y = height - end.y;
            this.coordinate = "Canvas origin";
        }
    }//change origin LeftBottom to Canvas

    mapCoordCanvas2LB(canvas){
        let start = this.start;
        let end = this.end;
        if(this.coordinate=="Canvas origin"&&typeof canvas == "object"){
            let height = canvas.height;
            start.y = (start.y - height)*-1;
            end.y = (end.y - height)*-1;
            this.coordinate = "LeftBottom origin";
        }
    }//change origin Canvas to LeftBottom

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.start.x,this.start.y);
        ctx.lineTo(this.end.x,this.end.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
    }
}

/************************* Item ********************************/
class Item extends GameObject{
    constructor(x, y, width, height, color, itemType, speed) {
        super(x, y);
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.type=itemType;
        this.active = true;
    }

    draw(ctx) {
        if (!this.active) return;
        ctx.beginPath();
        ctx.rect(this.point.x, this.point.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!this.active) return;
        this.point.y -= this.speed; // 아래로 떨어짐
        if (this.point.y < 0) {
            this.active = false; // 화면 밖으로 나가면 비활성화
        }
    }

    deactivate() {
        this.active = false;
    }
}