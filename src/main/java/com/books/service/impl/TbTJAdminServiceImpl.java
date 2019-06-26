package com.books.service.impl;


import com.books.dao.TbTjadminMapper;
import com.books.entity.TbTjadmin;
import com.books.service.TbTJAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TbTJAdminServiceImpl implements TbTJAdminService {
    @Autowired
    private TbTjadminMapper tbTjadminMapper;

    @Override
    public TbTjadmin getMessage(int id) {
        return tbTjadminMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateMessge(TbTjadmin tbTjadmin) {
        return tbTjadminMapper.updateByPrimaryKeySelective(tbTjadmin);
    }
}
