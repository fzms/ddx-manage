package com.ddx.manage.system.dao;

import com.ddx.manage.system.mapper.UserMapper;
import com.ddx.manage.system.model.User;

import java.util.List;

/**
 * Created by Administrator on 2017/8/28.
 */
public interface UserDao extends UserMapper {
    List<User> select(User user) throws Exception;
}
