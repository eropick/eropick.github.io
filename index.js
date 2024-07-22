$(document).ready(function(){
    
    //사이드바 애니메이션 등록
    $('.sidebar button[type="button"]').click(function(){
        /* 원위치 기준으로 어디로 이동할지*/
        $(".sidebar").toggleClass("sidebar_toggle");
        let pushed=$(".sidebar").hasClass("sidebar_toggle");
        if(pushed){
            $(".sidebar").animate({
                "translate" : "-85%",
            },1000);
        }
        else{
            $(".sidebar").animate({
                "translate" : "0%",
            },1000);
        }
    });
});