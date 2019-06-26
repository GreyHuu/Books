package com.books.service;

import com.books.entity.Goodstype;

import java.util.List;

public interface GoodsTypeService {
    List<Goodstype> selectAllGoodsType();
    int deleteGoodsType(int id);
    int updateGoodsType(Goodstype goodstype);
    int addGoodsType(Goodstype goodstype);
    int getGoodsTypeCount(int type);

    int deleteTypesAndGood(int type);
}
