export {Jamo, EncodingKorEng}

//자모 분리 결합
class Jamo{
    constructor(str){
        this.separateArray = new Array();
        this.bindArray = new Array();
        this.inputStr = str;
        this.separate();
        this.bind();
    }

    //초성 : 19개(표준 자음 수)
    static firstElements = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ",
        "ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
    
    //중성 : 21개
    static middleElements = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ",
        "ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];

    //종성 : 공백 포함 -> 28개
    static lastElements = ["", "ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ",
        "ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ",
        "ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

        
    
    //현재 텍스트의 자모 분리
    separate(){
        let combinedChar=this.inputStr;
        let result = new Array();
        for(let i=0;i<combinedChar.length;++i){
            let char = combinedChar.charAt(i);
            //조합형 글자인지 판별
            if(char.charCodeAt(0)>="가".charCodeAt(0)){
                let codeSet=this.splitCharacter(char);
                codeSet=this.convCode2Char(codeSet);
                codeSet.forEach(character=>{
                    result.push(character);
                });
            }
            else
                result.push(char);
        }
        this.separateArray = result; 
    }

    //초-중-종성 문자열 패턴을 고려한 변환 필요

    //현재 텍스트의 자모 결합 코드
    bind(){
        let charSet = this.getSeparateString();
        //초-중-종성 인식 플래그
        let checkFirst = false;
        let checkMiddle = false;
        let checkLast = false;
        //종성 공백 인식 플래그 
        let isLastEmpty = false; 

        //결과가 담길 배열
        let result = new Array();

        for(let i=0;i<charSet.length;++i){
            let char = charSet.charAt(i);
            result.push(char);
            if(Jamo.checkConsonant(char)){ //자음
                if(checkFirst){ //초성 체크가 되어있다면
                    if(checkMiddle){ //중성 체크가 되어있다면

                        if(i+1 == charSet.length) 
                            checkLast = true;
                        else{
                            let nextChar = charSet.charAt(i+1);
                            if(!Jamo.checkVowel(nextChar)){ //모음이 아닌 경우 -> 종성처리
                                checkLast = true;
                            }
                        }

                    }
                }
                else
                    checkFirst = true;
            }
            else if(Jamo.checkVowel(char)){ //모음
                if(checkFirst){ //초성이 있는 경우
                    if(checkMiddle){ //중성이 있는 경우
                        checkLast = true;
                        isLastEmpty = true;
                    }
                    else{ //중성이 없는 경우
                        checkMiddle=true;
                        if(i+1==charSet.length){
                            checkLast = true;
                            isLastEmpty = true;
                        }
                        else{ 
                            let nextChar = charSet.charAt(i+1);
                            if(Jamo.checkConsonant(nextChar)){ //다음이 자음인 경우
                                
                                if(i+2 != charSet.length){ 
                                    let dbnextChar = charSet.charAt(i+2);
                                    if(Jamo.checkVowel(dbnextChar)){ //그 다음 문자가 모음이면
                                        //현재 중성까지가 마지막
                                        checkLast = true;
                                        isLastEmpty = true;
                                    }
                                }
                                
                            }
                            else{
                                checkLast = true;
                                isLastEmpty = true;
                            }
                        }
                    }
                }
            }
            else{ //자음과 모음이 아니면 기존의 플래그 초기화
                checkFirst = false;
                checkMiddle = false;
                checkLast = false;
                isLastEmpty = false; 
            }
            
            if(checkLast){ //종성까지 체크된 경우 -> result 수정
                if(isLastEmpty){ //종성이 비어있으면 뒤의 1자리와 결합
                    let unicode=this.concatElements(charSet.charAt(i-1),charSet.charAt(i),"");
                    for(let i=0;i<2;++i)
                        result.pop();
                    let concatString=String.fromCharCode(unicode)
                    result.push(concatString);
                }
                else{ //종성이 비어있지 않으면 뒤의 2자리와 결합
                    let unicode=this.concatElements(charSet.charAt(i-2),charSet.charAt(i-1),charSet.charAt(i));
                    for(let i=0;i<3;++i)
                        result.pop();
                    let concatString=String.fromCharCode(unicode)
                    result.push(concatString);
                }
                //플래그 초기화
                checkFirst = false;
                checkMiddle = false;
                checkLast = false;
                isLastEmpty = false; 
            }
        }
        this.bindArray = result
    }

    //현재 문자열 분리된 부분 반환
    getSeparateString(){
        return this.separateArray.join("");
    }

    //현재 문자열 결합된 부분 반환
    getBindString(){
        return this.bindArray.join("");
    }

    /*************초성-중성-종성 분리*************/

    /*  문자열의 분리공식은 다음과 같다.
        초성 = ((조합형 유니코드 - 유니코드 "가")/28)/21
        중성 = (조합형 유니코드 - 유니코드 "가")/28%21
        종성 = (조합형 유니코드 - 유니코드 "가")%28
    */

    splitCharacter(char){ 
        const startCode = "가".charCodeAt(0);
        const charCode = char.charCodeAt(0); 
        let charCodeArray = new Array();    
        const re = "^[가-힣]$"; //한글 조합형과 일치하는 경우만 분리
        let regExp = new RegExp(re,"g");
        if(regExp.test(char)){ 
            let firstCode = Math.floor(((charCode - startCode)/Jamo.lastElements.length)/Jamo.middleElements.length);
            let middleCode = Math.floor((charCode - startCode)/Jamo.lastElements.length%Jamo.middleElements.length);
            let lastCode =  Math.floor((charCode - startCode)%Jamo.lastElements.length);
            charCodeArray.push(firstCode);
            charCodeArray.push(middleCode);
            charCodeArray.push(lastCode);
            return charCodeArray;
        }
        else{
            console.log("분리 불가능");
            return null;
        }
    }//반환 값 charCodeArray

    convCode2Char(charCodeArray){ //charCode -> char
        let charArray = new Array();
        let fIndex = charCodeArray[0];
        let mIndex = charCodeArray[1];
        let lIndex = charCodeArray[2];
        charArray.push(Jamo.firstElements[fIndex]);
        charArray.push(Jamo.middleElements[mIndex]);
        charArray.push(Jamo.lastElements[lIndex]);
        if(Jamo.lastElements[lIndex]==""){ 
            //종성이 없는 경우 구분자로 Zero Width Space를 사용해서 구분
            charArray.push(String.fromCharCode(8203));
        }
        return charArray;
    }//반환 값 charArray


    /*************초성-중성-종성 결합*************/
    /*
        "가" 라는 유니코드 조합은 어떻게 만들 수 있을까?
        조합형 유니코드 = 유니코드 "가" + 종성 + (중성+초성*21)*28
        결과 유니코드 = 0XAC00(유니코드 '가') + 종성index + (중성index + 초성index*중성.length)*종성.length
    */

    concatElements(f,m,l){ //String
        let result = null;
        const startCode = "가".charCodeAt(0);
        let fIndex = Jamo.firstElements.findIndex((element)=>element==f);
        let mIndex = Jamo.middleElements.findIndex((element)=>element==m);
        let lIndex = Jamo.lastElements.findIndex((element)=>element==l);
        //인덱스 범위 판단
        if(fIndex>=0&&fIndex<=Jamo.firstElements.length&&
            mIndex>=0&&mIndex<=Jamo.middleElements.length&&
            lIndex>=0&&lIndex<=Jamo.lastElements.length)
        {
            result = startCode + lIndex + (mIndex + fIndex*Jamo.middleElements.length)*Jamo.lastElements.length;
        }
        else{
            result = "?".charCodeAt(0);
            console.log("변환 불가능");
        }
        return result;
    }//조합형 유니코드

    concatElementsFromList(charSets){
        return this.concatElements(charSets[0],charSets[1],charSets[2]);
    }

    //자음이면 true
    static checkConsonant(char){ 
        const re = "^[ㄱ-ㅎ]$";
        let regExp = new RegExp(re,"g");
        return regExp.test(char);
    }
    
    //모음이면 true
    static checkVowel(char){ 
        const re = "^[ㅏ-ㅣ]$";
        let regExp = new RegExp(re,"g");
        return regExp.test(char);
    }

}

//겹자음, 겹모음 분리-결합
class JamoKeyReplace{

