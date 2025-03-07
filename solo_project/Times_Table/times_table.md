### 구구단

**[배경]** 

<pre>
프롬프트 모달 대화상자를 사용해서 구구단의 단을 입력받는 프로그램 개발
timeout 비동기 함수를 의도한 순서대로 동작하도록 만들어본다
</pre>
 
**[구현 내용]**
- 구구단 시나리오
    1. 사용자가 프롬프트에 숫자를 입력
    2. 입력받은 숫자에 해당하는 "단"을 출력
    3. 1초 뒤 계속해서 "단" 입력을 받기 위한 질문 대화상자 열기
    4. 확인을 입력받으면 또 1~3을 반복
    5. 취소를 입력받은 중단

- 알게된 점
    1. async/await 비동기 함수의 동기 흐름 처리
    2. JS는 싱글 쓰레드 언어이기 때문에 병렬 처리를 위해 여러 방식을 사용하는데 기본적으로 이벤트 루프 방식으로 동작하여 스택과 우선순위큐 등을 사용해 동기와 비동기 방식의 작업 우선순위에 따라 처리됨
    3. document.write를 하더라도 렌더링이 즉각적으로 이뤄지지 않기 때문에 이벤트 루프에 등록된 다음 함수인 모달 대화상자(confirm)의 페이지 실행 중지로 인해 대화상자 종료 전까지 수행한 결과값이 보여지지 않는 문제 해결

**[결과]** : [구구단](http://eropick.github.io/solo_project/Times_Table/times_table.html)