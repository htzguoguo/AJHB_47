Imports Microsoft.VisualBasic
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports TTSK.Web.AuthorityEntry

<ServiceContract()>
Public Interface ICurrentSituationService

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/changfan")>
    Function GetCurrentSituation(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/changfanbasic")>
    Function GetCurrentSituationChangFan(ByVal item As TableFilterContract) As TableContract

    '<OperationContract()>
    '<WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/categorysummary")>
    'Function GetCurrentSituationCategorySummary(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/qiyekd")>
    Function GetCurrentSituationQiYeKD(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/qiye")>
    Function GetCurrentSituationQiYe(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/zulin")>
    Function GetCurrentSituationZuLin(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/bgly")>
    Function GetCurrentSituationBGLY(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/sum/louyu")>
    Function GetLouYuSummary(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/louyu")>
    Function GetCurrentSituationLouYu(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/kongzhi")>
    Function GetCurrentSituationKongZhi(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
  <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/chuzu")>
    Function GetCurrentSituationChuZu(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
 <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/yishou")>
    Function GetCurrentSituationYiShou(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
 <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="currentsituation/ziyong")>
    Function GetCurrentSituationZiYong(ByVal item As TableFilterContract) As TableContract

End Interface
