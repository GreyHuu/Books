package com.books.controller;

import com.books.entity.TbDingdan;
import com.books.entity.TbShangpin;
import com.books.entity.TbUser;
import com.books.listener.timeListener;
import com.books.service.impl.TbAdminServiceImpl;
import com.books.service.impl.TbGoodsServiceImpl;
import com.books.service.impl.TbOrderServiceImpl;
import com.books.service.impl.TbUserServiceImpl;
import com.books.util.AjaxMessage;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sun.deploy.net.HttpResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/admin")
public class AdminOrderController {
    @Autowired
    private TbOrderServiceImpl tbOrderService;

    @Autowired
    private TbUserServiceImpl tbUserService;


    @Autowired
    private TbAdminServiceImpl tbAdminServiceImpl;

    @Autowired
    private TbGoodsServiceImpl tbGoodsService;

    //通过id获得订单
    @RequestMapping(value = "/getAOrder.do")
    public TbDingdan getAOrder(int id) {
        return tbOrderService.selectAOrder(id);
    }


    //上传图片
    @RequestMapping(value = "/goToImgUp.go")
    public String goToImgUp() {
        return "admin/imgUploadTest";
    }


    @RequestMapping(value = "/getAllOrders.do")
    @ResponseBody
    public List<TbDingdan> getAllOrders() {
        List<TbDingdan> list = tbOrderService.sellectAllOrders();
        String ids = list.get(0).getShop();
        String[] myIds = ids.split(" ");
        for (int i = 0; i < myIds.length; i++) {
            System.out.println("sdf " + myIds[i]);
            TbShangpin tbShangpin = tbGoodsService.getGoodsById(Integer.parseInt(myIds[i]));
            System.out.println(tbShangpin.getMingcheng());
        }
        return tbOrderService.sellectAllOrders();
    }

    //更新订单信息
    @RequestMapping(value = "/updateOrder.do")
    @ResponseBody
    public AjaxMessage updateOrder(String id, String bianhao, String name, String sex, String address, String tel, String time,
                                   String username, String leaveword, String zhuangtai, String total) {
        id = id.trim();
        total = total.trim();
        TbDingdan order = new TbDingdan();
        order.setAddress(address);
        order.setTotal(Float.parseFloat(total));
        order.setBianhao(bianhao);
        order.setId(Integer.parseInt(id));
        order.setLeaveword(leaveword);
        order.setName(name);
        order.setSex(sex);
        order.setTel(tel);
        order.setTime(new Date(Long.parseLong(time)));
        order.setUsername(username);
        order.setZhuangtai(Integer.parseInt(zhuangtai));
        //更新
        int count = tbOrderService.updateOrder(order);
        AjaxMessage ajaxMessage;
        if (count == 1)
            ajaxMessage = AjaxMessage.success();
        else
            return AjaxMessage.fail();
        ajaxMessage.add("count", count);
        return ajaxMessage;
    }

    //分页查询订单

