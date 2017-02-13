/**
 * Created by Administrator on 2016/3/11.
 */
/**
 * Created by Administrator on 2016/1/3.
 */


tjx.testtable = ( function () {

    var
        configMap = {

        },
        stateMap = {
            $container : null
        },
        jqueryMap = {},
        initModule, initTable3,
        setDataTable, onDataSuccess, onFail,
        setJqueryMap;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------



//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $table : $container.find( '#sample_3' )
        };
    };
// End DOM method /setJqueryMap/

    setDataTable = function ( $table ) {
        if ( $table ){
            var source = 'FMService/chemical';
            var field = 'ChemicalName,ChemicalNum,Usage,DailyDosage,MaximumStockingCapacity,StorageSite';
            var order = 'RegistrationTime';
            var name = '测试帐号';
            stateMap.$table =  $table;


            if ( source && field && name ) {
                var data = {
                    Fields : field.split(','),
                    Search : 'EnterpriseName = {0}',
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
                tjx.data.safetysearch.getDataTable( arg_map );
            }
        }
    };

    initTable3 = function (  ) {
        setDataTable( jqueryMap.$table );
    };

    onDataSuccess = function ( data ) {
        if ( data ) {

            var id = stateMap.$table.attr( 'id' );
            if ( $.fn.DataTable.isDataTable( '#' + id ) )
            {
                stateMap.$table.DataTable().clear().destroy();
            }

         var datatable =   stateMap.$table.DataTable( {
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
                data: data.Data,
                columns: data.ChsFields,
                retrieve : true,
                destroy : true
            } );

            function format ( d ) {
                // `d` is the original data object for the row
                return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                    '<tr>'+
                    '<td>Full name:</td>'+
                    '<td>'+ ''  +'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Extension number:</td>'+
                    '<td>'+''+'</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Extra info:</td>'+
                    '<td>And any further details here (images etc)...</td>'+
                    '</tr>'+
                    '</table>';
            }

            var nCloneTh = document.createElement('th');
            nCloneTh.className = "table-checkbox";

            var nCloneTd = document.createElement('td');
            nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

            jqueryMap.$table.find('thead tr').each(function () {
                this.insertBefore(nCloneTh, this.childNodes[0]);
            });

            jqueryMap.$table.find('tbody tr').each(function () {
                this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
            });



           /* this.src.match('details_close')*/

            jqueryMap.$table.on('click', ' tbody td .row-details', function () {
                var tr = $(this).closest('tr');
                var row = datatable.row( tr );

                if ( row.child.isShown() ) {
                    // This row is already open - close it
                    row.child.hide();
                    $(this).addClass("row-details-close").removeClass("row-details-open");
                }
                else {
                    // Open this row
                    row.child( format(row.data()) ).show();
                    $(this).addClass("row-details-open").removeClass("row-details-close");
                }
            } );

           /* jqueryMap.$table.on('click', ' tbody td .row-details', function () {
                var nTr = $(this).parents('tr')[0];

                console.log( nTr );
                console.log($(this).html() , $(this).html() .match('details_close') );

                if (  $(this).html() .match('details_close')  ) {
                    /!* This row is already open - close it *!/
                    $(this).addClass("row-details-close").removeClass("row-details-open");
                    datatable.fnClose(nTr);
                } else {
                    /!* Open this row *!/
                    $(this).addClass("row-details-open").removeClass("row-details-close");
                    datatable.fnOpen(nTr, fnFormatDetails(datatable, nTr), 'details');
                }
            });*/
        }
    };

    onFail = function ( data ) {

    };

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
        setJqueryMap(  );
        initTable3();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        initModule : initModule
    };

} () );
