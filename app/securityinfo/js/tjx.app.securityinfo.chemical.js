/**
 * Created by Administrator on 2016/1/15.
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
tjx.app.securityinfo.chemical = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue'
        },
        stateMap = {
            $container : null,
            validator : null,
            category : [],
            names : [],
            units : [],
            cas : [],
            cascatalog : [],
            namescatalog : [],
            is_new : false,
            is_modal : false
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail, initChemicalCategoryData, initChemicalSelect,
        onDangerChemical, onPoisonChemical, onDrugChemical,
        initChemicalNameCASData, initChemicalNameCasInput,
        onInitForm,
        onInitSuccess,
        onEditData,
        onEditSuccess
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    // help-block has-error help-block-error

    initChemicalCategoryData = function ( data ) {
        $.each( data, function ( index, item ) {
            stateMap.category.push( item.Category );
            var items = [];
            $.each( item.Item, function ( index, name ) {
                items.push( name.Name );
            } )
            stateMap.names[ item.Category ] = items;
        } );

        initChemicalSelect();
    }

    initChemicalNameCASData = function ( data ) {
        $.each( data, function ( index, item ) {
            stateMap.names[ item.Name ] = item.CAS;
            stateMap.cas[ item.CAS ] = item.Name;
            stateMap.cascatalog[ item.CAS ] = item.Unit;
            stateMap.namescatalog[ item.Name ] = item.Unit;
        } );
        initChemicalNameCasInput();
    }

    initChemicalNameCasInput = function (  ) {
        jqueryMap.$danger_chemicalnum.focusout( function () {
            var cas = jqueryMap.$danger_chemicalnum.val();
            jqueryMap.$danger_chemicalname.val( stateMap.cas[ cas ] );
            jqueryMap.$danger_chemicalcatalognum.val( stateMap.cascatalog[ cas ] );
        } );
        jqueryMap.$danger_chemicalname.focusout( function () {
            var cas = jqueryMap.$danger_chemicalname.val();
            jqueryMap.$danger_chemicalnum.val( stateMap.names[ cas ] );
            jqueryMap.$danger_chemicalcatalognum.val( stateMap.namescatalog[ cas ] );
        } );


        jqueryMap.$poison_chemicalnum.focusout( function () {
            var cas = jqueryMap.$poison_chemicalnum.val();
            jqueryMap.$poison_chemicalname.val( stateMap.cas[ cas ] );
        } );
        jqueryMap.$poison_chemicalname.focusout( function () {
            var cas = jqueryMap.$poison_chemicalname.val();
            jqueryMap.$poison_chemicalnum.val( stateMap.names[ cas ] );
        } );

        jqueryMap.$drug_chemicalnum.focusout( function () {
            var cas = jqueryMap.$drug_chemicalnum.val();
            jqueryMap.$drug_chemicalname.val( stateMap.cas[ cas ] );
        } );
        jqueryMap.$drug_chemicalname.focusout( function () {
            var cas = jqueryMap.$drug_chemicalname.val();
            jqueryMap.$drug_chemicalnum.val( stateMap.names[ cas ] );
        } );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $form : $container.find( '.horizontal-form' ),
            $formbody : $container.find( '.form-body' ),
            $send : $container.find( '#ok' ),
            $cancel : $container.find( '#cancel' ),
            $caption : $container.find( '.caption' ),
            $danger_chemicalcategory :  $container.find( '#Danger-ChemicalCategory' ),
            $danger_chemicalsubcategory :  $container.find( '#Danger-ChemicalSubCategory' ),
            $danger_chemicalname :  $container.find( '#Danger-ChemicalName' ),
            $danger_chemicalnum :  $container.find( '#Danger-ChemicalNum' ),
            $danger_chemicalcatalognum :  $container.find( '#Danger-ChemicalCatalogNum' ),
            $danger_chemicalunit :  $container.find( '#Danger-ChemicalUnit' ),
            $danger_maximumstockingunit :  $container.find( '#Danger-MaximumStockingUnit' ),

            $poison_chemicalcategory :  $container.find( '#Poison-ChemicalCategory' ),
            $poison_chemicalsubcategory :  $container.find( '#Poison-ChemicalSubCategory' ),
            $poison_chemicalname :  $container.find( '#Poison-ChemicalName' ),
            $poison_chemicalnum :  $container.find( '#Poison-ChemicalNum' ),
            $poison_chemicalunit :  $container.find( '#Poison-ChemicalUnit' ),
            $poison_maximumstockingunit :  $container.find( '#Poison-MaximumStockingUnit' ),

            $drug_chemicalcategory :  $container.find( '#Drug-ChemicalCategory' ),
            $drug_chemicalsubcategory :  $container.find( '#Drug-ChemicalSubCategory' ),
            $drug_chemicalname :  $container.find( '#Drug-ChemicalName' ),
            $drug_chemicalnum :  $container.find( '#Drug-ChemicalNum' ),
            $drug_chemicalunit :  $container.find( '#Drug-ChemicalUnit' ),
            $drug_maximumstockingunit :  $container.find( '#Drug-MaximumStockingUnit' ),
        };
    };
// End DOM method /setJqueryMap/

    initChemicalSelect = function (  ) {
         tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalcategory, stateMap.category );
         tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalsubcategory, stateMap.names[ jqueryMap.$danger_chemicalcategory.val() ] );
         jqueryMap.$danger_chemicalcategory.change( function () {
            tjx.util.ui.initSelectByArray( jqueryMap.$danger_chemicalsubcategory, stateMap.names[ jqueryMap.$danger_chemicalcategory.val() ] , true );
           /*  onDangerChemical();*/
        } );
      /*  jqueryMap.$danger_chemicalname.change( function () {
            onDangerChemical();
        } );
        onDangerChemical();*/

        tjx.util.ui.initSelectByArray( jqueryMap.$poison_chemicalcategory, stateMap.category );
        tjx.util.ui.initSelectByArray( jqueryMap.$poison_chemicalsubcategory, stateMap.names[ jqueryMap.$poison_chemicalcategory.val() ] );
        jqueryMap.$poison_chemicalcategory.change( function () {
            tjx.util.ui.initSelectByArray( jqueryMap.$poison_chemicalsubcategory, stateMap.names[ jqueryMap.$poison_chemicalcategory.val() ] , true );
          /*  onPoisonChemical();*/
        } );
       /* jqueryMap.$poison_chemicalname.change( function () {
            onPoisonChemical();
        } );
        onPoisonChemical();*/

        tjx.util.ui.initSelectByArray( jqueryMap.$drug_chemicalcategory, stateMap.category );
        tjx.util.ui.initSelectByArray( jqueryMap.$drug_chemicalsubcategory, stateMap.names[ jqueryMap.$drug_chemicalcategory.val() ] );
        jqueryMap.$drug_chemicalcategory.change( function () {
            tjx.util.ui.initSelectByArray( jqueryMap.$drug_chemicalsubcategory, stateMap.names[ jqueryMap.$drug_chemicalcategory.val() ] , true );
           /* onDrugChemical();*/
        } );
      /*  jqueryMap.$drug_chemicalname.change( function () {
            onDrugChemical();
        } );
        onDrugChemical();*/
    }



   /* onDangerChemical = function () {
        jqueryMap.$danger_chemicalnum.val( stateMap.cas[ jqueryMap.$danger_chemicalname.val() ] );
        jqueryMap.$danger_chemicalunit.val( stateMap.units[ jqueryMap.$danger_chemicalname.val() ] );
        jqueryMap.$danger_maximumstockingunit.val( stateMap.units[ jqueryMap.$danger_chemicalname.val() ] );
    }

    onPoisonChemical = function () {
        jqueryMap.$poison_chemicalnum.val( stateMap.cas[ jqueryMap.$poison_chemicalname.val() ] );
        jqueryMap.$poison_chemicalunit.val( stateMap.units[ jqueryMap.$poison_chemicalname.val() ] );
        jqueryMap.$poison_maximumstockingunit.val( stateMap.units[ jqueryMap.$poison_chemicalname.val() ] );
    }

    onDrugChemical = function () {
        jqueryMap.$drug_chemicalnum.val( stateMap.cas[ jqueryMap.$drug_chemicalname.val() ] );
        jqueryMap.$drug_chemicalunit.val( stateMap.units[ jqueryMap.$drug_chemicalname.val() ] );
        jqueryMap.$drug_maximumstockingunit.val( stateMap.units[ jqueryMap.$drug_chemicalname.val() ] );
    }*/

