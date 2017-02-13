/**
 * Created by wwm on 2016/6/27.
 */
vueExports.modal8 = {
    el: '#modal8',
    data: {
        searchQuery: '华盈',
        industryLayerURL: "http://60.29.110.104:6080/arcgis/rest/services/一张网/闲置厂房及楼宇/MapServer/0",
        // enterpriseLayerURL:"http://60.29.110.104:6080/arcgis/rest/services/一张网/一张网动态图/MapServer/9",
        enterpriseLayerURL: "http://60.29.110.104:6080/arcgis/rest/services/一张网/闲置厂房及楼宇/MapServer/1",
        model8_switch_checked: false,
        // getIndustryInfoURL: "http://60.29.110.104:8094/api/getQiyeJibenInfo?EName=",
        // getIndustryInfoURL: "http://localhost:50619/api/{id}/QiyeJibenInfoByID/{zid}",
        // getIndustryInfoURL: "http://localhost:50619/api/getQiyeJibenInfo?EName=",
        // getLouyuInfoURL:"http://60.29.110.104:8094/api/getLouyuJibenInfos?EName=",
        // getLouyuInfoURL:"http://localhost:50619/api/getLouyuJibenInfos?EName=",
        industryData: {},
        searchResults: [],
        louYuData: {}
    },
    compiled: function () {
        var self = this;
        var map = $Map;
        //创建动态图层 用feature图层,可设置更多操作
        var industryFeatureLayer = new FeatureLayer(this.industryLayerURL, {
            visible: true,
            id: "industryLayer",
            // mode: FeatureLayer.MODE_AUTO,
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ["ID", "ZID", "UNAME", "XMMC", "建筑物编号", "fwmc", "type","hasValue"]
        });
        // var defaultSymbol = new SimpleFillSymbol().setStyle(SimpleFillSymbol.STYLE_NULL);
        var defaultSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255, 0.9]), 0.2), new Color([204,204,204, 0.25]));
        // defaultSymbol.outline.setStyle(SimpleLineSymbol.STYLE_NULL);
        //create renderer
        var renderer = new UniqueValueRenderer(defaultSymbol, "hasValue");
        //add symbol for each possible value

        //var louYuSymbol = new SimpleFillSymbol().setColor(new Color([153,102,102, 0.9]));
        //var industrySymbol = new SimpleFillSymbol().setColor(new Color([102, 102, 204, 0.8]));
        var louYuSymbol = new SimpleFillSymbol().setColor(new Color([153,102,102, 0.5])).setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.4]), 1));
        var industrySymbol = new SimpleFillSymbol().setColor(new Color([102, 102, 204, 0.5])).setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0, 0.4]), 1));
        console.log(industryFeatureLayer);
        // renderer.addValue("1", specifySymbol);
        renderer.addValue("1", louYuSymbol);
        renderer.addValue("2", industrySymbol);
        var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255, 0.9]), 1), new Color([125, 125, 125, 0.35]));
        var highlightPointSymbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_SQUARE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([204, 204, 204]), 1),
            new Color([0, 255, 0, 0.25])
        );
        var highlightLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 1);
        var highlightPolySymbol = new SimpleFillSymbol()
            .setColor(new Color([255, 0, 0, 0.75]))
            .setOutline(null);
        //industryFeatureLayer.setRenderer(new SimpleRenderer(polySymbol)); //setRenderer设置图层显示的样式，如果是Graphic则用setSymbol
        industryFeatureLayer.hide();
        industryFeatureLayer.setRenderer(renderer);
        map.addLayer(industryFeatureLayer);

        industryFeatureLayer.on("click", function (evt) {
            var attr = evt.graphic.attributes;
            console.log(attr);
            if (attr != undefined && attr["type"] == "楼宇") {
                self.louYuData = attr;
                $vmMain.louYuFeatureInfo = attr;
            } else {
                self.industryData = attr;
                $vmMain.industryFeatureInfo = attr;
                $vmMain.louYuFeatureInfo = attr;
            }
            //高亮显示选中的图形
            //这种方式存在添加图形不后不缩放就不刷新的现象,不知道具体原因,和featureLayer有关?
            // showFeature(evt.graphic);
            function showFeature(feature) {
                var highlightFeature = feature;
                var symbol;
                switch (highlightFeature.geometry.type) {
                    case "point":
                        symbol = highlightPointSymbol;
                        break;
                    case "polyline":
                        symbol = highlightLineSymbol;
                        break;
                    case "polygon":
                        symbol = highlightPolySymbol;
                        break;
                    default:
                        break;
                }
                highlightFeature.setSymbol(symbol);
                industryHighLightLayer.add(highlightFeature);
            }
        });
    },
    ready: function () {
        //点击搜索功能
        var self = this;
        //点击高亮
        var map = $Map;
        var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 102, 0.95]), 1), new Color([255, 0, 102, 0.45]));
        var queryTask = new esri.tasks.QueryTask(this.industryLayerURL);
        var queryTask2 = new esri.tasks.QueryTask(this.enterpriseLayerURL);
        var query = new esri.tasks.Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        var industryLayer = $Map.getLayer('industryLayer'); //根据ID值获取该图层,可以对此图层进行操作
        //关闭默认的地图点击选择事件,容易造成地图点击混乱
        // map.on("click", executeQueries);
        industryLayer.on("click", executeQueries);
        // baseDyn.on("click",executeQueries);
        // bareLayer.on("click",executeQueries);
        function executeQueries(e) {
            var buildings, enterprises, promises, qGeom, point, pxWidth, padding;
            // create an extent from the mapPoint that was clicked
            // this is used to return features within 3 pixels of the click point
            point = e.mapPoint;
            pxWidth = map.extent.getWidth() / map.width;
            padding = 1 * pxWidth;
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
            enterprises = queryTask2.execute(query);
            promises = all([buildings, enterprises]);
            promises.then(self.handleQueryResults);
        }

        $('input[name="modal8-switch"]').on('switchChange.bootstrapSwitch', function (event, state) {
            // console.log(this); // DOM element
            // console.log(event); // jQuery event
            // console.log(state); // true | false
            self.model8_switch_checked = state;
        });
    },
    watch: {
        model8_switch_checked: function (val, oldval) {
            //危险企业动态点位图
            var alarmLayer = $Map.getLayer('alarmLayer'); //根据ID值获取该图层,可以对此图层进行操作
            var industryLayer = $Map.getLayer('industryLayer');
            var alarmPointLayer = $Map.getLayer('涉危企业点图层');

            if (val) {
                alarmLayer.hide();
                alarmPointLayer.hide();
                industryLayer.show();
                industryHighLightLayer.show();
            }
            else {
                // $vmMain.keyword = "卡特彼勒";
                // $vmMain.bareResult = [];
                // $vmMain.bareResults = [];
                alarmLayer.show();
                alarmPointLayer.show();
                industryLayer.hide();
                industryHighLightLayer.hide();
            }
        },
        industryData: function (val) {
            //console.log("厂房");
            //默认打开第一个menu,以此触发数据
            if ($vmMain.industryDetailMenu !== $vmMain.industryDetailMenus[0]) {
                $vmMain.industryDetailMenu = $vmMain.industryDetailMenus[0];
                // console.log(val);
            } else {
                //当点击矢量时,因为industryDetailMenu并没有改变值,所有没有触发getBaseInfoDetail方法,需要手动触发一下
                $vmMain.getBaseInfoDetail(val);
            }
        },
        louYuData: function (val) {
            //console.log("办公楼");
            // console.log(val);
            //默认打开第一个menu,以此触发数据
            if ($vmMain.louYuDetailMenu != $vmMain.louYuDetailMenus[0]) {
                $vmMain.louYuDetailMenu = $vmMain.louYuDetailMenus[0];
                // console.log($vmMain.louYuDetailMenu);
            } else {
                $vmMain.getLouYuBaseInfoDetail(val);
            }
        }
    },
    methods: {
        handleQueryResults: function (results) {
            var self = this;
            var buildings, enterprises;
            // make sure both queries finished successfully
            if (!results[0].hasOwnProperty("features")) {
                console.log("buildings query failed.");
            }
            if (!results[1].hasOwnProperty("features")) {
                console.log("enterprises query failed.");
            }
            if (this.model8_switch_checked) {
                industryHighLightLayer.clear();
                //构造一个graphic对象,包含feature
                buildings = results[0].features;
                arrayUtils.forEach(buildings, function (feat) {
                    var resultObject = {feature: null};
                    feat.setSymbol(new SimpleFillSymbol()
                        .setColor(new Color([255, 0, 0, 1]))
                        .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1)));
                    industryHighLightLayer.add(feat);
                });
                enterprises = results[1].features;
                arrayUtils.forEach(enterprises, function (feat) {
                    var resultObject = {feature: null};
                    feat.setSymbol(new SimpleFillSymbol()
                        .setColor(null)
                        .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 4)));
                    industryHighLightLayer.add(feat);
                })
            }
        },
        search: function () {
            var self = this;
            var FindParameters = esri.tasks.FindParameters;
            var FindTask = esri.tasks.FindTask;

            var findTask = new FindTask($BaseServiceUrl + "一张网/闲置厂房及楼宇/MapServer");
            // FindTask的参数`
            var findParams = new FindParameters();
            // 返回Geometry
            findParams.returnGeometry = true;
            // 查询的图层id
            findParams.layerIds = [1];
            findParams.searchFields = ["UNAME"];
            findParams.searchText = this.searchQuery;
            findTask.execute(findParams, function (result) {
                self.addResultGraphic(result);
            });
        },
        addResultGraphic: function (result, isSelect) {

            var self = this;
            console.log(result);
            industryHighLightLayer.clear();
            if (isSelect != true) {
                // console.log(arguments);
                this.searchResults = [];
            }

            if (result[0].feature.attributes.type == "楼宇") {
                this.louYuData = result[0].feature.attributes;
                $vmMain.louYuFeatureInfo = result[0].feature.attributes;
            } else {
                this.industryData = result[0].feature.attributes;
                $vmMain.industryFeatureInfo = result[0].feature.attributes;
            }

            var scSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([102, 102, 255, 0.55]), 1), new Color([255, 102, 102, 0.35]));
            arrayUtils.forEach(result, function (rs) {

                if (isSelect != true) {
                    // console.log(rs);
                    self.searchResults.push(rs);
                }

                var resultObject = {feature: null};
                rs.feature.setSymbol(new SimpleFillSymbol()
                    .setColor(null)
                    .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 4)));
                industryHighLightLayer.add(rs.feature);
            });
            // console.log(self.searchResults);
        },
        showResultGraphic: function (result) {
            var self = this;
            // console.log(result);
            var rs = [];
            rs.push(result);
            this.addResultGraphic(rs, true);
            var map = $Map;
            // industryHighLightLayer.clear();
            // this.industryData = result.feature.attributes;
            // $vmMain.industryFeatureInfo = result.feature.attributes;
            var sExtent = result.feature.geometry.getExtent();
            sExtent = sExtent.expand(3);
            map.setExtent(sExtent);
            // result.feature.setSymbol(new SimpleFillSymbol()
            //     .setColor(null)
            //     .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 4)));
            // industryHighLightLayer.add(result.feature);
        }
    }
};