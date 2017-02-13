/**
 * Created by Administrator on 2016/1/15.
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
tjx.app.onsitecheck.onsitecheckreply = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue',
            photo_template_url : 'filetemplate.html'
        },
        stateMap = {
            $container : null,
            validator : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onSuccess,
        onFail, initFileUpload,
        onLableChanged;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

    initFileUpload = function (  ) {
        jqueryMap.$photo.load( configMap.photo_template_url );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $form : $container.find( '.form-horizontal' ),
            $formbody : $container.find( '.form-body' ),
            $send : $container.find( '#ok' ),
            $cancel : $container.find( '#cancel' ),
            $caption : $container.find( '.caption' ),
            $photo : $container.find( '#photocontainer' ),
            $chemicalname : $container.find( '*[tjx-data-field=Inspector]' ),
            $dailydosage : $container.find( '*[tjx-data-field=Recommendation]' ),
            $replyfinished : $container.find( '#replyfinished' ),
            $replyprocess : $container.find( '#replyprocess' )
        };
    };

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();
        if ( tjx.util.ui.isInputEmpty( jqueryMap.$chemicalname ) || tjx.util.ui.isInputEmpty( jqueryMap.$dailydosage ) ){
            return false;
        }
       
              var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
              data.FileName = tjx.filetemplate.getFileNames();
              var arg_map = {
                  data : data,
                  key :  tjx.table.getSelectedKey(),
                  success : onSuccess,
                  fail : onFail
              };
              tjx.data.onsitecheck.onsitecheck.addOnSiteReply( arg_map );
    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '整改反馈登记完成。');
            jqueryMap.$cancel.trigger("click");
            tjx.filetemplate.resetFiles();
            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '整改反馈登记不成功，请重试。');
        }
    }

    onFail = function ( data ) {

    }

    onLableChanged = function (  ) {
        jqueryMap.$replyfinished.removeClass( 'blue' );
        jqueryMap.$replyprocess.removeClass( 'blue' );
        $(this).addClass( 'blue' );
    }
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
        jqueryMap.$caption.append( tjx.index3.getTitle() );
        tjx.util.ui.initDate( jqueryMap.$container, new Date() );
        jqueryMap.$send.bind( 'click', onSumitData );
        jqueryMap.$replyfinished.bind( 'click', onLableChanged );
        jqueryMap.$replyprocess.bind( 'click', onLableChanged );
        initFileUpload();
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


