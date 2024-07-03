//사용자 정의 자료 구조
//자료값의 고유성을 유지하는 배열
class UniqueArray{
    constructor(...data){
        this.items = (()=>{
            let result = [];
            data.forEach((element)=>{
                if(result.indexOf(element)==-1)
                    result.push(element);    
            });
            return result;
        })();
        return this;
    }

    getLength(){
        return this.items.length;
    }

    push(...data){
        let result = this.items;
        data.forEach((element)=>{
            if(result.indexOf(element)==-1)
                result.push(element);
        });
        return result.length;
    }

    pop(){
        return this.items.pop();
    }

    toArray(){
        return this.items;
    }

    sort(compareFunction){
        this.items.sort(compareFunction);
    }

    toString(){
        return this.items.join(" ");
    }
}