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
tjx.table = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            newbtn_prefix : 'newbtn',
            newbtn_field : 'tjx-input-index',
            cmd_type : {
                new_btn : 'newbtn',
                row_btn : 'rowbtn'
            },
            modal_html : String()
            +   ' <div id="ajax-modal" class="modal  fade modal-scroll" tabindex="-1" data-replace="true"> </div>'
        },
        stateMap = {
            $container : null,
            return_value : null,
            dt : null,
            row_commands : null,
            fields_length : null,
            selected_keyvalues : null,
            selected_values : null,
            command_title : null,
            command_desc : null,
            command_para : null,
            fields_index : {},
            model_height : null,
            table_buttons : [],
            exportfield : []
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        configDataTable,
        configOutsideCommand_b,
        configOutsideCommand,
        setDataTable,
        onSuccess,
        onFail,
        onNewBtnClick,
        onTableUpdate,
        configInsideCommand,
        onRowBtnClick,
        getCommandTitle,
        configTableStyle,
        getCommandDesc,
        getCommandPara,
        getSelectedKey,
        configTableDetail,
        setDetailTemplate,
        buildTableData,
        getModelHeight,
        exeCommand,
        getSelectedValues,
        getExportFields
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

    getExportFields = function () {
        return stateMap.exportfield;
    };

    getCommandTitle = function (  ) {
        return stateMap.command_title;
    };

    getCommandDesc = function (  ) {
        return stateMap.command_desc;
    };

    getCommandPara = function (  ) {
        return stateMap.command_para;
    };

    getSelectedKey = function (  ) {
        return stateMap.selected_keyvalues;
    };

    getSelectedValues = function (  ) {
        return stateMap.selected_values;
    };

   /* <button id="sample_editable_1_new" class="btn green">
        Add New <i class="fa fa-plus"></i>
    </button>*/
    /*$('#ajax-demo').on('click', function(){
        // create the backdrop and wait for next modal to be triggered
        $('body').modalmanager('loading');

        setTimeout(function(){
            $modal.load('ui_extended_modals_ajax_sample.html', '', function(){
                $modal.modal();
            });
        }, 1000);
    });*/
    configOutsideCommand_b = function ( data ) {
        jqueryMap.$outsidebtngroup.empty();
        stateMap.row_commands = new Array();
        if ( data.CommandCount > 0 ){
            var temp = new String();
            $.each( data.Commands, function(i, item) {
               if ( item.Category === configMap.cmd_type.new_btn ){
                   var id = configMap.newbtn_prefix + item.FID;
                 /*temp += '<button id="' + id + '" tjx-input-type="newbtn" tjx-input-index="' + i.toString() + '"  class="btn green">';
                   temp += item.FName;
                   temp += '<i class="fa fa-plus"></i></button>';*/
                   temp += '<button id="' + id + '" tjx-input-type="newbtn" tjx-input-index="' + i.toString() + '"  class="btn btn-default btn-sm">';
                   temp += item.FName;
                   temp += '</button>';
               }
               else if ( item.Category === configMap.cmd_type.row_btn ){
                   stateMap.row_commands.push( item );
               }
            });
            jqueryMap.$outsidebtngroup.append( temp );
            jqueryMap.$outsidebtngroup.find( '*[tjx-input-type=newbtn]').on( 'click', onNewBtnClick );
            }
    };

    configOutsideCommand = function ( data ) {
        stateMap.table_buttons = new Array();
        stateMap.row_commands = new Array();
        if ( data.CommandCount > 0 ){
            var temp = new String();
            $.each( data.Commands, function(i, item) {
                if ( item.Category === configMap.cmd_type.new_btn ){
                    stateMap.table_buttons.push(
                        {
                            text: item.FName + '<i class="fa ' +  item.FIcon + '" style="margin: 3px;"></i>',
                           /* text: item.FName,*/
                            action: onRowBtnClick,
                            className : 'btn   blue ',
                            name : i.toString(),
                            tag : item.FName

                        }
                    );
                }
                else if ( item.Category === configMap.cmd_type.row_btn ){
                    stateMap.row_commands.push( item );
                }
            });
        }
       /* stateMap.table_buttons.push(
            {
                text: '下载<i class="fa fa-download" style="margin: 3px;"></i>',
                className : 'btn   blue ',
                extend: 'excel',
                exportOptions: {
                    columns: stateMap.exportfield
                }
            }
        );*/
      /*  console.log( getExportFields() );
        stateMap.table_buttons.push(
            {
                /!*   text: '<i class="icon-printer">打印</i>',*!/
                text: '打印<i class="fa fa-print" style="margin: 3px;"></i>',
               /!* text: '打印<i class="fa fa-print" style="margin: 3px;"></i>',*!/
                className : 'btn   blue ',
                extend: 'print',
                exportOptions: {
                    columns: getExportFields()
                }
            }
        );*/
    };

    configInsideCommand = function ( keyindex, keyfield ) {
       /* {
            // The `data` parameter refers to the data for the cell (defined by the
            // `data` option, which defaults to the column being worked with, in
            // this case `data: 0`.
            "render": function ( data, type, row ) {
            return data +' ('+ row[3]+')';
        },
            "targets": 0
        },*/
        var result = new Array();
      /*  result.push( { "className" : "dt-body-center",
            "targets" : "_all"
        } );*/

        $.each(stateMap.return_value.Specificcolumns, function ( i, item ) {
            result.push(
                {
                    "render": function ( data, type, row ) {
                        /* return data +' ('+ row[3]+')';*/

                        var str = item.Style.replace(/@/g, row[item.Name]);
                        return eval( str );
                    },
                    "targets": stateMap.fields_index[ item.Name ]
                }
            );
        });
        result.push(  { "visible": false,  "targets": [ keyindex ] } );

        $.each( stateMap.row_commands, function(i, item) {
          result.push(
              {
                  "render": function ( data, type, row ) {
                      /* return data +' ('+ row[3]+')';*/


                      var cmds = stateMap.return_value.Commands;
                      var url = cmds[ i ].FUrl;
                      var pos = url.search(/ashx/);
                      if ( pos !== -1  )
                      {
                          url = url + '?key=' + row[keyfield] + '&para=' + cmds[ i ].Parameters;
                          return  '<a class="edit" href="'+ url + '" target="_blank" unset="true"  tjx-input-index="' + i.toString() + '"  ><img src="' + item.FIcon  + '"/></a>';
                      }
                      else {
                          return  '<a class="edit" href="#" onclick="tjx.table.onNewBtnClick(\'' +  row[keyfield] +  '\',\''+  tjx.util.getObjPropertyNameAndValues(row,':',',') +  '\',' + i.toString()  +  ');"  tjx-input-index="' + i.toString() + '"  ><img src="' + item.FIcon  + '"/></a>';
                      }
                  },
                  "searchable": false,
                  "orderable": false,
                  "targets": i + stateMap.fields_length
              }
          );
        /*    $('td:eq(4)', nRow).html( '<b>1</b>' );*/
          /*  row[keyindex]*/
        });
        return result;
    };

    buildTableData = function ( fields, data ) {
        var result = new Array();
        $.each( data, function ( i, row ) {
            var myObj = new Object();
            $.each( row, function ( j, item  ) {
                myObj[ fields[j].data ] = item;
            } );
            result.push( myObj );
        } );
        return result;
    };

    configDataTable = function ( data ) {

        var fields = data.ChsFields;
         stateMap.exportfield = [];
        if ( fields.length === 0 )
        {
            fields = data.EngFields;
        }

        var keyindex  = -1;
        stateMap.fields_length = data.EngFields.length;

      /*  if ( ! isNaN( data.KeyField ) ) {
            keyindex = Number( data.KeyField );
        }*/

       /* if ( data.KeyField )
        {
            $.each( data.EngFields, function(i, item) {
                if ( item.title === data.KeyField ){
                    keyindex = i;
                }
                if (  stateMap.return_value.Detail )
                {
                    stateMap.fields_index[ item.title ] = i + 1;
                    stateMap.exportfield.push( i + 1);
                }
                else
                {
                    stateMap.fields_index[ item.title ] = i;
                    stateMap.exportfield.push( i );
                }
            });
        }*/


            $.each( data.EngFields, function(i, item) {
                if ( item.title === data.KeyField ){
                    keyindex = i;
                }
                if (  stateMap.return_value.Detail )
                {
                    stateMap.fields_index[ item.title ] = i + 1;
                    stateMap.exportfield.push( i + 1);
                }
                else
                {
                    stateMap.fields_index[ item.title ] = i;
                    stateMap.exportfield.push( i );
                }
            });


      /*  exportfield.push( ':visible' );*/
        stateMap.exportfield.shift();
       /* fields.splice(0, 0, { 'title' : '序号' });*/

      //  console.log( getExportFields() );
        stateMap.table_buttons.push(
            {
                /*   text: '<i class="icon-printer">打印</i>',*/
                text: '打印<i class="fa fa-print" style="margin: 3px;"></i>',
                /* text: '打印<i class="fa fa-print" style="margin: 3px;"></i>',*/
                className : 'btn   blue ',
                extend: 'print',
                exportOptions: {
                    columns: getExportFields()
                }
            }
        );

        $.each( stateMap.row_commands, function(i, item) {
             fields.push(
                 {
                     'title' : item.FName,
                     'data' :  null,
                     "orderable": false
                 }
             );
         /*   item['Class'] = 'center';
            item['render'] = 'function ( data, type, row ) {return "cccc";}';*/
        });

        if (  stateMap.return_value.Detail ) {
            stateMap.fields_length = stateMap.fields_length + 1;
            if ( keyindex !== -1 ) {
                keyindex = keyindex + 1;
            }
            fields.unshift(  {
                "className":      'tjx-table-details-control',
                "orderable":      false,
                "sortable" : true,
                "data":           null,
                "defaultContent": '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            } );
        }

        var ddd = buildTableData(  data.EngFields, data.Data );
       stateMap.dt =   jqueryMap.$table.DataTable( {
           "bLengthChange" : false,
            "buttons" : stateMap.table_buttons,
            "pageLength": 25,
            "pagingType": "full_numbers",
            "language": {
                "emptyTable": "当前没有满足条件的内容",
                "info": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "infoEmpty": "没有满足条件的内容",
                "infoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "lengthMenu": "每页显示 _MENU_ 条记录",
                "search": "搜索:",
                "zeroRecords": "没有满足条件的内容",
                "paginate": {
                    "previous": "上一页",
                    "next": "下一页",
                    "last": "末页",
                    "first": "首页"
                }
            },
            "fnRowCallback": function( nRow, aData, iDisplayIndex )
            {
                   /* $('td:eq(4)', nRow).html( '<b>1</b>' );*/

              /*  $.each( stateMap.row_commands, function(i, item) {
                    var ind = i + stateMap.fields_length - 1;
                    console.log( 'ind', i, fields.length );
                    var temp = '<a class="edit" href="#" click=""  >' + item.FName + '</a>';
                    $('td:eq(' + ind + ')', nRow).html( temp );
                });*/

            },
            "columnDefs": configInsideCommand( keyindex, data.KeyField )
           /*[
                {
                    // The `data` parameter refers to the data for the cell (defined by the
                    // `data` option, which defaults to the column being worked with, in
                    // this case `data: 0`.
                    "render": function ( data, type, row ) {
                       /!* return data +' ('+ row[3]+')';*!/
                        return  '<a class="edit" href="#" click=""  >' +  row[keyindex] + '</a>';
                    },
                    "targets": 7
                },
                { "visible": false,  "targets": [ keyindex ] }
              ]*/,

            "processing": false,
            "autoWidth": false,
             data: ddd,
             columns: fields
        } );

        stateMap.dt.buttons().container().appendTo( '#tjx_table1_wrapper .col-sm-6:eq(0)' );
      /*  table.buttons().container()
            .appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );*/
      /*  stateMap.dt.on( 'order.dt search.dt', function () {
            stateMap.dt.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            } );
        } ).draw();*/
    };

    configTableDetail = function (  ) {
        if ( ! stateMap.return_value.Detail ) {
            return ;
        }

       /* function format ( d ) {
            // `d` is the original data object for the row
            return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
                '<tr>'+
                '<td>Full name:</td>'+
                '<td>'+ ''  +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Extension number:</td>'+
                '<td>'+''+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Extra info:</td>'+
                '<td>And any further details here (images etc)...</td>'+
                '</tr>'+
                '</table>';
        }*/

      /*  console.log( 'configTableDetail' );

        var nCloneTh = document.createElement('th');
        nCloneTh.className = "table-checkbox";

        var nCloneTd = document.createElement('td');
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        jqueryMap.$table.find('thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        jqueryMap.$table.find('tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });*/

        jqueryMap.$table.on('click', 'td.tjx-table-details-control', function () {
            var tr = $(this).closest('tr');
            var row = stateMap.dt.row( tr );
            stateMap.selected_values = row.data();
            stateMap.selected_keyvalues = row.data()[stateMap.return_value.KeyField];
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('tjx-table-details-control-shown');
            }
            else {
                // Open this row
             /*   row.child( format(row.data()) ).show();*/
                if ( stateMap.opened_row && stateMap.opened_row.child.isShown() ){
                    stateMap.opened_row.child.hide();
                    stateMap.opened_tr.removeClass('tjx-table-details-control-shown');
                }

                setDetailTemplate(row.child);
                tr.addClass('tjx-table-details-control-shown');
            }

            stateMap.opened_row = row;
            stateMap.opened_tr = tr;

        }
            );

        /*jqueryMap.$table.on('click', ' tbody td .row-details', function () {
            console.log( 'ddddddd' );

            var tr = $(this).closest('tr');
            var row = stateMap.dt.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                $(this).addClass("row-details-close").removeClass("row-details-open");
            }
            else {
                // Open this row
               /!* row.child( format(row.data()) ).show();*!/

              /!*  row.child( setDetailTemplate(row.data()) ).show();*!/

                console.log( row.data() );

                setDetailTemplate(row.child);

                $(this).addClass("row-details-open").removeClass("row-details-close");
            }
        } );*/
    };



    configTableStyle = function (  ) {
        jqueryMap.$table.find('tr').each(function(){ //for each row
            $(this).children('td , th').css('text-align', 'center');  //center the third column.
        });
    };

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    setDetailTemplate = function ( callback ) {
        var con = $('<div></div>');
        con.load( stateMap.return_value.Detail, function(responseText,textStatus,XMLHttpRequest){
            callback( con.html()  ).show();
        });
    };

    setDataTable = function () {
        var arg_map = {
            data : null,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.table.getAllTable( arg_map );
    };

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;

            configOutsideCommand( data );
            configDataTable( data );
           /* configTableStyle(  );*/
            configTableDetail(  );

            tjx.util.ui.stopPageLoading(  );
        }
    };

    onFail = function ( data ) {
        consolg.log( data );
    };

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $table : $container.find('#tjx_table1'),
            $caption : $container.find( '.caption' ),
            $outsidebtngroup : $container.find( '.table-toolbar .btn-group' ),
          /*  $ajaxmodel : $container.find( '#ajax-modal' ),*/
            $modalcontainer : $container.find( '#modalcontainer' )
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onTableUpdate = function ( event, arg_map ) {
        jqueryMap.$table.off('click', 'td.tjx-table-details-control');
        jqueryMap.$table.DataTable().clear().destroy();
        setDataTable();
    };

    onRowBtnClick = function (  )  {

        var name =   this.text();
        var index = 0;
        var cmds = stateMap.return_value.Commands;


        $.each( cmds, function(i, item) {
            if (  name.indexOf( item.FName ) === 0 ) {
                index = i;
            }
        });

        exeCommand( cmds, index );


       var cur = new Date();
        var sep = '-';
        var dd = '@';

        var d1Arr=dd.split(sep);
        var dd = new Date( d1Arr[0], Number(d1Arr[1]) - 1, d1Arr[2]);
        var tt= new Date(dd.getTime()-7 * 24 * 3600 * 1000);

        if ( cur > dd)
        {  '<span class=\"label label-danger arrowed\">@(已超期)</span>'; }
        else if ( cur < dd && cur > tt )
        { '<span class=\"label label-sm label-warning\">@(即将超期)</span>'; }
        else { '<span >@(正常)</span>'; }
    };

    exeCommand = function ( cmds, index ) {
        if ( stateMap.return_value ){
            stateMap.command_title = cmds[ index].FName;
            stateMap.command_desc = cmds[ index].FTip;
            stateMap.command_para = cmds[ index].Parameters;

            var url = cmds[ index].FUrl;
            var width = cmds[ index].Width;
            var height = cmds[ index].Height;

            var pos = url.search(/ashx/);

            if ( pos !== -1  )
            {
                url = url + '?key=' + keyvalue + '&para=' + stateMap.command_para;
                window.location = url;
                return;
            }
            /*if ( jqueryMap.$ajaxmodel ){
             jqueryMap.$ajaxmodel.remove();
             }*/
            jqueryMap.$modalcontainer.empty();
            jqueryMap.$modalcontainer.append( configMap.modal_html );
            jqueryMap.$ajaxmodel = jqueryMap.$container.find( '#ajax-modal' );

            jqueryMap.$ajaxmodel.attr( 'data-width', width );
            /*  jqueryMap.$ajaxmodel.attr( 'data-height', height );*/

            stateMap.model_height = height;

            jqueryMap.$ajaxmodel.slimScroll({
                height: height
            });

            /*  jqueryMap.$ajaxmodel.css('height', height );*/

            /*  $('body').modalmanager('loading');*/
            jqueryMap.$ajaxmodel.load(url, '', function(){
                jqueryMap.$ajaxmodel.modal('show');

            });
        }
    };

    onNewBtnClick = function ( keyvalue,values, cmdindex ) {
            var index =   $(this).attr(configMap.newbtn_field);
            if ( ! index ){
                index = cmdindex;
            }
            var cmds = stateMap.return_value.Commands;

            if (  cmdindex || cmdindex === 0 ){
                stateMap.selected_keyvalues = keyvalue;
                stateMap.selected_values = values;
                cmds = stateMap.row_commands;
            }

            exeCommand( cmds, index );
           /* if ( stateMap.return_value ){
                stateMap.command_title = cmds[ index].FName;
                stateMap.command_desc = cmds[ index].FTip;
                stateMap.command_para = cmds[ index].Parameters;

                var url = cmds[ index].FUrl;
                var width = cmds[ index].Width;
                var height = cmds[ index].Height;

                var pos = url.search(/ashx/);

                if ( pos !== -1  )
                {
                    url = url + '?key=' + keyvalue + '&para=' + stateMap.command_para;
                    window.location = url;
                    return;
                }
                /!*if ( jqueryMap.$ajaxmodel ){
                    jqueryMap.$ajaxmodel.remove();
                }*!/
                jqueryMap.$modalcontainer.empty();
                jqueryMap.$modalcontainer.append( configMap.modal_html );
                jqueryMap.$ajaxmodel = jqueryMap.$container.find( '#ajax-modal' );

                jqueryMap.$ajaxmodel.attr( 'data-width', width );
              /!*  jqueryMap.$ajaxmodel.attr( 'data-height', height );*!/

                stateMap.model_height = height;

                jqueryMap.$ajaxmodel.slimScroll({
                 height: height
                 });

              /!*  jqueryMap.$ajaxmodel.css('height', height );*!/

              /!*  $('body').modalmanager('loading');*!/
                jqueryMap.$ajaxmodel.load(url, '', function(){
                    jqueryMap.$ajaxmodel.modal('show');

                });
            }*/
    };


//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------
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

    getModelHeight = function (  ) {
        return stateMap.model_height;
    };

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

       /* tjx.util.ui.startPageLoading( {animate: true} );*/

        tjx.util.ui.startPageLoading( );

        jqueryMap.$caption.append( tjx.index3.getTitle() );

        $.gevent.subscribe( jqueryMap.$container, 'table-update', onTableUpdate );

     /*   jqueryMap.$table
            .on( 'order.dt',  function () {  configTableStyle(  ); });

        jqueryMap.$table
            .on( 'search.dt',  function () {  configTableStyle(  ); });*/

        setDataTable();


        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onNewBtnClick : onNewBtnClick,
        getCommandTitle : getCommandTitle,
        getCommandDesc : getCommandDesc,
        getCommandPara : getCommandPara,
        getSelectedKey : getSelectedKey,
        getModelHeight : getModelHeight,
        getSelectedValues : getSelectedValues
    };
//------------------- END PUBLIC METHODS ---------------------
}());
