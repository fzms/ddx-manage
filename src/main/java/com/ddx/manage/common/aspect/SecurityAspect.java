package com.ddx.manage.common.aspect;

import com.ddx.manage.common.annotation.IgnoreSecurity;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.exception.AuthException;
import com.ddx.manage.common.manage.TokenManage;
import com.ddx.manage.common.util.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;

/**
 * 接口调用安全切面
 */
@Aspect
@Component
public class SecurityAspect {
    private static final Logger logger = LoggerFactory.getLogger(SecurityAspect.class);
    /**
     * Token管理器 .
     */
    @Autowired
    private TokenManage tokenManage;

    /**
     * 配置切入点
     */
    @Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void methodAspect() {
    }

    /**
     * 执行token检查
     *
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around("methodAspect()")
    public Object execute(ProceedingJoinPoint pjp) throws Throwable {
        // 1.从切点上获取目标方法
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Method method = methodSignature.getMethod();

        // 2.判断是否需要做安全检查
        if (method.isAnnotationPresent(IgnoreSecurity.class)) {
            return pjp.proceed();
        }

        // 3.从头部获取客户端token
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String clientToken = request.getParameter(Constant.CLIENT_TOKEN_NAME);

        // 4.获取客户端token对应的用户id
        String userId = tokenManage.getClientTokenValue(clientToken);

        // 5.若用户id不存在，抛出认证异常
        if (StringUtils.isBlank(userId)) {
            throw new AuthException(AuthException.AUTH_CLIENT_TOKEN_ERROR);
        }

        // 6.将userId存入request中
        request.setAttribute(Constant.REQUEST_ATTR_USER_ID, userId);

        // 7.调用目标方法
        return pjp.proceed();
    }
}
