package com.books.service;

import com.books.entity.TbUser;

import java.util.List;

public interface TbUserService {
    List<TbUser> selectAllUser();
    int updateUser(TbUser tbUser);
    int deleteUserByKey(int id);
    int insertUser(TbUser tbUser);
}
