Imports Microsoft.VisualBasic
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports TJX.AJHB.AppData.Contracts
Imports TTSK.Web.AuthorityEntry

<ServiceContract()> _
Public Interface IRestLoginService


    <OperationContract()>
    <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="menu")>
    Function GetMenu() As String

    <OperationContract()> _
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="login")> _
    Function Login(ByVal token As LogTokenContract) As ResponseContract

    <OperationContract()> _
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="logout")> _
    Function Logout() As ResponseContract

    <OperationContract()> _
  <WebGet(RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="test")> _
    Function Test() As String



End Interface
