package com.ddx.manage.system.controller;

import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.manage.RedisManage;
import com.ddx.manage.system.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/9/7.
 */
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private RedisManage redisManage;

    /**
     * 获取用户信息
     *
     * @param request 请求
     * @return 用户信息
     * @throws Exception 异常
     */
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResult getUserInfo(HttpServletRequest request) throws Exception {
        String userId = (String) request.getAttribute(Constant.REQUEST_ATTR_USER_ID);
        UserInfo userInfo = redisManage.getUserInfo(userId);
        return AjaxResult.success("成功", userInfo);
    }
}
