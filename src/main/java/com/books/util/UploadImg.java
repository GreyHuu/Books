package com.books.util;


import com.github.echisan.wbp4j.UploadRequest;
import com.github.echisan.wbp4j.UploadRequestBuilder;

//单例模式  用户新浪图床初始化
public class UploadImg {
    private static UploadRequest uploadRequest;
    public static synchronized UploadRequest getInstance() {
        if (null == uploadRequest) {
            uploadRequest = UploadRequestBuilder.buildDefault("17602603997", "39971004.tfh");
        }
        return uploadRequest;
    }
}
