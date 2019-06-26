package com.books.controller;

import com.books.entity.TbGonggao;
import com.books.service.impl.TbGonggaoServiceImpl;
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
@RequestMapping(value = "/notice")
public class AdminGongGaoController {
    @Autowired
    private TbGonggaoServiceImpl tbGonggaoService;


    //获得全部的公告
    @RequestMapping(value = "/selectAllNotices.do")
    @ResponseBody
    public AjaxMessage selectAllNotices() {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        List<TbGonggao> tbGonggaos = tbGonggaoService.selectAllNotices();
        if (tbGonggaos == null)
            return AjaxMessage.fail();
        else
            ajaxMessage.add("list", tbGonggaos);
        return ajaxMessage;
    }


    //分页获取公告
    @RequestMapping(value = "/selectAllNoticesByPage.do")
    @ResponseBody
    public AjaxMessage selectAllNoticesByPage(String pageNumber, String pageSize) {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        PageHelper.startPage(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));
        List<TbGonggao> tbGonggaoList = tbGonggaoService.selectAllNotices();
        if (tbGonggaoList == null)
            return AjaxMessage.fail();
        PageInfo<TbGonggao> tbGonggaoPageInfo = new PageInfo<>(tbGonggaoList);

        ajaxMessage.add("orders", tbGonggaoPageInfo.getList());
        ajaxMessage.add("pages", tbGonggaoPageInfo.getPages());
        ajaxMessage.add("total", tbGonggaoPageInfo.getTotal());
        ajaxMessage.add("last", tbGonggaoPageInfo.isIsLastPage());
        ajaxMessage.add("first", tbGonggaoPageInfo.isIsFirstPage());

        return ajaxMessage;
    }

    //删除公告
    @RequestMapping(value = "/deleteNotice.do")
    @ResponseBody
    public AjaxMessage deleteNotice(String id) {
        int count = tbGonggaoService.deleteNotice(Integer.parseInt(id));
        if (count != 1)
            return AjaxMessage.fail();
        AjaxMessage ajaxMessage = AjaxMessage.success();
        ajaxMessage.add("count", count);

        return ajaxMessage;
    }

    //增加公告
    @RequestMapping(value = "/addNotice.do")
    @ResponseBody
    public AjaxMessage addNotice(String title, String content) {
        TbGonggao tbGonggao = new TbGonggao();
        tbGonggao.setTitle(title);
        tbGonggao.setContent(content);
        tbGonggao.setTime(new Date());

        int count = tbGonggaoService.addNotice(tbGonggao);
        if (count != 1)
            return AjaxMessage.fail();
        AjaxMessage ajaxMessage = AjaxMessage.success();
        ajaxMessage.add("count", count);
        return ajaxMessage;
    }

    //更新公告
    @RequestMapping(value = "/updateNotice.do")
    @ResponseBody
    public AjaxMessage updateNotice(String id, String title, String content) {
        TbGonggao tbGonggao = new TbGonggao();
        tbGonggao.setTitle(title);
        tbGonggao.setContent(content);
        tbGonggao.setId(Integer.parseInt(id));
        int count = tbGonggaoService.updateNotice(tbGonggao);

        if (count != 0)
            return AjaxMessage.fail();
        AjaxMessage ajaxMessage = AjaxMessage.success();
        ajaxMessage.add("count", count);
        return ajaxMessage;
    }
}
