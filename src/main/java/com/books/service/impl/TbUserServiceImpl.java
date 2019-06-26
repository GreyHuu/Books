package com.books.service.impl;

import com.books.dao.TbUserMapper;
import com.books.entity.TbUser;
import com.books.service.TbUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TbUserServiceImpl implements TbUserService {
    @Autowired
    private TbUserMapper tbUserMapper;
    @Override
    public List<TbUser> selectAllUser() {
        return tbUserMapper.selectAllUser();
    }

    @Override
    public int updateUser(TbUser tbUser) {
        return tbUserMapper.updateByPrimaryKey(tbUser);
    }

    @Override
    public int deleteUserByKey(int id) {
        return tbUserMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insertUser(TbUser tbUser) {
        return tbUserMapper.insertSelective(tbUser);
    }
}
