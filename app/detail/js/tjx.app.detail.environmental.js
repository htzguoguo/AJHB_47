/**
 * Created by Administrator on 2016/8/29.
 */

tjx.app.detail.environmental = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue',
            data_source_tag : 'tjx-data-source',
            data_field_tag : 'tjx-data-field',
            data_order_tag : 'tjx-data-order'
        },
        stateMap = {
            $container : null,
            validator : null,
            $table : null,
            enterprise_name : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSearchData, onSuccess,
        onFail,
        setDataTable, onDataSuccess;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error



//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------



// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $basicinfo : $container.find( '#basicinfo' ),
            $search : $container.find( '#search' ),
            $searchvalue : $container.find( '#searchvalue' ),
            $caption : $container.find( '#title' ),
            $firsttable : $container.find( '#overview_1 table' )
        };
    };
// End DOM method /setJqueryMap/

    setDataTable = function ( $table ) {

        if ( $table ){
            var source = $table.attr(configMap.data_source_tag);
            var field = $table.attr(configMap.data_field_tag);
            var order = $table.attr(configMap.data_order_tag);
            var name = stateMap.enterprise_name;
            stateMap.$table =  $table;
            if ( source && field && name ) {
                var data = {
                    Fields : field.split(','),
                    Search : 'unitName = {0}',
                    Values : [ name ],
                    OrderFieldName : order,
                    OrderType : 'desc'
                };
                var arg_map = {
                    data : data,
                    success : onDataSuccess,
                    fail : onFail,
                    url : source
                };
                tjx.data.environmentalsearch.getDataTable( arg_map );
            }
        }
    }

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------

    onDataSuccess = function ( data ) {
        if ( data ) {

            var id = stateMap.$table.attr( 'id' );
            if ( $.fn.DataTable.isDataTable( '#' + id ) )
            {
                stateMap.$table.DataTable().clear().destroy();
            }

            var ddd = tjx.util.buildTableData(  data.EngFields, data.Data );
            var fields = data.ChsFields;
            if ( fields.length === 0 )
            {
                fields = data.EngFields;
            }

            stateMap.$table.DataTable( {
                "paginate": false,
                "filter": false,
                "info": false,
                "order": [],
                "pageLength": 25,
                "pagingType": "full_numbers",
                "language": {
                    "emptyTable": "当前没有满足条件的内容",
                    "info": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "infoEmpty": "没有满足条件的内容",
                    "infoFiltered": "(数据表中共为 _MAX_ 条记录)",
                    "lengthMenu": "每页显示 _MENU_ 条记录",
                    "search": "搜索:",
                    "zeroRecords": "没有满足条件的内容",
                    "paginate": {
                        "previous": "上一页",
                        "next": "下一页",
                        "last": "末页",
                        "first": "首页"
                    }
                },
                "processing": false,
                data: ddd,
                columns: fields,
                retrieve : true,
                destroy : true
            } );
        }
    }

// example: onClickButton = ...
    onSearchData = function ( event ) {
        var name = tjx.table.getSelectedKey();

        if ( name ){
          var data = {
                name : name
            };
            var arg_map = {
                data : data,
                success : onSuccess,
                fail : onFail
            };
            tjx.data.environmentalsearch.getEnvironmentalData( arg_map );
        }
    }

    onSuccess = function ( data  ) {
        stateMap.enterprise_name = data.unitName;
        if ( data.unitName ){
            tjx.util.setValuesFromData( jqueryMap.$basicinfo, data );
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
        onSearchData();

        jqueryMap.$container.off( 'shown.bs.tab' );
        jqueryMap.$container.on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            setDataTable($($(e.target).attr('href')).find( 'table' )) ;
        });

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
