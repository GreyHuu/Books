package com.books.util;

import java.util.HashMap;
import java.util.Map;
//json数据的通用返回类
public class AjaxMessage {

    //状态码 100-成功 200-失败
    private int code;

    //提示信息
    private String msg;

    //用户要返回给浏览器的数据
    //通过 map 获得数据
    private Map<String, Object> extend = new HashMap<String, Object>();

    //成功时调用
    public static AjaxMessage success() {
        AjaxMessage result = new AjaxMessage();
        result.setCode(100);
        result.setMsg("处理成功");
        return result;
    }

    //失败时调用
    public static AjaxMessage fail() {
        AjaxMessage result = new AjaxMessage();
        result.setCode(200);
        result.setMsg("处理失败");
        return result;
    }

    //添加数据
    public AjaxMessage add(String key, Object value) {
        Map<String, Object> map = this.getExtend();
        map.put(key, value);
        return this;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Map<String, Object> getExtend() {
        return extend;
    }

    public void setExtend(Map<String, Object> extend) {
        this.extend = extend;
    }


}