    //겹자음 -> 단자음으로 변경
    static dblConsonant = {
        "ㄳ" : ["ㄱ","ㅅ"], "ㄵ" : ["ㄴ","ㅈ"], "ㄶ" : ["ㄴ","ㅎ"], "ㄺ" : ["ㄹ","ㄱ"],
        "ㄻ" : ["ㄹ","ㅁ"], "ㄼ" : ["ㄹ","ㅂ"], "ㄽ" : ["ㄹ","ㅅ"], "ㄾ" : ["ㄹ","ㅌ"],
        "ㄿ" : ["ㄹ","ㅍ"], "ㅀ" : ["ㄹ","ㅎ"], "ㅄ" : ["ㅂ","ㅅ"]
    }

    //단자음 2개 -> 겹자음
    static sglConsonant = {
        "ㄱ_ㅅ" : "ㄳ", "ㄴ_ㅈ" : "ㄵ", "ㄴ_ㅎ" : "ㄶ", "ㄹ_ㄱ" : "ㄺ",
        "ㄹ_ㅁ" : "ㄻ", "ㄹ_ㅂ" : "ㄼ", "ㄹ_ㅅ" : "ㄽ", "ㄹ_ㅌ" : "ㄾ",
        "ㄹ_ㅍ" : "ㄿ", "ㄹ_ㅎ" : "ㅀ", "ㅂ_ㅅ" : "ㅄ"
    }

