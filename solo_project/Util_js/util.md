### JS 유틸

**[배경]** 

<pre>
JS로 기능을 구현할 때 라이브러리처럼 미리 만들어둔 기능이 있다면
나중에 나 또는 누군가가 사용하고자 할 때 도움이 되지 않을까해서 
만들어둔 몇가지 기능
</pre>
 
**[구현 내용]**
- Data(자료구조 및 연산)
    1. Vector2D : 2D 공간 백터 타입
    2. UniqueArray : Set처럼 중복없는 고유값을 유지하지만 순서를 유지하고 인덱스 접근 가능한 배열

- Math
    1. randomInt/Float : 정수/실수 난수 생성 함수
    2. deg<=>rad : degree, radian 상호 변환 함수

- String
    1. 부분/전체 문자열 교체
    2. 문자열에 포함된 특정 문자열의 개수 구하기
    3. stringf : printf 흉내내보기

**[결과]**
- [자료구조 및 연산](http://eropick.github.io/solo_project/Util_js/data_util.js)
- [수식 변환](http://eropick.github.io/solo_project/Util_js/math_util.js)
- [문자열 처리](http://eropick.github.io/solo_project/Util_js/string_util.js)
- [테스트 예제](http://eropick.github.io/solo_project/Util_js/util_test.html)