function Setcookie (name, value) {  //设置名称为name,值为value的Cookie 
        var argc = SetCookie.arguments.length; 
        var argv = SetCookie.arguments;     
        var path = (argc > 3) ? argv[3] : null;   
        var domain = (argc > 4) ? argv[4] : null;   
        var secure = (argc > 5) ? argv[5] : false;   
         
         
        document.cookie = name + "=" + value +  
        ((path == null) ? "" : ("; path=" + path)) +   
        ((domain == null) ? "" : ("; domain=" + domain)) +     
        ((secure == true) ? "; secure" : ""); 
} 

function Deletecookie (name) {  //删除名称为name的Cookie 
    var exp = new Date();   
    exp.setTime (exp.getTime() - 1);   
    var cval = GetCookie (name);   
    document.cookie = name + "=" + "" + "; expires=" + exp.toGMTString(); 
} 

function getCookieVal (offset) {       //取得项名称为offset的cookie值 
    var endstr = document.cookie.indexOf (";", offset);   
    if (endstr == -1) 
        endstr = document.cookie.length;   
        return unescape(document.cookie.substring(offset, endstr)); 
} 

function GetCookie (name) {  //取得名称为name的cookie值 
        var arg = name + "=";   
        var alen = arg.length;   
        var clen = document.cookie.length;   
        var i = 0;   
        while (i < clen) {     
        var j = i + alen;     
        if (document.cookie.substring(i, j) == arg)       
                return getCookieVal (j);     
                i = document.cookie.indexOf(" ", i) + 1;     
                if (i == 0) break;    
        }   
        return null; 
} 