<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />

    <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/common.css" rel="stylesheet" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script data-require="angular.js@1.4.8" data-semver="1.4.8" src="https://code.angularjs.org/1.4.8/angular.js"></script>
    <script data-require="angular-route@*" data-semver="1.4.8" src="https://code.angularjs.org/1.4.8/angular-route.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular-animate.js"></script>
    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-1.2.1.js"></script>
    <script src="../Scripts/Underscore.js"></script>
    <script src="../Scripts/App/App.Inicio.js"></script>
    <script src="../Scripts/Controller/Inicio.Controller.js"></script>
    <script src="../Scripts/Controller/apiRest.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div ng-app="InicioApp" class="ContenedorPadre">
        <div ng-controller="InicioController as vm" class="ContenedorZ">
            <div class="MenuLateral">
                <div class="panel panel-primary">
                    <div class="panel-heading center">MENÚ</div>
                    <div class="btn-group-vertical" role="group" aria-label="">
                        <button type="button" class="btn btn-default left" onclick="window.location='MisFormaciones.aspx';">Mis Formaciónes</button>
                        <button type="button" class="btn btn-default left" onclick="window.location='MisSolicitudes.aspx';">Mis Solicitudes</button>
                        <button type="button" class="btn btn-default left" onclick="window.location='Solicitud.aspx';">Crear solicitudes de formación</button>
                        <button ng-show="mostrarPlan" type="button" class="btn btn-default left" onclick="window.location='PlanEstrategico.aspx';">Plan estratégico</button>
                        <button type="button" class="btn btn-default left" onclick="window.location='SolicitudesAsignadas.aspx';">Solicitudes asignadas a mí</button>
                        <button type="button" class="btn btn-default left" onclick="window.location='TodasSolicitudes.aspx';">Todas las solicitudes</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="Carousel">
                    <div style="height: 305px; width: 70%; margin-left: 11%;">
                        <uib-carousel interval="vm.myInterval">
                    <uib-slide ng-repeat="slide in vm.slides" active="vm.active" index="$index">
                      <img ng-src="{{slide.Imagen}}" style="margin:auto;" />
                      <div class="carousel-caption">
                      </div>
                    </uib-slide>
                </uib-carousel>
                    </div>
                </div>
            </div>
            <div class="row MT2">
                <div class="col-md-3 BottonsMenuMain" onclick="window.location='MisFormaciones.aspx';">
                    <div class="imgAr"><img ng-src="{{vm.opcion1.Imagen}}"  width="100%" height="100%" /></div>
<%--                    MIS FORMACIONES--%>
                    <div class="title"><span>MIS FORMACIONES</span></div>
                </div>
                <div class="col-md-1 "></div>
                <div class="col-md-3 BottonsMenuMain" onclick="window.location='Solicitud.aspx';">
                    <div class="imgAr"><img ng-src="{{vm.opcion2.Imagen}}"  width="100%" height="100%"/></div>
<%--                    CREAR SOLICITUD--%>
                    <div class="title"><span>CREAR SOLICITUD</span></div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-3 BottonsMenuMain" onclick="window.location='TodasSolicitudes.aspx';">
                    <div class="imgAr"><img ng-src="{{vm.opcion3.Imagen}}"  width="100%" height="100%" /></div>
<%--                    TODAS LAS SOLICITUDES--%>
                    <div class="title"><span>TODAS LAS SOLICITUDES</span></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
