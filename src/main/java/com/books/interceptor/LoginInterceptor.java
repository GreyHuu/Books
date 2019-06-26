package com.books.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


//拦截器 用于拦截未登录的请求
public class LoginInterceptor implements HandlerInterceptor {


    //执行前
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        HttpSession session = httpServletRequest.getSession();

        //不拦截的请求地址 即为登录地址
        String[] notInterception = {"admin/login.do", "admin/gotoLogin.go"};
        //获取uri
        String uri = httpServletRequest.getRequestURI();

        //System.out.println("uri->" + uri);
        //如果是登录地址
        if (uri.contains(notInterception[0])) {
            return true;
        } else if (uri.contains(notInterception[1]) && session.getAttribute("admin") != null) {//重复登录
            httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/admin/goToOrder.go");
            return false;
        } else {
            if (session.getAttribute("admin") != null) {
//                System.out.println(session.getAttribute("admin"));
//                System.out.println("登录成功");
                return true;//登陆成功
            } else {
                // 拦截后进入登录页面
                httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/");
//                System.out.println("登录失败");
                return false;
            }
        }
    }


    //执行中
    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object
            o, ModelAndView modelAndView) throws Exception {

    }

    //执行完毕后
    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse
            httpServletResponse, Object o, Exception e) throws Exception {

    }
}
