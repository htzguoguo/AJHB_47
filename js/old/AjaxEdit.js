// Global storage for newly added row
var newRow;

$(document).ready(function () {


    // Use live so when adding new records the events will
    // automatically be bounde
//    $("[id*='edit']").live('click', OnEdit);
    //    $("[id*='delete']").live('click', OnDelete);

    $(document).on("click", "[id*='edit']", OnEdit);
    $(document).on("click", "[id*='delete']", OnDelete);
    $("[id*='add']").click(OnAdd);
    $(document).on("keydown", "[id*='Text5']", KeyDownNum);
    $(document).on("keydown", "[id*='Text15']", KeyDownNum);

    $(document).on("keydown", "[id*='Text6']", KeyDownNum);

//    $(document).on("keydown", "[id*='Text7']", KeyDownNum);
//    $(document).on("keydown", "[id*='Text11']", KeyDownNum);


//    $("#Text1").keydown(function (e) {
//        // Allow: backspace, delete, tab, escape, enter and .
//        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
//        // Allow: Ctrl+A
//            (e.keyCode == 65 && e.ctrlKey === true) ||
//        // Allow: home, end, left, right
//            (e.keyCode >= 35 && e.keyCode <= 39)) {
//            // let it happen, don't do anything
//            return;
//        }
//        // Ensure that it is a number and stop the keypress
//        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
//            e.preventDefault();
//        }
//    });


});

function KeyDownNum(e) {
 
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
          
}

function OnEdit() {

   
    // Get the row this button is within
    var tr = $(this).closest("tr");
    // Get the first and last name controls in this row
//    var firstName = tr.find("span[id='firstName']");
//    var lastName = tr.find("span[id='lastName']");
    var road = tr.find("span[id='span1']");
    var station = tr.find("span[id='span2']");
    var subject = tr.find("span[id='span3']");
    var unit = tr.find("span[id='span4']");
    var amount = tr.find("span[id='span5']");
    var price = tr.find("span[id='span15']");
//    var ration = tr.find("span[id='span6']");
//    var mamount = tr.find("span[id='span7']");

//    var m1 = tr.find("span[id='span8']");
//    var m2 = tr.find("span[id='span9']");
//    var m3 = tr.find("span[id='span10']");
//    var c1 = tr.find("span[id='span11']");
//    var c2 = tr.find("span[id='span12']");
//    var c3 = tr.find("span[id='span13']");
    var memo = tr.find("span[id='span14']");


    // Insert an input element before the labels
    // and set the value to the label text
    // Then hide the label
    road.before("<input id='span1Edit' type='text' value='" + road.text() + "'/>").hide();
    station.before("<input id='span2Edit' type='text' value='" + station.text() + "'/>").hide();
    subject.before("<input id='span3Edit' type='text' value='" + subject.text() + "'/>").hide();
    unit.before("<input id='span4Edit' type='text' value='" + unit.text() + "'/>").hide();
    amount.before("<input id='span5Edit' type='text' onkeydown='KeyDownNum(event)' value='" + amount.text() + "'/>").hide();
    price.before("<input id='span15Edit' type='text' onkeydown='KeyDownNum(event)' value='" + price.text() + "'/>").hide();
//    ration.before("<input id='span6Edit' type='text' onkeydown='KeyDownNum(event)' value='" + ration.text() + "'/>").hide();
//    mamount.before("<input id='span7Edit' type='text' onkeydown='KeyDownNum(event)' value='" + mamount.text() + "'/>").hide();
//    m1.before("<input id='span8Edit' type='text' value='" + m1.text() + "'/>").hide();
//    m2.before("<input id='span9Edit' type='text' value='" + m2.text() + "'/>").hide();
//    m3.before("<input id='span10Edit' type='text' value='" + m3.text() + "'/>").hide();
//    c1.before("<input id='span11Edit' type='text'  onkeydown='KeyDownNum(event)' value='" + c1.text() + "'/>").hide();
//    c2.before("<input id='span12Edit' type='text' value='" + c2.text() + "'/>").hide();
//    c3.before("<input id='span13Edit' type='text' value='" + c3.text() + "'/>").hide();
    memo.before("<input id='span14Edit' type='text' value='" + memo.text() + "'/>").hide();


    // Hide the existing buttons and add a save button in there place
    tr.find("[id*='delete']").hide();
    tr.find("[id*='edit']").before("<img id='save' src='images/b4.jpg' />")
        .hide();

    tr.find("[id*='save']").one('click', OnSave);
}

