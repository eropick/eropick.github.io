window.addEventListener("load",function(){

    // URL에서 디렉터리 정보 가져오기
    const params = new URLSearchParams(window.location.search);
    const dirName = params.get("dir_name");

    const descriptionText = new Array();
    var currentIndex = -1;

    //드래그 처리용 변수
    let startX = 0; let deltaX = 0; let isDragging = false;
    const photoFrame = document.querySelector('.photo');

    //버튼
    const leftBtn = document.getElementById("left-slider-btn");
    const rightBtn = document.getElementById("right-slider-btn");

    //이미지 이동 함수
    function slidePrev(){updateBy(currentIndex-1);}
    function slideNext(){updateBy(currentIndex+1);}
    
    //이미지 업데이트 함수
    function updateBy(index){
        const totalIndex = descriptionText.length;
        if(index<0) index=totalIndex-1; //음수면 마지막으로 교정
        if(totalIndex>0){
            //이미지 변환
            currentIndex = index%totalIndex;
            const photoWrappers = document.querySelectorAll(".photo-wrapper");
            photoWrappers.forEach(photoWrapper=>{
                let offset = -currentIndex*100;
                photoWrapper.style.transform = `translateX(${offset}%)`;
            });
            //설명
            const description = document.querySelector('.description>p');
            description.innerText=descriptionText[currentIndex];
        }
    }

    //이미지 데이터 가져와서 추가
    if(dirName!==undefined && dirName!==null){
        // JSON 파일 경로
        const filePath = "./img_info/"+dirName+".json";
        // 이미지 디렉터리 베이스 경로
        const imgBaseDir = ".";
        // 이미지 슬라이더 데이터 추가하기
        fetch(filePath)  
        .then(response => response.json()) //Json 파싱
        .then(mapData => { //json 반환
            const photos = document.querySelector('.photo');
            const description = document.querySelector('.description>p');

            //샘플 노드 제거
            while(photos.firstChild) photos.removeChild(photos.firstChild);
            
            const title = mapData["title"];
            const data = mapData["imgData"];

            //타이틀 설정
            document.querySelector("#title").innerText = title;

            //가져온 json 데이터 파싱
            data.forEach(imgMetaData => {
                const imgWrapper = document.createElement("div");
                const imgElem = document.createElement("img");
                imgWrapper.className="photo-wrapper";
                imgElem.src = imgBaseDir+imgMetaData.src;
                imgElem.alt = imgMetaData.alt;
                imgElem.addEventListener("dragstart", (e) => e.preventDefault()); //이미지 드래깅 방지
                imgWrapper.appendChild(imgElem);
                photos.appendChild(imgWrapper);
                const descriptionJoin = imgMetaData.description.join("\n");
                descriptionText.push(descriptionJoin);
            });
            //초기 설명 설정
            if(descriptionText.length>0){
                currentIndex = 0;
                description.innerText=descriptionText[currentIndex];
            }
        })
        .catch(error => console.error('Json 파일 없음 : ', error));
    }

    //슬라이드 이벤트 함수
    function startDrag(event) {
        isDragging = true;
        startX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
        deltaX = 0;
    }

    function moveDrag(event) {
        if (!isDragging) return;
        let moveX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;
        deltaX = moveX - startX;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        // 드래그 이동 거리 기준 (슬라이드 너비의 15%)
        const movePercent = (Math.abs(deltaX)/ photoFrame.clientWidth) * 100;
        const basePercent = 15;
        if (movePercent >= basePercent) {
            if (deltaX < 0) {  // 오른쪽으로 드래그
                slideNext();
            } else { //좌측 드래그
                slidePrev();
            }
        } else {
            // 드래그 거리가 작으면 현재 슬라이드 유지
            updateBy(currentIndex);
        }
    }

    //마우스 이벤트 등록
    photoFrame.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", moveDrag);
    document.addEventListener("mouseup", endDrag);

    //터치 이벤트 등록
    photoFrame.addEventListener("touchstart", startDrag);
    document.addEventListener("touchmove", moveDrag);
    document.addEventListener("touchend", endDrag);

    //버튼 이벤트 등록
    leftBtn.addEventListener("click",slidePrev);
    rightBtn.addEventListener("click",slideNext);

});