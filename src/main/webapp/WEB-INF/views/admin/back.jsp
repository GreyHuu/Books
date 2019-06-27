<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/5/14
  Time: 21:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
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
    <script src="../js/PerfectLoad.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet"/>
    <link href="../css/style.css" rel="stylesheet"/>
    <title>管理员</title>
    <style>
        .first {
            width: 600px;
            height: 400px;
            position: relative;
            right: 0px;
            left: 0px;
            margin: auto;
            margin-top: 30px;
            background-color: #C36464;
            border: solid 2px black;
            border-radius: 2%;
            box-shadow: 10px 10px 10px 0 black;
        }

        .second {
            width: 95%;
            height: 312px;
            position: absolute;
            background-color: rgb(61, 52, 52);
            right: 0px;
            left: 0px;
            margin: auto;
            border-radius: 3%;
        }

        .buttontype {
            background: transparent;
            width: 50%;
            height: 10%;
            position: absolute;
            bottom: 2px;
            right: 0px;
            left: 0px;
            margin: auto;
            color: seashell;
            font-family: initial;
            font-size: 20px;
        }
    </style>
</head>
<body>
<div class="navbar navbar-inverse set-radius-zero">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="goToOrder.go">
                <h1 style="font-family:fantasy; font-weight:bolder; color:black;">二手图书 admin</h1>
            </a>
        </div>
        <div class="left-div">
            <div class="user-settings-wrapper">
                <ul class="nav">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
                            <span class="glyphicon glyphicon-user" style="font-size: 25px;"></span>
                        </a>
                        <div class="dropdown-menu dropdown-settings">
                            <div class="media">
                                <a class="media-left" href="#">
                                    <img src="../images/64-64.jpg" alt="" class="img-rounded"/>
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading">管理员中心</h4>
                                    <h5>欢迎来到校园二手图书交易平台</h5>
                                </div>
                            </div>
                            <hr/>
                            <h5><strong>为人民服务 </strong></h5>
                            一丝不苟，认真做事
                            <hr/>
                            <a href="back.go" class="btn btn-danger btn-sm">管理员中心</a>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<section class="menu-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="navbar-collapse collapse ">
                    <ul id="menu-top" class="nav navbar-nav navbar-right">
                        <li><a href="goToOrder.go">订单</a></li>
                        <li><a href="goods.go">商品</a></li>
                        <li><a href="user.go">用户</a></li>

                        <li><a href="images.go">公告管理</a></li>
                        <li><a class="menu-top-active" href="back.go">管理员中心</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</section>
<div class="first">
    <h3 style="font-family: inherit ; color:white; margin-top: 4px; margin-left: 10px;"><b>管理员你好</b></h3>
    <div class="second">
        <h4 style="color:white; margin-top: 60px;margin-left: 50px; ">您已登录校园二手图书交易平台<br>
            本次登录时长为
            <div class="timer-display" style="margin: 10px 20px;">
                00:00:00
            </div>
            本次操作为第 <span id="time">1</span> 次操作
            <br><br>
            当前页面为注销页面，您确定退出吗？
        </h4>
    </div>
    <button class="buttontype" onclick="quitAdmin()">退 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 出</button>
</div>
<%--退出确认--%>
<div class="modal fade" id="modal-container-sure-quit" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">
                    提示
                </h4>
            </div>
            <div class="modal-body">
                确认退出吗？
            </div>
            <div class="modal-footer" id="modal-button">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" onclick="quitAdminIs()">确定</button>
            </div>
        </div>
    </div>
</div>
</body>
<script>
    let lastSecond;
    let second;
    let times;
    window.onload = function () {
        $.ajax({
            type: "post",
            url: "../other/getTime.do",
            date: {},
            success: function (result) {
                second = result.extend.second;
                lastSecond = result.extend.lastSecond;
                times = parseInt(result.extend.times) + 1;
                console.log("second: " + second + "lastSecond:" + lastSecond + "times:" + times);
                document.getElementById("time").innerText = (parseInt(times));
                runTimer(second * 10);
            },
            error: function () {

            }
        });

    };
    const timerDisplay = document.querySelector(".timer-display");
    const maxTime = 35999 * 60;
    let runningTimer;

    function displayTime(decSeconds) {
        const hours = Math.floor(decSeconds / 36000);
        let restDecSecs = decSeconds - hours * 36000;
        const minutes = Math.floor(restDecSecs / 600);
        restDecSecs = decSeconds % 600;
        const seconds = Math.floor(restDecSecs / 10);
        const diaplayHours = (hours < 10 ? "0" : "") + hours;
        const displayMins = (minutes < 10 ? "0" : "") + minutes;
        const displaySecs = (seconds < 10 ? "0" : "") + seconds;
        timerDisplay.textContent = diaplayHours + ":" + displayMins + ":" + displaySecs
    }

    function runTimer(time) {
        clearInterval(runningTimer);
        let timer = time;
        runningTimer = setInterval(() => {
            const runTimer = timer++;
            if (runTimer > maxTime) {
                clearInterval(runningTimer);
                return;
            }
            displayTime(timer);
        }, 100);
    }

    function quitAdmin() {
        $("#modal-container-sure-quit").modal("show");
    }

    function quitAdminIs() {
        $.ajax({
            type: "post",
            url: "../other/updateTime.do",
            data: {
                times: times,
                totalSecond: (parseInt(second) + parseInt(lastSecond))
            },
            success: function () {
                window.location.href = "../"
            },
            error: function () {

            }
        })
    }
</script>
</html>
