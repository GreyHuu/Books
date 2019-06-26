＃ 校内二手图书交易平台
## 后台接口说明
#####  所有接口均采用AJAX技术传输数据
***
* 1.登录接口：
***
```
类型：后
url：登录
数据： 
    USERPHONE
    密码
返回：
    代码：100
    extend：{total：2，pages：1，last：true，...}
    第一：真的
    最后：是的
    订单：[{id：6，bianhao：“201906060158”，名称：“greyhuhu141”，性别：“男”，地址：“3109 Doctors Drive”，...}，...]
    页数：1
    总计：2
    msg：“处理成功”
    }
  ```  

***
* 2.注册接口
***
```
类型：发布
url：注册
数据： 
            name：nickName，
            密码：
            电邮：电邮，
            电话：电话，
            qq：qqNumber，
             ip：“127.0.0.1”，
             tishi：“提示”，
             huida：“回答”，
             dizhi：地址，
             regtime：new Date（），
             logincishu：0，
             truename：realName，
              imgurl：imgUrl
返回：
    代码：100
    extend：{total：2，pages：1，last：true，...}
    第一：真的
    最后：是的
    订单：[{id：6，bianhao：“201906060158”，名称：“greyhuhu141”，性别：“男”，地址：“3109 Doctors Drive”，...}，...]
    页数：1
    总计：2
    msg：“处理成功”
```    
*******
* 3.获得数据

   * 3.1用户订单数据

         类型：发布
         url：getOrdersPage.do
         数据：{
                 pageNumber：1
                 pageSize：5
          }
         返回：
              代码：100
                 extend：{total：2，pages：1，last：true，...}
                 第一：真的
                 最后：是的
                 订单：[{id：6，bianhao：“201906060158”，名称：“greyhuhu141”，性别：“男”，地址：“3109 Doctors Drive”，...}，...]
                 页数：1
                 总计：2
                 msg：“处理成功”

   *   3.2获得商品数据

          类型：发布
          url：electAllGoodsByPage.do
          数据：{
                 pageNumber：1
                 pageSize：5
           }
          返回：
               代码：100
               extend：{total：10，pages：2，last：false，...}
               第一：真的
               最后：假
               订单：[{id：4，mingcheng：“线性代数”，yqprice：48.5，价格：18.2，shuliang：12，...}，...]
               页数：2
               总数：10
               msg：“处理成功”

    * 3.3获得审核商品数据

             类型：发布
             url：selectAllGoodsVerity.do
             数据：{}
             返回：
                  代码：100
                  extend：{count：3，list：[{id：1，mingcheng：“高数”，yqprice：28，价格：18，shuliang：13，...}，...]}
                  数：3
                  清单：[{id：1，mingcheng：“高数”，yqprice：28，价格：18，shuliang：13，...}，...]
                  msg：“处理成功”

   * 3.4获得商品分类数据

             类型：发布
             url：getAllGoodsType.do
             数据：{}
             返回：
                  代码：100
                  延伸：{，...}
                  list：[{id：2，typename：“大二”}，{id：3，typename：“大三”}，{id：49，typename：“大一”}，{id：50，typename：“大四“}]
                  msg：“处理成功”

   * 3.5获得用户数据

                 类型：发布
                 url：selectUserByPage.do
                 数据：{
                    pageNumber：1
                    pageSize：5
                 }
                 返回：
                      代码：100
                      extend：{total：2，last：false，...}
                      第一：真的
                      最后：假
                      订单：[{id：1，名称：“ggh”，pwd：“1234”，电子邮箱：“1234@qq.com”，电话：“17602603997”，qq：“12341414”，...}，...]
                      总计：2
                      msg：“处理成功”

   * 3.6获得公告数据

            类型：发布
            url：selectAllNotices.do
            数据：{}
            返回：
                代码：100
                extend：{list：[{id：2，title：“周五考试安排”，时间：1560252725000，内容：“周五上午数据库考试”}，...]}
                list：[{id：2，title：“周五考试安排”，时间：1560252725000，内容：“周五上午数据库考试”}，...]
                msg：“处理成功”

   * 3.7获得管理员信息   

            类型：发布
            url：getTime.do         
            数据：{}
            返回：
                代码：100
                extend：{times：13，lastSecond：778，second：1229}
                lastSecond：778
                第二名：1229
                时间：13
                msg：“处理成功”         


 ********                  
