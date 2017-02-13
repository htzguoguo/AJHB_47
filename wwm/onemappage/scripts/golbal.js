var $Map, $Toolbar, $CurrentGraphic, $CurrentSymbol;
var $markerSymbol, $lineSymbol, $fillSymbol, $ptSymbol, $polygonSymbol;
var $BaseServiceUrl = "http://60.29.110.104:6080/arcgis/rest/services/";

//dojo变量
var dojoOn, dojoDom, dojoDomConstruct, dojoRegistry, mouse;
//自定义变量
var myInfoWindow;
var spatialReference;
var bism;  //热度图变量
var pointBufferFeature;//热度图缓冲区
var vueExports = {};
var queryT;
var Color;
var SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, PictureFillSymbol, PictureMarkerSymbol;   //定义样式
var CartographicLineSymbol;
var Draw;
var PoltDraw;
var GraphicsLayer, Graphic, FeatureLayer;
var InfoTemplate; //infowindow窗口
var iTip; ////鼠标悬停变量
//创建多个图层，便于管理graphic
var alarmLayer, plottingLayer, bufferLayer, labelLayer, areaLayer, routeLayer, hightLightGraphicLayer, searchGraphicsLayer, markLayer;
var pipeLineLayer, redPointLayer, redLineCategoryLayer, searchBuildingGraphicsLayer, outWasteLayer, txtLayer, bareLayer, industryHighLightLayer;
var Measure, TextSymbol;
var SimpleRenderer;
var esriLang;
var number;
var domStyle;
var TooltipDialog, dijitPopup, dialog;
var Point;
var Extent;
var all;
var arrayUtils;
var Polygon;
var UniqueValueRenderer;
//底图影像及矢量图层
var ArcGISDynamicMapServiceLayer, ImageParameters;

//网络分析变量
var RouteTask, RouteParameters;
var ServiceAreaTask, ServiceAreaParameters;
var FeatureSet;

//Vue变量
var $vmMain;


var bottomBarMenus = [
    {text: "事件定位", icon: "fa-map-marker", modal: "modal1"},
    {text: "范围确定", icon: "fa-bank", modal: "modal2"},
    {text: "影响分析", icon: "fa-lightbulb-o", modal: "modal3"},
    {text: "资源分析", icon: "fa-question-circle", modal: "modal4"},
    {text: "路径分析", icon: "fa-sign-in", modal: "modal5"},
    {text: "态势分析", icon: "fa-info-circle", modal: "modal6"},
    {text: "裸露地块", icon: "fa-delicious", modal: "modal7"},
    {text: "利用现状", icon: "fa-area-chart", modal: "modal8"}
];


//十六进制颜色值的正则表达式
/*16进制颜色转为RGB格式*/
String.prototype.toRGB = function () {
    var ColorReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = this.toLowerCase();
    if (sColor && ColorReg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            console.log(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        //return "RGB(" + sColorChange.join(",") + ")";
        return sColorChange;
    } else {
        return "这个是颜色值吗？";
    }
};
//这个扩展表达式不能匹配字符串
// Array.prototype.contains = function(item){
//     // return RegExp("\\b"+item+"\\b").test(this);
//     return RegExp("(^|,)" + item.toString() + "($|,)").test(this);
// };
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//对string进行format格式化,源于C#中的string.Format()
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};