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
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>

    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <link rel="stylesheet" href="../css/gonggao.css">
    <link href="../css/font-awesome.css" rel="stylesheet"/>
    <link href="../css/style.css" rel="stylesheet"/>
    <style>
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

                        <li><a class="menu-top-active" href="images.go">公告管理</a></li>
                        <li><a href="back.go">管理员中心</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</section>
<div class="container">
    <button class="btn btn-default  col-md-offset-10" style="margin-top: 10px;" onclick="showAddNotice()">新增</button>
    <div class="content" id="notice-content">
    </div>
</div>
<%--查看信息的模态框--%>
<div class="modal fade" id="modal-container-show-notices" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 class="modal-title" id="myModalLabel">
                    公告详情
                </h4>
            </div>
            <div class="modal-body" id="modal-body-notice">

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
                    新增公告
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
<script>
    let list;
    window.onload = function () {
        init();
    };

    function init() {
        $.ajax({
            type: "post",
            url: "../notice/selectAllNotices.do",
            data: {},
            success: function (result) {
                list = eval(result.extend.list);
                showNotice(list);
            },
            error: function () {

            }
        });
    }

    function showNotice(list) {
        $("#notice-content").empty();
        for (let index in list) {
            $("#notice-content").append(`
            <a class="card" href="#!">
                <div class="front">
                    <p>` + list[index].title + `</p>
                </div>
                <div class="back">
                    <div>
                        <p>` + list[index].title + `</p>
                        <p>` + list[index].content + `</p>
                        <button class="button" onclick="showNoticeDetail(` + list[index].id + `)">详情</button>
                    </div>
                </div>
            </a>
        `)
        }
    };

    //弹出公告详情的模态
    function showNoticeDetail(id) {
        let title;
        let content;
        for (let index in list) {
            if (id === list[index].id) {
                title = list[index].title;
                content = list[index].content;
                break;
            }
        }
        $("#modal-body-notice").empty();
        $("#modal-body-notice").append(`
                <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">标题</label>
                                        <div class="form-control">
                                               ` + title + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">内容</label>
                                        <div class="form-control">
                                            ` + content + `
                                        </div>
                                    </div>
                                <button type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="changeChange(` + id + `)">
                                    修改</button>
                                 <button type="button" id="change" class="btn btn-danger btn-primary btn-block" onclick="deleteNotice(` + id + `)">
                                    删除</button>
                            </div>

                        </div>


        `)
        $("#modal-container-show-notices").modal("show");
    }

    function changeChange(id) {
        let title;
        let content;
        for (let index in list) {
            if (id === list[index].id) {
                title = list[index].title;
                content = list[index].content;
                break;
            }
        }
        $("#modal-body-notice").empty();
        $("#modal-body-notice").append(`
                <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="title">标题</label>
                                        <input id="title" class="form-control" value="` + title + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="content">内容</label>
                                           <input id="content" class="form-control" value="` + content + `">
                                    </div>
                                <button type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="saveChange(` + id + `)">
                                    保存</button>
                            </div>

                        </div>
        `)
    }

    function saveChange(id) {
        let title = $("#title").val();
        let content = $("#content").val();
        if (title === "" || content === "") {
            toastr.error("请填写完整的信息！");
        } else {
            $.ajax({
                type: "post",
                url: "../notice/updateNotice.do",
                data: {
                    id: id,
                    title: title,
                    content: content
                },
                success: function () {
                    $("#modal-container-show-notices").modal("hide");
                    toastr.success("修改成功！");
                    init();
                },
                error: function () {

                }
            })
        }
    }


    function deleteNotice(id) {
        $("#modal-container-show-notices").modal("hide");
        $("#modal-container-sure-delete").modal("show");
        $("#modal-button").empty();
        $("#modal-button").append(` <button type="button" class="btn btn-default" data-dismiss="modal">取消</button> <button type="button" class="btn btn-primary" onclick="deleteNoticeSure(` + id + `)">确定</button>`)
    }

    //提交删除操作
    function deleteNoticeSure(id) {
        $.ajax({
            type: "post",
            url: "../notice/deleteNotice.do",
            data: {id: id},
            success: function (result) {
                $('#modal-container-sure-delete').modal("hide");
                toastr.success("删除成功");
                init();
            },
            error: function (XMLHttpResponse, textStatus, errorThrown) {
                console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
                console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
                console.log("3 异步调用返回失败,textStatus:" + textStatus);
                console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
            }
        })
    }

    function showAddNotice() {
        $("#modal-body-add").empty();
        $("#modal-body-add").append(
            `
         <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="title">标题</label>
                                        <input id="title" class="form-control" >
                                    </div>
                                    <div class="form-group">
                                        <label for="content">内容</label>
                                           <input id="content" class="form-control" >
                                    </div>
                                <button type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="addOrder()">
                                    提交</button>
                            </div>

                        </div>
        `
        );
        $("#modal-container-add-orders").modal("show");
    }

    //提交添加的数据
    function addOrder() {
        $("#modal-body-notice").empty();
        let title = $("#title").val();
        let content = $("#content").val();
        if (title === "" || content === "") {
            toastr.error("请填写完整的信息！");
        } else {
            $.ajax({
                type: "post",
                url: "../notice/addNotice.do",
                data: {
                    title: title,
                    content: content
                },
                success: function () {
                    $("#modal-container-add-orders").modal("hide");
                    toastr.success("添加成功！");
                    init();
                },
                error: function () {

                }
            })
        }
    }
</script>
</html>
