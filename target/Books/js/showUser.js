let lastResult;//存储上一次的数据
let firstTime = true;     //判断是否展现 加载过程动画  只有首次加载显示
let user;                       //全部的用户
//第一页的初始化
$(document).ready(function () {
    init(1, 5, 1);
});

//用与刷新数据
function init(pageNumber, pageSize, num) {
    //默认第一页是选中的
    $("#page_" + num).attr("class", "active");
    //查询并得到第一次的数据
    changePage(pageNumber, pageSize);
}


/***
 * 分页
 * 数字变化  数据变化
 * */
//根据 页数 页面大小 处理数据
function changePage(pageNumber, pageSize) {
    //进度遮罩框
    if (firstTime === true)
        $.bootstrapLoading.start({loadingTips: "正在处理数据，请稍候..."});

    $.ajax({
        type: "post",
        url: "../user/selectUserByPage.do",
        data: {"pageNumber": pageNumber, "pageSize": pageSize},
        success: function (result) {
            //console.log(result.msg);
            controlData(result);
            //将本次数据返回
            lastResult = result;
            // console.log(lastResult);
        }, error: function (result) {
            console.log(result.msg)
        }
    });
}

//处理分页数据
function controlData(result) {

    //处理成对象
    let orderList = eval(result.extend.orders);

    showOrders3(orderList)
    if (firstTime === true) {
        setTimeout($.bootstrapLoading.end(), 1000);
        firstTime = !firstTime;
    }
}

//页数点击
function beforeChange(num) {
    //获得当前数据的特征
    let isLastPage = lastResult.extend.last;
    let isFirstPage = lastResult.extend.first;

    if (num === -1 && isFirstPage)
        alert("已经是第一页了！");
    else if (num === -2 && isLastPage)
        alert("已经是最后一页了！");
    else {                                                                                   //其他页数
        changePageNum(num)
    }
}

//改变 分页的数字
function changePageNum(num) {
    let totalPages = parseInt(lastResult.extend.pages) - 2;//总页数
    //console.log("sadsadsa  " + totalPages);
    let nowPage = parseInt(document.getElementsByClassName("active")[0].children[0].innerText)                       //获得处于选中状态的value 作为当前页的页码
    if (num === -1) {//上一页
        //数字处理
        if ((nowPage <= 3) || (nowPage > totalPages)) {
            //console.log("前两页");
            //console.log("后两页");
            //前两页和后两页 不进行数字变换    只需要将active前移
            let nowId = $(".active").attr("id");
            let previousId = nowId.split("_")[0] + "_" + (parseInt(nowId.split("_")[1]) - 1);
            clearLiClass();
            $("#" + previousId).attr("class", "active");
        } else {
            //console.log("其他页面");
            //其他情况需要数字变换 不用动active  维持在中间位置
            $('#all_page').find('li a').each(function (index) {
                if (index !== 0 && index !== 6)
                    $(this).text(parseInt($(this).text()) - 1)
            });
        }//数据处理
        previousPage((nowPage - 1))
    } else if (num === -2) {
        //console.log("前两页");
        //console.log("后两页");//下一页
        //数字处理
        if ((nowPage < 3) || (nowPage >= totalPages)) {
            //前两页和后两页 不进行数字变换    只需要将active前移
            let nowId = $(".active").attr("id");
            let previousId = nowId.split("_")[0] + "_" + (parseInt(nowId.split("_")[1]) + 1);
            clearLiClass();
            $("#" + previousId).attr("class", "active");
        } else {
            //console.log("其他页面");
            //其他情况需要数字变换 不用动active  维持在中间位置
            $('#all_page').find('li a').each(function (index) {
                if (index !== 0 && index !== 6)
                    $(this).text(parseInt($(this).text()) + 1)
            });
        }//数据处理
        //数据处理
        nextPage((nowPage + 1))
    } else {                                                                                                  //其他页数
        let myPage = parseInt(document.getElementById("page_" + num).children[0].innerText);
        if (myPage < 3) {                                                                   //当是倒数前两页时  不对数字进行改变
            clearLiClass();                                                                         //清除选中状态
            //console.log("点击前两页");
            if (myPage === 2) {
                document.getElementById("page_1").children[0].innerText = 1;
                document.getElementById("page_2").children[0].innerText = 2;
                $("#page_2").attr("class", "active");
                $('#all_page').find('li a').each(function (index) {
                    if (index > 2 && index !== 6)
                        $(this).text(3 + index - 3);
                });
            } else
                $("#page_" + num).attr("class", "active");
        } else if (myPage > totalPages) {                                             //当时最后两页时   不对数字进行改变
            clearLiClass();                                                                         //清除选中状态
            //console.log("点击后两页");
            if (myPage === (totalPages + 1)) {
                document.getElementById("page_5").children[0].innerText = totalPages + 2;
                document.getElementById("page_4").children[0].innerText = totalPages + 1;
                $("#page_4").attr("class", "active")
                $('#all_page').find('li a').each(function (index) {
                    if (index < 4 && index !== 0)
                        $(this).text(totalPages - 3 + index);
                });
            } else
                $("#page_" + num).attr("class", "active")
        } else {
            clearLiClass();                                                                         //清除选中状态
            //console.log("点击其他页面:");
            //其他页面对于数字的处理
            $("#middle").text(myPage);   //中间位置为点击页面
            $('#all_page').find('li a').each(function (index) {
                if (index !== 0 && index !== 6)
                    $(this).text(myPage + index - 3);
            });
            $("#page_3").attr("class", "active")
        }
        otherPage(myPage);
    }
}

