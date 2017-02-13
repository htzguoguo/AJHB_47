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
tjx.app.documents.index = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = { $container : null },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        initBasicFilesCatalog,
        onFilesCatalogSuccess
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
            $tree_files : $container.find( '#tree_1' )
        };
    };
// End DOM method /setJqueryMap/

    initBasicFilesCatalog = function () {
        var data = tjx.data.documents.getFiles();
       
        jqueryMap.$tree_files.jstree(
            { 'core' :
            {
                'check_callback' : true,
                'data' : [ data ]
            } ,
                "types" : {
                    "#" : {
                        "max_children" : 30,
                        "max_depth" : 10,
                        "valid_children" : ["root"]
                    }
                }
            }
        ) ;

        jqueryMap.$tree_files
        // listen for event
            .on('select_node.jstree', function (e, data) {
               
                if ( data.selected.length > 0 ) {
                    tjx.shell.publishEvent( tjx.data.documents.event.on_tree_node_change, [ data.instance.get_node(data.selected[0]).id ] );
                }
            });
    }

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...

    onFilesCatalogSuccess = function (  ) {
      /*  var data = tjx.data.documents.getFiles();*/
        jqueryMap.$tree_files.jstree("destroy");

        initBasicFilesCatalog();
      /*  jqueryMap.$tree_files.jstree().settings.core.data = data;
        jqueryMap.$tree_files.jstree().refresh();*/
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
        initBasicFilesCatalog();

        tjx.shell.subscribeEvent( tjx.data.documents.event.on_login_success, onFilesCatalogSuccess );

      /*  $.gevent.subscribe( jqueryMap.$container, tjx.data.documents.event.on_login_success, initBasicFilesCatalog );*/
      /*  tjx.data.documents.login( initBasicFilesCatalog );*/

        jqueryMap.$tree_files
        // listen for event
            .on('select_node.jstree', function (e, data) {
               
                if ( data.selected.length > 0 ) {
                    tjx.shell.publishEvent( tjx.data.documents.event.on_tree_node_change, [ data.instance.get_node(data.selected[0]).id ] );
                }
            });
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
