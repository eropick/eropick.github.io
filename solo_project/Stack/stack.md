### 스택

**[배경]** 

<pre>
스택 자료구조 제작 및 텍스트 기반 시각화
</pre>
 
**[구현 내용]**
- 자료구조 구현
    1. full/empty 플래그
    2. 스택 용량 자동확장 플래그
    3. push : top에 삽입
    4. pop : top 제거 및 반환
    5. peek : top에 있는 값 반환
    6. toArray : 배열 형태로 반환
- 시각화 UI 구현
    1. 빈 스택 표현 : []
    2. 삽입 시 좌측에서 우측으로 채워나감
    3. 제거 시 우측에서 좌측으로 제거해나감
    4. 현재 값은 가장 우측에 있는 값이 됨

**[결과]** : [스택](http://eropick.github.io/solo_project/Stack/stack.html)