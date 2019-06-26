package com.books.dao;

import com.books.entity.TbLunbo;

public interface TbLunboMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbLunbo record);

    int insertSelective(TbLunbo record);

    TbLunbo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbLunbo record);

    int updateByPrimaryKey(TbLunbo record);
}