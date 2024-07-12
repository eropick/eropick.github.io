/* ui 관련 설정 부분 */
$(document).ready(()=>{
    let dl_width = $(".door .door_left").css("width");
    let dr_width = $(".door .door_right").css("width");

    $(".door").hover(function(){    
        /* hover 이벤트 발생. */
        $(".door .door_left").animate({
            width : "1px",
        },3000);
        $(".door .door_right").animate({
            width : "1px",
        },3000);
    },function(){
        /* hover 이벤트 발생. */
        $(".door .door_left").animate({
            width : dl_width,
        },3000);
        $(".door .door_right").animate({
            width : dr_width,
        },3000);
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