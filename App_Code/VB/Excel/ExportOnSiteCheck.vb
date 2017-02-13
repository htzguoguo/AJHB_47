Imports Microsoft.VisualBasic
Imports TJX.AJHB.DALC.Web

Public Class ExportOnSiteCheck
    Inherits PublicExportExcelBase


    Private _Item As clsW_A_OnsiteInspection_BasicInfoTab
    Private _Images As clsW_A_CaseAssociateImageTab
    

    Protected ReadOnly Property EnterpriseName() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.EnterpriseName
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property DetectionTime() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.ReportTime.ToString("yyyy年MM月dd日")
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property Inspector() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.Inspector
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property Position() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.Position
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property Problem() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.Problem
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property Recommendation() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.Recommendation
            Else
                Return String.Empty
            End If
        End Get
    End Property
    Protected ReadOnly Property Memo() As String
        Get
            If _Item IsNot Nothing Then
                Return _Item.Memo
            Else
                Return String.Empty
            End If
        End Get
    End Property

    Protected ReadOnly Property Images() As String
        Get
            If _Images IsNot Nothing Then
                Dim str = _Images.SavePath
                If String.IsNullOrEmpty(str) Then
                    Return String.Empty
                Else
                    Return str.Replace("/", "\")
                End If
            Else
                Return String.Empty
            End If
        End Get
    End Property
   
    Protected Overrides Sub ExcelTable1(ByVal para As List(Of String))
        Dim txt As String = para(0)
        _Item = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificEntity("InspectionId", txt)
        If _Item IsNot Nothing Then
            _Images = clsW_A_CaseAssociateImageDALC.GetInstance.GetSpecificEntity("CaseID", _Item.InspectionId)
        End If

    End Sub

    Protected Overrides Property FileName As String
        Get
            Return "安全检查整改通知单.xlsx"
        End Get
        Set(value As String)

        End Set
    End Property

    Protected Overrides ReadOnly Property GetValue(field As String) As String
        Get
            If field.Contains(",") Then
                field = field.Split(",")(0)
            End If
            Select Case field
                Case "EnterpriseName"
                    Return EnterpriseName
                Case "DetectionTime"
                    Return DetectionTime
                Case "Inspector"
                    Return Inspector
                Case "Position"
                    Return Position
                Case "Problem"
                    Return Problem
                Case "Recommendation"
                    Return Recommendation
                Case "Memo"
                    Return Memo
                Case "Images"
                    Return Images
                Case Else
                    Return String.Empty
            End Select
        End Get
    End Property
End Class
