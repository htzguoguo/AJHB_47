/**
 * Created by Administrator on 2016/9/1.
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
tjx.app.securityinfo.chemicalhome = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            html : {
                img_tag : "<img src='app/securityinfo/images/chemicalhome/2.jpg' style='width: 300px;'>"
            }
        },
        stateMap = {
            $container : null,
            $cur_this : null,
            dangerous_date_type : null
        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        getChemicalData,
        getDangerousChemicals,
        onDangerousChemicalsSuccess,
        getRotation,
        onRotationSuccess,
        getSurpass,
        onSurpassSuccess,
        getQuery,
        getQuerySuccess,
        getReport,
        getReportSuccess
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    getChemicalData = function () {
        stateMap.$cur_this = $(this);
        var type = $(this).attr( 'tjx-data-type' );
        var value = $(this).attr( 'tjx-data-value' );
        switch ( value ){
            case 'dangerouschemicals':
                getDangerousChemicals( type );
                break;
            case 'rotation' :
                getRotation( type );
                break;
            case 'surpass' :
                getSurpass( type );
                break;
            case 'query' :
                getQuery( type );
                break;
            case 'report' :
                getReport( type );
                break;
        }
    }

    getDangerousChemicals = function ( datetype ) {
        stateMap.dangerous_date_type = datetype;
        var search = {
            Fields : [  'EnterpriseName','ChemicalName', 'sum(Expr1) as s ' ]
        };
        search.Search = ' (ChemicalName = {0} or ChemicalName = {1} or ChemicalName = {2} or ChemicalName = {3} or ';
        search.Search += 'ChemicalName = {4} or ChemicalName = {5} ) ';
        
        search.Values = [ '乙炔', '异丙醇', '油漆', '天那水', '油墨', '涂料' ];

        var arg_map = {
            datetype : datetype,
            grouptype : 'g',
            data : search,
            success : onDangerousChemicalsSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.chemical.getChemicalData( arg_map );
    }

    getRotation = function ( datetype ) {
        var search = {
            Fields : [  'EnterpriseName','ChemicalName', 'str(sum(Expr1)) + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName) as a ' ,
                         'str(( select top 1 MaximumStockingCapacityAmount from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName))  + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName)' ,
                         '( select top 1 MaximumStockingCapacityAmount  from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName) as c',
                         'sum(Expr1) as d' ]
        };
        search.Search = ' 1 = {0} ';

        search.Values = [ '1' ];

        var arg_map = {
            datetype : datetype,
            grouptype : 'g',
            data : search,
            success : onRotationSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.chemical.getChemicalData( arg_map );
    }

    getSurpass = function ( datetype ) {
        var search = {
            Fields : [  'EnterpriseName','ChemicalName', 'str(sum(Expr1)) + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName) as a ' ,
                'str(( select top 1 MaximumStockingCapacityAmount from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName))  + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName)' ,
                '( select top 1 MaximumStockingCapacityAmount  from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName) as c',
                'sum(Expr1) as d' ]
        };
        search.Search = ' 1 = {0} ';
        search.Values = [ '1' ];
        var arg_map = {
            datetype : datetype,
            grouptype : 'g',
            data : search,
            success : onSurpassSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.chemical.getChemicalData( arg_map );
    }

    getQuery = function ( datetype ) {
        var search = {
            Fields : [  'EnterpriseName','ChemicalName', 'str(sum(Expr1)) + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName) as a ' ,
                'str(( select top 1 DailyDosageAmount from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName))  + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName)' ,
                'str(( select top 1 MaximumStockingCapacityAmount  from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName))  + ( select top 1 Expr2 from  dbo.V_A_Chemical_Report  b where V_A_Chemical_Report.EnterpriseName = b.EnterpriseName and V_A_Chemical_Report.ChemicalName = b.ChemicalName)'
                 ]
        };
        search.Search = ' 1 = {0} ';
        search.Values = [ '1' ];
        var arg_map = {
            datetype : datetype,
            grouptype : 'g',
            data : search,
            success : getQuerySuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.chemical.getChemicalData( arg_map );
    }

    getReport = function ( datetype ) {
        var search = {
            Fields : [  'EnterpriseName','ChemicalName', 'ChemicalNum', 'RegistrationTime','DailyDosage', 'MaximumStockingCapacity']
        };
        search.Search = ' 1 = {0} ';
        search.Values = [ '1' ];
        var arg_map = {
            datetype : datetype,
            grouptype : 'n',
            data : search,
            success : getReportSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.chemical.getChemicalData( arg_map );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $dangerous_container : $container.find( '#dangerouschemical' ),
            $rotation_body :$container.find( '#rotationreport' ),
            $surpass_body :$container.find( '#surpassreport' ),
            $query_body :$container.find( '#queryreport' ),
            $report_body :$container.find( '#repreport' )
        };
    };

    onDangerousChemicalsSuccess = function ( data ) {
        var key,  items = {}, i = 0,
            len = data.Data.length,
            str_temp = '', unit = '',
            value = null;
        for ( ; i < len; i++ ) {
            key = data.Data[i][ 1 ];
            if ( ! items.hasOwnProperty( key ) ) {
                items[ key ] = {
                    total : 0,
                    values : []
                };
            }
            items[ key ].total += parseFloat( data.Data[i][ 2 ] );
            items[ key ].values.push( { name :  data.Data[i][ 0 ] ,
                                         value : data.Data[i][ 2 ]} );
        }
          jqueryMap.$dangerous_container.find( 'button' ).each( function () {
              str_temp = '';
              key = $(this).attr( 'tjx-data-value' );
              unit = $(this).attr( 'tjx-data-unit' );
              value = items[ key ];
              if ( value ) {
                  $(this).find( 'h4' ).html( value.total.toString() + '(' + unit + ')' );
                  $(this).find( 'small' ).html( value.values.length.toString() + '家企业'  );
                  if ( stateMap.dangerous_date_type !== 'd' ) {
                      str_temp += configMap.html.img_tag;
                  }
                  for ( i = 0; i < value.values.length ; i++ ) {
                      str_temp += '<p>' + value.values[i].name +value.values[i].value +   '(' + unit + ')' +   '</p>';
                  }
                  $(this).attr( 'data-content', str_temp );
              }else {
                  $(this).find( 'h4' ).html( '0(' + unit + ')' );
                  $(this).find( 'small' ).html(  '0家企业'  );
                  $(this).attr( 'data-content', '' );
              }
          } );
        tjx.util.ui.table.initPopup();
    }

    onRotationSuccess = function ( data ) {
       
        var key,  items = data.Data, i = 0,
            len = items.length, f = 0, m = 0;
      
        for ( ; i < len; i++ ) {
          
             f = items[i][4];
             m = items[i][5];
            if ( f > 0 ) {
                items[i][4] = parseInt( (m / f) * 100 ).toString() + '%';
            }else {
                items[i][4] =  '0%';
            }
            items[i].pop();
        }
        data.EngFields[2].data = 'a';
        data.EngFields[3].data = 'b';
        data.EngFields[4].data = 'c';
        data.EngFields.pop();
        tjx.util.ui.template.setTableWithData( jqueryMap.$rotation_body, data );
    }

    onSurpassSuccess= function ( data ) {
       
        var key,  items = data.Data, i = 0, nnn = [], nn = [],
            len = items.length, f = 0, m = 0;
      
        for ( ; i < len; i++ ) {
           
            f = parseInt(items[i][4]);
            m = parseInt(items[i][5]);
            if ( m > f ) {
                nn = [];
                nn.push( items[i][0] );
                nn.push( items[i][1] );
                nn.push( items[i][2] );
                nn.push( items[i][3] );
                nn.push( m - f );
                nnn.push( nn );
            }
        }
        data.EngFields[2].data = 'a';
        data.EngFields[3].data = 'b';
        data.EngFields[4].data = 'c';
        data.EngFields.pop();
        data.Data = nnn;
        tjx.util.ui.template.setTableWithData( jqueryMap.$surpass_body, data );
    }

    getQuerySuccess =  function ( data ) {
        
        var key,  items = data.Data, i = 0,
            len = items.length, f = 0, m = 0;
        data.EngFields[2].data = 'a';
        data.EngFields[3].data = 'b';
        data.EngFields[4].data = 'c';

        tjx.util.ui.template.setTableWithData( jqueryMap.$query_body, data );
    }

    getReportSuccess =  function ( data ) {

        tjx.util.ui.template.setTableWithData( jqueryMap.$report_body, data );
    }

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
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

        jqueryMap.$container.find( '.actions label' ).on( 'click',  getChemicalData );
        jqueryMap.$container.find( '.actions label.active' ).trigger( 'click' );

       /* jqueryMap.$container.find( 'label[tjx-element-type=pageup]' ).on( 'click', function () {
            tjx.util.ui.template.onPageUp( tjx.util.ui.template.setTableWithData );
        }  );
        jqueryMap.$container.find( 'label[tjx-element-type=pagedown]' ).on( 'click',  function () {
            tjx.util.ui.template.onPageDon( tjx.util.ui.template.setTableWithData );
        }  );*/

         jqueryMap.$container.find( 'label[tjx-element-type=pageup]' ).on( 'click', tjx.util.ui.template.onPageUp);
         jqueryMap.$container.find( 'label[tjx-element-type=pagedown]' ).on( 'click', tjx.util.ui.template.onPageDon);

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

