package com.ddx.manage.common.manage;

import com.ddx.manage.common.util.StringUtils;
import com.ddx.manage.system.model.User;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

/**
 * redis管理
 */
@Service
public class RedisManage {
    /**
     * 客户端token对应的Redis存储key
     */
    private static final String CLIENT_TOKEN_KEY = "TOKEN:CLIENT:";

    /**
     * Redis 键名分割符 .
     */
    private static final String KEY_NAME_SPLIT = ":";

    /**
     * token操作模板.
     */
    @Resource(name = "tokenRedisTemplate")
    protected RedisTemplate<String, String> tokenRedisTemplate;

    /**
     * 用户信息操作模板.
     */
    @Resource(name = "userRedisTemplate")
    protected RedisTemplate<String, User> userRedisTemplate;

    /**
     * 设置客户端token与用户id
     *
     * @param clientToken 客户端的token
     * @param userId      用户id
     * @throws Exception
     */
    public void setClientToken(String clientToken, String userId) throws Exception {
        tokenRedisTemplate.opsForValue().set(CLIENT_TOKEN_KEY + clientToken, userId, 30, TimeUnit.MINUTES);
    }

    /**
     * 获取客户端token
     *
     * @return 客户端token
     * @throws Exception 异常
     */
    public String getClienTokenValue(String clientToken) throws Exception {
        String key = CLIENT_TOKEN_KEY + clientToken;
        String userId = tokenRedisTemplate.opsForValue().get(key);
        // 如果key存在，刷新key的生存时间
        if (StringUtils.isNotBlank(userId)) {
            tokenRedisTemplate.expire(key, 30, TimeUnit.MINUTES);
        }
        return userId;
    }

    /**
     * 删除客户端token
     *
     * @param clientToken 客户端token
     * @throws Exception 异常
     */
    public void deleteClientToken(String clientToken) throws Exception {
        tokenRedisTemplate.delete(CLIENT_TOKEN_KEY + clientToken);
    }

    /**
     * 设置用户信息
     *
     * @param userId 用户id
     * @param user   用户信息
     * @throws Exception 异常
     */
    public void setUserInfo(String userId, User user) throws Exception {
        userRedisTemplate.opsForValue().set(userId, user, 30, TimeUnit.MINUTES);
    }

    /**
     * 获取用户信息
     *
     * @param userId 用户id
     * @return 用户信息
     * @throws Exception 异常
     */
    public User getUserInfo(String userId) throws Exception {
        return userRedisTemplate.opsForValue().get(userId);
    }

    /**
     * 删除用户信息
     *
     * @param userId 用户id
     * @throws Exception 异常
     */
    public void deleteUserInfo(String userId) throws Exception {
        userRedisTemplate.delete(userId);
    }
}
