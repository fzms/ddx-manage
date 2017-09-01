package com.ddx.manage.system.controller;

import com.ddx.manage.common.annotation.IgnoreSecurity;
import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.manage.RedisManage;
import com.ddx.manage.common.manage.TokenManage;
import com.ddx.manage.common.util.EncryptUtils;
import com.ddx.manage.system.model.User;
import com.ddx.manage.system.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 201728.
 */
@Controller
@RequestMapping("/system/user/")
@SessionAttributes(Constant.SESSION_USER_INFO)
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private TokenManage tokenManage;

    @Autowired
    private RedisManage redisManage;

    /**
     * 登录
     *
     * @param kaptcha 用户输入的验证码
     * @param user    用户信息
     * @param session session
     * @return 结果
     * @throws Exception 异常
     */
    @IgnoreSecurity
    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public AjaxResult login(@RequestParam(value = "kaptcha") String kaptcha, User user, HttpSession session) throws Exception {
        Object textCode = session.getAttribute(Constant.SESSION_ATTR_TEXT_CODE);
        if (textCode == null || !kaptcha.equals(textCode.toString())) {
            return AjaxResult.error("验证码错误！");
        }

        User qUser = new User();
        qUser.setLoginName(user.getLoginName());
        List<User> users = userService.get(qUser);
        if (users.isEmpty()) {
            return AjaxResult.error("用户名错误！");
        }
        User rUser = users.get(0);
        String encryptPassword = EncryptUtils.encryptPassword(user.getPassword(), rUser.getEncryptSalt());
        if (!encryptPassword.equals(rUser.getPassword())) {
            return AjaxResult.error("密码错误！");
        }

        // 生成客户端token，设置用户信息
        String token = tokenManage.generateClientToken(rUser);
        session.setAttribute(Constant.CLIENT_TOKEN_NAME, token);

        session.setAttribute(Constant.SESSION_USER_INFO, redisManage.getUserInfo(user.getId()));
        return AjaxResult.success("登录成功！");
    }
}
