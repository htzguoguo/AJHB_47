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
tjx.app.securityinfo.survery = (function () {
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            settable_map : { color_name: true },
            color_name : 'blue',
            field_file_tag : 'tjx-file-field'
        },
        stateMap = {
            $container : null,
            validator : null,
            chsuser : tjx.shell.getSiteData( 'username' ),
            uploadfiles : { },
            savefiles : { },
            is_new : false,
            is_modal : false

        },
        jqueryMap = {},
        setJqueryMap, configModule, initModule,
        onSumitData, onCancelData, onSuccess,
        onFail, initFileToolTip, initFileUpload,
        onFileSuccess,
        onInitForm,
        onInitSuccess,
        onEditData,
        onEditSuccess,
        getContainer
        ;
//----------------- END MODULE SCOPE VARIABLES ---------------
//------------------- BEGIN UTILITY METHODS ------------------
// example : getTrimmedString
   // help-block has-error help-block-error

 /*   setFormValidate = function () {

        var error1 = $('.alert-danger', jqueryMap.$form);
        var success1 = $('.alert-success', jqueryMap.$form);
      stateMap.validator =  jqueryMap.$form.validate(
            {
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                ignore: "",  // validate all fields including form hidden input
                rules : {
                    EnterpriseName : {
                        required: true
                    },
                    Email : {
                        email: true
                    },
                    EmployeeNumber : {
                        number: true
                    },
                    SpecialOperationNumber : {
                        number: true
                    },
                    DangerousPositionNumber : {
                        number: true
                    }
                },
                messages : {
                    EnterpriseName : {
                        required: '请输入企业企业名称'
                    },
                    Email : {
                        email: '请输入正确的电子邮箱地址'
                    },
                    EmployeeNumber : {
                        number: '请输入正确的员工人数'
                    },
                    SpecialOperationNumber : {
                        number: '请输入正确的特种作业人数'
                    },
                    DangerousPositionNumber : {
                        number: '请输入正确的职业危害岗位人数'
                    }
                },
                invalidHandler: function (event, validator) { //display error alert on form submit
                    success1.hide();
                    error1.show();
                   // jqueryMap.$form.scrollTo(error1, -200);
                    tjx.util.ui.scrollTo($(error1, jqueryMap.$form), -200);
                   // tjx.util.ui.scrollTo($('.has-error', jqueryMap.$form), -200);
                   // tjx.util.ui.scrollTo($('.has-error', jqueryMap.$form) , -200);

                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group

                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    success1.show();
                    error1.hide();
                   // onSumitData();
                }
            }
        );
    }*/

    initFileToolTip = function (  ) {
        jqueryMap.$firecontrolacceptance.mouseover().attr('title', '选择以后,请上传《消防验收意见书》或《消防验收合格证》扫描件').tooltip('show');
        jqueryMap.$firecontrolacceptance.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$LightningDetection.mouseover().attr('title', '选择以后,请上传《防雷检测报告》扫描件').tooltip('show');
        jqueryMap.$LightningDetection.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$DetectionOfOccupationalHazard.mouseover().attr('title', '选择以后,请上传相关电子文件').tooltip('show');
        jqueryMap.$DetectionOfOccupationalHazard.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$SafetyAcceptance.mouseover().attr('title', '选择以后,请上传《安全验收评价报告》扫描件').tooltip('show');
        jqueryMap.$SafetyAcceptance.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$HeadTraining.mouseover().attr('title', '选择以后,请上传相关电子文件').tooltip('show');
        jqueryMap.$HeadTraining.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$ManagementTraining.mouseover().attr('title', '选择以后,请上传相关电子文件').tooltip('show');
        jqueryMap.$ManagementTraining.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$OperatingPersonnelTraining.mouseover().attr('title', '选择以后,请上传相关电子文件').tooltip('show');
        jqueryMap.$OperatingPersonnelTraining.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$SafetyCulture.mouseover().attr('title', '选择以后,请上传《安全文件示范企业证书》扫描件').tooltip('show');
        jqueryMap.$SafetyCulture.mouseout().removeAttr('title').tooltip('hide');
        jqueryMap.$EmergencyPlan.mouseover().attr('title', '选择以后,请上传《应急预案备案》电子文件').tooltip('show');
        jqueryMap.$EmergencyPlan.mouseout().removeAttr('title').tooltip('hide');


      /*  jqueryMap.$photo.mouseover().attr('title', '选择以后,请上传相关附件').tooltip('show');
        jqueryMap.$photo.mouseout().removeAttr('title').tooltip('hide');*/

      /*  jqueryMap.$photo.attr('title', '选择以后,请上传相关附件').tooltip('show');*/

      /*  $('#testInfo .popover-content').text('申报价格小于测算价格，以测算价格作为纳税基数');
        $('#testInfo').show();*/
    }

    initFileUpload = function (  ) {
        jqueryMap.$container.find( '[type=checkbox]').each( function ( index ) {
          
            var f = $(this).parent().parent().find( '.fileinput-button' );

            if( $( this ).prop("checked") === true )
            {
                f.removeAttr( 'disabled');
                f.removeClass( 'grey' );
                f.addClass( 'yellow' );

            }
            else {
                f.attr( 'disabled', "true");
                f.removeClass( 'yellow' );
                f.addClass( 'grey' );
            }
        } );

      /*  jqueryMap.$container.find( '.fileinput-button' ).attr( 'disabled', "true");*/

        jqueryMap.$container.find( '[type=checkbox]').click( function (  ) {
            if( $( this ).prop("checked") === true ) {

                $( this).parent().next().find( 'span:first-child').removeAttr( 'disabled' );
                $( this).parent().next().find( 'span:first-child').removeClass( 'grey' );
                $( this).parent().next().find( 'span:first-child').addClass( 'yellow' );

            }else {
                $( this).parent().next().find( 'span:first-child').attr( 'disabled', "true");
                $( this).parent().next().find( 'span:first-child').removeClass( 'yellow' );
                $( this).parent().next().find( 'span:first-child').addClass( 'grey' );
            }
        } );

        jqueryMap.$container.find( '[type=file]').change( function ()  {
            if ( $(this)[0].files[0] ) {
                $( this).prev().html( "上传中..." );
                var fileName = $(this).val();
                var name = tjx.util.ui.getClientFileName( fileName );
                var url = 'FileService/file/' + name;
                var data =  $(this)[0].files[0] ;
                tjx.util.io.uploadBlobOrFile( url, data, null, null, onFileSuccess, onFail, $(this) );
                /*  uploadBlobOrFile($upload[0].files[0]);*/
            }
        } );
    }

    var onFileSuccess = function ( data, $file ) {
       
        var field = $file.attr(configMap.field_file_tag);
        var fileName = $file.val();
        var name = tjx.util.ui.getClientFileName( fileName );
        stateMap.uploadfiles[ field ] = data;
        stateMap.savefiles[ field ] = name;

        $file.prev().html( "完成" );
        $file.parent().removeClass( 'grey' );
        $file.parent().addClass( 'blue' );

    }

//-------------------- END UTILITY METHODS -------------------
//--------------------- BEGIN DOM METHODS --------------------
// Begin DOM method /setJqueryMap/
    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container : $container,
            $form : $container.find( '.form-horizontal' ),
            $formbody : $container.find( '.form-body' ),
            $send : $container.find( '#ok' ),
            $cancel : $container.find( '#cancel' ),
            $caption : $container.find( '.caption' ),
            $name : $container.find( '*[tjx-data-field=EnterpriseName]' ),
            $businessaddress : $container.find( '*[tjx-data-field=BusinessAddress]' ),
            $photo : $container.find( '#photocontainer' ),
            $enterprisename : $container.find( '*[tjx-data-field=EnterpriseName]' ),
            $firecontrolacceptance : $container.find( '#checkbox37lll' ),
            $LightningDetection : $container.find( '#checkbox38lll' ),
            $DetectionOfOccupationalHazard : $container.find( '#checkbox40lll' ),
            $SafetyAcceptance : $container.find( '#checkbox41lll' ),
            $HeadTraining : $container.find( '#checkbox42lll' ),
            $ManagementTraining : $container.find( '#checkbox43lll' ),
            $OperatingPersonnelTraining : $container.find( '#checkbox44lll' ),
            $SafetyCulture : $container.find( '#checkbox56lll' ),
            $EmergencyPlan : $container.find( '#checkbox57lll' ),
        };
    };
