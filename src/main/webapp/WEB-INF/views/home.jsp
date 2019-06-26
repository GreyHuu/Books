<%@ page import="com.books.entity.TbUser" %><%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/3/28
  Time: 22:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String name = null;
    String url=null;
    TbUser user = (TbUser) session.getAttribute("user");
    if (user != null) {
        name = user.getName();
        url=user.getImgurl();
    }else{
//        没有用户登录  重新定向到首页
        name=null;
        response.sendRedirect("/books/");
    }
%>
<html>
<head>
    <title>二手书交易平台</title>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="userMessage">
    <div><%= name %>
    </div>
    <img src="<%=url%>" alt="头像">
</div>
<div class="cancel">
    <a href="cancellation">注销</a></div>
</body>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script>

</script>
</html>
