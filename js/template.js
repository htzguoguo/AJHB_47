/**
 * Created by Administrator on 2016/9/27.
 */
/*
 * tjx.js
 * Template for browser feature modules
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, tjx */

tjx.template = (function () {
    'use strict';
    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN MODULE SCAPE VARIABLES  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - -
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule;
    //- - - - - - - - - - - - - -  - - - - - - - -   END MODULE SCAPE VARIABLES  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN UTILITY METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - -
    // example : getTrimmedString
    //- - - - - - - - - - - - - -  - - - - - - - -   END UTILITY METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN PUBLIC DOM METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - -
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container
        };
    };
    // End DOM method /setJqueryMap/
    //- - - - - - - - - - - - - -  - - - - - - - -   END PUBLIC DOM METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN PRIVATE DOM METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - -
    // Begin DOM method /setJqueryMap/

    // End DOM method /setJqueryMap/
    //- - - - - - - - - - - - - -  - - - - - - - -   END PRIVATE DOM METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN USER EVENT HANDLERS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - -
    // example: onClickButton = ...
    //- - - - - - - - - - - - - -  - - - - - - - -   END USER EVENT HANDLERS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN MODEL EVENT HANDLERS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - -
    // example: onClickButton = ...
    //- - - - - - - - - - - - - -  - - - - - - - -   END MODEL EVENT HANDLERS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - -

    //- - - - - - - - - - - - - -  - - - - - - - -   BEGIN PUBLIC METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - -
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

    // Begin public method /initModule/
    // Purpose : Initializes module
    // Arguments :
    // * $container the jquery element used by this feature
    // Returns : true
    // Throws : nonaccidental
    //
    initModule = function ( $container ) {
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        setJqueryMap();

        // initialize chat slider and bind click handler

        // configure uriAnchor to use our schema

        // configure and initialize feature modules

        // Handle URI anchor change events.
        // This is done /after/ all feature modules are configured
        // and initialized, otherwise they will not be ready to handle
        // the trigger event, which is used to ensure the anchor
        // is considered on-load

        // Have $list_box subscribe to jquery global event

        // bind user input events

        return true;
    };
    // End public method /initModule/

    // return public methods
    return {
        configModule : configModule,
        initModule : initModule
    };
    //- - - - - - - - - - - - - -  - - - - - - - -   END PUBLIC METHODS  - - - - - - - -  - - - - - - - -  - - - - - - - -  - - - - - - - - - - - - - -
}());
