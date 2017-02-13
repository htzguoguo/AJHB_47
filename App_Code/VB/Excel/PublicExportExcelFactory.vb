Imports Microsoft.VisualBasic
Imports System.Diagnostics.Eventing.Reader

Public Class PublicExportExcelFactory

    Public Shared Function GetExcelBuilder(ByVal key As String) As PublicExportExcelBase
        Select Case key
            Case "onsitecheck"
                Return New ExportOnSiteCheck
            Case Else
                Return New PublicExportExcelNull
        End Select
    End Function

End Class