    //겹모음
    static dblVowel = {
        "ㅘ" : ["ㅗ","ㅏ"], "ㅙ" : ["ㅗ","ㅐ"], "ㅚ" : ["ㅗ","ㅣ"], "ㅝ" : ["ㅜ","ㅓ"],
        "ㅞ" : ["ㅜ","ㅔ"], "ㅟ" : ["ㅜ","ㅣ"], "ㅢ" : ["ㅡ","ㅣ"]
    }

    //단모음 2개 -> 겹모음
    static sglVowel = {
        "ㅗ_ㅏ" : "ㅘ", "ㅗ_ㅐ" : "ㅙ", "ㅗ_ㅣ" : "ㅚ", "ㅜ_ㅓ" : "ㅝ",
        "ㅜ_ㅔ" : "ㅞ", "ㅜ_ㅣ" : "ㅟ", "ㅡ_ㅣ" : "ㅢ" 
    }

    //단자음, 단모음으로 변환
    static cvtSingleJamo(str){
        let result = [];
        for(let i=0;i<str.length;++i){
            let char = str.charAt(i);
            if(Jamo.checkConsonant(char)){//문자가 자음
                if(Object.keys(JamoKeyReplace.dblConsonant).includes(char)){ //존재하면
                    let dblc=JamoKeyReplace.dblConsonant[char];
                    result.push(dblc[0]);
                    result.push(dblc[1]);
                }
                else
                    result.push(char);
            }
            else if(Jamo.checkVowel(char)){ //문자가 모음
                if(Object.keys(JamoKeyReplace.dblVowel).includes(char)){
                    let dblv=JamoKeyReplace.dblVowel[char];
                    result.push(dblv[0]);
                    result.push(dblv[1]);
                }
                else
                    result.push(char);
            }
            else
                result.push(char);
        }
        result = result.join("");
        return result;
    }   
    
    //겹자음, 겹모음으로 변환
    static cvtDoubleJamo(str){
        let result = [];
        for(let i=0;i<str.length;++i){
            let char=str.charAt(i);
            if(i<str.length){ //마지막 문자가 아닐 때
                let nextChar = str.charAt(i+1);
                if(Jamo.checkConsonant(char)&&Jamo.checkConsonant(nextChar)){//현재와 다음 문자가 모두 자음
                    if(i-1<0){ //종성인지 판단 
                        let preChar = str.charAt(i-1);
                        if(Jamo.checkVowel(preChar)){ //이전 문자가 모음이라면 종성 파악
                            if(i+2<str.length){ //그 다음 다음 문자가 마지막이 아닌 경우
                                let nnextChar = str.charAt(i+2); //다음다음 문자 가져오기
                                if(Jamo.checkVowel(nnextChar)!=false){ //다음 다음 문자가 모음이 아닌 경우
                                    let bindedChar=JamoKeyReplace.bindSglConsonant(char,nextChar);
                                    if(bindedChar){
                                        char = bindedChar;
                                        ++i; //다음 문자 무시
                                    }
                                }
                            }
                        }
                    }
                }
                else if(Jamo.checkVowel(char)&&Jamo.checkVowel(nextChar)){ //현재와 다음 문자가 모두 모음
                    let bindedChar=JamoKeyReplace.bindSglVowel(char,nextChar);
                    if(bindedChar){
                        char = bindedChar;
                        ++i;
                    }
                }
            }
            result.push(char);
        }
        result=result.join("");
        return result;
    }

