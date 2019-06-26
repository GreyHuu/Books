package com.books.dao;

import com.books.entity.TbLeaveword;

public interface TbLeavewordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbLeaveword record);

    int insertSelective(TbLeaveword record);

    TbLeaveword selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbLeaveword record);

    int updateByPrimaryKeyWithBLOBs(TbLeaveword record);

    int updateByPrimaryKey(TbLeaveword record);
}