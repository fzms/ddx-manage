package com.ddx.manage.system.model;

import java.io.Serializable;

/**
 * Created by Administrator on 2017/9/1.
 */
public class UserInfo implements Serializable {
    private static final long serialVersionUID = 8571305725588367393L;

    /**
     * 用户信息对应的Redis存储key
     */
    public static final String USER_INFO_KEY = "USER:INFO:";

    /**
     * 登录名
     */
    private String loginName;

    /**
     * 真实姓名
     */
    private String realName;

    /**
     * 类型
     */
    private String type;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
