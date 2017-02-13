<%@ Application Language="VB" %>
<%@ Import Namespace="System.ServiceModel.Activation" %>
<%@ Import Namespace="TTSK.Web.HttpHelper" %>
<%@ Import Namespace="TTSK.Web.AuthorityEntry" %>

<script runat="server">

    Sub Application_Start(ByVal sender As Object, ByVal e As EventArgs)
        '在应用程序启动时运行的代码
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("FMService", New WebServiceHostFactory(), GetType(FMService)))
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("LoginService", New WebServiceHostFactory(), GetType(RestLoginService)))
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("SecurityInfoService", New WebServiceHostFactory(), GetType(VB.Rest.SecurityInfoService.RestSecurityInfoService)))
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("FileService", New WebServiceHostFactory(), GetType(RestFileService)))
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("EnvironmentalService", New WebServiceHostFactory(), GetType(VB.Rest.EnvironmentalInfoService.EnvironmentalInfoService)))
        System.Web.Routing.RouteTable.Routes.Add(New ServiceRoute("CurrentSituationService", New WebServiceHostFactory(), GetType(CurrentSituationService)))
        
        UserLogin.InitiateCache()
        AssertCatalogManagement.GetWholeTable()
        FMFunctionManagement.GetWholeTable()
    End Sub
    
  
    
    Sub Application_End(ByVal sender As Object, ByVal e As EventArgs)
        '在应用程序关闭时运行的代码
    End Sub
        
    Sub Application_Error(ByVal sender As Object, ByVal e As EventArgs)
             
        Dim exc As Exception = Server.GetLastError
        '  If (exc.GetType Is GetType(HttpException)) Then
        Try
    
            Dim LogFilePath As String = Server.MapPath("ErrorLog.txt")
       
            Dim sw As System.IO.StreamWriter = _
              New System.IO.StreamWriter(LogFilePath)
            ' Write error to text file
            sw.WriteLine("<-----" + exc.ToString() + "----->")
            sw.Close()
        Catch ex As Exception
            ' There could be a problem when writing to text file
        End Try
            
            
        HttpContext.Current.Server.ClearError()
        ' HttpContext.Current.Server.Transfer("~/login.aspx ")
        ' HttpContext.Current.Server.Transfer("login.aspx ")
        '  End If
        Response.Write("login.aspx")
        
     
        
        '  HttpContext.Current.Server.Transfer("~/login.aspx target=_top")
     
        ' Response.Write("<script>top.window.location.href = " + "'" + "~/login.aspx" + "'" + "<" + "/" + "script>")

        '在出现未处理的错误时运行的代码
    End Sub
    
    
    
    Sub EnableCrossDmainAjaxCall()
        HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*")
        HttpContext.Current.Response.AddHeader("Access-Control-Allow-Credentials", "true")
        If HttpContext.Current.Request.HttpMethod = "OPTIONS" Then
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "DELETE, HEAD, GET, OPTIONS, POST, PUT")
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Range, Content-Disposition, Content-Description")
            HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000")
            HttpContext.Current.Response.End()
        End If
    End Sub

    Sub Session_Start(ByVal sender As Object, ByVal e As EventArgs)
        '在新会话启动时运行的代码
        Session.Timeout = 600
    End Sub

    Sub Session_End(ByVal sender As Object, ByVal e As EventArgs)
        '在会话结束时运行的代码。 
        ' 注意: 只有在 Web.config 文件中的 sessionstate 模式设置为
        '设置为 InProc 时，才会引发 Session_End 事件。如果会话模式 
        '设置为 StateServer 或 SQLServer，则不会引发该事件。
    End Sub

    Public Overrides Function GetVaryByCustomString(ByVal context As HttpContext, ByVal arg As String) As String
        If arg = "RoleID" Then
                  
            Return context.Request.QueryString("RoleName")
        Else
            Return MyBase.GetVaryByCustomString(context, arg)
        End If
    End Function
    
    Protected Sub Application_AuthenticateRequest(ByVal sender As Object, ByVal e As EventArgs)
        Dim app As HttpApplication = sender
        MyFormsPrincipal(Of CCUserInfo).TrySetUserInfo(app.Context)
    End Sub
       
    Protected Sub Application_BeginRequest(sender As Object, e As System.EventArgs)
        EnableCrossDmainAjaxCall()
    End Sub
    
</script>