//上一页
function previousPage(newPage) {
    changePage(newPage, 5);
}

//下一页
function nextPage(newPage) {
    changePage(newPage, 5);
}

//其他页面的数据处理
function otherPage(newPage) {
    changePage(newPage, 5);
}


//清除选中状态
function clearLiClass() {
    $("#all_page").find("li").attr("class", "")
}

//展示数据
function showOrders3(orderList) {
    $("#show_users").empty();
    for (let index in orderList) {
        let id = orderList[index].id;
        let pwd = orderList[index].pwd;
        let name = orderList[index].name;
        let email = orderList[index].email;
        let tel = orderList[index].tel;
        let qq = orderList[index].qq;
        let regtime = toUTCtime(orderList[index].regtime);
        let dizhi = orderList[index].dizhi;
        let truename = orderList[index].truename;
        let imgurl = orderList[index].imgurl;
        let logincishu = orderList[index].logincishu;
        $("#show_users").append(`
              <tr>
                    <td>` + id + `</td>
                    <td>` + name + `</td>
                    <td>` + pwd + `</td>
                    <td>` + email + `</td>
                    <td>` + tel + `</td>
                    <td>` + qq + `</td>
                    <td>` + dizhi + `</td>
                    <td>` + regtime + `</td>
                    <td>` + logincishu + `</td>
                    <td>` + truename + `</td>
                    <td><img width="25px" src="../` + imgurl + `" alt="头像"></td>
                    <td>
                        <button onclick="showUser(` + id + `)" class="btn btn-default">查看</button>
                         <button onclick="deleteUser(` + id + `)" class="btn btn-default">删除</button>
                    </td>
               </tr>
        `)
    }

}


/**
 * 修改
 * 数据展现 保存
 * */
//展现一个订单的详细信息   参数是id
function showUser(id) {
    let orderList = eval(lastResult.extend.orders);
    for (let index in orderList) {
        let myid = orderList[index].id;
        let pwd = orderList[index].pwd;
        let name = orderList[index].name;
        let email = orderList[index].email;
        let tel = orderList[index].tel;
        let qq = orderList[index].qq;
        let regtime = toUTCtime(orderList[index].regtime);
        let dizhi = orderList[index].dizhi;
        let truename = orderList[index].truename;
        let imgurl = orderList[index].imgurl;
        let logincishu = orderList[index].logincishu;
        if (id === orderList[index].id) {
            $("#modal-body").empty();
            $('#modal-body').append(
                `
                        <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">编号</label>
                                        <div class="form-control">
                                               ` + myid + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">姓名</label>
                                        <div class="form-control">
                                            ` + name + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">密码</label>
                                        <div class="form-control">
                                               ` + pwd + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">邮箱</label>
                                        <div class="form-control">
                                            ` + email + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">电话</label>
                                        <div class="form-control">
                                            ` + tel + ` 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">QQ</label>
                                        <div class="form-control">
                                            ` + qq + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">地址</label>
                                        <div class="form-control">
                                             ` + dizhi + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">注册时间</label>
                                        <div class="form-control">
                                          ` + regtime + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">登录次数</label>
                                        <div class="form-control">
                                           ` + logincishu + `
                                        </div>
                                    </div>
                                     <div class="form-group">
                                        <label for="exampleInputPassword1">真实姓名</label>
                                        <div class="form-control">
                                           ` + truename + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="total-money">头像</label>
                                        <div>
                                            <img width="50px" src="../` + imgurl + `" alt="">
                                        </div>
                                    </div>
                                    
                                </form>
                                <button type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="changeChange(` + id + `)">
                                    修改</button>
                            </div>
                        </div>
                    `
            );
            $('#modal-container-show-users').modal("show");
            $("#no").show();
            return 0;
        }
    }
}

