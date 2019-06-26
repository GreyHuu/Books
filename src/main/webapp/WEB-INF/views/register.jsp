<%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/4/6
  Time: 19:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="css/registerStyle.css">
    <title>注册</title>
</head>

<body>
<div class="container">
    <form class="form-register">
        <h2 class="form-register-heading">注册</h2>
        <!-- id -->
        <label for="name" class="form-label">昵称</label>
        <input id="name" class="form-control" type="text" placeholder="多于两个字符">

        <label for="tel">手机号码</label>
        <input id="tel" class="form-control" type="text" placeholder="11位手机号码">

        <label for="pas">密码</label>
        <input id="pas" class="form-control" maxlength="11"
               oninput="value=value.replace(/[^\d]/g,'')"
               type="password" placeholder="多于六位字符">

        <label for="pas1">重复密码</label>
        <input id="pas1" class="form-control" type="password">

        <label for="email">邮箱</label>
        <input id="email" class="form-control" type="email">

        <label for="qq">QQ号码</label>
        <input id="qq" class="form-control" type="text" placeholder="QQ">

        <!-- 忘记密码提示 -->
        <!-- 忘记密码答案 -->

        <label for="address">地址</label>
        <input id="address" class="form-control" type="text" placeholder="地址">

        <!-- 注册日期 -->
        <!-- 登录次数 -->
        <!-- 真实姓名 -->

        <label for="real_name">真实姓名</label>
        <input id="real_name" class="form-control" type="text">
        <input type="text" id="img"  value="images/user.png" hidden>
        <input id="res_btn" class="btn btn-lg btn-primary btn-block" type="button" onclick="register()" value="注 册">
    </form>
</div>
</body>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script>
    function register() {
        var nickName = $("#name");
        var password = $("#pas");
        var password1 = $("#pas1");
        var phone = $("#tel");
        var email = $("#email");
        var qqNumber = $("#qq");
        var address = $("#address");
        var realName = $("#real_name");
        var imgUrl=$("#img");
        //判断是否为空
        if (nickName.val() != '' && password.val() != '' && password1 != '' && phone != '' && email != ''
            && qqNumber != '' && address != '' && realName != ''&&imgUrl != "") {
            if (checkMobile(phone.val())) {
                if (password1.val() == password.val()) {
                    if (checkEmail(email.val())) {
                        regi(nickName.val(), password.val(), phone.val(), email.val(), qqNumber.val(), address.val(), realName.val(),imgUrl.val())
                    } else {
                        alert("请输入正确的邮箱地址！")
                    }
                } else {
                    alert("两次密码不一致！")
                }
            } else {
                alert("输入正确的手机号！")
            }
        } else {
            alert("请输入完整的信息！");
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

    //对电子邮件的验证
    function checkEmail(str) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!myreg.test(str)) {
            // alert('提示:请输入有效的E_mail！');
            return false;
        } else
            return true;
    }

    function regi(nickName, password, phone, email, qqNumber, address, realName,imgUrl) {
        var user ={
            name: nickName,
            pwd: password,
            email: email,
            tel: phone,
            qq: qqNumber,
            ip: "127.0.0.1",
            tishi: "提示",
            huida: "回答",
            dizhi: address,
            regtime: new Date(),
            logincishu: 0,
            truename: realName,
            imgurl: imgUrl
        };
        $.ajax({
                type: "post",
                url: "register",
                data: JSON.stringify(user),
                dataType: "json",
                contentType : 'application/json;charset=UTF-8',
                success: function (data) {
                    alert(data.result+"即将跳转到首页");
                    window.location.href="index";
                },
                error: function (data) {
                    alert("error")
                }
            }
        )
    }
</script>
</html>
