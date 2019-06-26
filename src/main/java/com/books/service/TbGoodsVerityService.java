package com.books.service;

import com.books.entity.TbShangpinVerity;

import java.util.List;

public interface TbGoodsVerityService {
    List<TbShangpinVerity> selectAllGoodsVerity();
    int updateGood(TbShangpinVerity tbShangpinVerity);
    int deleteGood(int id);
    int insertGood(TbShangpinVerity tbShangpinVerity);

    TbShangpinVerity addVerity(int id);
}
