//유튜브 Iframe 기본 포맷
var YtInfo = {
    logo : "fork_yt_logo.png",
    width : "100%",
    height : "400px",
    base : "https://www.youtube.com/embed/",
    title : "YouTube video player",
    frameborder : "0",
    autoplay : "autoplay=1",
    allow : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
}

//윈도우가 열릴 때 저장된 플레이 리스트를 불러와서 설정
window.onload = loadPlayList; 
//윈도우가 닫힐 때 플레이 리스트 저장
addEventListener("unload",savePlaylist);

function loadPlayList(){
    //1. 리스트로부터 값을 가져온다.
    let musicNameList = localStorage.getItem("musicNameList");
    let musicUrlList = localStorage.getItem("musicUrlList");

    //2. 키가 있는 경우에만 저장된 데이터를 추가한다.
    if(musicNameList!=null&&musicUrlList!="empty"){ 
        let musicNames = JSON.parse(musicNameList);
        let musicUrls = JSON.parse(musicUrlList);
        for(let i=0;i<musicNames.length;++i){
            addMusicInList(musicNames[i],musicUrls[i]);
        }
    }
}

//현재 플레이 리스트 저장 
function savePlaylist(){
    let playlist = document.getElementById("playlist");
    let musicNameList = null;
    let musicUrlList = null;
    let childCnt = playlist.childElementCount; 
    //음악 이름과 주소를 배열에 저장
    if(childCnt>0){ //값이 있을 경우에만 생성
        musicNameList = new Array();
        musicUrlList = new Array();
    }
    for(let i=0;i<childCnt;++i){ 
        let name = playlist.children[i].innerHTML;
        let url = playlist.children[i].title;
        musicNameList.push(name);
        musicUrlList.push(url);
    }
    if(musicNameList!=null){ //값이 존재하면 리스트로 저장
        localStorage.setItem("musicNameList",JSON.stringify(musicNameList));
        localStorage.setItem("musicUrlList",JSON.stringify(musicUrlList));
    }
    else //값이 없는 경우를 url이 empty인 것으로 표기
        localStorage.setItem("musicUrlList","empty");
}

function clearText(){
    let name = document.getElementById("musicName");
    let link = document.getElementById("musicLink");
    name.value="";
    link.value="";
}

//음악 검색처리 - oninput 이벤트 사용
function searchMusic(){
    let lists = document.getElementsByTagName("li"); //리스트 가져오기
    let musicName = document.getElementById("musicName"); 
    let name = new String(musicName.value).toLowerCase(); //대소문자 구분 없게하도록
    if(musicName.value==""){ //값이 없는 경우
        for(let i=0;i<lists.length;++i){ 
            lists[i].hidden=false; 
        }
    }
    else{
        //소문자로 반환
        for(let i=0;i<lists.length;++i){ 
            let listName = new String(lists[i].innerHTML).toLowerCase();
            if(listName.indexOf(name)!=-1){ //해당 이름이 존재하면
                lists[i].hidden=false;
            }
            else{ //존재하지 않으면
                lists[i].hidden=true;
            }
        }
    }
}

function addMusic(){ //음악 추가
    let name =document.getElementById("musicName");
    let link =document.getElementById("musicLink");
    if(name.value =="")
        alert("음악 이름을 입력해주세요!"); //이거 따로 메시지 띄우도록 변경 고려
    else{
        if(link.value =="") //링크가 없으면 기본 값 할당
            link.value="https://www.youtube.com/watch?v=a_k-dCgubFo";
            addMusicInList(name.value,link.value); //음악 이름, 링크를 리스트에 넣어준다.
        }
    clearText();
    searchMusic();//리스트 갱신
}

