# client/Dockerfile

FROM node:22-alpine AS builder
WORKDIR /app

# 의존성 캐시 최적화

# corepack : Node에 내장된 패키지 매니저 관리자(Yarn이나 pnpm 같은 버전 고정 도우미)
# corepack enable : package.json에 "packageManager": "pnpm@9.12.0" 이런 패키지 매니저 속성을 넣었다면 이걸 읽고 그 버전의 pnpm을 자동으로 활성화 해줌
# 즉, 내 package.json에 설정된 packageManager옵션 보고 패키지매니저 활성화 해주는 명령어
# Only Cup 프로젝트 pnpm 버전 : pnpm@10.15.0
RUN corepack enable
# ./ => 현재 디렉토리 /app을 뜻함 => package.json pnpm-lock.yaml 파일들을 복사해 /app 디렉토리에 붙여넣겠다.
COPY package.json pnpm-lock.yaml ./
# --frozen-lockfile : pnpm-lock.yaml을 원본으로 삼아 설치를 진행함 => package.json과 pnpm-lock.yaml 파일이 조금이라도 어긋나면 실패하게 됨
# --frozen-lockfile은 CI배포에서 결정적(Deterministic) 설치를 보장하려고 꼭 사용하는 옵션(npm ci 라는 명령어랑 같은 포지션이라네요)
RUN pnpm i --frozen-lockfile

# 나머지 소스 복사 후 빌드
COPY . .
RUN pnpm build


# Nginx 웹서버에 내 빌드파일 배포
# 이거 nginx 버전 요거 쓰는거 맞나요?
FROM nginx:1.27-alpine

# SPA 라우팅용 커스텀 conf Nginx에 넣기
# 이걸 넣음으로서 SPA 프로젝트 이용시 어느 엔드포인트를 가도 index.html파일을 제공하도록 할 수 있음
# default.conf에서 모든 파일에 대해 index.html을 반환하는 코드가 설정되어있기 때문에 SPA 특성상 1개의 index.html이 있는 상태에서 다른 엔드포인트에 들어갈때 html파일이 없어 404 오류를 반환하는 일이 없어짐
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드 산출물만 넣어 가벼운 이미지로
# builder 파일에서 dist 파일을 복사해 nginx의 html 폴더 안에 붙여넣기
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
# (기본 CMD는 nginx -g 'daemon off;'라 별도 지정 불필요)



