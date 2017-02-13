/**
 * Created by Administrator on 2016/7/7.
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
tjx.app.currentsituation.info = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : {
                color_name: true
            }

        },
        stateMap = {
            $container : null
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        onShowInfo,
        onShowSuccess,
        onShowBuilding,
        onShowBuildingSuccess,
        onShowRent,
        onShowRentSuccess,
        onShowOffice,
        onShowOfficeSuccess,
        onShowImages,
        onShowImagesSuccess,
        setFilesDetail,
        handleFancybox,
        setFilter
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    setFilter = function ( search, field, value ) {
        var ss = value.split( ',' );

      /*  if ( ss.length === 2 ){
            search.Search = field +  ' = {0} or ' + field + ' = {1}';
            search.Values = [ ss[0], ss[1] ];
        }else
        {
            search.Search = field +  ' = {0} ';
            search.Values = [ value ];
        }*/
        search.Search = field +  ' = {0} ';
        search.Values = [ value ];
    }

    setFilesDetail = function ( data, $imgcontent, $imgcontainer, islayers ) {
        var i, length;
        $imgcontainer.find( '.category_1:not( .display-hide )').remove();
        if ( data && data.length > 0 ) {
            var imgcontent = $imgcontent;
            var url ;
            var ss ;
            var title;
            for ( i = 0, length = data.length; i < length; i++ ) {
                var con = imgcontent.clone();
                var src = data[i].split("%2f").join("/");
                src = src.replace("+", '%20');

                if (   islayers ) {
                    if (src.search(/_a/) > -1  ) {
                        con.find( 'img' ).attr('src', src );
                        con.find( 'a' ).attr('href', src );
                        con.removeClass( 'display-none' );
                        con.removeAttr( 'id' );
                        url  = data[i].split("%2f").join("/");
                        url = url.replace("+", '%20');
                        ss = url.split( '/' );
                        title =  decodeURIComponent(ss[ ss.length-2 ]);
                        con.find( 'span' ).html( title );
                        con.find( 'a' ).attr('title', title );
                        $imgcontainer.append( con );
                    }
                }else {
                    if (src.search(/_a/) === -1  ) {
                        con.find( 'img' ).attr('src', src );
                        con.find( 'a' ).attr('href', src );
                        con.removeClass( 'display-none' );
                        con.removeAttr( 'id' );
                        url  = data[i].split("%2f").join("/");
                        url = url.replace("+", '%20');
                        ss = url.split( '/' );
                        title =  decodeURIComponent(ss[ ss.length-2 ]);
                        con.find( 'span' ).html( title );
                        con.find( 'a' ).attr('title', title );
                        $imgcontainer.append( con );
                    }
                }
            }
        }
        jqueryMap.$container.find('.mix-grid').mixitup();
        handleFancybox();
    }

     handleFancybox = function() {
        if (!jQuery.fancybox) {
            return;
        }
        if ($(".fancybox-button").size() > 0) {
            $(".fancybox-button").fancybox({
                groupAttr: 'data-rel',
                prevEffect: 'none',
                nextEffect: 'none',
                closeBtn: true,
                helpers: {
                    title: {
                        type: 'inside'
                    }
                }
            });
        }
    };

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $modal_info : $container.find( '#factorydetail' ),
            $bt_basic : $container.find( '#tb_basicinfo' ),
            $container_building : $container.find( '#cn_building' ),
            $template_building: $container.find( '#tb_building' ),
            $container_rent : $container.find( '#cn_rent' ),
            $template_rent: $container.find( '#tb_rent' ),
            $container_office : $container.find( '#cn_office' ),
            $template_office: $container.find( '#tb_office' ),
            $mix_grid_report : $container.find( '#mix-grid-1' ),
            $img_report_content : $container.find( '#phototemplate' ),

            $layers_grid_report : $container.find( '#layers-grid-1' ),
            $layers_report_content : $container.find( '#layerstemplate' )
          };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onShowInfo = function ( event, field, value  ) {
       /* event.stopImmediatePropagation();*/

         
        var search = {
            Fields : [  '*' ],
            OrderFieldName : '土地使用权人',
            OrderType : 'desc'
        };
       /* search.Search = '土地使用权人 = {0} ';
        search.Values = [ arg ];*/
        setFilter( search, field, value );
         

        var arg_map = {
            data : search,
            success : onShowSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getQiYeDataTable( arg_map );

        onShowBuilding( field, value  );
        onShowRent( field, value  );
        onShowOffice( field, value  );
    }

    onShowSuccess = function ( data ) {
        
        var value = tjx.util.buildSingleObjectFromData( data, 0 );
        tjx.util.setValuesFromData( jqueryMap.$bt_basic, value );
        onShowImages( value.图片路径 );
        jqueryMap.$modal_info.attr( 'data-width', 1200 );
        jqueryMap.$modal_info.slimScroll({
            height: 550
        });
        jqueryMap.$modal_info.modal( );
    }

    onShowBuilding = function ( field, value  ) {
        var search = {
            Fields : [ '*' ],
            OrderFieldName : '空置房屋名称及面积',
            OrderType : 'desc'
        };
       /* search.Search = '企业名称 = {0} ';
        search.Values = [ arg ];*/
        setFilter( search, field, value );
        var arg_map = {
            data : search,
            success : onShowBuildingSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getChangFanDataTable( arg_map );
    }

    onShowBuildingSuccess = function ( data ) {

        jqueryMap.$container_building.find( 'table:not( .display-hide )').remove();
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj;
            len = data.Data.length;
            items = data.Data;
            for ( i = 0; i < len; i++) {
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );

                if ( obj ) {
                    var imgcontent = jqueryMap.$template_building;
                    var con = imgcontent.clone();

                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );

                    jqueryMap.$container_building.append( con );
                }
            }
        }
    }

    onShowRent  = function ( field, value  ) {
        var search = {
            Fields : [ '*' ],
            OrderFieldName : 'ID',
            OrderType : 'desc'
        };
      /*  search.Search = '企业名称 = {0} ';
        search.Values = [ arg ];*/
        setFilter( search, field, value );
        var arg_map = {
            data : search,
            success : onShowRentSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getZuLinDataTable( arg_map );
    }

    onShowRentSuccess  = function ( data ) {

         jqueryMap.$container_rent.find( 'table:not( .display-hide )').remove();
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj;
            len = data.Data.length;
            items = data.Data;
            for ( i = 0; i < len; i++) {
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );

                if ( obj ) {
                    var imgcontent = jqueryMap.$template_rent;
                    var con = imgcontent.clone();

                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );

                    jqueryMap.$container_rent.append( con );
                }
            }
        }
    }

    onShowOffice  = function ( field, value  ) {
        var search = {
            Fields : [ '*' ],
            OrderFieldName : 'ID',
            OrderType : 'desc'
        };
       /* search.Search = '企业名称 = {0} ';
        search.Values = [ arg ];*/
        setFilter( search, field, value );
        var arg_map = {
            data : search,
            success : onShowOfficeSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getBanGongLouDataTable( arg_map );
    }

    onShowOfficeSuccess  = function ( data ) {

        jqueryMap.$container_office.find( 'table:not( .display-hide )').remove();
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj;
            len = data.Data.length;
            items = data.Data;
            for ( i = 0; i < len; i++) {
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );

                if ( obj ) {
                    var imgcontent = jqueryMap.$template_office;
                    var con = imgcontent.clone();

                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );

                    jqueryMap.$container_office.append( con );
                }
            }
        }
    }

    onShowImages  = function ( arg  ) {
       
        if ( arg ) {
            var pp = arg.substr(arg.lastIndexOf("\\")+1)
            var arg_map = {
                path : pp,
                success : onShowImagesSuccess,
                fail : tjx.util.io.onFail
            };
            tjx.data.currentsituation.detail.getQiYeImages( arg_map );
        }
    }

    onShowImagesSuccess = function ( data ) {
      
        setFilesDetail( data, jqueryMap.$img_report_content, jqueryMap.$mix_grid_report, false );
        setFilesDetail( data, jqueryMap.$layers_report_content, jqueryMap.$layers_grid_report, true );
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
       /* $.gevent.unsubscribe(
            tjx.shell.getShellContainer(),
            'tjx-currentsituation-showinfo'
        );*/
     /*   $.gevent.subscribe( tjx.shell.getShellContainer(), 'tjx-currentsituation-showinfo', onShowInfo );*/
        tjx.shell.unsubscribeEvent( 'tjx-currentsituation-showinfo' );
        tjx.shell.subscribeEvent(  'tjx-currentsituation-showinfo', tjx.app.currentsituation.info.onShowInfo );


        
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onShowInfo : onShowInfo
    };
//------------------- END PUBLIC METHODS ---------------------
}());
