/**
 * Created by Administrator on 2016/1/15.
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
tjx.delete_confirm = (function () {
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
        onFail;
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
            $send : $container.find( '#ok' ),
            $cancel : $container.find( '#cancel' ),
            $caption : $container.find( '.caption-subject' ),
            $title : $container.find('.control-label')
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();

            var data = {
                key : tjx.table.getSelectedKey(),
                para : tjx.table.getCommandPara()
            };



            var arg_map = {
                data : data,
                success : onSuccess,
                fail : onFail
            };
            tjx.data.delete_confirm.deleteData( arg_map );


    };

    onCancelData = function ( event ) {
        var val =   jqueryMap.$form.validate();
        //  console.log('validate', val.validate());
    };

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , data.Desc);
            jqueryMap.$cancel.trigger("click");

            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , data.Desc);
        }
    };

    onFail = function ( data ) {

    };
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
        jqueryMap.$title.html( tjx.table.getCommandDesc() );

        jqueryMap.$send.bind( 'click', onSumitData );
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


