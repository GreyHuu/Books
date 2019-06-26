package com.books.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class timeGetter implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        new timeListener().start();
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}


