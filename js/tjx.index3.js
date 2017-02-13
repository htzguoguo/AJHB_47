/**
 * Created by Administrator on 2015/12/5.
 */
/*
 * tjx.index3.js
 * left is menu and right is content
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, tjx */
tjx.index3 = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            unselected_color : '#3A3A3A',
            selected_color : '#3489BC',
            loginurl : 'login.aspx'
        },
        stateMap = {
            $container : null,
            _lastSelected : "none",
            roleNum : getUrlParam("RoleNum"),
            select_guid : null,
            select_title : null,
            current_chsuser : getUrlParam("User")
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        initThirdMenu, thirdlinkClick, getGUID,
        getTitle, setBootstrapLanguage, getChsUser,
        menuClickTrigger
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString



    initThirdMenu = function (  ) {
        var path = "Menu/XMLTree/" + stateMap.roleNum + ".xml";
        var selectedIndex = getUrlParam("FIndex");
        $.get(path, function (xml) {
            $(xml).find("Root > Group").each(function (i) {
                if (i == selectedIndex) {
                    var temp_str = "<p class=\"tit1\"> 功能菜单</p>";
                    var secg = $(this).find("Group").length;
                    var isfirst = false;
                    if (secg == 0) {
                        temp_str += "<ul>";
                        $(this).children().each(function (m) {
                            var liid = m.toString();
                            if (isfirst == false) {
                                temp_str += "<li id=\"" + "thrli" + liid + "\" class=\'active\'>";
                            }
                            else {
                                temp_str += "<li id=\"" + "thrli" + liid + "\">";
                            }
                            temp_str += "<a  href=\"javascript:void(0);\"  onclick=\"tjx.index3.thirdlinkClick(\'" + $(this).attr("NavigateUrl") + "\',\'" + liid + "\',\'" + $(this).attr("Text") + "\')\" tjx-menu-text=\""  + $(this).attr("Text")  +  "\" target=\"_self\">" + $(this).attr("Text") + "</a>";

                            if (isfirst == false) {
                                thirdlinkClick($(this).attr("NavigateUrl"), liid , $(this).attr("Text"));
                                isfirst = true;
                            }
                            temp_str += "</li>";
                        });
                        temp_str += "</ul>";
                    }
                    else {
                        $(this).find("Group").each(function (i) {
                            temp_str += "<ul>";
                            temp_str += "<p class=\'" + $(this).attr("PicPath") + "\'>" + $(this).attr("Text") + "</p>";
                            $(this).children().each(function (m) {
                                var liid = "a" + i.toString() + m.toString();
                                if (isfirst == false) {
                                    temp_str += "<li id=\"" + "thrli" + liid + "\" class=\'active\'>";

                                }
                                else {
                                    temp_str += "<li id=\"" + "thrli" + liid + "\">";
                                }
                                temp_str += "<a href=\"javascript:void(0);\" onclick=\"tjx.index3.thirdlinkClick(\'" + $(this).attr("NavigateUrl") + "\',\'" + liid + "\',\'" +  $(this).attr("Text")  +  "\')\" tjx-menu-text=\""  + $(this).attr("Text")  +  "\" target=\"_self\">" + $(this).attr("Text") + "</a>";
                                temp_str += "</li>";
                                if (isfirst == false) {
                                    thirdlinkClick($(this).attr("NavigateUrl"), liid.toString(), $(this).attr("Text"));
                                    isfirst = true;
                                }
                            });
                            temp_str += "</ul>";
                        });
                    }
                    jqueryMap.$thrmenu.empty();
                    jqueryMap.$thrmenu.html( temp_str );
                    parent.window.scroll(0, 0);
                    window.parent.window.scrollTo(0, 0);
                    top._justonce = true;

                    jqueryMap.$thrmenu.find('ul p').css({'color': configMap.unselected_color });
                    jqueryMap.$thrmenu.find('li').hide();
                    jqueryMap.$thrmenu.find('ul p').click(function(){

                        jqueryMap.$thrmenu.find('ul p').css({'color': configMap.unselected_color });
                        $(this).css({"color": configMap.selected_color});

                        $(".menu_chioce").slideUp();
                        $(this).parent().find('li').slideToggle();
                        $(this).parent().find('li').addClass("menu_chioce");
                    });
                    var c1 =  jqueryMap.$thrmenu.find( 'ul p:first');
                    c1.trigger( 'click' );
                }
            });
        })
    };

    function fail(result) {

    };

    thirdlinkClick = function ( n, i, title ) {


        if (stateMap._lastSelected == "none") {
            stateMap._lastSelected = i;
            $("#thrli"  + i.toString()).addClass("active");
        }
        else {
            $("#thrli" + stateMap._lastSelected.toString()).removeClass('active');
            $("#thrli" + i.toString()).addClass("active");
            stateMap._lastSelected = i;
        }
      /*  var iframe = document.getElementById("thrright");
         iframe.src = n;
         top._justscr = n;*/

        stateMap.select_title = title;

        jqueryMap.$thrcontent.load( n ,  function(responseText,textStatus,XMLHttpRequest){

            if ( responseText === configMap.loginurl){
                top.window.location.href = configMap.loginurl;
            }
        });
        stateMap.select_guid = tjx.util.getParameterByName( n, 'FID');


//responseText:请求返回的内容
//textStatus:请求状态：success、error、notmodified、timeout这4种
//XMLHttpRequest:XMLHttpRequest对象

        //jqueryMap.$thrcontent.load( 'test2.html' );

    };

    setBootstrapLanguage = function () {

    };


//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $thrmenu : $container.find( '.index3-left-menu' ),
            $thrcontent : $container.find( '.index3-right-content' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    menuClickTrigger = function ( title ) {
        
        jqueryMap.$thrmenu.find( 'a[tjx-menu-text=' + title +  ']').trigger('click');
    };

    getChsUser = function () {
        return stateMap.current_chsuser;
    };

    getTitle = function (  ) {
        return stateMap.select_title;
    };

    getGUID = function (  ) {
        return stateMap.select_guid;
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
        initThirdMenu();

        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        thirdlinkClick : thirdlinkClick,
        getGUID : getGUID,
        getTitle : getTitle,
        getChsUser : getChsUser,
        menuClickTrigger : menuClickTrigger
    };
//------------------- END PUBLIC METHODS ---------------------
}());
