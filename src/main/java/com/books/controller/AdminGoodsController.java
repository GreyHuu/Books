package com.books.controller;

import com.books.entity.TbShangpin;
import com.books.service.impl.TbGoodsServiceImpl;
import com.books.util.AjaxMessage;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping(value = "/goods")
public class AdminGoodsController {
    @Autowired
    private TbGoodsServiceImpl tbGoodsService;

    //查询全部的信息
    @RequestMapping("/selectAllGods.do")
    @ResponseBody
    public AjaxMessage selectAllGoods() {
        AjaxMessage ajaxMessage = AjaxMessage.success();
        List<TbShangpin> goodsList = tbGoodsService.selectAllGoods();
        if (goodsList == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("count", goodsList.size());
            ajaxMessage.add("list", goodsList);
        }
        return ajaxMessage;
    }


    //分页获得商品信息
    @RequestMapping(value = "/selectAllGoodsByPage.do")
    @ResponseBody
    public AjaxMessage selectAllGoodsByPage(String pageNumber, String pageSize) {
        PageHelper.startPage(Integer.parseInt(pageNumber), Integer.parseInt(pageSize));
        List<TbShangpin> list = tbGoodsService.selectAllGoods();
        PageInfo<TbShangpin> listPage = new PageInfo<>(list);
        AjaxMessage ajaxMessage = AjaxMessage.success();
        //System.out.println(listPage.getList().get(0).getGoodstypeId());
        if (list == null)
            return AjaxMessage.fail();
        else {
            ajaxMessage.add("orders", listPage.getList());
            ajaxMessage.add("total", listPage.getTotal());
            ajaxMessage.add("pages", listPage.getPages());
            ajaxMessage.add("last", listPage.isIsLastPage());
            ajaxMessage.add("first", listPage.isIsFirstPage());
        }
        return ajaxMessage;
    }

    //更新商品信息
    @RequestMapping(value = "/updateGoods.do")
    @ResponseBody
    public AjaxMessage updateGoods(String id, String mingcheng, String yqprice, String price, String shuliang,
                                   String tupian, String goodstypeId) {
        TbShangpin good = new TbShangpin();
        good.setGoodstypeId(Integer.parseInt(goodstypeId));
        good.setMingcheng(mingcheng);
        good.setPrice(Double.parseDouble(price));
        good.setShuliang(Integer.parseInt(shuliang));
        good.setTupian(tupian);
        good.setYqprice(Double.parseDouble(yqprice));
        good.setId(Integer.parseInt(id));

        int count = tbGoodsService.updateGood(good);

        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }
    }

    //删除商品
    @RequestMapping(value = "/deleteGoods.do")
    @ResponseBody
    public AjaxMessage deleteGoods(String id) {
        int count = tbGoodsService.deleteGood(Integer.parseInt(id));
        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }
    }

    //新增商品
    @RequestMapping(value = "/addGoods.do")
    @ResponseBody
    public AjaxMessage adGoods(String mingcheng, String yqprice, String price, String shuliang,
                               String tupian, String goodstypeId) {

        //查重
        TbShangpin good = new TbShangpin();
        good.setGoodstypeId(Integer.parseInt(goodstypeId));
        good.setMingcheng(mingcheng);
        good.setPrice(Double.parseDouble(price));
        good.setShuliang(Integer.parseInt(shuliang));
        good.setTupian(tupian);
        good.setYqprice(Double.parseDouble(yqprice));

        int count = tbGoodsService.insertGood(good);
        if (count != 1)
            return AjaxMessage.fail();
        else {
            AjaxMessage ajaxMessage = AjaxMessage.success();
            ajaxMessage.add("count", count);
            return ajaxMessage;
        }

    }

    //查询商品
    @RequestMapping(value = "/searchGoods.do")
    @ResponseBody
    public AjaxMessage searchGoods(String data) {
        AjaxMessage ajaxMessage;
        List<TbShangpin> results = tbGoodsService.searchGoods(data);
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
