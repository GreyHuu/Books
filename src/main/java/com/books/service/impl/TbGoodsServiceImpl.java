package com.books.service.impl;

import com.books.dao.TbShangpinMapper;
import com.books.entity.TbShangpin;
import com.books.service.TbGoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbGoodsServiceImpl implements TbGoodsService {
    @Autowired
    private TbShangpinMapper tbGoodsService;

    @Override
    public List<TbShangpin> selectAllGoods() {
        return tbGoodsService.selectAllGoods();
    }

    @Override
    public int updateGood(TbShangpin tbShangpin) {
        return tbGoodsService.updateByPrimaryKeySelective(tbShangpin);
    }

    @Override
    public int deleteGood(int id) {
        return tbGoodsService.deleteByPrimaryKey(id);
    }

    @Override
    public int insertGood(TbShangpin tbShangpin) {
        return tbGoodsService.insertSelective(tbShangpin);
    }

    @Override
    public TbShangpin getGoodsById(int id) {
        return tbGoodsService.selectByPrimaryKey(id);
    }
}
