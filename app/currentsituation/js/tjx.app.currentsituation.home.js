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
tjx.app.currentsituation.home = (function () {
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
        initCategorySummary,
        initUnused,
        onUnusedSuccess,
        initNormal,
        onNormalSuccess,
        onShowInfo,
        initOther,
        onOthersSuccess
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    configDataTable = function ( data ) {
        tjx.util.ui.table.clearDataTable( jqueryMap.$table );
        var options = tjx.util.ui.table.getCustomTableOptions( true, true, 30 );
        options.order =  [[ 2, "desc" ]];
        options.columnDefs =  [
            {
                "className": 'tjx-ul-li-no-bottom',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-success">' + row[2] + '</span>';
                },
                "targets": 2
            },
            {
                "className": 'tjx-ul-li-no-bottom',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-warning">' + row[3] + '</span>';
                },
                "targets": 3
            },
            {
                "render": function ( data, type, row ) {

                    return   '<span class="label label-info">' + row[4] + '</span>';
                },
                "targets": 4
            },
            {
                "render": function ( data, type, row ) {

                    return   '<span class="label label-primary">' + row[5] + '</span>';
                },
                "targets": 5
            }
        ];
        options.AutoWidth = false;
        options.data = data.Data;
        stateMap.dt =   jqueryMap.$table.DataTable(  options  );
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
            $btn_search : $container.find( '#btnsearch' ),
            $btn_normal : $container.find( '#normal' ),
            $btn_unused : $container.find( '#unused' ),
            $btn_closed : $container.find( '#closed' ),
            $btn_hostile : $container.find( '#hostile' ),
            $tal_unused : $container.find( '#unusedtable' ),
            $tal_normal : $container.find( '#normaltable' ),
            $btn_search : $container.find( '#search' ),
            $txt_searchvalue  : $container.find( '#searchvalue' )
        };
    };

    initCategorySummary = function ( data ) {

    }

    initUnused = function ( event ) {
        var val = event.data.value;
        var tbl = event.data.table;
        stateMap.$select_table = tbl;
        var search = {
            Fields : [   '土地使用权人', '填报日期', '已建成房屋建筑面积',  'cc', 'unitID', 'ZID' ],
            OrderFieldName : 'cc',
            OrderType : 'desc'
        };
        search.Search = '企业调查结果 = {0} ';
        search.Values = [ val ];


        var arg_map = {
            data : search,
            success : onUnusedSuccess,
            fail : onFail
        };
        tjx.data.currentsituation.detail.getQiYeKDDataTable( arg_map );
    }

    initNormal = function ( event ) {
        var val = event.data.value;
        var tbl = event.data.table;
        stateMap.$select_table = tbl;
        var search = {
            Fields : [   '土地使用权人', '地址', '实际企业法人及联系电话', '土地面积',  '已建成房屋建筑面积', 'unitID', 'ZID' ],
            OrderFieldName : '土地使用权人',
            OrderType : 'desc'
        };
        search.Search = '企业调查结果 = {0} ';
        search.Values = [ val ];
        var arg_map = {
            data : search,
            success : onNormalSuccess,
            fail : onFail
        };
        tjx.data.currentsituation.detail.getQiYeDataTable( arg_map );
    }

    initOther = function ( event ) {
        var val = event.data.value;
        var tbl = event.data.table;
        stateMap.$select_table = tbl;
        var search = {
            Fields : [   '土地使用权人', '地址', '实际企业法人及联系电话', '土地面积',  '已建成房屋建筑面积', 'unitID', 'ZID' ],
            OrderFieldName : '土地使用权人',
            OrderType : 'desc'
        };
        search.Search = '企业调查结果 = {0} or 企业调查结果 = {1} ';
        search.Values = [ '停产', '不配合' ];
        var arg_map = {
            data : search,
            success : onOthersSuccess,
            fail : onFail
        };
        tjx.data.currentsituation.detail.getQiYeDataTable( arg_map );
    }

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onNormalSuccess = function ( data ) {
        var tbl = jqueryMap.$container.find( stateMap.$select_table );
        tjx.util.ui.table.clearDataTable( tbl );
        var options = tjx.util.ui.table.getCustomTableOptions( true, false, 30 );
        options.AutoWidth = false;
        options.data = data.Data;
        options.columnDefs =  [
            {
                "width": '15%',
                "targets": 3,
                "render": function ( data, type, row ) {

                    return    tjx.util.ui.input.getFixedFloat(row[3],2) ;
                }
            },
            {
                "width": '15%',
                "targets": 4,
                "render": function ( data, type, row ) {

                    return    tjx.util.ui.input.getFixedFloat(row[4],2) ;
                }
            },
            /*{
                "render": function ( data, type, row ) {

                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.home.onShowInfo(\'' +  row[0] +  '\'' +   ');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 5
            }*/
            {
                "width": '10%',
                "render": function ( data, type, row ) {
                    var unitid = row[5];
                    var zid = row[6];
                    var field, value;
                    if ( zid ) {
                        field = "ZID";
                        value = zid;
                    }else{
                        field = "unitID";
                        value = unitid;
                    }
                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.home.onShowInfo(\'' +  field +  '\',\'' + value  +  '\');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 5
            }
        ];
        stateMap.dt =   tbl.DataTable(  options  );

    }

    onOthersSuccess = function ( data ) {
        var tbl = jqueryMap.$container.find( stateMap.$select_table );
        tjx.util.ui.table.clearDataTable( tbl );
        var options = tjx.util.ui.table.getCustomTableOptions( true, false, 30 );
        options.AutoWidth = false;
        options.data = data.Data;
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
                "width": '15%',
                "targets": 2
            },
            {
                "width": '15%',
                "targets": 3,
                "render": function ( data, type, row ) {

                    return    tjx.util.ui.input.getFixedFloat(row[3],2) ;
                }
            },
            {
                "width": '15%',
                "targets": 4,
                "render": function ( data, type, row ) {

                    return    tjx.util.ui.input.getFixedFloat(row[4],2) ;
                }
            },
          /*  {
                "width": '10%',
                "render": function ( data, type, row ) {

                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.home.onShowInfo(\'' +  row[0] +  '\'' +   ');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 5
            }*/
            {
                "width": '10%',
                "render": function ( data, type, row ) {
                    var unitid = row[5];
                    var zid = row[6];
                    var field, value;
                    if ( zid ) {
                        field = "ZID";
                        value = zid;
                    }else{
                        field = "unitID";
                        value = unitid;
                    }
                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.home.onShowInfo(\'' +  field +  '\',\'' + value  +  '\');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 5
            }
        ];
        stateMap.dt =   tbl.DataTable(  options  );

    }

    onUnusedSuccess = function ( data ) {
        var tbl = jqueryMap.$container.find( stateMap.$select_table );
        tjx.util.ui.table.clearDataTable( tbl );
        var options = tjx.util.ui.table.getCustomTableOptions( true, false, 30 );
        options.order =  [[ 3, "desc" ]];
        options.columnDefs =  [
            {
                "width": '25%',
                "targets": 0
            },
            {
                "width": '10%',
                "targets": 1
            },
            {
                "width": '15%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-success">' + tjx.util.ui.input.getFixedFloat(row[2],2) + '</span>';
                },
                "targets": 2
            },
            {
                "width": '15%',
                "render": function ( data, type, row ) {

                    return   '<span class="label label-warning">' + tjx.util.ui.input.getFixedFloat(row[3],2) + '</span>';
                },
                "targets": 3
            },
            {
                "width": '25%',
                "render": function ( data, type, row ) {

                    if ( $.isNumeric( row[2])  && $.isNumeric( row[3] ) && Number( row[2]) > 0 ){
                        var t =  Number( row[3] ) / Number( row[2] );
                        t = (t * 100).toFixed(2);
                        if ( t > 0 ){
                            var temp = '<div class="p-progress">';
                            temp += '<div class="progress progress-xs">';
                            temp += '<div style="width:' + t.toString() +  '%;" class="progress-bar progress-bar-success">';
                            temp += '</div>';
                            temp += '</div>';
                            temp += '<small>' + t.toString() +  '% 闲置率 </small>';
                            temp += '</div>';
                            return  temp;
                        }else
                        {
                            return '';
                        }
                    }else {
                        return '';
                    }

                  /*  return   '<span class="label label-info">' + row[4] + '</span>';*/
                    /*<div class="progress progress-xs">
                        <div style="width: 95%;" class="progress-bar progress-bar-success"></div>
                        </div>
                        <small>95% 闲置率 </small>*/
                },
                "targets": 4
            },
            {
                "width": '20%',
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
                    return   ' <a href="javascript:void(0);" onclick="tjx.app.currentsituation.home.onShowInfo(\'' +  field +  '\',\'' + value  +  '\');" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> 查看 </a>';
                },
                "targets": 5
            }
        ];
        options.AutoWidth = false;
        options.data = data.Data;
        stateMap.dt =   tbl.DataTable(  options  );

    }

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            configDataTable( data );
            tjx.util.ui.stopPageLoading(  );
        }
    }

    onFail = function ( data ) {
        var len, i;
        if ( data && data.Data && data.Data.length > 0 ){
            len = data.Data.length;
            for ( i = 0; i < len; i++ ){

            }
        }
    }

    onShowInfo = function ( field, value ) {
       /* $.gevent.publish( 'tjx-currentsituation-showinfo',  data  );*/
        tjx.shell.publishEvent( 'tjx-currentsituation-showinfo',  [ field, value ]  );
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

        jqueryMap.$btn_unused.on( 'click',{ value : '涉租企业', table : '#unusedtable' }, initUnused );
        jqueryMap.$btn_normal.on( 'click',{ value : '自用企业', table : '#normaltable' }, initUnused );
        jqueryMap.$btn_closed.on( 'click',{ value : '停产', table : '#closetable' }, initOther );
        jqueryMap.$btn_hostile.on( 'click',{ value : '不配合', table : '#hostiletable' }, initOther );
       /* jqueryMap.$container.on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            var id = $(e.target).attr('id');
            if ( id === 'normal' ){
                initNormal();
            }else if ( id === 'unused' ){
                initUnused();
            }
        })*/

       /* jqueryMap.$container.on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            var id = $(e.target).attr('id');
            if ( id === 'normal' ){
                initNormal();
            }else if ( id === 'unused' ){
                initUnused();
            }

        });*/

        jqueryMap.$btn_unused.trigger( 'click' );
        /*initUnused();*/

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
        /*setDataTable();



        jqueryMap.$btn_search.on( 'click', function ( ) {
            var str = '';
            var values = [];
            var ind = 0;
            var i ,len;
            jqueryMap.$searchcontainer.find( 'label.active' ).each( function ( index, element) {
                var ss = $(this).attr( 'tjx-table-search' );
                var vv = $(this).attr( 'tjx-table-value' );
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
            } );
            setDataTable( str, values  );
        } );*/

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
