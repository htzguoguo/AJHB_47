/**
 * Created by Administrator on 2016/8/10.
 */

tjx.app.onsitecheck.onsitecheckhome = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {

        },
        stateMap = {
            $container : null,
            temp_container : {},
            $cur_this : null,
            week_chart : null
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        initOnSiteReport,
        getReport,
        onFail,
        onInitReportSuccess,
        onCheck,
        onCheckSuccess,
        onCurrentCheckSuccess,
        onInitReplySuccess,
        onInitSoonDueSuccess,
        onInitOnTimeSuccess,
        initPopup,
        initPlotYear,
        onPlotYearSuccess,
        initPlotMonth,
        onPlotMonthSuccess,
        onPageUp,
        onPageDon
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    initPopup = function () {
        $("[data-toggle='popover']").popover({ html : true});

        var p = $("[tjx-data-display='popover']").popover({ html : true});
        p.on("show.bs.popover", function(e){
            $( this ).data("bs.popover").tip().css({"max-width": "500px"});
        });
    }

    onFail = function ( data ) {
        var len, i;
        if ( data && data.Data && data.Data.length > 0 ){
            len = data.Data.length;
            for ( i = 0; i < len; i++ ){

            }
        }
    }

    getReport = function ( datetype, value, callback ) {
        var search = {
            Fields : [   'EnterpriseName', 'ReportTime', 'Problem',  'Recommendation', 'InspectionId', 'Expr1' ],
            OrderFieldName : 'ID',
            OrderType : 'desc'
        };
        if ( value === '已处理' || value === '未处理' ) {
            search.Search = 'Status = {0} ';
            search.Values = [ value ];
        }else if ( value === '即将超期' ) {
            search.Search = 'convert(varchar(10),Deadline,120) <= convert(varchar(10),DateAdd(day, 5, getdate()),120) and Deadline > getdate() and  Status = {0} ';
            search.Values = [ '未处理' ];
        }else if ( value === '整改超期' ) {
            search.Search = 'Deadline < getdate() and Status = {0} ';
            search.Values = [ '未处理' ];
        }



        var arg_map = {
            datetype : datetype,
            data : search,
            success : callback,
            fail : onFail
        };
        tjx.data.onsitecheck.onsitecheck.getOnSiteCheck( arg_map );
    }
    
// example : getTrimmedString
//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $btnreport : $container.find( '#btnreport' ),
            $btndone : $container.find( '#btnoverdone' ),
            $checkpageup : $container.find( '#checkpageup' ),
            $checkpagedown : $container.find( '#checkpagedown' ),
            $replypageup : $container.find( '#replypageup' ),
            $replypagedown : $container.find( '#replypagedown' )
        };
    };

    initOnSiteReport = function (  ) {

    }

    onInitReportSuccess = function ( data ) {
       var con = jqueryMap.$container.find( '#checkreport' );
        onCheckSuccess( con, data );
    }

    onInitReplySuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#checkreply' );
        onCheckSuccess( con, data );
    }

    onInitSoonDueSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#checksoondue' );
        onCheckSuccess( con, data );
    }

    onInitOnTimeSuccess = function ( data ) {
        var con = jqueryMap.$container.find( '#checkontime' );
        onCheckSuccess( con, data );
    }

    initPlotYear = function () {
        var arg_map = {
            success : onPlotYearSuccess,
            fail : onFail
        };
        tjx.data.onsitecheck.onsitecheck.getOnSiteStatYear ( arg_map );
    }

    onPlotYearSuccess = function ( data ) {
      
        var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ];
        var lineData = {
            labels: months,
            datasets: [
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(98,181,205,1)",
                    pointColor: "rgba(98,181,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data.Report
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(0,128,0,1)",
                    pointColor: "rgba(0,128,0,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: data.Reply
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(223,186,73,1)",
                    pointColor: "rgba(223,186,73,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: data.Due
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(251,64,64,1)",
                    pointColor: "rgba(251,64,64,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data:data.Expire
                }
            ]
        };
        var lineOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 5,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 4,
            datasetFill: true,
            responsive: true,
            grid: {
                hoverable: true,
                clickable: true,
                tickColor: "#eee",
                borderColor: "#eee",
                borderWidth: 1
            }
        };
        var mychart = document.getElementById("lineChart");
        var ctx = mychart.getContext("2d");
        var myNewChart = new Chart(ctx).Line(lineData, lineOptions);

        mychart.onclick = function(evt){
            
            var activePoints = myNewChart.getPointsAtEvent(evt);
            if(activePoints.length > 0)
            {
              
                var ind = months.lastIndexOf( activePoints[0].label );
                initPlotMonth(ind);
            }

        };
    }

    initPlotMonth = function ( m ) {
        var cur =  new Date();
        var arg_map = {
            month : m + 1,
            success : onPlotMonthSuccess,
            fail : onFail
        };
        tjx.data.onsitecheck.onsitecheck.getOnSiteStatMonth( arg_map );
    }

    onPlotMonthSuccess = function ( data ) {
       
        var weeks;
        if (data.Due.length === 5) {
            weeks = [ '第一周', '第二周', '第三周' , '第四周' , '第五周' ];
        } else
        {
            weeks = [ '第一周', '第二周', '第三周' , '第四周' ];
        }
        var lineData = {
            labels: weeks,
            datasets: [
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(98,181,205,1)",
                    pointColor: "rgba(98,181,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: data.Report
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(0,128,0,1)",
                    pointColor: "rgba(0,128,0,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: data.Reply
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(223,186,73,1)",
                    pointColor: "rgba(223,186,73,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data: data.Due
                },
                {
                    label: "Example dataset",
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "rgba(251,64,64,1)",
                    pointColor: "rgba(251,64,64,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(26,179,148,1)",
                    data:data.Expire
                }
            ]
        };
        var lineOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.4,
            pointDot: true,
            pointDotRadius: 5,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 4,
            datasetFill: true,
            responsive: true,
        };
        if(stateMap.week_chart !== null){
            stateMap.week_chart.destroy();
        }

        var ctx = document.getElementById("lineChart2").getContext("2d");
        stateMap.week_chart = new Chart(ctx).Line(lineData, lineOptions);
    }

    onPageDon = function () {
       var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );
        $tbody.attr('tjx-page-index', ++ind) ;
        onCheckSuccess( $tbody, data );
    }

    onPageUp = function () {

        var $tbody = $(this).parent().parent().find( 'tbody' );
        var ind = Number( $tbody.attr('tjx-page-index') );
        var data = $tbody.data( 'data' );
        if ( ind > 0 ){
            $tbody.attr('tjx-page-index', --ind) ;
            onCheckSuccess( $tbody, data );
        }
    }

// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onCheck = function () {
        stateMap.$cur_this = $(this);
        var tt = $(this).attr( 'tjx-data-type' );
        var value = $(this).attr( 'tjx-data-value' );
        getReport( tt, value, onCurrentCheckSuccess);
    }

    onCurrentCheckSuccess = function ( data ) {
        var tt = stateMap.$cur_this;
        var $tbody = tt.parent().parent().parent().parent().find( 'tbody' );
        $tbody.attr('tjx-page-index', 0) ;
        tjx.util.ui.template.setTableWithData( $tbody, data );
    }

    /*onCheckSuccess = function ( $tbody, data ) {


        $tbody.data( 'data', data );
        $tbody.find( 'tr:not( .display-none )').remove();
        var ind = Number( $tbody.attr('tjx-page-index') );
        var template = $tbody.find( 'tr.display-none' );
        var $temp_div = $('<div></div>');
        if ( data && data.Data && data.Data.length > 0 ) {

            var i, len, items, item, obj, temp_str;
            len = data.Data.length;
            items = data.Data,
            lll = parseInt(len / 10);
            console.log( 'lll', lll, 'ind', ind );
            if ( lll === 0 ) {
                 i = 0;
            }else {
                if ( ind > lll ) {
                    $tbody.attr('tjx-page-index', --ind) ;
                    i = ind * 10;
                }else if ( ind === lll) {
                    i = ind * 10;
                }else {
                    i = ind * 10;
                    len =i +  10;
                }
            }
            console.log( 'lll', lll, "len", len, "i", i , "ind", ind);
            for ( ; i < len; i++) {
                $temp_div.empty();
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );

                if ( obj ) {
                    var imgcontent = template;
                    var con = imgcontent.clone();
                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );
                    temp_str = con.find( 'button' ).attr( 'data-content' );
                    $temp_div.html( temp_str );
                    tjx.util.setValuesFromData( $temp_div, obj );
                    con.find( 'button' ).attr( 'data-content', $temp_div.html() );

                    $tbody.append( con );
                }
            }
        }
        initPopup();
    }*/
    onCheckSuccess = function ( $tbody, data ) {
        var num =   $tbody.parent().parent().parent().next().children().eq(1);
        num.html('');
        $tbody.data( 'data', data );
        $tbody.find( 'tr:not( .display-none )').remove();
        var ind = Number( $tbody.attr('tjx-page-index') );
        var template = $tbody.find( 'tr.display-none' );
        var $temp_div = $('<div></div>');
        if ( data && data.Data && data.Data.length > 0 ) {
            var i, len, items, item, obj, temp_str, md;
            len = data.Data.length;
            items = data.Data,
                lll = parseInt(len / 10);
           
            md = parseInt( len % 10 );
           
            if ( lll === 0 ) {
                i = 0;
                if ( ind > 0 ) {
                    $tbody.attr('tjx-page-index', --ind) ;
                }

            }
            else
            {
                if ( ind > lll ) {
                    $tbody.attr('tjx-page-index', --ind) ;
                    i = ind * 10;
                }else if ( ind === lll) {
                    if ( md === 0 ){
                        $tbody.attr('tjx-page-index', --ind) ;
                    }
                    i = ind * 10;
                }else {
                    i = ind * 10;
                    len =i +  10;
                }
            }
            for ( ; i < len; i++) {
                $temp_div.empty();
                item = items[ i ];
                obj = tjx.util.buildSingleObjectFromData( data, i );
                if ( obj ) {
                    var imgcontent = template;
                    var con = imgcontent.clone();
                    con.removeClass( 'display-none' );
                    con.removeAttr( 'id' );
                    tjx.util.setValuesFromData( con, obj );
                    temp_str = con.find( 'button' ).attr( 'data-content' );
                    $temp_div.html( temp_str );
                    tjx.util.setValuesFromData( $temp_div, obj );
                    con.find( 'button' ).attr( 'data-content', $temp_div.html() );
                    $tbody.append( con );
                }
            }
            num.html( (ind + 1).toString() + '/' + (lll + 1).toString() );
        }
        tjx.util.ui.table.initPopup();
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
        jqueryMap.$container.find( '.actions label' ).on( 'click', onCheck );
      /*  jqueryMap.$container.find( '.actions label.active').trigger('click');*/

        getReport( 'd', '未处理', onInitReportSuccess );
        getReport( 'd', '已处理', onInitReplySuccess );
        getReport( 'd', '即将超期', onInitSoonDueSuccess );
        getReport( 'd', '整改超期', onInitOnTimeSuccess );
        var cur =  new Date();
        initPopup();
        initPlotYear();
        initPlotMonth( cur.getMonth() );

        jqueryMap.$checkpageup.on( 'click', onPageUp );
        jqueryMap.$checkpagedown.on( 'click', onPageDon );
        jqueryMap.$replypageup.on( 'click', onPageUp );
        jqueryMap.$replypagedown.on( 'click', onPageDon );

        jqueryMap.$btnreport.on( 'click', function () {
            tjx.index3.menuClickTrigger( '自查整改' );
        } );
        jqueryMap.$btndone.on( 'click', function () {
            tjx.index3.menuClickTrigger( '历史档案' );
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
