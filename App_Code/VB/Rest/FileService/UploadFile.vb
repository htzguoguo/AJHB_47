Imports Microsoft.VisualBasic
Imports TJX.AJHB.AppData.Contracts.Inspection
Imports TJX.AJHB.MDA

Namespace VB.Rest.FileService

    Public Class UploadFile

        Private Shared _apiFilePath As String = "uploadfiles"
        Private Property FileName As String

        Sub New(ByVal fileName As String)
            Me.FileName = fileName
        End Sub

        Private Shared _tempPath As String = ""
        Private Shared _filesPath As String = ""
        Private Shared _filesPrefix As String = ""
        Private Shared uploadFilesTempPath As String
        Private Shared UploadFilesTempBasePath As String

        Public Property FileNames As List(Of String)

        Shared Sub New()
            UploadFilesTempBasePath = System.Web.HttpContext.Current.Server.MapPath(System.Web.HttpContext.Current.Request.ApplicationPath.ToString())
            uploadFilesTempPath = ConfigurationManager.AppSettings("UploadFilesTempPath")
            _tempPath = UploadFilesTempBasePath & "\" & uploadFilesTempPath

            _filesPrefix = ConfigurationManager.AppSettings("UploadFilesPrefix")
            _filesPath = UploadFilesTempBasePath & "\" & _filesPrefix
        End Sub

        Public Function SaveFiles() As List(Of String)
            Dim result As New List(Of String)
            Dim files As New List(Of String)
            If Not String.IsNullOrEmpty(FileName) Then

                Dim fs() As String = FileName.Split("|")
                For Each ff In fs
                    If ff.Contains(":") Then
                        Dim aa() = ff.Split(":")
                        files.Add(aa(1))
                    Else
                        files.Add(ff)
                    End If
                Next
                Dim tempString As String = Now.Ticks.ToString
                Dim targetPath As String = _filesPath + "\" + tempString
                If System.IO.Directory.Exists(targetPath) Then
                    System.IO.Directory.Delete(targetPath)
                End If
                System.IO.Directory.CreateDirectory(targetPath)

                For Each f As String In files
                    If System.IO.File.Exists(UploadFilesTempBasePath + "\" + _apiFilePath + "\" + f) Then
                        result.Add(_apiFilePath + "/" + f)
                    Else
                        Dim sourceFile As String = _tempPath + "\" + f
                        Dim targetFile As String = targetPath + "\" + f
                        System.IO.File.Copy(sourceFile, targetFile)
                        System.IO.File.Delete(sourceFile)
                        result.Add(_filesPrefix + "/" + tempString + "/" + f)
                    End If
                Next
            End If
            Me.FileNames = result
            Return result
        End Function

        Public Function CreateAttachFiles(ByVal files As String, ByVal saveNames As List(Of String)) As List(Of Model.OnSiteInspection.AttachFile)
            If saveNames Is Nothing OrElse saveNames.Count = 0 Then
                Return Nothing
            End If
            Dim result As New List(Of Model.OnSiteInspection.AttachFile)
            Dim fs() As String = files.Split("|")
            For index As Integer = 0 To fs.Length - 1
                Dim aa() = fs(index).Split(":")
                Dim fact = New Repositories.Inspection.AttachFileFactory
                Dim md = fact.BuildReportEntity
                md.FileName = aa(1)
                md.FileStatus = aa(0)
                md.SavePath = saveNames(index)
                result.Add(md)
            Next
            Return result
        End Function

        Public Function CreateAttachFiles(ByVal fileCategory As TJX.AJHB.AppData.Contracts.Inspection.OnSiteInspectionContract.FileCategory) As List(Of Model.OnSiteInspection.AttachFile)
            If Me.FileNames Is Nothing OrElse Me.FileNames.Count = 0 Then
                Return Nothing
            End If
            Dim result As New List(Of Model.OnSiteInspection.AttachFile)
            For Each file In Me.FileNames
                Dim fact = New Repositories.Inspection.AttachFileFactory
                Dim md
                If fileCategory = OnSiteInspectionContract.FileCategory.report Then
                    md = fact.BuildReportEntity
                Else
                    md = fact.BuildReplyEntity
                End If
                Dim ss() = file.Split("/")
                md.FileName = ss(ss.Length - 1)
                md.SavePath = file
                result.Add(md)
            Next
            Return result
        End Function

        Private Sub CopyFiles(ByVal fileSource As String, ByVal fileTarget As String)
            If System.IO.File.Exists(fileTarget) Then
                System.IO.File.Delete(fileTarget)
            End If
            System.IO.File.Copy(fileSource, fileTarget)
        End Sub

    End Class
End Namespace