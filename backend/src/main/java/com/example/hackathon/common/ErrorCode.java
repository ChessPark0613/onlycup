package com.example.hackathon.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    BAD_REQUEST(404, HttpStatus.BAD_REQUEST, "잘못된 요청입니다.");
    private final Integer code;
    private final HttpStatus status;
    private final String message;
    
    public int getStatusCode() {
        return status.value();
    }
}
