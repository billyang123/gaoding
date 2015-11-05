var fs = require("fs");
var path = require("path");
var assetsPath = "build";
var stylesPath = "dev/styles";
function stylesFilesFn(path,dest){
	var _lessdir = {};
	files = fs.readdirSync(path);
	files.forEach(function(item) {
    	var tmpPath = path + '/' + item;
        var stats = fs.statSync(tmpPath);
        if (!stats.isDirectory()) {
            if(item.indexOf(".less") > 0){
				var arr = item.split('.');
				_lessdir[dest+"/"+arr[0]+".css"] = tmpPath
			}
        }  
    });
    return _lessdir;
}
console.log(path.normalize(path.join("ajs",  "asdasdasd")))
module.exports = function(grunt) {
	// Project configuration.
	var configFile = grunt.option("config");
	var isBeautify = grunt.option("isBeautify");
	var configFileContent = fs.readFileSync(configFile,"utf-8");
    //configFileContent = iconv.decode(configFileContent)
    configFileContent = eval(configFileContent);
	var config = {};
	config.transport = {
        options: {
            debug: false,
            logLevel: "WARNING",
            useCache: true,
            rootPath: path.join(process.cwd(), "dev"),
            paths: [
                path.join(process.cwd(), "dev")
            ],
            alias: configFileContent.alias
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".js",
                    cwd: "dev",
                    filter: "isFile" 
                }
            ]
        }
    };
	config.less = {
        release: {
        	options: {
	            cleancss: !isBeautify,
	            compress: !isBeautify,
	            ieCompat: true
	        },
            files: stylesFilesFn("dev/less",assetsPath+"/styles")
        },
        develop: {
        	options: {
	            cleancss: false,
	            compress: false,
	            ieCompat: true
	        },
            files:stylesFilesFn("dev/less","dev/styles")
        }
    };
    config.watch = {
        develop: {
            files: ["dev/less/*.less","dev/less/**/*.less"],
            tasks: ["less:develop"]
        }
    };
	grunt.initConfig(config);
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-cmd-transport');
	grunt.registerTask('test', [
		"watch"
	]);
	grunt.registerTask('default', [
		"less:release","transport"
	]);
};
