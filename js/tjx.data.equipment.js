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
tjx.data.equipment = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            save_url : '',
            add_url : 'SecurityInfoService/equipment/ddc',
            get_url : 'SecurityInfoService/equipment/ddc',
            get_data_url : 'SecurityInfoService/equipment/key/',
            update_url : 'SecurityInfoService/equipment/'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        addEquipmentInfo, updateSecurityInfo,
        getDeviceNames,
        getEquipmentInfo,
        updateEquipmentInfo
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

    addEquipmentInfo = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.add_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    getDeviceNames = function ( arg_map ) {
        var url = configMap.get_url;
        tjx.util.io.getJsonData( url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    getEquipmentInfo = function ( arg_map ) {
        var url = configMap.get_data_url + arg_map.data.key;
        tjx.util.io.getJsonData( url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    updateEquipmentInfo = function ( arg_map ) {
        var url = configMap.update_url + arg_map.key;
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.updateJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

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
        addEquipmentInfo : addEquipmentInfo,
        getDeviceNames : getDeviceNames,
        getEquipmentInfo : getEquipmentInfo,
        updateEquipmentInfo : updateEquipmentInfo
    };
//------------------- END PUBLIC METHODS ---------------------
}());
