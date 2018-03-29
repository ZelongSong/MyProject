package com.song.project.service;

import com.song.project.domain.User;

/**
 * Created by Administrator on 2018-03-29.
 */
public interface UserService {
    /**
     * 根据用户名获取用户信息，包括从库的地址信息
     *
     * @param userName
     * @return
     */
    User findByName(String userName);
}
