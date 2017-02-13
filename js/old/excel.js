function excelMethod2() { 
     document.write(AutoNumber1.outerHTML);
   try
   {
    document.execCommand("SaveAs",true,"123.xls");
   }
   catch(e)
   { 
   alert("您的浏览器版本太低，请升级您的浏览器！");}
 
}

function excelMethod1(tableid) {//整个表格拷贝到EXCEL中
    alert(tableid);
    var curTbl = document.getElementById(tableid); 
    var oXL = new ActiveXObject("Excel.Application"); 
    //创建AX对象excel 
    var oWB = oXL.Workbooks.Add(); 
    //获取workbook对象 
        var oSheet = oWB.ActiveSheet; 
    //激活当前sheet 
    var sel = document.body.createTextRange(); 
    sel.moveToElementText(curTbl); 
    //把表格中的内容移到TextRange中 
    sel.select(); 
    //全选TextRange中内容 
    sel.execCommand("Copy"); 
    //复制TextRange中内容  
    oSheet.Paste(); 
    //粘贴到活动的EXCEL中       
    oXL.Visible = true; 
    //设置excel可见属性 
} 

function  outExcel(atblData){               
var               w               =               window.open("about:blank",               "Excel",               "widht=0,               height=0");       
w.document.write(atblData.outerHTML);       
if(w.document.execCommand('Saveas',true, 'C:\\123.txt'))   
alert("导出成功");   
else       
alert("导出失败！");       
window.close();
}

function doFileExport(inName, inStr) {
    var xlsWin = null;
    if (!!document.all("glbHideFrm")) {
        xlsWin = glbHideFrm;
    }
    else {
        var width = 6;
        var height = 4;
        var openPara = "left=" + (window.screen.width / 2 - width / 2)
                + ",top=" + (window.screen.height / 2 - height / 2)
                + ",scrollbars=no,width=" + width + ",height=" + height;
        xlsWin = window.open("", "_blank", openPara);
    }
    xlsWin.document.write(inStr);
    xlsWin.document.close();
    xlsWin.document.execCommand('Saveas', true, inName);
    xlsWin.close();
} 
  


