


## 🚀 Project Starter Monorepo

Spring Boot + PostgreSQL 환경을 빠르게 구성할 수 있는 스타터 템플릿입니다.  
Nginx를 리버스 프록시로 설정하고, Docker Compose로 모든 서비스를 통합 실행할 수 있도록 구성되어 있습니다.

---

## 📦 구성 기술 스택

- **Java 17**, **Spring Boot 3**
- **PostgreSQL 15**
- **Nginx (Reverse Proxy)**
- **Docker & Docker Compose**
- Gradle, JPA, REST API

---

## 📁 프로젝트 구조
```

project-starter-monorepo/  
├── .env # 환경 변수 설정 파일  
├── docker-compose.yml # 전체 서비스 실행 정의  
├── nginx/  
│ └── default.conf # Nginx 라우팅 설정  
├── server/  
│ ├── Dockerfile # Spring Boot 멀티 스테이지 빌드  
│ └── ... # src, build.gradle 등  
└── README.md

```
---

## ⚙️ 실행 방법

### 1. 환경 변수 설정

`.env` 파일을 루트에 생성하고 다음 내용을 작성하세요:

```env
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
PSQL_PORT=5432

SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
SPRING_DATASOURCE_USERNAME=myuser
SPRING_DATASOURCE_PASSWORD=mypassword
SPRING_BOOT_PORT=8080

NGINX_PORT=80
```

---

### 2. 프로젝트 빌드 & 실행

```bash
docker compose up --build
```

- Spring Boot 앱은 내부에서 `8080` 포트로 실행되며

- Nginx가 외부의 `80` 포트로 요청을 받아 `/api/**` 경로를 Spring Boot로 프록시합니다

---

## 🌐 접속 경로

| 경로        | 설명                       |
| --------- | ------------------------ |
| `/api/**` | Spring Boot API          |
| `/`       | 정적 파일 또는 프런트엔드(추후 연결 가능) |

예시:

- `http://localhost/api/hello` → Spring API

- `http://localhost` → Flutter 또는 HTML 정적 페이지 등 대응 가능

---

## 🛑 종료 방법

```bash
docker compose down
```

- 컨테이너 정지 및 종료

```bash
docker compose down -v
```

- DB 데이터 볼륨까지 완전 초기화

---

## 🙌 사용 예시

- 빠른 사내 프로젝트 템플릿

- 백엔드 셋업용

- Spring Boot 연습용 베이스

- 정적 프론트 + API 서버 구성 연동

---

## 🧠 브랜치 전략 예시

```bash
git checkout -b feat/your-feature-name
git commit -m "feat: 기능 설명"
git push origin feat/your-feature-name
```
