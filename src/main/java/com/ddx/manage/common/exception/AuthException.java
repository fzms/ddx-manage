package com.ddx.manage.common.exception;

/**
 * 认证异常.
 */
public class AuthException extends BaseException {
    private static final long serialVersionUID = -9124391238521116831L;
    /**
     * 认证异常
     */
    public static final String AUTH_CLIENT_TOKEN_ERROR = "5001";

    /**
     * 用户登录状态异常
     */
    public static final String USER_LOGIN_STATUS_ERROR = "5002";

    /**
     * 图片验证码校验异常
     */
    public static final String KAPTCHA_CHECK_ERROR = "5003";

    /**
     * 用户名或密码错误
     */
    public static final String USER_LOGIN_ERROR = "5004";

    /**
     * 描述: 自定义构造函数，无附加信息 .
     *
     * @param errorCode
     * @author YuShunWei
     * @date 2016年3月27日
     */
    public AuthException(String errorCode) {
        this.errorCode = errorCode;
    }

    /**
     * 描述: 自定义构造函数，有附加信息 .
     *
     * @param errorCode
     * @param otherMsg
     * @author YuShunWei
     * @date 2016年3月27日
     */
    public AuthException(String errorCode, String otherMsg) {
        this.errorCode = errorCode;
        this.otherMsg = otherMsg;
    }

    static {
        exceptionInfo.put(AUTH_CLIENT_TOKEN_ERROR, "用户身份认证异常");
        exceptionInfo.put(USER_LOGIN_STATUS_ERROR, "用户登录状态异常");
        exceptionInfo.put(KAPTCHA_CHECK_ERROR, "图片验证码错误");
        exceptionInfo.put(USER_LOGIN_ERROR, "用户名或密码错误");
    }
}
