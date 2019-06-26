package com.books.dao;

import com.books.entity.TbShangpin;

import java.util.List;

public interface TbShangpinMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbShangpin record);

    int insertSelective(TbShangpin record);

    TbShangpin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbShangpin record);

    int updateByPrimaryKey(TbShangpin record);

    List<TbShangpin> selectAllGoods();

    List<TbShangpin> selectGoodsByType(int type);

    int deleteGoodByType(int type);
}