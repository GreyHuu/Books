<%--
  Created by IntelliJ IDEA.
  User: TFH
  Date: 2019/6/22
  Time: 19:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>图片上传</title>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js"></script>
    <!--引入 bootstrap.min.css-->
    <link href="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="https://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    <script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
    <script src="../js/PerfectLoad.js"></script>
</head>
<body>
<div class="col-md-offset-2 col-md-5">
    <label for="img_up">选择图片:</label>
    <img id="previewImg" src="../images/upBack.png" width="80" height="80"/>
    <input id="img_up" type="file" class="form-control">
    <input type="button" class="btn btn-default" value="提交" onclick="uploadImg1()">
</div>
</body>
<script>
    function uploadImg1() {
        let file = $("#img_up").prop('files')[0];
        let reader = new FileReader();
        //创建文件读取相关的变量  
        let imgFile;
        reader.onload = function (e) {
            imgFile = e.target.result;
            console.log(imgFile);
            $("#previewImg").attr('src', imgFile);
            $.ajax({
                type: "post",
                url: "../uploadImg.do",
                data: {base64Data: imgFile},
                success: function (result) {
                    console.log(result.extend.imgUrl);
                },
                error: function (XMLHttpResponse, textStatus, errorThrown) {
                    console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
                    console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
                    console.log("3 异步调用返回失败,textStatus:" + textStatus);
                    console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
                }
            });
        };
        //正式读取文件  
        reader.readAsDataURL(file);
    }

    function getImgFile() {
        return imgFile;
    }
</script>
</html>
