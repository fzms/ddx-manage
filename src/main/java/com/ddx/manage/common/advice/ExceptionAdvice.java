package com.ddx.manage.common.advice;

import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.exception.AuthException;
import com.ddx.manage.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Administrator on 2017/8/30.
 */
//@ControllerAdvice
public class ExceptionAdvice {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionAdvice.class);

    /**
     * 认证异常处理
     *
     * @param e 认证异常
     * @return
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(value = AuthException.class)
    @ResponseBody
    public AjaxResult handleAuthException(AuthException e) {
        String logMsg = StringUtils.assemblyString(e.getErrorCode(), ":",
                e.getErrorMsg(e.getErrorCode()),
                e.getOtherMsg() == null ? "" : e.getOtherMsg());

        // 日志记录
        logger.error(logMsg);
        return AjaxResult.error(e.getErrorMsg(e.errorCode));
    }
}
