/**
 * Created by Administrator on 2016/7/7.
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
tjx.app.currentsituation.office.info = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : {
                color_name: true,

            },
            max_louhao_number : 32
        },
        stateMap = {
            $container : null,
            tree_kongzhi : null,
            select_louyu : null,
            select_tree_kongzhi : null,
            select_chuzu : null,
            select_tree_chuzu : null,
            select_yishou : null,
            select_tree_yishou : null,
            select_ziyong : null,
            select_tree_ziyong : null,
            is_kongzhi_done : false,
            is_chuzu_done : false,
            is_yishou_done : false,
            is_ziyong_done : false
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        onShowInfo,
        onShowSuccess,
        onShowKongZhi,
        onShowKongZhiSuccess,
        onShowChuZu,
        onShowChuZuSuccess,
        onShowYiShou,
        onShowYiShouSuccess,
        onShowZiYong,
        onShowZiYongSuccess,
        onShowImages,
        onShowImagesSuccess,
        setFilesDetail,
        BuildLouYuTree,
        onKongZhiTeeeClick,
        onShowTree,
        onShowTreeContent,
        onChuZuTeeeClick,
        onYiShouTeeeClick,
        onZiYongTeeeClick,
        onShowStat
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
    setFilesDetail = function ( data, $imgcontent, $imgcontainer, islayers ) {
        var i, length;


        $imgcontainer.find( '.category_1:not( .display-hide )').remove();
        if ( data && data.length > 0 ) {
            var imgcontent = $imgcontent;
            var url ;
            var ss ;
            var title;
            for ( i = 0, length = data.length; i < length; i++ ) {
                var con = imgcontent.clone();
                var src = data[i];
                if ( islayers ) {
                    if (src.search(/_a/) === -1  ){
                        con.find( 'img' ).attr('src', data[ i ] );
                        con.find( 'a' ).attr('href', data[ i ] );
                        con.removeClass( 'display-none' );
                        con.removeAttr( 'id' );
                        url  = data[i];
                        ss = url.split( '/' );
                        var fname = ss[ ss.length-1 ].split('.')[0];
                        if ( fname.length > 3 ) {
                            title = fname;
                        }else
                        {
                            title =  '第' + ss[ ss.length-2 ] + '号楼';
                            title  +=  '-第' + ss[ ss.length-1 ].split('.')[0] + '层';
                        }
                        con.find( 'span' ).html( title );
                        con.find( 'a' ).attr('title', title );
                    }
                }else{
                    if (src.search(/_a/) > -1  ) {
                        con.find( 'img' ).attr('src', data[ i ] );
                        con.find( 'a' ).attr('href', data[ i ] );
                        con.removeClass( 'display-none' );
                        con.removeAttr( 'id' );
                        url  = data[i];
                        ss = url.split( '/' );
                        var fname = ss[ ss.length-1 ].split('.')[0];
                        if ( fname.length > 3 ) {
                            title = fname;
                        }else
                        {
                            title =  '第' + ss[ ss.length-2 ] + '号楼';
                            title  +=  '-第' + ss[ ss.length-1 ].split('.')[0] + '层';
                        }
                        con.find( 'span' ).html( title );
                        con.find( 'a' ).attr('title', title );
                    }
                }
                $imgcontainer.append( con );
            }
        }
        jqueryMap.$container.find('.mix-grid').mixitup();
        tjx.util.ui.photo.handleFancybox();
    }

    BuildLouYuTree = function ( data ) {
        var items, item, len, i, buildingname, layername,building, layer,  area = 0,  result = {};
        if ( data && data.Data && data.Data.length > 0 ) {
            items = data.Data;
            len = items.length;
            for ( i = 0; i < len; i++ ) {
                item = items[i];
                buildingname = item[0];
                layername = item[1];
                area = tjx.util.ui.input.getFixedFloat1( item[3], 2 );
                if ( result.hasOwnProperty( buildingname ) ) {
                    building = result[ buildingname ];
                    building.count += 1;

                    building.area = Number(building.area) +  Number(area);

                    if ( building.layers.hasOwnProperty( layername ) ) {
                        layer = building.layers[ layername ];
                        layer.count += 1;

                        layer.area  =  Number(layer.area) + Number(area);

                        layer.room.push( item );
                    }else {
                        building.layers[ layername ] = {
                            name : '第' + layername + '层',
                            count : 1,
                            area : area,
                            room : [ item ]
                        };
                    }

                }else{
                    result[ buildingname ] = {
                        name : '第' + buildingname + '号楼',
                        count : 1,
                        area : area,
                        layers : {}
                    };
                    result[ buildingname ].layers[ layername ] = {
                        name : '第' + layername + '层',
                        count : 1,
                        area : area,
                        room : [ item ]
                    };
                }
            }
        }
        return result;
    }

    onShowTree = function ( treedata, $tree, $template , treeclick, idtag, $room_container, $img  ) {
        var name,layername, item, layeritem

        var isbuildingfirst = true;
        var islayerfirst = true;
        var firstbuilding, layerfirst;

        $tree.find( '.panel:not( .display-hide )').remove();
        for ( name in treedata ) {
            if  (treedata.hasOwnProperty( name )) {
                item = treedata[ name ];
                var temp = '';
                var imgcontent = $template;
                var con = imgcontent.clone();
                con.find( '.panel-collapse' ).attr( 'id', idtag + name );
                con.find( 'a' ).attr( 'href',  '#' + idtag + name );
                con.find( 'a' ).html( item.name +  '(共' + item.count  + '间房, '  +  tjx.util.ui.input.getFixedFloat1(item.area,2) +  '平方米)'  );
                con.removeClass( 'display-none' );
                con.removeAttr( 'id' );
                if (  isbuildingfirst ) {
                    isbuildingfirst = false;
                    firstbuilding = name;
                    con.find( 'a' ).attr( 'aria-expanded',  true );
                    con.find( '.panel-collapse' ).attr( 'aria-expanded',  true );
                    con.find( '.panel-collapse' ).addClass( 'in' );
                }else
                {
                    con.find( 'a' ).attr( 'aria-expanded',  false );
                    con.find( '.panel-collapse' ).attr( 'aria-expanded',  false );
                    con.find( '.panel-collapse' ).css("height","0px");
                }
                temp += '<ul>';
                for ( layername in item.layers ) {
                    if  (item.layers.hasOwnProperty( layername )) {
                        layeritem = item.layers[ layername ];
                        if ( islayerfirst ) {
                            temp+= '<li class="active">';
                            islayerfirst = false;
                            layerfirst = layername;
                        }else {
                            temp+= '<li>';
                        }
                        /*   temp  += '<a href="javascript:void(0);"  onclick="tjx.app.currentsituation.office.info.onKongZhiTeeeClick(\'' + name + '\',\'' + layername +  '\')">' +  layeritem.name +  '(共' + layeritem.count  + '间房)' +  '</a></li>';*/
                        temp  += '<a href="javascript:void(0);" tjx-cs-build="' + name + '" tjx-cs-layer="' + layername +  '" >' +  layeritem.name +  '(共' + layeritem.count  + '间房, '  +  tjx.util.ui.input.getFixedFloat1(layeritem.area,2) +  '平方米)' +  '</a></li>';
                    }
                }
                temp += '</ul>';
                con.find( '.panel-body' ).html(  temp  );
                $tree.append( con );
            }
        }
        $room_container.find( 'tr:not( .display-hide )').remove();
        $img.attr( 'src', '' );
        $tree.find( 'a[tjx-cs-build]').on( 'click', treeclick );
        $tree.find( 'a[tjx-cs-build]').eq(0).trigger('click');
    }

    onShowTreeContent = function ($this, select_tree, $tree, treedata, $room_container, $room, $img  ) {
        var building = $this.attr( 'tjx-cs-build' );
        var layer = $this.attr( 'tjx-cs-layer' );

        if ( select_tree ) {
            select_tree.parent().removeClass( 'active' );
            select_tree.parent().parent().parent().removeClass( 'active' );
            $this.parent().addClass( 'active' );
            $this.parent().parent().parent().addClass( 'active' );
            select_tree = $this;
        }else{
            select_tree = $tree.find( 'a[tjx-cs-build]' ).eq(0) ;
        }
        var tree = treedata;

        var room = tree[ building ].layers[layer].room;


        $room_container.find( 'tr:not( .display-hide )').remove();
        var i, len, items, item, obj;
        len = room.length;
        items = room;
        for ( i = 0; i < len; i++) {
            item = items[ i ];
            var imgcontent = $room;
            var con = imgcontent.clone();
            con.removeClass( 'display-none' );
            con.removeAttr( 'id' );
            /*  con.find( '.item-body' ).html( item[2] );*/
            con.find( 'td' ).eq(0).html( "房间号: " +  item[2] );
            con.find( 'td' ).eq(1).html( "房间面积(平方米): " + tjx.util.ui.input.getFixedFloat(item[3] ,  2)  );
            con.find( 'td' ).eq(2).html( "房屋预计利用情况: " +  item[4] );
            $room_container.append( con );
        }
        var file = "楼宇图片/" + stateMap.select_louyu + "/" + building + "/" + layer + ".jpg";
        $img.attr( 'src', file );
    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $modal_info : $container.find( '#officedetail' ),
            $bt_basic : $container.find( '#tb_basicinfo' ),
            $container_building : $container.find( '#cn_building' ),
            $template_building: $container.find( '#tb_building' ),
            $container_rent : $container.find( '#cn_rent' ),
            $template_rent: $container.find( '#tb_rent' ),
            $container_office : $container.find( '#cn_office' ),
            $template_office: $container.find( '#tb_office' ),
            $mix_grid_report : $container.find( '#mix-grid-1' ),
            $img_report_content : $container.find( '#phototemplate' ),
            $tb_kongzhi : $container.find( '#tb_kongzhi' ),
            $tb_chuzu : $container.find( '#tb_chuzu' ),
            $tb_yishou : $container.find( '#tb_yishou' ),
            $tb_ziyong : $container.find( '#tb_ziyong' ),
            $tree_kongzhi : $container.find( '#kongzhitree' ),
            $room_kongzhi : $container.find( '#kongzhiroom' ),
            $container_room_kognzhi : $container.find( '#kongzhiroomcontainer' ),
            $img_kongzhi : $container.find( '#img_kongzhi' ),
            $img_kongzhi_fullview : $container.find( '#img_kongzhi_fullview' ),
            $template_kongzhi : $container.find( '#kongzhitreeitem' ),

            $tree_chuzu : $container.find( '#chuzutree' ),
            $room_chuzu : $container.find( '#chuzuroom' ),
            $container_room_chuzu : $container.find( '#chuzuroomcontainer' ),
            $img_chuzu : $container.find( '#img_chuzu' ),
            $img_chuzu_fullview : $container.find( '#img_chuzu_fullview' ),
            $template_chuzu : $container.find( '#chuzutreeitem' ),

            $tree_yishou : $container.find( '#yishoutree' ),
            $room_yishou : $container.find( '#yishouroom' ),
            $container_room_yishou : $container.find( '#yishouroomcontainer' ),
            $img_yishou : $container.find( '#img_yishou' ),
            $img_yishou_fullview : $container.find( '#img_yishou_fullview' ),
            $template_yishou : $container.find( '#yishoutreeitem' ),

            $tree_ziyong : $container.find( '#ziyongtree' ),
            $room_ziyong : $container.find( '#ziyongroom' ),
            $container_room_ziyong : $container.find( '#ziyongroomcontainer' ),
            $img_ziyong : $container.find( '#img_ziyong' ),
            $img_ziyong_fullview : $container.find( '#img_ziyong_fullview' ),
            $template_ziyong : $container.find( '#ziyongtreeitem' ),

            $room_stat : $container.find( '#statroom' ),
            $container_room_stat : $container.find( '#statroomcontainer' ),

            $layers_grid_report : $container.find( '#layers-grid-1' ),
            $layers_report_content : $container.find( '#layerstemplate' )
          };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onShowInfo = function ( event, arg  ) {
       /* event.stopImmediatePropagation();*/
        stateMap.is_chuzu_done = false;
        stateMap.is_kongzhi_done = false;
        stateMap.is_yishou_done = false;
        stateMap.is_ziyong_done = false;
        jqueryMap.$container_room_stat.find( 'tr:not( .display-hide )').remove()

        stateMap.select_louyu = arg;
        tjx.util.ui.startPageLoading( {animate: true} );
        var search = {
            Fields : [  '*' ],
            OrderFieldName : '土地使用权人',
            OrderType : 'desc'
        };
        search.Search = '楼宇名称 = {0} ';
        search.Values = [ arg ];
        var arg_map = {
            data : search,
            success : onShowSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getLouyuDataTable( arg_map );

        onShowKongZhi( arg );
        onShowChuZu( arg );
        onShowYiShou( arg );
        onShowZiYong( arg )

    }

    onShowStat = function ( ) {
        if ( stateMap.is_chuzu_done && stateMap.is_kongzhi_done && stateMap.is_yishou_done  && stateMap.is_ziyong_done ) {
        var len, i, item = [], items = [], istrue = false;
        len = configMap.max_louhao_number;
        for ( i = 1; i <= len; i++) {
            istrue = false;
            item = [ '','','','','','','','','' ];
            item[0] =  '第' + i.toString() + '号楼' ;
            if ( stateMap.tree_kongzhi && stateMap.tree_kongzhi[i] ) {
                item[1] =  tjx.util.ui.input.getFixedFloat(stateMap.tree_kongzhi[i].area,2) ;
                item[2] = stateMap.tree_kongzhi[i].count ;
                istrue = true;
            }
            if ( stateMap.tree_chuzu && stateMap.tree_chuzu[i] ) {
                item[3] =  tjx.util.ui.input.getFixedFloat(stateMap.tree_chuzu[i].area,2) ;
                item[4] = stateMap.tree_chuzu[i].count ;
                istrue = true;
            }
            if ( stateMap.tree_yishou && stateMap.tree_yishou[i] ) {
                item[5] =  tjx.util.ui.input.getFixedFloat(stateMap.tree_yishou[i].area,2) ;
                item[6] = stateMap.tree_yishou[i].count ;
                istrue = true;
            }
            if ( stateMap.tree_ziyong && stateMap.tree_ziyong[i] ) {
                item[7] =  tjx.util.ui.input.getFixedFloat(stateMap.tree_ziyong[i].area,2) ;
                item[8] = stateMap.tree_ziyong[i].count ;
                istrue = true;
            }
            if ( istrue ){
                items.push( item );
            }
        }
        tjx.util.ui.table.fillTableWithData( jqueryMap.$container_room_stat, jqueryMap.$room_stat, items );
        }
    }

    onShowSuccess = function ( data ) {
        var value = tjx.util.buildSingleObjectFromData( data, 0 );
        tjx.util.setValuesFromData( jqueryMap.$bt_basic, value );

        onShowImages( value.图片路径 );

        jqueryMap.$modal_info.attr( 'data-width', 1200 );
        jqueryMap.$modal_info.slimScroll({
            height: 600
        });
        jqueryMap.$modal_info.modal( );

        tjx.util.ui.stopPageLoading();
    }

    onShowKongZhi = function ( arg  ) {
        var search = {
            Fields : [ '楼号','所在层数','房间号','房间面积','房屋预计利用情况' ],
            OrderFieldName : '楼号,所在层数',
            OrderType : 'asc'
        };
        search.Search = '楼盘名称 = {0} ';
        search.Values = [ arg ];
        var arg_map = {
            data : search,
            success : onShowKongZhiSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getKongZhiDataTable( arg_map );
    }

    onShowKongZhiSuccess = function ( data ) {
        var treedata = BuildLouYuTree( data );
        stateMap.tree_kongzhi = treedata;
        stateMap.select_tree_kongzhi = null;
        onShowTree( treedata,jqueryMap.$tree_kongzhi,jqueryMap.$template_kongzhi, onKongZhiTeeeClick , 'tjxtroffice',
            jqueryMap.$container_room_kognzhi, jqueryMap.$img_kongzhi   );

        stateMap.is_kongzhi_done = true;
        onShowStat();
    }

    onKongZhiTeeeClick = function ( ) {
     /*   onShowTreeContent($(this), stateMap.select_tree_kongzhi,jqueryMap.$tree_kongzhi,stateMap.tree_kongzhi,
            jqueryMap.$container_room_kognzhi , jqueryMap.$room_kongzhi, jqueryMap.$img_kongzhi  );*/
        var building = $(this).attr( 'tjx-cs-build' );
        var layer = $(this).attr( 'tjx-cs-layer' );

        if ( stateMap.select_tree_kongzhi ) {

            stateMap.select_tree_kongzhi.parent().removeClass( 'active' );
            stateMap.select_tree_kongzhi.parent().parent().parent().removeClass( 'active' );

            $(this).parent().addClass( 'active' );
            $(this).parent().parent().parent().addClass( 'active' );
            stateMap.select_tree_kongzhi = $(this);
        }else{
            stateMap.select_tree_kongzhi = jqueryMap.$tree_kongzhi.find( 'a[tjx-cs-build]' ).eq(0) ;
        }
        var tree = stateMap.tree_kongzhi;

        var room = tree[ building ].layers[layer].room;


        jqueryMap.$container_room_kognzhi.find( 'tr:not( .display-hide )').remove();
            var i, len, items, item, obj;
            len = room.length;
            items = room;
            for ( i = 0; i < len; i++) {
                item = items[ i ];
                var imgcontent = jqueryMap.$room_kongzhi;
                var con = imgcontent.clone();
                con.removeClass( 'display-none' );
                con.removeAttr( 'id' );
              /*  con.find( '.item-body' ).html( item[2] );*/
                con.find( 'td' ).eq(0).html( "房间号: " +  item[2] );
                con.find( 'td' ).eq(1).html( "房间面积(平方米): " + tjx.util.ui.input.getFixedFloat(item[3] ,  2)  );
                con.find( 'td' ).eq(2).html( "房屋预计利用情况: " +  item[4] );
                jqueryMap.$container_room_kognzhi.append( con );
            }
         var file = "楼宇图片/" + stateMap.select_louyu + "/" + building + "/" + layer + ".jpg";
        jqueryMap.$img_kongzhi.attr( 'src', file );
        jqueryMap.$img_kongzhi_fullview.attr( 'href', file );
        tjx.util.ui.photo.handleFancybox();
    }

    /*onShowKongZhiSuccess = function ( data ) {
        tjx.util.ui.table.clearDataTable( jqueryMap.$tb_kongzhi );
        var options = tjx.util.ui.table.getCustomTableOptions( true, false, 30 );
       /!* options.order =  [[ 2, "desc" ]];*!/
        options.columnDefs =  [
            {
                "className": 'tjx-table-td-middle',
                "targets": 0
            },
            {
                "className": 'tjx-table-td-middle',
                "targets": 1
            }
        ];
      /!*  options.AutoWidth = false;*!/
        options.data = data.Data;
        stateMap.dt =   jqueryMap.$tb_kongzhi.DataTable(  options  );

         tjx.util.ui.table.w_table_rowspan( '#tb_kongzhi', 1 );
         tjx.util.ui.table.w_table_rowspan( '#tb_kongzhi', 2);
       /!*  tjx.util.ui.table.w_table_rowspan( '#tb_kongzhi', 3);*!/

    }*/

    onShowChuZu  = function ( arg  ) {
        var search = {
            Fields : [ '楼号','所在层数','房间号','承租面积','承租方名称','租期','行业','承租方利用情况' ],
            OrderFieldName : '楼号,所在层数',
            OrderType : 'asc'
        };
        search.Search = '楼盘名称 = {0} ';
        search.Values = [ arg ];
        var arg_map = {
            data : search,
            success : onShowChuZuSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getChuZuDataTable( arg_map );
    }

    onShowChuZuSuccess  = function ( data ) {
        var treedata = BuildLouYuTree( data );
        stateMap.tree_chuzu = treedata;
        stateMap.select_tree_chuzu = null;
        onShowTree( treedata,jqueryMap.$tree_chuzu,jqueryMap.$template_chuzu, onChuZuTeeeClick , 'tjxtrofficechuzu',
            jqueryMap.$container_room_chuzu, jqueryMap.$img_chuzu);

        stateMap.is_chuzu_done = true;
        onShowStat();
    }

    onChuZuTeeeClick = function ( ) {
        /*   onShowTreeContent($(this), stateMap.select_tree_kongzhi,jqueryMap.$tree_kongzhi,stateMap.tree_kongzhi,
         jqueryMap.$container_room_kognzhi , jqueryMap.$room_kongzhi, jqueryMap.$img_kongzhi  );*/
        var building = $(this).attr( 'tjx-cs-build' );
        var layer = $(this).attr( 'tjx-cs-layer' );

        if ( stateMap.select_tree_chuzu ) {

            stateMap.select_tree_chuzu.parent().removeClass( 'active' );
            stateMap.select_tree_chuzu.parent().parent().parent().removeClass( 'active' );

            $(this).parent().addClass( 'active' );
            $(this).parent().parent().parent().addClass( 'active' );
            stateMap.select_tree_chuzu = $(this);
        }else{
            stateMap.select_tree_chuzu = jqueryMap.$tree_chuzu.find( 'a[tjx-cs-build]' ).eq(0) ;
        }
        var tree = stateMap.tree_chuzu;

        var room = tree[ building ].layers[layer].room;


        jqueryMap.$container_room_chuzu.find( 'tr:not( .display-hide )').remove();
        var i, len, items, item, obj;
        len = room.length;
        items = room;
        for ( i = 0; i < len; i++) {
            item = items[ i ];
            var imgcontent = jqueryMap.$room_chuzu;
            var con = imgcontent.clone();
            con.removeClass( 'display-none' );
            con.removeAttr( 'id' );
            /*  con.find( '.item-body' ).html( item[2] );*/
            con.find( 'td' ).eq(0).html( "房间号: " +  item[2] );
            con.find( 'td' ).eq(1).html( "承租面积(平方米): " + tjx.util.ui.input.getFixedFloat(item[3] ,  2)  );
            con.find( 'td' ).eq(2).html( "承租方: " +  item[4] );
            con.find( 'td' ).eq(3).html( "租期: " +  item[5] );
            con.find( 'td' ).eq(4).html( "行业: " +  item[6] );
            con.find( 'td' ).eq(5).html( "利用情况: " +  item[7] );
            jqueryMap.$container_room_chuzu.append( con );
        }
        var file = "楼宇图片/" + stateMap.select_louyu + "/" + building + "/" + layer + ".jpg";
        jqueryMap.$img_chuzu.attr( 'src', file );
        jqueryMap.$img_chuzu_fullview.attr( 'href', file );
        tjx.util.ui.photo.handleFancybox();
    } 

    onShowYiShou  = function ( arg  ) {
        var search = {
            Fields : ['楼号','所在层数','房间号','已售面积','买方名称','行业','买方利用情况' ],
            OrderFieldName : '楼号,所在层数',
            OrderType : 'asc'
        };
        search.Search = '楼盘名称 = {0} ';
        search.Values = [ arg ];
        var arg_map = {
            data : search,
            success : onShowYiShouSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getYiShouDataTable( arg_map );
    }

    onShowYiShouSuccess   = function ( data ) {
        var treedata = BuildLouYuTree( data );
        stateMap.tree_yishou = treedata;
        stateMap.select_tree_yishou = null;
        onShowTree( treedata,jqueryMap.$tree_yishou,jqueryMap.$template_yishou, onYiShouTeeeClick , 'tjxtrofficeyishou',
            jqueryMap.$container_room_yishou, jqueryMap.$img_yishou );

        stateMap.is_yishou_done = true;
        onShowStat();
    }

    onYiShouTeeeClick = function (  ) {
        var building = $(this).attr( 'tjx-cs-build' );
        var layer = $(this).attr( 'tjx-cs-layer' );

        if ( stateMap.select_tree_yishou ) {

            stateMap.select_tree_yishou.parent().removeClass( 'active' );
            stateMap.select_tree_yishou.parent().parent().parent().removeClass( 'active' );

            $(this).parent().addClass( 'active' );
            $(this).parent().parent().parent().addClass( 'active' );
            stateMap.select_tree_yishou = $(this);
        }else{
            stateMap.select_tree_yishou = jqueryMap.$tree_yishou.find( 'a[tjx-cs-build]' ).eq(0) ;
        }
        var tree = stateMap.tree_yishou;

        var room = tree[ building ].layers[layer].room;


        jqueryMap.$container_room_yishou.find( 'tr:not( .display-hide )').remove();
        var i, len, items, item, obj;
        len = room.length;
        items = room;
        for ( i = 0; i < len; i++) {
            item = items[ i ];
            var imgcontent = jqueryMap.$room_yishou;
            var con = imgcontent.clone();
            con.removeClass( 'display-none' );
            con.removeAttr( 'id' );
            /*  con.find( '.item-body' ).html( item[2] );*/
            con.find( 'td' ).eq(0).html( "房间号: " +  item[2] );
            con.find( 'td' ).eq(1).html( "已售面积(平方米): " + tjx.util.ui.input.getFixedFloat(item[3] ,  2)  );
            con.find( 'td' ).eq(2).html( "买方名称: " +  item[4] );
            con.find( 'td' ).eq(3).html( "行业: " +  item[5] );
            con.find( 'td' ).eq(4).html( "利用情况: " +  item[6] );
            jqueryMap.$container_room_yishou.append( con );
        }
        var file = "楼宇图片/" + stateMap.select_louyu + "/" + building + "/" + layer + ".jpg";
        jqueryMap.$img_yishou.attr( 'src', file );
        jqueryMap.$img_yishou_fullview.attr( 'href', file );
        tjx.util.ui.photo.handleFancybox();
    }

    onShowZiYong  = function ( arg  ) {
        var search = {
            Fields : ['楼号','所在层数','房间号','房间面积' ],
            OrderFieldName : '楼号,所在层数',
            OrderType : 'asc'
        };
        search.Search = '楼盘名称 = {0} ';
        search.Values = [ arg ];
        var arg_map = {
            data : search,
            success : onShowZiYongSuccess,
            fail : tjx.util.io.onFail
        };
        tjx.data.currentsituation.detail.getZiYongDataTable( arg_map );
    }

    onShowZiYongSuccess   = function ( data ) {
        var treedata = BuildLouYuTree( data );
        stateMap.tree_ziyong = treedata;
        stateMap.select_tree_ziyong = null;
        onShowTree( treedata,jqueryMap.$tree_ziyong,jqueryMap.$template_ziyong, onZiYongTeeeClick , 'tjxtrofficeziyong',
            jqueryMap.$container_room_ziyong,jqueryMap.$img_ziyong );

        stateMap.is_ziyong_done = true;
        onShowStat();
    }

    onZiYongTeeeClick = function () {
        var building = $(this).attr( 'tjx-cs-build' );
        var layer = $(this).attr( 'tjx-cs-layer' );

        if ( stateMap.select_tree_ziyong ) {

            stateMap.select_tree_ziyong.parent().removeClass( 'active' );
            stateMap.select_tree_ziyong.parent().parent().parent().removeClass( 'active' );

            $(this).parent().addClass( 'active' );
            $(this).parent().parent().parent().addClass( 'active' );
            stateMap.select_tree_ziyong = $(this);
        }else{
            stateMap.select_tree_ziyong = jqueryMap.$tree_ziyong.find( 'a[tjx-cs-build]' ).eq(0) ;
        }
        var tree = stateMap.tree_ziyong;

        var room = tree[ building ].layers[layer].room;


        jqueryMap.$container_room_ziyong.find( 'tr:not( .display-hide )').remove();
        var i, len, items, item, obj;
        len = room.length;
        items = room;
        for ( i = 0; i < len; i++) {
            item = items[ i ];
            var imgcontent = jqueryMap.$room_ziyong;
            var con = imgcontent.clone();
            con.removeClass( 'display-none' );
            con.removeAttr( 'id' );
            /*  con.find( '.item-body' ).html( item[2] );*/
            con.find( 'td' ).eq(0).html( "房间号: " +  item[2] );
            con.find( 'td' ).eq(1).html( "房间面积(平方米): " + tjx.util.ui.input.getFixedFloat(item[3] ,  2)  );           
            jqueryMap.$container_room_ziyong.append( con );
        }
        var file = "楼宇图片/" + stateMap.select_louyu + "/" + building + "/" + layer + ".jpg";
        jqueryMap.$img_ziyong.attr( 'src', file );
        jqueryMap.$img_ziyong_fullview.attr( 'href', file );
        tjx.util.ui.photo.handleFancybox();
    }

    onShowImages  = function ( arg  ) {

        if ( arg ) {
            var pp = arg.substr(arg.lastIndexOf("\\")+1)
            var arg_map = {
                path : pp,
                success : onShowImagesSuccess,
                fail : tjx.util.io.onFail
            };
            tjx.data.currentsituation.detail.getLouyuImages( arg_map );
        }
    }

    onShowImagesSuccess = function ( data ) {
        setFilesDetail( data, jqueryMap.$img_report_content, jqueryMap.$mix_grid_report,false );
        setFilesDetail( data, jqueryMap.$layers_report_content, jqueryMap.$layers_grid_report, true );
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
       /* $.gevent.unsubscribe(
            tjx.shell.getShellContainer(),
            'tjx-currentsituation-showinfo'
        );*/
     /*   $.gevent.subscribe( tjx.shell.getShellContainer(), 'tjx-currentsituation-showinfo', onShowInfo );*/
        tjx.shell.unsubscribeEvent( 'tjx-currentsituation-office-showinfo' );
        tjx.shell.subscribeEvent(  'tjx-currentsituation-office-showinfo', tjx.app.currentsituation.office.info.onShowInfo );

        jqueryMap.$container.find('.mix-grid').mixitup();
        
        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        onShowInfo : onShowInfo,
        onKongZhiTeeeClick : onKongZhiTeeeClick
    };
//------------------- END PUBLIC METHODS ---------------------
}());
