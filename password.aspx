<%@ Page language="VB"  AutoEventWireup="false" CodeFile="password.aspx.vb" Inherits="password" %>

<%@ Register assembly="DevExpress.Web.ASPxEditors.v11.1" namespace="DevExpress.Web.ASPxEditors" tagprefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>密码修改</title>
<link href="index-1.css" rel="stylesheet" type="text/css" />
<style type="text/css">

body {
	background-color: #e7f1fd;
	padding:8px 20px 8px 8px;
}
    
*{
	font-size:12px;
}
.font12bai{
	font-family:"宋体",Arial, Helvetica, sans-serif;
	font-size:12px;
	color:#FFF;
	font-weight:bold;
}
.td{
	border:1px solid #adc9ef;
	background:#fff;
	}

.pdleft{
	padding:1px;
	}
</style>


 <body>
<form id="form1" runat="server">

 <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
     <tr>
    <td width="10" bgcolor="#1687C1"><img src="http://localhost/images/lr-01.jpg" 
            width="4" height="27" /></td>
    <td width="80" bgcolor="#1687C1"><img src="images/bullet_star.png" width="16" height="16" /><img src="images/bullet_star.png" width="16" height="16" /><img src="images/bullet_star.png" width="16" height="16" /></td>
    <td width="1016" bgcolor="#1687C1" class="font12bai">密码修改</td>
    <td width="17" align="right" bgcolor="#1687C1">
        <img src="http://localhost/images/lr-02.jpg" width="3" height="27" /></td>
  </tr>
  <tr>
    <td colspan="4" align="left" valign="top" style="padding:8px; background-color:#e9f4fa;"><table width="100%" border="0" align="center" cellpadding="0" class="td">
      <tr>
        <td align="left" bgcolor="#FFFFFF" class="pdleft"><table width="100%" height="242" border="0" >
          <tr>
            <td width="30%" height="38" align="right" bgcolor="#e7f1fd" class="style1">&nbsp;</td>
            <td bgcolor="#F7FAFF" class="style1">&nbsp;</td>
          </tr>
          <tr>
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1">用户名：</td>
            <td 
                  align="left" bgcolor="#F7FAFF" class="style1"><asp:Label ID="Label1" runat="server" Font-Size="12px" ForeColor="#5193DF"></asp:Label></td>
          </tr>
          <tr>
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1"> 设置新的密码：</td>
            <td 
                  align="left" bgcolor="#F7FAFF" class="style1">
                <dx:ASPxTextBox ID="ASPxTextBox3" runat="server" Width="170px" 
                    Password="True" CssFilePath="~/App_Themes/Aqua/{0}/styles.css" 
                    CssPostfix="Aqua" SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css">
                    <ValidationSettings>
                        <ErrorFrameStyle ImageSpacing="4px">
                            <ErrorTextPaddings PaddingLeft="4px" />
                        </ErrorFrameStyle>
                    </ValidationSettings>
                </dx:ASPxTextBox></td>
          </tr>
          <tr>
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1">重复新的密码：</td>
            <td 
                  align="left" bgcolor="#F7FAFF" class="style1">
                <dx:ASPxTextBox ID="ASPxTextBox4" runat="server" Width="170px" 
                    Password="True" CssFilePath="~/App_Themes/Aqua/{0}/styles.css" 
                    CssPostfix="Aqua" SpriteCssFilePath="~/App_Themes/Aqua/{0}/sprite.css">
                    <ValidationSettings>
                        <ErrorFrameStyle ImageSpacing="4px">
                            <ErrorTextPaddings PaddingLeft="4px" />
                        </ErrorFrameStyle>
                    </ValidationSettings>
                </dx:ASPxTextBox></td>
          </tr>
          <tr>
            <td height="38" align="right" bgcolor="#e7f1fd" >&nbsp;</td>
            <td align="left" valign="middle" bgcolor="#F7FAFF"><asp:CompareValidator ID="CompareValidator2" runat="server" 
                    ControlToCompare="ASPxTextBox3" ControlToValidate="ASPxTextBox4" 
                    ErrorMessage="密码不一致，请重新输入。" Font-Size="12px"></asp:CompareValidator></td>
          </tr>
          <tr>
            <td height="38" colspan="2" align="right" ><table width="60%" height="28" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td align="center"><dx:ASPxButton 
                      ID="ASPxButton1" runat="server" Height="30px" Width="80px">
                  <BackgroundImage ImageUrl="~/Images/index_r12_c11.jpg" Repeat="NoRepeat" 
                          horizontalposition="center" />
                  <Border BorderWidth="0px" />
                </dx:ASPxButton></td>
                <td><dx:ASPxButton ID="ASPxButton2" runat="server" Height="30px" Width="80px">
                  <BackgroundImage ImageUrl="~/Images/index_r12_c15.jpg" 
                          horizontalposition="center" repeat="NoRepeat" />
                  <Border BorderWidth="0px" />
                </dx:ASPxButton></td>
              </tr>
            </table></td>
            </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
