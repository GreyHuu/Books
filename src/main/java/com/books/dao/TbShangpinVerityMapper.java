package com.books.dao;

import com.books.entity.TbShangpinVerity;

import java.util.List;

public interface TbShangpinVerityMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbShangpinVerity record);

    int insertSelective(TbShangpinVerity record);

    TbShangpinVerity selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbShangpinVerity record);

    int updateByPrimaryKey(TbShangpinVerity record);

    List<TbShangpinVerity> selectAllVerity();
}