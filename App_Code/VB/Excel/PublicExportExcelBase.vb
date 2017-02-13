Imports Microsoft.VisualBasic
Imports System.Reflection
Imports TJX.JCGL.DALC.Web.MaintenanceManagementSystem
Imports TTSK.Web.AuthorityEntry
Imports Microsoft.Office.Interop
Imports Microsoft.Office.Interop.Excel
Imports System.Collections.Generic
Imports System.Windows.Forms
Imports SupSystem.Web.GenericsDALC

Public MustInherit Class PublicExportExcelBase

    Private mExcel As Microsoft.Office.Interop.Excel.Application
    Private mWorkbook As Excel.Workbook
    Private ExSheet As Excel.Worksheet

    Protected _tableOne As System.Data.DataTable

    Protected _tableTwo As System.Data.DataTable

    Protected _tableOnes As New List(Of System.Data.DataTable)

    Protected _tableTwos As New List(Of System.Data.DataTable)

    Protected _isMulti As Boolean = False

    Protected _names As New List(Of String)

    Sub New()
        Me._isMulti = False
    End Sub

    Private Const _tableMarker As String = "#t:"
    Private Const _valueMarker As String = "#v:"

    Public Sub BuildExcel(ByVal para As List(Of String))
        If _isMulti Then
            BuildMulti(para)
        Else
            Build(para)
        End If
    End Sub

    Public Sub Build(ByVal para As List(Of String))
        PrepareForExcel()
        InitExcel()
        ExcelTable1(para)
        BuildExcel(ExSheet)
        SaveExcel(Nothing)
    End Sub

    Public Sub BuildMulti(ByVal para As List(Of String))
        Dim ex As Excel.Worksheet = PrepareForExcel()
        InitExcel()
        ExcelTable1(para)

        For i As Integer = 1 To _names.Count - 1
            ex.Copy(ex)
        Next

        For i As Integer = 1 To _names.Count
            Dim c = mWorkbook.Worksheets.Item(i)
            c.name = _names(i - 1)
            BuildExcel(c, i - 1)
        Next

        'ex.Name = _names.Item(_names.Count - 1)
        'BuildExcel(ex, _names.Count - 1)

        'Dim ccc As Integer = 2
        'For i As Integer = _names.Count - 2 To 0 Step -1
        '    ex.Copy(ex)

        '    Dim c = mWorkbook.Worksheets.Item(ccc)
        '    c.name = _names(i)
        '    BuildExcel(c, i)

        '    ccc += 1
        'Next




        'Dim ddd As Integer = 1
        'For i1 As Integer = _names.Count - 1 To 0 Step -1
        '    Dim c = mWorkbook.Worksheets.Item(ddd)
        '    c.name = _names(i1)

        '    ddd += 1
        'Next


        SaveExcel(Nothing)
    End Sub

    Public Sub BuildMulti_Old(ByVal para As List(Of String))
        Dim ex As Excel.Worksheet = PrepareForExcel()
        InitExcel()
        ExcelTable1(para)

        ex.Name = _names.Item(_names.Count - 1)
        BuildExcel(ex, _names.Count - 1)

        Dim ccc As Integer = 2
        For i As Integer = _names.Count - 2 To 0 Step -1
            ex.Copy(ex)

            Dim c = mWorkbook.Worksheets.Item(ccc)
            c.name = _names(i)
            BuildExcel(c, i)

            ccc += 1
        Next




        Dim ddd As Integer = 1
        For i1 As Integer = _names.Count - 1 To 0 Step -1
            Dim c = mWorkbook.Worksheets.Item(ddd)
            c.name = _names(i1)

            ddd += 1
        Next


        SaveExcel(Nothing)
    End Sub

