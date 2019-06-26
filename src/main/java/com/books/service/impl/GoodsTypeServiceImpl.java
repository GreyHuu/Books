package com.books.service.impl;

import com.books.dao.GoodstypeMapper;
import com.books.dao.TbShangpinMapper;
import com.books.entity.Goodstype;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsTypeServiceImpl implements com.books.service.GoodsTypeService {
    @Autowired
    private GoodstypeMapper goodstypeMapper;
    @Autowired
    private TbShangpinMapper tbShangpinMapper;

    @Override
    public List<Goodstype> selectAllGoodsType() {
        return goodstypeMapper.selectAllGoodsType();
    }

    @Override
    public int deleteGoodsType(int id) {
        return goodstypeMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int updateGoodsType(Goodstype goodstype) {
        return goodstypeMapper.updateByPrimaryKeySelective(goodstype);
    }

    @Override
    public int addGoodsType(Goodstype goodstype) {
        return goodstypeMapper.insertSelective(goodstype);
    }

    @Override
    public int getGoodsTypeCount(int type) {
        return tbShangpinMapper.selectGoodsByType(type).size();
    }

    @Override
    public int deleteTypesAndGood(int type) {
        int count1 = tbShangpinMapper.deleteGoodByType(type);
        System.out.println("dsfsdf "+count1);
        int count2 = goodstypeMapper.deleteByPrimaryKey(type);
        System.out.println("dfd "+count2);
        return count1 +count2;
    }
}
