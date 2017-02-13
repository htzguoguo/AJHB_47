<%@ Page Language="VB" AutoEventWireup="false" CodeFile="login.aspx.vb" Inherits="login" %>
<%@ Register assembly="DevExpress.Web.ASPxEditors.v11.1" namespace="DevExpress.Web.ASPxEditors" tagprefix="dxe" %>
<%@ Register assembly="DevExpress.Web.v11.1" namespace="DevExpress.Web.ASPxCallback" tagprefix="dx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><%= SysEnviroment.AppName%></title>
<!-- our stylesheets -->
<link href="css/tjx.css" rel="stylesheet" type="text/css"  />
<link href="css/tjx.login.css" rel="stylesheet" type="text/css"  />
<!-- third-party javascript -->
<script src="js/jq/jquery.min.js" type="text/javascript"></script>
<!-- our javascript -->
<!--<script type="text/javascript" src="js/tjx.js"></script>
<script type="text/javascript" src="js/tjx.login.js"></script>-->

<script type="text/javascript" src="js/tjx.build.min.js"></script>


 <script type="text/javascript">

     // Start spa once DOM is ready
     //
     jQuery(document).ready(
                function () {
                    tjx.login.initModule(jQuery('.tjx-login-container'));
                });

    </script>
</head>
<body onload="toplocation()">
<div class="tjx-login-title">欢迎使用<%= SysEnviroment.AppName%></div>
<div class="tjx-login-container">
	<div class="tjx-login-theme">
    	<div class="tjx-login-loginForm">
       <form id="form2" runat="server">
       	  <div id="ajhb-login" class="tjx-login-loginFuncNormal">管理登录</div>
            	<div class="tjx-login-loginFormIpt">
                    <b class="tjx-login-ico tjx-login-ico-uid"></b>
                    <dxe:ASPxTextBox runat="server"  
        ClientInstanceName="ASPxTextBox111" EnableClientSideAPI="True" 
        ID="ASPxTextBox1"  CssClass="tjx-login-formIpt" Font-Size="X-Large">
                        <Paddings PaddingTop="4px" />
                  <ValidationSettings CausesValidation="True" Display="Dynamic" ErrorText="不能为空" 
              SetFocusOnError="True">
                    <RequiredField ErrorText="不能为空" IsRequired="True" />
                  </ValidationSettings>
                  <ClientSideEvents LostFocus="function(s, e) {
tjx.login.changeLabelText();
}


" GotFocus="function(s, e) {
	document.getElementById('FailureText').innerText = '';
}"></ClientSideEvents>
                        <FocusedStyle>
                            <Border BorderStyle="None" />
                        </FocusedStyle>
                        <Border BorderStyle="None" />
              </dxe:ASPxTextBox>
					           
          	    </div> 
                 <div class="tjx-login-loginFormIpt">
                    <b class="tjx-login-ico tjx-login-ico-pid"></b>
                    <dxe:ASPxTextBox runat="server"  ID="ASPxTextBox2" 
          Password="True" CssClass="tjx-login-formIpt" Font-Size="X-Large">
                        <Paddings PaddingTop="4px" />
                  <ValidationSettings>
                    <RequiredField ErrorText="不能为空" />
                  </ValidationSettings>
                  <ClientSideEvents GotFocus="function(s, e) {
                  var e =document.getElementById('FailureText');
                  if (e != null)
                   e.innerText = '';
}" />
                        <Border BorderStyle="None" />
              </dxe:ASPxTextBox>
          	    </div> 
                <div class="tjx-login-lbpid">
                     <dxe:ASPxLabel runat="server" ID="FailureText" ClientInstanceName="FailureText" 
                              Font-Size="Medium" ForeColor="Red" Height="23px" Width="300px"></dxe:ASPxLabel>
                </div>
               <div class="tjx-login-loginFormBtn">
				    <button id="loginBtn" runat="server" class="tjx-login-btn-login" tabindex="6" type="submit">登&nbsp;&nbsp;录</button>
			   </div>   
        </form>
        </div>
         <dx:ASPxCallback ID="ASPxCallback1" runat="server" ClientInstanceName="Callback1"
        OnCallback="ASPxCallback1_Callback">
        <ClientSideEvents CallbackComplete="function(s, e) {
         tjx.login.setError(s, e);
    }" />
    </dx:ASPxCallback>
    </div>
<div class="tjx-login-copyriht">
 
 </div>    
</div>
<script  type="text/javascript">

     function toplocation() {
                if (top.location != self.location)
                { top.location = self.location; }
   }
</script>
</body>
</html>