#Region "获取数据"

    Private _startOneIndex As Integer = 0

    Private _startTwoIndex As Integer = 0

    Private _head() As String = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"}

    Private Sub InitExcel()

        With ExSheet
            Dim ishead As Boolean = False
            Dim istail As Boolean = False
            Dim isone As Boolean = False
            Dim istwo As Boolean = False
            For i As Integer = 1 To 30
                Dim dd As Integer = 0
                For Each s In _head
                    Dim v As String = .Range(s + i.ToString).Value
                    If Not String.IsNullOrEmpty(v) AndAlso (v.StartsWith("#")) Then
                        If IsTable(v) Then
                            If _startOneIndex = 0 OrElse _startOneIndex = i Then
                                _startOneIndex = i
                                _t_one_values.Add(GetTableValue(v))
                                _t_one_fields.Add(GetTableField(s, v))
                            Else
                                _startTwoIndex = i
                                _t_two_values.Add(GetTableValue(v))
                                _t_two_fields.Add(GetTableField(s, v))
                            End If
                        ElseIf IsValue(v) Then
                            If ishead = False Then
                                _v_head_index.Add(s + i.ToString)
                                _v_head_fields.Add(v.Substring(3))
                                '  _v_head_fields.Add(GetTableField(s, v))
                            Else
                                _v_tail_index.Add(s + i.ToString)
                                _v_tail_fields.Add(v.Substring(3))
                                ' _v_tail_fields.Add(GetTableField(s, v))
                            End If

                            'If ishead = False AndAlso dd = _head.Length - 1 Then
                            '    ishead = True
                            'End If

                        End If
                    End If
                    dd += 1
                Next
            Next
        End With

    End Sub

    Private Function GetTableValue(ByVal content As String) As String
        If content.Contains(",") Then
            Dim ss() As String = content.Split(",")
            Return ss(0).Substring(3)
        Else
            Return content.Substring(3)
        End If
    End Function

    Private Function GetTableField(ByVal head As String, ByVal content As String) As String
        If content.Contains(",") Then
            Dim ss() As String = content.Split(",")
            Return ss(1)
        Else
            Return head
        End If
    End Function

    Private Function IsTable(ByVal info As String) As Boolean
        Dim result As Boolean = False
        If info.StartsWith(_tableMarker) Then
            result = True
        End If
        Return result
    End Function

    Private Function IsValue(ByVal info As String) As Boolean
        Dim result As Boolean = False
        If info.StartsWith(_valueMarker) Then
            result = True
        End If
        Return result
    End Function



    Private _t_one_fields As New List(Of String)
    Private _t_one_values As New List(Of String)

    Private _t_two_fields As New List(Of String)
    Private _t_two_values As New List(Of String)



    Private _v_head_fields As New List(Of String)
    Private _v_head_index As New List(Of String)

    Private _v_tail_fields As New List(Of String)
    Private _v_tail_index As New List(Of String)

    Private Sub FillMultiHeadValues(ByVal sheet As Worksheet)
        If _v_head_fields IsNot Nothing AndAlso _v_head_fields.Count > 0 Then
            For i As Integer = 0 To _v_head_index.Count - 1
                If _v_head_fields(i).Contains("Images") Then
                    SetCellValuePic(sheet, _v_head_fields(i), _v_head_index(i), GetValue(_v_head_fields(i)))
                Else
                    SetCellValueBorderAlign1(sheet, _v_head_index(i), GetValue(_v_head_fields(i)))
                End If
            Next
        End If
    End Sub

    Private Sub FillMultiTailValues(ByVal sheet As Worksheet)
        If _v_tail_fields IsNot Nothing AndAlso _v_tail_fields.Count > 0 Then
            For i As Integer = 0 To _v_tail_index.Count - 1
                If _v_tail_fields(i).Contains("Images") Then
                    SetCellValuePic(sheet, _v_tail_fields(i), _v_tail_index(i), GetValue(_v_tail_fields(i)))
                Else
                    SetCellValueBorderAlign1(sheet, _v_tail_index(i), GetValue(_v_tail_fields(i)))
                End If
            Next
        End If
    End Sub

    

    Private Sub FillMultiHeadValues(ByVal sheet As Worksheet, ByVal ind As Integer)
        If _v_head_fields IsNot Nothing AndAlso _v_head_fields.Count > 0 Then
            For i As Integer = 0 To _v_head_index.Count - 1
                ' SetCellValueBorderAlign1(sheet, _v_head_index(i), GetValue(_v_head_fields(i), ind))
                If _v_head_fields(i).Contains("Images") Then
                    '  SetCellValuePic(sheet, _v_head_index(i), GetValue(_v_head_fields(i)))
                Else
                    SetCellValueBorderAlign1(sheet, _v_head_index(i), GetValue(_v_head_fields(i), ind))
                End If
            Next
        End If
    End Sub

    Private Sub FillMultiTailValues(ByVal sheet As Worksheet, ByVal ind As Integer)
        If _v_tail_fields IsNot Nothing AndAlso _v_tail_fields.Count > 0 Then
            For i As Integer = 0 To _v_tail_index.Count - 1
                SetCellValueBorderAlign1(sheet, _v_tail_index(i), GetValue(_v_tail_fields(i), ind))
            Next
        End If
    End Sub

    Private Sub FillTable1()
        If _tableOne IsNot Nothing AndAlso _tableOne.Rows.Count > 0 Then
            Dim ind As Integer = 1
            For Each r As System.Data.DataRow In _tableOne.Rows
                For index As Integer = 0 To _t_one_fields.Count - 1
                    If _t_one_values(index) = "num" Then
                        SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, ind.ToString)
                    ElseIf _t_one_values(index).Contains(",") Then
                        Dim ss() As String = _t_one_values(index).Split(",")

                        Dim f As System.Reflection.MethodInfo = Me.GetType.GetMethod(ss(1))
                        Dim rr As Object
                        If IsDBNull(r.Item(ss(0))) Then
                            rr = String.Empty
                        Else
                            rr = f.Invoke(Me, New Object() {r.Item(ss(0))})
                        End If


                        SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, rr)
                    ElseIf _t_one_values(index).Contains("-") Then
                        Dim ss() As String = _t_one_values(index).Split("-")
                        Dim str As String = String.Empty
                        For Each s In ss
                            If Not IsDBNull(r.Item(s)) Then
                                str += r.Item(s).ToString + "-"
                            End If
                        Next
                        SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, str.TrimEnd("-"))
                    Else
                        If IsDBNull(r.Item(_t_one_values(index))) Then
                            SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, String.Empty)
                        Else
                            SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, r.Item(_t_one_values(index)))
                        End If
                    End If

                Next
                ind += 1
                _startOneIndex += 1
            Next
        Else
            For index As Integer = 0 To _t_one_fields.Count - 1
                SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, String.Empty)
            Next
        End If
    End Sub

    Private Sub ImpFillTable(ByVal sheet As Worksheet, ByVal tab As Data.DataTable, ByVal fields As List(Of String), ByVal values As List(Of String), ByVal startIndex As Integer)
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            Dim ind As Integer = 1
            Dim isFirst As Boolean = True
            For Each r As System.Data.DataRow In tab.Rows

                Dim isExist As Boolean = False

                For index As Integer = 0 To fields.Count - 1
                    If isFirst = False AndAlso isExist = False Then

                        '  InsertNewCell(sheet, fields(0) + startIndex.ToString, fields(fields.Count - 1) + startIndex.ToString)
                        InsertNewCell(sheet, fields(0), fields(fields.Count - 1), startIndex.ToString)

                        isExist = True
                    End If


                    If values(index) = "num" Then

                        SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, ind.ToString, _t_one_values(index))


                    ElseIf values(index).Contains(",") Then
                        Dim ss() As String = values(index).Split(",")

                        Dim f As System.Reflection.MethodInfo = Me.GetType.GetMethod(ss(1))
                        Dim rr As Object
                        If IsDBNull(r.Item(ss(0))) Then
                            rr = String.Empty
                        Else
                            rr = f.Invoke(Me, New Object() {r.Item(ss(0))})
                        End If



                        SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, rr)

                    ElseIf values(index).Contains("-") Then
                        Dim ss() As String = values(index).Split("-")
                        Dim str As String = String.Empty
                        For Each s In ss
                            If Not IsDBNull(r.Item(s)) Then
                                str += r.Item(s).ToString + "-"
                            End If
                        Next

                        SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, str.TrimEnd("-"))

                    Else
                        If IsDBNull(r.Item(values(index))) Then

                            SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, String.Empty)

                        Else

                            SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, r.Item(values(index)))

                        End If
                    End If

                Next
                isFirst = False
                ind += 1
                startIndex += 1
            Next
        Else
            For index As Integer = 0 To fields.Count - 1
                SetCellValueBorderAlign(sheet, fields(index), startIndex.ToString, String.Empty)
            Next
        End If
    End Sub

    Private Sub ImpFillTable_b(ByVal tab As Data.DataTable, ByVal fields As List(Of String), ByVal values As List(Of String), ByVal startIndex As Integer)
        If tab IsNot Nothing AndAlso tab.Rows.Count > 0 Then
            Dim ind As Integer = 1
            Dim isFirst As Boolean = True
            For Each r As System.Data.DataRow In tab.Rows



                For index As Integer = 0 To fields.Count - 1
                    If values(index) = "num" Then
                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, ind.ToString)
                        Else
                            InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, ind.ToString)
                        End If

                    ElseIf values(index).Contains(",") Then
                        Dim ss() As String = values(index).Split(",")

                        Dim f As System.Reflection.MethodInfo = Me.GetType.GetMethod(ss(1))
                        Dim rr As Object
                        If IsDBNull(r.Item(ss(0))) Then
                            rr = String.Empty
                        Else
                            rr = f.Invoke(Me, New Object() {r.Item(ss(0))})
                        End If


                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, rr)
                        Else
                            InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, rr)
                        End If
                    ElseIf values(index).Contains("-") Then
                        Dim ss() As String = values(index).Split("-")
                        Dim str As String = String.Empty
                        For Each s In ss
                            If Not IsDBNull(r.Item(s)) Then
                                str += r.Item(s).ToString + "-"
                            End If
                        Next
                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, str.TrimEnd("-"))
                        Else
                            InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, str.TrimEnd("-"))
                        End If
                    Else
                        If IsDBNull(r.Item(values(index))) Then
                            If isFirst = True Then
                                SetCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, String.Empty)
                            Else
                                InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, String.Empty)
                            End If
                        Else
                            If isFirst = True Then
                                SetCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, r.Item(values(index)))
                            Else
                                InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, r.Item(values(index)))
                            End If
                        End If
                    End If

                Next
                isFirst = False
                ind += 1
                startIndex += 1
            Next
        Else
            For index As Integer = 0 To fields.Count - 1
                InsertCellValueBorderAlign(ExSheet, fields(index) + startIndex.ToString, String.Empty)
            Next
        End If
    End Sub

    Private Sub FillTableOne(ByVal sheet As Worksheet)
        ImpFillTable(sheet, _tableOne, _t_one_fields, _t_one_values, _startOneIndex)
    End Sub

    Private Sub FillTableTwo(ByVal sheet As Worksheet)
        ImpFillTable(sheet, _tableTwo, _t_two_fields, _t_two_values, _startTwoIndex)
    End Sub

    Private Sub FillTableOne(ByVal sheet As Worksheet, ByVal tab As System.Data.DataTable)
        ImpFillTable(sheet, tab, _t_one_fields, _t_one_values, _startOneIndex)
    End Sub

    Private Sub FillTableTwo(ByVal sheet As Worksheet, ByVal tab As System.Data.DataTable)
        ImpFillTable(sheet, tab, _t_two_fields, _t_two_values, _startTwoIndex)
    End Sub

    Private Sub FillTable()
        If _tableOne IsNot Nothing AndAlso _tableOne.Rows.Count > 0 Then
            Dim ind As Integer = 1
            Dim isFirst As Boolean = True
            For Each r As System.Data.DataRow In _tableOne.Rows



                For index As Integer = 0 To _t_one_fields.Count - 1
                    If _t_one_values(index) = "num" Then
                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, ind.ToString)
                        Else
                            InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, ind.ToString)
                        End If

                    ElseIf _t_one_values(index).Contains(",") Then
                        Dim ss() As String = _t_one_values(index).Split(",")

                        Dim f As System.Reflection.MethodInfo = Me.GetType.GetMethod(ss(1))
                        Dim rr As Object
                        If IsDBNull(r.Item(ss(0))) Then
                            rr = String.Empty
                        Else
                            rr = f.Invoke(Me, New Object() {r.Item(ss(0))})
                        End If


                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, rr)
                        Else
                            InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, rr)
                        End If
                    ElseIf _t_one_values(index).Contains("-") Then
                        Dim ss() As String = _t_one_values(index).Split("-")
                        Dim str As String = String.Empty
                        For Each s In ss
                            If Not IsDBNull(r.Item(s)) Then
                                str += r.Item(s).ToString + "-"
                            End If
                        Next
                        If isFirst = True Then
                            SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, str.TrimEnd("-"))
                        Else
                            InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, str.TrimEnd("-"))
                        End If
                    Else
                        If IsDBNull(r.Item(_t_one_values(index))) Then
                            If isFirst = True Then
                                SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, String.Empty)
                            Else
                                InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, String.Empty)
                            End If
                        Else
                            If isFirst = True Then
                                SetCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, r.Item(_t_one_values(index)))
                            Else
                                InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, r.Item(_t_one_values(index)))
                            End If
                        End If
                    End If

                Next
                isFirst = False
                ind += 1
                _startOneIndex += 1
            Next
        Else
            For index As Integer = 0 To _t_one_fields.Count - 1
                InsertCellValueBorderAlign(ExSheet, _t_one_fields(index) + _startOneIndex.ToString, String.Empty)
            Next
        End If
    End Sub

    Private Sub BuildExcel(ByVal sheet As Worksheet)
        'FillTable()
        'FillMultiHeadValues()

        FillMultiTailValues(sheet)
        FillMultiHeadValues(sheet)
        FillTableTwo(sheet)
        FillTableOne(sheet)

    End Sub

    Private Sub BuildExcel(ByVal sheet As Worksheet, ByVal ind As Integer)
        'FillTable()
        'FillMultiHeadValues()

        FillMultiTailValues(sheet, ind)
        FillMultiHeadValues(sheet, ind)



        FillTableTwo(sheet, _tableTwos(ind))
        FillTableOne(sheet, _tableOnes(ind))

    End Sub

