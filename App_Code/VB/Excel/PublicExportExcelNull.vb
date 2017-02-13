Imports Microsoft.VisualBasic

Public Class PublicExportExcelNull
    Inherits PublicExportExcelBase



    Protected Overrides Sub ExcelTable1(ByVal para As List(Of String))

    End Sub

    Protected Overrides Property FileName As String
        Get

        End Get
        Set(value As String)

        End Set
    End Property

    Protected Overrides ReadOnly Property GetValue(field As String) As String
        Get

        End Get
    End Property
End Class
