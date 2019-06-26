package com.books.dao;

import com.books.entity.TbTjadmin;

public interface TbTjadminMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbTjadmin record);

    int insertSelective(TbTjadmin record);

    TbTjadmin selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbTjadmin record);

    int updateByPrimaryKey(TbTjadmin record);
}