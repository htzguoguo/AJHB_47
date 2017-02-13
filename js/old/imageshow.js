var _index = 1;
var _count = 0;


$(document).ready(function () {

    var caseid = urlParams["CaseID"];
    var status = urlParams["status"];
    
   

    var urld = "PDAService_E/img/" + caseid + "/" + status;
    var call = new AjaxCall(urld, "GET", null, imgShowCallback, fail);
    call.callback();


});

function imgShowCallback(result) {
    _count = Number(result);
    updateCountTip();
    picget(_index);
}

function updateCountTip() {
    if (_count == -1 || _count == 0) {
        $("#counttip").html("0/0");
    } else {
        $("#counttip").html(_index + "/" + _count);
    } 
}

function fail(xhr, statusText) {
    console.log(xhr.responseText);
    console.log(statusText);
}

function picforward() {
    if (_count != -1) {
        if (_index < _count) {
            _index++;

            updateCountTip();
           $("#img1").removeAttr('width').removeAttr('height');
           picget(_index);          
        }
    
    }
   
}

function picget(index) {
    var caseid = urlParams["CaseID"];
    var status = urlParams["status"];
    $("#img1").attr("src", "Handler1.ashx?CaseID=" + caseid + "&FileStatus=" + status + "&Index=" + index.toString() + "&Name=&Type=0");
}

function picbackword() {
    if (_count != -1) {
        
 if (_index != 1) {
        _index--;
    }
        updateCountTip();
    picget(_index);
        
    }
   
}

function setCenter(Xelement) {


    var parent = Xelement.parentNode;
    parent.style.position = "absolute";
    Xelement.style.position = "absolute";
    //            var pw = parent.clientWidth;
    //            var ph = parent.clientHeight;
    var pw = 550;
    var ph = 520;

    var mmm = document.getElementById("img1");

    var cw = mmm.naturalWidth;
    var ch = mmm.naturalHeight;
    //            var cw = Xelement.clientWidth;
    //            var ch = Xelement.clientHeight;

    var rw = cw / pw;
    var rh = ch / ph;
    console.log(pw, ph, cw, ch, rw, rh);


    console.log(mmm.height, mmm.width);
    console.log(mmm.naturalHeight, mmm.naturalWidth);
    console.log($("#img1").height(), $("#img1").width());

    if (rw > 1 || rh > 1) {
        if (rw > rh) {
            cw = pw;
            ch = ch / rw;
        }
        else {
            ch = ph;
            cw = cw / rh;
        }
    }



    var left = (pw - cw) / 2;
    var top = (ph - ch) / 2;
    top = top + 30;
    Xelement.style.left = left + "px";
    Xelement.style.top = top + "px";
    Xelement.style.width = cw + "px";
    Xelement.style.height = ch + "px";
}