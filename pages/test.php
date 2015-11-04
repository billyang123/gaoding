<div q-ctrl="user"> 控制器不能有子控制器
    <input name="user.name" type="text" value="leo"/>
    <input name="user.age" type="text" value="22"/>
    <p>
        倒计时:{{time}}
    </p>
    <p>
      输出: {{user.name}} - {{user.age}}
    </p>
</div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<div q-ctrl="demoCtrl" class="box" >
    <p> 全局:  </p>
    倒计时: <input name="time" type="text"/>  或 

    <div>
        <h3>用户信息  //qmik会自动把user.* 转换成 scope.user ={name:"",nick:"" ...} </h3>
        <p>user.name <input name="user.name" type="text"/>  </p>
        <p>user.nick <input name="user.nick" type="text"/> </p>
        <p>user.email <input name="user.email" type="text"/> </p>
        <p>user.qq <input name="user.qq" type="text"/> </p>

        <h3>//显示列表,ul下面的内容是模板,qmik会根据模板来生成相应的页面</h3>
        <h3>
            //q-onclick:是定义的单击事件,可以通过q-onxxx来定义事件,如:q-onclick,q-ontouchmove等
        </h3>
        <ul q-for="item in list" q-onclick="clickList" class="box">
            <li></li>
        </ul>
    </div>
</div>
<script type="text/javascript">
    (function($){
      //$.app() 编译页面页面,只会编译一次,后面再次调用,不会生成新值 
      //$.app().ctrl();//定义控制器
      $.app().ctrl({
        user: function(scope){//控制器user,对应 q-ctrl="user"
            scope.time = 5;
            scope.watch({
              "user": function(val){
                console.log("watch user:", val);
              }
            });
            var cy = $.cycle(function(){
                scope.time--;
                scope.apply("time");//更新time所在的节点值
                console.log(cy.stop)
                if(scope.time<0){
                  cy.stop();
                }
            }, 1000,10000);
            $.delay(function(){
                scope.user = {
                  name: 'leochen',
                  age: 99
                };
                scope.apply(["user"]);
            }, 3000);
        }
      });
    })(Qmik);
</script>
<script>


        $.app(function(scope){//全局控制器的写法
            scope.gname="lllleeeeoooo";
        }).ctrl({
          demoCtrl: function(scope){//定义控制器  scope:会话,作用空间在q-ctrl里面,不能超出
            scope.once({//只触发一次,采用 $.fn.once 方法实现
                viewport: function(){//当控制器所在的位置进入可显示的视口位置时,触发这个方法
                    ///$.ajax({});
                    scope.user.name="leo";
                    scope.user.nick="leo";
                    scope.user.email="cwq0312@163.om";
                    scope.user.qq="555";
                    scope.apply("user");
                }
            });

            scope.watch({//监听器
                //监听name值的变化,发现变化,会触发此事件(通过change事件来触发)
                //因此如果想要手动触发这个方法,需要通过scope.apply(["user.name"]);来触发事件
                "user.name": function(map){
                    $.log("watch:", map);
                },
                "user": function(map){//监听所有user(.*)?的变化

                }
            });

            scope.list= [{
                title:'leo1'
            },{
                title:'leo2'
            }];

            scope.clickList = function(e){

                var i = parseInt(Math.random() * 2);
                var color = i%2==1 ? "red": "green";
                $(e.target).css("backgroundColor",color);
            }

            scope.time = 999;
            $.cycle(function(){
                scope.time--;
                scope.apply(["time"]);//更新到界面
            }, 1000);
          }
        });

    </script>