/**
 * Created by Administrator on 2016/7/26.
 */
/*
 * hntp.index1.js
 *  main entry after login
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, hntp */
tjx.app.monitor.map = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            url_map_base : 'http://60.29.110.104:6080/arcgis/rest/services/kgmap/MapServer'
        },
        stateMap = {
            $container : null,
            map :  {
                basemap : null,
                find : null,
                findPara : null,
                locationsymbol : null,
                pointsymbol : null,
                linesymbol : null,
                txtsymbol : null,
                kg_extent : null,
                hg_extent : null,
                find_task_count : 0,
                find_task_result : null,
                find_task_index : 0,
                find_extend_type : 'kg'
            },
            locations : [{
                name : '正达科技',
                address : '空港经济区环河南路225号',
                priciapl : '孟祥艳',
                phone : '13803059169',
                lng : 117.419905,
                lat :39.123688
            },
             {
                name : 'PPG航空材料',
                 address : '天津空港经济区津空加挂2008-31号地块',
                 priciapl : '陆培',
                 phone : '',
                lng : 117.412898,
                lat :39.117258
            },
             {
                name : '中航国际物流',
                 address : '天津空港经济区启航路81号',
                 priciapl : '金峰',
                 phone : '',
                lng : 117.412449,
                lat :39.11485
            }
    ]
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        initMap,
        initFind,
        initMapBase,
        initSymbol,
        initMapEvent,
        doQuery,
        doFindTask,
        showDoQueryResult,
        onShowCoordinates,
        showFindTaskResult,
        initCamera,
        createWnd
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    doQuery = function ( name ) {
        var findTask =stateMap.map.find;
        // FindTask的参数`
        var findParams =stateMap.map.findPara;
        // 返回Geometry
        findParams.returnGeometry = true;
        // 查询的图层id
        findParams.layerIds = [8];  //Layer: 雨水井 (0)   Layer: 建筑物 (1)   Layer: 项目 (2)
        // 查询字段

        findParams.searchFields = [ "UNAME"];
        findParams.searchText = name;

     /*   ,中航国际物流（天津）有限公司,PPG航空材料（天津）有限公司,天津华宇航空股份有限公司*/
        findTask.execute(findParams, showFindTaskResult);
    }

    showFindTaskResult = function ( results ) {
        require([
            "dojo/on",
            "esri/geometry/Extent",
            "esri/graphic",
        ], function( on, Extent, Graphic ) {


            stateMap.map.find_task_index++;
            if ( results.length > 0 ) {
                stateMap.map.find_task_result.push( results[0] );
            }
            if ( stateMap.map.find_task_index === stateMap.map.find_task_count )     {
                var map = stateMap.map.basemap;
                var player = stateMap.map.glayer;
                player.clear();
                showDoQueryResult( stateMap.map.find_task_result );
            }

        });
    }

    doFindTask = function ( name, extendtype ) {
        var len, i, name;
        stateMap.map.find_extend_type = extendtype;
        if ( name ) {
            var names = name.split( ',' );
            len = names.length;
            stateMap.map.find_task_count = len;
            stateMap.map.find_task_index = 0;
            stateMap.map.find_task_result = [];
            for ( i = 0; i < len; i++ ) {
                doQuery( names[i] );
            }
        }
    }

    showDoQueryResult = function ( results ) {
        require([
            "dojo/on",
            "esri/geometry/Extent",
            "esri/graphic",
        ], function( on, Extent, Graphic ) {

            var map = stateMap.map.basemap;
            var player = stateMap.map.glayer;
            player.clear();
            on( player, "click", function () {
                jqueryMap.$detail.attr( 'data-width', 800 );
                jqueryMap.$detail.slimScroll({
                    height: 550
                });
                jqueryMap.$detail.modal( );
                tjx.app.monitor.camera.initCamera();
                tjx.app.monitor.camera.onLogin();
                tjx.app.monitor.camera.goPlay( '1000171$1$0$6' );

            });
            var symbol;
            for (var i = 0; i < results.length; i++) {
                var curFeature = results[i];
                var graphic = curFeature.feature;
              /*  var polygon = featureSet.features[0].geometry;*/
                // 根据类型设置显示样式
                switch (graphic.geometry.type) {
                    case "point":
                        symbol = stateMap.map.pointsymbol;
                        break;
                    case "polyline":
                        symbol = stateMap.map.linesymbol;
                        break;
                    case "polygon":
                        symbol = stateMap.map.locationsymbol;
                        break;
                }
                // 设置显示样式

                graphic.setSymbol(symbol);
                player.add(graphic);

                stateMap.map.txtsymbol.setText(graphic.attributes.UNAME);
                stateMap.map.txtsymbol.setOffset(0, 20)
                player.add(new Graphic(graphic.geometry.getExtent().getCenter(), stateMap.map.txtsymbol));

                if ( stateMap.map.find_extend_type === 'kg' ){
                    map.setExtent( stateMap.map.kg_extent );
                }else  if ( stateMap.map.find_extend_type === 'hg' ){

                }else {
                    var sExtent=graphic.geometry.getExtent();
                    var ext =sExtent.expand(5);
                    map.setExtent(ext);
                }
            }
        });
    }

    initCamera = function () {
        var obj = document.getElementById("DPSDK_OCX");
        gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
        createWnd();
        obj.DPSDK_SetLog(2, "D:\\DPSDK_OCX_log", false, false); //初始化后设置日志路径
        //var obj = document.getElementById("DPSDK_OCX");
        //ShowCallRetInfo(obj.DPSDK_Login("172.7.123.123", 9000, "1", "1"), "登录");
        //ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");
        //var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
        //ShowCallRetInfo(obj.DPSDK_DirectRealplayByWndNo(gWndId, nWndNo, "1000001$1$0$0", 1, 1, 1), "直接实时播放");
        for(var i=1;i<=4;i++)
            obj.DPSDK_SetToolBtnVisible(i, false);
        obj.DPSDK_SetToolBtnVisible(7, false);
        obj.DPSDK_SetToolBtnVisible(9, false);
        obj.DPSDK_SetControlButtonShowMode(1, 0);
        obj.DPSDK_SetControlButtonShowMode(2, 0);
    }


    
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $map :  $container.find( '#mapcontainer' ),
            $detail : $container.find( '#mondetail' ),
            $coor : $container.find( '#coor' )
        };
    };
