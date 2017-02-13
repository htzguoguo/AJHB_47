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
tjx.util.io = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
             ajax_setting : {
                 add_type : 'POST',
                 update_type : 'PUT',
                 get_type : 'GET',
                 delete_type : 'DELETE',
                 cache:false,
                 timeout : 5000,
                 content_type :  'application/json; charset=utf-8',
                 data_type : 'json',
                 jsonp_data_type : 'jsonp'
             }
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        getJsonData, addJsonData, updateJsonData, deleteJsonData,
        uploadBlobOrFile,
        onFail,
        getJsonFile,
        getJsonpData,
        onError
        ;
    jQuery.support.cors = true;
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
    onError = function ( XMLHttpRequest, txtStatus, errorThrown ) {
      /*  alert( 'error' +  txtStatus + errorThrown );*/
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

    deleteJsonData = function ( url, data, beforeSend, complete, success, fail  ){
        $.ajax({
            type : configMap.ajax_setting.delete_type,
            url : url,
            timeout : configMap.ajax_setting.timeout,
            contentType: configMap.ajax_setting.content_type,
            dataType: configMap.ajax_setting.data_type,
            data : data,
            beforeSend : beforeSend,
            complete : complete,
            success : success,
            fail : fail
        });
    };

    updateJsonData = function ( url, data, beforeSend, complete, success, fail  ){
        $.ajax({
            type : configMap.ajax_setting.update_type,
            url : url,
            timeout : configMap.ajax_setting.timeout,
            contentType: configMap.ajax_setting.content_type,
            dataType: configMap.ajax_setting.data_type,
            data : data,
            beforeSend : beforeSend,
            complete : complete,
            success : success,
            fail : fail
        });
    };

    addJsonData = function ( url, data, beforeSend, complete, success, fail  ){
        $.ajax({
            type : configMap.ajax_setting.add_type,
            url : url,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            timeout : configMap.ajax_setting.timeout,
            contentType: configMap.ajax_setting.content_type,
            dataType: configMap.ajax_setting.data_type,

            data : data,
            beforeSend : beforeSend,
            complete : complete,
            success : success,
            fail : fail,
            error : onError
        });
    };


    getJsonData = function ( url, data, beforeSend, complete, success, fail  ){
                $.ajax({
                    type : configMap.ajax_setting.get_type,
                    url : url,
                    timeout : configMap.ajax_setting.timeout,
                    contentType: configMap.ajax_setting.content_type,
                    dataType: configMap.ajax_setting.data_type,
                    data : data,
                    beforeSend : beforeSend,
                    complete : complete,
                    success : success,
                    fail : fail
            });
            };

    getJsonpData  = function ( url, data, beforeSend, complete, success, fail  ){
        $.ajax({
            type : configMap.ajax_setting.get_type,
            url : url,
            dataType: configMap.ajax_setting.jsonp_data_type,
            async : false,
            jsonp: "jsoncallback",
            jsonpCallback:"?",
            success : success
        });
    };

    uploadBlobOrFile = function ( url, data, progress, complete, success, fail, callbackpara ) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url , true);
        xhr.setRequestHeader('Content-length', data.size);
        xhr.setRequestHeader('Transfer-Encoding', 'chunked');
        xhr.onload = function (e) {
            if(xhr.status === 200) { // If server status was ok

                if ( complete ) {
                    var result = JSON. parse(xhr.responseText);
                    complete( result, callbackpara );
                }
            }  else
            {
                fail( );
            }
        };
        // Listen to the upload progress.
        xhr.upload.onprogress = progress;

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = JSON. parse(xhr.responseText);
                success( result , callbackpara );
            }else
            {
                fail( );
            }
        };
        xhr.send(data);
    };

    onFail = function (  ) {

    };

    getJsonFile = function ( path, callback ) {
        $.getJSON(path, callback);
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

        $.ajaxSettings.crossDomain = true;
        $.ajaxSettings.cache = false;

        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        getJsonData : getJsonData,
        addJsonData : addJsonData,
        updateJsonData : updateJsonData,
        deleteJsonData : deleteJsonData,
        uploadBlobOrFile : uploadBlobOrFile,
        onFail : onFail,
        getJsonFile : getJsonFile,
        getJsonpData : getJsonpData
    };
//------------------- END PUBLIC METHODS ---------------------
}());
