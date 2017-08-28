package com.ddx.manage.system.controller;

import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.util.EncryptUtils;
import com.ddx.manage.system.model.User;
import com.ddx.manage.system.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.util.List;

/**
 * Created by Administrator on 2017/8/28.
 */
@Controller
@RequestMapping("/system/user/")
@SessionAttributes(Constant.SESSION_USER_INFO)
public class UserController {
    @Autowired
    private IUserService userService;

    /**
     * 登录
     *
     * @param user 用户信息
     * @return 结果
     * @throws Exception 异常
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResult login(User user, Model model) throws Exception {
        User qUser = new User();
        qUser.setLoginName(user.getLoginName());
        List<User> users = userService.get(qUser);
        if (users.isEmpty()) {
            return AjaxResult.error("用户名错误！");
        }
        User rUser = users.get(0);
        String encryptPassword = EncryptUtils.encryptPassword(user.getPassword(), user.getEncryptSalt());
        if (!encryptPassword.equals(rUser.getPassword())) {
            return AjaxResult.error("密码错误！");
        }
        model.addAttribute(Constant.SESSION_USER_INFO, qUser);
        return AjaxResult.success("登录成功！");
    }
}