#End Region

    Protected Function CB(ByVal str1 As String, ByVal str2 As String) As String
        If String.IsNullOrWhiteSpace(str2) Then
            Return str1

        Else
            Return str2 + "-" + str1
        End If
    End Function

    Protected MustOverride Property FileName() As String

    Protected MustOverride ReadOnly Property GetValue(ByVal field As String) As String

    Protected Overridable ReadOnly Property GetValue(ByVal field As String, ByVal ind As Integer) As String
        Get
            Return String.Empty
        End Get
    End Property

    Protected MustOverride Sub ExcelTable1(ByVal para As List(Of String))



#Region "公共方法"

    Public Function PrepareForExcel() As Excel.Worksheet
        mExcel = New Microsoft.Office.Interop.Excel.Application
        mExcel.Visible = False

        Dim path As String = HttpContext.Current.Request.PhysicalApplicationPath
        path += "ExportExcl\temp\" + Me.FileName

        mWorkbook = mExcel.Workbooks.Open(path)

        '  mWorkbook = mExcel.Workbooks.Add()
        ExSheet = mWorkbook.Worksheets.Item(1)

        'Dim m2 = mWorkbook.Worksheets.Add()
        'Dim m3 = mWorkbook.Worksheets.Add()
        'm2.name = Now.Ticks

        'm3.name = Now.Ticks

        'm2.Copy(ExSheet)
        'm3.Copy(ExSheet)
        '  ExSheet.Copy(Nothing, ExSheet)

        ' ExSheet.Copy(ExSheet)

        Return ExSheet

    End Function

    Public Sub SaveExcel(ByVal fileName As String)
        Dim resp As HttpResponse
        resp = HttpContext.Current.Response
        Dim strPath As String = HttpContext.Current.Request.PhysicalApplicationPath

        Dim nn As String = Now.Ticks.ToString
        nn = System.IO.Path.GetFileNameWithoutExtension(Me.FileName)

        '  nn = HttpUtility.UrlEncode(nn, System.Text.Encoding.UTF8)

        Dim version As String = mExcel.Version

        Dim fileExtension As String = ".xls"

        If (version = "12.0") Then
            fileExtension = ".xlsx"
        End If


        Dim pathName As String = strPath + "exportExcel\"

        If System.IO.Directory.Exists(pathName) = False Then
            System.IO.Directory.CreateDirectory(pathName)
        End If


        'pathName = "e:\exportExcel\" + nn + ".xls"
        pathName = strPath + "exportExcel\" + nn + fileExtension

        If System.IO.File.Exists(pathName) Then
            System.IO.File.Delete(pathName)
        End If

        mWorkbook.SaveAs(pathName)

        ' mWorkbook.SaveAs(pathName)
        'mWorkbook.SaveAs(pathName, version)
        'mWorkbook.SaveAs(pathName, FileFormat:=xl)
        'mExcel.Quit()
        'System.Runtime.InteropServices.Marshal.ReleaseComObject(mExcel)
        'System.Runtime.InteropServices.Marshal.ReleaseComObject(mWorkbook)
        'System.Runtime.InteropServices.Marshal.ReleaseComObject(ExSheet)

        'ExSheet = Nothing
        'mWorkbook = Nothing
        'mExcel = Nothing

        ExcelHelper.KillAllExcel(mExcel)
        resp.ContentEncoding = System.Text.Encoding.UTF8

        Dim key As String = nn + fileExtension
        If IsFireFox() Then
            key = "" + key + ""
            resp.AppendHeader("Content-Disposition", "attachment;filename=" + key)
        Else
            resp.AddHeader("Content-Disposition", "attachment; filename=" + HttpUtility.UrlEncode(key, System.Text.Encoding.UTF8))
        End If



        resp.ContentType = "application/ms-excel"
        resp.WriteFile(pathName)
        'resp.End()
        HttpContext.Current.ApplicationInstance.CompleteRequest()
    End Sub

    'if (isFireFox == true)  
    '        {  
    '            fileName = "\"" + fileName + "\"";  
    '            httpResponse.AppendHeader("Content-Disposition", "attachment;filename=" + fileName);  
    '        }  
    '        else  
    '        {  
    '            httpResponse.AppendHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(fileName, System.Text.Encoding.UTF8).ToString());  
    '        } 

    Private Function IsFireFox() As Boolean
        If HttpContext.Current.Request.ServerVariables("http_user_agent").ToLower.IndexOf("firefox") <> -1 Then
            Return True
        End If
        Return False
    End Function


    Private Sub InsertNewCell(ByVal ExSheet As Excel.Worksheet, ByVal start As String, ByVal e As String)
        ExSheet.Range(start, e).Insert(Excel.XlInsertShiftDirection.xlShiftDown)

    End Sub

    Private Sub InsertNewCell(ByVal ExSheet As Excel.Worksheet, ByVal ss As String, ByVal ee As String, ByVal index As String)
        Dim start As String
        Dim e As String
        start = GetCellField(ss, index)
        e = GetCellFieldEnd(ee, index)

        ExSheet.Range(start, e).Insert(Excel.XlInsertShiftDirection.xlShiftDown)

    End Sub

    Private Function GetCellFieldEnd(ByVal field As String, ByVal index As String) As String
        If field.Contains(":") Then
            Dim ss() As String = field.Split(":")
            Return ss(1) + index
        ElseIf field.Contains("|") Then
            Dim ss() As String = field.Split("|")
            Return ss(0) + index
        Else
            Return field + index
        End If
    End Function

    Private Function GetCellField(ByVal field As String, ByVal index As String) As String
        If field.Contains(":") Then
            Dim ss() As String = field.Split(":")
            Return ss(0) + index
        ElseIf field.Contains("|") Then
            Dim ss() As String = field.Split("|")
            Return ss(0) + index
        Else
            Return field + index
        End If
    End Function

    Private Function GetCellField1(ByVal field As String, ByVal index As String) As String
        If field.Contains(":") Then
            Dim ss() As String = field.Split(":")
            Return ss(0) + index + ":" + ss(1) + index
        Else
            Return field + index
        End If
    End Function

    Private Function GetOddRowCellMergeField(ByVal field As String, ByVal index As String) As String
        If field.Contains("|") Then
            Dim ss() As String = field.Split("|")
            Return ss(0) + index + ":" + ss(0) + (index - 1).ToString
        Else
            Return field + index
        End If
    End Function

    Private Sub InsertCellValueBorderAlign(ByVal ExSheet As Excel.Worksheet, ByVal location As String, ByVal value As Object, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter)
        ' ExSheet.Range(location).Insert(value, Excel.XlInsertShiftDirection.xlShiftDown)
        '  ExSheet.InsertRow(location)
        ExSheet.Range(location).Insert(Excel.XlInsertShiftDirection.xlShiftDown)
        If TypeOf value Is DateTime Then
            ExSheet.Range(location).Value = String.Format("{0:yyyy年MM月dd日}", value)
        Else
            ExSheet.Range(location).Value = IIf(value = "0", "", value)
        End If

        ExSheet.Range(location).HorizontalAlignment = align
        ExSheet.Range(location).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(location).WrapText = True
    End Sub

    Private Sub SetCellValueBorderAlign(ByVal ExSheet As Excel.Worksheet, ByVal location As String, ByVal value As Object, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter)

        If TypeOf value Is DateTime Then
            ExSheet.Range(location).Value = String.Format("{0:yyyy年MM月dd日}", value)
        Else
            ExSheet.Range(location).Value = IIf(value = "0", "", value)
        End If

        ExSheet.Range(location).HorizontalAlignment = align
        ExSheet.Range(location).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(location).WrapText = True
    End Sub

    Private _height As Integer = -1

    Private Sub SetCellValueBorderAlign(ByVal ExSheet As Excel.Worksheet, ByVal loc As String, ByVal index As String, ByVal value As Object, ByVal field As String, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter)
        Dim location As String
        If loc.Contains("|") Then

            If loc.Contains("|") Then
                Dim mm() As String = loc.Split("|")
                If mm(1) = "odd" Then
                    Dim l As Integer = index Mod 2
                    If l = 0 Then
                        location = GetOddRowCellMergeField(loc, index)
                        Dim ss() As String = location.Split(":")
                        ExSheet.Range(ss(0), ss(1)).Merge()
                        If field = "num" Then
                            value = value / 2
                        End If

                    Else
                        Return
                    End If
                End If
            End If

        Else
            location = GetCellField1(loc, index)

            If location.Contains(":") Then
                Dim ss() As String = location.Split(":")



                If _height = -1 Then
                    _height = ExSheet.Range(ss(0), ss(1)).RowHeight
                End If


                ExSheet.Range(ss(0), ss(1)).Merge()

                ExSheet.Range(ss(0), ss(1)).RowHeight = _height
            End If
        End If

        Dim wid As Integer = ExSheet.Range(location).EntireColumn.ColumnWidth

        If TypeOf value Is DateTime Then
            ExSheet.Range(location).Value = String.Format("{0:yyyy年MM月dd日}", value)
        Else
            ExSheet.Range(location).Value = IIf(value = "0", "", value)
        End If

        ExSheet.Range(location).HorizontalAlignment = align
        ExSheet.Range(location).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(location).EntireColumn.WrapText = True

        ExSheet.Range(location).Rows.AutoFit()

        '  ExSheet.Range(location).EntireColumn.ColumnWidth = wid
    End Sub

    Private Sub SetCellValueBorderAlign(ByVal ExSheet As Excel.Worksheet, ByVal loc As String, ByVal index As String, ByVal value As Object, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter)
        Dim location As String
        If loc.Contains("|") Then

            If loc.Contains("|") Then
                Dim mm() As String = loc.Split("|")
                If mm(1) = "odd" Then
                    Dim l As Integer = index Mod 2
                    If l = 0 Then
                        location = GetOddRowCellMergeField(loc, index)
                        Dim ss() As String = location.Split(":")
                        ExSheet.Range(ss(0), ss(1)).Merge()
                    Else
                        Return
                    End If
                End If
            End If

        Else
            location = GetCellField1(loc, index)

            If location.Contains(":") Then
                Dim ss() As String = location.Split(":")



                If _height = -1 Then
                    _height = ExSheet.Range(ss(0), ss(1)).RowHeight
                End If


                ExSheet.Range(ss(0), ss(1)).Merge()

                ExSheet.Range(ss(0), ss(1)).RowHeight = _height
            Else
                If _height = -1 Then
                    _height = ExSheet.Range(location).RowHeight
                End If
                ExSheet.Range(location).RowHeight = _height
            End If
        End If

        '    Dim wid As Integer = ExSheet.Range(location).EntireColumn.ColumnWidth

        If TypeOf value Is DateTime Then
            ExSheet.Range(location).Value = String.Format("{0:yyyy年MM月dd日}", value)
        Else
            '  ExSheet.Range(location).Value = IIf(value = "0", "", value)

            ExSheet.Range(location).Value = value
        End If

        ExSheet.Range(location).HorizontalAlignment = align
        ExSheet.Range(location).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(location).EntireColumn.WrapText = True

        Dim h As Integer = ExSheet.Range(location).RowHeight



        If ExSheet.Range(location).Value IsNot Nothing AndAlso Not String.IsNullOrEmpty(ExSheet.Range(location).Value.ToString) AndAlso h < 100 Then
            Dim info As String = ExSheet.Range(location).Value.ToString
            If info.Length > 30 Then
                ExSheet.Range(location).Rows.AutoFit()
            End If

        End If


        ' ExSheet.Range(location).Rows.AutoFit()

        '  ExSheet.Range(location).EntireColumn.ColumnWidth = wid
    End Sub

    'Private Function GetSheetRange(ByVal ExSheet As Excel.Worksheet, ByVal Loc As String) As Excel.Range
    '    Dim location As String
    '    If Loc.Contains("|") Then

    '        If Loc.Contains("|") Then
    '            Dim mm() As String = Loc.Split("|")
    '            If mm(1) = "odd" Then
    '                Dim l As Integer = index Mod 2
    '                If l = 0 Then
    '                    location = GetOddRowCellMergeField(Loc, index)
    '                    Dim ss() As String = location.Split(":")
    '                    ExSheet.Range(ss(0), ss(1)).Merge()
    '                Else

    '                End If
    '            End If
    '        End If

    '    Else
    '        location = GetCellField1(Loc, index)

    '        If location.Contains(":") Then
    '            Dim ss() As String = location.Split(":")
    '            ExSheet.Range(ss(0), ss(1)).Merge()
    '        End If

    'End Function

    Private Sub SetCellValuePic(ByVal ExSheet As Excel.Worksheet, ByVal field As String, ByVal location As String, ByVal value As Object)
        Dim rng As Excel.Range = ExSheet.Range(location)
        '   ExSheet.Range(location).RowHeight = 400
        If field.Contains(",") Then
            Dim vv = field.Split(",")(1)
            Dim ss() As String = vv.Split(":")
            ' ExSheet.Range(ss(0), ss(1)).Merge()
            Dim ii As String = location.Substring(1)
            rng = ExSheet.Range(ss(0) + ii, ss(1) + ii)
        End If
        rng.Select()
        rng.Value = ""
        Dim mPath As String = HttpContext.Current.Server.MapPath(value)
        If Not System.IO.File.Exists(mPath) Then
            Return
        End If

        Dim picleft, pictop, picwidth, picheight As Double
        Dim rngleft, rngtop, rngwidth, rngheight As Double
        rngleft = rng.Left
        rngtop = rng.Top
        rngwidth = rng.Width - 5
        rngheight = rng.Height - 5

        Dim bmp As New System.Drawing.Bitmap(mPath)

        Dim ww As Integer = bmp.Width
        Dim hh As Integer = bmp.Height

        '        Dim ww As Integer = bmp.Width / 1.33
        '        Dim hh As Integer = bmp.Height / 1.33
        bmp.Dispose()

        If ww < rngwidth AndAlso hh < rngheight Then
            picwidth = ww
            picheight = hh
        Else
            If (ww / rngwidth) > (hh / rngheight) Then
                picwidth = rngwidth
                picheight = hh * (rngwidth / ww)
            Else
                picheight = rngheight
                picwidth = ww * (rngheight / hh)
            End If
        End If
        pictop = rngtop
        picleft = rngleft

        pictop += (rng.Height - picheight) / 2
        picleft += (rng.Width - picwidth) / 2


        If String.IsNullOrEmpty(mPath) = False AndAlso System.IO.File.Exists(mPath) Then
            ExSheet.Shapes.AddPicture(mPath, Microsoft.Office.Core.MsoTriState.msoFalse, Microsoft.Office.Core.MsoTriState.msoTrue, picleft, pictop, picwidth, picheight)
        End If

    End Sub

    Private Sub SetCellValueBorderAlign1(ByVal ExSheet As Excel.Worksheet, ByVal location As String, ByVal value As Object)
        Dim wid As Integer = ExSheet.Range(location).EntireColumn.ColumnWidth
        If TypeOf value Is DateTime Then
            ExSheet.Range(location).Value = String.Format("{0:yyyy年MM月dd日}", value)
        Else
            ExSheet.Range(location).Value = IIf(value = "0", "", value)
        End If
        '  ExSheet.Range(location).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(location).EntireColumn.WrapText = True

        Dim h As Integer = ExSheet.Range(location).RowHeight



        If Not String.IsNullOrEmpty(ExSheet.Range(location).Value) AndAlso h < 100 Then
            Dim info As String = ExSheet.Range(location).Value
            If info.Length > 30 Then
                ExSheet.Range(location).Rows.AutoFit()
            End If

        End If


        ' ExSheet.Range(location).EntireColumn.ColumnWidth = wid
    End Sub

    Private Sub SetCellValueBorderAlign1(ByVal ExSheet As Excel.Worksheet, ByVal startRang As String, ByVal endRang As String, ByVal value As Object, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter, Optional ByVal textAlign As Excel.XlOrientation = XlOrientation.xlHorizontal, Optional ByVal textBold As Boolean = False)
        ExSheet.Range(startRang, endRang).Merge()
        ExSheet.Range(startRang, endRang).Value = IIf(value = "0", "", value)
        ExSheet.Range(startRang, endRang).HorizontalAlignment = align
        ExSheet.Range(startRang, endRang).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(startRang, endRang).WrapText = True
        ExSheet.Range(startRang, endRang).Orientation = textAlign
        ExSheet.Range(startRang, endRang).Font.Bold = textBold
        'ExSheet.Range(startRang, endRang).ColumnWidth = 8
    End Sub

    Private Sub SetCellValueBorderTitle(ByVal ExSheet As Excel.Worksheet, ByVal startRang As String, ByVal endRang As String, ByVal value As Object, Optional ByVal align As Excel.XlHAlign = Excel.XlHAlign.xlHAlignCenter)
        ExSheet.Range(startRang, endRang).Merge()
        ExSheet.Range(startRang, endRang).Value = value
        ExSheet.Range(startRang, endRang).HorizontalAlignment = align
        ExSheet.Range(startRang, endRang).BorderAround(Excel.XlLineStyle.xlContinuous, Excel.XlBorderWeight.xlThin, Excel.XlColorIndex.xlColorIndexAutomatic, Nothing)
        ExSheet.Range(startRang, endRang).WrapText = True
        ExSheet.Range(startRang, endRang).Font.Name = "宋体"
        ExSheet.Range(startRang, endRang).Font.Size = 18
        ExSheet.Range(startRang, endRang).Font.Bold = True
        'ExSheet.Range(startRang, endRang).ColumnWidth = 8
    End Sub

    Protected Shared m_DefaultPicFolder As String = "Print/" & "EmPic"

