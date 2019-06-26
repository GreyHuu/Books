package com.books.dao;

import com.books.entity.TbAdmin;
import com.books.service.TbUserService;

public interface TbAdminMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbAdmin record);

    int insertSelective(TbAdmin record);

    TbAdmin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbAdmin record);

    int updateByPrimaryKey(TbAdmin record);

    String selectByUsername(String username);
}