// End DOM method /setJqueryMap/

    initMapEvent = function (  )  {
        stateMap.map.basemap.on('mouse-move', onShowCoordinates);
    }

    initFind = function (  ) {
        var findTask = new esri.tasks.FindTask( configMap.url_map_base );
        var findParams = new esri.tasks.FindParameters();
        stateMap.map.find = findTask;
        stateMap.map.findPara = findParams;
    }

    initSymbol = function ( CartographicLineSymbol, PictureFillSymbol,
                            SimpleMarkerSymbol,PictureMarkerSymbol, SimpleLineSymbol,
                            SimpleFillSymbol, SimpleRenderer, Color, TextSymbol, Font ) {
        stateMap.map.pointsymbol = new  SimpleMarkerSymbol();
        stateMap.map.pointsymbol.setPath("M50,2.125c26.441,0,47.875,21.434,47.875,47.875c0,26.441-21.434,47.875-47.875,47.875C17.857,97.875,2.125,76.441,2.125,50C2.125,23.559,23.559,2.125,50,2.125z'/><g class='icon'><path class='base' d='M50,19.53c13.945,0,25.248,11.213,25.248,25.045C75.248,60.437,54.207,80.47,50,80.47c-4.208,0-25.248-20.033-25.248-35.895C24.752,30.743,36.056,19.53,50,19.53z'/><path class='inner' d='M50,30.488c8.174,0,14.8,6.625,14.8,14.799c0,8.173-6.626,14.8-14.8,14.8s-14.8-6.626-14.8-14.799C35.2,37.114,41.826,30.488,50,30.488z");
        stateMap.map.pointsymbol.setColor(new Color("red"));
        // lineSymbol used for freehand polyline, polyline and line.
        var fillsymbol = new CartographicLineSymbol(
            CartographicLineSymbol.STYLE_SOLID,
            new Color([255,0,0]), 10,
            CartographicLineSymbol.CAP_ROUND,
            CartographicLineSymbol.JOIN_MITER, 5
        );
        stateMap.map.locationsymbol =  new PictureMarkerSymbol('images/monitor1.png', 32, 32);
        stateMap.map.txtsymbol = new TextSymbol().setFont(new Font("12pt").setWeight(Font.WEIGHT_BOLD)) ;

        //定义矢量显示样式
        var ptSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([204, 204, 204]), 1), new Color([0, 255, 0, 0.25]));
        stateMap.map.linesymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 1);
        var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NONE, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, Color([204, 204, 204]), 2), new Color([255, 204, 204, 0.25]));

    }

    initMapBase = function ( )  {
        esriConfig.defaults.io.proxyUrl = "../../proxy.ashx";
        esriConfig.defaults.io.alwaysUseProxy = false;
        stateMap.map.kg_extent = new esri.geometry.Extent(13058615.349, 4733928.396,  13079104.724, 4746928.586, new esri.SpatialReference({wkid: 102100}));
        stateMap.map.hg_extent = new esri.geometry.Extent(13103869.774, 4721119.891,  13110640.474, 4721119.891, new esri.SpatialReference({wkid: 102100}));
        var map = new esri.Map("mapcontainer",{
            extent: stateMap.map.kg_extent,
            logo:false
        });

        var layer = new esri.layers.ArcGISTiledMapServiceLayer( configMap.url_map_base );
        map.addLayer(layer);
        stateMap.map.glayer = new esri.layers.GraphicsLayer();
        map.addLayer(stateMap.map.glayer);
        stateMap.map.basemap = map;
        var resizeTimer;

      /*  map.setExtent(stateMap.map.hg_extent);*/
        dojo.connect(map, 'onLoad', function(theMap) {
            dojo.connect(dijit.byId('mapcontainer'), 'resize', function() {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    map.resize();
                    map.reposition();
                }, 500);
            });
        });
    }

    initMap = function (  ) {
        require(["dojo/parser", "dojo/dom", "dojo/dom-construct", "dojo/on", "dojo/string", "esri/map",  "esri/dijit/Basemap", "esri/dijit/BasemapLayer", "esri/dijit/BasemapToggle", "esri/dijit/BasemapGallery", "esri/arcgis/utils",
                "esri/geometry/Extent", "esri/layers/GraphicsLayer", "esri/graphic", "esri/layers/FeatureLayer", "esri/toolbars/draw","esri/tasks/Geoprocessor","esri/tasks/JobInfo",
                "esri/tasks/FeatureSet","esri/tasks/LinearUnit",
                "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/layers/ArcGISImageServiceLayer", "esri/layers/ImageServiceParameters", "esri/geometry/Point",
                "esri/tasks/FindTask", "esri/tasks/FindParameters", "esri/InfoTemplate",  "esri/symbols/CartographicLineSymbol", "esri/symbols/PictureFillSymbol", //自定义的Infowindow
                "esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/TextSymbol","esri/symbols/Font",
                "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
        ],
            function ( parser, dom, domConstruct, on, string, Map,  Basemap, BasemapLayer, BasemapToggle, BasemapGallery, arcgisUtils,
                       Extent, GraphicsLayer, Graphic, FeatureLayer, Draw,Geoprocessor,JobInfo,FeatureSet,LinearUnit,
                       SpatialReference, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, ArcGISImageServiceLayer, ImageServiceParameters, Point,
                       FindTask, FindParameters, InfoTemplate,CartographicLineSymbol, PictureFillSymbol,
                       SimpleMarkerSymbol,PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
                       SimpleRenderer, Color ,TextSymbol,  Font) {
                initMapBase();
                initFind( );
                initSymbol( CartographicLineSymbol, PictureFillSymbol,
                    SimpleMarkerSymbol,PictureMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer, Color, TextSymbol, Font );
                doFindTask('中航国际物流（天津）有限公司,PPG航空材料（天津）有限公司,天津华宇航空股份有限公司,天津正达科技有限责任公司', 'kg');
            }
        );



       /* initSymbol();*/
    }

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onShowCoordinates = function (evt) {
        var mp = evt.mapPoint;
        jqueryMap.$coor.html( "坐标：" + mp.x.toFixed(4) + " , " + mp.y.toFixed(4));  //toFiex(2) 限制小数点后显示的位数
    }

//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------



// Begin public method /configModule/
// Purpose : Adjust configuration of allowed keys
// Arguments : A map of settable keys and values
// * color_name - color to use
// Settings :
// * configMap.settable_map declares allowed keys
// Returns : true
// Throws : none
//
    configModule = function ( input_map ) {
        return true;
    };

// End public method /configModule/
// Begin public method /initModule/
// Purpose : Initializes module
// Arguments :
// * $container the jquery element used by this feature
// Returns : true
// Throws : nonaccidental
//
    initModule = function ( $container ) {
        stateMap.$container = $container;
        setJqueryMap();
        initMap();
      /*  doQuery();*/
       /* onShowLocations();*/
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        doFindTask : doFindTask
    };
//------------------- END PUBLIC METHODS ---------------------
}());