    /**
     * @param pageNumber 第几页
     * @param pageSize   页面显示个数
     * @return
     */
    @RequestMapping(value = "/getOrdersPage.do")
    @ResponseBody
    public AjaxMessage getOrdersPage(String pageNumber, String pageSize) {
        PageHelper.startPage(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));//此方法下的第一个查询语句会执行分页操作 想要再一次分页需要再一次执行本语句
        List<TbDingdan> tbDingdans = tbOrderService.sellectAllOrders();
        PageInfo<TbDingdan> tbDingdanPageInfo = new PageInfo<>(tbDingdans);
        if (tbDingdanPageInfo.getList() == null)
            return AjaxMessage.fail();
        else {
            AjaxMessage myRecords = AjaxMessage.success();
            //获得当前页的数据
            myRecords.add("orders", tbDingdanPageInfo.getList());
            //一共的记录数
            myRecords.add("total", tbDingdanPageInfo.getTotal());

            //一共多少页
            myRecords.add("pages", tbDingdanPageInfo.getPages());

            //是否是最后一页
            myRecords.add("last", tbDingdanPageInfo.isIsLastPage());
            //是否是第一页
            myRecords.add("first", tbDingdanPageInfo.isIsFirstPage());
            return myRecords;
        }

    }

    //增加订单
    @RequestMapping(value = "/addOrder.do")
    @ResponseBody
    public AjaxMessage addOrder(String bianhao, String name, String sex, String address, String tel, String time,
                                String username, String leaveword, String zhuangtai, String total, String shop) {
        total = total.trim();
        TbDingdan order = new TbDingdan();
        order.setAddress(address);
        order.setTotal(Float.parseFloat(total));
        order.setBianhao(bianhao);
        order.setLeaveword(leaveword);
        order.setName(name);
        order.setSex(sex);
        order.setTel(tel);
        order.setTime(new Date(Long.parseLong(time)));
        order.setUsername(username);
        order.setShop(shop);
        order.setZhuangtai(Integer.parseInt(zhuangtai));
        AjaxMessage ajaxMessage;
        //判断是否重复
//        if (tbOrderService.checkRepeat(bianhao) == null) {
        int count = tbOrderService.insertOrder(order);
        if (count == 1) {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", 1);
        } else {
            return AjaxMessage.fail();
        }
//        } else
//            return AjaxMessage.fail();
        return ajaxMessage;
    }

    //查找订单(订单编号和姓名的两个模糊查找)
    @RequestMapping(value = "/searchOrder1.do")
    @ResponseBody
    public AjaxMessage searchOrder(String data) {
        List<TbDingdan> results = tbOrderService.searchOrders("%" + data + "%");
        AjaxMessage ajaxMessage;
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

    //删除订单
    @RequestMapping(value = "/deleteOrder.do")
    @ResponseBody
    public AjaxMessage deleteOrder(String id) {
        int myId = Integer.parseInt(id);
        int count = tbOrderService.deleteOrder(myId);
        AjaxMessage ajaxMessage;
        if (count == 1)
            ajaxMessage = AjaxMessage.success();
        else
            return AjaxMessage.fail();
        ajaxMessage.add("count", count);
        return ajaxMessage;
    }


    //进入订单页面
    @RequestMapping(value = "/goToOrder.go")
    public String goToOrder() {
        return "admin/allOrders";
    }

    //进入订单页面
    @RequestMapping(value = "/goods.go")
    public String goToGoods() {
        return "admin/goods";
    } //进入订单页面

    @RequestMapping(value = "/user.go")
    public String goToUser() {
        return "admin/user";
    } //进入订单页面

    @RequestMapping(value = "/images.go")
    public String goToImages() {
        return "admin/images";
    } //进入订单页面

    @RequestMapping(value = "/back.go")
    public String goToBack() {
        return "admin/back";
    }

    //获得全部的用户
    @RequestMapping(value = "/selectAllUser.do")
    @ResponseBody
    public AjaxMessage selectAllUser() {
        AjaxMessage ajaxMessage;
        List<TbUser> users = tbUserService.selectAllUser();
        List<String> username = new ArrayList<>();
        if (users == null)
            return AjaxMessage.fail();
        else if (users.size() == 0) {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", 0);
        } else {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", users.size());
            for (int i = 0; i < users.size(); i++)
                username.add(users.get(i).getName());
            ajaxMessage.add("users", username);
        }
        return ajaxMessage;
    }

    @RequestMapping(value = "/gotoLogin.go")
    public void gotoLogin(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.sendRedirect(request.getContextPath() + "/");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/gotoRegister.go")
    public String gotoRegister() {
        return "register";
    }


    @RequestMapping(value = "/login.do")
    @ResponseBody
    public AjaxMessage login(String userPhone, String password, HttpSession session) {
        String pas = tbAdminServiceImpl.loginMacth(userPhone);
        AjaxMessage ajaxMessage;
        if (pas == null) {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("result", "2");
        } else if (pas.equals(password)) {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("result", "0");
            session.setAttribute("admin", "admin");
            timeListener.nowTime = new Date();
        } else {
            ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("result", "1");
        }
        return ajaxMessage;
    }
}
