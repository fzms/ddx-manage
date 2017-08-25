package com.icinfo.platform.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2017/8/7.
 */
@Controller
public class IndexController {
    @RequestMapping("/")
    public String index() throws Exception {
        return "index";
    }
}
