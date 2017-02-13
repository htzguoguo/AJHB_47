Imports Microsoft.VisualBasic
Imports System.ServiceModel.Activation
Imports TTSK.Web.AuthorityEntry
Imports Microsoft.Office.Interop.Word
Imports TJX.AJHB.DALC.Web

<AspNetCompatibilityRequirements(requirementsmode:=AspNetCompatibilityRequirementsMode.Allowed)>
Public Class CurrentSituationService
    Implements ICurrentSituationService

    Public Function GetCurrentSituation(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituation
        Dim dalc As New clsV_A_QiYeXinXiDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    'Public Function GetCurrentSituationCategorySummary(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetCurrentSituationCategorySummary
    '    Dim sql As String = String.Empty
    '    sql = String.Format(" select 企业调查结果, count(id) as c  from dbo.QiyeJibenInfo  group by 企业调查结果 order by 企业调查结果  ")
    '    Dim dt As Data.DataTable = clsV_A_QiYeXinXiDALC.GetInstance.GetSpecificTable3(sql)
    '    Return FMTableManagement.CreateDataContract(Nothing, dt, Nothing)
    'End Function

    Public Function GetCurrentSituationQiYe(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationQiYe
        Dim dalc As New clsQiyeJibenInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationQiYeKD(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationQiYeKD
        Dim dalc As New clsV_A_QiYeJBExtDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationZuLin(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationZuLin
        Dim dalc As New clsZulinInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationBGLY(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationBGLY
        Dim dalc As New clsV_A_QiYeBanGongDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetLouYuSummary(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetLouYuSummary
        Dim dalc As New clsV_A_louyusumDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationLouYu(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationLouYu
        Dim dalc As New clslouyuJibenInfosDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationKongZhi(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationKongZhi
        Dim dalc As New clslouyuKongxianInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationChuZu(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationChuZu
        Dim dalc As New clslouYuChuzuInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationYiShou(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationYiShou
        Dim dalc As New clslouyuYishouInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationZiYong(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationZiYong
        Dim dalc As New clslouyuZiyongInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCurrentSituationChangFan(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements ICurrentSituationService.GetCurrentSituationChangFan
        Dim dalc As New clsChangfangInfoDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function
End Class
