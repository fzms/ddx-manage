package com.ddx.manage.system.service;

import com.ddx.manage.system.model.User;

import java.util.List;

/**
 * Created by Administrator on 2017/8/28.
 */
public interface IUserService {
    List<User> get(User user) throws Exception;
}
