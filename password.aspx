<%@ Page language="VB"  AutoEventWireup="false" CodeFile="password.aspx.vb" Inherits="password" %>

<%@ Register assembly="DevExpress.Web.ASPxEditors.v11.1" namespace="DevExpress.Web.ASPxEditors" tagprefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>�����޸�</title>
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
	font-family:"����",Arial, Helvetica, sans-serif;
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
    <td width="1016" bgcolor="#1687C1" class="font12bai">�����޸�</td>
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
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1">�û�����</td>
            <td 
                  align="left" bgcolor="#F7FAFF" class="style1"><asp:Label ID="Label1" runat="server" Font-Size="12px" ForeColor="#5193DF"></asp:Label></td>
          </tr>
          <tr>
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1"> �����µ����룺</td>
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
            <td height="38" align="right" bgcolor="#e7f1fd" class="style1">�ظ��µ����룺</td>
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
                    ErrorMessage="���벻һ�£����������롣" Font-Size="12px"></asp:CompareValidator></td>
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

    //λ�ú�IP��ַ��Ӧ��Ϣ-----------------------------------------------
    var arrLocation = new Array();
    arrLocation[0] = new Array("���Ŵ������", "��ѡ��λ��", "���Ŵ������");
    arrLocation[1] = new Array("�۰���Ʒ��", "��ѡ��λ��", "�۰���Ʒ��");
    arrLocation[2] = new Array("�챣�Ƶ�1", "��ѡ��λ��", "�챣�Ƶ�1");
    arrLocation[3] = new Array("�챣�Ƶ�2", "��ѡ��λ��", "�챣�Ƶ�2");
    arrLocation[4] = new Array("�챣�Ƶ�3", "��ѡ��λ��", "�챣�Ƶ�3");
    arrLocation[5] = new Array("�챣��Ԣ1", "��ѡ��λ��", "�챣��Ԣ1");
    arrLocation[6] = new Array("�챣��Ԣ2", "��ѡ��λ��", "�챣��Ԣ2");
    arrLocation[7] = new Array("�챣��Ԣ3", "��ѡ��λ��", "�챣��Ԣ3");
    arrLocation[8] = new Array("18.111.16.5", "���Ŵ������", "18.111.16.5");
    arrLocation[9] = new Array("18.111.16.6", "�۰���Ʒ��", "18.111.16.6");
    arrLocation[10] = new Array("18.111.16.7", "�챣�Ƶ�1", "18.111.16.7");
    arrLocation[11] = new Array("18.111.16.8", "�챣�Ƶ�2", "18.111.16.8");
    arrLocation[12] = new Array("18.111.16.9", "�챣�Ƶ�3", "18.111.16.9");
    arrLocation[13] = new Array("18.111.16.10", "�챣��Ԣ1", "18.111.16.10");
    arrLocation[14] = new Array("18.111.16.11", "�챣��Ԣ2", "18.111.16.11");
    arrLocation[15] = new Array("18.111.16.12", "�챣��Ԣ3", "18.111.16.12");

    var location = new CLASS_Relation(arrLocation) //��������Դ
    location.firstSelectChange("��ѡ��λ��", "DropDownList1"); //���õ�һ��ѡ���
    location.subSelectChange("DropDownList1", "DropDownList2"); //�����Ӽ�ѡ���

    //�豸�����豸���ƶ�Ӧ��Ϣ---------------------------------------------
    var arrType = new Array();
    arrType[0] = new Array("ǰ�˵��豸", "��ѡ��λ��", "ǰ�˵��豸");
    arrType[1] = new Array("�û����豸", "��ѡ��λ��", "�û����豸");
    arrType[2] = new Array("�ֶ��豸", "��ѡ��λ��", "�ֶ��豸");

    arrType[3] = new Array("�����", "ǰ�˵��豸", "�����");
    arrType[4] = new Array("��̨", "ǰ�˵��豸", "��̨");
    arrType[5] = new Array("��̨�����", "ǰ�˵��豸", "��̨�����");
    arrType[6] = new Array("������", "ǰ�˵��豸", "������");
    arrType[7] = new Array("���ת����", "ǰ�˵��豸", "���ת����");
    arrType[8] = new Array("�����", "ǰ�˵��豸", "�����");

    arrType[9] = new Array("�����", "�û����豸", "�����");
    arrType[10] = new Array("�����۽�����", "�û����豸", "�����۽�����");
    arrType[11] = new Array("�����ģ��", "�û����豸", "�����ģ��");
    arrType[12] = new Array("��ع��ػ�", "�û����豸", "��ع��ػ�");
    arrType[13] = new Array("���뿨", "�û����豸", "���뿨");
    arrType[14] = new Array("�洢Ӳ��", "�û����豸", "�洢Ӳ��");

    arrType[15] = new Array("��Ϊ�洢�豸", "�ֶ��豸", "��Ϊ�洢�豸");
    arrType[16] = new Array("�洢Ӳ��", "�ֶ��豸", "�洢Ӳ��");
    arrType[17] = new Array("�洢������", "�ֶ��豸", "�洢������");
    arrType[18] = new Array("������Ľ�����", "�ֶ��豸", "������Ľ�����");
    arrType[19] = new Array("�����ģ��", "�ֶ��豸", "�����ģ��");

    arrType[20] = new Array("����", "�����", "����");
    arrType[21] = new Array("ͼ�񶶶�", "�����", "ͼ�񶶶�");
    arrType[22] = new Array("����Ƶ", "�����", "����Ƶ");
    arrType[23] = new Array("����", "�����", "����");
    arrType[24] = new Array("ͼ��ģ��", "�����", "ͼ��ģ��");
    arrType[25] = new Array("�޷��䱶�佹", "�����", "�޷��䱶�佹");

    arrType[26] = new Array("���粻��", "����", "���粻��");
    arrType[27] = new Array("�������", "����", "�������");
    arrType[28] = new Array("����������", "����", "����������");
    arrType[29] = new Array("����������", "����", "����������");
    arrType[30] = new Array("����������", "����", "����������");

    var devices = new CLASS_Relation(arrType);
        //���õ�һ��ѡ���
    devices.firstSelectChange("��ѡ��λ��", "DropDownList3");
        //������ѡ���
    devices.subSelectChange("DropDownList3", "DropDownList4")
    devices.subSelectChange("DropDownList4", "DropDownList5")
    devices.subSelectChange("DropDownList5", "DropDownList6")
