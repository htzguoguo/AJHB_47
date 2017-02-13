/**
 * Created by Administrator on 2016/3/24.
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
tjx.filetemplate = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        initFile, getFileNames, resetFiles;
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
            $fileupload : $container.find( '#fileupload' ),
            $filenames : $container.find( '#filenames' ),
            $filebody : $container.find( '.files' )
        };
    };

    initFile = function ( ) {
        // Initialize the jQuery File Upload widget:
        jqueryMap.$fileupload.fileupload({
            disableImageResize: false,
            autoUpload: false,
            disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
        });

        // Enable iframe cross-domain access via redirect option:
        jqueryMap.$fileupload.fileupload(
            'option',
            'redirect',
            window.location.href.replace(
                /\/[^\/]*$/,
                '/cors/result.html?%s'
            )
        );

        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                cache: false,
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                        new Date())
                    .appendTo('#fileupload');
            });
        }
        // Load & display existing files:

      /*   $('#fileupload').addClass('fileupload-processing');
         $.ajax({
         // Uncomment the following to send cross-domain cookies:
         //xhrFields: {withCredentials: true},
         url: $('#fileupload').attr("action"),
         dataType: 'json',
         cache: false,
         context: $('#fileupload')[0]
         }).always(function () {
         $(this).removeClass('fileupload-processing');
         }).done(function (result) {
         $(this).fileupload('option', 'done')
         .call(this, $.Event('done'), {result: result});
         });*/
    };

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    getFileNames = function (  ) {
        var names = new Array();
        var filename = jqueryMap.$filebody.find( 'a' ).each( function ( i, item ) {
            names.push(  $(this).html() );
        } );
    /*    $.each(jqueryMap.$filenames.prop("files"), function(k,v){
            names.push(  v['name'] );
            // filename = "blahblah.jpg", without path
        });*/
        return  names.join( '|' );
    };

    resetFiles = function (  )  {
       /* $('input:file').MultiFile('reset');*/
        jqueryMap.$filebody.empty();
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
        initFile();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        getFileNames : getFileNames,
        resetFiles : resetFiles
    };
//------------------- END PUBLIC METHODS ---------------------
}());

