function SecondlinkClick(n) {
    var iframe = window.parent.document.getElementById("frmright");
    console.log(iframe, n);
    iframe.src = n;
}

$(document).ready(
      function () {
          console.log("second");
          initSecondMenu();
      }
    )
var _titleClassName = "txt15";

function initSecondMenu() {
    var path = "Menu/XMLTree/" + getUrlParam("RoleNum") + ".xml";
    console.log("second",path);
    var selectedIndex = getUrlParam("FIndex");
    $.get(path, function (xml) {
        $(xml).find("Root > Group").each(function (i) {
            if (i == selectedIndex) {
                var temp_str = "<ul>";
                $(this).children().each(function (m) {
                    console.log((m % 3));

                    if (m != 0 && (m % 3) == 0) {
                        temp_str += "<li class=\'noMargin\'>";
                    }
                    else {
                        temp_str += "<li>";
                    }

                    temp_str += "<a href=\"javascript:SecondlinkClick(\'" + $(this).attr("NavigateUrl") + "\'," + i + ")\" class=\'" + $(this).attr("PicPath") + "\'>" + "</a>";
                    temp_str += "<p class=\'" + _titleClassName + "\'>";
                    temp_str += "<a href=\"javascript:SecondlinkClick(\'" + $(this).attr("NavigateUrl") + "\'," + i + ")\">" + $(this).attr("Text");
                    temp_str += "</a></p></li>";
                    temp_str += "</li>";
                });
                temp_str += "</ul>";
                console.log(temp_str);
                $("#secmenu").empty();
                $(temp_str).appendTo("#secmenu");
//        $(parent.window).scrollTop();
//        console.log("$(parent.window).scrollTop()");
            }
        });
    })
      
   // window.scroll(0, 0);
    //    $("html").scrollTop();
    //    $("body").scrollTop();
  
}

function fail(result) {
    console.log(result.responseText);
}