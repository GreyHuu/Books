package com.books.controller;

import com.books.entity.TbShangpin;
import com.books.entity.TbShangpinVerity;
import com.books.service.impl.TbGoodsServiceImpl;
import com.books.service.impl.TbGoodsVerityServiceImpl;
import com.books.util.AjaxMessage;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/goodsVerity")
public class AdminGoodsVerityController {
    @Autowired
    private TbGoodsVerityServiceImpl tbGoodsVerityService;

    @Autowired
    private TbGoodsServiceImpl tbGoodsService;

    //查询全部的审核商品信息
    @RequestMapping("/selectAllGoodsVerity.do")
    @ResponseBody
    public AjaxMessage selectAllGoodsVerity() {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        List<TbShangpinVerity> goodsList = tbGoodsVerityService.selectAllGoodsVerity();
        if (goodsList == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("count", goodsList.size());
            ajaxMessage.add("list", goodsList);
        }
        return ajaxMessage;
    }


    //分页获得审核商品信息
    @RequestMapping(value = "/selectAllGoodsVerityByPage.do")
    @ResponseBody
    public AjaxMessage selectAllGoodsVerityByPage(String pageNumber, String pageSize) {
        PageHelper.startPage(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));
        List<TbShangpinVerity> list = tbGoodsVerityService.selectAllGoodsVerity();
        PageInfo<TbShangpinVerity> listPage = new PageInfo<>(list);
        AjaxMessage ajaxMessage = AjaxMessage.success();
        if (list == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("orders", listPage.getPages());
            ajaxMessage.add("total", listPage.getTotal());
            ajaxMessage.add("pages", listPage.getPages());
            ajaxMessage.add("last", listPage.isIsLastPage());
            ajaxMessage.add("first", listPage.isIsLastPage());
        }
        return ajaxMessage;
    }

    //更新审核商品信息
    @RequestMapping(value = "/updateGoodsVerity.do")
    @ResponseBody
    public AjaxMessage updateGoodsVerity(String id, String goodVerity) {
        TbShangpinVerity good = new TbShangpinVerity();
        good.setId(Integer.parseInt(id));
        int status = Integer.parseInt(goodVerity);
        good.setVertyStatus(status);
        if (status == 2) {//变成审核状态 就将当前审核商品放入商品中
            TbShangpinVerity addVerity = tbGoodsVerityService.addVerity(Integer.parseInt(id));

            TbShangpin tbShangpin = new TbShangpin();
            tbShangpin.setYqprice(addVerity.getYqprice());
            tbShangpin.setTupian(addVerity.getTupian());
            tbShangpin.setShuliang(addVerity.getShuliang());
            tbShangpin.setPrice(addVerity.getPrice());
            tbShangpin.setMingcheng(addVerity.getMingcheng());
            tbShangpin.setGoodstypeId(addVerity.getGoodstypeId());
            //添加商品
            tbGoodsService.insertGood(tbShangpin);
        }

        int count = tbGoodsVerityService.updateGood(good);
        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }
    }

    //删除审核商品
    @RequestMapping(value = "/deleteGoodsVerity.do")
    @ResponseBody
    public AjaxMessage deleteGoodsVerity(String id) {
        int count = tbGoodsVerityService.deleteGood(Integer.parseInt(id));
        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }
    }

    //新增审核商品
    @RequestMapping(value = "/addGoodsVerity.do")
    @ResponseBody
    public AjaxMessage addGoodsVerity(String id, String mingcheng, String yqprice, String price, String shuliang,
                                      String tupian, String goodstypeId, String goodVerity) {

        //查重


        TbShangpinVerity good = new TbShangpinVerity();
        good.setGoodstypeId(Integer.parseInt(goodstypeId));
        good.setMingcheng(mingcheng);
        good.setPrice(Double.parseDouble(price));
        good.setShuliang(Integer.parseInt(shuliang));
        good.setTupian(tupian);
        good.setYqprice(Double.parseDouble(yqprice));
        good.setId(Integer.parseInt(id));
        good.setVertyStatus(Integer.parseInt(goodVerity));


        int count = tbGoodsVerityService.insertGood(good);
        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }

    }
}