//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
        // event.preventDefault();

            var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
            var arg_map = {
                data : data,
                success : onSuccess,
                fail : onFail
            };
            tjx.data.chemical.addChemicalInfo( arg_map );
    }

    onCancelData = function ( event ) {

    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , data.Desc);
            if ( stateMap.is_modal ){
                $.gevent.publish( 'table-update', [ {} ]);
            }else {
                jqueryMap.$cancel.trigger("click");
                onDangerChemical();
                onPoisonChemical();
                onDrugChemical();
            }

        }else{
            tjx.util.ui.showAlert( '系统提示' , data.Desc);
        }
    }

    onFail = function ( data ) {

    }

    onInitForm = function (  ) {
        var arg_map = {
            data : { key : tjx.table.getSelectedKey() },
            success : onInitSuccess,
            fail : onFail
        };
        tjx.data.chemical.getChemicalInfo( arg_map );
    }

    onInitSuccess = function ( data ) {
        tjx.util.setFormValuesFromData( jqueryMap.$formbody, data );
    }

    onEditData = function ( event ) {
        // event.preventDefault();
            var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
            var arg_map = {
                key : tjx.table.getSelectedKey(),
                data : data,
                success : onEditSuccess,
                fail : onFail
            };
            tjx.data.chemical.updateChemicalInfo( arg_map );
    }

    onEditSuccess = function ( data ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '危险化学品更新完成。');
            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '危险化学品更新不成功，请重试。');
        }
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


    initModule = function ( $container,   isnew,  ismodal) {
        stateMap.$container = $container;
        setJqueryMap();
        stateMap.is_new = isnew;
        stateMap.is_modal = ismodal;

        tjx.util.ui.input.initOnlyNumberInput( jqueryMap.$container );
        tjx.data.chemical.getChemicalCategoryData( initChemicalCategoryData );
        tjx.data.chemical.getChemicalNameCas( initChemicalNameCASData );
      //  jqueryMap.$cancel.bind( 'click', onCancelData );
        if ( stateMap.is_new ) {
            if ( ! stateMap.is_modal ){
                jqueryMap.$caption.append( tjx.index3.getTitle() );
            }
            jqueryMap.$send.bind( 'click', onSumitData );
        }
        else
        {
            onInitForm();
            jqueryMap.$send.bind( 'click', onEditData );
        }

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


