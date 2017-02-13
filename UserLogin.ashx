<%@ WebHandler Language="VB" Class="UserLogin1" %>

Imports System
Imports System.Web
Imports TTSK.Web.AuthorityEntry
Imports System.Collections.Generic
Imports TTSK.Web.HttpHelper

Public Class UserLogin1 : Implements IHttpHandler
    
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim methodname As String = context.Request.QueryString("method")
        Dim user As String = context.Request.QueryString("user")
        Dim pwd As String = context.Request.QueryString("pwd")
        Dim result As New LoginContract
        If String.IsNullOrEmpty(methodname) = False Then
            If methodname = "login" Then
                Dim uid As String = UserLogin.Login(user, pwd)
                If String.IsNullOrEmpty(uid) = False Then
                    Dim uinfo As New CCUserInfo
                    uinfo.UserName = user
                    uinfo.UserID = uid
                    Dim comid As String
                    Dim roles As List(Of String) = UserLogin.GetUserRoles(user)
                    If roles IsNot Nothing AndAlso roles.Count > 0 Then
                        uinfo.RoleName = roles(0)
                        comid = UserLogin.GetCompanyIDByRoleName(uinfo.RoleName)
                        uinfo.UserTrueName = UserLogin.GetUserTrueNameByUserName(user)
                        uinfo.CompanyName = uinfo.RoleName
                        uinfo.CompanyID = comid
                        MyFormsPrincipal(Of CCUserInfo).SignIn(user, uinfo, 0)
                        result.Result = "true"
                        result.ChsFields = uinfo.UserTrueName
                        result.EngFields = user
                    End If
                Else
                    result.Result = "false"
                End If
            ElseIf methodname = "exit" Then
                UserExit(context)
                result.Result = "true"
            End If
        End If
        
        ' context.Response.ContentType = "text/plain"
        Dim myString = TTSK.Web.HttpHelper.MyExtension.ToJson(result)
        context.Response.ContentType = "application/json; charset=utf-8"
        
'        context.Response.AddHeader("Access-Control-Allow-Origin", "*")
'        context.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Range, Content-Disposition, Content-Description")
'        context.Response.AddHeader("Access-Control-Allow-Methods", "DELETE, HEAD, GET, OPTIONS, POST, PUT")
'        context.Response.AddHeader("Access-Control-Max-Age", "1728000")
        
'        
        
        
        context.Response.Write(myString)
'        Dim methodname As String = context.Request.QueryString("method")
'        If String.IsNullOrEmpty(methodname) = False Then
'            If methodname = "exit" Then
'                UserExit(context)
'            End If
'        End If
    End Sub
    
    Private Sub UserExit(ByVal context As HttpContext)
        FormsAuthentication.SignOut()
        context.Response.Redirect("login.aspx")
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class


    