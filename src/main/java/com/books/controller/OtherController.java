package com.books.controller;

import com.books.entity.TbTjadmin;
import com.books.listener.timeListener;
import com.books.service.impl.TbTJAdminServiceImpl;
import com.books.util.AjaxMessage;
import com.sun.net.httpserver.HttpServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.security.jgss.HttpCaller;

import javax.servlet.http.HttpSession;
import java.util.Date;

@Controller
@RequestMapping(value = "/other")
public class OtherController {
    @Autowired
    private TbTJAdminServiceImpl tbTJAdminService;

    //得到管理员登录次数和登录时间
    @RequestMapping("/getTime.do")
    @ResponseBody
    public AjaxMessage getTime() {
        TbTjadmin tbTjadmin = tbTJAdminService.getMessage(1);
        AjaxMessage ajaxMessage = AjaxMessage.success();
        Date lastTime = timeListener.nowTime;
        Date nowTime = new Date();
        int second = (int) (nowTime.getTime() - lastTime.getTime()) / 1000;
        //System.out.println("登录时间：  " + second + " 之前：" + nowTime.getTime() + "现在：" + lastTime.getTime() +
        //  "登录总时间" + tbTjadmin.getSecon() + "登录次数：" + tbTjadmin.getTime());
        ajaxMessage.add("times", tbTjadmin.getTime());
        ajaxMessage.add("lastSecond", tbTjadmin.getSecon());
        ajaxMessage.add("second", second);
        return ajaxMessage;
    }

    //更新次数和时间
    @RequestMapping(value = "/updateTime.do")
    @ResponseBody
    public AjaxMessage updateTime(String times, String totalSecond, HttpSession session) {
        TbTjadmin tbTjadmin = new TbTjadmin();

        //System.out.println(times + " sdf " + totalSecond);

        //次数
        tbTjadmin.setTime(Integer.parseInt(times));

        //时间
        tbTjadmin.setSecon(Integer.parseInt(totalSecond));

        tbTJAdminService.updateMessge(tbTjadmin);

        session.removeAttribute("admin");

        return AjaxMessage.success();
    }

}
