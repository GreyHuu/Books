package com.books.entity;

import java.util.Date;

public class TbHuifu {
    private Integer id;

    private Integer userid;

    private Integer leavewordid;

    private String title;

    private Date time;

    private Integer yidu;

    private String content;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getLeavewordid() {
        return leavewordid;
    }

    public void setLeavewordid(Integer leavewordid) {
        this.leavewordid = leavewordid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getYidu() {
        return yidu;
    }

    public void setYidu(Integer yidu) {
        this.yidu = yidu;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}