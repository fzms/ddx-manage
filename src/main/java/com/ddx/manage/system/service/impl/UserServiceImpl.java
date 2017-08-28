package com.ddx.manage.system.service.impl;

import com.ddx.manage.system.dao.UserDao;
import com.ddx.manage.system.model.User;
import com.ddx.manage.system.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/8/28.
 */
@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> get(User user) throws Exception {
        return userDao.select(user);
    }
}
