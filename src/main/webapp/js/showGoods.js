let lastResult;//存储上一次的数据
let firstTime = true;     //判断是否展现 加载过程动画  只有首次加载显示
let goodType;

//第一页的初始化
$(document).ready(function () {
    getAllTypes();
    init(1, 5, 1);
    initVerity();
});

//用于刷新数据
function init(pageNumber, pageSize, num) {
    //默认第一页是选中的
    $("#page_" + num).attr("class", "active");
    //查询并得到第一次的数据
    changePage(pageNumber, pageSize);
}


//载入审核信息
function initVerity() {
    $.ajax({
        type: "post",
        url: "../goodsVerity/selectAllGoodsVerity.do",
        data: {},
        success: function (result) {
            let list = eval(result.extend.list);
            $("#show_orders-verity").empty();
            for (let index in list) {
                let id = list[index].id;
                let mingcheng = list[index].mingcheng;
                let yqprice = list[index].yqprice;
                let price = list[index].price;
                let shuliang = list[index].shuliang;
                let tupian = list[index].tupian;
                let vertyStatus = list[index].vertyStatus;
                let status;
                if (parseInt(vertyStatus) === 1) {
                    status = "未审核"
                } else if (parseInt(vertyStatus) === 2) {
                    status = "审核通过"
                } else if (parseInt(vertyStatus) === 3) {
                    status = "审核不通过"
                }
                $("#show_orders-verity").append(`
                            <tr>
                                <td> ` + mingcheng + `</td>
                                <td> ` + yqprice + `</td>
                                <td>` + price + `</td>
                                <td> ` + shuliang + `</td>
                                <td >` + status + `</td>
                                <td id="doSome_` + id + `">
                                    <button onclick="showDetailVerity(` + id + `)" class="btn btn-default">查看</button> 
                                 </td>
                            </tr>
                `)
                if (parseInt(vertyStatus) === 2)
                    $("#doSome_" + id).empty();
            }
        },
        error: function () {

        }
    });
}


//展现审核的详细内容
function showDetailVerity(id) {
    $.ajax({
        type: "post",
        url: "../goodsVerity/selectAllGoodsVerity.do",
        data: {},
        success: function (result) {
            let orderList = eval(result.extend.list);
            for (let index in orderList) {
                let mingcheng = orderList[index].mingcheng;
                let yqprice = orderList[index].yqprice;
                let price = orderList[index].price;
                let shuliang = orderList[index].shuliang;
                let tupian = orderList[index].tupian;
                let vertyStatus = orderList[index].vertyStatus;
                let status;
                if (parseInt(vertyStatus) === 1) {
                    status = "未审核"
                } else if (parseInt(vertyStatus) === 2) {
                    status = "审核通过"
                } else if (parseInt(vertyStatus) === 3) {
                    status = "审核不通过"
                }
                if (id === orderList[index].id) {
                    $("#modal-body-ver").empty();
                    $('#modal-body-ver').append(
                        `
                        <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">名称</label>
                                        <div class="form-control">
                                               ` + mingcheng + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">原价</label>
                                        <div class="form-control">
                                            ` + yqprice + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">价格</label>
                                        <div class="form-control">
                                               ` + price + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">数量</label>
                                        <div class="form-control">
                                            ` + shuliang + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">审核状态</label>
                                        <div class="form-control">
                                            ` + status + ` 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">图片介绍</label>
                                        <div >
                                          <img class="img-thumbnail" src="` + tupian + `" width="100px;" alt="介绍">
                                        </div>
                                    </div>
                                </form>
                                <button class="btn btn-success" onclick="changeStatus(` + id + `,2)">审核通过</button>
                                <button class="btn btn-danger" onclick="changeStatus(` + id + `,3)">审核不通过</button>
                                
                            </div> 
                        </div>
                    `
                    );
                    $('#modal-container-show-orders-verity').modal("show");
                    return 0;
                }
            }
        },
        error: function () {

        }
    });

}

