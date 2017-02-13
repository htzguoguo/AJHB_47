Imports System.ServiceModel.Activation
Imports Microsoft.VisualBasic
Imports TJX.AJHB.AppData.Contracts
Imports TJX.AJHB.MDA.Service
Imports System.ServiceModel
Imports TTSK.Web.AuthorityEntry
Imports TJX.AJHB.DALC.Web

Namespace VB.Rest.EnvironmentalInfoService

    <AspNetCompatibilityRequirements(requirementsmode:=Activation.AspNetCompatibilityRequirementsMode.Allowed)>
     Public Class EnvironmentalInfoService
        Implements IEnvironmentalInfoService
        
        Public Function GetEnvironmentalInfo(name As String) As TJX.AJHB.AppData.Contracts.Environmental.EnvironmentalContract Implements IEnvironmentalInfoService.GetEnvironmentalInfo
            Dim result As New TJX.AJHB.AppData.Contracts.Environmental.EnvironmentalContract
            If Not String.IsNullOrEmpty(name) Then
                Dim enterprise = EnterpriseInfo.EnterpriseService.GetEnvironmentalByName(name)
                Return New TJX.AJHB.AppData.Contracts.Environmental.EnvironmentalContract(enterprise)
            End If
            Return result
        End Function

        Public Function AddLims(item As TJX.AJHB.AppData.Contracts.Environmental.EmissionMonitoringContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IEnvironmentalInfoService.AddLims
            Dim data = item
            Dim result As New ResponseContract
            Try
                Dim tab As New clsW_A_Environmental_EmissionMonitoringTab
                tab.Name = item.Name
                tab.EnterpriseName = item.EnterpriseName
                tab.EnterpriseNum = item.EnterpriseNum
                tab.Type = item.Type
                tab.Amount = item.Amount
                tab.Unit = item.Unit
                tab.Memo = item.Memo
                tab.ReportTime = item.ReportTime
                result.IsSuccess = clsW_A_Environmental_EmissionMonitoringDALC.GetInstance.CreateUserEntity(tab)
            Catch ex As Exception
                result.IsSuccess = False
                result.Desc = ex.Message
            End Try
            Return result
        End Function

    End Class

End Namespace