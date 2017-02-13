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
tjx.data.rating.enterpriserating = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            get_url : 'FMService/enterpriserating',
            get_top_url :  'FMService/enterpriserating/top',
            get_onsite_url : 'FMService/onsite/warning',
            get_cert_url : 'FMService/certification',
            get_special_url : 'FMService/specialequipment',
            get_inspect_url : 'FMService/safetyinspection'
        },
        stateMap = {
            $container : null
        },
        jqueryMap = {
        },
        setJqueryMap, configModule, initModule,
        getTableData,
        getTableDataByCount,
        getOnSiteCheck,
        getCert,
        getSpecial,
        getInspect
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

    getTableData = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.get_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getTableDataByCount= function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        var url = configMap.get_top_url + '/' + arg_map.count;
        tjx.util.io.addJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getOnSiteCheck = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.get_onsite_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getCert = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.get_cert_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getSpecial = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.get_special_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getInspect = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.get_inspect_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

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
        getTableData : getTableData,
        getTableDataByCount: getTableDataByCount,
        getOnSiteCheck : getOnSiteCheck,
        getCert : getCert,
        getSpecial : getSpecial,
        getInspect : getInspect
    };
//------------------- END PUBLIC METHODS ---------------------
}());