function OnSave()
{
    // Get the row this button is within
    var tr = $(this).closest("tr");

    var road = tr.find("[id='span1Edit']");
    var station = tr.find("[id='span2Edit']");
    var subject = tr.find("[id='span3Edit']");
    var unit = tr.find("[id='span4Edit']");
    var amount = tr.find("[id='span5Edit']");
    var price = tr.find("[id='span15Edit']");
//    var ration = tr.find("[id='span6Edit']");
//    var mamount = tr.find("[id='span7Edit']");
//    var m1 = tr.find("[id='span8Edit']");
//    var m2 = tr.find("[id='span9Edit']");
//    var m3 = tr.find("[id='span10Edit']");
//    var c1 = tr.find("[id='span11Edit']");
//    var c2 = tr.find("[id='span12Edit']");
//    var c3 = tr.find("[id='span13Edit']");
    var memo = tr.find("[id='span14Edit']");

    // Set the text of the labels from the input elements and show them
    tr.find("span[id='span1']").text(road.val()).show();
    tr.find("span[id='span2']").text(station.val()).show();
    tr.find("span[id='span3']").text(subject.val()).show();
    tr.find("span[id='span4']").text(unit.val()).show();
    tr.find("span[id='span5']").text(amount.val()).show();
    tr.find("span[id='span15']").text(price.val()).show();
//    tr.find("span[id='span6']").text(ration.val()).show();
//    tr.find("span[id='span7']").text(mamount.val()).show();
//    tr.find("span[id='span8']").text(m1.val()).show();
//    tr.find("span[id='span9']").text(m2.val()).show();
//    tr.find("span[id='span10']").text(m3.val()).show();
//    tr.find("span[id='span11']").text(c1.val()).show();
//    tr.find("span[id='span12']").text(c2.val()).show();
//    tr.find("span[id='span13']").text(c3.val()).show();
    tr.find("span[id='span14']").text(memo.val()).show();

    // Remove the input elements
    road.remove();
    station.remove();
    subject.remove();
    unit.remove();
    amount.remove();
    price.remove();
//    ration.remove();
//    mamount.remove();
//    m1.remove();
//    m2.remove();
//    m3.remove();
//    c1.remove();
//    c2.remove();
//    c3.remove();
    memo.remove();

    // Show the buttons again and remove the save
    tr.find("[id*='delete']").show();
    tr.find("[id*='edit']").show();
    tr.find("[id*='save']").remove();

    // update the contact on the server
    UpdateContact(tr.attr("id"), road.val(), station.val(), subject.val(), unit.val(), amount.val(),   memo.val(),price.val());
}

function OnDelete() {
   
    var tr = $(this).closest("tr");
   
    tr.remove();
    DeleteContact(tr.attr("id"));
}

function OnAdd() {
 
    // Get the row this button is within
    var tr = $(this).closest("tr");
    // Get the first and last name controls in this row
    var road = tr.find("#Text1");
    var station = tr.find("#Text2");
    var subject = tr.find("#Text3");
    var unit = tr.find("#Text4");
    var amount = tr.find("#Text5");
    var price = tr.find("#Text15");
//    var ration = tr.find("#Text6");
//    var mamount = tr.find("#Text7");
//   
//    var m1 = tr.find("#Text8");
//    var m2 = tr.find("#Text9");
//    var m3 = tr.find("#Text10");
//    var c1 = tr.find("#Text11");
////    var c2 = tr.find("#Text12");
////    var c3 = tr.find("#Text13");
    var memo = tr.find("#Text14");
    // Create a new row and update the firstname and lastname elements
    // appropriately


    newRow = NewRow(tr);
    newRow.find("span[id='span1']").text(road.val());
    newRow.find("span[id='span2']").text(station.val());
    newRow.find("span[id='span3']").text(subject.val());
    newRow.find("span[id='span4']").text(unit.val());
    newRow.find("span[id='span5']").text(amount.val());
    newRow.find("span[id='span15']").text(price.val());
//    newRow.find("span[id='span6']").text(ration.val());
//    newRow.find("span[id='span7']").text(mamount.val());
//    newRow.find("span[id='span8']").text(m1.val());
//    newRow.find("span[id='span9']").text(m2.val());
//    newRow.find("span[id='span10']").text(m3.val());
//    newRow.find("span[id='span11']").text(c1.val());
//    newRow.find("span[id='span12']").text(c2.val());
//    newRow.find("span[id='span13']").text(c3.val());
    newRow.find("span[id='span14']").text(memo.val());

    AddContact(road.val(), station.val(), subject.val(), unit.val(), amount.val(),  memo.val(), price.val());
 
    // Clear everything out to start again
    road.val("");
    station.val("");
    subject.val("");
    unit.val("");
    amount.val("");
    price.val("");
//    ration.val("");
//    mamount.val("");
//    m1.val("");
//    m2.val("");
//    m3.val("");
//    c1.val("");
//    c2.val("");
//    c3.val("");
    memo.val("");
}

function GetDate() {
    var jsDate = ade2.GetDate();

    var year = jsDate.getFullYear(); // where getFullYear returns the year (four digits)
    var month = jsDate.getMonth(); // where getMonth returns the month (from 0-11)
    var day = jsDate.getDate();   // where getDate returns the day of the month (from 1-31)

    var myDate = year.toString() + "," + month.toString() + "," + day.toString();
    return myDate;
}

