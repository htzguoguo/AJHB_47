/**
 * Created by Administrator on 2016/3/21.
 */

tjx.maptest = ( function () {
    var initModule = function () {
        require(["esri/map",
                "dijit/TitlePane", "dijit/form/Button", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
                "dojo/domReady!"],
            function ( Map ) {
                /* parser.parse();*/
                esriConfig.defaults.io.proxyUrl = "proxy.ashx";
                esriConfig.defaults.io.alwaysUseProxy = false;

                map = new esri.Map("mapDiv11");
                var layer = new esri.layers.ArcGISTiledMapServiceLayer("http://60.29.110.104:6080/arcgis/rest/services/kgmap/MapServer");
                map.addLayer(layer);
                var resizeTimer;
                dojo.connect(map, 'onLoad', function(theMap) {
                    dojo.connect(dijit.byId('mapDiv11'), 'resize', function() {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function() {
                            map.resize();
                            map.reposition();
                        }, 500);
                    });
                });

            }
        );
    };

    return {
        initModule : initModule
    };

} () );
