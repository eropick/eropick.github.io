/* ui 관련 설정 부분 */
$(document).ready(()=>{
    $(".door .door_left").hover(function(e){
        /* hover 이벤트 발생. */
        
    });
});

/* 엘리베이터 버튼 */
const ebtns=document.querySelectorAll(".ebtn");

window.onload = ()=>{
    //버튼 처리
    ebtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            btn.classList.toggle("select");
        })
    });
};