function NewRow(tr)
{
    // If only one sibling then create a new row
    // otherwise just clone an exisitng one
   
    if(tr.siblings().length != 4)
    {
        var clone = tr.prev().clone();
        tr.before(clone);
    }
    else
    {
        var newRow = "<tr id=''>" +
            "<td>" +
                "<image id='edit' src='images/b1.jpg' class='imgButton' />" +
                "<image id='delete' src='images/b3.jpg' class='imgButton'/>" +
            "</td>" +
//            " <td height='28' align='center' ></td>" +
            "<td align='center'>" +
                "  <span ID='span1'></span> " +
            "</td>" +
            "<td align='center'>" +
                " <span ID='span2'></span> " +
            "</td>" +
             "<td align='center'>" +
                " <span ID='span3'></span> " +
            "</td>" +
              "<td align='center'>" +
                " <span ID='span4'></span> " +
            "</td>" +
              "<td align='center'>" +
               " <span ID='span5'></span> " +
            "</td>" +
              "<td align='center'>" +
               " <span ID='span15'></span> " +
            "</td>" +
//              "<td align='center'>" +
//               " <span ID='span6'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                 " <span ID='span7'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span8'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span9'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span10'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span11'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span12'></span> " +
//            "</td>" +
//              "<td align='center'>" +
//                " <span ID='span13'></span> " +
//            "</td>" +
              "<td align='center'>" +
               " <span ID='span14'></span> " +
            "</td>" +
        "</tr>";
        tr.before(newRow);
    }

    return tr.prev();
}

function AddContact(road, station, subject, unit, amount,  memo,price) {

    var data = '{'
            + "\"road\":\"" + road + "\","
            + "\"station\":\"" + station + "\","
             + "\"subject\":\"" + subject + "\","
               + "\"unit\":\"" + unit + "\","
                 + "\"amount\":\"" + amount + "\","
//                   + "\"ration\":\"" + ration + "\","
//                     + "\"mm\":\"" + mm + "\","
//                       + "\"ma\":\"" + m1 + "\","
//                         + "\"mb\":\"" + m2 + "\","
//                           + "\"mc\":\"" + m3 + "\","
//                             + "\"ca\":\"" + c1 + "\","
//                               + "\"cb\":\"" + c2 + "\","
//                                 + "\"cc\":\"" + c3 + "\","
                                   + "\"memo\":\"" + memo + "\","
                                      + "\"dat\":\"" + GetStartTime() + "\","
                                        + "\"price\":\"" + price + "\","
                                         + "\"name\":\"" + GetCompanyName() + "\","
                                          + "\"ban\":\"" + aspxtxtban.GetText() + "\","
                                           + "\"hesuan\":\"" + aspxtxthesuan.GetText() + "\""
            + '}';

   
    $.ajax({
        type: "POST",
        url: "MonthlyYangHuJiHua1.aspx/AddContact",
        data: data,
        contentType: "application/json",
        dataType: "json",
        error: OnAjaxError,
        success: OnAddContactSuccess
    });
}

function OnAddContactSuccess(data)
{
    var result = eval('(' + data.d + ')');
    // Assign id from newly added contact
    newRow.attr("id", result);
    newRow = null;
}

function UpdateContact(id, road, station, subject, unit, amount,  memo,price)
{
    var data = '{'
            + "\"id\":" + id + ","
            + "\"road\":\"" + road + "\","
            + "\"station\":\"" + station + "\","
             + "\"subject\":\"" + subject + "\","
               + "\"unit\":\"" + unit + "\","
                 + "\"amount\":\"" + amount + "\","
//                   + "\"ration\":\"" + ration + "\","
//                     + "\"mm\":\"" + mm + "\","
//                       + "\"ma\":\"" + m1 + "\","
//                         + "\"mb\":\"" + m2 + "\","
//                           + "\"mc\":\"" + m3 + "\","
//                             + "\"ca\":\"" + c1 + "\","
//                               + "\"cb\":\"" + c2 + "\","
//                                 + "\"cc\":\"" + c3 + "\","
                                   + "\"memo\":\"" + memo + "\","
                                     + "\"dat\":\"" + GetStartTime() + "\","
                                        + "\"price\":\"" + price + "\","
                                         + "\"name\":\"" + GetCompanyName() + "\","
                                          + "\"ban\":\"" + aspxtxtban.GetText() + "\","
                                           + "\"hesuan\":\"" + aspxtxthesuan.GetText() + "\""
            + '}';
    $.ajax({
        type: "POST",
        url: "MonthlyYangHuJiHua1.aspx/UpdateContact",
        data: data,
        contentType: "application/json",
        dataType: "json",
        error: OnAjaxError
    });
}

function DeleteContact(id)
{
    var data = '{'
            + "\"id\":" + id
            + '}';
    $.ajax({
        type: "POST",
        url: "MonthlyYangHuJiHua1.aspx/DeleteContact",
        data: data,
        contentType: "application/json",
        dataType: "json",
        error: OnAjaxError
    });
}

function OnAjaxError(obj, status, error)
{
    var err = eval('(' + obj.responseText + ')');
    alert(err.Message);
}