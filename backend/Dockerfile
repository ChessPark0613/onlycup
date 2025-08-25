# server/Dockerfile

FROM gradle:7.6-jdk17 AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test --no-daemon

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
