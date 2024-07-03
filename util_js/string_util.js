//자주 사용하는 문자열 처리 유틸
class StringUtil{

    //특정 인덱스의 문자를 다른 문자열로 교체
    static replaceFromIndex(origin,index,rep){
        let result = origin;
        result = result.split(''); //to Array
        result.splice(index,1,rep); //replace to new string
        result = result.join(""); //to string
        return result;
    }

    //부분 문자열 교체
    static replaceFromSubstr(origin,substr,rep){
        let result = origin;
        result = result.split(substr); //string to array
        result=result.join(rep); //array to string
        return result;
    }

    //문장에서 찾은 문자열의 반복되는 개수 구하기
    static countStringInText(origin,string,diffCase){ //케이스 구분 여부
        if(diffCase!=null&&diffCase==true){
            origin = origin.toUpperCase();
            string = string.toUpperCase();
        }
        let count = origin.split(string).length-1;
        return count;
    }
}