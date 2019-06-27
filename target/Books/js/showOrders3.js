let lastResult;//存储上一次的数据
let firstTime = true;     //判断是否展现 加载过程动画  只有首次加载显示
let user;                       //全部的用户
//第一页的初始化
$(document).ready(function () {
    init(1, 5, 1);
    getAllUser();                                                        //获得全部的用户
});

//用与刷新数据
function init(pageNumber, pageSize, num) {
    for (let item = 1; item <= 5; item++)
        $("#page_" + item).show();
    //默认第一页是选中的
    $("#page_" + num).attr("class", "active");
    //查询并得到第一次的数据
    changePage(pageNumber, pageSize, num);
}


/***
 * 分页
 * 数字变化  数据变化
 * */
//根据 页数 页面大小 处理数据
function changePage(pageNumber, pageSize, num) {
    //进度遮罩框
    if (firstTime === true)
        $.bootstrapLoading.start({loadingTips: "正在处理数据，请稍候..."});

    $.ajax({
        type: "post",
        url: "getOrdersPage.do",
        data: {"pageNumber": pageNumber, "pageSize": pageSize},
        success: function (result) {
            //console.log(result.msg);
            controlData(result, num);
            //将本次数据返回
            lastResult = result;
            // console.log(lastResult);
        }, error: function (result) {
            console.log(result.msg)
        }
    });
}

