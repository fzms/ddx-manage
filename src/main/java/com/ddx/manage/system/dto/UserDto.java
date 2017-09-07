package com.ddx.manage.system.dto;

import com.ddx.manage.system.model.User;

public class UserDto extends User {
    private String kaptcha;

    public String getKaptcha() {
        return kaptcha;
    }

    public void setKaptcha(String kaptcha) {
        this.kaptcha = kaptcha;
    }
}