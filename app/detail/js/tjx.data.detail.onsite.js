/**
 * Created by Administrator on 2016/3/17.
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
tjx.data.detail.onsite = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            save_url : '',
            get_file_url : 'FileService/file/',
            url_onsite : 'FMService/onsite/warning'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        getAttachFiles,
        getOnSiteCheck
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,

        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    getAttachFiles = function ( arg_map ) {

        var url = configMap.get_file_url + arg_map.data.num + '/'  + arg_map.data.status;
        tjx.util.io.getJsonData( url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );

    }

    getOnSiteCheck = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url_onsite, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
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
        getAttachFiles : getAttachFiles,
        getOnSiteCheck : getOnSiteCheck
    };
//------------------- END PUBLIC METHODS ---------------------
}());
