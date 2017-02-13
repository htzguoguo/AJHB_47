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
tjx.app.onsitecheck.onsitecheckadd = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            validator : null,
            is_modal : false
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail, validateForm,
        initFileUpload;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

   /* initFileUpload = function (  ) {
        jqueryMap.$photo.load( configMap.photo_template_url );
    }*/

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
            $dealine : $container.find( '#Deadline' ),
            $enterprisename : $container.find( '#EnterpriseName' ),
            $inspector : $container.find( '#Inspector' )
        };
    };

    validateForm = function ( ) {
        if (  jqueryMap.$container.find( '[name=EnterpriseName]' ).val()==="") {
            // invalid
            /*  jqueryMap.$holder.next('.help-block').show();*/
            jqueryMap.$container.find( '[name=EnterpriseName]' ).closest('.form-group').addClass('has-error');
            jqueryMap.$container.find( '[name=EnterpriseName]').focus();
            return false;
        }
        if (  jqueryMap.$container.find( '[name=DetectionTime]' ).val()==="") {
            // invalid
            /*  jqueryMap.$holder.next('.help-block').show();*/
            jqueryMap.$container.find( '[name=DetectionTime]' ).closest('.form-group').addClass('has-error');
            jqueryMap.$container.find( '[name=DetectionTime]').focus();
            return false;
        }
        return true;
    }

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();
          if ( validateForm() ) {
              var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
              data.FileName = tjx.filetemplate.getFileNames();

              var arg_map = {
                  data : data,
                  success : onSuccess,
                  fail : onFail
              };
              tjx.data.onsitecheck.onsitecheck.addOnSiteCheck( arg_map );
          }
    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '安全检查登记完成。');

            if ( stateMap.is_modal ){
                $.gevent.publish( 'table-update', [ {} ]);
            }else {
                jqueryMap.$cancel.trigger("click");
                tjx.filetemplate.resetFiles();
            }
           
        }else{
            tjx.util.ui.showAlert( '系统提示' , data.Desc);
        }
    }

    onFail = function ( data ) {

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
    initModule = function ( $container, ismodal ) {
        stateMap.$container = $container;
        setJqueryMap();
        stateMap.is_modal = ismodal;

        var name = tjx.shell.currentUserChsName();

        if ( name.length > 4 ){
            jqueryMap.$enterprisename.val( name );
        }
        else
        {
            jqueryMap.$inspector.val( name );
            jqueryMap.$enterprisename.removeAttr( 'disabled' );
        }


        if ( ! stateMap.is_modal ){
            jqueryMap.$caption.append( tjx.index3.getTitle() );
        }


        tjx.util.ui.initDate( jqueryMap.$container, new Date() );

        var cur = new Date();
        var nex = new Date( cur.getFullYear(),  (cur.getMonth() + 1) , cur.getDate() );
        tjx.util.ui.initSpecificDate( jqueryMap.$dealine, nex );

        jqueryMap.$send.bind( 'click', onSumitData );

        /*initFileUpload();*/
        tjx.util.ui.initFileUpload( jqueryMap.$photo );

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


