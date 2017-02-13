/**
 * Created by Administrator on 2016/7/2.
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
tjx.app.currentsituation.detail = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true }
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        setDataTable,
        onSuccess,
        onFail,
        configDataTable,
        onShowInfo
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    configDataTable = function ( data ) {
        tjx.util.ui.table.clearDataTable( jqueryMap.$table );
        var options = tjx.util.ui.table.getNoSearchPagingTableOptions( );
        options.order =  [[ 2, "desc" ]];
        options.buttons = [
            {
                text: '下载<i class="fa fa-download" style="margin: 3px;"></i>',
                className : 'btn blue ',
                extend: 'excel',
                exportOptions: {
                    columns: [0,1,2,3,4,5]
                }
            },
            {
                /*   text: '<i class="icon-printer">打印</i>',*/
                text: '打印<i class="fa fa-print" style="margin: 3px;"></i>',
                className: 'btn blue ',
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                /*   text: '<i class="icon-printer">打印</i>',*/
                text: '导出<i class="fa fa-file-excel-o" style="margin: 3px;"></i>',
                className : 'btn blue ',
                action: function ( e, dt, node, config ) {
                }
            }
        ];
        options.AutoWidth = false;
        options.columnDefs =  [
            {
                "width": '30%',
                "targets": 0
            },
            {
                "width": '15%',
                "targets": 1
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-success">' + row[2] + '</span>';
                },
                "targets": 2
            },
           /* {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-warning">' + row[3] + '</span>';
                },
                "targets": 3
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-info">' + row[4] + '</span>';
                },
                "targets": 4
            },*/
            {
                "width": '15%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-primary">' + row[3] + '</span>';
                },
                "targets": 3
            },
           /* {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.detail.onShowInfo(\'' +  row[0] +  '\'' +   ');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 6
            }*/
            {
                "width": '10%',
                "render": function ( data, type, row ) {
                    var unitid = row[4];
                    var zid = row[5];
                    var field, value;
                    if ( zid ) {
                        field = "ZID";
                        value = zid;
                    }else{
                        field = "unitID";
                        value = unitid;
                    }
                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.detail.onShowInfo(\'' +  field +  '\',\'' + value  +  '\');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 4
            }
        ];

        options.data = data.Data;
        stateMap.dt =   jqueryMap.$table.DataTable(  options  );

        if ( stateMap.dt.buttons ) {
            stateMap.dt.buttons().container().appendTo( '#searchbuttons' );
        }

    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $table : $container.find( '#table' ),
            $searchcontainer : $container.find( '#search' ),
            $btn_search : $container.find( '#btnsearch' )
        };
    };

    setDataTable = function ( src, values ) {
        tjx.util.ui.startPageLoading( );
        var search = {
            Fields : [ '企业名称',   '厂房名称', '空置房屋名称及面积', '厂房主门高度', 'unitID', 'ZID'],
            OrderFieldName : '空置房屋名称及面积',
            OrderType : 'desc'
        };
        if ( src  ){
            search.Search  =   src;
            search.Values = values;

        }else
        {
            search.Search = '1 = {0} ';
            search.Values = [ 1 ];
        }

        var arg_map = {
            data : search,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.currentsituation.detail.getDataTable( arg_map );
    }

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            configDataTable( data );
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
        spa.butil.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            config_map : configMap
        });
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
        setDataTable();
        jqueryMap.$btn_search.on( 'click', function ( ) {
            var str = '';
            var values = [];
            var ind = 0;
            var i ,len;
            jqueryMap.$searchcontainer.find( 'label.active[tjx-table-search]' ).each( function ( index, element) {
                var ss = $(this).attr( 'tjx-table-search' );
                var vv = $(this).attr( 'tjx-table-value' );
                if(  ss && vv) {
                    if ( vv.indexOf( ',' ) > -1 ){
                        var pp = vv.split( ',' );
                        len = pp.length;
                        for ( i = 0; i < len; i++) {
                            ss = ss.replace( '*', ind.toString() );
                            values[ind] = pp[i];
                            ind ++;
                        }
                    }
                    else
                    {
                        ss = ss.replace( '*', ind.toString() );
                        values[ind] = vv;
                        ind++;
                    }
                    if ( index === 0 ){
                        str +=   ss;
                    }else
                    {
                        str += '  and ' + ss;
                    }
                }

            } );
            setDataTable( str, values  );
        } );

        return true;
    };

    onShowInfo = function ( field, value ) {     
     /*   $.gevent.publish( 'tjx-currentsituation-showinfo', [ data ] );*/
      /*  tjx.shell.publishEvent( 'tjx-currentsituation-showinfo',  [ data ]  );*/


        tjx.shell.publishEvent( 'tjx-currentsituation-showinfo',  [ field, value ]  );
    }

// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onShowInfo : onShowInfo,
        setDataTable : setDataTable
    };
//------------------- END PUBLIC METHODS ---------------------
}());
