export {Stack};

class Stack{
    capacity = 10;
    top = -1;
    container = new Array();
    autoExtension = false; //자동 증가

    constructor(capacity){
        //잘못된 인수를 받은 경우나 없으면 용량이 늘어나는 스택
        if(typeof capacity === 'number')
            this.capacity = capacity;
        else
            this.autoExtension = true;
    }

    //가득 차있는지
    isFull(){
        if(this.top>=this.capacity){ //가득찬 경우
            if(this.autoExtension) //자동 확장
                this.capacity += 5;
            return true;
        }
        else
            return false;
    }

    isEmpty(){
        return (this.top==-1)?true:false;
    }
    
    //삽입
    push(data){
        if(this.isFull()){
            if(!this.autoExtension) //자동 확장이 비활성화 되어있으면 삽입불가
                return false;
        }
        this.top += 1;
        this.container[this.top] = data;
        return true;
    }

    //반환 및 삭제
    pop(){
        if(this.isEmpty())
            return null;
        else{
            let index = this.top;
            this.top -= 1;
            return this.container[index];
        }
    }

    //반환
    peek(){
        if(this.isEmpty())
            return null;
        else
            return this.container[this.top];
    }

    //배열 반환
    toArray(){
        let arr = new Array();
        for(let i=0;i<=this.top;i+=1){
            arr[i] = this.container[i];
        }
        return arr;
    }
}