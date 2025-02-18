import {Person,Student} from "./class.js"

window.addEventListener("load",()=>{
    let p1 = document.querySelector("#data1");
    let p2 = document.querySelector("#data2");
    let person = new Person("person","24");
    p1.innerText = "Person의 toString 호출 : "+person.toString();

    let student = new Student("student",24,12345);
    //재정의된 메서드 호출
    p2.innerText = "Student의 toString 호출 : "+student.toString() 
    + "\n\n 정적변수 메서드 호출 : " +Student.getStatic(0)
    +"\n\n 정적 변수 호출 : "+Student.static[1];
});