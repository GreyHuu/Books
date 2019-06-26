#校内二手图书交易平台
##后台
#####3所有接口均采用ajax传输数据

***
* 1.登录接口:
***
```
类型 ：
post
url：login
data: 
    userPhone
    password
返回数据：
    AjaxMessage{
            //状态码 100-成功 200-失败
            private int code;
        
            //提示信息
            private String msg;
        
            //用户要返回给浏览器的数据
            //通过 map 获得数据
            private Map<String, Object> extend = new HashMap<String, Object>();
    }
  ```  
 例子：
 ```
    $.ajax({
                type: "post",
                url: "login",
                data: "userPhone=" + userPhone.val() + "&password=" + password.val(),
                success: function (data) {},
                error: function (data) {}
            });
```
***
* 2.注册接口
```
类型 ：post
url：register
        data: 
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
返回数据：
    AjaxMessage{
            //状态码 100-成功 200-失败
            private int code;
        
            //提示信息
            private String msg;
        
            //用户要返回给浏览器的数据
            //通过 map 获得数据
            private Map<String, Object> extend = new HashMap<String, Object>();
    }
```    
   
   
   例子：
   
 ```
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
```
* 3.获得数据
   * 用户订单数据
   
      ```
         类型 ：post
         url：getOrdersPage.do
         data: 
             {
                 "pageNumber": pageNumber, 
                 "pageSize": pageSize
             }
         返回数据：
             AjaxMessage{
                     //状态码 100-成功 200-失败
                     private int code;
                 
                     //提示信息
                     private String msg;
                 
                     //用户要返回给浏览器的数据
                     //通过 map 获得数据
                     private Map<String, Object> extend = new HashMap<String, Object>();
             }
      ```
       * 例子
           ```
          $.ajax({
              type: "post",
              url: "getOrdersPage.do",
              data: {"pageNumber": pageNumber, "pageSize": pageSize},
              success: function (result) {
                  console.log(result.msg);
      
                  controlData(result);
      
                  //将本次数据返回
                  lastResult = result;
                  console.log(lastResult);
              }, error: function (result) {
                  console.log(result.msg)
              }
          });
          ```


* 4.删除
   * 订单删除
   
  