* 4.新增
   * 4.1订单新增

          类型：后
          url：addOrder.do
          数据：{
                bianhao：201906062201
                名称：田丰慧asd
                性别：男
                地址：3109医生驾驶
                电话：17602603997
                时间：1560520860000
                用户名：greyhuhu1231
                保留字：2258458
                庄台：1
                总数：85.9
                店： 
          }
          返回：
                代码：100
                延伸：{count：1}
                数：1
                msg：“处理成功”

   * 4.3商品新增

                类型：发布
                url：addGoods.do
                数据：{
                      mingcheng：深入了解java虚拟机
                      yqprice：85.8
                      价格：25.8
                      shuliang：5
                      tupian：https：//ws1.sinaimg.cn/mw690/006YPQhyly1g4emrrlgvnj30eu0bdjv1.jpg
                      goodstypeId：49
                }
                返回：
                     代码：100
                     延伸：{count：1}
                     数：1
                     msg：“处理成功”

   * 4.4用户新增

                 类型：发布
                 url：addUser.do
                 数据：{
                       名称：1234
                       密码：39971004
                       电子邮件：15197157408@qq.com
                       电话：17602603998
                       qq：1519715742
                       ip：127.0.0.1
                       题诗： 
                       辉达： 
                       dizhi：成都信息工程大学
                       regtime：1561537294629
                       logincishu：0
                       特朗梅：你好
                       imgurl：images / user.png
                 }
                 返回：
                      代码：100
                      延伸：{count：1}
                      数：1
                      msg：“处理成功”

   * 4.5公告新增

                     类型：发布
                     url：addNotice.do
                     数据：{
                           标题：天天向上
                           content：考好操作系统
                     }
                     返回：
                         “代码”：100，
                         “味精”： “处理成功”，
                         “延伸”：{
                                “算”：1
                         } 

 ***********************************
 * 5删除
      * 5.1订单删除

            类型：发布
            url：deleteOrder.do
            数据：{
                id：7
            }
            返回：
                代码：100
                延伸：{count：1}
                msg：“处理成功”
      * 5.2商品删除

                  类型：发布
                  url：deleteGoods.do
                  数据：{
                      id：22
                  }
                  返回：
                      代码：100
                      延伸：{count：1}
                      msg：“处理成功”
      * 5.3用户删除

                        类型：发布
                        url：deleteUser.do
                        数据：{
                            id：9
                        }
                        返回：
                            代码：100
                            延伸：{count：1}
                            msg：“处理成功”           
      * 5.4公告删除

                              类型：发布
                              url：deleteNotice.do
                              数据：{
                                  id：4
                              }
                              返回：
                                  代码：100
                                  延伸：{count：1}
                                  msg：“处理成功”              

 ***************************
