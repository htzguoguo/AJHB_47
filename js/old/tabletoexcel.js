var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))); }, format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }); };
    return function(table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };

        document.getElementById("dlink").href = uri + base64(format(template, ctx));
        document.getElementById("dlink").download = filename;
        document.getElementById("dlink").click();

    };
})();

function savetoexcel(table) {
    window.open('data:application/vnd.ms-excel,' + document.getElementById(table).innerHTML);
}


function excelSave(table) {
    
$('#' + table).tableExport({type:'excel', separator:';', escape:'false'});    
}


function fnExcelReport(table)
{
    var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById(table); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=  tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    console.log(tab_text);

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        
        sa = window.open('data:application/vnd.ms-excel;charset=utf-8,' + window.unescape(encodeURIComponent(tab_text)));
//         sa = window.open('data:application/vnd.ms-excel,' + tab_text);
//           sa = window.open('data:application/vnd.ms-excel;base64,'+Base64.encode(tab_text));

    console.log(encodeURIComponent(tab_text));

    return (sa);
}

function normalexport(table, name) {

       try {
           var i;
           var j;
           var mycell;
//           var drop = document.getElementById('<%= ddl_sections.ClientID %>');
           var objXL = new ActiveXObject("Excel.Application");
           var objWB = objXL.Workbooks.Add();
           var objWS = objWB.ActiveSheet;
//           var str = filterNum(drop.options[drop.selectedIndex].text);
           var str = name;
           objWB.worksheets("Sheet1").activate; //activate dirst worksheet
           var XlSheet = objWB.activeSheet; //activate sheet
           XlSheet.Name = str; //rename


           for (i = 0; i < document.getElementById(table).rows.length - 1; i++) {
               for (j = 0; j < document.getElementById(table).rows(i).cells.length; j++) {
                   mycell = document.getElementById(table).rows(i).cells(j);

                   objWS.Cells(i + 1, j + 1).Value = mycell.innerText;

                   //                                                objWS.Cells(i + 1, j + 1).style.backgroundColor = mycell.style.backgroundColor;
               }
           }

           objWS.Range("A1", "L1").Font.Bold = true;
           //                objWS.Range("A1", "L1").Font.ColorIndex = 2;
           //                 objWS.Range("A1", "Z1").Interior.ColorIndex = 47;

           objWS.Range("A1", "Z1").EntireColumn.AutoFit();

           //objWS.Range("C1", "C1").ColumnWidth = 50;

           objXL.Visible = true;

       } catch (err) {
           alert("Error. Scripting for ActiveX might be disabled");
           return;
       }
       idTmr = window.setInterval("Cleanup();", 1);

   }


   function filterNum(str) {

       return str.replace(/[ / ]/g, '');
   }