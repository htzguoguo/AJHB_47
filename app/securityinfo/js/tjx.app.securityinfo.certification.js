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
tjx.app.securityinfo.certification = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            validator : null,
            is_new : false
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail,
        onInitForm,
        onInitSuccess,
        onEditData,
        onEditSuccess
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error



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
            $caption : $container.find( '.caption-subject' ),
            $holder : $container.find( '*[tjx-data-field=Holder]' ),
            $photo : $container.find( '#photocontainer' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();
        if (  jqueryMap.$holder.val()==="") {
            // invalid
          /*  jqueryMap.$holder.next('.help-block').show();*/
            jqueryMap.$holder.closest('.form-group').addClass('has-error');
            return false;
        }
            var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
            data.FileName = tjx.filetemplate.getFileNames();
            var arg_map = {
                data : data,
                success : onSuccess,
                fail : onFail
            };
            tjx.data.certification.addCertification( arg_map );


    }

    onCancelData = function ( event ) {

        //  console.log('validate', val.validate());
    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '从业人员持证登记完成。');
            jqueryMap.$cancel.trigger("click");
            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '从业人员持证登记不成功，请重试。');
        }
    }

    onFail = function ( data ) {

    }

    onInitForm = function (  ) {
        var arg_map = {
            data : { key : tjx.table.getSelectedKey() },
            success : onInitSuccess,
            fail : onFail
        };
        tjx.data.certification.getCertification( arg_map );
    }

    onInitSuccess = function ( data ) {
        tjx.util.setFormValuesFromData( jqueryMap.$formbody, data );
    }

    onEditData = function ( event ) {
        // event.preventDefault();
        var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
        data.FileName = tjx.filetemplate.getFileNames();
        var arg_map = {
            key : tjx.table.getSelectedKey(),
            data : data,
            success : onEditSuccess,
            fail : onFail
        };
        tjx.data.certification.updateCertification( arg_map );
    }

    onEditSuccess = function ( data ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '从业人员持证登记更新完成。');
            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '从业人员持证登记更新不成功，请重试。');
        }
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
    initModule = function ( $container , isnew) {
        stateMap.$container = $container;
        setJqueryMap();
        stateMap.is_new = isnew;

        tjx.util.ui.initDate( jqueryMap.$container, new Date() );

        if ( stateMap.is_new ) {
            jqueryMap.$caption.html( tjx.table.getCommandTitle() );
            jqueryMap.$send.bind( 'click', onSumitData );
            tjx.util.ui.initFileUpload( jqueryMap.$photo );   
        }
        else
        {
            onInitForm();
            jqueryMap.$send.bind( 'click', onEditData );
            tjx.util.ui.initFileUpload( jqueryMap.$photo );
        }

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


