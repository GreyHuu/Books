package com.books.controller;

import com.books.entity.TbUser;
import com.books.service.impl.TbUserServiceImpl;
import com.books.util.AjaxMessage;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/user")
public class AdminUserController {
    @Autowired
    private TbUserServiceImpl tbUserService;


    //查询全部的用户
    @RequestMapping(value = "/selectAllUser.do")
    @ResponseBody
    public AjaxMessage selectAllUser() {
        List<TbUser> users = tbUserService.selectAllUser();
        AjaxMessage ajaxMessage = AjaxMessage.success();
        if (users == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("result", users.size());
            ajaxMessage.add("user", users);
        }
        return ajaxMessage;
    }


    //通过分页得到用户数据
    @RequestMapping(value = "/selectUserByPage.do")
    @ResponseBody
    public AjaxMessage selectUsersByPage(String pageNumber, String pageSize) {
        PageHelper.startPage(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));//下一句的语句会进行分页查询
        List<TbUser> users = tbUserService.selectAllUser();

        //转化为pageHelper的包装类型
        PageInfo<TbUser> tbUserPageInfo = new PageInfo<>(users);

        AjaxMessage ajaxMessage = AjaxMessage.success();
        if (tbUserPageInfo.getList() == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("orders", tbUserPageInfo.getList());
            ajaxMessage.add("total", tbUserPageInfo.getTotal());
            ajaxMessage.add("pages", tbUserPageInfo.getPages());
            ajaxMessage.add("last", tbUserPageInfo.isIsLastPage());
            ajaxMessage.add("first", tbUserPageInfo.isIsFirstPage());
        }
        return ajaxMessage;
    }


    //更新数据
    @RequestMapping(value = "/updateUser.do")
    @ResponseBody
    public AjaxMessage updateUser(String id, String name, String pwd, String email, String tel, String qq,
                                  String ip, String tishi, String huida, String dizhi, String regtime, String logincishu, String truename, String imgurl) {
        TbUser tbUser = new TbUser();
        tbUser.setDizhi(dizhi);
        tbUser.setEmail(email);
        tbUser.setName(name);
        tbUser.setHuida(huida);
        tbUser.setId(Integer.parseInt(id));
        tbUser.setImgurl(imgurl);
        tbUser.setLogincishu(Integer.parseInt(logincishu));
        tbUser.setPwd(pwd);
        tbUser.setQq(qq);
        tbUser.setTishi(tishi);
        tbUser.setIp(ip);
        tbUser.setTel(tel);
        tbUser.setTruename(truename);
        tbUser.setRegtime(new Date(Long.parseLong(regtime)));

        AjaxMessage ajaxMessage = AjaxMessage.success();


        int count = tbUserService.updateUser(tbUser);
        if (count != 1)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("count", "1");
        }
        return ajaxMessage;
    }


    //删除数据
    @RequestMapping(value = "/deleteUser.do")
    @ResponseBody
    public AjaxMessage deleteUserByKey(String id) {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        int count = tbUserService.deleteUserByKey(Integer.parseInt(id));
        if (count != 0)
            ajaxMessage.add("count", count);
        else
            return AjaxMessage.fail();
        return ajaxMessage;
    }


    //添加数据
    @RequestMapping(value = "/addUser.do")
    @ResponseBody
    public AjaxMessage addUser(String name, String pwd, String email, String tel, String qq,
                               String ip, String tishi, String huida, String dizhi, String regtime, String logincishu, String truename, String imgurl) {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        TbUser tbUser = new TbUser();
        tbUser.setDizhi(dizhi);
        tbUser.setEmail(email);
        tbUser.setName(name);
        tbUser.setHuida(huida);
        tbUser.setImgurl(imgurl);
        tbUser.setLogincishu(Integer.parseInt(logincishu));
        tbUser.setPwd(pwd);
        tbUser.setQq(qq);
        tbUser.setTishi(tishi);
        tbUser.setIp(ip);
        tbUser.setTel(tel);
        tbUser.setTruename(truename);
        tbUser.setRegtime(new Date(Long.parseLong(regtime)));


        int count = tbUserService.insertUser(tbUser);
        if (count != 0)
            ajaxMessage.add("count", count);
        else
            return AjaxMessage.fail();
        return ajaxMessage;
    }

    //查询商品
    @RequestMapping(value = "/searchUsers.do")
    @ResponseBody
    public AjaxMessage searchGoods(String data) {
        AjaxMessage ajaxMessage;
        List<TbUser> results = tbUserService.searchUser(data);
        if (results == null)
            return AjaxMessage.fail();
        else if (results.size() == 0) {  //无结果
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("result", 0);
            return ajaxMessage;
        } else {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("result", 1);
            ajaxMessage.add("list", results);
            return ajaxMessage;
        }
    }

}
