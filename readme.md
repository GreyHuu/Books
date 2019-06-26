# 校内二手图书交易平台
## 后台接口说明
#####  所有接口均采用ajax传输数据
***
* 1.登录接口:
***
```
type：post
url：   login
data: 
    userPhone
    password
return：
    code: 100
    extend: {total: 2, pages: 1, last: true,…}
    first: true
    last: true
    orders: [{id: 6, bianhao: "201906060158", name: "greyhuhu141", sex: "男", address: "3109 Doctors Drive",…},…]
    pages: 1
    total: 2
    msg: "处理成功"
    }
  ```  
 
***
* 2.注册接口
***
```
type ：post
url：    register
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
return：
    code: 100
    extend: {total: 2, pages: 1, last: true,…}
    first: true
    last: true
    orders: [{id: 6, bianhao: "201906060158", name: "greyhuhu141", sex: "男", address: "3109 Doctors Drive",…},…]
    pages: 1
    total: 2
    msg: "处理成功"
```    
*******
* 3.获得数据

   * 3.1用户订单数据
   
         type ：post
         url：    getOrdersPage.do
         data: {
                 pageNumber: 1
                 pageSize: 5
          }
         return：
              code: 100
                 extend: {total: 2, pages: 1, last: true,…}
                 first: true
                 last: true
                 orders: [{id: 6, bianhao: "201906060158", name: "greyhuhu141", sex: "男", address: "3109 Doctors Drive",…},…]
                 pages: 1
                 total: 2
                 msg: "处理成功"
        
   *  3.2获得商品数据
   
          type ：post
          url：    electAllGoodsByPage.do
          data: {
                 pageNumber: 1
                 pageSize: 5
           }
          return：
               code: 100
               extend: {total: 10, pages: 2, last: false,…}
               first: true
               last: false
               orders: [{id: 4, mingcheng: "线性代数", yqprice: 48.5, price: 18.2, shuliang: 12,…},…]
               pages: 2
               total: 10
               msg: "处理成功"
        
    * 3.3获得审核商品数据
    
             type ：post
             url：    selectAllGoodsVerity.do
             data: {}
             return：
                  code: 100
                  extend: {count: 3, list: [{id: 1, mingcheng: "高数", yqprice: 28, price: 18, shuliang: 13,…},…]}
                  count: 3
                  list: [{id: 1, mingcheng: "高数", yqprice: 28, price: 18, shuliang: 13,…},…]
                  msg: "处理成功"
                
   * 3.4获得商品分类数据
           
             type ：post
             url：    getAllGoodsType.do
             data: {}
             return：
                  code: 100
                  extend: {,…}
                  list: [{id: 2, typename: "大二"}, {id: 3, typename: "大三"}, {id: 49, typename: "大一"}, {id: 50, typename: "大四"}]
                  msg: "处理成功"
    
   * 3.5获得用户数据
               
                 type ：post
                 url：    selectUserByPage.do
                 data: {
                    pageNumber: 1
                    pageSize: 5
                 }
                 return：
                      code: 100
                      extend: {total: 2, last: false,…}
                      first: true
                      last: false
                      orders: [{id: 1, name: "ggh", pwd: "1234", email: "1234@qq.com", tel: "17602603997", qq: "12341414",…},…]
                      total: 2
                      msg: "处理成功"
   
   * 3.6获得公告数据
                   
            type ：post
            url：    selectAllNotices.do
            data: {}
            return：
                code: 100
                extend: {list: [{id: 2, title: "周五考试安排", time: 1560252725000, content: "周五上午数据库考试"},…]}
                list: [{id: 2, title: "周五考试安排", time: 1560252725000, content: "周五上午数据库考试"},…]
                msg: "处理成功"
   
   * 3.7获得管理员信息   
   
            type: post
            url:    getTime.do         
            data:{}
            return:
                code: 100
                extend: {times: 13, lastSecond: 778, second: 1229}
                lastSecond: 778
                second: 1229
                times: 13
                msg: "处理成功"         
 
 
 ********                  
* 4.新增
   * 4.1订单新增
          
          type:post
          url:  addOrder.do
          data:{
                bianhao: 201906062201
                name: 田丰慧asd
                sex: 男
                address: 3109  Doctors Drive
                tel: 17602603997
                time: 1560520860000
                username: greyhuhu1231
                leaveword: 2258458
                zhuangtai: 1
                total: 85.9
                shop: 
          }
          return:
                code: 100
                extend: {count: 1}
                count: 1
                msg: "处理成功"
   
   * 4.3商品新增
                
                type: post
                url:    addGoods.do
                data:{
                      mingcheng: 深入了解java虚拟机
                      yqprice: 85.8
                      price: 25.8
                      shuliang: 5
                      tupian: https://ws1.sinaimg.cn/mw690/006YPQhyly1g4emrrlgvnj30eu0bdjv1.jpg
                      goodstypeId: 49
                }
                return:
                     code: 100
                     extend: {count: 1}
                     count: 1
                     msg: "处理成功"
    
   * 4.4用户新增
                 
                 type: post
                 url:    addUser.do
                 data:{
                       name: 1234
                       pwd: 39971004
                       email: 15197157408@qq.com
                       tel: 17602603998
                       qq: 1519715742
                       ip: 127.0.0.1
                       tishi: 
                       huida: 
                       dizhi: 成都信息工程大学
                       regtime: 1561537294629
                       logincishu: 0
                       truename: 你好
                       imgurl: images/user.png
                 }
                 return:
                      code: 100
                      extend: {count: 1}
                      count: 1
                      msg: "处理成功"
    
   * 4.5公告新增
                     
                     type: post
                     url:    addNotice.do
                     data:{
                           title: 天天向上
                           content: 考好操作系统
                     }
                     return:
                         "code":100,
                         "msg":"处理成功",
                         "extend":{
                                "count":1
                         } 
                         
 ***********************************
 * 5删除
      * 5.1订单删除
            
            type: post
            url:    deleteOrder.do
            data:{
                id: 7
            }
            return:
                code: 100
                extend: {count: 1}
                msg: "处理成功”
      * 5.2商品删除
                  
                  type: post
                  url:    deleteGoods.do
                  data:{
                      id: 22
                  }
                  return:
                      code: 100
                      extend: {count: 1}
                      msg: "处理成功"
      * 5.3用户删除
                        
                        type: post
                        url:    deleteUser.do
                        data:{
                            id: 9
                        }
                        return:
                            code: 100
                            extend: {count: 1}
                            msg: "处理成功"           
      * 5.4公告删除
                              
                              type: post
                              url:    deleteNotice.do
                              data:{
                                  id: 4
                              }
                              return:
                                  code: 100
                                  extend: {count: 1}
                                  msg: "处理成功"              
 
 ***************************