//变为可修改状态
function changeChange(id) {
    let orderList = eval(lastResult.extend.orders);
    for (let index in orderList) {
        let myid = orderList[index].id;
        let pwd = orderList[index].pwd;
        let name = orderList[index].name;
        let email = orderList[index].email;
        let tel = orderList[index].tel;
        let qq = orderList[index].qq;

        let time = toUTCtime(orderList[index].regtime);


        let dizhi = orderList[index].dizhi;
        let truename = orderList[index].truename;
        let imgurl = orderList[index].imgurl;
        let logincishu = orderList[index].logincishu;


        let trueTime = time.split(" ")[0] + "T" + time.split(" ")[1].split(":")[0] + ":" + time.split(" ")[1].split(":")[1];
        // console.log(trueTime);

        if (id === orderList[index].id) {
            $("#modal-body").empty();
            $('#modal-body').append(
                `    <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="name">姓名</label>
                                        <input class="form-control" id="name" value="` + name + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">密码</label>
                                            <input class="form-control" id="pwd" value="` + pwd + `"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="email">邮箱</label>
                                         <input class="form-control" id="email" value="` + email + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="tel">电话</label>
                                        <input class="form-control" type="text" id="tel" value="` + tel + `"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="qq">QQ</label>
                                        <input class="form-control" id="qq" value="` + qq + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="dizhi">地址</label>
                                            <input class="form-control"  id="dizhi" value="` + dizhi + `"/>
                                    </div>
                                    <div class="form-group">
                                       <label for="order-time">注册时间</label>
                                        <input id="order-time" class="form-control" type="datetime-local" value="` + trueTime + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="logincishu">登录次数</label>
                                        <input class="form-control" type="number" min="0" id="logincishu" value="` + logincishu + `">
                                    </div>
                                     <div class="form-group">
                                        <label for="truename">真实姓名</label>
                                        <input class="form-control" id="truename" value="` + truename + `">
                                    </div>
                                      <div class="form-group">
                                        <label for="img-url">头像</label>
                                        <input class="form-control" id="img-url"   value="` + imgurl + `" />
                                    </div>
                                </form>
                                 <button  type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="saveChange(` + id + `)">
                                    确认 </button>
                            </div>  
                      </div>`
            );

        }
    }
}

//保存修改
function saveChange(id) {
    let name = $("#name").val();
    let pwd = $("#pwd").val();
    let email = $("#email").val();
    let tel = $("#tel").val();
    let qq = $("#qq").val();
    let dizhi = $("#dizhi").val();
    let registerTime = $("#order-time").val();
    let logincishu = $("#logincishu").val();
    let truename = $("#truename").val();
    let imgUrl = $("#img-url").val()

    if (pwd === "" || name === "" || dizhi === "" || !isPoneAvailable(tel) || registerTime === "" || truename === "") {
        //console.log(id + " " + number + " " + tel + " " + name + " " + sex + " " + address + " " + leaveWord + " " + time + " " + username + " " + status + " " + money);
        toastr.error("输入完整正确的信息！")
    } else {
        $.ajax({
            type: "post",
            url: "../user/updateUser.do",
            data: {
                id: id,
                name: name,
                pwd: pwd,
                email: email,
                tel: tel,
                qq: qq,
                ip: "127.0.0.1",
                tishi: "",
                huida: "",
                dizhi: dizhi,
                regtime: (new Date(registerTime)).getTime(),
                logincishu: logincishu,
                truename: truename,
                imgurl: imgUrl
            },
            success: function (result) {
                $('#modal-container-show-users').modal("hide");
                toastr.success("修改信息成功！")
                //console.log(result);
                //刷新当前数据
                flushData();
            },
            error: function (XMLHttpResponse, textStatus, errorThrown) {
                console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
                console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
                console.log("3 异步调用返回失败,textStatus:" + textStatus);
                console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
            }
        });
    }
}


/***
 *删除
 * 数据操作和数据刷新
 */
//删除
function deleteUser(id) {
    //展现确认删除框
    $("#modal-container-sure-delete").modal("show");
    $("#modal-button").empty();
    $("#modal-button").append(` <button type="button" class="btn btn-default" data-dismiss="modal">取消</button> <button type="button" class="btn btn-primary" onclick="delO(` + id + `)">确定</button>`)
}

//提交删除操作
function delO(id) {
    $.ajax({
        type: "post",
        url: "../user/deleteUser.do",
        data: {id: id},
        success: function (result) {
            $('#modal-container-sure-delete').modal("hide");
            toastr.success("删除成功");
            // console.log(result.code);
            //刷新数据
            flushData();
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    })
}


/**
 * 查找函数  对于编号和姓名的模糊查找
 * */
function searchUser() {
    let data = $("#search").val();
    if (data === "")
        toastr.warning("请输入查询信息！");
    else {
        $.ajax({
            type: "post",
            url: "../user/searchUsers.do",
            data: {
                data: data
            },
            success: function (data) {
                //console.log(data);
                if (data.msg === 200)
                    console.log("error");
                else if (data.extend.result === 0) {
                    toastr.success("无结果");
                } else {
                    let orders = data.extend.list;
                    //console.log(orders);
                    showSearchOrders(orders);
                }
            },
            error: function (XMLHttpResponse, textStatus, errorThrown) {
                console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
                console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
                console.log("3 异步调用返回失败,textStatus:" + textStatus);
                console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
            }

        })
    }
}

function showSearchOrders(orderList) {
    $("#show_users").empty();
    for (let index in orderList) {
        let id = orderList[index].id;
        let pwd = orderList[index].pwd;
        let name = orderList[index].name;
        let email = orderList[index].email;
        let tel = orderList[index].tel;
        let qq = orderList[index].qq;
        let regtime = toUTCtime(orderList[index].regtime);
        let dizhi = orderList[index].dizhi;
        let truename = orderList[index].truename;
        let imgurl = orderList[index].imgurl;
        let logincishu = orderList[index].logincishu;
        $("#show_users").append(`
              <tr>
                    <td>` + id + `</td>
                    <td>` + name + `</td>
                    <td>` + pwd + `</td>
                    <td>` + email + `</td>
                    <td>` + tel + `</td>
                    <td>` + qq + `</td>
                    <td>` + dizhi + `</td>
                    <td>` + regtime + `</td>
                    <td>` + logincishu + `</td>
                    <td>` + truename + `</td>
                    <td><img width="25px" src="../` + imgurl + `" alt="头像"></td>
                    <td>
                        <button onclick="showUser(` + id + `)" class="btn btn-default">查看</button>
                         <button onclick="deleteUser(` + id + `)" class="btn btn-default">删除</button>
                    </td>
               </tr>
        `)
    }
    $("#no").hide();
}

/**
 * 新增
 * 对于下单用户等固定信息的查找
 * 提交订单的信息
 * */
//弹出模态框
function showAddUser() {
    $("#modal-user-add").empty();
    $("#modal-user-add").append(
        `
        <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="name">姓名</label>
                                        <input class="form-control" id="name" >
                                    </div>
                                    <div class="form-group">
                                        <label for="pwd">密码</label>
                                            <input class="form-control" id="pwd" > 
                                    </div>
                                    <div class="form-group">
                                        <label for="email">邮箱</label>
                                         <input class="form-control" id="email" >
                                    </div>
                                    <div class="form-group">
                                        <label for="tel">电话</label>
                                        <input class="form-control" type="text" id="tel" > 
                                    </div>
                                    <div class="form-group">
                                        <label for="qq">QQ</label>
                                        <input class="form-control" id="qq" >
                                    </div>
                                    <div class="form-group">
                                        <label for="dizhi">地址</label>
                                            <input class="form-control"  id="dizhi" />
                                    </div>
                                     <div class="form-group">
                                        <label for="truename">真实姓名</label>
                                        <input class="form-control" id="truename" >
                                    </div>
                                      <div class="form-group">
                                        <label for="img-url">头像</label>
                                        <img src="../images/64-64.jpg" width="50px" alt="头像" id="image-header" style="margin-bottom: 10px;">
                                        <select class="form-control" id="img-url"  onchange="changeImgUrl()">
                                            <option  value="../images/64-64.jpg">头像一</option>
                                            <option  value="../images/user.png">头像二</option>
                                        </select>
                                    </div>
                                </form>
                                 <button  type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="saveUser()">
                                    确认 </button>
                            </div>  
                      </div>
        `
    )
    $("#modal-container-add-users").modal("show");
}

//改变头像的预览图
function changeImgUrl() {
    $("#image-header").attr("src", $("#img-url").val());
}

//提交添加的数据
function saveUser() {
    let name = $("#name").val();
    let pwd = $("#pwd").val();
    let email = $("#email").val();
    let tel = $("#tel").val();
    let qq = $("#qq").val();
    let dizhi = $("#dizhi").val();
    let registerTime = new Date().getTime();
    let logincishu = 0;
    let truename = $("#truename").val();
    let imgUrl = $("#img-url").val().split("/")[1] + "/" + $("#img-url").val().split("/")[2]

    if (pwd === "" || name === "" || dizhi === "" || !isPoneAvailable(tel) || registerTime === null || truename === "" || !isEmail(email)) {
        //console.log(id + " " + number + " " + tel + " " + name + " " + sex + " " + address + " " + leaveWord + " " + time + " " + username + " " + status + " " + money);
        toastr.error("输入完整正确的信息！")
    } else {
        $.ajax({
            type: "post",
            url: "../user/addUser.do",
            data: {
                name: name,
                pwd: pwd,
                email: email,
                tel: tel,
                qq: qq,
                ip: "127.0.0.1",
                tishi: "",
                huida: "",
                dizhi: dizhi,
                regtime: registerTime,
                logincishu: logincishu,
                truename: truename,
                imgurl: imgUrl
            },
            success: function (result) {
                $('#modal-container-add-users').modal("hide");
                toastr.success("修改信息成功！")
                //console.log(result);
                //刷新当前数据
                flushData();
            },
            error: function (XMLHttpResponse, textStatus, errorThrown) {
                console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
                console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
                console.log("3 异步调用返回失败,textStatus:" + textStatus);
                console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
            }
        });
    }
}


/**
 * 工具函数
 * isPoneAvailable  判断是否是手机号
 * isFloat 是float型 int型
 * toastr.options  对于toastr的设置
 * toUTCtime 时间戳转化为日期格式
 * */
//判断是否是手机号
function isPoneAvailable(poneInput) {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(poneInput)) {
        return false;
    } else {
        return true;
    }
}

//判断是否是邮箱
function isEmail(str) {
    var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (re.test(str) != true) {
        return false;
    } else {
        return true;
    }
}

//是否是float型
function isFloat(n) {
    if (!(/^-?\d*\.\d+$/.test(n))) {
        if ((/^[0-9]+.?[0-9]*$/.test(n)))
            return true
        else return false
    } else
        return true
}

//对于toastr的设置
toastr.options = {
    //是否显示关闭按钮
    closeButton: false,
    // 是否为调试
    debug: false,
    //是否显示进度条（设置关闭的超时时间进度条）
    progressBar: true,
    //消息框在页面显示的位置
    /**
     toast-top-left  顶端左边
     toast-top-right    顶端右边
     toast-top-center  顶端中间
     toast-top-full-width 顶端，宽度铺满整个屏幕
     toast-botton-right
     toast-bottom-left
     toast-bottom-center
     toast-bottom-full-width
     * */
    positionClass: "toast-bottom-center",
    // 点击消息框自定义事件
    onclick: null,
    //显示动作时间
    showDuration: "300",
    //隐藏动作时间
    hideDuration: "1000",
    //自动关闭超时时间
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    //显示的方式，和jquery相同
    showMethod: "fadeIn",
    // 隐藏的方式，和jquery相同
    hideMethod: "fadeOut"
};

//时间戳转化为日期格式
function toUTCtime(dateStr) {
    const dateFormatString = "yyyy-MM-dd hh:mm:ss";
    Date.prototype.format = function (format) {
        let date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };
    return new Date(dateStr).format(dateFormatString);
}

//刷新当前页码的数据
function flushData() {
    let num;
    let nowPage = parseInt(document.getElementsByClassName("active")[0].children[0].innerText)
    $('#all_page').find('li').each(function (index) {
        if ($(this).attr("class") === "active")
            num = index;
    });
    init(nowPage, 5, num);
}