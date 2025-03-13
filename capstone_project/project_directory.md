

## 디렉터리 구조
```
.
├── LCD/    # 프로젝트명을 가진 폴더로 설정 파일 포함
├── chat/   # nodeJS 웹소켓을 활용한 그룹 채팅 관련 폴더
├── codeshare/   # 실시간 문서 편집과과 관련된 폴더
├── gpt/    # GPT 연동 폴더
├── login/    # 사용자 인증과 모델과 관련된 폴더
├── vite_codeshare/     # nodeJS-yorkie 연동 폴더
├── webapp/     # 메인 페이지와 관련된 폴더
      ├──models.py   # ORM 매핑 파일
      ├──urls.py   # path-view(html) 매핑 파일
      ├──views.py   # 동적 html 파일 응답 및 응답 제어 파일 
      ├──static/   # JS, CSS, 이미지 등의 정적 파일
      ├──templates/   # 템플릿 코드가 들어간 html
      └──route/   # 웹소켓 라우팅에 대한 폴더
└── manage.py     # main 함수를 포함하는 엔트리 파일
```

## 주요 디렉터리 역할

### `manage.py`
- main 함수 정의
- Django 웹 프로젝트 실행 엔트리

### `webapp`
- 메인 화면 구성 HTML 템플릿
- 아이콘, UI 등 디자인 파일
- 웹 소켓 라우팅 파일
- 그룹과 문서와 관련된 ORM 모델
- 경로 라우팅 및 View 매핑 로직 관련 파일

### `login`
- 로그인/회원가입 구성 HTML 템플릿
- 사용자 인증과 관련된 ORM 모델

### `gpt`
- openAI API통신을 위한 설정 파일
- GPT 챗봇 화면 구성 HTML 템플릿

### `codeshare`
- 문서/코드 편집 구성 HTML 템플릿
- 실시간 편집 파일 통합 로직 파일
- 편집 기능 및 편집 권한 관리 파일