// End DOM method /setJqueryMap/
//---------------------- END DOM METHODS ---------------------
//------------------- BEGIN EVENT HANDLERS -------------------
// example: onClickButton = ...
    onSumitData = function ( event ) {
          // event.preventDefault();

        if ( tjx.util.ui.isInputEmpty( jqueryMap.$enterprisename )){
            return false;
        }

              var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
             /* data.FileName = tjx.filetemplate.getFileNames();*/
              data.FileName = tjx.util.getObjPropertyNameAndValues( stateMap.uploadfiles, ':', '|' );
              data.SaveName = tjx.util.getObjPropertyNameAndValues( stateMap.savefiles, ':', '|' );
              var arg_map = {
                  data : data,
                  success : onSuccess,
                  fail : onFail
              };
              tjx.data.securityinfo.addSecurityInfo( arg_map );


    }

    onCancelData = function ( event ) {
      var val =   jqueryMap.$form.validate();
      //  console.log('validate', val.validate());

    }

    onSuccess = function ( data  ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' ,data.Desc);
            if ( stateMap.is_modal ){
                $.gevent.publish( 'table-update', [ {} ]);
            }else {
                jqueryMap.$cancel.trigger("click");
                tjx.filetemplate.resetFiles();
            }
         
        }else{
            tjx.util.ui.showAlert( '系统提示' ,data.Desc);
        }
    }

    onFail = function ( data ) {

    }

    onInitForm = function (  ) {
        var arg_map = {
            data : { key : tjx.table.getSelectedKey() },
            success :onInitSuccess ,
            fail : onFail
        };
        tjx.data.securityinfo.getSecurityEditInfo( arg_map );
    }

    onInitSuccess = function ( data ) {
        tjx.util.setFormValuesFromData( jqueryMap.$formbody, data );
       /* tjx.app.securityinfo.survery.initFileUpload( tjx.app.securityinfo.survery.getContainer()  );*/
      /*  $.gevent.publish( 'file_init', [ {} ]);*/
         initFileUpload(   );
    }

    onEditData = function ( event ) {
        // event.preventDefault();
        var data = tjx.util.getValuesFromFormInput( jqueryMap.$formbody );
        data.FileName = tjx.util.getObjPropertyNameAndValues( stateMap.uploadfiles, ':', '|' );
        data.SaveName = tjx.util.getObjPropertyNameAndValues( stateMap.savefiles, ':', '|' );
        var arg_map = {
            key : tjx.table.getSelectedKey(),
            data : data,
            success : onEditSuccess,
            fail : onFail
        };
        tjx.data.securityinfo.updateSecurityInfo( arg_map );
    }

    onEditSuccess = function ( data ) {
        if ( data.IsSuccess ){
            tjx.util.ui.showSuccess( '系统提示' , '安全生产概况更新完成。');
            $.gevent.publish( 'table-update', [ {} ]);
        }else{
            tjx.util.ui.showAlert( '系统提示' , '安全生产概况更新不成功，请重试。');
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

    getContainer = function (  ) {
        return jqueryMap.$container;
    }

// End public method /configModule/
// Begin public method /initModule/
// Purpose : Initializes module
// Arguments :
// * $container the jquery element used by this feature
// Returns : true
// Throws : nonaccidental
//
    initModule = function ( $container ,  isnew,  ismodal) {
        stateMap.$container = $container;
        setJqueryMap();
        stateMap.is_new = isnew;
        stateMap.is_modal = ismodal;
        if ( stateMap.is_new ) {
            if ( ! stateMap.is_modal ){
                jqueryMap.$caption.append( tjx.index3.getTitle() );
            }
            initFileUpload(   );
            jqueryMap.$name.val( stateMap.chsuser );
            jqueryMap.$name.attr( 'value',  stateMap.chsuser );
            jqueryMap.$send.bind( 'click', onSumitData );
        }
        else
        {
            onInitForm();
           /* initFileUpload();*/
            tjx.shell.setSelectedContainer( jqueryMap.$container );
            jqueryMap.$send.bind( 'click', onEditData );

           /* jqueryMap.$formbody.slimScroll({
                height: tjx.table.getModelHeight()
            });*/


           /* $.gevent.subscribe( jqueryMap.$container, 'file_init', initFileUpload );*/
        }
        /*  tjx.util.ui.initFileUpload( jqueryMap.$photo );*/

        initFileToolTip();
      // jqueryMap.$cancel.bind( 'click', onCancelData );

        return true;
    };
// End public method /initModule/
// return public methods
    return {
        configModule : configModule,
        initModule : initModule,
        initFileUpload :initFileUpload,
        getContainer : getContainer
    };
//------------------- END PUBLIC METHODS ---------------------
}());


