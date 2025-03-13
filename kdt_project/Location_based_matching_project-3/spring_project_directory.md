# 프로젝트 구조

## 프로젝트 개요
프로젝트의 디렉토리와 패키지 구조 개요

## 디렉터리 구조
```
src/
└── main/
    └── java/com.helper.helpme/
        ├── config/
        │   ├── jwt/         # JWT 토큰 생성 및 인증 프로필
        │   ├── SecurityConfig.java     # HTTP 요청 기본 필터
        │   └── JwtAuthenticationFilter.java  # HTTP 인증 필터
        ├── constant/        # Enum 파일
        ├── controller/      # REST API 엔드포인트
        │   ├── AuthApiController.java    # 로그인 인증 및 토큰 재발급
        │   └── 기타 API 엔드포인트 컨트롤러..
        ├── dto/             # Data Transfer Objects
        │   └── ...
        ├── entity/          # JPA  
        ├── repository/      # DB CRUD 연산 및 쿼리
        ├── service/         # 비즈니스 로직 서비스
        └── util/            # 유틸리티
```

## 주요 구성요소 설명

### 1. Resource 구성 (`application.properties`)
- DB 설정
- 포트 구성
- OAuth2 ID 설정
- JWT 토큰 생성 정보
- Hibernate 설정

### 2. 의존성 관리 (`build.gradle`)
- 외부 라이브러리 의존성
- 프로젝트 빌드 설정

### 3. 패키지

#### `config`
- JWT 구성 및 토큰 관리
- 보안 구성
- 인증 필터

#### `constant`
- Enum definitions for consistent type management

#### `controller`
- REST API 엔드포인트 정의
- 인증 및 토큰 새로 고침 처리
- HTTP 요청 라우팅 관리

#### `dto`
- Data Transfer Objects
- Service에서 파라미터 전달 및 반환값 용도
- 클라이언트와 서버 간의 데이터 교환 용도

#### `entity`
- JPA 매핑 데이터베이스 엔티티
- 영속성 개체 정의

#### `repository`
- Database CRUD 연산
- 쿼리 작성

#### `service`
- 비즈니스 로직 기술
- Repository 이용 데이터 처리
- 애플리케이션 핵심 로직 기술

#### `util`
- 보조 유틸리티
- 작업을 위한 보조 메서드 기술

## 테스트 조건
- 테스트용 properties 사용 권장
