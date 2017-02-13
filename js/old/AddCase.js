

function ValidateNumber(s, e) {
    var length = s.GetText();
    //alert(length);
    var s1 = Number(length);
    if (isFinite(s1) == false) {
        alert("输入值不正确，请重新输入！");
        s.SetText("0");
        s.Focus();
        return false;
    }
    // alert(true);
    return true;
}

