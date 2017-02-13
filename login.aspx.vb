Imports System.Collections.Generic
Imports TTSK.Web.AuthorityEntry
Imports TTSK.Web.HttpHelper

Partial Class login
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Me.IsPostBack = True AndAlso Me.IsCallback = True Then
            Dim userName As String = Me.ASPxTextBox1.Text.Trim
            Dim isExisting As Boolean = UserLogin.IsUserExisting(userName)
            If isExisting = False Then
                Me.FailureText.Text = "用户名不存在"
                ' Me.ASPxLabel1.Visible = True
            Else
                ' Me.ASPxLabel1.Visible = False
                Me.FailureText.Text = ""
            End If
            Dim roles As List(Of String) = UserLogin.GetUserRoles(userName)
            If roles IsNot Nothing AndAlso roles.Count > 0 Then
            Else
                Me.FailureText.Text = "用户名不存在"
            End If
        End If

    End Sub



    Private Sub RegeditJavaScript()
        Dim sName As String = "UserNameInputDone"
        If Me.Page.ClientScript.IsClientScriptBlockRegistered(sName) = False Then
            Dim strScript As New StringBuilder
            strScript.Append("<script language=JavaScript> ")
            strScript.Append("var labelID=<%=ASPxTextBox1.ClientID%>;")
            strScript.Append("function UserNameInputDone(){")

            strScript.Append("var label = document.getElementById(labelID);")
            strScript.Append("label.InnerText = ""kk"";")
            strScript.Append("label.SetValue(""kk"")")
            strScript.Append("}")
            strScript.Append(" </script>")

            Me.Page.ClientScript.RegisterClientScriptBlock(Me.GetType, sName, strScript.ToString)
        End If
    End Sub

    'Protected Sub ASPxButton1_Click1(ByVal sender As Object, ByVal e As System.EventArgs) Handles ASPxButton3.Click
    '    Login2()

    'End Sub

    Private Sub Login2()
        Dim userName As String = Me.ASPxTextBox1.Text.Trim
        Dim password As String = Me.ASPxTextBox2.Text.Trim
        Dim uid As String = UserLogin.Login(userName, password)
        If String.IsNullOrEmpty(uid) = False Then
            Dim uinfo As New CCUserInfo
            ' CUserInfo.UserName = UserLogin.GetUserTrueNameByUserName(userName)
            uinfo.UserName = userName
            uinfo.UserID = uid
            'UserLogin.GetUserIDByUserName(userName)
            Dim comid As String
            Dim roles As List(Of String) = UserLogin.GetUserRoles(userName)
                If roles IsNot Nothing AndAlso roles.Count > 0 Then
                    uinfo.RoleName = roles(0)

                Else
                Me.FailureText.Text = "没有配置所属单位"
                    Exit Sub
                End If

            comid = UserLogin.GetCompanyIDByRoleName(uinfo.RoleName)


            uinfo.UserTrueName = UserLogin.GetUserTrueNameByUserName(userName)
            '  uinfo.CompanyName = UserLogin.GetUserCompanyNameByUserName(userName, UserStatus.center)
            uinfo.CompanyName = uinfo.RoleName
            '   uinfo.CompanyID = UserLogin.GetUserCompanyNumByCompanyName(userName, UserStatus.center)
            uinfo.CompanyID = comid


            MyFormsPrincipal(Of CCUserInfo).SignIn(userName, uinfo, 120)

            ' Server.Transfer(String.Format("~/main.aspx?RoleName={0}", CUserInfo.RoleName))
            'If uinfo.UserName = "glc" Then
            Response.Cookies.Add(New HttpCookie("RoleName", HttpUtility.UrlEncode(uinfo.RoleName)))
            Response.Cookies.Add(New HttpCookie("User", HttpUtility.UrlEncode(uinfo.UserTrueName)))
            Response.Cookies.Add(New HttpCookie("EngUser", HttpUtility.UrlEncode(uinfo.UserName)))


            '  Response.Redirect(String.Format("~/index1.html?RoleName={0}&User={1}&EngUser={2}", uinfo.RoleName, uinfo.UserTrueName, uinfo.UserName))
            Response.Redirect("~/index1.html")
            'Else
            '    Response.Redirect(String.Format("~/main.aspx?RoleName={0}", uinfo.RoleName))
            'End If

        Else
            Me.FailureText.Text = "用户名或密码不正确，请重试"
            ' Me.ASPxTextBox1.ValidationSettings.ErrorText = "用户名或密码不正确，请重试"

        End If
    End Sub

    Private Sub Login1()
        'Dim userName As String = Me.ASPxTextBox1.Text.Trim
        'Dim password As String = Me.ASPxTextBox2.Text.Trim
        'Dim uid As String = UserLogin.Login(userName, password)
        'If String.IsNullOrEmpty(uid) = False Then
        '    ' CUserInfo.UserName = UserLogin.GetUserTrueNameByUserName(userName)
        '    CUserInfo.UserName = userName
        '    CUserInfo.UserID = uid
        '    'UserLogin.GetUserIDByUserName(userName)

        '    If String.IsNullOrEmpty(Me.ASPxComboBox1.Text) = False Then
        '        CUserInfo.RoleName = Me.ASPxComboBox1.Text
        '    Else
        '        Dim roles As List(Of String) = UserLogin.GetUserRoles(userName)
        '        If roles IsNot Nothing AndAlso roles.Count > 0 Then
        '            CUserInfo.RoleName = roles(0)
        '        Else
        '            Me.FailureText.Text = "没有配置所属公司"
        '            Exit Sub
        '        End If
        '    End If

        '    Server.Transfer(String.Format("~/main.aspx?RoleName={0}", CUserInfo.RoleName))
        'Else
        '    Me.FailureText.Text = "用户名或密码不正确，请重试"
        '    ' Me.ASPxTextBox1.ValidationSettings.ErrorText = "用户名或密码不正确，请重试"

        'End If
    End Sub

    'Protected Sub ASPxCallbackPanel1_Callback(ByVal sender As Object, ByVal e As DevExpress.Web.ASPxClasses.CallbackEventArgsBase) Handles ASPxCallbackPanel1.Callback
    '    Dim userName As String = Me.ASPxTextBox1.Text.Trim
    '    Dim isExisting As Boolean = UserLogin.IsUserExisting(userName)
    '    If isExisting = False Then
    '        Me.FailureText.Text = "用户名不存在"
    '        Exit Sub
    '        ' Me.ASPxLabel1.Visible = True
    '    Else
    '        ' Me.ASPxLabel1.Visible = False
    '        Me.FailureText.Text = ""
    '    End If
    '    Dim roles As List(Of String) = UserLogin.GetUserRoles(userName)
    '    If roles IsNot Nothing AndAlso roles.Count > 0 Then

    '    Else
    '        Me.FailureText.Text = "没有配置所属单位"

    '    End If
    'End Sub

    Protected Sub loginBtn_ServerClick(sender As Object, e As System.EventArgs) Handles loginBtn.ServerClick
        Login2()
    End Sub

    Protected Sub ASPxCallback1_Callback(source As Object, e As DevExpress.Web.ASPxCallback.CallbackEventArgs) Handles ASPxCallback1.Callback
        Dim userName As String = Me.ASPxTextBox1.Text.Trim
        Dim isExisting As Boolean = UserLogin.IsUserExisting(userName)
        If isExisting = False Then
            e.Result = "用户名不存在"
            Return
        Else
            e.Result = ""
        End If
        Dim roles As List(Of String) = UserLogin.GetUserRoles(userName)
        If roles IsNot Nothing AndAlso roles.Count > 0 Then

        Else
            e.Result = "没有配置所属单位"

        End If
    End Sub
End Class
