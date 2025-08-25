package com.example.hackathon.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SuccessCode {
    /*
        200 OK
     */
    OK(HttpStatus.OK, "요청 성공"),
    UPDATED(HttpStatus.OK, "수정 완료"),
    DELETED(HttpStatus.OK, "삭제 완료");
    private final HttpStatus status;
    private final String message;

    public int getStatusCode() {
        return status.value();
    }
}
