package com.books.dao;

import com.books.entity.TbHuifu;

public interface TbHuifuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbHuifu record);

    int insertSelective(TbHuifu record);

    TbHuifu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbHuifu record);

    int updateByPrimaryKeyWithBLOBs(TbHuifu record);

    int updateByPrimaryKey(TbHuifu record);
}