//处理分页数据
function controlData(result, num) {

    //处理成对象
    let orderList = eval(result.extend.orders);


    showOrders3(orderList)
    if (firstTime === true) {
        setTimeout($.bootstrapLoading.end(), 1000);
        firstTime = !firstTime;
    }

    let totalPages = parseInt(result.extend.pages);

    if (totalPages < 5) {
        for (let item = 5; item > totalPages; item--) {
            $("#page_" + item).hide();
        }
        if (totalPages < parseInt(num)) {
            init(totalPages, 5, totalPages);
        }
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
    console.log("sadsadsa  " + totalPages);
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
    $("#show_orders").empty();
    for (let index in orderList) {
        let id = orderList[index].id;
        let number = orderList[index].bianhao;
        let name = orderList[index].name;
        let sex = orderList[index].sex;
        let address = orderList[index].address;
        let tel = orderList[index].tel;
        let time = toUTCtime(orderList[index].time);
        let username = orderList[index].username;
        let status = orderList[index].zhuangtai;
        let total = orderList[index].total;
        let leaveword = orderList[index].leaveword;
        $("#show_orders").append(`
                            <tr>
                                <td> ` + number + `</td>
                                <td> ` + name + `</td>
                                <td>` + sex + `</td>
                                <td> ` + address + `</td>
                                <td> ` + tel + ` </td>
                                <td ><div id="leaveword">` + (leaveword == null ? "无" : leaveword) + `</div></td>
                                <td> ` + time + `</td>
                                <td> ` + username + `</td>
                                <td>` + (status == 1 ? "未发货" : "已发货") + `</td>
                                <td> ` + total + `</td>
                                <td>
                                    <button onclick="showDetail(` + id + `)" class="btn btn-default">查看</button> 
                                    <button class="btn btn-default" onclick="deleteOrder(` + id + `)" onclick="">删除</button>
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
function showDetail(id) {
    $("#no").show();
    let orderList = eval(lastResult.extend.orders);
    for (let index in orderList) {
        let number = orderList[index].bianhao;
        let name = orderList[index].name;
        let sex = orderList[index].sex;
        let address = orderList[index].address;
        let tel = orderList[index].tel;
        let time = toUTCtime(orderList[index].time);
        let username = orderList[index].username;
        let status = orderList[index].zhuangtai;
        let total = orderList[index].total;
        let leaveword = orderList[index].leaveword;
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
                                               ` + number + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">收货人姓名</label>
                                        <div class="form-control">
                                            ` + name + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">收货人地址</label>
                                        <div class="form-control">
                                               ` + address + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">收货人手机号</label>
                                        <div class="form-control">
                                            ` + tel + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">买家留言</label>
                                        <div class="form-control">
                                            ` + (leaveword == null ? "无" : leaveword) + ` 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">下单时间</label>
                                        <div class="form-control">
                                            ` + time + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">下单姓名</label>
                                        <div class="form-control">
                                             ` + username + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">订单状态</label>
                                        <div class="form-control">
                                          ` + (status == 1 ? "未发货" : "已发货") + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">总金额</label>
                                        <div class="form-control">
                                           ` + total + `
                                        </div>
                                    </div>
                                </form>
                                <button type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="changeChange(` + id + `)">
                                    修改</button>
                            </div>
                          
                        </div>
               
                     
                    `
            );
            $('#modal-container-show-orders').modal("show");
            return 0;
        }
    }
}

//变为可修改状态
function changeChange(id) {
    let orderList = eval(lastResult.extend.orders);
    console.log(orderList);
    for (let index in orderList) {
        let number = orderList[index].bianhao.trim();
        let name = orderList[index].name.trim();
        let sex = orderList[index].sex.trim();
        let address = orderList[index].address.trim();
        let tel = orderList[index].tel.trim();
        let time = toUTCtime(orderList[index].time);
        let username = orderList[index].username.trim();
        let status = orderList[index].zhuangtai;
        let total = orderList[index].total;
        let leaveword = orderList[index].leaveword;
        let trueTime = time.split(" ")[0] + "T" + time.split(" ")[1].split(":")[0] + ":" + time.split(" ")[1].split(":")[1];
        if (id === orderList[index].id) {
            $("#modal-body").empty();
            $('#modal-body').append(
                `    <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                 <input type="hidden"  id="sex" value="` + sex + `">
                                    <div class="form-group">
                                        <label for="number">编号</label>
                                        <input class="form-control"  id="number" value="` + number + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="name">收货人姓名</label>
                                        <input class="form-control" id="name" value="` + name + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="address">收货人地址</label>
                                            <input class="form-control" id="address" value="` + address + `"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="phone-number">收货人手机号</label>
                                         <input class="form-control" id="phone-number" value="` + tel + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="leaveword">买家留言</label>
                                        <input class="form-control" type="text" id="leaveword-input" value="` + (leaveword == null ? "" : leaveword) + ` "> 
                                    </div>
                                    <div class="form-group">
                                        <label for="order-time">下单时间</label>
                                        <input id="order-time" class="form-control" type="datetime-local" value="` + trueTime + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="username">下单姓名</label>
                                       <select class="form-control" id="username1" ></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="order-status">订单状态</label>
                                            <select class="form-control"  id="order-status">
                                                <option value="1" ` + (status === 1 ? "selected" : "") + `  >未发货</option>
                                                <option value="2" ` + (status === 2 ? "selected" : "") + `  >已发货</option>
                                            </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="total-money">总金额</label>
                                        <input class="form-control" id="total-money" value="` + total + `">
                                    </div>
                                </form>
                                 <button  type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="saveChange(` + id + `)">
                                    保存 </button>
                            </div>  
                      </div>`
            );
            $("#change").text("确认");
            for (let i in user) {
                if (user[i] === username) {
                    $("#username1").append(
                        `
                     <option  selected value="` + user[i] + `">` + user[i] + `</option>
                        `
                    )
                } else {
                    $("#username1").append(
                        `
                    <option value="` + user[i] + `">` + user[i] + `</option>
            `
                    )
                }

            }
            return 0;
        }

    }

}

//保存修改
function saveChange(id) {
    let number = $("#number").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let tel = $("#phone-number").val();
    let leaveWord = $("#leaveword-input").val();
    let time = $("#order-time").val();
    let username = $("#username1").val();
    let status = $("#order-status").val();
    let money = $("#total-money").val();
    let sex = $("#sex").val();
    if (number === "" || name === "" || address === "" || !isPoneAvailable(tel) || time === "" || username === "" || !isFloat(money)) {
        console.log(id + " " + number + " " + tel + " " + name + " " + sex + " " + address + " " + leaveWord + " " + time + " " + username + " " + status + " " + money);
        toastr.error("输入完整正确的信息！")
    } else {
        $.ajax({
            type: "post",
            url: "updateOrder.do",
            data: {
                id: id,
                bianhao: number,
                name: name,
                sex: sex,
                address: address,
                tel: tel,
                time: (new Date(time)).getTime(),
                username: username,
                leaveword: leaveWord,
                zhuangtai: status,
                total: money
            },
            success: function (result) {
                $('#modal-container-show-orders').modal("hide");
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
function deleteOrder(id) {
    //展现确认删除框
    $("#modal-container-sure-delete").modal("show");
    $("#modal-button").empty();
    $("#modal-button").append(` <button type="button" class="btn btn-default" data-dismiss="modal">取消</button> <button type="button" class="btn btn-primary" onclick="delO(` + id + `)">确定</button>`)
}

//提交删除操作
function delO(id) {
    $.ajax({
        type: "post",
        url: "deleteOrder.do",
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
function searchOrders1() {
    let data = $("#search").val();
    // console.log(data);
    if (data === "")
        toastr.warning("请输入查询信息！");
    else {
        $.ajax({
            type: "post",
            url: "../admin/searchOrder1.do",
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

function showSearchOrders(orders) {
    $("#show_orders").empty();
    for (let index in orders) {
        let id = orders[index].id;
        let number = orders[index].bianhao;
        let name = orders[index].name;
        let sex = orders[index].sex;
        let address = orders[index].address;
        let tel = orders[index].tel;
        let time = toUTCtime(orders[index].time);
        let username = orders[index].username;
        let status = orders[index].zhuangtai;
        let total = orders[index].total;
        let leaveword = orders[index].leaveword;
        $("#show_orders").append(`
                            <tr>
                                <td> ` + number + `</td>
                                <td> ` + name + `</td>
                                <td>` + sex + `</td>
                                <td> ` + address + `</td>
                                <td> ` + tel + ` </td>
                                <td ><div id="leaveword">` + (leaveword == null ? "无" : leaveword) + `</div></td>
                                <td> ` + time + `</td>
                                <td> ` + username + `</td>
                                <td>` + (status == 1 ? "未发货" : "已发货") + `</td>
                                <td> ` + total + `</td>
                                <td>
                                    <button onclick="showDetail(` + id + `)" class="btn btn-default">查看</button> 
                                    <button class="btn btn-default" onclick="deleteOrder(` + id + `)" onclick="">删除</button>
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
function showAddOrder() {
    $("#modal-body-add").empty();
    $("#modal-body-add").append(
        `
        <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="name">收货人姓名</label>
                                        <input class="form-control" id="name" >
                                    </div>
                                    <div class="form-group">
                                        <label for="address">收货人地址</label>
                                            <input class="form-control" id="address"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="sex">性别</label>
                                         <select class="form-control" id="sex">
                                            <option value="男">男</option>
                                            <option value="女">女</option> 
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone-number">收货人手机号</label>
                                         <input class="form-control" id="phone-number">
                                    </div>
                                    <div class="form-group">
                                        <label for="leaveword">买家留言</label>
                                        <input class="form-control" type="text" id="leaveword-input" > 
                                    </div>
                                    <div class="form-group">
                                        <label for="order-time">下单时间</label>
                                        <input id="order-time" class="form-control" type="datetime-local" >
                                    </div>
                                    <div class="form-group">
                                        <label for="username">下单姓名</label>
                                        <select class="form-control" id="username" ></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="order-status">订单状态</label>
                                            <select class="form-control"  id="order-status">
                                                <option value="1" selected>未发货</option>
                                                <option value="2"  >已发货</option>
                                            </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="total-money">总金额</label>
                                        <input class="form-control" id="total-money" >
                                    </div>
                                </form>
                                 <button  type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="addOrder()">
                                    提交 </button>
                            </div>  
                      </div>
        `
    )
    for (let index in user) {
        $("#username").append(
            `
            <option value="` + user[index] + `">` + user[index] + `</option>
            `
        )
    }
    $("#modal-container-add-orders").modal("show");
}

//提交添加的数据
function addOrder() {
    let name = $("#name").val();
    let address = $("#address").val();
    let tel = $("#phone-number").val();
    let leaveWord = $("#leaveword-input").val();
    let time = $("#order-time").val();
    let username = $("#username").val();
    let status = $("#order-status").val();
    let money = $("#total-money").val();
    let sex = $("#sex").val();
    let shop = "";
    if (name === "" || address === "" || !isPoneAvailable(tel) || time === "" || username === "" || !isFloat(money)) {
        toastr.error("输入完整正确的信息！")
    } else {
        let date = time.split("T")[0].split("-");
        let hours = time.split("T")[1].split(":");
        let number = date[0] + date[1] + date[1] + hours[0] + hours[1];
        $.ajax({
            type: "post",
            url: "addOrder.do",
            data: {
                bianhao: number,
                name: name,
                sex: sex,
                address: address,
                tel: tel,
                time: (new Date(time)).getTime(),
                username: username,
                leaveword: leaveWord,
                zhuangtai: status,
                total: money,
                shop: shop
            },
            success: function (result) {
                $('#modal-container-add-orders').modal("hide");
                toastr.success("添加成功！")
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
    const dateFormatString = "yyyy-MM-dd hh:mm";
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

//查询到所有的用户
function getAllUser() {
    $.ajax({
        type: "post",
        url: "selectAllUser.do",
        data: {},
        success: function (result) {
            if (result.code === 100)
                if (result.extend.count === 0)       //为空
                    user = null;
                else {
                    user = eval(result.extend.users);
                }
            else {
                console.log("获取用户失败");
            }
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    });
}