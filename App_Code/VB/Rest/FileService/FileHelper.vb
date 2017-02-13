Imports Microsoft.VisualBasic
Imports System.IO

Public Class FileHelper

    Public Shared Function GetFiles(ByVal path As String, ByVal extnName As String) As List(Of System.IO.FileInfo)
        Dim result As New List(Of System.IO.FileInfo)
        GetDir(path, extnName, result)
        Return result
    End Function

    Private Shared Sub GetDir(ByVal path As String, ByVal extName As String, ByVal lst As List(Of System.IO.FileInfo))
        Try
            Dim dir() As String = Directory.GetDirectories(path)
            Dim fdir As New DirectoryInfo(path)
            Dim file() As FileInfo = fdir.GetFiles()
            If (file.Length <> 0 OrElse dir.Length <> 0) Then
                For Each f As FileInfo In file
                    If extName.ToLower().IndexOf(f.Extension.ToLower()) >= 0 Then
                        lst.Add(f)
                    End If

                Next
                For Each d As String In dir
                    GetDir(d, extName, lst)
                Next
            End If
        Catch ex As Exception

        End Try
    End Sub

    '     private List<FileInfo> lst = new List<FileInfo>(); 
    '        public List<FileInfo> getFile(string path, string extName)         
    '        { 
    '            getdir(path, extName); 
    '            return lst; 
    '        } 
    '        private void getdir(string path, string extName) 
    '        { 
    '            try 
    '            { 
    '                string[] dir = Directory.GetDirectories(path); //文件夹列表   
    '                DirectoryInfo fdir = new DirectoryInfo(path); 
    '                FileInfo[] file = fdir.GetFiles(); 
    '                //FileInfo[] file = Directory.GetFiles(path); //文件列表   
    '                if (file.Length != 0 || dir.Length != 0) //当前目录文件或文件夹不为空                   
    '                { 
    '                    foreach (FileInfo f in file) //显示当前目录所有文件   
    '                    { 
    '                        if (extName.ToLower().IndexOf(f.Extension.ToLower()) >= 0) 
    '                        { 
    '                            lst.Add(f); 
    '                        } 
    '                    } 
    '                    foreach (string d in dir) 
    '                    { 
    '                          getdir(d, extName);//递归   
    '                    } 
    '                } 
    '            } 
    '            catch { }; 
    '        } 

End Class
