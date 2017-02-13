Imports Microsoft.VisualBasic
Imports System.ServiceModel.Activation
Imports TTSK.Web.AuthorityEntry
Imports Microsoft.Office.Interop.Word
Imports TJX.AJHB.DALC.Web

<AspNetCompatibilityRequirements(requirementsmode:=AspNetCompatibilityRequirementsMode.Allowed)>
Public Class FMService
    Implements IFMService
    
    Public Function GetFilter(guid As String) As System.Collections.Generic.List(Of TTSK.Web.AuthorityEntry.clsFMFilterTab) Implements IFMService.GetFilter
        Dim tab As clsFMCatalogTab = AssertCatalogManagement.GetFM(guid)
        If tab IsNot Nothing Then
            Dim result As List(Of clsFMFilterTab) = FMFilterManagement.GetFMFilters(tab.ID, CUserInfo.UserID)
            Return result
        End If
        Return Nothing
    End Function

    Public Function GetTable(ByVal guid As String) As TableContract Implements IFMService.GetTable
        Dim tab As clsFMCatalogTab = AssertCatalogManagement.GetFM(guid)
        If tab IsNot Nothing Then
            Return FMTableManagement.GetFMTableContent(tab, String.Empty)
        End If
        Return Nothing
    End Function

    Public Function GetSummary(guid As String, filter As String) As System.Collections.Generic.List(Of String) Implements IFMService.GetSummary
        Dim tab As clsFMCatalogTab = AssertCatalogManagement.GetFM(guid)
        If tab IsNot Nothing Then
            Return FMTableManagement.GetSummaryContent(tab, filter)
        End If
        Return Nothing
    End Function

    Public Function Getchemical(ByVal item As TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.Getchemical
        Dim dalc As New clsW_A_DangerousChemicalsDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetSafetyEquipment(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetSafetyEquipment
        Dim dalc As New clsW_A_SafetyEquipmentDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetSpecialEquipment(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetSpecialEquipment
        Dim dalc As New clsV_A_Warning_SpecialEquipmentDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetHazardIdentification(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetHazardIdentification
        Dim dalc As New clsW_A_HazardIdentificationDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetSafetyInspection(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetSafetyInspection
        Dim dalc As New clsV_A_Warning_InspectionRecordDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetCertification(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetCertification
        Dim dalc As New clsV_A_Warning_CertificationDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetEnvironmentalProduct(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetEnvironmentalProduct
        Dim dalc As New clsW_H_企业产品关联表DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetExhaustPollutant(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetExhaustPollutant
        Dim dalc As New clsW_H_废气污染物关联表DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetExhaustPort(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetExhaustPort
        Dim dalc As New clsW_H_废气排放口DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetNoise(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetNoise
        Dim dalc As New clsW_H_边界噪声DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetProductionPlantPollutants(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetProductionPlantPollutants
        Dim dalc As New clsW_H_生产装置关联表DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetProductionUnit(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetProductionUnit
        Dim dalc As New clsW_H_生产装置DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetSolidWaste(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetSolidWaste
        Dim dalc As New clsW_H_固体废物DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetWasteSite(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetWasteSite
        Dim dalc As New clsW_H_污染治理设施DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetWastewaterDischarge(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetWastewaterDischarge
        Dim dalc As New clsW_H_废水排放口DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetWastewaterPollutant(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetWastewaterPollutant
        Dim dalc As New clsW_H_废水污染物关联表DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetEnterpriseRating(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetEnterpriseRating
        Dim dalc As New clsW_S_EnterpriseRatingDALC
        Dim count As Integer = 0
        If Integer.TryParse(item.TopCount, count) AndAlso count > 0 Then
            Return FMTableManagement.GetTableContent(dalc, item, count)
        Else
            Return FMTableManagement.GetTableContent(dalc, item)
        End If
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetEnterpriseNames(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetEnterpriseNames
        Dim dalc As New clsUserEntityDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetOnSiteCheck(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetOnSiteCheck
        Dim dalc As New clsV_A_OnsiteInspection_FilesDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetOnSiteWarning(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetOnSiteWarning
        Dim dalc As New clsV_A_Warning_OnSiteCheckDALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetOnSiteCheck1(item As TTSK.Web.AuthorityEntry.TableFilterContract, datetype As String) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetOnSiteCheck1
        Dim dalc As New clsV_A_OnsiteInspection_BasicDALC
        HandleDateType(item, datetype)
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Private Sub HandleDateType(item As TTSK.Web.AuthorityEntry.TableFilterContract, datetype As String, Optional fieldName As String = "ReportTime")
        Dim cur As DateTime = Now
        Dim st As DateTime
        Dim ed As DateTime
        Dim index As Integer = item.Values.Count
        If datetype = "d" Then
            st = New DateTime(cur.Year, cur.Month, cur.Day, 0, 0, 0)
            ed = New DateTime(cur.Year, cur.Month, cur.Day, 23, 59, 59)
        ElseIf datetype = "w" Then
            Dim startWeek As DateTime = cur.AddDays(1 - Convert.ToInt32(cur.DayOfWeek.ToString("d")))
            Dim endWeek As DateTime = startWeek.AddDays(6)
            st = New DateTime(startWeek.Year, startWeek.Month, startWeek.Day, 0, 0, 0)
            ed = New DateTime(endWeek.Year, endWeek.Month, endWeek.Day, 23, 59, 59)
        ElseIf datetype = "m" Then
            Dim startMonth As DateTime = cur.AddDays(1 - cur.Day)
            Dim endMonth As DateTime = startMonth.AddMonths(1).AddDays(-1)
            st = New DateTime(startMonth.Year, startMonth.Month, startMonth.Day, 0, 0, 0)
            ed = New DateTime(endMonth.Year, endMonth.Month, endMonth.Day, 23, 59, 59)
        Else
            Return
        End If
        item.Search += String.Format(" and {2} >= {{{0}}} and {2} <= {{{1}}}", index, index + 1, fieldName)
        item.Values.Add(st)
        item.Values.Add(ed)
    End Sub

    Public Function GetOnSiteStatByYear() As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly Implements IFMService.GetOnSiteStatByYear
        Dim result As New TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly
        InitStatYear(result)
        Dim sqltime As String = GetDateSql()
        QueryReportData(result, sqltime)
        QueryExpireData(result, sqltime)
        QueryDueData(result, sqltime)
        Return result
    End Function

    Private Sub QueryReportData(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("select convert(varchar(7),ReportTime,120) as Date,count(ID) as count, Status from dbo.W_A_OnsiteInspection_BasicInfo where {0} group by convert(varchar(7),ReportTime,120), Status", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String
        Dim c As Integer
        Dim status As String
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = dr.Item(0)
                c = dr.Item(1)
                status = dr.Item(2)
                index = CInt(dt.Split("-")(1))
                If status = "未处理" Then
                    contract.Report.Item(index - 1) = c
                ElseIf status = "已处理" Then
                    contract.Reply.Item(index - 1) = c
                End If
            Next
        End If
    End Sub

    Private Sub QueryExpireData(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("select convert(varchar(7),ReportTime,120) as Date,count(ID) as count from dbo.W_A_OnsiteInspection_BasicInfo where Deadline < getdate() and  {0} group by convert(varchar(7),ReportTime,120)", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String
        Dim c As Integer
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = dr.Item(0)
                c = dr.Item(1)
                index = CInt(dt.Split("-")(1))
                contract.Expire.Item(index - 1) = c
            Next
        End If
    End Sub

    Private Sub QueryDueData(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("select convert(varchar(7),ReportTime,120) as Date,count(ID) as count from dbo.W_A_OnsiteInspection_BasicInfo where convert(varchar(10),Deadline,120) <= convert(varchar(10),DateAdd(day, 5, getdate()),120) and Deadline > getdate() and  {0} group by convert(varchar(7),ReportTime,120)", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String
        Dim c As Integer
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = dr.Item(0)
                c = dr.Item(1)
                index = CInt(dt.Split("-")(1))
                contract.Due.Item(index - 1) = c
            Next
        End If
    End Sub

    Private Function GetDateSql() As String
        Dim cur As DateTime = Now
        Dim st As DateTime = New DateTime(cur.Year, 1, 1, 0, 0, 0)
        Dim ed As DateTime = New DateTime(cur.Year, 12, DateTime.DaysInMonth(cur.Year, 12), 23, 59, 59)
        Dim sqltime As String = String.Format("  ReportTime >= '{0}' and ReportTime <= '{1}' ", st, ed)
        Return sqltime
    End Function

    Private Sub InitStatYear(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly)
        Dim report As New List(Of Integer)
        Dim reply As New List(Of Integer)
        Dim due As New List(Of Integer)
        Dim expire As New List(Of Integer)
        For i As Integer = 0 To 11
            report.Add(0)
            reply.Add(0)
            due.Add(0)
            expire.Add(0)
        Next
        contract.Report = report
        contract.Reply = reply
        contract.Due = due
        contract.Expire = expire
    End Sub

    Public Function GetOnSiteStatByMonth(month As String) As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly Implements IFMService.GetOnSiteStatByMonth
        Dim result As New TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly
        InitStatMonth(result, month)
        Dim sqltime As String = GetDateSqlByMonth(month)
        QueryReportDataByMonth(result, sqltime)
        QueryExpireDataByMonth(result, sqltime)
        QueryDueDataByMonth(result, sqltime)
        Return result
    End Function

    Private Sub QueryDueDataByMonth(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("SELECT EndDate = Dateadd(week, Datediff(week, 0, T.ReportTime), 0), NumOfTasks = COUNT(T.ID) FROM dbo.W_A_OnsiteInspection_BasicInfo T where convert(varchar(10),Deadline,120) <= convert(varchar(10),DateAdd(day, 5, getdate()),120) and Deadline > getdate() and  {0}  GROUP BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0) ORDER BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0) DESC", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String
        Dim c As Integer
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = String.Format("{0}-{1}-{2}", dr.Item(0).year, dr.Item(0).month, dr.Item(0).day)
                c = dr.Item(1)
                index = _weekOfMonth.IndexOf(dt)
                contract.Due.Item(index) = c
            Next
        End If
    End Sub

    Private Sub QueryExpireDataByMonth(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("SELECT EndDate = Dateadd(week, Datediff(week, 0, T.ReportTime), 0), NumOfTasks = COUNT(T.ID) FROM dbo.W_A_OnsiteInspection_BasicInfo T where Deadline < getdate() and  {0}  GROUP BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0) ORDER BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0) DESC", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String
        Dim c As Integer
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = String.Format("{0}-{1}-{2}", dr.Item(0).year, dr.Item(0).month, dr.Item(0).day)
                c = dr.Item(1)
                index = _weekOfMonth.IndexOf(dt)
                contract.Expire.Item(index) = c
            Next
        End If
    End Sub

    Private Sub QueryReportDataByMonth(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal datesql As String)
        Dim sql As String = String.Format("SELECT EndDate = Dateadd(week, Datediff(week, 0, T.ReportTime), 0), NumOfTasks = COUNT(T.ID),Status FROM dbo.W_A_OnsiteInspection_BasicInfo T where {0}  GROUP BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0), Status ORDER BY Dateadd(week, Datediff(week, 0, T.ReportTime), 0) DESC", datesql)
        Dim tab As Data.DataTable = clsW_A_OnsiteInspection_BasicInfoDALC.GetInstance.GetSpecificTable3(sql)
        Dim dt As String

        Dim c As Integer
        Dim status As String
        Dim index As Integer
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            For Each dr As Data.DataRow In tab.Rows
                dt = String.Format("{0}-{1}-{2}", dr.Item(0).year, dr.Item(0).month, dr.Item(0).day)
                c = dr.Item(1)
                status = dr.Item(2)
                index = _weekOfMonth.IndexOf(dt)
                If status = "未处理" Then
                    contract.Report.Item(index) = c
                ElseIf status = "已处理" Then
                    contract.Reply.Item(index) = c
                End If
            Next
        End If
    End Sub

    Private _weekOfMonth As List(Of String)

    Private Function GetDateSqlByMonth(ByVal m As Integer) As String
        Dim cur As DateTime = Now
        Dim st As DateTime = New DateTime(cur.Year, m, 1, 0, 0, 0)
        Dim ed As DateTime = New DateTime(cur.Year, m, DateTime.DaysInMonth(cur.Year, m), 23, 59, 59)
        Dim sqltime As String = String.Format("  ReportTime >= '{0}' and ReportTime <= '{1}' ", st, ed)
        Return sqltime
    End Function

    Private Sub InitStatMonth(ByVal contract As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly, ByVal m As Integer)
        Dim report As New List(Of Integer)
        Dim reply As New List(Of Integer)
        Dim due As New List(Of Integer)
        Dim expire As New List(Of Integer)

        _weekOfMonth = New List(Of String)

        Dim cur As DateTime = New DateTime(Now.Year, m, 1)
        Dim w As Integer = cur.DayOfWeek
        Dim first As DateTime = cur.AddDays(1 - w)
        _weekOfMonth.Add(first.ToString("yyyy-M-d"))
        Dim nxt As DateTime = first.AddDays(7)
        Do While nxt.Month = cur.Month
            _weekOfMonth.Add(nxt.ToString("yyyy-M-d"))
            nxt = nxt.AddDays(7)
        Loop

        Dim lng As Integer = _weekOfMonth.Count
        For i As Integer = 0 To lng - 1
            report.Add(0)
            reply.Add(0)
            due.Add(0)
            expire.Add(0)
        Next
        contract.Report = report
        contract.Reply = reply
        contract.Due = due
        contract.Expire = expire
    End Sub

    Public Function GetChemicalReport(item As TTSK.Web.AuthorityEntry.TableFilterContract, datetype As String, ByVal grouptype As String) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetChemicalReport
        Dim dalc As New clsV_A_Chemical_ReportDALC
        HandleDateType(item, datetype, "RegistrationTime")
        If grouptype = "g" Then
            item.Search += "  group by EnterpriseName, ChemicalName "
        End If
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function

    Public Function GetEnvironmental(item As TTSK.Web.AuthorityEntry.TableFilterContract) As TTSK.Web.AuthorityEntry.TableContract Implements IFMService.GetEnvironmental
        Dim dalc As New clsW_H_企业基本信息DALC
        Return FMTableManagement.GetTableContent(dalc, item)
    End Function
End Class
