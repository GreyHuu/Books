package com.books.service.impl;

import com.books.dao.TbShangpinMapper;
import com.books.dao.TbShangpinVerityMapper;
import com.books.entity.TbShangpinVerity;
import com.books.service.TbGoodsVerityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbGoodsVerityServiceImpl implements TbGoodsVerityService {
    @Autowired
    private TbShangpinVerityMapper tbShangpinVerityMapper;

    @Override
    public List<TbShangpinVerity> selectAllGoodsVerity() {
        return tbShangpinVerityMapper.selectAllVerity();
    }

    @Override
    public int updateGood(TbShangpinVerity tbShangpinVerity) {
        return tbShangpinVerityMapper.updateByPrimaryKeySelective(tbShangpinVerity);
    }

    @Override
    public int deleteGood(int id) {
        return tbShangpinVerityMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insertGood(TbShangpinVerity tbShangpinVerity) {
        return tbShangpinVerityMapper.insertSelective(tbShangpinVerity);
    }

    @Override
    public TbShangpinVerity addVerity(int id) {
        return tbShangpinVerityMapper.selectByPrimaryKey(id);
    }
}
