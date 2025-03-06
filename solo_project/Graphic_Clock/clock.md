### 시계 

**[배경]** 

<pre>
Interval 내장 함수를 활용한 시계 제작
</pre>
 
**[구현 내용]**
- 디지털
    1. 현재 시각을 Format에 맞춰 가져옴
- 아날로그
    1. Canvas API를 활용해서 시계 원판과 침축, 숫자 그리기
    2. 현재 시각을 불러와서 그 시간에 해당하는 위치 계산
    3. 비례식을 세워 초를 기준으로 한바퀴가 몇도씩 움직여야 하는지 계산
    4. 계산한 각도에 맞는 시/분/초침 그리기
- 공통
    1. setInterval함수에 반복할 작업 등록

**[결과]**
- [디지털 시계](http://eropick.github.io/solo_project/Format_Clock/clock.html)
- [아날로그 시계](http://eropick.github.io/solo_project/Graphic_Clock/analog_clock.html)