package com.books.service.impl;

import com.books.dao.TbAdminMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TbAdminServiceImpl implements com.books.service.TbAdminService {
    @Autowired
    private TbAdminMapper tbAdminMapper;
    @Override
    public String loginMacth(String username) {
        String pwd=tbAdminMapper.selectByUsername(username);
        return pwd;
    }
}
