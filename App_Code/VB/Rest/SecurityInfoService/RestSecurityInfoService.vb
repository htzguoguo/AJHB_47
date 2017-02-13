Imports System.ServiceModel.Activation
Imports Microsoft.VisualBasic
Imports TJX.AJHB.AppData.Contracts
Imports TJX.AJHB.MDA.Service
Imports System.ServiceModel
Imports TTSK.Web.AuthorityEntry
Imports TJX.AJHB.AppData.Contracts.SecurityInfo
Imports TJX.AJHB.AppData.Contracts.Inspection

Namespace VB.Rest.SecurityInfoService


    <AspNetCompatibilityRequirements(requirementsmode:=Activation.AspNetCompatibilityRequirementsMode.Allowed)>
    Public Class RestSecurityInfoService
        Implements IRestSecurityInfoService

        Public Function AddSecurityInfo(pf As TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoContract, ByVal user As String) As ResponseContract Implements IRestSecurityInfoService.AddSecurityInfo
            Dim data = pf
            Dim result As New ResponseContract
            If Not EnterpriseInfo.EnterpriseService.IsExistingEnterprise(data.CreateEnterprise) Then

                Dim file As New FileService.UploadFile(data.FileName)
                file.SaveFiles()

                result.IsSuccess = EnterpriseInfo.EnterpriseService.AddSecurityInfo(data.CreateEnterprise, data.CreateSecurity, file.CreateAttachFiles(data.SaveName, file.FileNames))
                If result.IsSuccess Then
                    result.Desc = "安全生产概况填报完成。"
                Else
                    result.Desc = "安全生产概况填报不成功，请重试。"
                End If
            Else
                result.IsSuccess = False
                result.Desc = "您的企业基本信息已经存在，请勿重复提交。"
            End If
            Return (result)
        End Function

        Public Function UpdateSecurityInfo(pf As TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoEditUIContract, name As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.UpdateSecurityInfo
            Dim data = pf
            Dim result As New ResponseContract

            Dim fun = EnterpriseInfo.EnterpriseService.GetEnterpriseInformationByName(name)
            Dim seu = EnterpriseInfo.EnterpriseService.GetSecurityInfoByName(name)
            Dim file As New FileService.UploadFile(data.FileName)
            file.SaveFiles()
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateSecurityInfo(data.CreateEnterprise(fun.Key), data.CreateSecurity(seu.Key), file.CreateAttachFiles(data.SaveName, file.FileNames))
            Return result
        End Function

        Public Function GetSecurityInfo(name As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract Implements IRestSecurityInfoService.GetSecurityInfo
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract
            If Not String.IsNullOrEmpty(name) Then

                Dim enterprise = EnterpriseInfo.EnterpriseService.GetEnterprisenByName(name)

                Dim security = EnterpriseInfo.EnterpriseService.GetSecurityInfoByName(name)

                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract(enterprise, security)
            End If
            Return result
        End Function

        Public Function GetSecurityEditInfoByName(name As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoEditUIContract Implements IRestSecurityInfoService.GetSecurityEditInfoByName
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoEditUIContract
            If Not String.IsNullOrEmpty(name) Then
                Dim enterprise = EnterpriseInfo.EnterpriseService.GetEnterprisenByName(name)
                Dim security = EnterpriseInfo.EnterpriseService.GetSecurityInfoByName(enterprise.EnterpriseName)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoEditUIContract(enterprise, security)
            End If
            Return result
        End Function

        Public Function GetSecurityInfoByNum(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract Implements IRestSecurityInfoService.GetSecurityInfoByNum
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract
            If Not String.IsNullOrEmpty(key) Then

                Dim enterprise = EnterpriseInfo.EnterpriseService.GetEnterprisenByName(key)

                Dim security = EnterpriseInfo.EnterpriseService.GetSecurityInfoByName(enterprise.EnterpriseName)

                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SecurityInfoUIContract(enterprise, security)
            End If
            Return result
        End Function

        Public Function AddChemical(item As TJX.AJHB.AppData.Contracts.SecurityInfo.DangerousChemicals, user As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddChemical
            Dim data = item
            Dim result As New ResponseContract
            Dim c = item.CreateChemical
            If c IsNot Nothing Then
                Dim res As Boolean = EnterpriseInfo.EnterpriseService.AddChemicalInfo(c)
                result.IsSuccess = res
                If res Then
                    result.Desc = "危险化学品登记完成。"
                Else
                    result.Desc = "危险化学品登记不成功，请重试。"
                End If
            Else
                result.IsSuccess = False
                result.Desc = "提交的内容为空，请重试。"
            End If

            Return result
        End Function

        Public Function AddEquipment(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyEquipmentContract, user As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddEquipment
            Dim data = item
            Dim result As New ResponseContract
            Dim c = item.CreateSafetyEquipment
            If c IsNot Nothing Then
                Dim res As Boolean = EnterpriseInfo.EnterpriseService.AddSafetyEquipmentInfo(c)
                result.IsSuccess = res
            Else
                result.IsSuccess = False
            End If
            Return result
        End Function

        Public Function AddSpecialEquipment(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SpecialEquipmentContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddSpecialEquipment
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddSpecialEquipmentInfo(data.CreateSpecialEquipment)
            Return result
        End Function

        Public Function AddHazardIdentification(item As TJX.AJHB.AppData.Contracts.SecurityInfo.HazardIdentificationContract, user As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddHazardIdentification
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddHazardIdentificationInfo(data.CreateHazardIdentification)
            Return result
        End Function

        Public Function AddSafetyInspection(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyInspectionContract, user As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddSafetyInspection
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = True
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddSafetyInspectionInfo(data.CreateSafetyInspection)
            Return result
        End Function

        Public Function FindDeviceNameByEnterpriseName(name As String) As System.Collections.Generic.IList(Of String) Implements IRestSecurityInfoService.FindDeviceNameByEnterpriseName
            Dim c As String = CUserInfo.UserTrueName
            Return EnterpriseInfo.EnterpriseService.FindDeviceNameByEnterpriseName(c)
        End Function

        Public Function AddCertification(item As TJX.AJHB.AppData.Contracts.SecurityInfo.CertificationContract, user As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddCertification
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = True

            Dim file As New FileService.UploadFile(data.FileName)
            file.SaveFiles()
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddPractitionerCertification(data.CreatePractitionerCertification, file.CreateAttachFiles(Inspection.OnSiteInspectionContract.FileCategory.report))
            Return result
        End Function

        Public Function AddOnsiteInspection(item As TJX.AJHB.AppData.Contracts.Inspection.OnSiteInspectionContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddOnsiteInspection
            Dim data = item
            Dim result As New ResponseContract
            Dim userid As String = UserLogin.GetUserIDByUserTrueName(item.EnterpriseName)
            If String.IsNullOrEmpty(userid) Then
                result.IsSuccess = False
                result.Desc = "检查企业名称不规范,请重新填写。"
            Else
                result.IsSuccess = True
                result.Desc = "安全检查登记完成。"
                Dim file As New FileService.UploadFile(data.FileName)
                data.FileNames = file.SaveFiles
                result.IsSuccess = EnterpriseInfo.EnterpriseService.AddOnsiteInspection(data.CreateOnsiteInspection, data.CreateAttachFiles(Inspection.OnSiteInspectionContract.FileCategory.report))
            End If

            Return result
        End Function

        Public Function DeleteCertification(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteCertification
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.PractitionerCertification(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeletePractitionerCertification(c)
            If result.IsSuccess Then
                result.Desc = "业人员持证删除成功。"
            Else
                result.Desc = "业人员持证删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteChemical(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteChemical
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.DangerousChemicals(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteChemicalInfo(c)
            If result.IsSuccess Then
                result.Desc = "危险化学品删除成功。"
            Else
                result.Desc = "危险化学品删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteEquipment(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteEquipment
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.SafetyEquipment(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteSafetyEquipmentInfo(c)
            If result.IsSuccess Then
                result.Desc = "安全设施删除成功。"
            Else
                result.Desc = "安全设施删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteHazardIdentification(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteHazardIdentification
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.HazardIdentification(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteHazardIdentificationInfo(c)
            If result.IsSuccess Then
                result.Desc = "危险辨识删除成功。"
            Else
                result.Desc = "危险辨识删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteSafetyInspection(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteSafetyInspection
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.SafetyInspectionRecords(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteSafetyInspectionInfo(c)
            If result.IsSuccess Then
                result.Desc = "安全设施检测删除成功。"
            Else
                result.Desc = "安全设施检测删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteSecurityInfo(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteSecurityInfo
            Dim data = key
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteSecurityInfo(key)
            If result.IsSuccess Then
                result.Desc = "企业基本信息删除成功。"
            Else
                result.Desc = "企业基本信息删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteSpecialEquipment(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteSpecialEquipment
            Dim data = key
            Dim result As New ResponseContract
            Dim c As New TJX.AJHB.MDA.Model.SecurityInfo.SpecialEquipment(key)
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteSpecialEquipmentInfo(c)
            If result.IsSuccess Then
                result.Desc = "特种设备删除成功。"
            Else
                result.Desc = "特种设备删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function DeleteOnsiteInspection(key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.DeleteOnsiteInspection
            Dim data = key
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.DeleteOnsiteInspection(key)
            If result.IsSuccess Then
                result.Desc = "安全检查记录删除成功。"
            Else
                result.Desc = "安全检查记录删除不成功，请重试。"
            End If
            Return result
        End Function

        Public Function AddChemicalDailyReport(ByVal item As SecurityInfo.ChemicalContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddChemicalDailyReport
            Dim data = item

            Dim result As New ResponseContract
            result.IsSuccess = True
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddChemicalDailyReportInfo(data.CreateChemicalDailyReport)

            Return result
        End Function

        Public Function AddOnsiteReply(ByVal key As String, ByVal item As Inspection.OnSiteInspectionContract) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddOnsiteReply
            Dim c = New TJX.AJHB.DALC.Web.clsW_A_OnsiteInspection_BasicInfoTab
            Dim data = item
            Dim result As New ResponseContract
            Dim md = EnterpriseInfo.EnterpriseService.GetOnSiteInspection(key)
            If md IsNot Nothing Then
                If data.Qualified.Never Then
                    md.HandlingCaseFinished(data.Inspector, data.DetectionTime, data.Recommendation, data.Memo)
                ElseIf data.Qualified.Occasionally Then
                    md.HandlingCaseUnfinished(data.Inspector, data.DetectionTime, data.Recommendation, data.Memo)
                End If

                Dim file As New FileService.UploadFile(data.FileName)
                data.FileNames = file.SaveFiles
                result.IsSuccess = EnterpriseInfo.EnterpriseService.AddOnsiteReply(md, data.CreateAttachFiles(Inspection.OnSiteInspectionContract.FileCategory.reply))
            End If
            Return result
        End Function

        Public Function AddChemicalDailyBatchReport(item As System.Collections.Generic.List(Of TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract)) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.AddChemicalDailyBatchReport
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = True
            result.IsSuccess = EnterpriseInfo.EnterpriseService.AddChemicalDailyReportInfo(TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract.CreateChemicalDailyReport(data))
            Return result
        End Function

        Public Function GetEquipment(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyEquipmentContract Implements IRestSecurityInfoService.GetEquipment
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyEquipmentContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetSafetyEquipmentInfo(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyEquipmentContract(equipment)
            End If
            Return result
        End Function

        Public Function GetChemical(key As String) As ChemicalContract Implements IRestSecurityInfoService.GetChemical
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetChemicalInfo(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract(equipment)
            End If
            Return result
        End Function

        Public Function GetSpecialEquipment(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SpecialEquipmentContract Implements IRestSecurityInfoService.GetSpecialEquipment
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SpecialEquipmentContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetSpecialEquipmentInfo(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SpecialEquipmentContract(equipment)
            End If
            Return result
        End Function

        Public Function GetHazardIdentification(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.HazardIdentificationContract Implements IRestSecurityInfoService.GetHazardIdentification
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.HazardIdentificationContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetHazardIdentificationInfo(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.HazardIdentificationContract(equipment)
            End If
            Return result
        End Function

        Public Function GetSafetyInspection(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyInspectionContract Implements IRestSecurityInfoService.GetSafetyInspection
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyInspectionContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetSafetyInspectionInfo(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyInspectionContract(equipment)
            End If
            Return result
        End Function

        Public Function GetCertification(key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.CertificationContract Implements IRestSecurityInfoService.GetCertification
            Dim result As New TJX.AJHB.AppData.Contracts.SecurityInfo.CertificationContract
            If Not String.IsNullOrEmpty(key) Then
                Dim equipment = EnterpriseInfo.EnterpriseService.GetPractitionerCertification(key)
                Return New TJX.AJHB.AppData.Contracts.SecurityInfo.CertificationContract(equipment)
            End If
            Return result
        End Function

        Public Function EditSpecialEquipment(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SpecialEquipmentContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.EditSpecialEquipment
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateSpecialEquipmentInfo(data.CreateSpecialEquipment(key))
            Return result
        End Function

        Public Function EditEquipment(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyEquipmentContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.EditEquipment
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateSafetyEquipmentInfo(data.CreateSafetyEquipment(key))
            Return result
        End Function

        Public Function UpdateChemical(item As TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.UpdateChemical
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateChemicalInfo(data.CreateChemical(key))
            Return result
        End Function

        Public Function UpdateCertification(item As TJX.AJHB.AppData.Contracts.SecurityInfo.CertificationContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.UpdateCertification
            Dim data = item
            Dim result As New ResponseContract

            Dim file As New FileService.UploadFile(data.FileName)
            file.SaveFiles()
            ' result.IsSuccess = EnterpriseInfo.EnterpriseService.AddPractitionerCertification(data.CreatePractitionerCertification, file.CreateAttachFiles(Inspection.OnSiteInspectionContract.FileCategory.report))

            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdatePractitionerCertification(data.CreatePractitionerCertification(key), file.CreateAttachFiles(Inspection.OnSiteInspectionContract.FileCategory.report))
            Return result
        End Function

        Public Function UpdateHazardIdentification(item As TJX.AJHB.AppData.Contracts.SecurityInfo.HazardIdentificationContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.UpdateHazardIdentification
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateHazardIdentificationInfo(data.CreateHazardIdentification(key))
            Return result
        End Function

        Public Function UpdateSafetyInspection(item As TJX.AJHB.AppData.Contracts.SecurityInfo.SafetyInspectionContract, key As String) As TJX.AJHB.AppData.Contracts.ResponseContract Implements IRestSecurityInfoService.UpdateSafetyInspection
            Dim data = item
            Dim result As New ResponseContract
            result.IsSuccess = EnterpriseInfo.EnterpriseService.UpdateSafetyInspectionInfo(data.CreateSafetyInspection(key))
            Return result
        End Function
      
    End Class

End Namespace