/**
 * Created by Administrator on 2016/4/7.
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
tjx.app.rating.enterpriserating = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            field_tag : 'tjx-data-source',
            fill_html_tag : '<i class="glyphicon glyphicon-ok font-red">',
            empty_html_tag : '<i class="glyphicon glyphicon-remove font-blue"></i>',
            rating_stat : {
                enterprise_all : 37,
                chemical_all : 7,
                safety_all : 6,
                special_all : 6,
                hazard_all : 4,
                inspection_all : 5,
                cert_all : 6

            }
        },
        stateMap = {
            $container : null,
            stat : {
                enterprise : 0,
                chemical : 0,
                cert : 0,
                safety : 0,
                special : 0,
                hazard : 0,
                inspect : 0
            },
            selected_values : null

        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        configDataTable,
        setDataTable, onSuccess, onFail,
        configTableStyle, initIndexData,
        onDetail, onDetailSuccess
    ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString

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

    configDataTable = function ( data ) {

        var options = tjx.util.ui.table.getStandardTableOptions();
        options.data = data.Data;
        options.order = [[ 0, 'asc' ]];
        options.columnDefs =  [
            {
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function ( data, type, row ) {
                    /* return data +' ('+ row[3]+')';*/
                    /*  return  '<span class="label label-sm label-danger ">' +  row[8] + '</span>';*/
                    /*  return  '<div class="number"><h3 class="font-blue-sharp">' + row[9] + '</h3> </div>';*/
                    return  '<a href="#" onclick="tjx.app.rating.enterpriserating.onDetail(\'' +  row +    '\');"  >' +
                        '<div class="number"><h3 class="font-blue-sharp">' + row[2] + '</h3> </div>' +
                        '</a>';

                },
                "targets": 2
            },
           /* {
                "render": function ( data, type, row ) {
                    if ( row[0] === 1 ){
                        return  ' <div id="pulsate-regular" style="padding: 5px; outline: rgba(191, 28, 86, 0.498039) solid 2px; box-shadow: rgba(191, 28, 86, 0.498039) 0px 0px 6px; outline-offset: 10px;">' + row[1] + '  </div>';
                    }else{
                        return  '<span class="btn default btn-xs blue-stripe">' + row[1] + '</span>';
                    }

                },
                "targets": 1
            },*/
            {
                "render": function ( data, type, row ) {
                    if ( row[0] === 1 ){
                        return  '<span class="btn red">' +  row[0] +  '</span>';
                    }else if ( row[0]  === 2 ){
                        return  '<span class="btn blue">' +  row[0] +  '</span>';
                    }else if ( row[0]  === 3 ){
                        return  '<span class="btn yellow">' +  row[0] +  '</span>';
                    }else {
                        return  '<span class="btn default">' +  row[0] +  '</span>';
                    }
                },
                "searchable": false,
                "orderable": true,
                "targets": 0
            }
        ];
        tjx.util.ui.table.clearDataTable( jqueryMap.$table );
        stateMap.dt =   jqueryMap.$table.DataTable( options );


     /*   stateMap.dt =   jqueryMap.$table.DataTable( {
            "paginate": true,
            "filter": false,
            "info": false,
            "order": [[ 0, 'asc' ]],
            "fnRowCallback": function( nRow, aData, iDisplayIndex )
            {
                /!* $('td:eq(4)', nRow).html( '<b>1</b>' );*!/

                /!*  $.each( stateMap.row_commands, function(i, item) {
                 var ind = i + stateMap.fields_length - 1;
                 console.log( 'ind', i, fields.length );
                 var temp = '<a class="edit" href="#" click=""  >' + item.FName + '</a>';
                 $('td:eq(' + ind + ')', nRow).html( temp );
                 });*!/

            },
            "columnDefs":
                [
                    {
                        // The `data` parameter refers to the data for the cell (defined by the
                        // `data` option, which defaults to the column being worked with, in
                        // this case `data: 0`.
                        "render": function ( data, type, row ) {
                            /!* return data +' ('+ row[3]+')';*!/
                          /!*  return  '<span class="label label-sm label-danger ">' +  row[8] + '</span>';*!/
                          /!*  return  '<div class="number"><h3 class="font-blue-sharp">' + row[9] + '</h3> </div>';*!/
                            return  '<a href="#" onclick="tjx.app.rating.enterpriserating.onDetail(\'' +  row +    '\');"  >' +
                                     '<div class="number"><h3 class="font-blue-sharp">' + row[2] + '</h3> </div>' +
                                     '</a>';

                       },
                        "targets": 2
                    },
                    {
                        "render": function ( data, type, row ) {
                            if ( row[0] === 1 ){
                                return  ' <div id="pulsate-regular" style="padding: 5px; outline: rgba(191, 28, 86, 0.498039) solid 2px; box-shadow: rgba(191, 28, 86, 0.498039) 0px 0px 6px; outline-offset: 10px;">' + row[1] + '  </div>';
                            }else{
                                return  '<span class="btn default btn-xs blue-stripe">' + row[1] + '</span>';
                            }

                        },
                        "targets": 1
                    },
                    {
                        "render": function ( data, type, row ) {
                            if ( row[0] === 1 ){
                                return  '<span class="btn red">' +  row[0] +  '</span>';
                            }else if ( row[0]  === 2 ){
                                return  '<span class="btn blue">' +  row[0] +  '</span>';
                            }else if ( row[0]  === 3 ){
                                return  '<span class="btn yellow">' +  row[0] +  '</span>';
                            }else {
                                return  '<span class="btn default">' +  row[0] +  '</span>';
                            }
                        },
                        "searchable": false,
                        "orderable": true,
                        "targets": 0
                    }
                ],

            "processing": false,
            data: data.Data,
        } );
*/
        /* stateMap.dt.on( 'order.dt search.dt', function () {
         stateMap.dt.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
         cell.innerHTML = i+1;
         } );
         } ).draw();*/

    }

    configTableStyle = function (  ) {
        jqueryMap.$table.find('tr').each(function(){ //for each row
            $(this).children('td , th').css('text-align', 'center');  //center the third column.
        });
    }

    initIndexData = function ( data ) {
        if ( data ) {
            $.each( data.Data, function ( i, item ) {
                ++ stateMap.stat.enterprise;
                /*stateMap.stat.chemical =  stateMap.stat.chemical + Number(item[1]);
                stateMap.stat.cert =  stateMap.stat.cert + Number(item[2]);
                stateMap.stat.safety =  stateMap.stat.safety + Number(item[3]);
                stateMap.stat.special =  stateMap.stat.special + Number(item[4]);
                stateMap.stat.hazard =  stateMap.stat.hazard + Number(item[5]);
                stateMap.stat.inspect =  stateMap.stat.inspect + Number(item[6]);*/

                item.unshift(i + 1);

            } )
        }
    }

    configStat = function (  ) {
        jqueryMap.$enterprise.html( stateMap.stat.enterprise + '(家)'  );
      /*  jqueryMap.$chemical.html( stateMap.stat.chemical   );
        jqueryMap.$cert.html( stateMap.stat.cert + '(人)' );
        jqueryMap.$safety.html( stateMap.stat.safety   );
        jqueryMap.$special.html( stateMap.stat.special  );
        jqueryMap.$hazard.html( stateMap.stat.hazard   );
        jqueryMap.$inspect.html( stateMap.stat.inspect  + '(次)' );*/
    }


