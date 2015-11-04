(function() {
    var root = this;
    var masterCDN = root.buildMasterCDN || "http://localhost:8080/dev";
    var config = {
        debug:true,//debug模式
        alias : {
            // qmik组件
            "loadimg" : "http://g.tbcdn.cn/tmmob/lib-loadimg/1.0.0/loadimg.js",//
            //业务模块
            'qmik/Loadimg': 'http://g.tbcdn.cn/tmmob/lib-loadimg/1.0.0/loadimg.js',
            'qmik/Store':'http://g.tbcdn.cn/tmmob/lib-store/1.0.0/store.js',
            "test":"${baseCDN}/module/test.js"
        },
        vars:{
            baseCDN:masterCDN
        },
        preload : [
           
        ]
    }
    if(root.Qmik){
        root.Qmik.config({
            context : config.context,// 配置工程的访问路径,如果没有配置,默认= /
            debug:config.debug//debug模式
        });
        // 定义模块名及请求路径
        root.Qmik.sun.config({
            //别名系统,把路径抽象成一个key来表示,后续通过这个key来找到对应的url
            alias : config.alias,
            preload : config.preload,
            vars:config.vars
        });
    }
    return config;
}).call(this);