</table>
 </form>
</body>

<script language="javascript">

    //位置和IP地址对应信息-----------------------------------------------
    var arrLocation = new Array();
    arrLocation[0] = new Array("京门大道环岛", "请选择位置", "京门大道环岛");
    arrLocation[1] = new Array("港澳商品城", "请选择位置", "港澳商品城");
    arrLocation[2] = new Array("天保酒店1", "请选择位置", "天保酒店1");
    arrLocation[3] = new Array("天保酒店2", "请选择位置", "天保酒店2");
    arrLocation[4] = new Array("天保酒店3", "请选择位置", "天保酒店3");
    arrLocation[5] = new Array("天保公寓1", "请选择位置", "天保公寓1");
    arrLocation[6] = new Array("天保公寓2", "请选择位置", "天保公寓2");
    arrLocation[7] = new Array("天保公寓3", "请选择位置", "天保公寓3");
    arrLocation[8] = new Array("18.111.16.5", "京门大道环岛", "18.111.16.5");
    arrLocation[9] = new Array("18.111.16.6", "港澳商品城", "18.111.16.6");
    arrLocation[10] = new Array("18.111.16.7", "天保酒店1", "18.111.16.7");
    arrLocation[11] = new Array("18.111.16.8", "天保酒店2", "18.111.16.8");
    arrLocation[12] = new Array("18.111.16.9", "天保酒店3", "18.111.16.9");
    arrLocation[13] = new Array("18.111.16.10", "天保公寓1", "18.111.16.10");
    arrLocation[14] = new Array("18.111.16.11", "天保公寓2", "18.111.16.11");
    arrLocation[15] = new Array("18.111.16.12", "天保公寓3", "18.111.16.12");

    var location = new CLASS_Relation(arrLocation) //设置数据源
    location.firstSelectChange("请选择位置", "DropDownList1"); //设置第一个选择框
    location.subSelectChange("DropDownList1", "DropDownList2"); //设置子级选择框

    //设备区域设备名称对应信息---------------------------------------------
    var arrType = new Array();
    arrType[0] = new Array("前端点设备", "请选择位置", "前端点设备");
    arrType[1] = new Array("用户端设备", "请选择位置", "用户端设备");
    arrType[2] = new Array("局端设备", "请选择位置", "局端设备");

    arrType[3] = new Array("摄像机", "前端点设备", "摄像机");
    arrType[4] = new Array("云台", "前端点设备", "云台");
    arrType[5] = new Array("云台解码板", "前端点设备", "云台解码板");
    arrType[6] = new Array("编码器", "前端点设备", "编码器");
    arrType[7] = new Array("光电转换器", "前端点设备", "光电转换器");
    arrType[8] = new Array("红外灯", "前端点设备", "红外灯");

    arrType[9] = new Array("监控屏", "用户端设备", "监控屏");
    arrType[10] = new Array("网络汇聚交换机", "用户端设备", "网络汇聚交换机");
    arrType[11] = new Array("网络光模块", "用户端设备", "网络光模块");
    arrType[12] = new Array("监控工控机", "用户端设备", "监控工控机");
    arrType[13] = new Array("解码卡", "用户端设备", "解码卡");
    arrType[14] = new Array("存储硬盘", "用户端设备", "存储硬盘");

    arrType[15] = new Array("华为存储设备", "局端设备", "华为存储设备");
    arrType[16] = new Array("存储硬盘", "局端设备", "存储硬盘");
    arrType[17] = new Array("存储服务器", "局端设备", "存储服务器");
    arrType[18] = new Array("网络核心交换机", "局端设备", "网络核心交换机");
    arrType[19] = new Array("网络光模块", "局端设备", "网络光模块");

    arrType[20] = new Array("黑屏", "摄像机", "黑屏");
    arrType[21] = new Array("图像抖动", "摄像机", "图像抖动");
    arrType[22] = new Array("无视频", "摄像机", "无视频");
    arrType[23] = new Array("蓝屏", "摄像机", "蓝屏");
    arrType[24] = new Array("图像模糊", "摄像机", "图像模糊");
    arrType[25] = new Array("无法变倍变焦", "摄像机", "无法变倍变焦");

    arrType[26] = new Array("供电不足", "黑屏", "供电不足");
    arrType[27] = new Array("摄像机损坏", "黑屏", "摄像机损坏");
    arrType[28] = new Array("视屏线缆损坏", "黑屏", "视屏线缆损坏");
    arrType[29] = new Array("防雷器故障", "黑屏", "防雷器故障");
    arrType[30] = new Array("编码器故障", "黑屏", "编码器故障");

    var devices = new CLASS_Relation(arrType);
        //设置第一个选择框
    devices.firstSelectChange("请选择位置", "DropDownList3");
        //设置子选择框
    devices.subSelectChange("DropDownList3", "DropDownList4")
    devices.subSelectChange("DropDownList4", "DropDownList5")
    devices.subSelectChange("DropDownList5", "DropDownList6")
