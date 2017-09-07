package com.ddx.manage.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Administrator on 2017/9/7.
 */
@Controller
public class IndexController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index()throws Exception{
        return "login";
    }
}
