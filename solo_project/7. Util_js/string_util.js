//자주 사용하는 문자열 처리 유틸
export {StringUtil,stringf};

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
        if(diffCase==null||diffCase==false){ //대소문자 구분X
            origin = origin.toUpperCase();
            string = string.toUpperCase();
        }
        let count = origin.split(string).length-1;
        return count;
    }
}

//문자열 인자 포맷팅
/* %입력은 %%로 두번 입력으로 적용  */
function stringf(str,...args){
    /* 퍼센트 사용으로 인한 전처리 */
    let result = StringUtil.replaceFromSubstr(str,"%%","prcnt");
    
    //인자 개수 유효성 검사
    const argsLength = args.length;
    const perLength = StringUtil.countStringInText(result,"%"); //%의 개수
    if(argsLength!=perLength){
        console.log("유효하지 않은 인자");
        return -1;
    }
    
    const splitStr = result.split("%");
    let stringList = new Array(splitStr[0]); //첫번째는 인자 없음
    for(let i=0;i<argsLength;++i){
        let arg = args[i];
        //인자의 포맷 일치여부
        let isMatchedType = matchType(arg,splitStr[i+1].charAt(0));
        if(isMatchedType=="not-format"){ //포맷이 아닌경우
            stringList.push(arg);    
            stringList.push(splitStr[i+1]);
        }
        else if(isMatchedType){ //일치
            stringList.push(arg);    
            stringList.push(splitStr[i+1].slice(1)); //형식 제외
        }
        else{ //불일치
            stringList.push(NaN);    
            stringList.push(splitStr[i+1].slice(1)); //형식 제외
        } 
    }
    result = stringList.join("");    

    //%로 교체반환
    result = StringUtil.replaceFromSubstr(result,"prcnt","%"); 
    return result;
}   

//format : string, decimal, floating point 만 적용
//그 외 지정되지 않은 형식은 그대로 출력
//s,d,f를 썼음에도 일치하지 않으면 NaN으로 변환
function matchType(arg,format){
    let type = null;

    if(format!="s"&&format!="d"&&format!="f")
        return "not-format";

    if(typeof(arg)==typeof(String))
        type =  "s";
    else if(isFinite(arg)){
        if(arg==Math.trunc(arg))
            type= "d";
        else
            type= "f";
    }
    else
        type = format;

    return type==format?true:false;
}