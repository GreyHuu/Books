package com.books.controller;

import com.books.util.AjaxMessage;
import com.books.util.Base64Utils;
import com.books.util.UploadImg;
import com.github.echisan.wbp4j.UploadRequest;
import com.github.echisan.wbp4j.UploadResponse;
import com.github.echisan.wbp4j.exception.UploadFailedException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class UploadImgBySiNa {
    @RequestMapping(value = "/uploadImg.do")
    @ResponseBody
    public AjaxMessage uploadImg(String base64Data) {
        String data = "";
        String[] d = base64Data.split("base64,");//分割  只要后半部分
        data = d[1];

        AjaxMessage ajaxMessage = AjaxMessage.success();

        UploadRequest uploadRequest = UploadImg.getInstance();
        UploadResponse uploadResponse = null;
        try {
            uploadResponse = uploadRequest.upload(Base64Utils.decode(data));
        } catch (IOException |
                UploadFailedException e) {
            e.printStackTrace();
        }
        if (uploadResponse != null) {
            String imgUrl = uploadResponse.getImageInfo().getMiddle();
            System.out.println(imgUrl);
            ajaxMessage.add("imgUrl", imgUrl);
            return ajaxMessage;
        } else
            return AjaxMessage.fail();
    }
}