    //단자음 2개를 bind한 값을 반환 -> 없으면 false
    static bindSglConsonant(a,b){
        let key = `${a}_${b}`;
        if(Object.keys(JamoKeyReplace.sglConsonant).includes(key))
            return JamoKeyReplace.sglConsonant[key];
        else
            return false;
    }

    //단모음 2개를 bind한 값을 반환 -> 없으면 false
    static bindSglVowel(a,b){
        let key = `${a}_${b}`;
        if(Object.keys(JamoKeyReplace.sglVowel).includes(key))
            return JamoKeyReplace.sglVowel[key];
        else
            return false;
    }
}

//영문 한글 매칭
class EngKeyReplace{
    static jamo2Eng = {
        "ㄱ":"r", "ㄲ":"R", "ㄴ":"s", "ㄷ":"e", "ㄸ":"E", "ㄹ":"f",
        "ㅁ":"a", "ㅂ":"q", "ㅃ":"Q", "ㅅ":"t", "ㅆ":"T", "ㅇ":"d",
        "ㅈ":"w", "ㅉ":"W", "ㅊ":"c", "ㅋ":"z", "ㅌ":"x", "ㅍ":"v", "ㅎ":"g",
        "ㅏ":"k", "ㅐ":"o", "ㅑ":"i", "ㅒ":"O", "ㅓ":"j", "ㅔ":"p",
        "ㅕ":"u", "ㅖ":"P", "ㅗ":"h", "ㅛ":"y", "ㅜ":"n", "ㅠ":"b", "ㅡ":"m", "ㅣ":"l"
    }

    //대문자와 매칭되는 알파벳
    static matchedUpperAlpha = ["R","E","Q","T","W","O"];

    static cvtJamoToEng(charSet){
        let result =[];
        for(let i=0;i<charSet.length;++i){
            let char = charSet.charAt(i);
            let regExp = new RegExp("^[ㄱ-ㅎ|ㅏ-ㅣ]$","g");
            if(regExp.test(char)) //자음과 모음인 경우만 수행
                char = EngKeyReplace.getAlphabet(char);
            result.push(char);
        }
        result = result.join("");
        return result;
    }

    static cvtEngToJamo(charSet){
        let result = [];
        for(let i=0;i<charSet.length;++i){
            let char = charSet.charAt(i);
            let regExp = new RegExp("^[a-z|A-Z]$","g");
            if(regExp.test(char)) //영문인 경우만 수행
                char = EngKeyReplace.getJamo(char);
            result.push(char);
        }
        result = result.join("");
        return result;
    }

    static getAlphabet(jamo){
        return EngKeyReplace.jamo2Eng[jamo];
    }

    static getJamo(eng){
        //못찾은 경우 소문자로 변환
        if(EngKeyReplace.matchedUpperAlpha.findIndex((element)=>element==eng)<0)
            eng = new String(eng).toLowerCase();
        let jamoIndex = Object.values(EngKeyReplace.jamo2Eng).indexOf(eng);
        return Object.keys(EngKeyReplace.jamo2Eng)[jamoIndex];
    }
}

//한글 - 영문 키 변환 인코딩
class EncodingKorEng{
    constructor(str){
        this.jamo = new Jamo(str);
    }

    //영어 -> 한글로 인코딩
    encodeToKor(){
        let jamoStr=this.jamo.getBindString(); //객체 선언 시 입력받은 데이터를 가져옴
        let cvtJamo=EngKeyReplace.cvtEngToJamo(jamoStr); //영어 -> 한글
        let bindedJamo=JamoKeyReplace.cvtDoubleJamo(cvtJamo); //겹자음, 겹모음으로 합치기
        let result = new Jamo(bindedJamo); 
        return result.getBindString();
    }

    //한글 -> 영어 인코딩
    encodeToEng(){
        let jamoStr=this.jamo;
        let sepJamo=jamoStr.getSeparateString(); //자모 분리
        sepJamo=JamoKeyReplace.cvtSingleJamo(sepJamo); //단자음, 단모음으로 분리
        let result=EngKeyReplace.cvtJamoToEng(sepJamo); //영문 변환
        return result;
    }
}
