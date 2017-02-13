/**
 * Created by Administrator on 2016/4/9.
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
tjx.app.securityinfo.safetyhome = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            data2 : null,
            data3 : null,
            dataset : null,
            options : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSuccess,setDataTable, configTableStyle,
        initIndexData,configDataTable,
        onFail, gd, initPlotData, setPlot;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

    gd =  function ( year, month, day ) {
        return new Date(year, month - 1, day).getTime();
    }

    initPlotData = function (  ) {
        stateMap.data2 = [
            [gd(2015, 11, 1), 7], [gd(2015, 11, 2), 6], [gd(2015, 11, 3), 4], [gd(2015, 11, 4), 8],
            [gd(2015, 11, 5), 9], [gd(2015, 11, 6), 7], [gd(2015, 11, 7), 5], [gd(2015, 11, 8), 4],
            [gd(2015, 11, 9), 7], [gd(2015, 11, 10), 8], [gd(2015, 11, 11), 9], [gd(2015, 11, 12), 6],
            [gd(2015, 11, 13), 4], [gd(2015, 11, 14), 5], [gd(2015, 11, 15), 11], [gd(2015, 11, 16), 8],
            [gd(2015, 11, 17), 8], [gd(2015, 11, 18), 11], [gd(2015, 11, 19), 11], [gd(2015, 11, 20), 6],
            [gd(2015, 11, 21), 6], [gd(2015, 11, 22), 8], [gd(2015, 11, 23), 11], [gd(2015, 11, 24), 13],
            [gd(2015, 11, 25), 7], [gd(2015, 11, 26), 9], [gd(2015, 11, 27), 9], [gd(2015, 11, 28), 8],
            [gd(2015, 11, 29), 5], [gd(2015, 11, 30), 8], [gd(2015, 11, 31), 25]
        ];

        stateMap.data3 = [
            [gd(2015, 11, 1), 800], [gd(2015, 11, 2), 500], [gd(2015, 11, 3), 600], [gd(2015, 11, 4), 700],
            [gd(2015, 11, 5), 500], [gd(2015, 11, 6), 456], [gd(2015, 11, 7), 800], [gd(2015, 11, 8), 589],
            [gd(2015, 11, 9), 467], [gd(2015, 11, 10), 876], [gd(2015, 11, 11), 689], [gd(2015, 11, 12), 700],
            [gd(2015, 11, 13), 500], [gd(2015, 11, 14), 600], [gd(2015, 11, 15), 700], [gd(2015, 11, 16), 786],
            [gd(2015, 11, 17), 345], [gd(2015, 11, 18), 888], [gd(2015, 11, 19), 888], [gd(2015, 11, 20), 888],
            [gd(2015, 11, 21), 987], [gd(2015, 11, 22), 444], [gd(2015, 11, 23), 999], [gd(2015, 11, 24), 567],
            [gd(2015, 11, 25), 786], [gd(2015, 11, 26), 666], [gd(2015, 11, 27), 888], [gd(2015, 11, 28), 900],
            [gd(2015, 11, 29), 178], [gd(2015, 11, 30), 555], [gd(2015, 11, 31), 993]
        ];


        stateMap.dataset = [
            {
                label: "库存",
                data:  stateMap.data3,
                color: "#1ab394",
                bars: {
                    show: true,
                    align: "center",
                    barWidth: 24 * 60 * 60 * 600,
                    lineWidth:0
                }

            }, {
                label: "使用量",
                data:  stateMap.data2,
                yaxis: 2,
                color: "#1C84C6",
                lines: {
                    lineWidth:1,
                    show: true,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.2
                        }, {
                            opacity: 0.4
                        }]
                    }
                },
                splines: {
                    show: false,
                    tension: 0.6,
                    lineWidth: 1,
                    fill: 0.1
                },
            }
        ];


        stateMap.options = {
            xaxis: {
                mode: "time",
                tickSize: [3, "day"],
                tickLength: 0,
                axisLabel: "Date",
                timeformat: "%m月%d日",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 10,
                color: "#d5d5d5"
            },
            yaxes: [{
                position: "left",
                max: 1070,
                color: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Arial',
                axisLabelPadding: 3
            }, {
                position: "right",
                clolor: "#d5d5d5",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: ' Arial',
                axisLabelPadding: 67
            }
            ],
            legend: {
                noColumns: 1,
                labelBoxBorderColor: "#000000",
                position: "nw"
            },
            grid: {
                hoverable: false,
                borderWidth: 0
            }
        };
    }

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
                            return  '<div class="number"><h3 class="font-blue-sharp">' + row[8] + '</h3> </div>';

                        },
                        "targets": 8
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

    }

    configTableStyle = function (  ) {
        jqueryMap.$table.find('tr').each(function(){ //for each row
            $(this).children('td , th').css('text-align', 'center');  //center the third column.
        });
    }

    initIndexData = function ( data ) {
        if ( data ) {
            $.each( data.Data, function ( i, item ) {
                item.unshift(i + 1);

            } )
        }
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/

    setPlot = function (  ) {
        $.plot(jqueryMap.$plot, stateMap.dataset, stateMap.options);
    }

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $plot : $container.find( "#flot-dashboard-chart" ),
            $table : $container.find('.table'),
            $search : $container.find( '.search' ),
            $searchinput : $container.find( '#chemicalsearch' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    setDataTable = function () {
        var search = {
            Fields : [ 'EnterpriseName', 'DangerousChemicalsScore', 'PractitionerCertificationScore',
                'SafetyEquipmentScore', 'SpecialEquipmentScore', 'HazardIdentificationScore',
                'SafetyInspectionRecordsScore', 'TotalScore'
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
    }

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            initIndexData( data );
            configDataTable( data );
            configTableStyle(  );
            tjx.util.ui.stopPageLoading(  );
        }
    }

    onFail = function ( data ) {

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
        initPlotData();
        setPlot();
        setDataTable();

        jqueryMap.$search.click( function (  ) {
          /* alert( jqueryMap.$searchinput.val() ); */
        } );
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



