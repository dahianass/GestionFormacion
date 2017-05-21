<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link href="../Content/common.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="MenuLateral">
			<div class="panel panel-primary">
				<div class="panel-heading center">MENú</div>
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
    <div class="Contenedor">
     <div class="panel-heading">Todas las solicitudes</div>
      <table class="table table-striped">
      <thead>
        <th>id</th>
        <th>Título</th>
        <th>Fecha solicitud</th>
        <th>Tipo de formación</th>
        <th>Duración en horas</th>
        <th>Numero de personas</th>
        <th>Fecha Propuesta</th>
        <th>Valor</th>
        <th>Estado</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Capacitación de excel</td>
          <td>24/05/2017</td>
          <td>Seminario</td>
          <td>16</td>
          <td>8</td>
          <td>26/06/2017</td>
          <td>$7.000.000</td>
          <td>Aprobada</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Conocimientos básicos de Hardware</td>
          <td>02/04/2017</td>
          <td>Curso</td>
          <td>24</td>
          <td>12</td>
          <td>1/06/2017</td>
          <td>$1.000.000</td>
          <td>Presupuestada</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Manejo del tiempo</td>
          <td>01/04/2017</td>
          <td>Curso</td>
          <td>4</td>
          <td>12</td>
          <td>24/05/2017</td>
          <td>$2.000.000</td>
          <td>En curso</td>
        </tr>
    </div>
 
</asp:Content>
