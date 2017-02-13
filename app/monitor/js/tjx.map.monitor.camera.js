/**
 * Created by Administrator on 2016/8/3.
 */
tjx.app.monitor.camera= (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            camera_setting : {
                wnd_num : 4
            }
        },
        stateMap = {
            $container : null,
            gWndId : null,
            bLogin : false,
            deviceid : null,
            download_video : {
                path : null
            }
        },
        jqueryMap = {},
        setJqueryMap,
        configModule,
        initModule,
        initCamera,
        createWnd,
        onLogin,
        ShowCallRetInfo,
        goPlay,
        goPlayByHWND,
        goPlayback,
        getDate,
        goPlaybackByHWND,
        goPlayPause,
        goPlayResume,
        goPlayScreenShot,
        goDownloadVideo, goDownloadVideoPause, goDownloadVideoResume, goDownloadVideoStop,
        getSelectedWindowNum
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------

    ShowCallRetInfo = function (nRet, strInfo)
    {
        var str = "";
        if(nRet === 0)
        {
            str = strInfo + " 成功！";
        }
        else
        {
            str = strInfo + "失败！错误码：" + nRet;
        }
        jqueryMap.$info.html( str );
      /*  if ( ele ) {
            document.getElementById(ele).innerText = str;
        }else
        {
            document.getElementById("RetInfo").innerText = str;
        }*/
    };

    /*function ButtonStartTimePlaybackByWndNo_onclick()
    {
        var obj = document.getElementById("DPSDK_OCX");

        var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
        var szCameraId = document.getElementById("textCameraID").value;
        var nRecordSource = document.getElementById("selectRecordSource").value;
        //   var nRecordType = document.getElementById("selectRecordType").value;
        var strStartTime = document.getElementById("textStartTime").value;
        var strEndTime = document.getElementById("textEndTime").value;
        var nStartTime = getDate(strStartTime).getTime()/1000;
        var nEndTime = getDate(strEndTime).getTime()/1000;

        ShowCallRetInfo(obj.DPSDK_StartTimePlaybackByWndNo(gWndId, nWndNo, szCameraId, nRecordSource, nStartTime, nEndTime), "按时间回放");
    }*/

    getDate = function (strDate)
    {
        
        var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
                function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        return date;
    };

    goPlayback = function ( arg_map ) {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        var szCameraId =  stateMap.deviceid;
        var nRecordSource = '2';
        var strStartTime = arg_map.starttime;
        var strEndTime = arg_map.endtime;
        var nStartTime = getDate(strStartTime).getTime()/1000;
        var nEndTime = getDate(strEndTime).getTime()/1000;
        var	nRet = obj.DPSDK_StartTimePlaybackByWndNo(stateMap.gWndId, nWndNo, szCameraId, nRecordSource, nStartTime, nEndTime);
        ShowCallRetInfo(nRet, "视频");
    };

    goPlayPause = function (  ) {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        ShowCallRetInfo(obj.DPSDK_PausePlaybackByWndNo(stateMap.gWndId, nWndNo), "暂停回放");
    };

    goPlayResume = function () {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        ShowCallRetInfo(obj.DPSDK_ResumePlaybackByWndNo(stateMap.gWndId, nWndNo), "继续回放");
    };

    goPlayScreenShot = function () {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        var mydate=new Date();
        var reg=new RegExp(":","g");
        var path="c:\\ajhb_cctv\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".bmp";
        alert("存储路径："+path);
        ShowCallRetInfo(obj.DPSDK_CapturePictureByWndNo(stateMap.gWndId, nWndNo,path), "抓图");
    };

    goPlaybackByHWND = function ( arg_map ) {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);

        var hWnd =  obj.DPSDK_GetWndVideoHandle(gWndId, nWndNo);
        var szCameraId =  stateMap.deviceid;
        var nRecordSource = '2';
        //   var nRecordType = document.getElementById("selectRecordType").value;

        /*var strStartTime = arg_map.starttime;
         var strEndTime = arg_map.endtime;*/

        var strStartTime = '2016-09-01 14:14:49';
        var strEndTime = '2016-09-02 23:59:59';

        var nStartTime = getDate(strStartTime).getTime()/1000;
        var nEndTime = getDate(strEndTime).getTime()/1000;

        var	nRet = obj.DPSDK_StartTimePlaybackByHWND(hWnd, szCameraId, nRecordSource, nStartTime, nEndTime);
        ShowCallRetInfo(nRet, "视频");
    };

    goDownloadVideo = function ( arg_map ) {
        var obj = document.getElementById("DPSDK_OCX");
        var szCameraId =  stateMap.deviceid;
        var nRecordSource = '2';
        var strStartTime = arg_map.starttime;
        var strEndTime = arg_map.endtime;
        var nStartTime = getDate(strStartTime).getTime()/1000;
        var nEndTime = getDate(strEndTime).getTime()/1000;
        var mydate=new Date();
        var reg=new RegExp(":","g");
        var path="c:\\ajhb_cctv\\"+mydate.toLocaleString().replace(" ","").replace("年","").replace("月","").replace("日","").replace(reg,"")+".dav";
        stateMap.download_video.path = path;
        alert("存储路径："+path);
        ShowCallRetInfo(obj.DPSDK_DownloadRecordByTime(path, szCameraId, nRecordSource, nStartTime, nEndTime), "按时间下载");
    };

    goDownloadVideoPause = function ()
    {
        var obj = document.getElementById("DPSDK_OCX");
        ShowCallRetInfo(obj.DPSDK_PauseDownloadRecord(stateMap.download_video.path), "暂停下载");
    }

    goDownloadVideoResume = function ()
    {
        var obj = document.getElementById("DPSDK_OCX");
        ShowCallRetInfo(obj.DPSDK_ResumeDownloadRecord(stateMap.download_video.path), "继续下载");
    }

    goDownloadVideoStop = function ()
    {
        var obj = document.getElementById("DPSDK_OCX");
        ShowCallRetInfo(obj.DPSDK_StopDownloadRecord(stateMap.download_video.path), "停止下载");
    }

    goPlay = function ( deviceid )
    {
        stateMap.deviceid = deviceid;
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        /*  alert( nWndNo ); 1, 2, 3, 4顺序编号*/


        /*  var szCameraId = '1000171$1$0$6';*/
        var szCameraId = deviceid;

        var nStreamType = "1";
        var nMediaType = "1";
        var nTransType = "1";


        var	nRet =obj.DPSDK_StartRealplayByWndNo(stateMap.gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType);

      /*  var	nRet = obj.DPSDK_StartRealplayByHWND(hWnd, szCameraId, nStreamType, nMediaType, nTransType);*/
        ShowCallRetInfo(nRet, "播放视频");
    };

    getSelectedWindowNum = function () {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        return nWndNo;
    };

    goPlayByHWND = function ( deviceid )
    {
        stateMap.deviceid = deviceid;
        var obj = document.getElementById("DPSDK_OCX");
        var nWndNo = obj.DPSDK_GetSelWnd(stateMap.gWndId);
        /*  alert( nWndNo ); 1, 2, 3, 4顺序编号*/
        var hWnd = obj.DPSDK_GetWndVideoHandle(stateMap.gWndId, nWndNo);

        /*  var szCameraId = '1000171$1$0$6';*/
        var szCameraId = deviceid;

        var nStreamType = "1";
        var nMediaType = "1";
        var nTransType = "1";

        var	nRet = obj.DPSDK_StartRealplayByHWND(hWnd, szCameraId, nStreamType, nMediaType, nTransType);
        ShowCallRetInfo(nRet, "播放视频");
        if(nRet == 0)
        {

            ShowCallRetInfo(obj.DPSDK_SetIvsShowFlagByHWND(hWnd, 1, 1),"规则线显示");//打开规则线显示
            ShowCallRetInfo(obj.DPSDK_SetIvsShowFlagByHWND(hWnd, 2, 1),"目标框显示");//打开目标框显示
            ShowCallRetInfo(obj.DPSDK_SetIvsShowFlagByHWND(hWnd, 3, 1),"轨迹线显示");//打开轨迹线显示
        }
    };

    onLogin = function ()
    {
        var obj = document.getElementById("DPSDK_OCX");
        var szIp = '21.72.0.101';
        var nPort = '9000';
        var szUsername = 'bhaj2';
        var szPassword = 'bhaj123456';
        var nRet = obj.DPSDK_Login(szIp, nPort, szUsername, szPassword);
        ShowCallRetInfo(nRet, "登录", 'RetInfo');
        if(nRet == 0)
        {
            stateMap.bLogin = 1;
        }
    };

