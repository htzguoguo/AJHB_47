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
tjx.shell = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            selected_container : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        saveSiteData, getSiteData, currentUserChsName,
        setSelectedContainer,
        getSelectedContainer,
        getShellContainer,
        subscribeEvent,
        unsubscribeEvent,
        publishEvent
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    subscribeEvent = function ( eventname, callback ) {
        jqueryMap.$container.bind( eventname, callback );
      /*  $.gevent.subscribe( jqueryMap.$container, eventname , callback );*/
    };

    unsubscribeEvent = function ( eventname  ) {
        jqueryMap.$container.unbind( eventname   );
      /*  $.gevent.unsubscribe( jqueryMap.$container, eventname   );*/
    };

    publishEvent =  function ( eventname, parameter ) {
        jqueryMap.$container.trigger( eventname, parameter );
        /*  $.gevent.subscribe( jqueryMap.$container, eventname , callback );*/
    };



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

    saveSiteData = function ( name, value ) {
        $.removeCookie(name, { path: '/' });
        $.cookie(name, value, {  path: '/' });
    };

    getSiteData = function ( name ) {
       return  $.cookie(name);
    };

    currentUserChsName = function (  ) {
       return  getSiteData( 'username' );
    };

    setSelectedContainer = function ( $container ) {
        stateMap.selected_container = $container;
    };

    getSelectedContainer= function ( $container ) {
       return  stateMap.selected_container  ;
    };

    getShellContainer = function (  ) {
        return  jqueryMap.$container;
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
        subscribeEvent();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        saveSiteData : saveSiteData,
        getSiteData : getSiteData,
        currentUserChsName : currentUserChsName,
        setSelectedContainer : setSelectedContainer,
        getSelectedContainer : getSelectedContainer,
        getShellContainer : getShellContainer,
        unsubscribeEvent : unsubscribeEvent,
        subscribeEvent : subscribeEvent,
        publishEvent : publishEvent
    };
//------------------- END PUBLIC METHODS ---------------------
}());
