/**
 * Created by Administrator on 2016/8/18.
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
/*global $, spa */
tjx.app.currentsituation.search = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
          oper : {
              ">" : "大于",
              ">=" : "大于等于",
              "<" : "小于",
              "<=" : "小于等于",
              "=" : "等于",
              "<>" : "不等于",
          }
        },
        stateMap = {
            $container : null,
            searchdata : null
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        onShowAddModal,
        initSearchFields,
        initSearchOper,
        initSearchValue,
        onAddSearch,
        onSearchClick,
        onDeleteSearch
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    initSearchFields = function ( data ) {
        if ( data ) {
            var i = 0, len = data.length;
            stateMap.searchdata = data;
            for ( ; i < len; i++) {
                jqueryMap.$sel_fields.append("<option value=\"" + data[i].field +  "\">" +  data[i].name +"</option>");
            }
            jqueryMap.$sel_fields.get(0).selectedIndex=0;
            jqueryMap.$sel_fields.trigger( 'change' );
        }
    }

    initSearchOper = function (  ) {
       var ind = jqueryMap.$sel_fields.get(0).selectedIndex,
           seldata = stateMap.searchdata[ ind ],
           i = 0, len = seldata.operator.length, oper = seldata.operator;
        jqueryMap.$sel_oper.empty();
        for ( ; i < len; i++ ) {
            jqueryMap.$sel_oper.append("<option value='" +  oper[i] +  "'>" +  configMap.oper[ oper[i] ] +"</option>");
        }
        jqueryMap.$sel_oper.get(0).selectedIndex=0;
    }

    initSearchValue = function (  ) {
        var ind = jqueryMap.$sel_fields.get(0).selectedIndex,
            seldata = stateMap.searchdata[ ind ],
            typ = seldata.type, valueinput, values = seldata.values,
            i = 0, len = values.length;
         switch ( typ ) {
             case "txt" :
                 valueinput = ' <input  type="text"  class="form-control"  size="60"/>';
                 break;
             case "float" :
                 valueinput = ' <input  type="number"  class="form-control"  size="60"/>';
                 break;
             case "sel" :
                 valueinput = '<select  type="text"   class="form-control "  >';
                 for ( ; i < len; i++ ) {
                     valueinput += "<option >" +  values[i] +"</option>";
                 }
                 valueinput += '</select>';
                 break;
             default :
                 valueinput = ' <input  type="text"  class="form-control"  size="60"/>';
         }
         jqueryMap.$con_value.html( valueinput );
    }

    onAddSearch = function () {
        jqueryMap.$con_search_content.find( 'button' ).off( 'click');
         var field = jqueryMap.$sel_fields.val(),
             opername = jqueryMap.$sel_oper.find("option:selected").text(),
             opervalue = jqueryMap.$sel_oper.val(),
             searchvalue = jqueryMap.$con_value.children().val(),
             temp_str;
        temp_str = '<tr tjx-search-oper="' + opervalue + '">';
        temp_str += '<td>' + '' +  '</td>';
        temp_str += '<td>' +  field +  '</td>';
        temp_str += '<td>' +  opername +  '</td>';
        temp_str += '<td>' +  searchvalue +  '</td>';
        temp_str += '<td>' +  ' <button class="btn btn-sm red filter-cancel" ><i class="fa fa-times"></i> 撤销</button>' +  '</td>';
        temp_str += '</tr>';
        jqueryMap.$con_search_content.append( temp_str );
        jqueryMap.$con_search_content.find( 'button' ).on( 'click', onDeleteSearch );
    }

    onDeleteSearch = function () {
        $(this).parent().parent().remove();       
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $btn_add : $container.find( '#searchadd' ),
            $btn_search : $container.find( '#btnsearchbtn' ),
            $modal_add : $container.find( '#searchdetail' ),
            $sel_fields : $container.find( '#sel-fields' ),
            $sel_oper : $container.find( '#sel-oper' ),
            $con_value : $container.find( '#sel-value' ),
            $btn_addsearch : $container.find( '#searchok' ),
            $con_search_content : $container.find( "#searchbody" )
        };
    };
// End DOM method /setJqueryMap/

    onSearchClick = function () {
        var str = '',
            values = [],
            field, oper, value, ind = 0;
        jqueryMap.$con_search_content.find( 'tr' ).each( function ( index, element ) {
            oper = $(this).attr( 'tjx-search-oper' );
            field = $(this).children().eq(1).html();
            value = $(this).children().eq(3).html();
            if ( ! ind ) {
                str +=  field +  ' ' + oper + ' {' +  ind + '} ' ;
                values.push( value );
            }else
            {
                str += ' and ' + field +  ' ' + oper + ' {' +  ind + '} ' ;
                values.push( value );
            }
            ind++;
        } );

        tjx.app.currentsituation.detail.setDataTable( str, values );
    }

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onShowAddModal = function () {
        jqueryMap.$modal_add.attr( 'data-width', 450 );
        jqueryMap.$modal_add.slimScroll({
            height: 350
        });
        jqueryMap.$modal_add.modal( );
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
        tjx.data.currentsituation.detail.getSearchData( initSearchFields );
        jqueryMap.$btn_add.on( 'click', onShowAddModal );
        jqueryMap.$sel_fields.on( 'change', function () {
            initSearchOper();
            initSearchValue();
        } );
        jqueryMap.$btn_addsearch.on( 'click', onAddSearch );
        jqueryMap.$btn_search.on( 'click', onSearchClick );
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onDeleteSearch : onDeleteSearch
    };
//------------------- END PUBLIC METHODS ---------------------
}());

