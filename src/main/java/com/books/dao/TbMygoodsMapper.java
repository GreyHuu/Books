package com.books.dao;

import com.books.entity.TbMygoods;

public interface TbMygoodsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbMygoods record);

    int insertSelective(TbMygoods record);

    TbMygoods selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbMygoods record);

    int updateByPrimaryKey(TbMygoods record);
}