//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------

    setDataTable = function () {
        var search = {
            Fields : [ 'EnterpriseName', 'TotalScore', 'EnterpriseScore', 'DangerousChemicalsScore', 'PractitionerCertificationScore',
                'SafetyEquipmentScore', 'SpecialEquipmentScore', 'HazardIdentificationScore',
                'SafetyInspectionRecordsScore'
            ],
            Search : '1 = {0}',
            Values : [ '1' ],
            OrderFieldName : 'TotalScore',
            OrderType : 'desc'
        };
        var arg_map = {
            data : search,
            success : onSuccess,
            fail : onFail
        };
        tjx.data.rating.enterpriserating.getTableData( arg_map );
    }

    onSuccess = function ( data ) {
        if ( data ){
            stateMap.return_value = data;
            initIndexData( data );
            configDataTable( data );
           /* configTableStyle(  );*/
            configStat(  );
            tjx.util.ui.stopPageLoading(  );
        }
    }

    onFail = function ( data ) {

    }

// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $caption : $container.find( '#caption' ),
            $table : $container.find('#rating'),
            $enterprise : $container.find( '#enterprise' ),
            $chemical : $container.find( '#chemical' ),
            $cert : $container.find( '#cert' ),
            $safety : $container.find( '#safety' ),
            $special : $container.find( '#special' ),
            $hazard : $container.find( '#hazard' ),
            $inspect : $container.find( '#inspect' ),
            $detailmodel : $container.find( '#ratingdetail' ),
            $enterprise_stat_file : $container.find( '#enterprise_stat_file' ),
            $enterprise_stat_without : $container.find( '#enterprise_stat_without' ),
            $chemical_stat_file : $container.find( '#chemical_stat_file' ),
            $chemical_stat_without : $container.find( '#chemical_stat_without' ),
            $safety_stat_file : $container.find( '#safety_stat_file' ),
            $safety_stat_without : $container.find( '#safety_stat_without' ),
            $special_stat_file : $container.find( '#special_stat_file' ),
            $special_stat_without : $container.find( '#special_stat_without' ),
            $hazard_stat_file : $container.find( '#hazard_stat_file' ),
            $hazard_stat_without : $container.find( '#hazard_stat_without' ),
            $inspection_stat_file : $container.find( '#inspection_stat_file' ),
            $inspection_stat_without : $container.find( '#inspection_stat_without' ),
            $cert_stat_file : $container.find( '#cert_stat_file' ),
            $cert_stat_without : $container.find( '#cert_stat_without' )
        };
    };

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onDetail = function ( row ) {
        stateMap.selected_values = row.split( ',' );
        var search = {
            Fields : [ '*' ],
            Search : 'EnterpriseName = {0}',
            Values : [ stateMap.selected_values[ 1 ] ],
            OrderFieldName : 'TotalScore',
            OrderType : 'desc'
        };
        var arg_map = {
            data : search,
            success : onDetailSuccess,
            fail : onFail
        };
        tjx.data.rating.enterpriserating.getTableData( arg_map );
    }

    onDetailSuccess = function ( data ) {
        if ( data && data.Data ) {
            var row = data.Data[0];
            $.each( data.ChsFields, function ( index, item ) {
              var lbl =  jqueryMap.$detailmodel.find( '*[' + configMap.field_tag + ' =' +  item.data  + ']') ;
              if ( lbl.length > 0 ) {
                  if ( lbl.find( 'i' ) ) {
                      lbl.find( 'i').remove();
                  }

                  if ( Number( row[ index ] ) === 1  ) {
                     lbl.append( configMap.fill_html_tag );
                  }else{
                     lbl.append( configMap.empty_html_tag );
                  }
              }
            } );
            jqueryMap.$enterprise_stat_file.html( '填报(' +  stateMap.selected_values[3].toString()  + ')项' );
            jqueryMap.$enterprise_stat_without.html( '未填报(' +  (configMap.rating_stat.enterprise_all -  stateMap.selected_values[3]).toString()  + ')项' );

            jqueryMap.$chemical_stat_file.html( '填报(' +  stateMap.selected_values[4].toString()  + ')项' );
            jqueryMap.$chemical_stat_without.html( '未填报(' +  (configMap.rating_stat.chemical_all -  stateMap.selected_values[4]).toString()  + ')项' );

            jqueryMap.$cert_stat_file.html( '填报(' +  stateMap.selected_values[5].toString()  + ')项' );
            jqueryMap.$cert_stat_without.html( '未填报(' +  (configMap.rating_stat.cert_all -  stateMap.selected_values[5]).toString()  + ')项' );

            jqueryMap.$safety_stat_file.html( '填报(' +  stateMap.selected_values[6].toString()  + ')项' );
            jqueryMap.$safety_stat_without.html( '未填报(' +  (configMap.rating_stat.safety_all -  stateMap.selected_values[6]).toString()  + ')项' );

            jqueryMap.$special_stat_file.html( '填报(' +  stateMap.selected_values[7].toString()  + ')项' );
            jqueryMap.$special_stat_without.html( '未填报(' +  (configMap.rating_stat.special_all -  stateMap.selected_values[7]).toString()  + ')项' );

            jqueryMap.$hazard_stat_file.html( '填报(' +  stateMap.selected_values[8].toString()  + ')项' );
            jqueryMap.$hazard_stat_without.html( '未填报(' +  (configMap.rating_stat.hazard_all -  stateMap.selected_values[8]).toString()  + ')项' );

            jqueryMap.$inspection_stat_file.html( '填报(' +  stateMap.selected_values[9].toString()  + ')项' );
            jqueryMap.$inspection_stat_without.html( '未填报(' +  (configMap.rating_stat.inspection_all -  stateMap.selected_values[9]).toString()  + ')项' );

        }
        jqueryMap.$detailmodel.attr( 'data-width', 1000 );
        jqueryMap.$detailmodel.slimScroll({
            height: 550
        });
        jqueryMap.$detailmodel.modal( );
    }

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
        jqueryMap.$caption.append( tjx.index3.getTitle() );
        tjx.util.ui.startPageLoading( );
        setDataTable();
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onDetail : onDetail
    };
//------------------- END PUBLIC METHODS ---------------------
}());
