<%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/4/6
  Time: 19:33
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <!--引入jquery-->
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <!--引入 bootstrap.min.css-->
    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <script src="js/PerfectLoad.js"></script>
    <link href="css/font-awesome.css" rel="stylesheet"/>
    <link href="css/style.css" rel="stylesheet"/>
    <link rel="stylesheet" href="css/loginStyle.css">
</head>
<body>
<div class="container">
    <div class="alertDiv"></div>
    <form class="form-signin">
        <h2 class="form-signin-heading">登录</h2>
        <label for="inputPhone" class="sr-only">Email address</label>
        <input name="userPhone" id="inputPhone" type="text" maxlength="11"
               placeholder="手机号码" autofocus class="form-control"
        <%--这是一个属性 代表当input输入时  会执行oninput中的js语句--%>
               oninput="value=value.replace(/[^\d]/g,'')"/>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" name="userPas" placeholder="密码"
        />
        <button class="btn btn-lg btn-primary btn-block" type="button" onclick="login()" style="background:  #C36464;">
            登 录
        </button>
        <div class="register"></div>
    </form>
</div>
</body>
<script>
    function login() {
        var userPhone = $("input[name=userPhone]");
        var password = $("input[name=userPas]");
        //为空
        if (userPhone.val() == null && password.val() == null) {
            toastr.error("请输入完整的信息！");
            userPhone.val("");
            password.val("");
        } else if (!checkMobile(userPhone.val())) {
            toastr.error("请输入正确的手机号！");
            userPhone.val("");
            password.val("");
        } else {
            $.ajax({
                type: "post",
                url: "admin/login.do",
                data: {
                    userPhone: userPhone.val(),
                    password: password.val()
                },
                success: function (data) {
                    let message = data.extend.result;
                    console.log(message);
                    switch (message) {
                        case "0"://成功登录
                            toastr.success("登录成功");
                            window.location.href = "admin/goToOrder.go"
                            break;
                        case "1"://密码错误
                            toastr.error("密码错误");
                            password.val("")
                            break;
                        case "2"://用户不存在
                            toastr.error("用户不存在");
                            userPhone.val("")
                            password.val("")
                            break;
                    }
                },
                error: function (data) {
                    alert(data.extend.result);
                }
            });
        }
    }

    //正则判断是否是手机号
    function checkMobile(str) {
        var re = /^1\d{10}$/
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    }
</script>
</html>