* 6搜索
   * 6.1订单搜索        

           类型：发布
           url：searchOrder1.do
           数据：{
               数据：灰色
           }
           返回：
               代码：100
               extend：{result：1，...}
               清单：[{id：6，bianhao：“201906060158”，姓名：“greyhuhu141”，性别：“男”，地址：“3109医生驾驶”，...}]
               0：{id：6，bianhao：“201906060158”，姓名：“greyhuhu141”，性别：“男”，地址：“3109 Doctors Drive”，...}
               结果：1
               msg：“处理成功”      

   * 6.2商品搜索        

              类型：发布
              url：searchGoods.do
              数据：{
                  数据：数
              }
              返回：
                  代码：100
                  extend：{result：1，list：[{id：4，mingcheng：“线性代数”，yqprice：48.5，价格：18.2，shuliang：12，...}，...]}
                  清单：[{id：4，mingcheng：“线性代数”，yqprice：48.5，价格：18.2，shuliang：12，...}，...]
                  0：{id：4，mingcheng：“线性代数”，yqprice：48.5，价格：18.2，shuliang：12，...}
                  1：{id：8，mingcheng：“数据挖掘”，yqprice：45.8，价格：25.4，shuliang：10，...}
                  2：{id：27，mingcheng：“高数”，yqprice：28，价格：18，shuliang：13，...}
                  结果：1
                  msg：“处理成功”              
   * 6.3用户搜索        

                 类型：发布
                 url：searchUsers.do
                 数据：{
                     数据：g
                 }
                 返回：
                     代码：100
                     extend：{result：1，...}
                     list：[{id：1，name：“ggh”，pwd：“1234”，email：“1234@qq.com”，tel：“17602603997”，qq：“12341414”，...}，...]
                     0：{id：1，名称：“ggh”，pwd：“1234”，电子邮件：“1234@qq.com”，电话：“17602603997”，qq：“12341414”，...}
                     1：{id：3，名称：“greyhuhufds”，pwd：“123456”，电子邮件：“15197157408@qq.com”，电话：“17602603998”，...}
                     2：{id：4，名称：“greyhuhu1231”，pwd：“769282”，电子邮件：“15197157408@qq.com”，电话：“17602603998”，...}
                     结果：1
                     msg：“处理成功”                  

********************************
* 7修改更新
   * 7.1订单更新        

           类型：发布
           url：updateOrder.do
           数据：{
               id：6
               bianhao：201906060158
               名称：greyhuhu141
               性别：男
               地址：3109医生驾驶
               电话：17602603997
               时间：1559843880000
               用户名：greyhuhufds
               留言：21321撒扽东          
               庄台：2
               总数：148
           }
           返回：
               代码：100
               延伸：{count：1}
               数：1
               msg：“处理成功”
   * 7.2商品更新        

              类型：发布
              url：updateGoods.do
              数据：{
                  id：11
                  mingcheng：第一行代码
                  yqprice：86.5
                  价格：25.8
                  shuliang：10
                  tupian：https：//ws3.sinaimg.cn/mw690/006YPQhyly1g4bk79ps4zj30eu0bdjv1.jpg
                  goodstypeId：2
              }
              返回：
                  代码：100
                  延伸：{count：1}
                  数：1
                  msg：“处理成功”   
   * 7.3用户更新        

                 类型：发布
                 url：updateUser.do
                 数据：{
                     id：1
                     名字：ggh
                     密码：1234
                     电子邮件：1234@qq.com
                     电话：17602603997
                     qq：12341414
                     ip：127.0.0.1
                     题诗： 
                     辉达： 
                     dizhi：成都信息工程大学
                     regtime：1560763260000
                     logincishu：8
                     truename：撒东阿asd三
                     imgurl：images / 64-64.jpg
                 }
                 返回：
                     代码：100
                     延伸：{count：“1”}
                     数：“1”
                     msg：“处理成功”               
   * 7.4公告更新        

                    类型：发布
                    url：updateNotice.do
                    数据：{
                        id：5
                        标题：天天向上
                        内容：考好操作系统!!!!
                    }
                    返回：
                         代码：100
                         延伸：{count：“1”}
                         数：“1”
                         msg：“处理成功”              


***************
* 8其他
   * 8.1商品审核

         类型：发布
         url：updateGoodsVerity.do
         数据：{
             id：1
             goodVerity：2
         }
         返回：
              代码：100
              延伸：{count：1}
              数：1
              msg：“处理成功”        

   * 8.2管理员退出

             类型：发布
             url：updateTime.do
             数据：{
                时间：14，
                totalSecond：4403
             }
             返回：
                  代码：100
                  延伸：{count：1}
                  数：1
                  msg：“处理成功”        