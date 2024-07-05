/* ui 관련 설정 부분 */

const ebtns=document.querySelectorAll(".ebtn");

window.addEventListener("load",()=>{
    //버튼 처리
    ebtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            btn.classList.toggle("select");
        })
    })
})