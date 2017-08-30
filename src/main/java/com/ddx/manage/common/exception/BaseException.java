package com.ddx.manage.common.exception;

import java.util.HashMap;
import java.util.Map;

/**
 * 基础异常定义.
 */
public class BaseException extends Exception {
    private static final long serialVersionUID = -1460258549773020525L;

    /**
     * 错误码
     */
    public String errorCode;

    /**
     * 附加信息
     */
    public String otherMsg;

    /**
     * 异常信息集合
     */
    public static Map<String, String> exceptionInfo = new HashMap<>();

    /**
     * 获取异常信息
     *
     * @param errorCode 错误码
     * @return 异常信息
     * @throws Exception 异常
     */
    public String getErrorMsg(String errorCode) {
        String errorMsg = exceptionInfo.get(errorCode);
        if (errorMsg == null) {
            return "未知异常";
        }
        return errorMsg;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getOtherMsg() {
        return otherMsg;
    }

    public void setOtherMsg(String otherMsg) {
        this.otherMsg = otherMsg;
    }
}
