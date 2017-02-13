/**
 * Created by wwm on 2016/6/27.
 */
vueExports.modal8 = {
    el: '#modal8',
    data: {
        searchQuery: '南洋电缆（天津）有限公司',
        industryLayerURL:"http://60.29.110.104:6080/arcgis/rest/services/一张网/闲置厂房及楼宇/MapServer/0",
        enterpriseLayerURL:"http://60.29.110.104:6080/arcgis/rest/services/一张网/一张网动态图/MapServer/9",
        model8_switch_checked: false,
        getIndustryInfoURL: "http://10.1.0.104:8094/api/getQiyeJibenInfo?EName=",
        // getIndustryInfoURL: "http://localhost:50619/api/getQiyeJibenInfo?EName=",
        industryData: {},
        searchResults:[
        ]
    },
    compiled: function () {
       
        var self = this;
        var map=$Map;
        //创建动态图层 用feature图层,可设置更多操作
        var industryFeatureLayer = new FeatureLayer(this.industryLayerURL, {
            visible: true,
            id: "industryLayer",
            mode: FeatureLayer.MODE_AUTO,
            outFields: ["UNAME", "XMMC", "XMSQH", "建筑物编号", "fwmc"]
        });
        var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([0, 0, 255, 0.9]),1),new Color([125, 125, 125, 0.35]));
        var highlightPointSymbol=new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_SQUARE, 10,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([204, 204, 204]), 1),
            new Color([0, 255, 0, 0.25])
        );
        var highlightLineSymbol=new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 1);
        var highlightPolySymbol=new SimpleFillSymbol()
            .setColor(new Color([255, 0, 0, 0.75]))
            .setOutline(null);
        industryFeatureLayer.setRenderer(new SimpleRenderer(polySymbol)); //setRenderer设置图层显示的样式，如果是Graphic则用setSymbol
        industryFeatureLayer.hide();
        map.addLayer(industryFeatureLayer);

        industryFeatureLayer.on("click", function (evt) {

            // industryHighLightLayer.clear();
            // industryHighLightLayer.redraw();
            // industryFeatureLayer.redraw();
            // industryFeatureLayer.refresh();
            var attr = evt.graphic.attributes;
            self.industryData = attr;
            $vmMain.industryFeatureInfo = attr;
            //高亮显示选中的图形
            //这种方式存在添加图形不后不缩放就不刷新的现象,不知道具体原因,和featureLayer有关?
            // showFeature(evt.graphic);
            function showFeature(feature){
                var highlightFeature=feature;
                var symbol;
                switch(highlightFeature.geometry.type){
                    case "point":
                        symbol=highlightPointSymbol;
                        break;
                    case "polyline":
                        symbol=highlightLineSymbol;
                        break;
                    case "polygon":
                        symbol=highlightPolySymbol;
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
        var self = this;
        //点击高亮
        var map = $Map;
        var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 102, 0.95]), 1), new Color([255, 0, 102, 0.45]));
        var queryTask = new esri.tasks.QueryTask(this.industryLayerURL);
        var queryTask2=new esri.tasks.QueryTask(this.enterpriseLayerURL);
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
            var  buildings,enterprises, promises, qGeom, point, pxWidth, padding;
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
            enterprises=queryTask2.execute(query);
            promises = all([buildings,enterprises]);
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
            var alarmPointLayer=$Map.getLayer('涉危企业点图层');

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
            //默认打开第一个menu,以此触发数据
            if($vmMain.industryDetailMenu !== $vmMain.industryDetailMenus[0]){
                $vmMain.industryDetailMenu = $vmMain.industryDetailMenus[0];
            }else{
                //当点击矢量时,因为industryDetailMenu并没有改变值,所有没有触发getBaseInfoDetail方法,需要手动触发一下
                $vmMain.getBaseInfoDetail(val);
            }

        }
    },
    methods: {
        handleQueryResults:function(results){
            var self = this;
            var  buildings,enterprises;
            // make sure both queries finished successfully
            if ( ! results[0].hasOwnProperty("features") ) {
                console.log("buildings query failed.");
            }
            if ( ! results[1].hasOwnProperty("features") ) {
                console.log("enterprises query failed.");
            }
            if(this.model8_switch_checked){
                industryHighLightLayer.clear();
                //构造一个graphic对象,包含feature
                buildings=results[0].features;
                arrayUtils.forEach(buildings,function(feat){
                    var resultObject={feature:null};
                    feat.setSymbol(new SimpleFillSymbol()
                        .setColor(new Color([255,0,0,1]))
                        .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 1)));
                    industryHighLightLayer.add(feat);
                });
                enterprises=results[1].features;
                arrayUtils.forEach(enterprises,function(feat){
                    var resultObject={feature:null};
                    feat.setSymbol(new SimpleFillSymbol()
                        .setColor(null)
                        .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 4)));
                    industryHighLightLayer.add(feat);
                })
            }
        },
        search:function(){
            var self=this;
            var FindParameters = esri.tasks.FindParameters;
            var FindTask = esri.tasks.FindTask;

            var findTask = new FindTask($BaseServiceUrl + "一张网/一张网动态图/MapServer");
            // FindTask的参数`
            var findParams = new FindParameters();
            // 返回Geometry
            findParams.returnGeometry = true;
            // 查询的图层id
            //Layer: 密度点84 (0) 红线84分类点 (1) 泵站84 (2) 企业内部点位 (3) 供电管线84 (4) 路灯电缆84 (5) 燃气管线84 (6)
            // 污水管线84 (7) 雨水管线84 (8) 企业红线84 (9) 企业内部建筑物84 (10) 企业内部绿地84 (11)
            findParams.layerIds = [9];
            findParams.searchFields = ["UNAME"];
            findParams.searchText = this.searchQuery;
            var myresult = [];
            findTask.execute(findParams, function (result) {
                self.addResultGraphic(result);
            });
        },
        addResultGraphic: function (result) {
            var self = this;
            industryHighLightLayer.clear();
            this.searchResults=[];
            this.industryData = result[0].feature.attributes;
            $vmMain.industryFeatureInfo = result[0].feature.attributes;


            var scSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([102, 102, 255, 0.55]), 1), new Color([255, 102, 102, 0.35]));
            arrayUtils.forEach(result,function(rs){
                // var t={text:"",value:""};
                // t.text=rs.value;
                self.searchResults.push(rs);
                // console.log(rs);
                var resultObject={feature:null};
                rs.feature.setSymbol(new SimpleFillSymbol()
                    .setColor(null)
                    .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 4)));
                industryHighLightLayer.add(rs.feature);
            });

        },
        showResultGraphic:function(result){
            var self=this;
            var map=$Map;
            industryHighLightLayer.clear();
            this.industryData = result.feature.attributes;
            $vmMain.industryFeatureInfo = result.feature.attributes;
            var sExtent = result.feature.geometry.getExtent();
            sExtent = sExtent.expand(3);
            map.setExtent(sExtent);
            result.feature.setSymbol(new SimpleFillSymbol()
                .setColor(null)
                .setOutline(new SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 4)));
            industryHighLightLayer.add(result.feature);
        }
    }
};