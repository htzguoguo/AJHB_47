Imports Microsoft.VisualBasic
Imports System.Runtime.InteropServices

Public Class ExcelHelper
    <DllImport("user32.dll", SetLastError:=True)> _
    Private Shared Function GetWindowThreadProcessId( _
            ByVal hWnd As IntPtr, _
            ByRef lpdwProcessId As Integer) As Integer
    End Function
    Public Shared Sub KillSpecialExcel(ByVal mExcel As Microsoft.Office.Interop.Excel.Application)
        Try
            If mExcel IsNot Nothing Then
                Dim lpdwProcessId As Integer
                GetWindowThreadProcessId(New IntPtr(mExcel.Hwnd), lpdwProcessId)
                System.Diagnostics.Process.GetProcessById(lpdwProcessId).Kill()
            End If
        Catch ex As Exception

        End Try
    End Sub

    Public Shared Function KillAllExcel(ByVal mExcel As Microsoft.Office.Interop.Excel.Application) As Boolean
        Try
            If mExcel IsNot Nothing Then
                mExcel.Quit()
                System.Runtime.InteropServices.Marshal.ReleaseComObject(mExcel)
                For Each theProc As System.Diagnostics.Process In System.Diagnostics.Process.GetProcessesByName("EXCEL")
                    If theProc.CloseMainWindow = False Then
                        theProc.Kill()
                    End If
                Next
                mExcel = Nothing

            End If
        Catch ex As Exception
            Return False
        End Try
        Return True
    End Function


End Class