* 6 搜索
   * 6.1 订单搜索        
           
           type: post
           url:    searchOrder1.do
           data:{
               data: grey
           }
           return:
               code: 100
               extend: {result: 1,…}
               list: [{id: 6, bianhao: "201906060158", name: "greyhuhu141", sex: "男", address: "3109 Doctors Drive",…}]
               0: {id: 6, bianhao: "201906060158", name: "greyhuhu141", sex: "男", address: "3109 Doctors Drive",…}
               result: 1
               msg: "处理成功"      
   
   * 6.2 商品搜索        
              
              type: post
              url:    searchGoods.do
              data:{
                  data: 数
              }
              return:
                  code: 100
                  extend: {result: 1, list: [{id: 4, mingcheng: "线性代数", yqprice: 48.5, price: 18.2, shuliang: 12,…},…]}
                  list: [{id: 4, mingcheng: "线性代数", yqprice: 48.5, price: 18.2, shuliang: 12,…},…]
                  0: {id: 4, mingcheng: "线性代数", yqprice: 48.5, price: 18.2, shuliang: 12,…}
                  1: {id: 8, mingcheng: "数据挖掘", yqprice: 45.8, price: 25.4, shuliang: 10,…}
                  2: {id: 27, mingcheng: "高数", yqprice: 28, price: 18, shuliang: 13,…}
                  result: 1
                  msg: "处理成功"              
   * 6.3 用户搜索        
                 
                 type: post
                 url:    searchUsers.do
                 data:{
                     data: g
                 }
                 return:
                     code: 100
                     extend: {result: 1,…}
                     list: [{id: 1, name: "ggh", pwd: "1234", email: "1234@qq.com", tel: "17602603997", qq: "12341414",…},…]
                     0: {id: 1, name: "ggh", pwd: "1234", email: "1234@qq.com", tel: "17602603997", qq: "12341414",…}
                     1: {id: 3, name: "greyhuhufds", pwd: "123456", email: "15197157408@qq.com", tel: "17602603998",…}
                     2: {id: 4, name: "greyhuhu1231", pwd: "769282", email: "15197157408@qq.com", tel: "17602603998",…}
                     result: 1
                     msg: "处理成功"                  
                     
********************************
* 7 修改更新
   * 7.1 订单更新        
           
           type: post
           url:    updateOrder.do
           data:{
               id: 6
               bianhao: 201906060158
               name: greyhuhu141
               sex: 男
               address: 3109  Doctors Drive
               tel: 17602603997
               time: 1559843880000
               username: greyhuhufds
               leaveword: 21321 撒扽东          
               zhuangtai: 2
               total: 148
           }
           return:
               code: 100
               extend: {count: 1}
               count: 1
               msg: "处理成功"
   * 7.2 商品更新        
              
              type: post
              url:    updateGoods.do
              data:{
                  id: 11
                  mingcheng: 第一行代码
                  yqprice: 86.5
                  price: 25.8
                  shuliang: 10
                  tupian: https://ws3.sinaimg.cn/mw690/006YPQhyly1g4bk79ps4zj30eu0bdjv1.jpg
                  goodstypeId: 2
              }
              return:
                  code: 100
                  extend: {count: 1}
                  count: 1
                  msg: "处理成功"   
   * 7.3 用户更新        
                 
                 type: post
                 url:    updateUser.do
                 data:{
                     id: 1
                     name: ggh
                     pwd: 1234
                     email: 1234@qq.com
                     tel: 17602603997
                     qq: 12341414
                     ip: 127.0.0.1
                     tishi: 
                     huida: 
                     dizhi: 成都信息工程大学
                     regtime: 1560763260000
                     logincishu: 8
                     truename: 撒东阿asd三
                     imgurl: images/64-64.jpg
                 }
                 return:
                     code: 100
                     extend: {count: "1"}
                     count: "1"
                     msg: "处理成功"               
   * 7.4 公告更新        
                    
                    type: post
                    url:   updateNotice.do
                    data:{
                        id: 5
                        title: 天天向上
                        content: 考好操作系统    ！！！！
                    }
                    return:
                         code: 100
                         extend: {count: "1"}
                         count: "1"
                         msg: "处理成功"              
                         
                         
***************
* 8 其他
   * 8.1 商品审核
         
         type: post
         url:   updateGoodsVerity.do
         data:{
             id: 1
             goodVerity: 2
         }
         return:
              code: 100
              extend: {count: 1}
              count: 1
              msg: "处理成功"        
              
   * 8.2 管理员退出
             
             type: post
             url:   updateTime.do
             data:{
                times: 14,
                totalSecond: 4403
             }
             return:
                  code: 100
                  extend: {count: 1}
                  count: 1
                  msg: "处理成功"          