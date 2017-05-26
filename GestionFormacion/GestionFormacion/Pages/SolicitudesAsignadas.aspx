<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link href="../Content/common.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.rtl.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.silver.min.css" />


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.1.118/js/kendo.all.min.js"></script>
    <script src="../Scripts/Underscore.js"></script>
    <script src="../Scripts/App/App.SolicitudesAsignadas.js"></script>
    <script src="../Scripts/Controller/SolicitudesAsignadas.Controller.js"></script>
    <script src="../Scripts/Controller/apiRest.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="ContenedorPrincipal" ng-app="SolicitudesAsignadasApp" ng-controller="SolicitudesAsignadasController as vm">
        <div class="MenuLateral">
            <div class="panel panel-primary">
                <div class="panel-heading center">MENÚ</div>
                <div class="btn-group-vertical" role="group" aria-label="">
                    <button type="button" class="btn btn-default left" onclick="window.location='MisFormaciones.aspx';">Mis formaciónes</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='MisSolicitudes.aspx';">Mis solicitudes</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='Solicitud.aspx';">Crear solicitudes de formación</button>
                    <button  ng-show="mostrarPlan" type="button" class="btn btn-default left" onclick="window.location='PlanEstrategico.aspx';">Plan estratégico</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='SolicitudesAsignadas.aspx';">Solicitudes asignadas a mí</button>
                    <button ng-show="vm.mostrarTodos"  type="button" class="btn btn-default left" onclick="window.location='TodasSolicitudes.aspx';">Todas las solicitudes</button>
                </div>
            </div>
        </div>
        <div class="Contenedor ContenedorL">
            <div class="TablaSolicitudesAsignadas panel panel-primary">
                <div class="panel-heading">SOLICITUDES ASIGNADAS A MÍ</div>
                <div id="kg-Todas" kendo-grid="kgTodas" k-options="reporteTodasOptions"></div>
            </div>
        </div>
    </div>
</asp:Content>
