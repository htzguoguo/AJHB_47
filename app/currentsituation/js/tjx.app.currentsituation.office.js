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
tjx.app.currentsituation.office = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true }
        },
        stateMap = {
            $container : null,
            $select_table : null
        },
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

    configDataTable = function ( data, $table ) {
        tjx.util.ui.table.clearDataTable( $table );
        var options = tjx.util.ui.table.getCustomTableOptions( true, true, 30 );
        options.order =  [[ 2, "desc" ]];
        options.columnDefs =  [
            {
                "width": '20%',
                "targets": 0
            },
            {
                "width": '20%',
                "targets": 1
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-success">' + tjx.util.ui.input.getFixedFloat(row[2], 2) + '</span>';
                },
                "targets": 2
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-warning">' + tjx.util.ui.input.getFixedFloat(row[3], 2) + '</span>';
                },
                "targets": 3
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-info">' + tjx.util.ui.input.getFixedFloat(row[4], 2) + '</span>';
                },
                "targets": 4
            },
            {
                "width": '15%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-primary">' + tjx.util.ui.input.getFixedFloat(row[5], 2) + '</span>';
                },
                "targets": 5
            },
            {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.office.onShowInfo(\'' +  row[0] +  '\'' +   ');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 6
            }
        ];
        options.AutoWidth = false;
        options.data = data.Data;
        stateMap.dt =   $table.DataTable(  options  );
    }

    setDataTable = function ( event ) {
        var ser = event.data.search;
        var val = event.data.value;
        var tbl = event.data.table;
        stateMap.$select_table = tbl;
        tjx.util.ui.startPageLoading( );
        var search = {
            Fields : [ '楼宇名称',   '土地使用权人', '空置房间面积',  '出租房间面积','已售房间面积', '自用房间面积'],
            OrderFieldName : '空置房间面积',
            OrderType : 'desc'
        };
        search.Search = ser;
        search.Values = val;
        var arg_map = {
            data : search,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.currentsituation.detail.getLouyuSummary( arg_map );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $tal_unused : $container.find( '#unusedtable' ),
            $tal_normal : $container.find( '#normaltable' ),
            $tal_closed : $container.find( '#closetable' ),
            $tal_hostile : $container.find( '#hostiletable' ),
            $searchcontainer : $container.find( '#search' ),
            $btn_search : $container.find( '#btnsearch' ),
            $txt_searchvalue  : $container.find( '#searchvalue' ),
            $btn_normal : $container.find( '#normal' ),
            $btn_unused : $container.find( '#unused' ),
            $btn_closed : $container.find( '#closed' ),
            $btn_hostile : $container.find( '#hostile' )
        };
    };

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            configDataTable( data , stateMap.$select_table);
            tjx.util.ui.stopPageLoading(  );
        }
    }

    onFail = function ( data ) {

    }

    onShowInfo = function ( data ) {
       /* $.gevent.publish( 'tjx-currentsituation-showinfo',  data  );*/
        tjx.shell.publishEvent( 'tjx-currentsituation-office-showinfo',  [ data ]  );
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
       /* tjx.data.currentsituation.detail.getCategorySummary( { success : initCategorySummary, fail: onFail } )*/

        jqueryMap.$btn_unused.on( 'click',{
            search : ' 企业调查结果 = {0} ',
            value : ['涉租售企业'],
            table : jqueryMap.$tal_unused
        }, setDataTable );
        jqueryMap.$btn_normal.on( 'click',{
            search : ' 企业调查结果 = {0} ',
            value : ['未闲置'],
            table : jqueryMap.$tal_normal
        }, setDataTable );
        jqueryMap.$btn_closed.on( 'click',{
            search : ' 企业调查结果 = {0} or 企业调查结果 = {1} ',
            value : ['停产','不配合' ],
            table :jqueryMap.$tal_closed
        }, setDataTable );
        jqueryMap.$btn_hostile.on( 'click',{
            search : ' 企业调查结果 = {0} ',
            value : ['不配合'],
            table : jqueryMap.$tal_hostile
        }, setDataTable );

        jqueryMap.$btn_unused.trigger( 'click', {
            search : ' 企业调查结果 = {0} ',
            value : ['闲置'],
            table : jqueryMap.$tal_unused
        } );
       /* setDataTable();*/


        jqueryMap.$btn_search.on( 'click', function () {
            var vvv = jqueryMap.$txt_searchvalue.val();
            if (  vvv ){
                stateMap.dt.search( vvv ).column( 0 ).draw();
            }
          
        } );
        jqueryMap.$txt_searchvalue.on("keyup search input paste cut", function() {
            var vvv = jqueryMap.$txt_searchvalue.val();
          /*  if (  vvv ){
                stateMap.dt.search( vvv ).column( 0 ).draw();
            }*/

            stateMap.dt.search( vvv ).column( 0 ).draw();
        });

        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onShowInfo : onShowInfo
    };
//------------------- END PUBLIC METHODS ---------------------
}());
