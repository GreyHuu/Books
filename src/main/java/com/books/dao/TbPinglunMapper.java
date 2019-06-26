package com.books.dao;

import com.books.entity.TbPinglun;

public interface TbPinglunMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbPinglun record);

    int insertSelective(TbPinglun record);

    TbPinglun selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbPinglun record);

    int updateByPrimaryKeyWithBLOBs(TbPinglun record);

    int updateByPrimaryKey(TbPinglun record);
}