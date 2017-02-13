/**
 * Created by wwm on 2016/5/22.
 */
var tb;
vueExports.modal7 = {
    el: "#modal7",
    data: {
        model7_switch_checked: false,
        startTimeBare: "",
        endTimeBare: "",
        selectSource: [
            {text: "包括所有检查", value: "ALL", code: ""},
            {text: "市检查", value: "city", code: "0"},
            {text: "新区检查", value: "newArea", code: "1"},
            {text: "自查", value: "self", code: "2"}],
        selectSourceItem: {text: "包括所有检查", value: "ALL", code: ""},
        selectExtent: [
            {text: "所有范围", value: "ALL"},
            {text: "空港范围", value: "KG"},
            {text: "海港范围", value: "HG"},
            {text: "小物流范围", value: "WL"}],
        selectExtentItem: {text: "所有范围", value: "ALL"},
        selectRepeat: "",
        mapClick: false,
        taskUrl: "http://60.29.110.104:6080/arcgis/rest/services/在线编辑/空港裸露地块/MapServer/0",
        GetImageAPI: "http://10.1.0.104:8094/GetImage/?id=",
        GetImagesIDAPI: "http://10.1.0.104:8094/GetImagesID/?id="
    },
    compiled: function () {
        var thisDate = new Date();
        var st = new Date((thisDate.getFullYear() - 1) + "-" + (thisDate.getMonth() + 1) + "-" + thisDate.getDate()).Format("yyyy-MM-dd");
        var et = thisDate.Format("yyyy-MM-dd");
        this.startTimeBare = st;
        this.endTimeBare = et;
    },
    ready: function () {
        var self = this;
        var map = $Map;
        var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 102, 0.95]), 1), new Color([255, 0, 102, 0.45]));
        //var layer = map.getLayer('base_road_name'); //根据ID值获取该图层,可以对此图层进行操作
        var queryTask = new esri.tasks.QueryTask(this.taskUrl);
        var query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        //关闭默认的地图点击选择事件,容易造成地图点击混乱
        map.on("click", executeQueries);
        // baseDyn.on("click",executeQueries);
        // bareLayer.on("click",executeQueries);
        function executeQueries(e) {
            self.mapClick = true;
            var parcels, buildings, promises, qGeom, point, pxWidth, padding;
            // create an extent from the mapPoint that was clicked
            // this is used to return features within 3 pixels of the click point
            point = e.mapPoint;
            pxWidth = map.extent.getWidth() / map.width;
            padding = 3 * pxWidth;
            qGeom = new Extent({
                "xmin": point.x - padding,
                "ymin": point.y - padding,
                "xmax": point.x + padding,
                "ymax": point.y + padding,
                "spatialReference": point.spatialReference
            });
            // use the extent for the query geometry
            query.geometry = qGeom;
            buildings = queryTask.execute(query);
            promises = all([buildings]);
            promises.then(self.handleQueryResults);
        }
        $('input[name="modal7-switch"]').on('switchChange.bootstrapSwitch', function (event, state) {
            // console.log(this); // DOM element
            // console.log(event); // jQuery event
            // console.log(state); // true | false
            self.model7_switch_checked = state;
            // var handle=dojoOn(map,"click",executeQueries);
            //根据图层的开关,决定是否启用map点击选择裸露地块
            if(state){
                // map.on("click", executeQueries);
                // dojoOn(map,"click",executeQueries);
            }else{
                // handle.remove();
            }
        });
    },
    watch: {
        model7_switch_checked: function (val, oldVal) {
            var layer = $Map.getLayer('base_road_name'); //根据ID值获取该图层,可以对此图层进行操作
            var alarmLayer = $Map.getLayer('alarmLayer');
            var alarmPointLayer=$Map.getLayer('涉危企业点图层');
            if (val) {
                layer.show();
                alarmLayer.hide();
                alarmPointLayer.hide();
            }
            else {
                $vmMain.keyword = "卡特彼勒";
                $vmMain.bareResult = [];
                $vmMain.bareResults = [];
                bareLayer.clear();
                layer.hide();
                alarmLayer.show();
                alarmPointLayer.show();
            }
        }
    },
    methods: {
        searchBare: function () {
            var p1 = arguments[0] ? arguments[0] : "";
            var self = this;
            var map = $Map;
            var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 102, 0.95]), 1), new Color([255, 0, 102, 0.45]));
            //var layer = map.getLayer('base_road_name'); //根据ID值获取该图层,可以对此图层进行操作
            var queryTask = new esri.tasks.QueryTask(this.taskUrl);
            var query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            // map.on("click", executeQueries);
            executeQueries();
            function executeQueries() {
                var parcels, buildings, promises, pxWidth, padding;
                // use the extent for the query geometry
                if (self.mapClick) {
                    query.geometry = self.polygons(p1);
                } else {
                    query.geometry = self.polygons(self.selectExtentItem.value);
                }

                buildings = queryTask.execute(query);
                promises = all([buildings]);
                promises.then(self.handleQueryResults);
            }
        },
        searchBareByExtent: function (s) {
            this.mapClick = true;
            this.searchBare(s);
        },
        conditionCompare: function (feat) {//根据选择的条件进行判断
            var self = this;
            var attr = feat.attributes;
            var c1 = ((new Date(attr.sendTime)) >= new Date(self.startTimeBare) || self.startTimeBare == "") && ((new Date(attr.sendTime)) < new Date(self.endTimeBare) || self.endTimeBare == "");
            var c2 = attr.source == self.selectSourceItem.code || (self.selectSourceItem.value == 'ALL');
            var c3 = self.selectRepeat == "ALL" || (self.selectRepeat == "repeat" && isFinite(attr.reUseArea) && attr.reUseArea > 0) || (self.selectRepeat == "norepeat" && (attr.reUseArea == 0 || attr.reUseArea == "" ));
            if (c1 && c2 && c3) {
                return true;
            } else {
                return false;
            }
        },
        handleQueryResults: function (results) {
            if(this.model7_switch_checked){
                // console.table(results);
                var self = this;
                //构造一个graphic对象，包含feature
                var features = results[0].features;

                bareLayer.clear();
                //将graphic对象存入result数组中
                var result = [];
                arrayUtils.forEach(features, function (feat) {
                    //根据选择的条件进行判断,然后再push
                    if (self.conditionCompare(feat) || self.mapClick) {
                        var resultObject = {feature: null, imageUrlList: []};
                        feat.setSymbol(new SimpleFillSymbol()
                            .setColor(new Color([255, 0, 0, 0.35]))
                            .setOutline(null));
                        bareLayer.add(feat);

                        resultObject.feature = feat;
                        if (resultObject.feature != null) {
                            $vmMain.sideExpanded = true;  //展开侧边栏
                            result.push(resultObject);
                        }
                    }
                });
                if (result.length == 0) {
                    $vmMain.keyword = "卡特彼勒";
                    $vmMain.bareResult = [];
                    $vmMain.bareResults = []
                } else if (result.length == 1) {
                    self.setExtent(result[0].feature);
                    var bareResult = {
                        store: [],
                        imageUrlList: []
                    };
                    bareResult.store = result;
                    $vmMain.keyword = "";
                    $vmMain.bareResult = bareResult;
                    $vmMain.bareResults = [];
                    $vmMain.sideState = "list";
                    self.getImages();
                } else {
                    $vmMain.keyword = "";
                    $vmMain.bareResult = [];
                    $vmMain.sideState = "list";
                    var columns = [], store = [], objID = [], graphicList = [];
                    var bareResults = {
                        columns: columns,
                        store: store,
                        firstShowFields: [
                            "ID", "source", "measureArea"
                        ],
                        objID: objID,
                        imageUrlList: [],
                        graphicList: graphicList
                    };
                    var res = {
                        ID: "编码", zone: "区域", address: "点位地址", problemDescription: "问题描述",
                        source: "来源", measureArea: "测量面积", reUseArea: "重复苫盖面积", payArea: "付费面积",
                        sendTime: "派单时间", dealTime: "整改时间", checkTime: "验收时间", operationEnterprise: "作业单位",
                        manageEnterprise: "管理单位", checker: "验收人员", memo: "备注"
                    };
                    for (var item in res) {
                        var it = {};
                        it.code = item;
                        it.text = res[item];
                        columns.push(it);
                    }
                    var CodedValues = ["市检查", "新区检查", "自查"];
                    for (var i = 0, il = result.length; i < il; i++) {
                        var ss = {};
                        ss.ID = result[i].feature.attributes.ID;
                        ss.zone = result[i].feature.attributes.zone;
                        ss.address = result[i].feature.attributes.address;
                        ss.problemDescription = result[i].feature.attributes.problemDescription;
                        ss.source = result[i].feature.attributes.source;
                        ss.measureArea = result[i].feature.attributes.measureArea + "平米";
                        ss.reUseArea = result[i].feature.attributes.reUseArea + "平米";
                        ss.payArea = result[i].feature.attributes.payArea + "平米";
                        ss.sendTime = new Date(result[i].feature.attributes.sendTime).toLocaleDateString();
                        ss.dealTime = new Date(result[i].feature.attributes.dealTime).toLocaleDateString();
                        ss.checkTime = new Date(result[i].feature.attributes.checkTime).toLocaleDateString();
                        ss.operationEnterprise = result[i].feature.attributes.operationEnterprise;
                        ss.manageEnterprise = result[i].feature.attributes.manageEnterprise;
                        ss.checker = result[i].feature.attributes.checker;
                        ss.memo = result[i].feature.attributes.memo;

                        var _objID = {};
                        _objID.OBJECTID = result[i].feature.attributes.OBJECTID;
                        objID.push(_objID);  //用于查找唯一图形, 方便调用 图片等
                        var thisGraphic = {};
                        thisGraphic.geometry = result[i].feature.geometry;
                        graphicList.push(thisGraphic);
                        //显示正确的值
                        switch (ss.source) {
                            case 0:
                                ss.source = CodedValues[0];
                                break;
                            case 1:
                                ss.source = CodedValues[1];
                                break;
                            case 2:
                                ss.source = CodedValues[2];
                                break;
                            default:
                                ss.source = "其他";
                                break;
                        }
                        store.push(ss);
                    }
                    // console.log(bareResults);
                    $vmMain.bareResults = bareResults;
                    self.getImages();
                }
                self.mapClick = false;
                if (undefined != tb || null != tb) {
                    tb.deactivate();
                    $Map.setMapCursor("url(assets/images/cursor/aero_arrow.cur),auto");
                }
            }else{
                // console.log("裸露地块图层未打开");
            }

        },
        draw: function (e) {
            var self = this;
            var map = $Map;
            $Map.setMapCursor("url(assets/images/cursor/e6.cur),auto");
            //同一方法，对应不同按钮，获取此按钮的value 判断得到的是那个按钮事件
            var btnValue = e.target.value;
            tb = new esri.toolbars.Draw($Map);
            tb.on("draw-end", self.doQuery);
            var tool = null;
            if (btnValue == "删除选择结果") {
                this.removeBareLayer();
            } else {
                switch (btnValue) {
                    case "polygon":
                        tool = "polygon";
                        break;
                    case "freehandpolygon":
                        tool = "freehandpolygon";
                        break;
                    default:
                        break;
                }
            }
            tb.activate(tool);
        },
        doQuery: function (evt) {
            this.mapClick = true;
            var queryTask = new esri.tasks.QueryTask(this.taskUrl);
            var query = new esri.tasks.Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.geometry = evt.geometry;

            var bare = queryTask.execute(query);
            var promises = all([bare]);
            promises.then(this.handleQueryResults);
        },
        getImages: function () {
            var self = this;
            var vm = $vmMain.bareResult;
            if (vm.length != 0) {
                var id = vm.store[0].feature.attributes.OBJECTID;
                var url1 = self.GetImagesIDAPI + id;
                $.ajax({
                    type: "GET",
                    url: url1,
                    async: false,
                    dataType: "JSON",
                    success: function (data) {
                        var imageUrlIdList = [];
                        var imgUrl = self.GetImageAPI;
                        for (var i = 0, il = data.length; i < il; i++) {
                            imageUrlIdList.push(imgUrl + data[i].id);
                        }
                        $vmMain.bareResult.imageUrlList = imageUrlIdList;
                    },
                    error: function (e) {
                        console.log(e);
                    }
                })
            }
            var vmss = $vmMain.bareResults.store;
            if (vmss != null) {
                var vms = $vmMain.bareResults.objID;
                for (var a = 0, al = $vmMain.bareResults.objID.length; a < al; a++) {
                    var url = self.GetImagesIDAPI + vms[a].OBJECTID;
                    $.ajax({
                        type: "GET",
                        url: url,
                        async: false,   //同步,ajax里必须加上async:false这句，为了保证按顺序进行(不知道对不对)
                        dataType: "JSON",
                        success: function (data) {
                            var imageUrlIdList = [];
                            var imgUrl = self.GetImageAPI;
                            for (var i = 0, il = data.length; i < il; i++) {
                                imageUrlIdList.push(imgUrl + data[i].id);
                            }
                            $vmMain.bareResults.imageUrlList.push(imageUrlIdList);
                        },
                        error: function () {
                            console.log("异常！");
                        }
                    })
                }
            }
        },
        setExtent: function (graphic) {
            if (graphic.geometry.type == "point") {
                var cPoint = new Point(graphic.geometry.x, graphic.geometry.y, new spatialReference($Map.spatialReference));
                $Map.centerAndZoom(cPoint, 8);
            }
            else {
                var Geometry = graphic.geometry;
                var Extent = Geometry.getExtent();
                Extent = Extent.expand(3);
                $Map.setExtent(Extent);
            }
        },
        polygons: function (s) {
            //自己实现polygon，以便自动覆盖全区所有范围
            var polygon_ALL = new Polygon({
                "rings": [
                    [
                        [13058455.6036, 4732130.0963],
                        [13110312.3447, 4719396.2062],
                        [13114701.4726, 4721075.9959],
                        [13116855.3971, 4727944.1698],
                        [13077773.1877, 4746340.5785],
                        [13054974.1037, 4747776.5273],
                        [13058455.6036, 4732130.0963]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });
            //自己实现polygon，以便自动覆盖全区所有范围
            var polygon_KG = new Polygon({
                "rings": [
                    [
                        [13059966, 4745102],
                        [13063954, 4740225],
                        [13064309, 4737109],
                        [13062294, 4733367],
                        [13068348, 4730928],
                        [13076594, 4731064],
                        [13079033, 4743967],
                        [13068619, 4746981],
                        [13060440, 4745643],
                        [13059966, 4745102]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });
            //自己实现polygon，以便自动覆盖全区所有范围
            var polygon_HG = new Polygon({
                "rings": [
                    [
                        [13101790, 4720427],
                        [13110587, 4719898],
                        [13109826, 4724462],
                        [13105262, 4726446],
                        [13101790, 4720427]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });
            //自己实现polygon，以便自动覆盖全区所有范围
            var polygon_WL = new Polygon({
                "rings": [
                    [
                        [13058732, 4742531],
                        [13060256, 4737417],
                        [13063473, 4738670],
                        [13061864, 4743361],
                        [13058732, 4742531]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });

            switch (s) {
                case  "ALL":
                    return polygon_ALL;
                    break;
                case "KG":
                    return polygon_KG;
                    break;
                case "HG":
                    return polygon_HG;
                    break;
                case "WL":
                    return polygon_WL;
                    break;
                default:
                    break;
            }
        },
        removeBareLayer: function () {
            //清除图层中已经添加的graphic
            bareLayer.clear();
            //在返回结果之后检查是否有数据,没有数据将数据置空
            // $vmMain.keyword = "卡特彼勒";
            // $vmMain.bareResult = [];
            // $vmMain.bareResults = [];
        }
    }
};