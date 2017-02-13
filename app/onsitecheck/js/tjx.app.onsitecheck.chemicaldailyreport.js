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
tjx.app.onsitecheck.chemicaldailyreport = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            validator : null,
            category : [],
            names : [],
            units : [],
            cas : []
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail,initChemicalData, initChemicalSelect,
        onDangerChemical;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

    initChemicalData = function ( data ) {
        $.each( data, function ( index, item ) {
            stateMap.category.push( item.Category );
            var items = [];
            $.each( item.Item, function ( index, name ) {
                items.push( name.Name );
                stateMap.units[ name.Name ] = name.ChsUnit;
                stateMap.cas[ name.Name ] = name.CAS;
            } )
            stateMap.names[ item.Category ] = items;
        } );

        initChemicalSelect();
    }

    initChemicalSelect = function (  ) {
        tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalcategory, stateMap.category );
        tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalname, stateMap.names[ jqueryMap.$danger_chemicalcategory.val() ] );
        jqueryMap.$danger_chemicalcategory.change( function () {
            tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalname, stateMap.names[ jqueryMap.$danger_chemicalcategory.val() ] , true );
            onDangerChemical();
        } );
        jqueryMap.$danger_chemicalname.change( function () {
            onDangerChemical();
        } );
        onDangerChemical();

    }



    onDangerChemical = function () {
        jqueryMap.$danger_chemicalnum.val( stateMap.cas[ jqueryMap.$danger_chemicalname.val() ] );
        jqueryMap.$daily_chemicalunit.val( stateMap.units[ jqueryMap.$danger_chemicalname.val() ] );
        jqueryMap.$left_chemicalunit.val( stateMap.units[ jqueryMap.$danger_chemicalname.val() ] );
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
            $chemicalname : $container.find( '*[tjx-data-field=ChemicalName]' ),
            $dailydosage : $container.find( '*[tjx-data-field=DailyDosage]' ),

            $danger_chemicalcategory :  $container.find( '#ChemicalCategory' ),
            $danger_chemicalname :  $container.find( '#ChemicalName' ),
            $danger_chemicalnum :  $container.find( '#ChemicalNum' ),
            $daily_chemicalunit :  $container.find( '#Daily_ChemicalUnit' ),
            $left_chemicalunit :  $container.find( '#Left_ChemicalUnit' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();
        if ( tjx.util.ui.isInputEmpty( jqueryMap.$chemicalname ) || tjx.util.ui.isInputEmpty( jqueryMap.$dailydosage ) ){
            return false;
        }
            var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );

            var arg_map = {
                data : data,
                success : onSuccess,
                fail : onFail
            };
            tjx.data.onsitecheck.chemicaldailyreport.addChemicalDailyReport( arg_map );


    }

    onCancelData = function ( event ) {
        var val =   jqueryMap.$form.validate();
        //  console.log('validate', val.validate());
    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showAlert( '系统提示' , '危化品登记完成。');
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
        jqueryMap.$caption.html( tjx.table.getCommandTitle() );
        jqueryMap.$send.bind( 'click', onSumitData );

        tjx.data.onsitecheck.chemicaldailyreport.getChemicalData( initChemicalData );
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


