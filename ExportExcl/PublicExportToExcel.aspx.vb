
Partial Class ExportExcel_PublicExportToExcel
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim para0 As String = Me.Request.QueryString.Item("para0")
        Dim para1 As String = Me.Request.QueryString.Item("para1")
        Dim para2 As String = Me.Request.QueryString.Item("para2")
        Dim para3 As String = Me.Request.QueryString.Item("para3")
        Dim para4 As String = Me.Request.QueryString.Item("para4")
        Dim para5 As String = Me.Request.QueryString.Item("para5")

        Dim paras As New List(Of String)
        paras.Add(para0)
        paras.Add(para1)
        paras.Add(para2)
        paras.Add(para3)
        paras.Add(para4)
        paras.Add(para5)
        Dim cls As PublicExportExcelBase
        Try
            cls = PublicExportExcelFactory.GetExcelBuilder(para0)
            cls.BuildExcel(paras)
            'If exportExcel = "道路日常巡查记录" Then
            '    cls.BuildExcel(HighwayName, SelectedDate, SelectedDept, SelectedCompanyID, exportExcel)
            'ElseIf exportExcel = "桥梁日常巡查记录" Then
            '    cls.BuildExcel(HighwayName, SelectedDate, SelectedDept, SelectedCompanyID, exportExcel)
            '    'ElseIf exportExcel = "上月任务结转" Then
            '    '    cls.BuildMonthJiezhuanExcel(HighwayName, SelectedCriterion, StartDate, EndDate, SelectedMonth, Nothing)
            '    'ElseIf exportExcel = "抽检验收结果" Then
            '    '    cls.BuildChoujianyanshouJieguoExcel(HighwayName, SelectedCriterion, StartDate, EndDate, SelectedMonth, Nothing, StatYear, StatMonth, StatDay)
            '    'ElseIf exportExcel = "抽检任务单" Then
            '    '    cls.BuildChoujianyanRenwuDanExcel(HighwayName, SelectedCriterion, StartDate, EndDate, SelectedMonth, Nothing, StatYear, StatMonth, StatDay)
            'End If

        Catch ex As Exception
            Dim mm As String = ex.Message
            'Dim LogFilePath As String = Server.MapPath("ErrorLog.txt")

            'Dim sw As System.IO.StreamWriter = _
            '  New System.IO.StreamWriter(LogFilePath)
            '' Write error to text file
            'sw.WriteLine("<-----" + ex.ToString() + "----->")
            'sw.Close()
            'Response.Write("<script>alert('对不起,无效记录,不能导出数据')</script>")
        End Try

    End Sub

End Class
