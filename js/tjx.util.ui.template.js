/**
 * Created by Administrator on 2016/8/23.
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
/*global $, spa */
tjx.util.ui.template = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {

        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        setTableWithData,
        onPageDon,
        onPageUp
        ;
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
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    onPageDon = function (  ) {

        var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );
        $tbody.attr('tjx-page-index', ++ind) ;

        setTableWithData( $tbody, data );
    };

    onPageUp = function (  ) {
        var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );

        if ( ind > 0 ){
            $tbody.attr('tjx-page-index', --ind) ;
            setTableWithData( $tbody, data );
        }
    };

    setTableWithData = function ( $tbody, data ) {
        var num =   $tbody.parent().parent().parent().next().children().eq(1);
        num.html('');
        $tbody.data( 'data', data );
        $tbody.find( 'tr:not( .display-none )').remove();
        var ind = Number( $tbody.attr('tjx-page-index') );
        var template = $tbody.find( 'tr.display-none' );
        var $temp_div = $('<div></div>');
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj, temp_str, md, lll;
            len = data.Data.length;
            items = data.Data,
            lll = parseInt(len / 10);
            md = parseInt( len % 10 );

            if ( lll === 0 ) {
                i = 0;
                if ( ind > 0 ) {
                    $tbody.attr('tjx-page-index', --ind) ;
                }
            }
            else
            {

                if ( ind > lll ) {
                    $tbody.attr('tjx-page-index', --ind) ;
                    i = ind * 10;
                }else if ( ind === lll) {
                    if ( md === 0 ){
                        $tbody.attr('tjx-page-index', --ind) ;
                    }
                    i = ind * 10;
                }else {
                    i = ind * 10;
                    len =i +  10;
                }
            }

            for ( ; i < len; i++) {
                $temp_div.empty();
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );
                if ( obj ) {
                    var imgcontent = template;
                    var con = imgcontent.clone();
                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );
                    temp_str = con.find( 'button' ).attr( 'data-content' );
                    $temp_div.html( temp_str );
                    tjx.util.setValuesFromData( $temp_div, obj );
                    con.find( 'button' ).attr( 'data-content', $temp_div.html() );
                    $tbody.append( con );
                }
            }
            if ( md > 0 ) {
                num.html( (ind + 1).toString() + '/' + (lll + 1).toString() );
            }else {
                num.html( (ind + 1).toString() + '/' + (lll).toString() );
            }

        }
        tjx.util.ui.table.initPopup();
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
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        setTableWithData : setTableWithData,
        onPageDon : onPageDon,
        onPageUp : onPageUp
    };
//------------------- END PUBLIC METHODS ---------------------
}());
