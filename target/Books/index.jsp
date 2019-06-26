<%@ page import="com.books.entity.TbUser" %><%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/3/28
  Time: 22:02
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    TbUser user = (TbUser) session.getAttribute("user");
    if (user != null) {
        //用户已经登录  重新定向到用户首页
        response.sendRedirect("/books/index");
    }
%>
<html>
<head>
    <title>二手书交易平台</title>
</head>
<body>
<input type="button" value="登录" onclick="login()">
<input type="button" value="注册" onclick="register()">
<input type="button" value="商品" onclick="allOrders()">
<input type="button" value="图片上传" onclick="uploadImg()">
</body>
<script>
    function login() {
        window.location.href="admin/gotoLogin.go";
    }
    function register(){
        window.location.href="admin/gotoRegister.go";
    }
    function allOrders() {
        window.location.href="admin/goToOrder.go"
    }
    function uploadImg() {
        window.location.href="admin/goToImgUp.go"
    }
</script>
</html>
