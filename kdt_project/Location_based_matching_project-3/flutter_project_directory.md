# Flutter 프로젝트 구조 가이드

## 디렉터리 구조
```
lib/
├── screen/         # 화면 단위 UI
├── component/      # 아이콘, 버튼 등의 부분 UI
├── model/          # 데이터 모델 클래스
├── service/        # HTTP 통신 및 로직 처리
├── utils/          # 기능 구현을 위한 보조 기능
│   └── http/       # HTTP 모듈
└── constant/       # 설정 파일, enum 등 고정 데이터
```

## 주요 디렉터리 역할

### `screen`
- 전체 페이지/화면 UI 구현
- 앱 화면(screen) 정의

### `component`
- 재사용 가능한 UI 위젯
- 아이콘, 버튼, 입력 필드 등 공통 컴포넌트

### `model`
- 데이터 모델 클래스 정의
- JSON 직렬화/역직렬화 관리

### `service`
- HTTP 통신 로직
- API 호출 및 응답 처리
- 비즈니스 로직 구현

### `utils`
- 보조 유틸리티 함수
- HTTP 통신 모듈
- 공통 기능 구현

### `constant`
- 고정 데이터 관리
- Enum 정의
- 앱 전역 상수 관리

## 외부 설정 파일

### `android/app/google-services.json`
- OAuth 인증 파일

### `pubspec.yaml`
- 프로젝트 의존성 관리
- 플러그인 및 패키지 설정
