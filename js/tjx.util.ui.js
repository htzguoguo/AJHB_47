/**
 * Created by Administrator on 2015/12/5.
 */
/*
 * module_template.js
 * Template for browser feature modules
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */
/*global $, tjx */
tjx.util.ui = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            alert_html_id : '#myAlertModal',
            success_html_id : '#mySuccessModal',
            alert_html_head : String()
            +  '<div id="myAlertModal" class="modal fade" tabindex="50" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">'
                /*   +  '<div class="modal-dialog">'
                 +  '<div class="modal-content">'*/
            +  '<div class="modal-header">'
            +  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
            +  '<h4 class="modal-title">',
            success_html_head : String()
            +  '<div id="mySuccessModal" class="modal fade" tabindex="50" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">'
                /*   +  '<div class="modal-dialog">'
                 +  '<div class="modal-content">'*/
            +  '<div class="modal-header">'
            +  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
            +  '<h4 class="modal-title">',
            alert_html_middle : String()
            +  '</h4></div>'
            +  '<div class="modal-body">'
            +  '<p>'
            +  '<h3 >' ,
            alert_html_content : String()
            + '<span class="font-red"><img src="images/ui/Warning.png" height="60px" width="60px">    ',
            success_html_content : String()
            + '<span  ><img src="images/ui/ok.png" height="60px" width="60px">    ',
            alert_html_tail : String()
            +  '</span></h3></p>'
            +  '</div>'
            +  '<div class="modal-footer">'
            +  '<button data-dismiss="modal" class="btn red">关闭</button>'
            +  '</div>'
            +  '</div>',
            success_html_tail : String()
            +  '</span></h3></p>'
            +  '</div>'
            +  '<div class="modal-footer">'
            +  '<button data-dismiss="modal" class="btn green">关闭</button>'
            +  '</div>'
            +  '</div>',
            confirm_html_id : '#myConfirmModal',
            confirm_html_head : String()
            +  '<div id="myConfirmModal" class="modal fade" tabindex="50" role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">'
                /*   +  '<div class="modal-dialog">'
                 +  '<div class="modal-content">'*/
            +  '<div class="modal-header">'
            +  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>'
            +  '<h4 class="modal-title">',
            confirm_html_middle : String()
            +  '</h4></div>'
            +  '<div class="modal-body">'
            +  '<p>',
            confirm_html_tail : String()
            +  '</p>'
            +  '</div>'
            +  '<div class="modal-footer">'
            +  '<button data-dismiss="modal" class="btn default" aria-hidden="true">取消</button>'
            +  '<button id="confirmok" class="btn green" data-dismiss="modal">确定</button>'
            +  '</div>'
                /*    +  '</div>'
                 +  '</div>'*/
            +  '</div>',
            photo_template_url : 'filetemplate.html'

        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        showAlert, scrollTo, showConfirm,
        initTable, initDate, isInputEmpty,
        initSpecificDate, startPageLoading,
        stopPageLoading, initFileUpload, onWindowResize,
        initSelectByArray, initSelectBySet, getClientFileName,
        showSuccess,
        initDateTime
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container
        };
    };
