package com.ddx.manage.common.manage;

import com.ddx.manage.common.util.StringUtils;
import com.ddx.manage.system.model.User;
import com.ddx.manage.system.model.UserInfo;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * token管理
 */
@Service
public class TokenManage {
    @Autowired
    private RedisManage redisManage;

    /**
     * 生存客户端tokne,设置用户信息
     *
     * @param user 用户信息
     * @return 客户端token
     * @throws Exception 异常
     */
    public String generateClientToken(User user) throws Exception {
        // 1.生成token
        String clientToken = StringUtils.uuid();

        // 2.设置token
        redisManage.setClientToken(clientToken, user.getId());

        // 3.设置用户信息
        UserInfo userInfo = new UserInfo();
        BeanUtils.copyProperties(userInfo, user);

        redisManage.setUserInfo(user.getId(), userInfo);

        //4.返回token
        return clientToken;
    }

    /**
     * 客户端token检查
     *
     * @param clientToken 客户端token
     * @return 客户端tokne对应值
     * @throws Exception 异常
     */
    public String getClientTokenValue(String clientToken) throws Exception {
        // 1.若客户端token为空，返回null
        if (StringUtils.isBlank(clientToken)) {
            return null;
        }

        // 2.返回客户端token对应值
        return redisManage.getClienTokenValue(clientToken);
    }

    /**
     * 删除客户端token
     *
     * @param clientToken 客户端token
     * @throws Exception 异常
     */
    public void deleteClientToken(String clientToken) throws Exception {
        redisManage.deleteClientToken(clientToken);
    }
}
