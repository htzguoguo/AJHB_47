/**
 * Created by Administrator on 2016/9/2.
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
tjx.app.documents.list = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null

        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        onFilesCatalogSuccess,
        searchValue,
        onSearchValueSuccess
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
            $container : $container,
            $tbl_files : $container.find( '#tbl_files' ),
            $txt_searchvalue : $container.find( '#searchvalue' ),
            $btn_search : $container.find( '#search' )
        };
    };

    searchValue = function () {
        var vvv = jqueryMap.$txt_searchvalue.val();
          if (  vvv ){
              tjx.shell.publishEvent( tjx.data.documents.event.on_file_search, [ vvv ] );

             /* var arg_map = {
                  key : vvv,
                  success : onSearchValueSuccess,
                  fail : tjx.util.io.onFail
              };
              tjx.data.documents.getSearch( arg_map );*/

         }
    }
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onSearchValueSuccess = function ( data ) {
       
    }

//-------------------- END EVENT HANDLERS --------------------
//------------------- BEGIN PUBLIC METHODS -------------------

    /**
     *
     * @param event
     * @param data
     */
    onFilesCatalogSuccess = function ( event, data ) {
        var tbl = jqueryMap.$tbl_files,
            filekey,
            hash = tjx.data.documents.getHash();
        tjx.util.ui.table.clearDataTable( tbl );
        var options = tjx.util.ui.table.getCustomTableOptions( true, false, 30 );
        options.columnDefs =  [
            {
                "width": '10%',
                "render": function ( data, type, row ) {
                    var filekey = row[5];
                    return   ' <a href="http://wd.tjftz.gov.cn/ufInterface?opr=download&filekey=' +  filekey +  '&hash2=' +  hash +  '" class="btn btn-primary btn-xs"><i class="fa fa-download"></i> 下载 </a>';
                },
                "targets": 5
            }
        ];
        options.AutoWidth = false;
        options.data = data;
        stateMap.dt =   tbl.DataTable(  options  );
    }

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
        tjx.shell.subscribeEvent( tjx.data.documents.event.on_file_list_change, onFilesCatalogSuccess );
        
       /* jqueryMap.$txt_searchvalue.on("keyup search input paste cut", function() {
            var vvv = jqueryMap.$txt_searchvalue.val();
            stateMap.dt.search( vvv ).column( 0 ).draw();
        });*/
        
        jqueryMap.$btn_search.on( 'click', function () {
            searchValue();
        /*    var vvv = jqueryMap.$txt_searchvalue.val();*/
          /*  if (  vvv ){
                stateMap.dt.search( vvv ).column( 0 ).draw();
            }*/
        } );

        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule
    };
//------------------- END PUBLIC METHODS ---------------------
}());