// End DOM method /setJqueryMap/

     initTable = function ( $table ) {
        var table = $table;

        /* Formatting function for row details */
        function fnFormatDetails(oTable, nTr) {
            var aData = oTable.fnGetData(nTr);
            var sOut = '<table>';
            sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
            sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
            sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
            sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
            sOut += '</table>';

            return sOut;
        }

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement('th');
        nCloneTh.className = "table-checkbox";

        var nCloneTd = document.createElement('td');
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        table.find('thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        table.find('tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });

        /*
         * Initialize DataTables, with no sorting on the 'details' column
         */
        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            "columnDefs": [{
                "orderable": false,
                "targets": [0]
            }],
            "order": [
                [1, 'asc']
            ],
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
        });
        var tableWrapper = $('#sample_3_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

        tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown

        /* Add event listener for opening and closing details
         * Note that the indicator for showing which row is open is not controlled by DataTables,
         * rather it is done here
         */
        table.on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose(nTr);
            } else {
                /* Open this row */
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
            }
        });
    };

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    onWindowResize = function ( callback ) {
        var width = $(window).width(),
            height = $(window).height();

        $(window).resize(function() {
            var newWidth = $(window).width(),
                newHeight = $(window).height();
           /* if (newWidth !== width || newHeight !== height) {*/


            if (newWidth >= (width + 10) || newWidth <= (width - 10)) {
                width = newWidth;
                height = newHeight;
                callback();
            }
        });
    };

    initFileUpload = function ( $container ) {
        $container.load( configMap.photo_template_url );
    };

    startPageLoading =  function(options) {
        if (options && options.animate) {
            $('.page-spinner-bar').remove();
            $('body').append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
        } else {
            $('.page-loading').remove();
            $('body').append('<div class="page-loading"><img src="images/ui/loading-spinner-blue.gif"/>&nbsp;&nbsp;<span>' + (options && options.message ? options.message : '加载中...') + '</span></div>');
        }
    };

    stopPageLoading = function() {
        $('.page-loading, .page-spinner-bar').remove();
    };

    initSpecificDate = function ( $date, defaultdate ) {
        $.fn.datepicker.defaults.language = 'zh-CN';
        if (jQuery().datepicker) {
            $date.datepicker({
                rtl: false,
                orientation: "left",
                autoclose: true
            });
        }
        $date.find('[type=text]').val(defaultdate.getFullYear() + '-' + (defaultdate.getMonth() + 1) + '-' + defaultdate.getDate());
    };

    initDate = function ( $container, defaultdate ) {


        $.fn.datepicker.defaults.language = 'zh-CN';
        if (jQuery().datepicker) {
            $container.find('.date-picker').datepicker({
                rtl: false,
                orientation: "left",
                autoclose: true
            });
        }
        $container.find('.date-picker [type=text]').val(defaultdate.getFullYear() + '-' + (defaultdate.getMonth() + 1) + '-' + defaultdate.getDate());
    };

    initDateTime = function ( $container, defaultdate ) {
        $.fn.datetimepicker.defaults.language = 'zh-CN';
        $container.find(".form_datetime").datetimepicker({
            autoclose: true,
            isRTL: false,
            format: 'yyyy-mm-dd hh:ii',
            pickerPosition: (false ? "bottom-right" : "bottom-left")
        });
        $container.find('.form_datetime [type=text]').val(defaultdate.getFullYear() + '-' + (defaultdate.getMonth() + 1) + '-' + defaultdate.getDate());
    };



    scrollTo =  function(el, offeset) {
        var pos = (el && el.size() > 0) ? el.offset().top : 0;

        if (el) {
            if ($('body').hasClass('page-header-fixed')) {
                pos = pos - $('.page-header').height();
            }
            pos = pos + (offeset ? offeset : -1 * el.height());
        }

        $('html,body').animate({
            scrollTop: pos
        }, 'slow');
    };


    showAlert = function ( title, content ) {
        if ( jqueryMap.$container ){
            if ( jqueryMap.$container.find( configMap.alert_html_id ) ){
                jqueryMap.$container.find( configMap.alert_html_id ).remove();
            }
            var temp = configMap.alert_html_head + title + configMap.alert_html_middle + configMap.alert_html_content +  content + configMap.alert_html_tail;
            jqueryMap.$container.append(temp);
            $(configMap.alert_html_id).modal();
        }
    };

    showSuccess = function ( title, content ) {
        
        if ( jqueryMap.$container ){
            
            if ( jqueryMap.$container.find( configMap.success_html_id ) ){
                jqueryMap.$container.find( configMap.success_html_id ).remove();
            }
            var temp = configMap.success_html_head + title + configMap.alert_html_middle + configMap.success_html_content +  content + configMap.success_html_tail;
            jqueryMap.$container.append(temp);

         
            $(configMap.success_html_id).modal();
        }
    };

    showConfirm = function ( title, content, onAfter  ) {
        if ( jqueryMap.$container ){
            if ( jqueryMap.$container.find( configMap.confirm_html_id ) ){
                jqueryMap.$container.find('#confirmok').unbind('click');
                jqueryMap.$container.find( configMap.confirm_html_id ).remove();
            }
            var temp = configMap.confirm_html_head + title + configMap.confirm_html_middle + content + configMap.confirm_html_tail;
            jqueryMap.$container.append(temp);
            jqueryMap.$container.find('#confirmok').bind( 'click', onAfter );
            $(configMap.confirm_html_id).modal();
        }
    };

    isInputEmpty = function ( $input )  {


        if (  $input.val()==="") {
            $input.closest('.form-group').addClass('has-error');
            $input.focus();
            return true;
        }
        else
        {
            return false;
        }
    };

    initSelectByArray = function ( $select, data , isdelete ) {
        if ( isdelete ){
            $select.empty();
        }
        $.each( data, function ( index, item )  {
            $select.append('<option value="' + item + '">' +  item + '</option>');
        } );
        $select.find('option:first').attr('selected','selected');
    };

    initSelectBySet = function ( $select, data, isdelete ) {
        if ( isdelete ){
            $select.empty();
        }
        $.each( data, function ( index, item )  {
            $select.append('<option value="' + item.value + '">' +  item.name + '</option>');
        } );
        $select.find('option:first').attr('selected','selected');
    };

    getClientFileName = function ( filePath ) {
       return filePath.split(/[\\\/]/g).pop()
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
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        showAlert : showAlert,
        scrollTo : scrollTo,
        showConfirm : showConfirm,
        initTable : initTable,
        initDate : initDate,
        isInputEmpty : isInputEmpty,
        initSpecificDate : initSpecificDate,
        startPageLoading : startPageLoading,
        stopPageLoading : stopPageLoading,
        initFileUpload : initFileUpload,
        onWindowResize : onWindowResize,
        initSelectByArray : initSelectByArray,
        initSelectBySet : initSelectBySet,
        getClientFileName : getClientFileName,
        showSuccess : showSuccess,
        initDateTime : initDateTime
    };
//------------------- END PUBLIC METHODS ---------------------
}());
