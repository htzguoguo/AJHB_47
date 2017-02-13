/**
* Created by Administrator on 2015/12/5.
*/
/*
* tjx.login.js
* javascript for login module
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */
tjx.login = (function () {
    //---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var configMap = {
        txt1: 'ASPxTextBox1_I',
        txt2: 'ASPxTextBox2_I',
        txt3: 'FailureText'
},
        stateMap = { $container: null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        changeLabelText, setError;
    //----------------- END MODULE SCOPE VARIABLES ---------------
    //------------------- BEGIN UTILITY METHODS ------------------
    // example : getTrimmedString
    
    //-------------------- END UTILITY METHODS -------------------
    //--------------------- BEGIN DOM METHODS --------------------
    // Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container: $container,
                      $name : $container.find('#' + configMap.txt1),
                      $pwd : $container.find('#' + configMap.txt2),
                      $error : $container.find('#' + configMap.txt3)
                    };
    };
    // End DOM method /setJqueryMap/
    //---------------------- END DOM METHODS ---------------------
    //------------------- BEGIN EVENT HANDLERS -------------------
    // example: onClickButton = ...
    //-------------------- END EVENT HANDLERS --------------------
    //------------------- BEGIN PUBLIC METHODS -------------------

    changeLabelText = function ( ) {
        var v1 = jqueryMap.$name.val();
        if (v1 === "") {
            jqueryMap.$name.focus();
        }
        else {
            jqueryMap.$error.text('');
            Callback1.PerformCallback();
        }
    };

    setError = function (s, e) {

        if (e.result) {
            jqueryMap.$error.empty();
            jqueryMap.$error.html(e.result);
           // document.getElementById(configMap.txt3).innerText = e.result;
        }
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
        return true;
    };
    // End public method /initModule/
    // return public methods
    return {
        initModule: initModule,
        changeLabelText : changeLabelText,
        setError: setError
    };
    //------------------- END PUBLIC METHODS ---------------------
} ());
