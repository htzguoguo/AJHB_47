/**
 * Created by Administrator on 2015/12/5.
 */
/*
 * tjx.index1.js
 *  main entry after login
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, tjx */
tjx.index1 = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            content_id : 'myIframe',
            login_url : 'login.aspx',
            rest_server_url : 'LoginService/',
            menu_scheme_map : {
                _prefixWidth : 420,
                _navWidth : 20,
                _opWidth : 93,
                _navLeft : "<li><span class=\"tjx-shell-index1-head-em-left\"><a href=\"javascript:tjx.index1.navLeft()\" ><img src=\"images/index1/Lfog.png\" width=\"10\" height=\"16\" /></a></span></li>",
                _navRight : "<li><span class=\"tjx-shell-index1-head-em-right\"><a href=\"javascript:tjx.index1.navRight()\" ><img src=\"images/index1/Rfog.png\" width=\"10\" height=\"16\" /></a></span></li>"
            }

        },
        stateMap = {
            $container : null,
            _index : 0,
            _count : 0,
            _span : 0,
            _items : new Array(),
            _selectedIndex : 0,
           /* rolename : urlParams['RoleName'],
            username : urlParams['User'],
            engusername : urlParams['EngUser']*/
             rolename : decodeURIComponent(tjx.shell.getSiteData('RoleName')),
             username : decodeURIComponent(tjx.shell.getSiteData('User')),
             engusername : decodeURIComponent(tjx.shell.getSiteData('EngUser'))
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        linkClick, userlogout , inittopmenu, initNavBar,
        navLeft, navRight, initMenu, buildFirstMenu, fail,
        setSiteData, rebuildMenu,
        oepnMenu
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    setSiteData = function (  ) {
        tjx.shell.saveSiteData( 'rolename', stateMap.rolename );
        tjx.shell.saveSiteData( 'username', stateMap.username );
        tjx.shell.saveSiteData( 'engusername', stateMap.engusername );
    };

   /* linkClick = function (n) {
        var iframe = document.getElementById(configMap.content_id);
        iframe.src = n;
    };*/

    userlogout = function ( ) {
        $.get('UserLogin.ashx?method=exit', function (data) { window.parent.location.href = configMap.login_url; });
    };

   /* inittopmenu = function (  ) {
        var url = configMap.rest_server_url + stateMap.rolename;
        var call = new AjaxCall(url, "GET", null, initMenu, fail);
        call.callback();
    };*/

     inittopmenu = function (  ) {

         var arg_map = {
             data : stateMap.rolename,
             success : initMenu,
             fail : fail
         };
         tjx.data.index1.getMenu( arg_map );

     };

    initNavBar = function (  ) {
        var temp_str =  new String();
        var rolename = stateMap.rolename;
        var username = stateMap.username;
        if (rolename == username) {
            temp_str += "<b>当前用户：  " +   username + "【" + stateMap.engusername + "】</b>";
        }
        else {
            temp_str += "<b>" + rolename + "</b>   " + username + "【" + stateMap.engusername + "】";
        }



        temp_str += "<a href=\"javascript:tjx.index1.userlogout()\"><dt class=\"tjx-shell-index1-nav-exit\"><b>注销</b></dt></a>";
        temp_str += "<a href=\"javascript:tjx.util.broswerForward()\"><dt class=\"tjx-shell-index1-nav-forward\">前进</dt></a>";
        temp_str += "<a href=\"javascript:tjx.util.broswerBack()\"><dt class=\"tjx-shell-index1-nav-back\">返回</dt></a>";


        jqueryMap.$navbar.empty();
        jqueryMap.$navbar.html(temp_str);
      //  $(temp_str).appendTo("#navBar");
    };

    initMenu = function ( xmlpath ) {
        if ( ! xmlpath ) {
            return;
        }
        var s = xmlpath.split("\\");
        var ex = s[s.length - 1].split(".")[0];
        var path = "Menu/XMLTree/" + ex + ".xml";
        $.get(path, function (xml) {
            var oxml = xml;
            var c = $(oxml).find("Root > Group").length;
            var w = document.body.clientWidth;

            var leftw = w - configMap.menu_scheme_map._prefixWidth - 30;
            var cop = parseInt(leftw / configMap.menu_scheme_map._opWidth);

            jqueryMap.$menu.css("width", leftw);
            var found = false;
            stateMap._items = new Array();
            $(oxml).find("Root > Group").each(function (i) {
                var node = new Object();
//            $(this).each(function () {
                eval("node." + "PicPath" + " = '" + $(this).attr("PicPath") + "'");
                eval("node." + "NavigateUrl" + " = '" + $(this).attr("NavigateUrl") + "&RoleNum=" + ex + "&FIndex=" + i + "'");
                eval("node." + "Text" + " = '" + $(this).attr("Text") + "'");
//            });
                stateMap._items.push(node);
            });
            if (c < cop) {
                buildFirstMenu(0, c, true, false);
            }
            else {
                var cop = parseInt((leftw - 40) / configMap.menu_scheme_map._opWidth);
                stateMap._count = parseInt(c / cop);
                if ((c % cop) == 0) {
                    stateMap._count -= 1;
                }
                stateMap. _span = cop;
                buildFirstMenu(0, cop, true, true);
            }
        });
        //  $("#menu").focus();
        window.scroll(0, 0);
//    $("html").scrollTop();
//    $("body").scrollTop();
        //  $(window).scrollTop();
    };

    linkClick = function ( url, ind ) {
        jqueryMap.$frmright.attr("src", url);
       //jqueryMap.$fircontent.load( url );
        if (stateMap._selectedIndex != ind) {

            $("#uti" + stateMap._selectedIndex.toString()).attr("class", stateMap._items[stateMap._selectedIndex].PicPath);
            $("#uti" + ind.toString()).attr("class", stateMap._items[ind].PicPath + " active");
            stateMap._selectedIndex = ind;
        }
        // $("#menu").focus();
    };

    navLeft = function (  ) {
        if ( stateMap._index > 0 ) {
            stateMap._index -= 1;
            var st = stateMap._index * stateMap._span;
            var tail = st + stateMap._span;
            buildFirstMenu(st, tail, false, true);
        }
    };

    navRight = function (  ) {
        if ( stateMap._index < stateMap._count ) {
            stateMap._index += 1;
            var st = stateMap._index * stateMap._span;
            var tail = 0;
            if ((st + stateMap._span) > stateMap._items.length) {
                tail = stateMap._items.length;
            }
            else {
                tail = st + stateMap._span;
            }
            buildFirstMenu(st, tail, false, true);
        }
    };

    buildFirstMenu = function ( start, end, isShowFirst, isShowNav ) {
        var temp_str = new String();
        if (isShowNav == true) {
            temp_str += configMap.menu_scheme_map._navLeft;
        }

        var found = false;
        for (var i = start; i < end; i++) {

            if ( stateMap._selectedIndex === i ) {
                temp_str += "<li id=\'uti" + i + "\' class=\'" + stateMap._items[i].PicPath + " active\'><a href=\"javascript:tjx.index1.linkClick(\'" + stateMap._items[i].NavigateUrl + "\'," + i + ")\">" + "</a></li>";
                if (isShowFirst == true) {
                    linkClick( stateMap._items[i].NavigateUrl, i );
                }
            }
            else {
                temp_str += "<li id=\'uti" + i + "\' class=\'" + stateMap._items[i].PicPath + "\'><a href=\"javascript:tjx.index1.linkClick(\'" + stateMap._items[i].NavigateUrl + "\'," + i + ")\">" + "</a></li>";
            }
        }
        if (isShowNav == true) {
            temp_str += configMap.menu_scheme_map._navRight;
        }
        jqueryMap.$menu.empty();
        jqueryMap.$menu.append(temp_str);
      /*  $("#menu").empty();
        $(temp_str).appendTo("#menu");*/
    };

    fail = function  ( result ) {

    };

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $navbar : $container.find( '.tjx-shell-index1-nav' ),
            $menu :  $container.find( '.tjx-shell-index1-head-menu' ),
            $frmright :  $container.find( '#frmright' ),
            $fircontent : $container.find( '.tjx-shell-index1-content' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
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
    oepnMenu = function ( name ) {
         
       var id = jqueryMap.$menu.find('li[class='+ name +  ']').attr( 'id' );
        var i = id.slice( 3 );
        linkClick('wwm/onemappage/index.html' ,i );
       /* jqueryMap.$menu.find('li[class='+ name +  ']').mousedown();*/

    };

    configModule = function ( input_map ) {
        spa.butil.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            config_map : configMap
        });
        return true;
    };

    rebuildMenu = function () {
        $(window).unbind('resize');
        inittopmenu();
        $(window).bind('resize',rebuildMenu);
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
        initNavBar();
        inittopmenu();

       /* $(window).bind('resize',rebuildMenu);*/

       /* $(window).resize(function () {
            inittopmenu();
        });*/
        tjx.util.ui.onWindowResize( inittopmenu );

        setSiteData();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        linkClick : linkClick,
        userlogout : userlogout,
        navLeft : navLeft,
        navRight : navRight,
        oepnMenu : oepnMenu
    };
//------------------- END PUBLIC METHODS ---------------------
}());
