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
    <script src="../js/showOrders3.js"></script>
    <link href="../css/font-awesome.css" rel="stylesheet"/>
    <link href="../css/style.css" rel="stylesheet"/>

    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .my_page {
            margin-left: 73%;
        }

        .my_tr {
            font-family: fantasy;
            color: black;
            background-color: #C36464;
        }

        #leaveword {
            width: 60px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }

    </style>
</head>
<body>
<div class="navbar navbar-inverse set-radius-zero" style="max-width: 100%">
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
<section class="menu-section" style="max-width: 100%">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="navbar-collapse collapse ">
                    <ul id="menu-top" class="nav navbar-nav navbar-right">
                        <li><a class="menu-top-active" href="goToOrder.go">订单</a></li>
                        <li><a href="goods.go">商品</a></li>
                        <li><a href="user.go">用户</a></li>
                        <li><a href="images.go">公告管理</a></li>
                        <li><a href="back.go">管理员中心</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>


<%--                内容展示--%>
<div class="container">
    <div class="col-md-12 column">
        <div class="row clearfix">
            <div class="col-md-4">
                <div class="navbar-form navbar-left" role="search" >
                    <div class="form-group">
                        <input type="text" id="search" class="form-control" placeholder="Search">
                    </div>
                    <button class="btn btn-default" onclick="searchOrders1()">搜索</button>
                </div>
            </div>
            <div class="col-md-offset-7 col-md-1">
                <button class="btn-default btn" style="margin: 10px;" onclick="showAddOrder()">新增
                </button>
            </div>
        </div>
        <div class="row clearfix">
            <table class="table">
                <thead>
                <tr class="my_tr">
                    <th>编号</th>
                    <th>姓名</th>
                    <th> 性别</th>
                    <th> 地址</th>
                    <th> 联系方式</th>
                    <th> 买家评论</th>
                    <th> 下单时间</th>
                    <th> 用户名</th>
                    <th>状态</th>
                    <th> 订单总金额</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="show_orders">
                </tbody>
            </table>
        </div>
        <div class="my_page" id="no">
            <ul class="pagination" id="all_page">
                <li id="last_page" onclick="beforeChange(-1)">
                    <a href="#">&laquo;</a>
                </li>
                <li id="page_1" class="active" onclick="beforeChange(1)">
                    <a href="#">1</a>
                </li>
                <li id="page_2" onclick="beforeChange(2)">
                    <a href="#">2</a>
                </li>
                <li id="page_3" onclick="beforeChange(3)">
                    <a href="#" id="middle">3</a>
                </li>
                <li id="page_4" onclick="beforeChange(4)">
                    <a href="#">4</a>
                </li>
                <li id="page_5" onclick="beforeChange(5)">
                    <a href="#">5</a>
                </li>
                <li id="next_page">
                    <a href="#" onclick="beforeChange(-2)">&raquo;</a>
                </li>
            </ul>
        </div>
    </div>
</div>

<%--查看信息的模态框--%>
<div class="modal fade" id="modal-container-show-orders" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">
                    订单信息
                </h4>
            </div>
            <div class="modal-body" id="modal-body">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--删除确认模态框--%>
<div class="modal fade" id="modal-container-sure-delete" role="dialog" aria-labelledby="myModalLabel"
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
                确认删除吗？
            </div>
            <div class="modal-footer" id="modal-button">
            </div>
        </div>
    </div>
</div>
<%--新增用户的模态框--%>
<div class="modal fade" id="modal-container-add-orders" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title">
                    新增订单
                </h4>
            </div>
            <div class="modal-body" id="modal-body-add">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>