'    Private Function SaveFiles(ByVal caseNum As String, ByVal savePath As String, ByVal mItem As clsCaseAssociateImageTab) As String
'
'        Dim result As String = Nothing
'
'        If System.IO.Directory.Exists(savePath) = False Then
'            System.IO.Directory.CreateDirectory(savePath)
'        End If
'
'        Dim savePicPath = savePath + "\" + caseNum '+ "\Report"
'        If System.IO.Directory.Exists(savePicPath) = False Then
'            System.IO.Directory.CreateDirectory(savePicPath)
'        End If
'        savePicPath = savePath + "\" + caseNum + "\Report"
'        If System.IO.Directory.Exists(savePicPath) = False Then
'            System.IO.Directory.CreateDirectory(savePicPath)
'        End If
'        SaveImageIntoLocalFile(savePicPath & "\" & mItem.FileName, mItem.FileData)
'        result = savePicPath & "\" & mItem.FileName
'
'        Return result
'    End Function

    Private Sub SaveImageIntoLocalFile(ByVal localPath As String, ByVal streamByte() As Byte)
        If System.IO.File.Exists(localPath) = False Then
            Dim fs As System.IO.FileStream = New System.IO.FileStream(localPath, System.IO.FileMode.CreateNew)
            Dim bw As System.IO.BinaryWriter = New System.IO.BinaryWriter(fs)
            bw.Write(streamByte, 0, streamByte.Length - 1)
            bw.Close()
            fs.Close()
        End If
    End Sub

#End Region

End Class
