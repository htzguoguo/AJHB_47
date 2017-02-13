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
        },
        stateMap = {
            $container : null,
            map : null,
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
        getCoor,
        getLocation,
        onShowLocations,
        setLabel,
        locateItem
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    setLabel = function ( point, txt ) {
        var myIcon = new BMap.Icon("images/monitor1.png", new BMap.Size(32, 32), {
            offset: new BMap.Size(10, 25),                  // 指定定位位置
            imageOffset: new BMap.Size(0, 0)   // 设置图片偏移
        });
        var marker = new BMap.Marker( point, {icon : myIcon});  // 创建标注
        stateMap.map.addOverlay(marker);
        //marker.enableDragging();    //可拖拽
        //画图
        var label = new BMap.Label(txt,{offset:new BMap.Size(20,-10)});
        marker.setLabel(label);
        label.setStyle({
            color : "red",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            fontFamily:"微软雅黑"
        });

        marker.addEventListener("click", function (e) {
            jqueryMap.$detail.attr( 'data-width', 800 );
            jqueryMap.$detail.slimScroll({
                height: 550
            });
            jqueryMap.$detail.modal( );
            }
        );
    }
    
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $map :  $container.find( '#mapcontainer' ),
            $detail : $container.find( '#mondetail' )
        };
    };
// End DOM method /setJqueryMap/

    initMap = function (  ) {
        var map = new BMap.Map("mapcontainer");
        map.addControl(new BMap.OverviewMapControl({ isOpen: 1 }));
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT }));
        map.addControl(new BMap.MapTypeControl());
        map.centerAndZoom(new BMap.Point(117.20000, 39.13333), 10);
        map.enableScrollWheelZoom();
        stateMap.map = map;
    }
    getCoor = function () {
        stateMap.map.addEventListener("click",function(e){
            //存储经纬度
            lng = e.point.lng;
            lat = e.point.lat;
            //在地图上面描点
            var marker = new BMap.Marker(new BMap.Point(lng,lat));  // 创建标注
            stateMap.map.addOverlay(marker);
            marker.enableDragging();    //可拖拽

            var gc = new BMap.Geocoder();
            //获取地址的数据地址
            var pt = e.point;
            gc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                address = addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;

                //画图
                var label = new BMap.Label(address,{offset:new BMap.Size(20,-10)});
                marker.setLabel(label);
            });
        });
    }
    getLocation = function ( ) {
        var local = new BMap.LocalSearch(stateMap.map, {
            renderOptions:{map: stateMap.map}
        });
        var myKeys = ["正达科技", "中航国际物流", "天津华宇股份有限公司 ", "PPG航空材料"];
        local.searchInBounds(myKeys, stateMap.map.getBounds());
    }
    onShowLocations = function (  ) {
       var len, i, points = [], item, point;
       len = stateMap.locations.length;
        stateMap.map.clearOverlays();
       for ( i = 0; i < len; i ++ ) {
           item = stateMap.locations[i];
           point = new BMap.Point(item.lng,item.lat);
           setLabel( point, item.name );
           points.push( point );
       }
        stateMap.map.setViewport(points, [50, 50, 50, 50]);
    }



//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    locateItem = function ( name ) {
        var len, i, points = [], item, point;
        len = stateMap.locations.length;
        stateMap.map.clearOverlays();
        for ( i = 0; i < len; i ++ ) {
            item = stateMap.locations[i];
            if ( item.name === name  ) {
                point = new BMap.Point(item.lng,item.lat);
                setLabel( point, item.name );
                points.push( point );
                break;
            }
        }
        stateMap.map.setViewport(points, [50, 50, 50, 50]);
    }

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
        onShowLocations();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        locateItem : locateItem
    };
//------------------- END PUBLIC METHODS ---------------------
}());

