package com.books.service;

import com.books.entity.TbDingdan;

import java.util.List;

//对于订单的操作
public interface TbOrderService {
    TbDingdan selectAOrder(int id);
    List<TbDingdan> sellectAllOrders();
    int updateOrder(TbDingdan record);
    int deleteOrder(int id);
    List<TbDingdan> searchOrders(String data);
    int insertOrder(TbDingdan record);
    TbDingdan checkRepeat(String number);
}
