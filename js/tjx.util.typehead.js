/**
 * Created by Administrator on 2016/4/11.
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
tjx.util.typehead = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            default_json_file : 'para/enterprise.json'
        },
        stateMap = {
            $container : null,
            enterprisenames : []
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        substringMatcher, configTypehead;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    substringMatcher = function (arr) {

        return function findMatches(q, cb) {

            var substrRegex;

            var matches = [];

            substrRegex = new RegExp(q, 'i');

            $.each(arr, function (i, ele) {

                if (substrRegex.test(ele)) {

                    matches.push({ value: ele });

                }

            });

            cb(matches);

        };

    };

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $searchvalue : $container.find( '#searchvalue' )
        };
    };
// End DOM method /setJqueryMap/

    configTypehead = function( jsonfile ) {
        var file = configMap.default_json_file;
        if ( jsonfile ) {
            file = jsonfile;
        }
        $.getJSON( file, function(data) {
            if (data) {
                $.each(data, function(index, city) {
                    stateMap.enterprisenames.push(city);
                });
                jqueryMap.$searchvalue.typeahead({
                    },
                    {
                        name: 'searchvalue',
                        hint: true,
                        highlight: true,
                        minLength: 1,
                        limit : 10,
                        displayKey: 'value',
                        source: substringMatcher(stateMap.enterprisenames)
                    });
            }
        });
    };

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
    initModule = function ( $container, jsonfile ) {
        jqueryMap.$searchvalue = $container;

        configTypehead( jsonfile );
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule
    };
//------------------- END PUBLIC METHODS ---------------------
}());
