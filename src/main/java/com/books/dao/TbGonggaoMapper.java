package com.books.dao;

import com.books.entity.TbGonggao;

import java.util.List;

public interface TbGonggaoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbGonggao record);

    int insertSelective(TbGonggao record);

    TbGonggao selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbGonggao record);

    int updateByPrimaryKeyWithBLOBs(TbGonggao record);

    int updateByPrimaryKey(TbGonggao record);

    List<TbGonggao> selectAllNotices();
}