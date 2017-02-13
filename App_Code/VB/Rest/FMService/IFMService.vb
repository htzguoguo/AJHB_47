Imports Microsoft.VisualBasic
Imports System.ServiceModel
Imports System.ServiceModel.Web
Imports TTSK.Web.AuthorityEntry

<ServiceContract()>
Public Interface IFMService

    <OperationContract()>
   <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="filter/{guid}")>
    Function GetFilter(ByVal guid As String) As List(Of clsFMFilterTab)

    <OperationContract()>
    <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="table/{guid}")>
    Function GetTable(ByVal guid As String) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="chemical")>
    Function Getchemical(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="equipment")>
    Function GetSafetyEquipment(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="specialequipment")>
    Function GetSpecialEquipment(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="hazardidentification")>
    Function GetHazardIdentification(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="safetyinspection")>
    Function GetSafetyInspection(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="certification")>
    Function GetCertification(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/product")>
    Function GetEnvironmentalProduct(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental")>
    Function GetEnvironmental(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/wastewaterdischarge")>
    Function GetWastewaterDischarge(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/wastewaterpollutant")>
    Function GetWastewaterPollutant(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/exhaustport")>
    Function GetExhaustPort(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/exhaustpollutant")>
    Function GetExhaustPollutant(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/noise")>
    Function GetNoise(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/solidwaste")>
    Function GetSolidWaste(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/wastesite")>
    Function GetWasteSite(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/productionunit")>
    Function GetProductionUnit(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/productionplantpollutants")>
    Function GetProductionPlantPollutants(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="enterpriserating")>
    Function GetEnterpriseRating(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="enterprisename")>
    Function GetEnterpriseNames(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
   <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="onsite/check")>
    Function GetOnSiteCheck(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
 <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="onsite/fddd/{datetype}")>
    Function GetOnSiteCheck1(ByVal item As TableFilterContract, ByVal datetype As String) As TableContract

    <OperationContract()>
    <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="chemical/{datetype}/{grouptype}")>
    Function GetChemicalReport(ByVal item As TableFilterContract, ByVal datetype As String, ByVal grouptype As String) As TableContract

    <OperationContract()>
 <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="onsite/warning")>
    Function GetOnSiteWarning(ByVal item As TableFilterContract) As TableContract

    <OperationContract()>
    <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="onsite/stat/year")>
    Function GetOnSiteStatByYear() As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly

    <OperationContract()>
    <WebGet(RequestFormat:=WebMessageFormat.Json, responseformat:=WebMessageFormat.Json, UriTemplate:="onsite/stat/month/{month}")>
    Function GetOnSiteStatByMonth(ByVal month As String) As TJX.AJHB.AppData.Contracts.OnSite.Stat.StatYearly

    <OperationContract()>
   <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="summary/?guid={guid}&filter={filter}")>
    Function GetSummary(ByVal guid As String, ByVal filter As String) As List(Of String)

End Interface
