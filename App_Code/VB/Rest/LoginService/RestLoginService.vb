Imports Microsoft.VisualBasic

Imports System.ServiceModel.Activation
Imports System.ServiceModel
Imports TTSK.Web.AuthorityEntry
Imports TTSK.Web.HttpHelper

<AspNetCompatibilityRequirements(requirementsmode:=Activation.AspNetCompatibilityRequirementsMode.Allowed)>
Public Class RestLoginService
    Implements IRestLoginService

    Public Function GetMenu() As String Implements IRestLoginService.GetMenu
        AssertCatalogManagement.XMLType = XMLType.FullMode
        Dim id As String = UserLogin.GetCurrentRoleID
        Dim xml As String = AssertCatalogManagement.BuildAuthorityXML(id)
        Return xml
    End Function

    Public Function Login(ByVal token As LogTokenContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestLoginService.Login
        Dim user As String = token.UserName
        Dim password As String = token.Password
        Dim result As New TJX.AJHB.AppData.Contracts.ResponseContract
        Dim uid As String = UserLogin.Login(user, password)
        If String.IsNullOrEmpty(uid) = False Then
            Dim uinfo As New CCUserInfo
            uinfo.UserName = user
            uinfo.UserID = uid
            Dim comid As String
            Dim roles As List(Of String) = UserLogin.GetUserRoles(user)
            If roles IsNot Nothing AndAlso roles.Count > 0 Then
                uinfo.RoleName = roles(0)
                result.IsSuccess = True
                result.Desc = "登录成功"
                comid = UserLogin.GetCompanyIDByRoleName(uinfo.RoleName)
                uinfo.UserTrueName = UserLogin.GetUserTrueNameByUserName(user)
                uinfo.CompanyName = uinfo.RoleName
                uinfo.CompanyID = comid
                MyFormsPrincipal(Of CCUserInfo).SignIn(user, uinfo, 0)
            Else
                result.IsSuccess = False
                result.Desc = "用户没有权限登录系统"
            End If
        Else
            result.IsSuccess = False
            result.Desc = "用户名或密码不正确，请重试"
        End If
        Return result
    End Function

    Public Function Logout() As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestLoginService.Logout
        FormsAuthentication.SignOut()
        Dim result As New TJX.AJHB.AppData.Contracts.ResponseContract
        result.IsSuccess = True
        result.Desc = "用户退出成功"
        Return result
    End Function

    Public Function Test() As String Implements IRestLoginService.Test
        Return String.Format("The Current time is {0}", Now.ToString)
    End Function

End Class

