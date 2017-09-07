package com.ddx.manage.system.controller;

import com.ddx.manage.common.annotation.IgnoreSecurity;
import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.manage.RedisManage;
import com.ddx.manage.common.manage.TokenManage;
import com.ddx.manage.common.util.EncryptUtils;
import com.ddx.manage.common.util.StringUtils;
import com.ddx.manage.system.dto.UserDto;
import com.ddx.manage.system.model.User;
import com.ddx.manage.system.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 201728.
 */
@RestController
public class LoginController {
    /**
     * 日志记录器
     */
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private IUserService userService;

    @Autowired
    private TokenManage tokenManage;

    @Autowired
    private RedisManage redisManage;

    /**
     * 登录
     *
     * @param user    用户信息
     * @param session session
     * @return 结果
     * @throws Exception 异常
     */
    @IgnoreSecurity
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public AjaxResult login(@RequestBody UserDto user, HttpSession session) throws Exception {
        Object textCode = session.getAttribute(Constant.SESSION_ATTR_TEXT_CODE);
        if (textCode == null || !user.getKaptcha().equals(textCode.toString())) {
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

        session.setAttribute(Constant.SESSION_USER_INFO, redisManage.getUserInfo(rUser.getId()));
        return AjaxResult.success("登录成功！");
    }

    /**
     * 退出登录
     *
     * @param session session
     * @return 结果
     * @throws Exception 异常
     */
    @IgnoreSecurity
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public AjaxResult logout(HttpSession session) throws Exception {
        String token = (String) session.getAttribute(Constant.CLIENT_TOKEN_NAME);
        try {
            if (StringUtils.isNotBlank(token)) {
                tokenManage.deleteClientToken(token);
            }
        } catch (Exception e) {
            logger.error("删除客户端token失败！", e);
        }
        session.invalidate();
        return AjaxResult.success("成功！");
    }
}