// example : getTrimmedString
    initCamera = function (  ){

        var obj = document.getElementById("DPSDK_OCX");
        stateMap.gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);

        createWnd();
      /*  obj.DPSDK_SetLog(2, "D:\\DPSDK_OCX_log", false, false); *///初始化后设置日志路径
        //var obj = document.getElementById("DPSDK_OCX");
        //ShowCallRetInfo(obj.DPSDK_Login("172.7.123.123", 9000, "1", "1"), "登录");
        //ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");
        //var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
        //ShowCallRetInfo(obj.DPSDK_DirectRealplayByWndNo(gWndId, nWndNo, "1000001$1$0$0", 1, 1, 1), "直接实时播放");
        for(var i=1;i<=4;i++)
            obj.DPSDK_SetToolBtnVisible(i, false);
        obj.DPSDK_SetToolBtnVisible(7, false);
        obj.DPSDK_SetToolBtnVisible(9, false);
        obj.DPSDK_SetControlButtonShowMode(1, 0);
        obj.DPSDK_SetControlButtonShowMode(2, 0);
    };

    createWnd = function (  ) {
        var obj = document.getElementById("DPSDK_OCX");
        var nWndCount = configMap.camera_setting.wnd_num;
        obj.DPSDK_SetWndCount(stateMap.gWndId, nWndCount);
        obj.DPSDK_SetSelWnd(stateMap.gWndId, 0);
    };


//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $camera : $container.find( '#DPSDK_OCX' ),
            $info : $container.find( '#info' )
        };
    };
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
        initCamera();
        onLogin();
      /*  goPlay( '1000171$1$0$6' );*/


    /*    $( '#btnplay').on( 'click',ButtonStartRealplayByHWND_onclick  );*/


        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        initCamera : initCamera,
        onLogin : onLogin,
        goPlay : goPlay,
        goPlayback : goPlayback,
        goPlayPause : goPlayPause,
        goPlayResume : goPlayResume,
        goPlayScreenShot : goPlayScreenShot,
        goDownloadVideo : goDownloadVideo,
        goDownloadVideoPause : goDownloadVideoPause,
        goDownloadVideoResume : goDownloadVideoResume,
        goDownloadVideoStop : goDownloadVideoStop,
        getSelectedWindowNum : getSelectedWindowNum
    };
//------------------- END PUBLIC METHODS ---------------------
}());
