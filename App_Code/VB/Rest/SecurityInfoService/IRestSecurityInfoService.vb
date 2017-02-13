Imports Microsoft.VisualBasic
Imports TJX.AJHB.AppData.Contracts

Namespace VB.Rest.SecurityInfoService

    <ServiceContract()>
    Public Interface IRestSecurityInfoService

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="enterprise/{user}")> _
        Function AddSecurityInfo(ByVal pf As SecurityInfo.SecurityInfoContract, ByVal user As String) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="enterprise/{name}")> _
        Function UpdateSecurityInfo(ByVal pf As SecurityInfo.SecurityInfoEditUIContract, ByVal name As String) As ResponseContract

        <OperationContract()>
         <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="enterprise/{name}")>
        Function GetSecurityInfo(ByVal name As String) As SecurityInfo.SecurityInfoUIContract

        <OperationContract()>
        <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="enterprise/key/{key}")>
        Function GetSecurityInfoByNum(ByVal key As String) As SecurityInfo.SecurityInfoUIContract

        <OperationContract()>
        <WebGet(responseformat:=WebMessageFormat.Json, UriTemplate:="enterprise/ed/{name}")>
        Function GetSecurityEditInfoByName(ByVal name As String) As SecurityInfo.SecurityInfoEditUIContract

        <OperationContract()> _
       <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="enterprise/{key}")> _
        Function DeleteSecurityInfo(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemical/{user}")> _
        Function AddChemical(ByVal item As SecurityInfo.DangerousChemicals, ByVal user As String) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemical/{key}")> _
        Function UpdateChemical(ByVal item As SecurityInfo.ChemicalContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemical/{key}")> _
        Function DeleteChemical(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemical/{key}")> _
        Function GetChemical(ByVal key As String) As TJX.AJHB.AppData.Contracts.SecurityInfo.ChemicalContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="equipment/{user}")> _
        Function AddEquipment(ByVal item As SecurityInfo.SafetyEquipmentContract, ByVal user As String) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="equipment/{key}")> _
        Function DeleteEquipment(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="equipment/{key}")> _
        Function EditEquipment(ByVal item As SecurityInfo.SafetyEquipmentContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="equipment/key/{key}")> _
        Function GetEquipment(ByVal key As String) As SecurityInfo.SafetyEquipmentContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="specialequipment")> _
        Function AddSpecialEquipment(ByVal item As SecurityInfo.SpecialEquipmentContract) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="specialequipment/{key}")> _
        Function EditSpecialEquipment(ByVal item As SecurityInfo.SpecialEquipmentContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="specialequipment/{key}")> _
        Function DeleteSpecialEquipment(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(ResponseFormat:=WebMessageFormat.Json, UriTemplate:="specialequipment/{key}")> _
        Function GetSpecialEquipment(ByVal key As String) As SecurityInfo.SpecialEquipmentContract


        <OperationContract()> _
        <WebGet(RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="equipment/{name}")> _
        Function FindDeviceNameByEnterpriseName(ByVal name As String) As System.Collections.Generic.IList(Of String)

        <OperationContract()> _
            <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="hazardidentification/{user}")> _
        Function AddHazardIdentification(ByVal item As SecurityInfo.HazardIdentificationContract, ByVal user As String) As ResponseContract

        <OperationContract()> _
           <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="hazardidentification/{key}")> _
        Function UpdateHazardIdentification(ByVal item As SecurityInfo.HazardIdentificationContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="hazardidentification/{key}")> _
        Function DeleteHazardIdentification(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(ResponseFormat:=WebMessageFormat.Json, UriTemplate:="hazardidentification/{key}")> _
        Function GetHazardIdentification(ByVal key As String) As SecurityInfo.HazardIdentificationContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="safetyinspection/{user}")> _
        Function AddSafetyInspection(ByVal item As SecurityInfo.SafetyInspectionContract, ByVal user As String) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="safetyinspection/{key}")> _
        Function UpdateSafetyInspection(ByVal item As SecurityInfo.SafetyInspectionContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="safetyinspection/{key}")> _
        Function DeleteSafetyInspection(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(ResponseFormat:=WebMessageFormat.Json, UriTemplate:="safetyinspection/{key}")> _
        Function GetSafetyInspection(ByVal key As String) As SecurityInfo.SafetyInspectionContract

        <OperationContract()> _
       <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="certification/{user}")> _
        Function AddCertification(ByVal item As SecurityInfo.CertificationContract, ByVal user As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="PUT", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="certification/{key}")> _
        Function UpdateCertification(ByVal item As SecurityInfo.CertificationContract, ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="certification/{key}")> _
        Function DeleteCertification(ByVal key As String) As ResponseContract

        <OperationContract()> _
        <WebGet(ResponseFormat:=WebMessageFormat.Json, UriTemplate:="certification/{key}")> _
        Function GetCertification(ByVal key As String) As SecurityInfo.CertificationContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="onsiteinspection")> _
        Function AddOnsiteInspection(ByVal item As Inspection.OnSiteInspectionContract) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="DELETE", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="onsiteinspection/{key}")> _
        Function DeleteOnsiteInspection(ByVal key As String) As ResponseContract

       

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemicaldailyreport")> _
        Function AddChemicalDailyReport(ByVal item As SecurityInfo.ChemicalContract) As ResponseContract

        <OperationContract()> _
        <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="onsiteinspection/reply/{key}")> _
        Function AddOnsiteReply(ByVal key As String, ByVal item As Inspection.OnSiteInspectionContract) As ResponseContract

        <OperationContract()> _
       <WebInvoke(Method:="POST", RequestFormat:=WebMessageFormat.Json, ResponseFormat:=WebMessageFormat.Json, UriTemplate:="chemicaldailybatchreport")> _
        Function AddChemicalDailyBatchReport(ByVal item As List(Of SecurityInfo.ChemicalContract)) As ResponseContract

    End Interface
End Namespace