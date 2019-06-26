package com.books.dao;

import com.books.entity.TbGouwuche;

public interface TbGouwucheMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbGouwuche record);

    int insertSelective(TbGouwuche record);

    TbGouwuche selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbGouwuche record);

    int updateByPrimaryKey(TbGouwuche record);
}