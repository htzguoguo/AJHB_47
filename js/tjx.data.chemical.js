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
tjx.data.chemical = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            save_url : '',
            add_url : 'SecurityInfoService/chemical/aaa',
            chemical_url : 'para/chemicalcategory.json',
            chemical_name_cas_url : 'para/chemicalnamecas.json',
            get_url : 'SecurityInfoService/chemical/',
            get_chemical_url : 'FMService/chemical/'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        addChemicalInfo,
        getChemicalCategoryData, getChemicalNameCas,
        getChemicalInfo,
        updateChemicalInfo,
        getChemicalData
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

    addChemicalInfo = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.add_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    getChemicalCategoryData = function ( callback ) {
        $.getJSON( configMap.chemical_url, null, callback);
    };

    getChemicalNameCas = function ( callback ) {
        $.getJSON( configMap.chemical_name_cas_url, null, callback);
    };

    getChemicalInfo = function ( arg_map ) {
        var url = configMap.get_url + arg_map.data.key;
        tjx.util.io.getJsonData( url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    updateChemicalInfo = function ( arg_map ) {
        var url = configMap.get_url + arg_map.key;
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.updateJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    };

    getChemicalData  = function ( arg_map ) {
        var url = configMap.get_chemical_url + arg_map.datetype + '/' + arg_map.grouptype;
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
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
        addChemicalInfo : addChemicalInfo,
        getChemicalCategoryData : getChemicalCategoryData,
        getChemicalNameCas : getChemicalNameCas,
        getChemicalInfo : getChemicalInfo,
        updateChemicalInfo : updateChemicalInfo,
        getChemicalData : getChemicalData
    };
//------------------- END PUBLIC METHODS ---------------------
}());
