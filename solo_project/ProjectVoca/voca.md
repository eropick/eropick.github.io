### 단어장

**[배경]** 

<pre>
기존의 유튜브 플레이리스트의 UI를 조금 수정하여 나만의 단어장 구현
특정 단어와 그 의미를 매핑하여 저장 및 파일로 다운받아 백업
저장된 단어를 이용해서 암기할 수 있도록 표 테이블 생성
저장된 단어들을 이용하여 4지선다 랜덤 퀴즈 생성
</pre>
 
**[구현 내용]**
- UI
    1. 단어, 의미 입력 필드
    2. 단어장 백업 및 로드를 위한 버튼
    3. 단어 목록 추가/삭제 버튼
    4. 테이블 생성, 퀴즈 생성 버튼

- 단어, 의미 추가/삭제
    1. 단어와 의미를 입력하고 버튼을 누르면 목록에 데이터 추가
    2. 삭제 버튼을 누르면 텍스트 선택 활성화, 삭제 완료 시 여러 개를 한번에 삭제 가능
    3. 로컬 스토리지를 활용하여 매핑 데이터 저장 및 로드

- 파일 처리 읽기
    1. file 타입의 input태그를 이용해서 파일을 업로드하고 텍스트 정보를 읽어온다.
    2. 읽어온 정보를 로컬 스토리지에 저장하고 단어장 목록으로 재구성합니다.

- 파일 처리 쓰기
    1. 로컬 스토리지에 저장된 단어 목록을 전체 읽고 blob 객체로 만들기
    1. blob 객체를 Url형태로 변경하여 a태그 속성에 download 옵션 설정
    2. a태그의 클릭 메서드를 실행하여 파일을 다운로드

- 테이블 생성
    1. Table 태그를 활용하여 단어만 또는 의미만 가린 테이블 생성

- 퀴즈 생성
    1. 단어장 목록에 있는 단어들을 랜덤으로 4개를 추출
    2. 단어 또는 의미 중 하나를 랜덤으로 선택해서 4지선다형 퀴즈 생성

**[결과]** : [단어장](http://eropick.github.io/solo_project/ProjectVoca/vocaList.html)