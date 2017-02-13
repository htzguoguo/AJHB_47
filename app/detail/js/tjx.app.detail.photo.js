/**
 * Created by Administrator on 2016/3/17.
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
tjx.app.detail.photo = (function () {

//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onReportSuccess,onFail,
        setReportFilesDetail,
        setFilesDetail;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    setFilesDetail = function ( data, $imgcontent, $imgcontainer ) {
        var i, length;
        if ( data && data.length > 0 ) {
            var imgcontent = $imgcontent;
            imgcontent.find( 'img' ).attr( 'src', data[ 0 ] );
            for ( i = 1, length = data.length; i < length; i++ ) {
                var con = imgcontent.clone();
                con.find( 'img' ).attr('src', data[ i ] );
                $imgcontainer.append( con );
            }
        }else
        {
            $imgcontainer.empty();
        }
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    setReportFilesDetail = function (  ) {
        var arg_map = {
            data : {
                num : tjx.table.getSelectedKey(),
                status : 'report'
            },
            success : onReportSuccess,
            fail : onFail
        };
        tjx.data.detail.photo.getAttachFiles( arg_map );
    }

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $mix_grid_report : $container.find( '#mix-grid-1' ),
            $img_report_content : $container.find( '#mix-grid-1' ).find( '.category_1' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onReportSuccess = function ( data  ) {
         setFilesDetail( data, jqueryMap.$img_report_content, jqueryMap.$mix_grid_report );
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
    initModule = function ( $container ) {
        stateMap.$container = $container;
        setJqueryMap();
        setReportFilesDetail();
        jqueryMap.$container.find('.mix-grid').mixitup();
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


