let showData = document.querySelector("p");
//데이터 표시될 곳
const encodingKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
//공공API 인코딩 키(일반적으로 JS에서 요청시 사용)
const decodingKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
//공공API 원본 키 (보통 스프링부트에서 사용한다고 함)

/*
    활용 레퍼런스 주소
    https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15034075
*/

function getData(){
    let url = "http://apis.data.go.kr/URL_EndPoint/APImethod";
    let queryParams = "?serviceKey="+encodingKey; //서비스 키가 들어간다.
    /*  데이터 필터링용 파라미터
        queryParams += '&pageNo=1';
        queryParams += '&numOfRows=3';
        queryParams += '&cpCompname=??????'; //회사명
        queryParams += '&resultType=json'; //반환 타입
        queryParams += '&cpHgu=??????'; //
    */
    //필터링 안되는 코드 queryParams += '&cpClass=??????';

    //요청
    fetch(url+queryParams,{
        method : "GET",
        /*
            헤더에는 구체적인 메타 데이터 명시 -> 정확하지 않으면 에러
            headers : {
                //"Content-Type" : "application/json", 
            }
        */
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error! status: "+response.status);
        }
        return response.json();
    })
    .then(data => {
        //받아온 json 데이터 파싱
        let dataArray = data.response.body.items.item;
        //유효한 데이터만 가져오기
        showData.innerText = "";
        for(let i=0;i<dataArray.length;++i){
            showData.innerText += "데이터 번호 : "+i+"\n"+parsingData(dataArray[0])+"\n\n";
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });   
}

//데이터 파싱
function parsingData(data){ //input array
    let result = "";
    keys=Object.keys(data);
    console.log(keys);
    for(let i=0;i<keys.length;++i){
        let key = keys[i];
        console.log(key);
        result += key + " -> " + data[key]+"\n";
        console.log(result);
    }
    return result;
}