package com.books.listener;

import java.util.Date;

public class timeListener extends Thread {
    public static Date nowTime = new Date();

    public void run() {
        System.out.println("开始时间：" + nowTime.getTime());
    }
}
