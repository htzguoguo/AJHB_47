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
tjx.data.documents = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        url_base = 'http://10.1.0.99/ufInterface?',
        configMap = {
            url : {
                 login :  url_base + 'opr=getHash',
                 file_catalog : url_base + 'opr=folderfiles',
                 crossdomain_url : '../../FileService/url',
                 search_url : 'http://wd.tjftz.gov.cn/fileInterface2?opr=search',
                file_url : 'para/files.json'
            },

            user_info : {
                name : 'kangxin',
                passwrod : 'k123456',
                owner_id : 109
            },
            event : {
                on_login_success : 'on_login_success',
                on_tree_node_change : 'on_tree_node_change',
                on_file_list_change : 'on_file_list_change',
                on_file_search : 'on_file_search'
            }
        },
        stateMap = {
            $container : null,
            hash : null,
            callback_login : null,
            current_selected_fileid : '0'
        },
        nodes = {
        },
        files =
        {
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        login,
        onLoginSuccess,
        onLoginFail,
        getFileCatalog,
        initFileCatalog,
        onFilesCatalogSuccess,
        getFiles,
        getHash,
        getSearch,
        getObjects,
        onTreeNodeChange,
        onSearchFile
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    login = function ( callback ) {
        stateMap.callback_login = callback;
        var url = configMap.url.login + '&name=' + configMap.user_info.name + '&password=' + configMap.user_info.passwrod ;
        var data = JSON.stringify({ url :url  });
        tjx.util.io.addJsonData( configMap.url.crossdomain_url, data, null, null, onLoginSuccess, onLoginFail );
    }

    initFileCatalog = function (event, fileid ) {
        tjx.util.io.getJsonFile( configMap.url.file_url, onFilesCatalogSuccess );


    }

    /*initFileCatalog = function (event, fileid ) {

        stateMap.current_selected_fileid = fileid;
        var childs = nodes[ stateMap.current_selected_fileid ];
        if ( childs.children.length === 0  && childs.files.length === 0 ){
            var arg_map = {
                fileid : fileid ? fileid : 0,
                success : onFilesCatalogSuccess,
                fail : tjx.util.io.onFail
            };
            getFileCatalog( arg_map );
        }else {
           /!* tjx.shell.publishEvent( configMap.event.on_login_success, [] );*!/
            tjx.shell.publishEvent( configMap.event.on_file_list_change, [ childs.files ] );
        }
    }*/

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container : $container };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------

    onTreeNodeChange = function ( event, fileid ) {
        tjx.shell.publishEvent( configMap.event.on_file_list_change, [ nodes[ fileid ].files ] );
    }

    onFilesCatalogSuccess = function ( data ) {
        files = data;
        nodes = {};
        getObjects( data );
        tjx.shell.publishEvent( configMap.event.on_login_success, [] );
    }

    getObjects = function (obj) {
        var key = obj.id,
            childs = obj.children,
            i = 0,
            len = childs.length;
        nodes[key] = obj;
        if ( len > 0 ) {
            for ( i = 0; i < len; i++ ) {
                getObjects( childs[ i ] );
            }
        }
    }

    onSearchFile = function ( event, key ) {
        var ind, files,fileName, len, result = [];
        for (var i in nodes) {
            if (!nodes.hasOwnProperty(i)) continue;
            files = nodes[i].files;
            len = files.length;
            if ( len > 0 ){
                for ( ind = 0; ind < len; ind++ ) {
                    fileName = files[ ind ][0];
                    if (fileName.indexOf(key) > -1) {
                        result.push( files[ ind ] );
                    }
                }
            }
        }
        tjx.shell.publishEvent( configMap.event.on_file_list_change, [ result ] );

    }

    /*onFilesCatalogSuccess = function ( data ) {
       
        var xmlDoc = $.parseXML( data ),
            $xml = $( xmlDoc ),
            title = '',
            id = '',
            childs = nodes[ stateMap.current_selected_fileid ],
            size           
            ;
            childs.state.opened = true;
        $xml.find( 'SubFolders' ).find( 'Item' ).each( function ( index, element ) {
            title = $(this).text();
            id = $(this).attr( 'Id' );
         
            if (   title.slice( 0, 2 ) !== 'BS' ) {
                nodes[ id ] =  {
                    'text' : title,
                    'id' : $(this).attr( 'Id' ),
                    "icon": "icon-folder-alt",
                    'state' : {
                        'opened' : false,
                        'selected' : false,
                        'disabled': false
                    },
                    'children' : [
                    ],
                    'files' : []
                };
                childs.children.push(
                   nodes[ id ]
                );
            }
        } );
        $xml.find( 'FileItems' ).find( 'Item' ).each( function ( index, element ) {
            title = $(this).attr( 'Name' );
            title.slice(title.lastIndexOf( '.' ))
            childs.files.push(
                 [
                     $(this).attr( 'Name' ),
                     (parseInt($(this).attr( 'Size' )) / 1000).toString() + 'K',
                     title.slice(title.lastIndexOf( '.' ) + 1),
                     $(this).attr( 'ModifyDatetime' ),
                     $(this).attr( 'Uploader' ),
                     $(this).attr( 'FileKey' )

                 ]
            );

        } );
         nodes[ stateMap.current_selected_fileid ] = childs;
        tjx.shell.publishEvent( configMap.event.on_login_success, [] );
        tjx.shell.publishEvent( configMap.event.on_file_list_change, [ childs.files ] );

    }*/
// example: onClickButton = ...
    onLoginSuccess = function ( json ) {
        stateMap.hash = json;
        initFileCatalog(null, 0);
       /* stateMap.callback_login();*/
       /* $.gevent.publish( configMap.event.on_login_success, {} );*/
    }

    onLoginFail = function ( data ) {

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
    getHash = function () {
        return stateMap.hash;
    }

    configModule = function ( input_map ) {
        return true;
    };
// End public method /configModule/

    getFileCatalog = function ( arg_map ) {
        var url = configMap.url.file_catalog + '&ownerid=' + configMap.user_info.owner_id + '&folderid=' + arg_map.fileid + '&hash2=' + stateMap.hash;
        var data = JSON.stringify({ url :url  });
        tjx.util.io.addJsonData( configMap.url.crossdomain_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

    getFiles = function (  ) {
        return files;
    }

    getSearch = function ( arg_map ) {
        var url = configMap.url.search_url + '&ownerid=' + configMap.user_info.owner_id + '&folderid=0' + '&index=0&count=128&afkey=' + arg_map.key + '&nekey=' + '&hash=' + stateMap.hash;
        var data = JSON.stringify({ url :url  });
        tjx.util.io.addJsonData( configMap.url.crossdomain_url, data, arg_map.beforeSend, arg_map.complete, arg_map.success, arg_map.fail );
    }

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
        login();

        tjx.shell.subscribeEvent( configMap.event.on_tree_node_change, onTreeNodeChange );
        tjx.shell.subscribeEvent( configMap.event.on_file_search, onSearchFile );
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        event : configMap.event,
        getFileCatalog : getFileCatalog,
        login : login,
        getFiles : getFiles,
        getHash : getHash,
        getSearch : getSearch

    };
//------------------- END PUBLIC METHODS ---------------------
}());

