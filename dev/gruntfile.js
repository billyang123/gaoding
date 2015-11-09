var fs = require("fs");
var path = require("path");
var assetsPath = "../build";
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
module.exports = function(grunt) {
	// Project configuration.
	//var configFile = grunt.option("config");
	var isBeautify = grunt.option("isBeautify");
	//var configFileContent = fs.readFileSync(configFile,"utf-8");
    //configFileContent = iconv.decode(configFileContent)
    //configFileContent = eval(configFileContent);
	var config = {};
	// config.transport = {
 //        options: {
 //            debug: false,
 //            logLevel: "WARNING",
 //            useCache: true,
 //            rootPath: path.join(process.cwd(), "dev"),
 //            paths: [
 //                path.join(process.cwd(), "dev")
 //            ],
 //            alias: configFileContent.alias
 //        },
 //        release: {
 //            files: [
 //                {
 //                    src: ["**/*.js"],
 //                    dest: assetsPath,
 //                    expand: true,
 //                    ext: ".js",
 //                    cwd: "dev",
 //                    filter: "isFile" 
 //                }
 //            ]
 //        }
 //    };
	config.less = {
        release: {
        	options: {
	            cleancss: !isBeautify,
	            compress: !isBeautify,
	            ieCompat: true
	        },
            files: stylesFilesFn("less",assetsPath+"/styles")
        },
        develop: {
        	options: {
	            cleancss: false,
	            compress: false,
	            ieCompat: true
	        },
            files:stylesFilesFn("less","styles")
        }
    };
    // config.cssmin = {
    //     options: {
    //         keepSpecialComments: 0,
    //         report: "min"
    //     },
    //     release: {
    //         files: [
    //             {
    //                 src: ["**/*.css"],
    //                 dest: assetsPath,
    //                 expand: true,
    //                 ext: ".css",
    //                 cwd: "styles",
    //                 filter: "isFile"
    //             }
    //         ]
    //     }
    // };
    config.copy = {
        release: {
            files: [
                {
                    src: ["lib/**/*.js","plugins/**/*.js","scripts/**/*.js","styles/**/*.js"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".js",
                    cwd: "../dev",
                    filter: "isFile"
                },
                {
                    src: ["fonts/**/*.eot"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".eot",
                    cwd: "../dev",
                    filter: "isFile"
                },
                {
                    src: ["fonts/**/*.otf"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".otf",
                    cwd: "../dev",
                    filter: "isFile"
                },
                {
                    src: ["fonts/**/*.svg"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".svg",
                    cwd: "../dev",
                    filter: "isFile"
                },
                {
                    src: ["fonts/**/*.ttf"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".ttf",
                    cwd: "../dev",
                    filter: "isFile"
                },
                {
                    src: ["fonts/**/*.woff"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".woff",
                    cwd: "../dev",
                    filter: "isFile"
                }
            ]
        }
    };
    config.uglify = {
        options: {
            mangle: true,
            beautify: isBeautify,
            report: "min",
            preserveComments: false,
            compress: isBeautify ? false : {
                warnings: false
            }
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: assetsPath,
                    expand: true,
                    ext: ".js",
                    cwd: assetsPath,
                    filter: function(file) {
                        var stats = fs.lstatSync(file);
                        console.log(file)
                        return stats.isFile() && !/\-debug\.*\.js$/.test(file);
                    }
                }
            ]
        }
    };
    config.watch = {
        develop: {
            files: ["dev/less/*.less","dev/less/**/*.less"],
            tasks: ["less:develop"]
        }
    };
    var tasks = [
        "copy",
        "less:release",
        //"cssmin"
        //"cmd_transport"
        //"cmd_concat"
    ];
    if (!isBeautify) {
        tasks.push("uglify");
    }
	grunt.initConfig(config);
	grunt.loadNpmTasks("grunt-cmd-nice");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    //grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('test', [
		"watch"
	]);
	grunt.registerTask('default', tasks);
};
