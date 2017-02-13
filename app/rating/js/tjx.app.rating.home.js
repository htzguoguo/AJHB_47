/**
 * Created by Administrator on 2016/8/22.
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
tjx.app.rating.home = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {

        },
        stateMap = {
            $container : null,
            $cur_this : null
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        getReport,
        onGetOnSiteCheckReport,
        onCurrentCheckSuccess,
        onCheckSuccess,
        onInitOnSiteSuccess,
        onPageDon,
        onPageUp,
        onGetCertReport,
        onInitCertSuccess,
        onGetSpecialReport,
        onInitSpecialSuccess,
        onGetInspectReport,
        onInitInspectSuccess
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    getReport = function ( datetype, value, callback ) {
        if ( datetype === 'onsitecheck' ){
            onGetOnSiteCheckReport( value, callback );
        }else if ( datetype === 'cert' ){
            onGetCertReport( value, callback );
        }else if ( datetype === 'special'  ) {
            onGetSpecialReport( value, callback  );
        }else if ( datetype === 'inspect'  ) {
            onGetInspectReport( value, callback  );
        }

    }

    onCurrentCheckSuccess = function ( data ) {
        var tt = stateMap.$cur_this;
        var $tbody = tt.parent().parent().parent().parent().find( 'tbody' );
        $tbody.attr('tjx-page-index', 0) ;
        tjx.util.ui.template.setTableWithData( $tbody, data );
    }

    onCheckSuccess = function ( $tbody, data ) {
        var num =   $tbody.parent().parent().parent().next().children().eq(1);
        num.html('');
        $tbody.data( 'data', data );
        $tbody.find( 'tr:not( .display-none )').remove();
        var ind = Number( $tbody.attr('tjx-page-index') );
        var template = $tbody.find( 'tr.display-none' );
        var $temp_div = $('<div></div>');
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj, temp_str, md;
            len = data.Data.length;
            items = data.Data,
            lll = parseInt(len / 10);
            md = parseInt( len % 10 );
            if ( lll === 0 ) {
                i = 0;
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
            num.html( (ind + 1).toString() + '/' + (lll + 1).toString() );

        }
        tjx.util.ui.table.initPopup();
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $checkpageup : $container.find( '#checkpageup' ),
            $checkpagedown : $container.find( '#checkpagedown' ),
            $btnreport : $container.find( '#btnreport' ),
            $certpageup : $container.find( '#certpageup' ),
            $certpagedown : $container.find( '#certpagedown' ),
            $btncert : $container.find( '#btncert' ),
            $specialpageup : $container.find( '#specialpageup' ),
            $specialpagedown : $container.find( '#specialpagedown' ),
            $btnspecial : $container.find( '#btnspecial' ),
            $inspectpageup : $container.find( '#inspectpageup' ),
            $inspectpagedown : $container.find( '#inspectpagedown' ),
            $btninspect : $container.find( '#btninspect' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onGetInspectReport = function (  value, callback ){
        var search = {
            Fields : [   'EnterpriseName',  'EquipmentName',  'ExpirationDate', 'Memo', 'DetectionTime', 'Organization', 'Qualified' ],
            OrderFieldName : 'Id',
            OrderType : 'desc'
        };
        if ( value === 'normal' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) > convert(varchar(10),DateAdd(day, 30, getdate()),120)  and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'due' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) <= convert(varchar(10),DateAdd(day, 30, getdate()),120) and ExpirationDate > getdate() and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'overtime' ) {
            search.Search = 'ExpirationDate < getdate() and 1 = {0} ';
            search.Values = [ 1 ];
        }
        var arg_map = {
            data : search,
            success : callback,
            fail : tjx.util.io.onFail
        };
        tjx.data.rating.enterpriserating.getInspect( arg_map );
    }

    onGetSpecialReport = function (  value, callback ){
        var search = {
            Fields : [   'EnterpriseName',  'DeviceName',  'ExpirationDate', 'EXPR1', 'ModelName', 'Category', 'RegistrationNumber', 'InspectionAgency' ],
            OrderFieldName : 'Id',
            OrderType : 'desc'
        };
        if ( value === 'normal' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) > convert(varchar(10),DateAdd(day, 30, getdate()),120)  and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'due' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) <= convert(varchar(10),DateAdd(day, 30, getdate()),120) and ExpirationDate > getdate() and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'overtime' ) {
            search.Search = 'ExpirationDate < getdate() and 1 = {0} ';
            search.Values = [ 1 ];
        }
        var arg_map = {
            data : search,
            success : callback,
            fail : tjx.util.io.onFail
        };
        tjx.data.rating.enterpriserating.getSpecial( arg_map );
    }

    onGetCertReport = function (  value, callback ){
        var search = {
            Fields : [   'EnterpriseName',  'Holder',  'ExpirationDate', 'memo', 'DocumentCategory', 'Holder', 'Name', 'DocumentNumber', 'AuthorizingDept' ],
            OrderFieldName : 'Id',
            OrderType : 'desc'
        };
        if ( value === 'normal' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) > convert(varchar(10),DateAdd(day, 30, getdate()),120)  and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'due' ) {
            search.Search = 'convert(varchar(10),ExpirationDate,120) <= convert(varchar(10),DateAdd(day, 30, getdate()),120) and ExpirationDate > getdate() and  1 = {0} ';
            search.Values = [ 1 ];
        }else if ( value === 'overtime' ) {
            search.Search = 'ExpirationDate < getdate() and 1 = {0} ';
            search.Values = [ 1 ];
        }
        var arg_map = {
            data : search,
            success : callback,
            fail : tjx.util.io.onFail
        };
        tjx.data.rating.enterpriserating.getCert( arg_map );
    }

    onGetOnSiteCheckReport = function (  value, callback ){
        var search = {
            Fields : [   'EnterpriseName',  'Problem',  'Recommendation','ReportTime'  ],
            OrderFieldName : 'ID',
            OrderType : 'desc'
        };
        if ( value === 'normal' ) {
            search.Search = 'convert(varchar(10),Deadline,120) > convert(varchar(10),DateAdd(day, 5, getdate()),120)  and  Status = {0} ';
            search.Values = [ '未处理' ];
        }else if ( value === 'due' ) {
            search.Search = 'convert(varchar(10),Deadline,120) <= convert(varchar(10),DateAdd(day, 5, getdate()),120) and Deadline > getdate() and  Status = {0} ';
            search.Values = [ '未处理' ];
        }else if ( value === 'overtime' ) {
            search.Search = 'Deadline < getdate() and Status = {0} ';
            search.Values = [ '未处理' ];
        }
        var arg_map = {
            data : search,
            success : callback,
            fail : tjx.util.io.onFail
        };
        tjx.data.rating.enterpriserating.getOnSiteCheck( arg_map );
    }

    onInitOnSiteSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#checkreport' );
        onCheckSuccess( con, data );
    }

    onInitCertSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#certreport' );
        onCheckSuccess( con, data );
    }

    onInitSpecialSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#specialreport' );
        onCheckSuccess( con, data );
    }

    onInitInspectSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#inspectreport' );
        onCheckSuccess( con, data );
    }
    onPageDon = function () {
        var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );
        $tbody.attr('tjx-page-index', ++ind) ;
        onCheckSuccess( $tbody, data );
    }

    onPageUp = function () {
        var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );
        if ( ind > 0 ){
            $tbody.attr('tjx-page-index', --ind) ;
            onCheckSuccess( $tbody, data );
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
        jqueryMap.$container.find( '.actions label' ).on( 'click', function () {
            stateMap.$cur_this = $(this);
            var tt = $(this).attr( 'tjx-data-type' );
            var value = $(this).attr( 'tjx-data-value' );
            getReport( tt, value, onCurrentCheckSuccess);
        } );

        getReport( 'onsitecheck', 'overtime', onInitOnSiteSuccess );
        jqueryMap.$checkpageup.on( 'click', onPageUp );
        jqueryMap.$checkpagedown.on( 'click', onPageDon );
        jqueryMap.$btnreport.on( 'click', function () {
            tjx.index3.menuClickTrigger( '企业整改超期预警' );
        } );

        getReport( 'cert', 'overtime', onInitCertSuccess );
        jqueryMap.$certpageup.on( 'click', onPageUp );
        jqueryMap.$certpagedown.on( 'click', onPageDon );
        jqueryMap.$btncert.on( 'click', function () {
            tjx.index3.menuClickTrigger( '从业人员持证超期预警' );
        } );

        getReport( 'special', 'overtime', onInitSpecialSuccess );
        jqueryMap.$specialpageup.on( 'click', onPageUp );
        jqueryMap.$specialpagedown.on( 'click', onPageDon );
        jqueryMap.$btnspecial.on( 'click', function () {
            tjx.index3.menuClickTrigger( '特种设备超期预警' );
        } );

        getReport( 'inspect', 'overtime', onInitInspectSuccess );
        jqueryMap.$inspectpageup.on( 'click', onPageUp );
        jqueryMap.$inspectpagedown.on( 'click', onPageDon );
        jqueryMap.$btninspect.on( 'click', function () {
            tjx.index3.menuClickTrigger( '安全设施检测超期预警' );
        } );


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

