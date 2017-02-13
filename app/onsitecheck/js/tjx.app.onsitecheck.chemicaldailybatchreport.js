/**
 * Created by Administrator on 2016/3/27.
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
tjx.app.onsitecheck.chemicaldailybatchreport = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            validator : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail, getChemicalData, onChemicalSuccess,
        configDataTable ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

    getChemicalData = function (  ) {
        var para = tjx.shell.currentUserChsName();
        if ( para.length < 5 ) {
            para = tjx.table.getSelectedKey();
        }
        var search = {
            Fields : [  'ChemicalName', 'DailyDosageAmount', 'DailyDosageUnit', 'MaximumStockingCapacityAmount', 'MaximumStockingCapacityUnit', 'ChemicalCategory', 'ChemicalNum'  ],
            Search : 'EnterpriseName = {0}',
            Values : [ para ],
            OrderFieldName : 'RegistrationTime',
            OrderType : 'desc'
        };
        var arg_map = {
            data : search,
            success : onChemicalSuccess,
            fail : onFail
        };
        tjx.data.onsitecheck.chemicaldailyreport.searchChemicalData( arg_map );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $form : $container.find( '.form-horizontal' ),
            $formbody : $container.find( '.form-body' ),
            $send : $container.find( '#ok' ),
            $cancel : $container.find( '#cancel' ),
            $caption : $container.find( '.caption-subject' ),
            $chemicalname : $container.find( '*[tjx-data-field=DailyDosageAmount]' ),
            $dailydosage : $container.find( '*[tjx-data-field=MaximumStockingCapacityAmount]' ),
            $table : $container.find( '#batchreport' )

        };
    };
// End DOM method /setJqueryMap/

    configDataTable = function ( data ) {
        var options = tjx.util.ui.table.getNoSearchPagingTableOptions();
        options.data = data.Data;
        options.columnDefs = [
            {
                "render": function ( data, type, row ) {
                    return '	<input type="number" class="form-control  form-filter input-sm number-only" tjx-data-field="UsageName"  name="product_review_customer">';
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                     return '	<input type="number" class="form-control  form-filter input-sm number-only" tjx-data-field="DailyDosageAmount" name="product_review_customer">';
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return '	<input type="number" class="form-control  form-filter input-sm number-only" tjx-data-field="MaximumStockingCapacityAmount"  name="product_review_customer">';
                },
                "targets": 3
            }

          /*  {
                "render": function ( data, type, row ) {
                    return '	<input type="number" class="form-control form-filter input-sm number-only" tjx-data-field="MaximumStockingCapacityAmount" name="product_review_customer">';
                },
                "targets": 3
            }*/
        ];
        tjx.util.ui.table.clearDataTable( jqueryMap.$table );
        stateMap.dt =   jqueryMap.$table.DataTable( options );
    }

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------

    onChemicalSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            configDataTable( data );

            tjx.util.ui.input.initOnlyNumberInput( jqueryMap.$table );
        }
    }

// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();
        /*if ( tjx.util.ui.isInputEmpty( jqueryMap.$container.find( '*[tjx-data-field=DailyDosageAmount]' ) ) ||
             tjx.util.ui.isInputEmpty( jqueryMap.$container.find( '*[tjx-data-field=MaximumStockingCapacityAmount]' ) ) ){
            return false;
        }*/
        var data = [];
        jqueryMap.$table.find('tbody tr').each(function( index, item ){ //for each row
            var t = stateMap.return_value.Data[index];
           if ( t ) {
               data.push(
                   {
                       'ChemicalCategory' : t[5],
                       'ChemicalName' :t[0],
                       'ChemicalNum' : t[6],
                       'DailyDosageAmount' : $(this).children('td:eq(2)').children().val(),
                       'DailyDosageUnit' :t[2],
                       'MaximumStockingCapacityAmount' : $(this).children('td:eq(3)').children().val(),
                       'MaximumStockingCapacityUnit' : t[4],
                       'UsageName' : $(this).children('td:eq(1)').children().val()
                   }

               );
           }

        });
        var arg_map = {
            data : data,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.onsitecheck.chemicaldailyreport.addChemicalDailyBatchReport( arg_map );
    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '危化品登记完成。');
            jqueryMap.$cancel.trigger("click");

            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '危化品登记不成功，请重试。');
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
        var d = new Date();
        jqueryMap.$caption.html( tjx.table.getCommandTitle() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(上报时间：' + d.toLocaleDateString() + ')' );

        jqueryMap.$send.bind( 'click', onSumitData );

        getChemicalData();
        // jqueryMap.$cancel.bind( 'click', onCancelData );
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



