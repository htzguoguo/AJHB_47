/**
 * Created by Administrator on 2016/7/2.
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
tjx.data.currentsituation.detail = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            url : {
                get_data_url :  'CurrentSituationService/currentsituation/changfan',
                get_category_url :  'CurrentSituationService/currentsituation/categorysummary',
                get_qiyekd_url :  'CurrentSituationService/currentsituation/qiyekd',
                get_qiye_url :  'CurrentSituationService/currentsituation/qiye',
                get_zulin_url :  'CurrentSituationService/currentsituation/zulin',
                get_bgly_url :  'CurrentSituationService/currentsituation/bgly',
                get_image_url :  'FileService/currentsituation/qiye/images/',
                get_louyu_summary_url :  'CurrentSituationService/currentsituation/sum/louyu',
                get_louyu_url :  'CurrentSituationService/currentsituation/louyu',
                get_image_louyu_url :  'FileService/currentsituation/louyu/images/',
                get_kongzhi_url :  'CurrentSituationService/currentsituation/kongzhi',
                get_chuzu_url :  'CurrentSituationService/currentsituation/chuzu',
                get_yishou_url :  'CurrentSituationService/currentsituation/yishou',
                get_ziyong_url :  'CurrentSituationService/currentsituation/ziyong',
                get_changfan_url :  'CurrentSituationService/currentsituation/changfanbasic',
                get_search_url : 'app/currentsituation/para/search.json'
            }
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        getDataTable,
        getCategorySummary,
        getQiYeKDDataTable,
        getQiYeDataTable,
        getZuLinDataTable,
        getBanGongLouDataTable,
        getQiYeImages,
        getLouyuSummary,
        getLouyuDataTable,
        getLouyuImages,
        getKongZhiDataTable,
        getChuZuDataTable,
        getYiShouDataTable,
        getZiYongDataTable,
        getChangFanDataTable,
        getSearchData
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

    getChangFanDataTable = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_changfan_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }
    
    getDataTable = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_data_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getQiYeKDDataTable = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_qiyekd_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getQiYeDataTable  = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_qiye_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getZuLinDataTable = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_zulin_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getBanGongLouDataTable = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData( configMap.url.get_bgly_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getCategorySummary= function ( arg_map ) {
        tjx.util.io.getJsonData( configMap.url.get_category_url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getQiYeImages = function ( arg_map ) {
        var url = configMap.url.get_image_url + arg_map.path;
        tjx.util.io.getJsonData(  url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getLouyuSummary = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_louyu_summary_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getLouyuDataTable  = function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_louyu_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getLouyuImages = function ( arg_map ) {
        var url = configMap.url.get_image_louyu_url + arg_map.path;
        tjx.util.io.getJsonData(  url, null, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getKongZhiDataTable =  function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_kongzhi_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getChuZuDataTable =  function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_chuzu_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getYiShouDataTable =  function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_yishou_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getZiYongDataTable =  function ( arg_map ) {
        var data = JSON.stringify(arg_map.data);
        tjx.util.io.addJsonData(  configMap.url.get_ziyong_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getSearchData = function ( callback ) {
         tjx.util.io.getJsonFile( configMap.url.get_search_url, callback );
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
        getDataTable : getDataTable,
        getCategorySummary : getCategorySummary,
        getQiYeKDDataTable : getQiYeKDDataTable,
        getQiYeDataTable : getQiYeDataTable,
        getZuLinDataTable : getZuLinDataTable,
        getBanGongLouDataTable : getBanGongLouDataTable,
        getQiYeImages : getQiYeImages,
        getLouyuSummary : getLouyuSummary,
        getLouyuDataTable : getLouyuDataTable,
        getLouyuImages : getLouyuImages,
        getKongZhiDataTable : getKongZhiDataTable,
        getChuZuDataTable : getChuZuDataTable,
        getYiShouDataTable : getYiShouDataTable,
        getZiYongDataTable : getZiYongDataTable,
        getChangFanDataTable : getChangFanDataTable,
        getSearchData : getSearchData
    };
//------------------- END PUBLIC METHODS ---------------------
}());

