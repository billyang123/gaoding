define("module/test22", [ "test" ], function(require, exports, module) {
    require("${baseCDN}/module/test.js");
    var b = window;
    var c = 222;
    module.exports = c;
});
