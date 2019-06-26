package com.books.service.impl;

import com.books.dao.TbGonggaoMapper;
import com.books.entity.TbGonggao;
import com.books.service.TbGonggaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TbGonggaoServiceImpl implements TbGonggaoService {
    @Autowired
    private TbGonggaoMapper tbGonggaoMapper;

    @Override
    public List<TbGonggao> selectAllNotices() {
        return tbGonggaoMapper.selectAllNotices();
    }

    @Override
    public int addNotice(TbGonggao tbGonggao) {
        return tbGonggaoMapper.insertSelective(tbGonggao);
    }

    @Override
    public int updateNotice(TbGonggao tbGonggao) {
        return tbGonggaoMapper.updateByPrimaryKeyWithBLOBs(tbGonggao);
    }

    @Override
    public int deleteNotice(int id) {
        return tbGonggaoMapper.deleteByPrimaryKey(id);
    }
}
