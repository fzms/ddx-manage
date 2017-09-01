package com.ddx.manage.common.manage;

import com.ddx.manage.common.util.StringUtils;
import com.ddx.manage.system.model.UserInfo;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.nio.charset.Charset;
import java.util.concurrent.TimeUnit;

/**
 * redis管理
 */
@Service
public class RedisManage {
    private GenericJackson2JsonRedisSerializer jsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

    RedisSerializer stringSerializer = new StringRedisSerializer();

    /**
     * 使用的字符集.
     */
    private static final String CHARSET_NAME = "UTF-8";

    /**
     * 客户端token对应的Redis存储key
     */
    private static final String CLIENT_TOKEN_KEY = "TOKEN:CLIENT:";

    /**
     * Redis 键名分割符 .
     */
    private static final String KEY_NAME_SPLIT = ":";

    /**
     * 操作模板.
     */
    @Resource(name = "RedisTemplate")
    protected RedisTemplate<String, String> redisTemplate;

    ///**
    // * 用户信息操作模板.
    // */
    //@Resource(name = "userRedisTemplate")
    //protected RedisTemplate<String, User> userRedisTemplate;

    /**
     * 设置客户端token与用户id
     *
     * @param clientToken 客户端的token
     * @param userId      用户id
     * @throws Exception
     */
    public void setClientToken(String clientToken, String userId) throws Exception {
        redisTemplate.opsForValue().set(CLIENT_TOKEN_KEY + clientToken, userId, 30, TimeUnit.MINUTES);
    }

    /**
     * 获取客户端token
     *
     * @return 客户端token
     * @throws Exception 异常
     */
    public String getClienTokenValue(String clientToken) throws Exception {
        String key = CLIENT_TOKEN_KEY + clientToken;
        String userId = redisTemplate.opsForValue().get(key);
        // 如果key存在，刷新key的生存时间
        if (StringUtils.isNotBlank(userId)) {
            redisTemplate.expire(key, 30, TimeUnit.MINUTES);
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
        redisTemplate.delete(CLIENT_TOKEN_KEY + clientToken);
    }

    /**
     * 设置用户信息
     *
     * @param userId   用户id
     * @param userInfo 用户信息
     * @throws Exception 异常
     */
    public void setUserInfo(String userId, UserInfo userInfo) throws Exception {
        redisTemplate.opsForValue().set(UserInfo.USER_INFO_KEY + userId, new String(jsonRedisSerializer.serialize(userInfo), Charset.forName(CHARSET_NAME)));
    }

    /**
     * 获取用户信息
     *
     * @param userId 用户id
     * @return 用户信息
     * @throws Exception 异常
     */
    public UserInfo getUserInfo(String userId) throws Exception {
        String value = redisTemplate.opsForValue().get(UserInfo.USER_INFO_KEY + userId);
        return (UserInfo) jsonRedisSerializer.deserialize(value.getBytes(Charset.forName(CHARSET_NAME)));
    }

    /**
     * 删除用户信息
     *
     * @param userId 用户id
     * @throws Exception 异常
     */
    public void deleteUserInfo(String userId) throws Exception {
        redisTemplate.delete(UserInfo.USER_INFO_KEY + userId);
    }
}
