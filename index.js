$(document).ready(function(){
    //반응형 쿼리
    const mql = window.matchMedia("screen and (max-width : 576px)");
    const sideBtn = $(".sidebar button[type='button']");
    sideBtn.text("⟨");
    //사이드바 애니메이션 등록
    sideBtn.click(function(){
        $(".sidebar").toggleClass("sidebar_toggle");
        let folded=$(".sidebar").hasClass("sidebar_toggle");
        if(folded){
            $(".sidebar").animate({
                "translate" : "-83%", /* 원위치 기준으로 이동*/
            },1000,function(){
                sideBtn.text("⟩");
            });
        }
        else{
            $(".sidebar").animate({
                "translate" : "0%",
            },1000,function(){
                sideBtn.text("⟨");
            });
        }
    });
    //반응형 사이드바 복구
    mql.addEventListener("change",function(e){
        let folded=$(".sidebar").hasClass("sidebar_toggle");
        if(e.matches){ 
            if(folded){//사이드바가 접힌 경우
                //버튼 클릭 이벤트 수행해서 원상복구
                sideBtn.trigger("click"); 
            }
        }
        else{
            if(!folded){//사이드바가 열려있을 경우
                //버튼 클릭 이벤트 수행해서 원상복구
                sideBtn.trigger("click"); 
            }
        }
    });
});