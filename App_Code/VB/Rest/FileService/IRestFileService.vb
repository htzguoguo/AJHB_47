Imports Microsoft.VisualBasic
Imports System.ServiceModel
Imports TJX.AJHB.AppData.Contracts

<ServiceContract()>
Public Interface IRestFileService

    <OperationContract()>
    <WebInvoke(method:="POST", ResponseFormat:=WebMessageFormat.Json, UriTemplate:="file/{fileName}")>
    Function UploadFile(ByVal fileName As String, ByVal fileContents As System.IO.Stream) As String

    <OperationContract()>
    <WebInvoke(BodyStyle:=WebMessageBodyStyle.Wrapped, Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="image")>
    Function SaveImage() As String

    <OperationContract()>
   <WebInvoke(method:="POST", requestformat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="file")>
    Function UploadFile2(ByVal file As File.UploadFileContract) As String

    <OperationContract()> _
    <WebGet(RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="test")> _
    Function Test() As String

    <OperationContract()> _
   <WebGet(RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="file/{num}/{status}")> _
    Function GetFiles(ByVal num As String, ByVal status As String) As IList(Of String)

    <OperationContract()>
 <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/qiye/images/{path}")>
    Function GetCurrentSituationQiYeImages(ByVal path As String) As List(Of String)

    <OperationContract()>
    <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/louyu/images/{path}")>
    Function GetCurrentSituationLouYuImages(ByVal path As String) As List(Of String)

    <OperationContract()>
    <WebInvoke(method:="POST", RequestFormat:=WebMessageFormat.Json, UriTemplate:="url")>
    Function CrossDomain(ByVal item As CrossDomainContract) As String

End Interface