//审核状态的改变
function changeStatus(id, item) {
    $.ajax({
        type: "post",
        url: "../goodsVerity/updateGoodsVerity.do",
        data: {
            id: id,
            goodVerity: item
        },
        success: function () {
            $('#modal-container-show-orders-verity').modal("hide");
            toastr.success("修改成功！");
            if (item === 2)
                setTimeout(function () {
                    toastr.success("商品成功添加！")
                }, 1000)

            //改变之后 刷新
            initVerity();
            init(1, 5, 1);
        },
        error: function () {
        }
    })
}


/**
 * 分页
 * 数字变化  数据变化
 * @param pageNumber
 * @param pageSize
 */
//根据 页数 页面大小 处理数据
function changePage(pageNumber, pageSize) {
    //进度遮罩框
    if (firstTime === true)
        $.bootstrapLoading.start({loadingTips: "正在处理数据，请稍候..."});

    $.ajax({
        type: "post",
        url: "../goods/selectAllGoodsByPage.do",
        data: {"pageNumber": pageNumber, "pageSize": pageSize},
        success: function (result) {
            //console.log(result.msg);
            controlData(result);
            //将本次数据返回
            lastResult = result;
            console.log(lastResult);
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
    console.log("sadsadsa  " + totalPages);
    let childs = document.getElementById("all_page").children;
    let nowPage;
    for (let index in childs) {
        if (childs[index].classList[0] === "active") {
            nowPage = parseInt(childs[index].innerText);
            break;
        }
    }  //获得处于选中状态的value 作为当前页的页码
    if (num === -1) {//上一页
        //数字处理
        if ((nowPage <= 3) || (nowPage > totalPages)) {
            //console.log("前两页");
            //console.log("后两页");
            //前两页和后两页 不进行数字变换    只需要将active前移
            let nowId;
            for (let index in childs) {
                if (childs[index].classList[0] === "active") {
                    nowId = childs[index].id;
                    break;
                }
            }  //获得处于选中状态的value 作为当前页的页码

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
            let nowId;
            for (let index in childs) {
                if (childs[index].classList[0] === "active") {
                    nowId = childs[index].id;
                    break;
                }
            }  //获得处于选中状态的value 作为当前页的页码
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
        let mingcheng = orderList[index].mingcheng;
        let yqprice = orderList[index].yqprice;
        let price = orderList[index].price;
        let shuliang = orderList[index].shuliang;
        let tupian = orderList[index].tupian;
        let goodstypeId = orderList[index].goodstypeId;
        let goodstype;
        for (let j = 0; j < goodType.length; j++) {
            if (goodType[j].id === goodstypeId)
                goodstype = goodType[j].typename;
        }
        $("#show_orders").append(`
                            <tr>
                                <td> ` + mingcheng + `</td>
                                <td> ` + yqprice + `</td>
                                <td>` + price + `</td>
                                <td> ` + shuliang + `</td>
                                <td >` + goodstype + `</td>
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
    let orderList = eval(lastResult.extend.orders);
    for (let index in orderList) {
        let mingcheng = orderList[index].mingcheng;
        let yqprice = orderList[index].yqprice;
        let price = orderList[index].price;
        let shuliang = orderList[index].shuliang;
        let tupian = orderList[index].tupian;
        let goodstypeId = orderList[index].goodstypeId;
        let goodstype;
        for (let j in goodType) {
            if (goodType[j].id === goodstypeId)
                goodstype = goodType[j].typename;
        }
        if (id === orderList[index].id) {
            $("#modal-body").empty();
            $('#modal-body').append(
                `
                        <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">名称</label>
                                        <div class="form-control">
                                               ` + mingcheng + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">原价</label>
                                        <div class="form-control">
                                            ` + yqprice + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">价格</label>
                                        <div class="form-control">
                                               ` + price + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">数量</label>
                                        <div class="form-control">
                                            ` + shuliang + `
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">类型</label>
                                        <div class="form-control">
                                            ` + goodstype + ` 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">图片介绍</label>
                                        <div >
                                          <img class="img-thumbnail" src="` + tupian + `" width="100px;" alt="介绍">
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
            $("#no").show();
            return 0;
        }
    }
}

//变为可修改状态
function changeChange(id) {
    let orderList = eval(lastResult.extend.orders);
    for (let index in orderList) {
        let mingcheng = orderList[index].mingcheng;
        let yqprice = orderList[index].yqprice;
        let price = orderList[index].price;
        let shuliang = orderList[index].shuliang;
        let tupian = orderList[index].tupian;
        let goodstypeId = orderList[index].goodstypeId;
        if (id === orderList[index].id) {
            $("#modal-body").empty();
            $('#modal-body').append(
                `    <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="mingcheng">名称</label>
                                        <input class="form-control"  id="mingcheng" value="` + mingcheng + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="yqprice">原价</label>
                                        <input class="form-control" id="yqprice" value="` + yqprice + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="price">价格</label>
                                            <input class="form-control" id="price" value="` + price + `"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="shuliang">数量</label>
                                         <input class="form-control" id="shuliang" value="` + shuliang + `">
                                    </div>
                                    <div class="form-group">
                                        <label for="goodstypeId">类型</label>
                                       <select name="goodstypeId" id="goodstypeId"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="order-time">图片介绍</label>
                                        <p style="margin:1px;font-size: 12px;">点击下方选择图片</p>
                                       <div >
                                          <img id="img" style="cursor: pointer;" onclick="chooseImg()" class="img-thumbnail" src="` + tupian + `" width="100px;" alt="介绍">
                                          <input id="img_up" style="display: none;" type="file" onchange="changeImg()">
                                          <br>
                                          <a class="btn" onclick="up()">上传</a>
                                        </div>
                                    </div>
                                </form>
                                 <button  type="button" id="change" class="btn btn-default btn-primary btn-block" onclick="saveChange(` + id + `)">
                                    保存 </button>
                            </div>  
                      </div>`
            );
            $("#change").text("确认");
            for (let i in goodType) {
                if (goodType[i].id === goodstypeId) {
                    $("#goodstypeId").append(
                        `
                     <option  selected value="` + goodType[i].id + `">` + goodType[i].typename + `</option>
                        `
                    )
                } else {
                    $("#goodstypeId").append(
                        `
                    <option value="` + goodType[i].id + `">` + goodType[i].typename + `</option>
            `
                    )
                }

            }
            return 0;
        }
    }
}

//点击图片选择文件
function chooseImg() {
    $("#img_up").click()
    $("#change").attr('disabled', true);
    $("#change1").attr('disabled', true);
}

//上传成功提示
function up() {
    toastr.info("上传中，请稍后。。。");
    setTimeout(function () {
        toastr.success("上传成功！")
        $("#change").attr('disabled', false);
        $("#change1").attr('disabled', false);
    }, 1500);

}

//图片预览
function changeImg() {
    let file = $("#img_up").prop('files')[0];
    let reader = new FileReader();
    //创建文件读取相关的变量  
    let imgFile;
    reader.onload = function (e) {
        imgFile = e.target.result;
        $("#img").attr('src', imgFile);
        $.ajax({
            type: "post",
            url: "../uploadImg.do",
            data: {base64Data: imgFile},
            success: function (result) {
                $("#img").attr('src', result.extend.imgUrl);
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

//保存修改
function saveChange(id) {
    $("#modal-body-add").empty();
    let mingcheng = $("#mingcheng").val();
    let yqprice = $("#yqprice").val();
    let price = $("#price").val();
    let shuliang = $("#shuliang").val();
    let tupian = $("#img").attr("src");
    let goodstypeId = $("#goodstypeId").val();
    if (mingcheng === "" || isFloat(yqprice) === "" || !isFloat(price)) {
        console.log(id + " " + number + " " + tel + " " + name + " " + sex + " " + address + " " + leaveWord + " " + time + " " + username + " " + status + " " + money);
        toastr.error("输入完整正确的信息！")
    } else {
        $.ajax({
            type: "post",
            url: "../goods/updateGoods.do",
            data: {
                id: id,
                mingcheng: mingcheng,
                yqprice: yqprice,
                price: price,
                shuliang: shuliang,
                tupian: tupian,
                goodstypeId: goodstypeId
            },
            success: function (result) {
                $('#modal-container-show-orders').modal("hide");
                toastr.success("修改信息成功！")
                //刷新当前数据
                flushData();
                $("#modal-body").empty();
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
    $("#modal-button").append(` 
 <button type="button" class="btn btn-default" data-dismiss="modal">取消
 </button> <button type="button" class="btn btn-primary" onclick="delO(` + id + `)">确定</button>`)
}

//提交删除操作
function delO(id) {
    $.ajax({
        type: "post",
        url: "../goods/deleteGoods.do",
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
function searchGoods() {
    let data = $("#search").val();
    if (data === "")
        toastr.warning("请输入查询信息！");
    else {
        $.ajax({
            type: "post",
            url: "../goods/searchGoods.do",
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
    $("#show_orders").empty();
    for (let index in orderList) {
        let id = orderList[index].id;
        let mingcheng = orderList[index].mingcheng;
        let yqprice = orderList[index].yqprice;
        let price = orderList[index].price;
        let shuliang = orderList[index].shuliang;
        let tupian = orderList[index].tupian;
        let goodstypeId = orderList[index].goodstypeId;
        let goodstype;
        for (let j = 0; j < goodType.length; j++) {
            if (goodType[j].id === goodstypeId)
                goodstype = goodType[j].typename;
        }
        $("#show_orders").append(`
                            <tr>
                                <td> ` + mingcheng + `</td>
                                <td> ` + yqprice + `</td>
                                <td>` + price + `</td>
                                <td> ` + shuliang + `</td>
                                <td >` + goodstype + `</td>
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
        ` <div class="row clearfix">
                            <div class="col-md-offset-2 col-md-8 column">
                                <form role="form" id="more">
                                    <div class="form-group">
                                        <label for="mingcheng">名称</label>
                                        <input class="form-control"  id="mingcheng">
                                    </div>
                                    <div class="form-group">
                                        <label for="yqprice">原价</label>
                                        <input class="form-control" id="yqprice" >
                                    </div>
                                    <div class="form-group">
                                        <label for="price">价格</label>
                                            <input class="form-control" id="price"> 
                                    </div>
                                    <div class="form-group">
                                        <label for="shuliang">数量</label>
                                         <input class="form-control" id="shuliang" >
                                    </div>
                                    <div class="form-group">
                                        <label for="goodstypeId">类型</label>
                                       <select name="goodstypeId" id="goodstypeId"></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="order-time">图片介绍</label>
                                        <p style="margin:1px;font-size: 12px;">点击下方选择图片</p>
                                       <div >
                                          <img id="img" style="cursor: pointer;" onclick="chooseImg()" class="img-thumbnail" src="../images/upBack.png" width="100px;" alt="介绍">
                                          <input id="img_up" style="display: none;" type="file" onchange="changeImg()">
                                          <br>
                                          <a class="btn" onclick="up()">上传</a>
                                        </div>
                                    </div>
                                </form>
                                 <button  type="button" id="change1" class="btn btn-default btn-primary btn-block" onclick="addOrder()">
                                    提交 </button>
                            </div>  
                      </div>
        `
    )
    for (let i in goodType) {
        if (goodType[i].id === goodstypeId) {
            $("#goodstypeId").append(
                `
                     <option  selected value="` + goodType[i].id + `">` + goodType[i].typename + `</option>
                        `
            )
        } else {
            $("#goodstypeId").append(
                `
                    <option value="` + goodType[i].id + `">` + goodType[i].typename + `</option>
            `
            )
        }
    }
    $("#modal-container-add-orders").modal("show");
}

//提交添加的数据
function addOrder() {
    $("#modal-body").empty();
    let mingcheng = $("#mingcheng").val();
    let yqprice = $("#yqprice").val();
    let price = $("#price").val();
    let shuliang = $("#shuliang").val();
    let tupian = $("#img").attr("src");
    console.log("sdf  " + tupian);
    if (tupian === "../images/upBack.png")
        toastr.error("请选择图片!");
    else {
        let goodstypeId = $("#goodstypeId").val();
        if (mingcheng === "" || isFloat(yqprice) === "" || !isFloat(price)) {
            console.log(id + " " + number + " " + tel + " " + name + " " + sex + " " + address + " " + leaveWord + " " + time + " " + username + " " + status + " " + money);
            toastr.error("输入完整正确的信息！")
        } else {

            $.ajax({
                type: "post",
                url: "../goods/addGoods.do",
                data: {
                    mingcheng: mingcheng,
                    yqprice: yqprice,
                    price: price,
                    shuliang: shuliang,
                    tupian: tupian,
                    goodstypeId: goodstypeId
                },
                success: function (result) {
                    $('#modal-container-add-orders').modal("hide");
                    toastr.success("添加信息成功！")
                    //刷新当前数据
                    flushData();
                    $("#modal-body-add").empty();
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
}


/***
 * 商品分类
 */

function showGoodType() {
    $("#modal-container-goods-type").modal("show");
    $("#goods-type-panel").empty();
    for (let index = 0; index < goodType.length; index++) {
        let typeName = goodType[index].typename;
        let count;
        $.ajax({
            type: "post",
            url: "../goodsType/getCountByType.do",
            data: {
                type: goodType[index].id
            },
            success: function (result) {
                count = result.extend.count;
                $("#goods-type-panel").append(`
                     <div class="panel panel-default">
                            <div class="panel-heading">
                               <a class="panel-title collapsed"
                                    data-toggle="collapse"
                                    data-parent="#goods-type-panel"
                                    href="#panel-element-` + index + `">类别` + (index + 1) + `</a>
                            </div>
                            <div id="panel-element-` + index + `"
                             class="panel-collapse collapse">
                                <div class="panel-body">
                                     <span style="font-size:20px; ">` + typeName + `</span> <br>
                                     <p>该分类数量:
                                     <span><i>` + count + `</i></span></p>
                                     <button class="btn btn-xs btn-danger" onclick="deleteGoodType(` + goodType[index].id + `)">删除
                                      </button>
                                 </div>
                             </div>
                     </div>
        `)
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

//删除分类
function deleteGoodType(id) {
    //展现确认删除框
    $("#modal-container-goods-type").modal("hide");
    $("#modal-container-sure-delete").modal("show");
    $("#modal-button").empty();
    $("#modal-delete-body").empty();
    $("#modal-delete-body").append(`
        删除该分类会删除该分类以及该分类的商品，是否删除？
    `)
    $("#modal-button").append(` 
 <button type="button" class="btn btn-default" data-dismiss="modal">取消
 </button> <button type="button" class="btn btn-primary" onclick="delTypeAndGoods(` + id + `)">确定</button>`)
}

//删除分类 以及商品
function delTypeAndGoods(id) {
    //console.log(id);
    $.ajax({
        type: "post",
        url: "../goodsType/deleteGoodsType.do?type=" + id,
        data: {},
        success: function (result) {
            $('#modal-container-sure-delete').modal("hide");
            toastr.success("删除成功");
            // console.log(result.code);
            //刷新数据
            flushData();
            getAllTypes();
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    })
}

//添加类别
function addType() {
    let name = $("#type").val();
    if (name === "")
        toasr.error("请填写完整的名称!");
    else {
        $.ajax({
            type: "post",
            url: "../goodsType/addGoodsType.do",
            data: {
                typeName: name
            },
            success: function () {
                $("#modal-container-goods-type").modal("hide");
                $("#type").val("");
                getAllTypes();
                toastr.success("添加成功！");
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


//刷新当前页码的数据
function flushData() {
    let num;
    let childs = document.getElementById("all_page").children;
    let nowPage;
    for (let index in childs) {
        if (childs[index].classList[0] === "active") {
            nowPage = parseInt(childs[index].innerText);
            break;
        }
    }
    $('#all_page').find('li').each(function (index) {
        if ($(this).attr("class") === "active")
            num = index;
    });

    init(nowPage, 5, num);
}

//获得全部的商品总类
function getAllTypes() {
    $.ajax({
        type: "post",
        url: "../goodsType/getAllGoodsType.do",
        data: {},
        success: function (result) {
            goodType = eval(result.extend.list);
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    });

}

