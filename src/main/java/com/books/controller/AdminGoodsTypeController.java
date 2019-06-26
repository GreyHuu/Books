package com.books.controller;

import com.books.entity.Goodstype;
import com.books.service.impl.GoodsTypeServiceImpl;
import com.books.util.AjaxMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/goodsType")
public class AdminGoodsTypeController {
    @Autowired
    private GoodsTypeServiceImpl goodsTypeService;

    //获得全部的商品类型
    @RequestMapping(value = "/getAllGoodsType.do")
    @ResponseBody
    public AjaxMessage getAllGoodsType() {
        AjaxMessage ajaxMessage = AjaxMessage.success();

        List<Goodstype> list = goodsTypeService.selectAllGoodsType();

        if (list == null)
            return AjaxMessage.fail();
        else
            ajaxMessage.add("list", list);
        return ajaxMessage;
    }

    //删除商品类型
    @RequestMapping(value = "/deleteGoodsType.do")
    @ResponseBody
    public AjaxMessage deleteGoodsType(String type) {
        int mid = Integer.parseInt(type.trim());
        goodsTypeService.deleteTypesAndGood(mid);
        return AjaxMessage.success();
    }

    //增加商品类型
    @RequestMapping(value = "/addGoodsType.do")
    @ResponseBody
    public AjaxMessage addGoodsType(String typeName) {
        Goodstype goodstype = new Goodstype();
        goodstype.setTypename(typeName);

        int count = goodsTypeService.addGoodsType(goodstype);
        if (count != 1)
            return AjaxMessage.fail();
        else
            return AjaxMessage.success();

    }

    //修改商品类型
    @RequestMapping(value = "/updateGoodsType.do")
    @ResponseBody
    public AjaxMessage updateGodsType(String id, String typeName) {
        Goodstype goodstype = new Goodstype();
        goodstype.setTypename(typeName);
        goodstype.setId(Integer.parseInt(id));

        int count = goodsTypeService.updateGoodsType(goodstype);

        if (count != 1)
            return AjaxMessage.fail();
        else
            return AjaxMessage.success();
    }

    //获得该分类的商品数量
    @RequestMapping(value = "/getCountByType.do")
    @ResponseBody
    public AjaxMessage getCountByType(String type) {
        AjaxMessage ajaxMessage = AjaxMessage.success();

        int count = goodsTypeService.getGoodsTypeCount(Integer.parseInt(type));

        ajaxMessage.add("count", count);
        return ajaxMessage;
    }
}
