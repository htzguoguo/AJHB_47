<%@ WebHandler Language="VB" Class="saveImage" %>

Imports System
Imports System.Web
Imports System.IO

Public Class saveImage : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim result As New List(Of String)
        Try
            If context.Request.Form.Count > 0 Then
                Dim len As Integer = context.Request.Form.Count
                For i As Integer = 0 To len - 1
                    Dim myImage As String = context.Request.Form(i)
                    Dim name As String = Guid.NewGuid.ToString
                    Dim filePath As String = HttpContext.Current.Server.MapPath("~/uploadfiles/" + name)
                    If myImage.Length > 0 Then
                        File.WriteAllBytes(filePath + ".jpg", Convert.FromBase64String(myImage))
                        result.Add(name + ".jpg")
                    End If
                Next
            End If
        Catch ex As Exception
          
        End Try
        Dim myString = TTSK.Web.HttpHelper.MyExtension.ToJson(result)
        context.Response.ContentType = "application/json; charset=utf-8"
        context.Response.Write(myString)
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class