//    devices.subSelectChange("x4", "x5")

    var array = new Array();
    array[0] = new Array("华南地区", "根目录", "华南地区"); //数据格式 ID，父级ID，名称
    array[1] = new Array("华北地区", "根目录", "华北地区");
    array[2] = new Array("上海", "华南地区", "上海");
    array[3] = new Array("广东", "华南地区", "广东");
    array[4] = new Array("徐家汇", "上海", "徐家汇");
    array[5] = new Array("普托", "上海", "普托");
    array[6] = new Array("广州", "广东", "广州");
    array[7] = new Array("湛江", "广东", "湛江");
    //--------------------------------------------
    //这是调用代码
//    var liandong = new CLASS_LIANDONG_YAO(array) //设置数据源
//    liandong.firstSelectChange("根目录", "s1"); //设置第一个选择框
//    liandong.subSelectChange("s1", "s2"); //设置子级选择框
//    liandong.subSelectChange("s2", "s3");


    //例子2-------------------------------------------------------------
    //数据源   
    var array2 = new Array(); //数据格式 ID，父级ID，名称
    array2[0] = new Array("测试测试", "根目录", "测试测试");
    array2[1] = new Array("华北地区", "根目录", "华北地区");
    array2[2] = new Array("上海", "测试测试", "上海");
    array2[3] = new Array("广东", "测试测试", "广东");
    array2[4] = new Array("徐家汇", "上海", "徐家汇");
    array2[5] = new Array("普托", "上海", "普托");
    array2[6] = new Array("广州", "广东", "广州");
    array2[7] = new Array("湛江", "广东", "湛江");
    array2[8] = new Array("不知道", "湛江", "不知道");
    array2[9] = new Array("5555", "湛江", "555");
    array2[10] = new Array("++++", "不知道", "++++");
    array2[11] = new Array("111", "徐家汇", "111");
    array2[12] = new Array("222", "111", "222");
    array2[13] = new Array("333", "222", "333");
    //--------------------------------------------
    //这是调用代码
    //设置数据源
//    var liandong2 = new CLASS_LIANDONG_YAO(array2);
//    //设置第一个选择框
//    liandong2.firstSelectChange("根目录", "x1");
//    //设置子选择框
//    liandong2.subSelectChange("x1", "x2")
//    liandong2.subSelectChange("x2", "x3")
//    liandong2.subSelectChange("x3", "x4")
//    liandong2.subSelectChange("x4", "x5")
    </script>
</html>
