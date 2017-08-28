package com.ddx.manage.common.bean;

import java.io.Serializable;

/**
 * 接口返回结果
 */
public class AjaxResult implements Serializable {
    private static final long serialVersionUID = -3282121504305297818L;
    private String status = "success";
    private String errorCode = "";
    private String msg = null;
    private Object data = null;

    private AjaxResult() {
    }

    public static AjaxResult success(String msg) {
        AjaxResult success = new AjaxResult();
        success.setStatus("success");
        success.setMsg(msg);
        return success;
    }

    public static AjaxResult success(String msg, Object data) {
        AjaxResult success = new AjaxResult();
        success.setStatus("success");
        success.setMsg(msg);
        success.setData(data);
        return success;
    }

    public static AjaxResult error(String msg) {
        AjaxResult error = new AjaxResult();
        error.setStatus("fail");
        error.setMsg(msg);
        return error;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return this.data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getErrorCode() {
        return this.errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }
}
