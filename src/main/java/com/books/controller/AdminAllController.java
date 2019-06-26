package com.books.controller;

import com.books.entity.TbTjadmin;
import com.books.service.impl.TbTJAdminServiceImpl;
import com.books.util.AjaxMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AdminAllController {
    @Autowired
    private TbTJAdminServiceImpl tbTJAdminService;


    //获得管理员登录信息
    @RequestMapping(value = "/getAdminMessage")
    @ResponseBody
    public AjaxMessage getAdminMessage() {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        TbTjadmin tbTjadmin = tbTJAdminService.getMessage(1);
        ajaxMessage.add("admin", tbTjadmin);
        return ajaxMessage;
    }

    //更新管理员登录信息
    @RequestMapping(value = "/updateAdminMessage")
    @ResponseBody
    public AjaxMessage updateAdminMessage(String time, String second) {
        AjaxMessage ajaxMessage = AjaxMessage.success();

        TbTjadmin tbTjadmin = new TbTjadmin();
        tbTjadmin.setSecon(Integer.parseInt(second));
        tbTjadmin.setTime(Integer.parseInt(time));

        if (tbTJAdminService.updateMessge(tbTjadmin) != 1)
            return AjaxMessage.fail();
        else
            ajaxMessage.add("count", 1);
        return ajaxMessage;
    }

}
