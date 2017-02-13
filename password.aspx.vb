Imports Microsoft.VisualBasic
Imports TTSK.Web.AuthorityEntry
Public Class password
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim name As String = CUserInfo.UserName
        If String.IsNullOrEmpty(name) = False Then
            Me.Label1.Text = String.Format("{0} 您好，请输入新的密码：", name)
        Else
            Me.Label1.Text = ""
        End If
    End Sub

    Protected Sub ASPxButton1_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles ASPxButton1.Click
        Dim str As String = Me.ASPxTextBox3.Text.Trim
        Dim name As String = CUserInfo.UserName
        If String.IsNullOrEmpty(name) = False Then
            If UserLogin.UpdateUserPassword(name, str) = True Then
                Response.Write("<script>alert('密码修改完成');history.go(-2);</script>")
            Else

            End If
        End If

    End Sub

    Protected Sub ASPxButton2_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles ASPxButton2.Click
        Response.Write("<script language=javascript>history.go(-2);</script>")
    End Sub

End Class