//    devices.subSelectChange("x4", "x5")

    var array = new Array();
    array[0] = new Array("���ϵ���", "��Ŀ¼", "���ϵ���"); //���ݸ�ʽ ID������ID������
    array[1] = new Array("��������", "��Ŀ¼", "��������");
    array[2] = new Array("�Ϻ�", "���ϵ���", "�Ϻ�");
    array[3] = new Array("�㶫", "���ϵ���", "�㶫");
    array[4] = new Array("��һ�", "�Ϻ�", "��һ�");
    array[5] = new Array("����", "�Ϻ�", "����");
    array[6] = new Array("����", "�㶫", "����");
    array[7] = new Array("տ��", "�㶫", "տ��");
    //--------------------------------------------
    //���ǵ��ô���
//    var liandong = new CLASS_LIANDONG_YAO(array) //��������Դ
//    liandong.firstSelectChange("��Ŀ¼", "s1"); //���õ�һ��ѡ���
//    liandong.subSelectChange("s1", "s2"); //�����Ӽ�ѡ���
//    liandong.subSelectChange("s2", "s3");


    //����2-------------------------------------------------------------
    //����Դ   
    var array2 = new Array(); //���ݸ�ʽ ID������ID������
    array2[0] = new Array("���Բ���", "��Ŀ¼", "���Բ���");
    array2[1] = new Array("��������", "��Ŀ¼", "��������");
    array2[2] = new Array("�Ϻ�", "���Բ���", "�Ϻ�");
    array2[3] = new Array("�㶫", "���Բ���", "�㶫");
    array2[4] = new Array("��һ�", "�Ϻ�", "��һ�");
    array2[5] = new Array("����", "�Ϻ�", "����");
    array2[6] = new Array("����", "�㶫", "����");
    array2[7] = new Array("տ��", "�㶫", "տ��");
    array2[8] = new Array("��֪��", "տ��", "��֪��");
    array2[9] = new Array("5555", "տ��", "555");
    array2[10] = new Array("++++", "��֪��", "++++");
    array2[11] = new Array("111", "��һ�", "111");
    array2[12] = new Array("222", "111", "222");
    array2[13] = new Array("333", "222", "333");
    //--------------------------------------------
    //���ǵ��ô���
    //��������Դ
//    var liandong2 = new CLASS_LIANDONG_YAO(array2);
//    //���õ�һ��ѡ���
//    liandong2.firstSelectChange("��Ŀ¼", "x1");
//    //������ѡ���
//    liandong2.subSelectChange("x1", "x2")
//    liandong2.subSelectChange("x2", "x3")
//    liandong2.subSelectChange("x3", "x4")
//    liandong2.subSelectChange("x4", "x5")
    </script>
</html>
