package com.song.project.domain;

import lombok.Data;

/**
 * 用户实体类
 * Created by Administrator on 2018-03-29.
 */
@Data
public class User {
    /**
     * 城市编号
     */
    private Long id;

    /**
     * 城市名称
     */
    private String userName;

    /**
     * 描述
     */
    private String description;

    private City city;
}
