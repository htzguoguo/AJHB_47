/**
 * Created by Administrator on 2016/4/22.
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
tjx.util.ui.input = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {

        },
        stateMap = {
            $container : null
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        initOnlyNumberInput,
        getFixedFloat,
        getFixedFloat1
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
    configModule = function ( input_map ) {
        tjx.util.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            config_map : configMap
        });
        return true;
    };
// End public method /configModule/

    initOnlyNumberInput = function ( $container ) {
        $container.find('.number-only').keypress(function(e) {
                if(isNaN(this.value+""+String.fromCharCode(e.charCode))) return false;
            })
            .on("cut copy paste",function(e){
                e.preventDefault();
            });
    };

    getFixedFloat = function ( value, fixedNumber ) {
        var result = '';
        if ( $.isNumeric(value) ){
            var num = new Number(value);
            result = num.toFixed( fixedNumber );
        }
        return result;
    };

    getFixedFloat1  = function ( value, fixedNumber ) {
        var result = 0;
        if ( $.isNumeric(value) ){
            var num = new Number(value);
            result = num.toFixed( fixedNumber );
        }
        return result;
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
        initOnlyNumberInput : initOnlyNumberInput,
        getFixedFloat : getFixedFloat,
        getFixedFloat1 : getFixedFloat1
    };
//------------------- END PUBLIC METHODS ---------------------
}());

