/**
 * Created by Administrator on 2016/3/21.
 */
/*
 * module_template.js
 * Template for browser feature modules
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, tjx */
tjx.home = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            dashboardMainChart : null,
            map : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        initDashboardWidget, initCharts, redrawCharts,
        initMiniCharts,onSuccess,setDataTable, configTableStyle,
        initIndexData,configDataTable,
        onFail;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    initCharts = function (  ) {
        var data = [
            {
                label : '未发生工伤',
                data : 208
            },
            {
                label : '3起以下工伤',
                data : 30
            },
            {
                label : '3-10起工伤',
                data : 8
            },
            {
                label : '10起以上',
                data : 1
            }
        ];



       /* var series = Math.floor(Math.random() * 10) + 1;
        series = series < 5 ? 5 : series;

        for (var i = 0; i < series; i++) {
            data[i] = {
                label: "Series" + (i + 1),
                data: Math.floor(Math.random() * 100) + 1
            };
        }*/

        if ($('#pie_chart_6').size() !== 0) {
            $.plot($("#pie_chart_6"), data, {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 2 / 3,
                            formatter: function(label, series) {
                                return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                            },
                            threshold: 0.1
                        }
                    }
                },
                legend: {
                    show: true
                }
            });
        }
    };

  /*  initCharts = function (  ) {
        var chart = AmCharts.makeChart("chart_6", {
            "type": "pie",
            "theme": "light",

            "fontFamily": 'Open Sans',

            "color":    '#888',

            "dataProvider": [{
                "country": "Lithuania",
                "litres": 501.9
            }, {
                "country": "Czech Republic",
                "litres": 301.9
            }, {
                "country": "Ireland",
                "litres": 201.1
            }, {
                "country": "Germany",
                "litres": 165.8
            }, {
                "country": "Australia",
                "litres": 139.9
            }, {
                "country": "Austria",
                "litres": 128.3
            }, {
                "country": "UK",
                "litres": 99
            }, {
                "country": "Belgium",
                "litres": 60
            }, {
                "country": "The Netherlands",
                "litres": 50
            }],
            "valueField": "litres",
            "titleField": "country",
           /!* "exportConfig": {
                menuItems: [{
                    icon: Metronic.getGlobalPluginsPath() + "amcharts/amcharts/images/export.png",
                    format: 'png'
                }]
            }*!/
        });

        $('#chart_6').closest('.portlet').find('.fullscreen').click(function() {
            chart.invalidateSize();
        });
    }*/

   /* initCharts = function (  )  {
        if (Morris.EventEmitter) {
            // Use Morris.Area instead of Morris.Line
            dashboardMainChart = Morris.Area({
                element: 'sales_statistics',
                padding: 0,
                behaveLikeLine: false,
                gridEnabled: false,
                gridLineColor: false,
                axes: false,
                fillOpacity: 1,
                data: [{
                    period: '2015 Q1',
                    sales: 1400,
                    profit: 400
                }, {
                    period: '2015 Q2',
                    sales: 1100,
                    profit: 600
                }, {
                    period: '2015 Q3',
                    sales: 1600,
                    profit: 500
                }, {
                    period: '2015 Q4',
                    sales: 1200,
                    profit: 400
                }, {
                    period: '2015 Q1',
                    sales: 1550,
                    profit: 800
                }],
                lineColors: ['#399a8c', '#92e9dc'],
                xkey: 'period',
                ykeys: ['sales', 'profit'],
                labels: ['企业', '比例'],
                pointSize: 0,
                lineWidth: 0,
                hideHover: 'auto',
                resize: true
            });

        }
    }*/

    redrawCharts =  function(  ) {
        dashboardMainChart.resizeHandler();
    };

    initMiniCharts =  function(  ) {

        // IE8 Fix: function.bind polyfill
        if ( !Function.prototype.bind) {
            Function.prototype.bind = function(oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function() {},
                    fBound = function() {
                        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }

        $("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
            type: 'bar',
            width: '100',
            barWidth: 6,
            height: '45',
            barColor: '#F36A5B',
            negBarColor: '#e02222'
        });

        $("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
            type: 'bar',
            width: '100',
            barWidth: 6,
            height: '45',
            barColor: '#5C9BD1',
            negBarColor: '#e02222'
        });
    };

    initDashboardWidget = function (  ) {
        jqueryMap.$task.change(function() {
            if ($(this).is(':checked')) {
                $(this).parents('li').addClass("task-done");
            } else {
                $(this).parents('li').removeClass("task-done");
            }
        });
    };

   /* initJQVMAP =  function(  ) {

        require(["esri/map",
                "dijit/TitlePane", "dijit/form/Button", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
                "dojo/domReady!"],
            function ( Map ) {

                /!* parser.parse();*!/
                esriConfig.defaults.io.proxyUrl = "../proxy.ashx";
                esriConfig.defaults.io.alwaysUseProxy = false;

                var  map = new esri.Map("mapDiv");
                var layer = new esri.layers.ArcGISTiledMapServiceLayer("http://60.29.110.104:6080/arcgis/rest/services/kgmap/MapServer");
                map.addLayer(layer);
                var resizeTimer;
                dojo.connect(map, 'onLoad', function(theMap) {
                    dojo.connect(dijit.byId('mapDiv'), 'resize', function() {
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function() {
                            map.resize();
                            map.reposition();
                        }, 500);
                    });
                });

            }
        );
    }*/

  /*  initJQVMAP =  function(  ) {



        if (!jQuery().vectorMap) {
            return;
        }

        var showMap = function(name) {
            jQuery('.vmaps').hide();
            jQuery('#vmap_' + name).show();
        }

        var setMap = function(name) {
            var data = {
                map: 'world_en',
                backgroundColor: null,
                borderColor: '#333333',
                borderOpacity: 0.5,
                borderWidth: 1,
                color: '#c6c6c6',
                enableZoom: true,
                hoverColor: '#c9dfaf',
                hoverOpacity: null,
                values: sample_data,
                normalizeFunction: 'linear',
                scaleColors: ['#b6da93', '#909cae'],
                selectedColor: '#c9dfaf',
                selectedRegion: null,
                showTooltip: true,
                onLabelShow: function(event, label, code) {

                },
                onRegionOver: function(event, code) {
                    if (code == 'ca') {
                        event.preventDefault();
                    }
                },
                onRegionClick: function(element, code, region) {
                    var message = 'You clicked "' + region + '" which has the code: ' + code.toUpperCase();
                    alert(message);
                }
            };

            data.map = name + '_en';
            var map = jQuery('#vmap_' + name);
            if (!map) {
                return;
            }
            map.width(map.parent().parent().width());
            map.show();
            map.vectorMap(data);
            map.hide();
        }

        setMap("world");
        setMap("usa");
        setMap("europe");
        setMap("russia");
        setMap("germany");
        showMap("world");

        jQuery('#regional_stat_world').click(function() {
            showMap("world");
        });

        jQuery('#regional_stat_usa').click(function() {
            showMap("usa");
        });

        jQuery('#regional_stat_europe').click(function() {
            showMap("europe");
        });
        jQuery('#regional_stat_russia').click(function() {
            showMap("russia");
        });
        jQuery('#regional_stat_germany').click(function() {
            showMap("germany");
        });

        $('#region_statistics_loading').hide();
        $('#region_statistics_content').show();
    },*/

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $task : $container.find( '.task-list input[type="checkbox"]' ),
            $table : $container.find('#enterpriserating')
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    configDataTable = function ( data ) {

        stateMap.dt =   jqueryMap.$table.DataTable( {
            "paginate": false,
            "filter": false,
            "info": false,
            "order": [[ 0, 'asc' ]],
            "fnRowCallback": function( nRow, aData, iDisplayIndex )
            {
                /* $('td:eq(4)', nRow).html( '<b>1</b>' );*/

                /*  $.each( stateMap.row_commands, function(i, item) {
                 var ind = i + stateMap.fields_length - 1;
                 console.log( 'ind', i, fields.length );
                 var temp = '<a class="edit" href="#" click=""  >' + item.FName + '</a>';
                 $('td:eq(' + ind + ')', nRow).html( temp );
                 });*/

            },
            "columnDefs":
                [
                    {
                        // The `data` parameter refers to the data for the cell (defined by the
                        // `data` option, which defaults to the column being worked with, in
                        // this case `data: 0`.
                        "render": function ( data, type, row ) {
                            /* return data +' ('+ row[3]+')';*/
                            /*  return  '<span class="label label-sm label-danger ">' +  row[8] + '</span>';*/
                            return  '<div class="number"><h3 class="font-blue-sharp">' + row[5] + '</h3> </div>';

                        },
                        "targets": 5
                    },
                    {
                        "render": function ( data, type, row ) {
                            if ( row[0] === 1 ){
                                return  '<span class="btn red">' +  row[0] +  '</span>';
                            }else if ( row[0]  === 2 ){
                                return  '<span class="btn blue">' +  row[0] +  '</span>';
                            }else if ( row[0]  === 3 ){
                                return  '<span class="btn yellow">' +  row[0] +  '</span>';
                            }else {
                                return  '<span class="btn default">' +  row[0] +  '</span>';
                            }
                        },
                        "searchable": false,
                        "orderable": true,
                        "targets": 0
                    }
                ],

            "processing": false,
            data: data.Data,
        } );

        /* stateMap.dt.on( 'order.dt search.dt', function () {
         stateMap.dt.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
         cell.innerHTML = i+1;
         } );
         } ).draw();*/

    };

    configTableStyle = function (  ) {
        jqueryMap.$table.find('tr').each(function(){ //for each row
            $(this).children('td , th').css('text-align', 'center');  //center the third column.
        });
    };

    initIndexData = function ( data ) {
        if ( data ) {
            $.each( data.Data, function ( i, item ) {
                item.unshift(i + 1);

            } )
        }
    };

    setDataTable = function () {
        var search = {
            Fields : [ 'EnterpriseName', 'EnterpriseScore', 'DangerousChemicalsScore', 'PractitionerCertificationScore',
                'TotalScore'
            ],
            Search : '1 = {0}',
            Values : [ '1' ],
            OrderFieldName : 'TotalScore',
            OrderType : 'desc',
            TopCount : 5
        };
        var arg_map = {
            data : search,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.rating.enterpriserating.getTableData( arg_map );
    };

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            initIndexData( data );
            configDataTable( data );
            configTableStyle(  );
            tjx.util.ui.stopPageLoading(  );
        }
    };

    onFail = function ( data ) {

    };

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
        tjx.util.ui.startPageLoading( );
       /* jQuery('.vmaps').each(function() {
            var map = jQuery(this);
            map.width(map.parent().width());
        });*/
        initCharts();
        initMiniCharts();
        initDashboardWidget();
        setDataTable();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule
    };
//------------------- END PUBLIC METHODS ---------------------
}());
