//자주 사용하는 수학 유틸 제작
export {MathUtil};

class MathUtil{
    //정수
    static randomInt(min,max){ 
        let _max = (max>min)? Math.trunc(max) : Math.trunc(min);
        let _min = (max>min)? Math.trunc(min) : Math.trunc(max);
        let random = Math.floor((Math.random()*(_max+1-_min)))+_min;
        return random;
    }

    //실수 난수
    static randomFloat(min,max,n){
        let _max = (max>min)? max : min;
        let _min = (max>min)? min : max;
        const digit=Math.pow(10,n); //자릿수
        let random = (Math.Floor(Math.pow((Math.random()*(_max+1-_min)))*digit)/digit)+_min;
        return random;
    }

    //degree to radian
    static deg2rad(degree){
        return (degree*Math.PI)/180;
    }

    //radian to degree
    static rad2deg(radian){
        return (radian*180)/Math.PI
    }
}