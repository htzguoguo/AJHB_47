<%@ WebHandler Language="VB" Class="ExcelExportHandler" %>

Imports System
Imports System.Web
Imports TTSK.Web.AuthorityEntry

Public Class ExcelExportHandler : Implements IHttpHandler
    
    Public Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim para As String = context.Request.QueryString.Item("para")
        Dim caseid As String = context.Request.QueryString.Item("key")
       
        If String.IsNullOrEmpty(para) = False Then
            Dim cls As PublicExportExcelBase
            Try
                cls = PublicExportExcelFactory.GetExcelBuilder(para)
                Dim p As New List(Of String)
                p.Add(caseid)
                cls.BuildExcel(p)

            Catch ex As Exception
                Dim mm As String = ex.Message
               
            End Try
        End If
           
    End Sub
 
    Public ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class