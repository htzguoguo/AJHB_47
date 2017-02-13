Imports Microsoft.VisualBasic
Imports System.ServiceModel.Activation
Imports System.Net
Imports TJX.AJHB.AppData.Contracts

<AspNetCompatibilityRequirements(requirementsmode:=Activation.AspNetCompatibilityRequirementsMode.Allowed)>
Public Class RestFileService
    Implements IRestFileService

    Public Function UploadFile(fileName As String, fileContents As System.IO.Stream) As String Implements IRestFileService.UploadFile
        Dim name As String = Guid.NewGuid.ToString + System.IO.Path.GetExtension(fileName)
        Dim filePath As String = HttpContext.Current.Server.MapPath("~/uploadfiles/" + name)
        Using output As System.IO.FileStream = System.IO.File.OpenWrite(filePath)
            CopyStream(fileContents, output)
        End Using
        Return name
    End Function

    Private Shared Sub CopyStream(ByVal input As System.IO.Stream, ByVal output As System.IO.Stream)
        input.CopyTo(output)
    End Sub

    Public Function Test() As String Implements IRestFileService.Test
        Return String.Format("The upload time is {0}", Now.ToString)
    End Function

    Public Function GetFiles(num As String, status As String) As IList(Of String) Implements IRestFileService.GetFiles
        Return TJX.AJHB.MDA.Service.EnterpriseInfo.EnterpriseService.FindAttachFilesByNumAndStatus(num, status)
    End Function

    Public Function UploadFile2(file As TJX.AJHB.AppData.Contracts.File.UploadFileContract) As String Implements IRestFileService.UploadFile2
        Dim filePath As String = HttpContext.Current.Server.MapPath("~/uploadfiles")
        Dim name As String = TJX.AJHB.AppData.Contracts.File.FileHelper.SaveToFile(filePath, file.FileName, file.FileData)
        Return name
    End Function

    Public Function SaveImage() As String Implements IRestFileService.SaveImage
        Dim result As String = String.Empty
        If HttpContext.Current.Request.Files.Count > 0 Then
            Dim file = HttpContext.Current.Request.Files(0)
            Dim name As String = Guid.NewGuid.ToString + System.IO.Path.GetExtension(file.FileName)
            result = name
            Dim filePath As String = HttpContext.Current.Server.MapPath("~/uploadfiles/" + name)
            file.SaveAs(filePath)
        End If
        Return result
    End Function

    Public Function GetCurrentSituationQiYeImages(path As String) As System.Collections.Generic.List(Of String) Implements IRestFileService.GetCurrentSituationQiYeImages
        Dim result As New List(Of String)
        If Not String.IsNullOrEmpty(path) Then
            Dim basePath As String = "~/厂房空置照片/" + path
            Dim bp As String = "厂房空置照片/" + path
            Dim picPath As String = System.Web.HttpContext.Current.Server.MapPath(basePath)
            Dim files = FileHelper.GetFiles(picPath, ".jpg,.png")
            For Each f As System.IO.FileInfo In files
                Dim fullName As String = f.FullName
                Dim ff() As String = fullName.Split("\")
                Dim sublevel As String = ff(ff.Length - 2)
                If sublevel = path Then
                    result.Add(HttpContext.Current.Server.UrlEncode(bp + "/" + ff(ff.Length - 1)))
                Else
                    result.Add(HttpContext.Current.Server.UrlEncode(bp + "/" + ff(ff.Length - 2) + "/" + ff(ff.Length - 1)))
                End If
                '                Dim src As String = HttpContext.Current.Server.UrlEncode(bp + "/" + ff(ff.Length - 2) + "/" + ff(ff.Length - 1))
                '                result.Add(src)
            Next
        End If
        Return result
    End Function

    Public Function GetCurrentSituationLouYuImages(path As String) As System.Collections.Generic.List(Of String) Implements IRestFileService.GetCurrentSituationLouYuImages
        Dim result As New List(Of String)
        If Not String.IsNullOrEmpty(path) Then
            Dim basePath As String = "~/楼宇图片/" + path
            Dim bp As String = "楼宇图片/" + path
            Dim picPath As String = System.Web.HttpContext.Current.Server.MapPath(basePath)
            Dim files = FileHelper.GetFiles(picPath, ".jpg,.png")
            For Each f As System.IO.FileInfo In files
                Dim fullName As String = f.FullName
                Dim ff() As String = fullName.Split("\")
                Dim sublevel As String = ff(ff.Length - 2)
                If sublevel = path Then
                    result.Add(bp + "/" + ff(ff.Length - 1))
                Else
                    result.Add(bp + "/" + ff(ff.Length - 2) + "/" + ff(ff.Length - 1))
                End If

            Next
        End If
        Return result
    End Function

    Public Function CrossDomain(url As CrossDomainContract) As String Implements IRestFileService.CrossDomain
        Dim req As HttpWebRequest = WebRequest.Create(url.url)
        req.Method = "GET"

        Try
            Dim response As HttpWebResponse = req.GetResponse()
            Dim responseReader = New IO.StreamReader(response.GetResponseStream())
            Dim responseData_3 As String = responseReader.ReadToEnd()
            Return responseData_3
        Catch ex As Exception

        End Try
        Return String.Empty
    End Function

End Class