function addMusicInList(musicName,musicUrl){
    //li부모 가져오기
    let list =document.getElementById("playlist");
    //li생성
    let newLi =document.createElement("li");
    newLi.innerHTML=musicName; 
    newLi.title=musicUrl; 
    newLi.onclick =function(){
        if(isDelete) //버튼 활성화 시
            checker(this);
        else //삭제 버튼 활성화가 안 된경우 
            createPlayer(this); 
        } //노래 제목 클릭 시 플레이어 생성
    list.appendChild(newLi); 
}

var isDelete=false; //삭제 버튼 체커
function delMusic(btn){ //음악 삭제
    if(isDelete){ //삭제 버튼 활성화 시
        //체크 된 음악을 삭제함
        let playlist = document.getElementById("playlist");
        let checkedList = getCheckedList();
        for(let i=0;i<checkedList.length;++i){
            playlist.removeChild(checkedList[i]);
        }
        //삭제 작업 시 오류 방지를 위한 플레이어 삭제
        deletePlayer();
        /* 기본 이미지 삽입 */
        let sectionPlay= document.getElementById("sec_play");
        let imgYt = document.createElement("img");  
        imgYt.src=YtInfo.logo;
        imgYt.alt="여기에 영상";
        sectionPlay.appendChild(imgYt);
        //삭제 버튼 비활성화  
        isDelete=false; 
        btn.value="삭제";
    }
    else{ //삭제 버튼 비활성화 되어있다면
        isDelete=true; //활성화
        btn.value="선택 완료";
    }
}

//체크된 노드 가져오기
function getCheckedList(){
    let playlist = document.getElementById("playlist");
    let node = playlist.children; //li 목록들
    let checkedList = new Array();
    for(let i=0;i<node.length;++i){
        if(node[i].style.color=="red") //취소 처리된 인덱스를 받아온다.
            checkedList.push(node[i]);        
    }
    return checkedList;
}

//음악을 체크함
function checker(music){
    let cancle = music.style.textDecoration;
    if(cancle==""){ //변동값
        music.style.textDecoration="line-through";
        music.style.color="red";
    }
    else{ //기본값
        music.style.textDecoration="";
        music.style.color="";
    }
}

function deletePlayer(){ //기존에 있던 자식 삭제
    let sectionPlay=document.getElementById("sec_play");
    let childCnt = sectionPlay.childElementCount;
    let childNodes = sectionPlay.children;
    //.childNodes의 경우 빈 부분도 자식으로 처리
    for(let i=0;i<childCnt;++i){
        sectionPlay.removeChild(childNodes[i]);
    }
}

function createPlayer(music){ 
    deletePlayer(); //기존의 플레이어가 있으면 삭제 후 새로 생성
    let vID = getVideoID(music.title);
    //iframe 생성
    let newVideo = document.createElement("iframe");
    /* 설정작업 */
    newVideo.width=YtInfo.width;
    newVideo.height=YtInfo.height;
    newVideo.src=YtInfo.base.concat(vID+"?"+YtInfo.autoplay); //소스 + 자동재생처리
    newVideo.title=YtInfo.title;
    newVideo.frameborder=YtInfo.frameborder;
    newVideo.allow=YtInfo.allow;
    //재생할 구역 노드 가져오기
    let sectionPlay=document.getElementById("sec_play");
    sectionPlay.appendChild(newVideo);
}

//유튜브 링크로부터 VideoID추출
function getVideoID(link){
    let vID = getSplitUrl(new String(link));
    return vID;
}
//다양한 유튜브 링크에 대한 스플릿 반환
function getSplitUrl(url){
    const code = new Array("?v=","&",".be/","?");
    let urlSplit=null;
    let result=null;
    if(url.indexOf(code[0])!=-1){ 
        urlSplit = url.split(code[0]); //?v=로 분할한 경우 1번에 저장
        result = urlSplit[1].split(code[1]); //&로 분할하면 0번에 저장
    }
    else{
        urlSplit = url.split(code[2]); //.be/로 분할한 경우 1번에 저장
        result = urlSplit[1].split(code[3]); //?로 분할하면 0번에 저장
    }
    return result[0];
}