package com.books.dao;

import com.books.entity.TbDingdan;
import org.springframework.stereotype.Repository;

import java.util.List;


//Repository表明它是数据访问组件,即DAO组件
//如果不写的话就需要在spring.xml中配置环境 自动导入  否则不能识别这个bean
@Repository
public interface TbDingdanMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TbDingdan record);

    int insertSelective(TbDingdan record);

    TbDingdan selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TbDingdan record);

    int updateByPrimaryKeyWithBLOBs(TbDingdan record);

    int updateByPrimaryKey(TbDingdan record);

    List<TbDingdan> selectAllOrders();
    List<TbDingdan> searchOrders(String data);
    TbDingdan selectByRepeat(String number);
}