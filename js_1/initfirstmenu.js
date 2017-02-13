/*function linkClick(n) {
    var iframe = document.getElementById("myIframe");
    iframe.src = n;
}*/


function loadXML(xmlpath) {
    var xmlDoc = null;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    } else if (document.implementation && document.implementation.createDocument) {
        xmlDoc = document.implementation.createDocument("", "", null);
    } else {
        alert('Your browser cannot handle this script.');
    }
    xmlDoc.async = false;
    xmlDoc.load(xmlpath);
    return xmlDoc;
}

$(document).ready(
    function() {
        initNavBar();
        inittopmenu();
        $(window).resize(function () {
            inittopmenu();
        });
    }
);

 function userlogout() {       
    $.get('UserLogin.ashx?method=exit', function (data) { window.parent.location.href = "Logo_1.aspx"; });
}
 
 function inittopmenu() {
     var url = "LoginService/" + urlParams["RoleName"];
          var call = new AjaxCall(url, "GET", null, initMenu, fail);
          call.callback(); 
 }

function broswerBack() {
    history.go(-1); //后退1页  
}
function broswerForward() {
    history.go(+1); //前进1页  
}
function broswerRefresh() {
    history.go(-0);  //刷新  
}


function initNavBar() {
    var temp_str = "";
    var rolename = urlParams["RoleName"];
    var username = urlParams["User"];
    if (rolename == username) {
        temp_str += "<b>当前用户：  " +   username + "【" + urlParams["EngUser"] + "】</b>";
    }
    else {
       temp_str += "<b>" + rolename + "</b>   " + username + "【" + urlParams["EngUser"] + "】";
     }


   temp_str += "<a href=\"javascript:userlogout()\"><dt class=\"mexit\"><b>注销</b></dt></a>";
   temp_str += "<a href=\"javascript:broswerForward()\"><dt class=\"mforward\">前进</dt></a>";
    temp_str += "<a href=\"javascript:broswerBack()\"><dt class=\"mback\">返回</dt></a>";
    console.log(temp_str);
    $("#navBar").empty();
    $(temp_str).appendTo("#navBar");
    
}

var _prefixWidth = 420;
var _navWidth = 20;
var _opWidth = 93;
var _index = 0;
var _count = 0;
var _span = 0;
var _items = new Array();
var _navLeft = "<li><span class=\"em\"><a href=\"javascript:navLeft()\" ><img src=\"images_1/Lfog.png\" width=\"10\" height=\"16\" /></a></span></li>";
var _navRight = "<li><span class=\"em\"><a href=\"javascript:navRight()\" ><img src=\"images_1/Rfog.png\" width=\"10\" height=\"16\" /></a></span></li>";
var _selectedIndex = 0;


function initMenu(xmlpath) {
    var s = xmlpath.split("\\");
    var ex = s[s.length - 1].split(".")[0];
    var path = "Menu/XMLTree/" + ex + ".xml";
    console.log(path);

    $.get(path, function (xml) {
        var oxml = xml;

        var c = $(oxml).find("Group").length;
        var w = document.body.clientWidth;


        console.log(w);
        console.log(c);
        var leftw = w - _prefixWidth - 30;
        var cop = parseInt(leftw / _opWidth);

        $("#menu").css("width", leftw);
        console.log(leftw);
        console.log(cop);
        var found = false;

        _items = new Array();
        $(oxml).find("Root > Group").each(function (i) {
            var node = new Object();
//            $(this).each(function () {
                eval("node." + "PicPath" + " = '" + $(this).attr("PicPath") + "'");
                eval("node." + "NavigateUrl" + " = '" + $(this).attr("NavigateUrl") + "&RoleNum=" + ex + "&FIndex=" + i + "'");
                eval("node." + "Text" + " = '" + $(this).attr("Text") + "'");
                console.log(node);
//            });
            _items.push(node);

        });
        if (c < cop) {
            buildFirstMenu(0, c, true, false);
        }
        else {
            var cop = parseInt((leftw - 40) / _opWidth);
            console.log(cop);
            _count = parseInt(c / cop);
            if ((c % cop) == 0) {
                _count -= 1;
            }
            _span = cop;
            buildFirstMenu(0, cop, true, true);
        }
    })
  //  $("#menu").focus();
window.scroll(0, 0);
//    $("html").scrollTop();
//    $("body").scrollTop();
 //  $(window).scrollTop();
  console.log("window.scroll");
}

function linkClick(url, ind) {
    console.log(url, ind, $("#frmright"));
    $("#frmright").attr("src", url);
    if (_selectedIndex != ind) {

        $("#uti" + _selectedIndex.toString()).attr("class", _items[_selectedIndex].PicPath);
        $("#uti" + ind.toString()).attr("class", _items[ind].PicPath + " active");
        _selectedIndex = ind;
    }
   // $("#menu").focus(); 
}

function navLeft() {
    console.log("_index=" + _index.toString() + ";_count=" + _count.toString());
    if (_index > 0) {
        _index -= 1;
        var st = _index * _span;
        var tail = st + _span;
        buildFirstMenu(st, tail, false, true);
    }
}

function navRight() {
    console.log("_index=" + _index.toString() + ";_count=" + _count.toString());
    if (_index < _count) {
        _index += 1;
        var st = _index * _span;
        var tail = 0;
        if ((st + _span) > _items.length) {
            tail = _items.length;
        }
        else {
            tail = st + _span;
        }
        buildFirstMenu(st, tail, false, true);
    }
}

function buildFirstMenu(start, end, isShowFirst, isShowNav) {
    var temp_str = "";
    if (isShowNav == true) {
        temp_str += _navLeft;
    }

    var found = false;
    for (var i = start; i < end; i++) {

        if (_selectedIndex == i) {
            temp_str += "<li id=\'uti" + i + "\' class=\'" + _items[i].PicPath + " active\'><a href=\"javascript:linkClick(\'" + _items[i].NavigateUrl + "\'," + i + ")\">" + "</a></li>";
            if (isShowFirst == true) {
                linkClick(_items[i].NavigateUrl, i);
            }
        }
        else {
            temp_str += "<li id=\'uti" + i + "\' class=\'" + _items[i].PicPath + "\'><a href=\"javascript:linkClick(\'" + _items[i].NavigateUrl + "\'," + i + ")\">" + "</a></li>";
        }
    }
    if (isShowNav == true) {
        temp_str += _navRight;
    }

    console.log(temp_str);
    $("#menu").empty();
    $(temp_str).appendTo("#menu");
}


function fail(result) {
    console.log(result.responseText);
}