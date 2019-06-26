package com.books.service;

import com.books.entity.TbGonggao;

import java.util.List;

public interface TbGonggaoService {
    List<TbGonggao> selectAllNotices();
    int addNotice(TbGonggao tbGonggao);
    int updateNotice(TbGonggao tbGonggao);
    int deleteNotice(int id);
}
