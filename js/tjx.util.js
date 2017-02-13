/**
 * Created by Administrator on 2015/12/5.
 */

/*
 * tjx.util.js
 * General JavaScript utilities
 *
 */
/*jslint browser : true, continue : true,
 devel : true, indent : 2, maxerr : 50,
 newcap : true, nomen : true, plusplus : true,
 regexp : true, sloppy : true, vars : false,
 white : true
 */

/*global $, tjx */

tjx.util = (function () {
    var
        configMap = {
            field_tag : 'tjx-data-field',
            field_file_tag : 'tjx-file-field',
            field_sep : '-',
            field_type : 'type',
            field_radio : 'radio',
            field_checkbox : 'checkbox',
            html_template : {
                file_attachment : '<a class="btn default btn-xs blue-stripe" target="_blank" href="#">@</a>'
            }
        },
        makeError, setConfigMap,
        loadXML, broswerBack, broswerForward, broswerRefresh,
        getValuesFromFormInput, getParameterByName,
        getSearchFromUrl, setValuesFromData,
        buildTableData, copyObj, getObjPropertyNameAndValues,
        setFilesFromData,
        setFormValuesFromData,
        buildSingleObjectFromData,
        hideJs
        ;

    loadXML = function  (xmlpath ) {
        var xmlDoc = null;
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        } else if (document.implementation && document.implementation.createDocument) {
            xmlDoc = document.implementation.createDocument("", "", null);
        } else {
            alert('Your browser cannot handle this script.');
        }
        xmlDoc.async = false;
        xmlDoc.load(xmlpath);
        return xmlDoc;
    };

    broswerBack = function (  ) {
        history.go(-1); //后退1页
    };
    broswerForward = function (  ) {
        history.go(+1); //前进1页
    };
    broswerRefresh = function (  ) {
        history.go(-0);  //刷新
    };

    // Begin public constructor /makeError/
    // Purpose   : a convenience wrapper to create an error object
    // Arguments :
    //   * namte_text -  the error name
    //   * msg_text   -  long error message
    //   * data       -  optional data to attached error object
    // Returns  : newly construct error object
    // Throw    : None
    //
    makeError = function ( name_text, msg_text, data ) {
        var error = new Error();
        error.name = name_text;
        error.message = msg_text;
        if ( data ){
            error.data = data;
        }
        return error;
    };
    // End public constructor /makeError/

    getParameterByName = function ( url, name ) {
        var sear = getSearchFromUrl( url );
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(sear);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    getSearchFromUrl = function ( url ) {
        var m = '?';
        var c = url.split( m );
        if ( c ){
            if (c.length === 2 ){
                return  m + c[1];
            }
        }
    };

    // Begin public method /setConfigMap/
    // Purpose : Common code to set configs in feature modules
    // Arguments :
    //   * input_map     -  map of key-values set in config
    //   * settable_map  -  map of allowable keys to set
    //   * config_map    -  map to apply to settings to
    // Returns   : True
    // Throws    : Exception if input key not allow
    //
    setConfigMap = function ( arg_map ) {
        var
            input_map = arg_map.input_map,
            settable_map = arg_map.settable_map,
            config_map = arg_map.config_map,
            key_name, error
            ;
        for ( key_name in input_map ){
            if ( input_map.hasOwnProperty( key_name ) ){
                if ( settable_map.hasOwnProperty( key_name ) ){
                    config_map[ key_name ] = input_map[ key_name ];
                }
                else
                {
                    error = makeError(
                        'bad input',
                        'setting config key |' + key_name + '| is not supported'
                    );
                    throw error;
                }
            }
        }
    };
    // End public method /setConfigMap/

    copyObj = function ( obj ) {
        var newobj = {  };
        var key_name;
        for ( key_name in obj ){
            if ( obj.hasOwnProperty( key_name ) ){
                newobj[ key_name ] = obj[ key_name ];
            }
        }
        return newobj;
    };

    getObjPropertyNameAndValues = function ( obj, sepproperty , sepvalue ) {
        var newobj = new Array(  );
        var key_name;
        for ( key_name in obj ){
            if ( obj.hasOwnProperty( key_name ) ){
                newobj.push( key_name + sepproperty + obj[ key_name ] );
            }
        }
        return newobj.join( sepvalue );
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

    setValuesFromData = function ( $container, data ) {
        if ( $container && data ){
            $container.find( '*[' + configMap.field_tag + ']').each ( function (  ) {
                var field = $(this).attr(configMap.field_tag);
                var type = $(this).attr(configMap.field_type);
                $(this).html(data[field]);

            } );
        }
    };

    setFormValuesFromData = function ( $container, data  ) {
        if ( $container && data ){
            $container.find( '*[' + configMap.field_tag + ']').each ( function (  ) {
                var field = $(this).attr(configMap.field_tag);
                var type = $(this).attr(configMap.field_type);
                var val = data[field];

                if ( type === configMap.field_radio){
                      $(this).prop('checked', val);
                }else if ( type === configMap.field_checkbox){
                     $(this).prop('checked', val);
                }
                else
                {
                    $(this).val(data[field]);
                }
            } );
        }
    };

    setFilesFromData = function ( $container, data ) {
        if ( $container && data ){
            $container.find( '*[' + configMap.field_file_tag + ']').each ( function (  ) {
                var field = $(this).attr(configMap.field_file_tag);
               if  ( data.hasOwnProperty( field + 'FileName' ) && data.hasOwnProperty( field + 'SaveName' ) )  {
                   var filename = data[ field + 'FileName' ];
                   var savename = data[ field +  'SaveName'];
                   if ( filename && savename ) {
                       var html ='<span>&nbsp;&nbsp;&nbsp;<a  target="_blank" href="'+ savename + '"><i class="fa  icon-paper-clip"><span>(' + filename + ')</span></i></a></span>';
                       $(this).append( html );
                   }

               }
            } );
        }
    };

    // Begin public method /getValuesFromFormInput/
    getValuesFromFormInput = function ( $container ) {
        var result = {};
        if ( $container ){
            $container.find( '*[' + configMap.field_tag + ']').each ( function (  ) {
                var field = $(this).attr(configMap.field_tag);
                var type = $(this).attr(configMap.field_type);
                var val = $(this).val();
                if ( type === configMap.field_radio){
                    val =   $(this).prop('checked');
                }else if ( type === configMap.field_checkbox){
                  val =   $(this).prop('checked');
                }
                if ( field ){
                    if ( field.indexOf(configMap.field_sep) !== -1 ){
                       var fields = field.split( configMap.field_sep );
                       var temp = result;
                       for ( var i = 0; i < fields.length - 1; i++ ){
                           if ( ! temp[fields[i]] ){
                               temp[ fields[i] ] = {  };
                           }
                           temp =  temp[ fields[i] ];
                       }
                       temp[ fields[ fields.length - 1 ] ] = val;
                    }else
                    {
                        result[field] = val;
                    }

                }
            } );
        }
        return result;
    };

    buildSingleObjectFromData = function ( data, index ) {
        var ind = 0;

        if ( index ) {
            ind = index;
        }
        
        if ( data && data.Data && data.Data.length > 0 ){
            var fields = data.EngFields;
            var field;
            var values = data.Data[index];
            if ( values ) {
                var result = {};
                var i, len;
                len = values.length;
                for ( i = 0; i < len ; i++) {
                    field = fields[i];
                    result[field.data] = values[i];
                }
                return result;
            }
        }
    };

    /**
     * 
     * @param $block
     */
    hideJs = function ( $block ) {
        $block.html( '' );
    };

    // End public method /getValuesFromFormInput/

    return {
        makeError : makeError,
        setConfigMap : setConfigMap,
        loadXML : loadXML,
        broswerBack : broswerBack,
        broswerForward : broswerForward,
        broswerRefresh : broswerRefresh,
        getValuesFromFormInput : getValuesFromFormInput,
        getParameterByName : getParameterByName,
        setValuesFromData : setValuesFromData,
        buildTableData : buildTableData,
        copyObj : copyObj,
        getObjPropertyNameAndValues : getObjPropertyNameAndValues,
        setFilesFromData : setFilesFromData,
        setFormValuesFromData : setFormValuesFromData,
        buildSingleObjectFromData : buildSingleObjectFromData,
        hideJs : hideJs
    };
}());
