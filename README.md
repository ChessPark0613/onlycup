# onlycup

**Spring Boot + PostgreSQL + React(Vite, TS+SWC) + Nginx** 풀스택 스타터.  
도커 컴포즈로 **개발(HMR)** 과 **배포(정적서빙 + /api 프록시)** 를 모두 지원합니다.

## 🚀 Project Starter Monorepo

## 기술 스택

- **Backend**: Java 17, Spring Boot 3, Gradle, JPA, REST API  
- **DB**: PostgreSQL 15  
- **Frontend**: React + Vite + TypeScript + SWC, **pnpm 10.15.0**  
- **Infra**: Nginx(Reverse Proxy), Docker & Docker Compose

---

## 프로젝트 구조

```
onlycup/
├─ .env
├─ docker-compose.yml
├─ nginx/
│  └─ default.conf          # Nginx: /api -> app:8080, SPA fallback
├─ backend/                 # Spring Boot app (내부 8080)
└─ frontend/                # React(Vite, TS+SWC)
   ├─ src/ ...
   ├─ index.html
   ├─ package.json
   ├─ pnpm-lock.yaml
   ├─ vite.config.ts
   └─ dist/                 # pnpm build 산출물 (배포 시 Nginx가 서빙)
```

---

## 환경 변수(.env)

레포 루트에 `.env` 파일 생성:

```env
# PostgreSQL
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
PSQL_PORT=5432

# Spring Boot
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
SPRING_DATASOURCE_USERNAME=myuser
SPRING_DATASOURCE_PASSWORD=mypassword

# Nginx 외부 포트
NGINX_PORT=80
```

---

## 프런트엔드 설정 메모

- 루트에 `.npmrc` 파일로 패키지 매니저 버전 고정:
  
  ```
  package-manager=pnpm@10.15.0
  ```

- `frontend/vite.config.ts` (개발 프록시):
  
  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  
  export default defineConfig({
    plugins: [react()],
    server: {
      host: true,
      port: 5173,
      proxy: { "/api": { target: "http://app:8080", changeOrigin: true } }
    },
    build: { outDir: "dist" }
  });
  ```

---

## Nginx 라우팅 (nginx/default.conf)

```nginx
server {
  listen 80;

  root /usr/share/nginx/html;
  index index.html;

  # API -> SpringBoot
  location /api/ {
    proxy_pass http://app:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  # SPA fallback
  location / {
    try_files $uri /index.html;
  }
}
```

---

## Docker Compose (요약)

**서비스**

- `db`: Postgres 15 (`${PSQL_PORT}:5432`)
- `app`: Spring Boot (내부 8080, `expose: 8080`)
- `frontend-dev`: 개발(HMR) 컨테이너 – pnpm 10.15.0, Vite dev server(5173)
- `nginx`: 배포용 정적 서빙 + /api 프록시 (`${NGINX_PORT}:80`)

> 개발 중에는 `frontend-dev`로 HMR, 배포 시에는 `pnpm build` 산출물(`frontend/dist`)을 Nginx가 서빙.

---

## 실행 방법

### 1) 개발(HMR)

PC에 Node/pnpm 설치 없이 **컨테이너만** 사용:

```bash
# DB + 백엔드
docker compose up -d db app

# 프런트(HMR)
docker compose up -d frontend-dev

# 개발 접속
# React: http://localhost:5173
# API:   http://localhost:${NGINX_PORT}/api (또는 Vite 프록시로 /api)
```

### 2) 배포 빌드 → Nginx 서빙

```bash
# 프런트 빌드(컨테이너에서 pnpm 10.15.0 사용)
docker compose run --rm frontend-dev sh -lc \
"corepack enable && corepack prepare pnpm@10.15.0 --activate && pnpm install && pnpm build"

# Nginx로 정적파일 서빙 + /api 프록시
docker compose up -d nginx app db

# 접속
# http://localhost:${NGINX_PORT}
```

### 3) 종료

```bash
docker compose down         # 컨테이너 정지/삭제
docker compose down -v      # + 볼륨까지 초기화(DB 데이터 삭제)
```

---

## API/프론트 라우팅

- `GET /api/**` → Spring Boot  
- `GET /` 및 SPA 경로(`/*`) → React 정적 파일(`frontend/dist`)  

---

## 트러블슈팅

- **/usr/share/nginx/html 비어있음**: `pnpm build`를 먼저 수행했는지 확인  
- **CORS 문제**: 프런트는 `/api`만 호출하고, Nginx가 백엔드로 프록시하므로 원칙적으로 CORS 불필요  
- **Windows 개행 이슈**: Nginx 설정파일은 UTF-8 + LF 권장  
- **포트 충돌**: `.env`의 `NGINX_PORT`, `PSQL_PORT` 확인

---

## 브랜치 전략(예시)

```bash
git checkout -b feat/frontend-setup
git commit -m "feat(frontend): add Vite React (TS+SWC) with dockerized dev/prod"
git push origin feat/frontend-setup
```
