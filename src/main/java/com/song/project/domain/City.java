package com.song.project.domain;

import lombok.Data;

/**
 * Created by Administrator on 2018-03-29.
 */
@Data
public class City {

        /**
         * 城市编号
         */
        private Long id;

        /**
         * 省份编号
         */
        private Long provinceId;

        /**
         * 城市名称
         */
        private String cityName;

        /**
         * 描述
         */
        private String description;
}
