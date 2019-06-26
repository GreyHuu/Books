package com.books.service.impl;

import com.books.dao.TbDingdanMapper;
import com.books.entity.TbDingdan;
import com.books.service.TbOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
//一个类带了@Service注解，将自动注册到Spring容器，不需要再在applicationContext.xml文件定义bean了，
// 类似的还包括@Component、@Repository、@Controller。
public class TbOrderServiceImpl implements TbOrderService {
    @Autowired
    private TbDingdanMapper tbDingdanMapper;
    @Override
    public TbDingdan selectAOrder(int id) {
        return tbDingdanMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<TbDingdan> sellectAllOrders() {
        return tbDingdanMapper.selectAllOrders();
    }

    @Override
    public int updateOrder(TbDingdan record) {
        return tbDingdanMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int deleteOrder(int id) {
        return tbDingdanMapper.deleteByPrimaryKey(id);
    }

    @Override
    public List<TbDingdan> searchOrders(String data) {
        return tbDingdanMapper.searchOrders(data);
    }

    @Override
    public int insertOrder(TbDingdan record) {
        return tbDingdanMapper.insert(record);
    }

    @Override
    public TbDingdan checkRepeat(String number) {
        return tbDingdanMapper.selectByRepeat(number);
    }
}
