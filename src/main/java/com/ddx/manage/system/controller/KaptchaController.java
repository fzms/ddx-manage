package com.ddx.manage.system.controller;

import com.ddx.manage.common.annotation.IgnoreSecurity;
import com.ddx.manage.common.bean.AjaxResult;
import com.ddx.manage.common.constant.Constant;
import com.ddx.manage.common.exception.AuthException;
import com.google.code.kaptcha.Producer;
import org.apache.commons.io.output.ByteArrayOutputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.IOException;

/**
 * 验证码控制器
 */
@Controller
@RequestMapping("/kaptcha")
public class KaptchaController {
    /**
     * 日志记录器
     */
    private static final Logger logger = LoggerFactory.getLogger(KaptchaController.class);

    /**
     * 验证码生成器注入
     */
    @Autowired
    private Producer kaptchaProducer;

    /**
     * 生成图片验证码
     *
     * @param session session
     * @return 图片验证码
     * @throws Exception
     */
    @IgnoreSecurity
    @RequestMapping(value = "/generatecode", method = RequestMethod.GET)
    public ResponseEntity<byte[]> generateCode(HttpSession session) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Pragma", "No-cache");
        headers.set("Cache-Control", "No-cache");
        headers.setDate("Expires", 0);
        headers.setContentType(MediaType.IMAGE_JPEG);
        ResponseEntity<byte[]> response = null;
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            String capText = kaptchaProducer.createText();
            BufferedImage bufferedImage = kaptchaProducer.createImage(capText);
            ImageIO.write(bufferedImage, "jpg", out);
            response = new ResponseEntity<>(out.toByteArray(), headers, HttpStatus.OK);

            //放入session
            session.setAttribute(Constant.SESSION_ATTR_TEXT_CODE, capText);
        } catch (IOException e) {
            response = new ResponseEntity<>(new ByteArrayOutputStream().toByteArray(), headers, HttpStatus.OK);
            logger.error("生产图片验证码失败！", e);
        }

        return response;
    }

    /**
     * 校验图片验证码
     *
     * @param kaptcha 用户输入的验证码
     * @param session session
     * @return 校验结果
     */
    @RequestMapping(value = "/checkcode", method = RequestMethod.GET)
    @ResponseBody
    public AjaxResult checkcode(@RequestParam(value = "kaptcha", required = true) String kaptcha, HttpSession session) throws Exception {
        Object textCode = session.getAttribute(Constant.SESSION_ATTR_TEXT_CODE);
        if (textCode == null || !kaptcha.equals(textCode.toString())) {
            throw new AuthException(AuthException.KAPTCHA_CHECK_ERROR);
        }
        return AjaxResult.success("校验成功！");
    }
}
