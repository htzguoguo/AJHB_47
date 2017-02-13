/**
 * Created by Administrator on 2016/1/3.
 */


tjx.test2 = ( function () {
    var initModule;
    initModule = function () {
        $("#btn").click(function () {
            alert("btn");
        });
    };

    return {
        initModule : initModule
    };
} () );