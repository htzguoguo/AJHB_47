/**
 * Created by Administrator on 2016/3/24.
 */
/**
 * Created by Administrator on 2015/12/5.
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
tjx.data.onsitecheck.onsitecheck = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            save_url : '',
            add_url : 'SecurityInfoService/onsiteinspection',
            reply_url : 'SecurityInfoService/onsiteinspection/reply/',
            get_url : 'FMService/onsite/fddd/',
            get_stat_year_url : "FMService/onsite/stat/year",
            get_stat_month_url : "FMService/onsite/stat/month/",
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        addOnSiteCheck,
        addOnSiteReply,
        getOnSiteCheck,
        getOnSiteStatYear,
        getOnSiteStatMonth
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

    getOnSiteStatYear = function ( arg_map ) {
        tjx.util.io.getJsonData( configMap.get_stat_year_url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getOnSiteStatMonth = function ( arg_map ) {
        var url = configMap.get_stat_month_url + arg_map.month;
        tjx.util.io.getJsonData( url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getOnSiteCheck = function ( arg_map ) {
        var url = configMap.get_url + arg_map.datetype
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    addOnSiteCheck = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.add_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    addOnSiteReply  = function ( arg_map ) {
        var url = configMap.reply_url + arg_map.key;
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
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
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        addOnSiteCheck : addOnSiteCheck,
        addOnSiteReply : addOnSiteReply,
        getOnSiteCheck : getOnSiteCheck,
        getOnSiteStatYear : getOnSiteStatYear,
        getOnSiteStatMonth : getOnSiteStatMonth
    };
//------------------- END PUBLIC METHODS ---------------------
}());
