/**
 * Created by Administrator on 2016/4/7.
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
tjx.app.rating.itemrating = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {

        },
        stateMap = {
            $container : null,
            stat : {
                enterprise : 0,
                specialitem : 0
            },
            searchitem : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        configDataTable,
        setDataTable, onSuccess, onFail,
        configTableStyle, initIndexData, configStat;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    /* <button id="sample_editable_1_new" class="btn green">
     Add New <i class="fa fa-plus"></i>
     </button>*/
    /*$('#ajax-demo').on('click', function(){
     // create the backdrop and wait for next modal to be triggered
     $('body').modalmanager('loading');

     setTimeout(function(){
     $modal.load('ui_extended_modals_ajax_sample.html', '', function(){
     $modal.modal();
     });
     }, 1000);
     });*/

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
                            return  '<div class="number"><h3 class="font-blue-sharp">' + row[2] + '</h3> </div>';

                        },
                        "targets": 2
                    },
                    {
                        "render": function ( data, type, row ) {
                            if ( row[0] === 1 ){
                                return  ' <div id="pulsate-regular" style="padding: 5px; outline: rgba(191, 28, 86, 0.498039) solid 2px; box-shadow: rgba(191, 28, 86, 0.498039) 0px 0px 6px; outline-offset: 10px;">' + row[1] + '  </div>';
                            }else{
                                return  '<span class="btn default btn-xs blue-stripe">' + row[1] + '</span>';
                            }

                        },
                        "targets": 1
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
                ++ stateMap.stat.enterprise;
             /*   stateMap.stat.specialitem =  stateMap.stat.specialitem + Number(item[1]);*/
                item.unshift(i + 1);

            } )
        }
    }

    configStat = function (  ) {
        jqueryMap.$enterprise.html( stateMap.stat.enterprise + '(家)'  );
      /*  jqueryMap.$specialitem.html( stateMap.stat.specialitem   );*/
    }


//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    setDataTable = function () {
        var search = {
            Fields : [ 'EnterpriseName', stateMap.searchitem
            ],
            Search : '1 = {0}',
            Values : [ '1' ],
            OrderFieldName : stateMap.searchitem,
            OrderType : 'desc'
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
            configStat(  );
            tjx.util.ui.stopPageLoading(  );
        }
    }

    onFail = function ( data ) {

    }

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $caption : $container.find( '#caption' ),
            $table : $container.find('.table'),
            $enterprise : $container.find( '#enterprise' ),
            $specialitem : $container.find( '#specialitem' )
        };
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
    initModule = function ( $container, item  ) {
        stateMap.searchitem = item;
        stateMap.$container = $container;
        setJqueryMap();
        jqueryMap.$caption.append( tjx.index3.getTitle() );
        tjx.util.ui.startPageLoading( );
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
