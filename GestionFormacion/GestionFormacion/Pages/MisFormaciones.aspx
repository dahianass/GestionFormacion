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
    	<div class="ContenedorPrincipal">
		<div class="MenuLateral">
			<div class="panel panel-primary">
				<div class="panel-heading center">MENú</div>
				<div class="btn-group-vertical" role="group" aria-label="">
					<button type="button" class="btn btn-default left">Mis Formaciónes</button>
					<button type="button" class="btn btn-default left">Crear solicitudes de formación</button>
					<button type="button" class="btn btn-default left">Solicitudes</button>
				</div>
			</div>
		</div>
		<div class="Contenedor">
			<div class="TablaFormaciones panel panel-primary" >
			<div class="panel-heading">MIS FORMACIONES</div>
				<table class="table table-striped">
				<thead>
					<th>#</th>
					<th>Título de formactión</th>
					<th>Fecha de inicio</th>
					<th>Fecha de fin</th>
					<th>Certificado</th>
					<th></th>
					<th>Encuesta</th>
					<th></th>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Capacitación de Base de datos</td>
						<td>25/04/2017</td>
						<td>24/05/2017</td>
						<td>Pendiente</td>
						<td>
							<button type="button" class="btn btn-default btn-xs noStyle" data-toggle="modal" data-target="#ModalArchivo">
								<span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
							</button>
						</td>
						<td>Pendiente</td>
						<td>
							<button type="button" class="btn btn-default btn-xs noStyle" data-toggle="modal" data-target="#ModalEncuesta">
								<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
							</button>
						</td>
					</tr>								
					<tr>
						<td>2</td>
						<td>Movimiento de información</td>
						<td>25/04/2016</td>
						<td>24/05/2016</td>
						<td>Anexado</td>
						<td></td>
						<td>Realizada</td>
						<td></td>
					</tr>	
					<tr>
						<td>3</td>
						<td>Mejorar la capacidad de comunicación</td>
						<td>02/09/2016</td>
						<td>28/05/2016</td>
						<td>Anexado</td>
						<td></td>
						<td>Pendiente</td>
						<td>
							<button type="button" class="btn btn-default btn-xs noStyle" data-toggle="modal" data-target="#ModalEncuesta">
								<span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>
							</button>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Utilidades de Hardware</td>
						<td>1/06/2017</td>
						<td>15/06/2017</td>
						<td>Pendiente</td>
						<td>
							<button type="button" class="btn btn-default btn-xs noStyle"  data-toggle="modal" data-target="#ModalArchivo">
								<span class="glyphicon glyphicon-upload" aria-hidden="true"></span>
							</button></td>
						<td>Realizada</td>
						<td></td>
					</tr>					
				</tbody>
				
			</table>
			</div>
		</div>
	</div>
	
<!-- ModalEncuesta -->
<div class="modal fade" id="ModalEncuesta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog escuestaModal" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Encuesta de formación</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="row">
			<div class="col-md-4" >
				<label for="NombreAsistente">Nombre</label>
				<label class="form-control" id="nombreAsistente">Marcela Arango</label>
			</div>
			<div class="col-md-4" >
				<label for="CargoAsistente">Cargo</label>
				<label class="form-control" id="CargoAsistente">Contador</label>
			</div>
			<div class="col-md-4" >
				<label for="FormacionAsistente">Formación</label>
				<label class="form-control" id="FormacionAsistente">Curso de Excel</span>
			</div>
		</div>	
		<div class="row contenedorDos">
			<div class="col-md-6" >
				<label for="tipoFormacionAsistente">Tipo de formación</label>
				<label class="form-control" id="tipoFormacionAsistente">Seminario</span>
			</div>
			<div class="col-md-6" >
				<label for="entidadAsistente">Entidad</label>
				<label class="form-control" id="entidadAsistente">Universidad Javeriana</span>
			</div>
		</div>	
		<div class="aprendido" >
			<p>De lo que aprendió en el evento en el evento al que asistió qué cree que puede aplicar en su proceso o a de acuerdo con la responsabilidad , autoridad y/o roles asignados.</p>
			<textarea class="form-control"></textarea>
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>

<!-- ModalCertificados -->
<div class="modal fade" id="ModalArchivo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Subir Certificado</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		
			<div class="fileUpload btn btn-primary" id="anexar">
				<span> Anexar certificados <span class="glyphicon glyphicon-upload"></span></span>
				<input id="uploadBtn" type="file" class="upload" />
			</div>

			<div class="panel panel-primary">
				<div class="panel-heading center">Certificados</div>
				<table class="table table-striped">
					<thead>
						<th>#</th>
						<th>Nombre del Archivo</th>
						<th>Fecha</th>
						<th>Tipo</th>
					</thead>
					<tbody id="listaClientes">
						<tr>
							<th>1</th>
							<th>Documento</th>
							<th>25/04/2017</th>
							<th>pdf</th>
						</tr>
						<tr>
							<th>2</th>
							<th>Certificado</th>
							<th>27/04/2017</th>
							<th>pdf</th>
						</tr>
					</tbody>
				</table>
			</div>	
		</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>
</asp:Content>
