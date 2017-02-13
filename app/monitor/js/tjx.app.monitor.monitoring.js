/**
 * Created by Administrator on 2015/12/5.
 */
/*
 * hntp.index1.js
 *  main entry after login
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, hntp */
tjx.app.monitor.monitoring = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
             scrollConfig : {
                height: '100%',
                railVisible: true,
                railColor: '#999',
                size: '5px',
                color: '#888',
                touchScrollStep: 60
            }
        },
        stateMap = {
            $container : null,
            download_type : '',
            recordvideo_time : {},
            menu_window : {}
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        linkClick,
        initMenu,
        fail,
        buildFirstLevelMenu,
        buildSecondLevelMenu,
        buildThirdLevelMenu,
        initSidebarNav,
        initSidebarScroll,
        isSidebarCollapsed,
        onPalyBack,
        validateDateInput,
        onDownloadVideoBegin, onDownloadVideoPause, onDownloadVideoResume,
        onDownloadVideoStop, updateDownloadVideoButtonStatus,
        onDownloadVideoComplete, updateRecordButtonStatus,
        onRecordVideoBegin, onRecordVideoEnd, onRecordVideoCancel,
        getCurrentDateTime, markMenuWithWindowNum
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    initSidebarNav  = function () {

        var resizeTimer

        $('.sidebar .dropdown > a').click (function(e) {

            if($(this).parent ().hasClass ('has_sub')) {
                e.preventDefault();
            }

            var $this = $(this),
                $li = $this.parents ('li')

            if(!$li.hasClass ("open")) {

                $li.siblings ().find ('ul').slideUp (250, function () {
                    $(this).parent ().removeClass ('open')
                })

                $li.find ('ul').slideDown (250, function () {
                    $(this).parent ().addClass ('open')
                })

            } else {
                $li.find ('ul').slideUp (250, function () {
                    $(this).parent ().removeClass ('open')
                })
            }

          /*  linkClick();*/

        })

        initSidebarScroll ()

        $(window).on('resize', function(e) {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(function() {
                initSidebarScroll ()
            }, 250)
        })
    }

    initSidebarScroll  = function () {
        if (!isSidebarCollapsed ()) {
            $('.sidebar-inner').slimScroll (configMap.scrollConfig)
        }
    };

    isSidebarCollapsed  = function () {
        return $('.sidebar-toggle').is (':visible')
    };

    buildFirstLevelMenu = function ( data ) {
        var strtemp = "",len, i, item;
        if ( data && data.length > 0 ) {
            len = data.length;
            for ( i = 0; i < len; i++ ) {
                item = data[i];
                if ( item.isActive ) {
                    strtemp += ' <li class="sidebar-header active">';
                }else {
                    strtemp += ' <li class="sidebar-header">';
                }
            /*    strtemp += ' <li class="sidebar-header">';*/
               /* strtemp += item.name;*/
                strtemp += '<a href="javascript:void(0);" hntp-data-url="' + item.url +  '"  hntp-data-type="1">';
                strtemp += item.name;
                strtemp += '</li>';
                strtemp += buildSecondLevelMenu( item.links );
                strtemp += '<li class="divider"></li>';
            }
        }
        return strtemp;
    };

    buildSecondLevelMenu = function ( data ) {
        var strtemp = "",len, i, item, issub = false;
        if ( data && data.length > 0 ) {
            len = data.length;
            for ( i = 0; i < len; i++ ) {
                item = data[i];
                if ( item.links && item.links.length > 0 ) {
                    issub = true ;
                }
                if ( item.isActive ) {
                    if ( issub ) {
                        strtemp += ' <li class="dropdown has_sub active open">';
                    }else {
                        strtemp += ' <li class="active">';
                    }
                }else {
                    if ( issub ) {
                        strtemp += '<li class="dropdown has_sub">';
                    }else {
                        strtemp += '<li >';
                    }
                }
                strtemp += '<a href="javascript:void(0);" hntp-data-url="' + item.deviceid +  '"  hntp-data-type="2">';
                strtemp += '<i class="' + item.icon + '"></i>';
                strtemp += item.name;
                strtemp += ' </a>';
                strtemp += buildThirdLevelMenu( item.links );
                strtemp += ' </li>';
            }
        }
        return strtemp;
    };

    buildThirdLevelMenu = function ( data ) {
        var strtemp = "",len, i, item;
        if ( data && data.length > 0 ) {
            strtemp += '  <ul class="list-unstyled" style="">';
            len = data.length;
            for ( i = 0; i < len; i++ ) {
                item = data[i];
                strtemp += ' <li>';
                strtemp += '<a href="javascript:void(0);" hntp-data-url="' + item.deviceid +  '"  hntp-data-type="3">';
                strtemp += item.name;
                strtemp += ' </a>';
                strtemp += ' </li>';
            }
            strtemp += ' </ul>';
        }
        return strtemp;
    };

    initMenu = function (  ) {

        var path = "para/" + 'hntp' + ".json";
        jqueryMap.$menu.empty();
        $.getJSON(path, function ( data ) {

            var temp = buildFirstLevelMenu( data );

            jqueryMap.$menu.html( temp );

            initSidebarNav();

            jqueryMap.$menu.find( 'a' ).on( 'click', linkClick );

            jqueryMap.$menu.find( 'li.active a').trigger('click');

            stateMap._selectedMenu =  jqueryMap.$menu.find( 'li.active a');
        }
        )         
    };

    linkClick = function (  ) {
        var url = $(this).attr( 'hntp-data-url' );
        var tt = $(this).attr( 'hntp-data-type' );
        var sel = null;
        if ( stateMap._selectedMenu ) {
            if($(this).parent ().parent().parent().hasClass ('has_sub')) {
                stateMap._selectedMenu.parent().removeClass( 'active' );
                $(this).parent().parent().parent().addClass( 'active' );
               /* stateMap._selectedMenu = $(this);*/
                sel = $(this);
                markMenuWithWindowNum( sel );
                tjx.app.monitor.camera.goPlay( url );

            }else {
                stateMap._selectedMenu.parent().removeClass( 'active' );
                $(this).parent().addClass( 'active' );
                stateMap._selectedMenu = $(this);
                sel = $(this).parent().find( 'ul li a' ).eq(0);

            }
        }else{
            stateMap._selectedMenu = $(this);
            $(this).parent().addClass( 'active' );
        }
      /* jqueryMap.$fircontent.load( url );*/

       /* tjx.app.monitor.map.doFindTask( url, tt );*/



    };

    markMenuWithWindowNum = function ( $menu ) {
         var nWndNo = tjx.app.monitor.camera.getSelectedWindowNum();
        nWndNo = (parseInt( nWndNo ) + 1).toString();
        //var nWndNo = '5';
        if ( stateMap.menu_window[ nWndNo ] ) {
            stateMap.menu_window[ nWndNo ].find( 'span' ).each( function ( index ) {
                if ($( this ).text().indexOf( nWndNo ) !== -1){
                    $(this).remove();
                }
            } );
        }
        //$menu.find( 'span' ).remove();
        stateMap.menu_window[ nWndNo ] = $menu;
        $menu.append('<span class="label label-danger arrowed pull-right">'+ nWndNo +  '号窗口</span>');
    };

    fail = function  ( result ) {

    };

    updateDownloadVideoButtonStatus = function ( status ) {
        switch ( status ) {
            case 'init':
                jqueryMap.$btn_downloadvideo.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_pause.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_resume.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_stop.attr('disabled',"disabled");
                break;
            case 'start':
                jqueryMap.$btn_downloadvideo.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_pause.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_resume.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_stop.removeAttr('disabled');
                break;
            case 'pause':
                jqueryMap.$btn_downloadvideo.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_pause.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_resume.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_stop.removeAttr('disabled');
                break;
            case 'resume':
                jqueryMap.$btn_downloadvideo.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_pause.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_resume.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_stop.removeAttr('disabled');
                break;
            case 'stop':
                jqueryMap.$btn_downloadvideo.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_pause.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_resume.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_stop.attr('disabled',"disabled");
                break;
            default:
                jqueryMap.$btn_downloadvideo.removeAttr('disabled');
                jqueryMap.$btn_downloadvideo_pause.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_resume.attr('disabled',"disabled");
                jqueryMap.$btn_downloadvideo_stop.attr('disabled',"disabled");
        }
    };

    updateRecordButtonStatus = function ( status ) {
        switch ( status ) {
            case 'init':
                jqueryMap.$btn_recordvideo_begin.removeAttr('disabled');
                jqueryMap.$btn_recordvideo_end.attr('disabled',"disabled");
                jqueryMap.$btn_recordvideo_cancel.attr('disabled',"disabled");
                break;
            case 'begin':
                jqueryMap.$btn_recordvideo_begin.attr('disabled',"disabled");
                jqueryMap.$btn_recordvideo_end.removeAttr('disabled');
                jqueryMap.$btn_recordvideo_cancel.removeAttr('disabled');
                break;
            case 'end':
                jqueryMap.$btn_recordvideo_begin.removeAttr('disabled');
                jqueryMap.$btn_recordvideo_end.attr('disabled',"disabled");
                jqueryMap.$btn_recordvideo_cancel.attr('disabled',"disabled");
                break;
            case 'cancel':
                jqueryMap.$btn_recordvideo_begin.removeAttr('disabled');
                jqueryMap.$btn_recordvideo_end.attr('disabled',"disabled");
                jqueryMap.$btn_recordvideo_cancel.attr('disabled',"disabled");
                break;
            default:
                jqueryMap.$btn_recordvideo_begin.removeAttr('disabled');
                jqueryMap.$btn_recordvideo_end.attr('disabled',"disabled");
                jqueryMap.$btn_recordvideo_cancel.attr('disabled',"disabled");
        }
    };

    validateDateInput = function () {
        var start = jqueryMap.$sdate.val(),
            eee = jqueryMap.$edate.val();
        if ( start === eee ) {
            alert( '请设置时间范围。' );
            return false;
        }else {
            return true;
        }
    };

    getCurrentDateTime = function () {
        var cur = new Date();
        return cur.getFullYear() + '-' + (cur.getMonth() + 1).toString() + '-' + cur.getDate() +
                ' ' + cur.getHours()  + ':' + cur.getMinutes();

    };

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $menu :  $container.find( '#hntpmenu' ),
            $sdate : $container.find( '#startdate' ),
            $edate : $container.find( '#enddate' ),
            $btn_playback : $container.find( '#btnplayback' ),
            $btn_playpause : $container.find( '#btnplaypause' ),
            $btn_playresume : $container.find( '#btnplayresume' ),
            $btn_playscreenshot : $container.find( '#btnplayscreenshot' ),
            $btn_downloadvideo : $container.find( '#btndownload' ),
            $btn_downloadvideo_pause : $container.find( '#btndownloadpause' ),
            $btn_downloadvideo_resume : $container.find( '#btndownloadresume' ),
            $btn_downloadvideo_stop : $container.find( '#btndownloadstop' ),
            $txt_downloadvideo_progress : $container.find( '#downloadvideoprogress' ),

            $btn_recordvideo_begin : $container.find( '#btnrecordstart' ),
            $btn_recordvideo_end : $container.find( '#btnrecordstop' ),
            $btn_recordvideo_cancel : $container.find( '#btnrecordcancel' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onPalyBack = function () {
        if ( validateDateInput() ) {
            var start = jqueryMap.$sdate.val(),
                eee = jqueryMap.$edate.val();
            tjx.app.monitor.camera.goPlayback( {
                starttime : start,
                endtime : eee
            } );
        };
    };

    onDownloadVideoBegin = function () {
        if ( validateDateInput() ) {
            var start = jqueryMap.$sdate.val(),
                eee = jqueryMap.$edate.val();

            tjx.app.monitor.camera.goDownloadVideo( {
                starttime : start,
                endtime : eee
            } );
            updateDownloadVideoButtonStatus( 'start' );
            stateMap.download_type = 'history';
        }
    };

    onDownloadVideoPause = function () {
        tjx.app.monitor.camera.goDownloadVideoPause();
        updateDownloadVideoButtonStatus( 'pause' );
    };

    onDownloadVideoResume = function () {
        tjx.app.monitor.camera.goDownloadVideoResume();
        updateDownloadVideoButtonStatus( 'resume' );
    };

    onDownloadVideoStop = function () {
        tjx.app.monitor.camera.goDownloadVideoStop();
        updateDownloadVideoButtonStatus( 'stop' );
        jqueryMap.$txt_downloadvideo_progress.text( '0' );
    };

    onDownloadVideoComplete = function () {
        updateDownloadVideoButtonStatus( 'init' );
        switch ( stateMap.download_type ) {
            case 'record':
                break;
            case 'history':
                updateDownloadVideoButtonStatus( 'init' );
                break;
            default :
                break;
        }
    };

    onRecordVideoBegin = function () {

        stateMap.recordvideo_time.begin = getCurrentDateTime();
        updateRecordButtonStatus( 'begin' );
        stateMap.download_type = 'record';
    };

    onRecordVideoEnd = function () {
        stateMap.recordvideo_time.end = getCurrentDateTime();
        updateRecordButtonStatus( 'end' );
        var start = stateMap.recordvideo_time.begin,
            eee = stateMap.recordvideo_time.end;

        tjx.app.monitor.camera.goDownloadVideo( {
            starttime : start,
            endtime : eee
        } );
    };

    onRecordVideoCancel = function () {
        updateRecordButtonStatus( 'cancel' );
    };

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
        initMenu();

        tjx.util.ui.initDateTime( jqueryMap.$container, new Date() );
        
        jqueryMap.$btn_playback.on( 'click', onPalyBack );
        jqueryMap.$btn_playpause.on( 'click', tjx.app.monitor.camera.goPlayPause );
        jqueryMap.$btn_playresume.on( 'click', tjx.app.monitor.camera.goPlayResume );
        jqueryMap.$btn_playscreenshot.on( 'click', tjx.app.monitor.camera.goPlayScreenShot);

        //
        updateDownloadVideoButtonStatus( 'init' );
        jqueryMap.$btn_downloadvideo.on( 'click', onDownloadVideoBegin );
        jqueryMap.$btn_downloadvideo_pause.on( 'click', onDownloadVideoPause );
        jqueryMap.$btn_downloadvideo_resume.on( 'click', onDownloadVideoResume );
        jqueryMap.$btn_downloadvideo_stop.on( 'click', onDownloadVideoStop );

        //
        updateRecordButtonStatus( 'init' );
        jqueryMap.$btn_recordvideo_begin.on( 'click', onRecordVideoBegin );
        jqueryMap.$btn_recordvideo_end.on( 'click', onRecordVideoEnd );
        jqueryMap.$btn_recordvideo_cancel.on( 'click', onRecordVideoCancel );
        //
        tjx.shell.subscribeEvent( 'tjx-monitor-download-end', onDownloadVideoComplete   );
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
