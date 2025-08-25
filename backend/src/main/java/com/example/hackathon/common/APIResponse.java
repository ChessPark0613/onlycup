package com.example.hackathon.common;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class APIResponse<T> {
    private int code;
    private String message;
    private T data;

    // 성공
    public static <T> APIResponse<T> success(SuccessCode code) {
        return new APIResponse<>(code.getStatusCode(), code.getMessage(), null);
    }

    public static <T> APIResponse<T> success(SuccessCode code, T data) {
        return new APIResponse<>(code.getStatusCode(), code.getMessage(), data);
    }

    //실패
    public static <T> APIResponse<T> fail(ErrorCode code) {
        return new APIResponse<>(code.getStatusCode(), code.getMessage(), null);
    }

    public static <T> APIResponse<T> fail(ErrorCode code, String message) {
        return new APIResponse<>(code.getStatusCode(), message, null);
    }
}
