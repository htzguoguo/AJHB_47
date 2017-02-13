/**
 * Created by Administrator on 2016/4/21.
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
tjx.util.ui.table = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            table_language_options : {
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
            }
        },
        stateMap = {
            $container : null,
            stardard_table_options : {
                "bLengthChange" : false,
                "pageLength": 25,
                "pagingType": "full_numbers",
                "language": configMap.table_language_options,
                "fnRowCallback": null,
                "columnDefs": null,
                "processing": false,
                data: null,
                columns: null
            },
            nosearchnopaging_table_options : {
                "ordering": false,
                "info": false,
                "paginate": false,
                "filter": false,
                "bLengthChange" : false,
                "pageLength": 25,
                "pagingType": "full_numbers",
                "language": configMap.table_language_options,
                "fnRowCallback": null,
                "columnDefs": null,
                "processing": false,
                 data: null,
                columns: null
            }
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        getNoSearchPagingTableOptions, setTableContentCenter,
        clearDataTable,
        getStandardTableOptions,
        getCustomTableOptions,
        w_table_rowspan,
        fillTableWithData,
        initPopup
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
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

    initPopup = function () {
        $("[data-toggle='popover']").popover({ html : true});

        var p = $("[tjx-data-display='popover']").popover({ html : true});
        p.on("show.bs.popover", function(e){
            $( this ).data("bs.popover").tip().css({"max-width": "500px"});
        });
    };

    configModule = function ( input_map ) {
        tjx.util.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            config_map : configMap
        });
        return true;
    };
// End public method /configModule/

    getNoSearchPagingTableOptions = function (  ) {
        var options = tjx.util.copyObj( stateMap.nosearchnopaging_table_options );
        return options;
    };

    getStandardTableOptions =  function (  ) {
        var options = tjx.util.copyObj( stateMap.stardard_table_options );
        return options;
    };

    getCustomTableOptions =  function ( issearch, ispage, pagelength ) {
        var options = tjx.util.copyObj( stateMap.stardard_table_options );
        options.filter = issearch;
        options.paginate = ispage;
        options.pageLength = pagelength;
        return options;
    };

    setTableContentCenter = function ( $table ) {
        $table.find('tr').each(function(){ //for each row
            $(this).children('td , th').css('text-align', 'center');  //center the third column.
        });
    };

    clearDataTable = function ( $table ) {
        if ( $table.dataTable ){
            $table.DataTable().clear().destroy();
        }
    };

    //函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格 
    //参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data  
    //参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。 
    w_table_rowspan = function (_w_table_id, _w_table_colnum) {
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var _w_table_SpanNum = 0;
        var _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
        var _w_table_PreObj = $(_w_table_id + " tr td:nth-child(" + (_w_table_colnum == 1 ? 1 : _w_table_colnum - 1) + ")");
        var  _w_table_Prefirsttd = "";
        _w_table_Obj.each(function (i) {
            if (i == 0) {
                _w_table_firsttd = $(this);
                _w_table_Prefirsttd = $(_w_table_PreObj[0]);
                _w_table_SpanNum = 1;
            } else {
                _w_table_currenttd = $(this);
                if (_w_table_Prefirsttd.text() + "-" + _w_table_firsttd.text() == $(_w_table_PreObj[i]).text() + "-" + _w_table_currenttd.text()) {
                    if ($(_w_table_PreObj[i]).text() + "-" + _w_table_currenttd.text() != "-") {
                        _w_table_SpanNum++;
                        _w_table_currenttd.hide(); //remove();
                        _w_table_firsttd.attr("rowSpan", _w_table_SpanNum);
                    }
                } else {
                    _w_table_firsttd = $(this);
                    _w_table_Prefirsttd = $(_w_table_PreObj[i]);
                    _w_table_SpanNum = 1;
                }
            }
        });
    };

    fillTableWithData = function ( $table_container, $temp_tr, data ) {
        $table_container.find( 'tr:not( .display-hide )').remove();
        var i, len, items, item, obj, sublen, sub_i;
        len = data.length;
        items = data;
        for ( i = 0; i < len; i++) {
            item = items[ i ];
            var imgcontent = $temp_tr;
            var con = imgcontent.clone();
            con.removeClass( 'display-none' );
            con.removeAttr( 'id' );
            sublen = item.length;
            for ( sub_i = 0; sub_i < sublen; sub_i++ ) {
                con.find( 'td' ).eq(sub_i).html( item[sub_i] );
            }
            $table_container.append( con );
        }
    };

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
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        getNoSearchPagingTableOptions : getNoSearchPagingTableOptions,
        setTableContentCenter : setTableContentCenter,
        clearDataTable : clearDataTable,
        getStandardTableOptions : getStandardTableOptions,
        getCustomTableOptions : getCustomTableOptions,
        w_table_rowspan : w_table_rowspan,
        fillTableWithData : fillTableWithData,
        initPopup : initPopup
    };
//------------------- END PUBLIC METHODS ---------------------
}());

