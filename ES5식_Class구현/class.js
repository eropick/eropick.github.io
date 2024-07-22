export {Person, Student}

// ES5식 클래스 구현

//생성자 구현
function Person(name, age){
    this.name = name;
    this.age = age;
    this.text = "this is a test";
/* 
    생성자 내부에 메서드 정의 시 
    모든 인스턴스들이 메서드를 
    새로 생성하기 때문에 비효율
*/
};

//메서드 정의
(function(){ //즉시실행
    Person.prototype.constructor = Person;

    Person.prototype.reName = function(name){
        this.name = name;
    }
    Person.prototype.getName = function(){
        return this.name;
    }
    Person.prototype.setAge = function(age){
        this.age = age;
    }
    Person.prototype.getAge = function(){
        return this.age;
    } 
    Person.prototype.toString = function(){
        return `name : ${this.name}, age : ${this.age}`; 
    }
    Person.prototype.getText = function(){
        return this.text;
    }
}());

//상속
function Student(name,age,id){
    //new Person이 되면 Person의 this를 가리키게 됨
    //명시적으로 Student의 this를 가리키도록 설정
    Person.call(this,name,age); //super(name,age);
    this.id = id;
    
    //정적 변수
    Student.static = ["정적 변수1","정적 변수2"];
}

//메서드
(function(){
    //자식 클래스 프로토타입을 부모 클래스 인스턴스로 복사
    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student; //생성자 지정

    //정적 메서드
    Student.getStatic = function(index){
        return "정적 메서드에 의해 반환되는 정적 변수 -> "+Student.static[index];
    }

    //새로운 메서드 지정
    Student.prototype.getId = function(){
        return this.id;
    }

    //메서드 오버라이딩
    Student.prototype.toString = function(){
        return `id : ${this.getId()}, name : ${this.getName()}, age : ${this.getAge()}`;
    }
}());