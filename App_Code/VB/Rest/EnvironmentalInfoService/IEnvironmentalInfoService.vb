Imports Microsoft.VisualBasic
Imports TJX.AJHB.AppData.Contracts
Namespace VB.Rest.EnvironmentalInfoService

    <ServiceContract()>
      Public Interface IEnvironmentalInfoService

        <OperationContract()>
       <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="environmental/{name}")>
        Function GetEnvironmentalInfo(ByVal name As String) As TJX.AJHB.AppData.Contracts.Environmental.EnvironmentalContract

        <OperationContract()> _
       <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="lims")> _
        Function AddLims(ByVal item As Environmental.EmissionMonitoringContract) As ResponseContract

    End Interface
End Namespace