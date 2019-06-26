package com.books.service;

import com.books.entity.TbShangpin;

import java.util.List;

public interface TbGoodsService {
    List<TbShangpin> selectAllGoods();

    int updateGood(TbShangpin tbShangpin);

    int deleteGood(int id);

    int insertGood(TbShangpin tbShangpin);

    TbShangpin getGoodsById(int id);

    List<TbShangpin> searchGoods(String data);
}
