<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../Scripts/App/App.Solicitud.js"></script>
    <script src="../Scripts/Controller/Solicitud.Controller.js"></script>
    <script src="../Scripts/Controller/apiRest.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.min.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker3.min.css" />
    <link href="../Content/style.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="container" class="container" ng-app="SolicitudApp"  ng-controller="SolicitudController as vm">
		<div class="row">
			<div class="col-md-12 form-group">
				<button class="btn btn-primary pull-right mr-2" type="button">Cancelar</button>
				<button class="btn btn-primary pull-right mr-2" type="submit">Guardar</button>
				<button class="btn btn-primary pull-right mr-2" type="button">Cerrar</button>
			</div>
		</div>
		
		<div class="panel panel-primary">
            <div class="panel-heading">Información del revisor</div>
            <div class="panel-body">
				<div class="row">
					<div class="col-md-4">
						<label>Responsable</label>
						<label class="form-control"></label>
					</div>
					<div class="col-md-4">
						<label>Estado</label>
						<label class="form-control"></label>
					</div>
					<div class="col-md-4 pt2">
						<div class="input-group">
							<span class="input-group-addon">
							<input type="checkbox" aria-label="...">
							</span>
							<label class="form-control">Aprobada</label>
						</div>
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-4">
						<label>Fecha de pago</label>
						<div class="input-group">
							<input type='text' class="form-control" />
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>	
					<div class="col-md-4">
						<label>Solicitante</label>
						<label class="form-control">{{vm.Solicitante}}</label>
					</div>
					<div class="col-md-4">
						<label for="fechaSolicitud">Fecha de solicitud</label>
						<div class='input-group'>
							  <input type='text' class="form-control" />
							  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
							  </span>
						</div>
					</div>
			  </div>
			</div>
		</div>
		
		<div class="panel panel-primary">
            <div class="panel-heading">Información del solicitante</div>
            <div class="panel-body">
				<div class="row">
					<div class="col-md-3">
						<label>Tipo de formación</label>
							<select class="form-control" ng-model="vm.SelectTipFormacion" ng-options="tipos.Title for tipos in vm.TiposFormaciones track by tipos.ID ">
                                <option value="">Seleccione</option>
							</select>
					</div>
					<div class="col-md-3">
						<label>Fecha fin inicio</label>
						<div class='input-group'>
							<input type='text' class="form-control" />
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
					<div class="col-md-3">
						<label>Clasificación</label>
						<select class="form-control" ng-model="vm.SelectClasificacion" ng-options="Clasificacion.Title for Clasificacion in vm.Clasificaciones track by Clasificacion.ID ">
                                <option value="">Seleccione</option>
						</select>
					</div>
					<div class="col-md-3">
						<label>Duración</label>
						<div class='input-group'>
							<input type="text" class="form-control">
							<span class="input-group-addon">Horas</span>
						</div>	
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-3">
						<label>Evaluación</label>
						<select class="form-control" ng-model="vm.SelectEvaluacion" ng-options="Evaluacion.Title for Evaluacion in vm.Evaluaciones track by Evaluacion.ID ">
                                <option value="">Seleccione</option>
						</select>	
					</div>
					<div class="col-md-3">
						<label>Cupos</label>
						<input type="text" class="form-control" id="Cupos">
					</div>
					<div class="col-md-6">
						<label>Entidad</label>
						<input type="text" class="form-control" id="Cupos">
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-3">
						<label>Valor individual</label>
						<input type="text" class="form-control">
					</div>
					<div class="col-md-3">
						<label>Total curso</label>	
						<input type="text" class="form-control">
					</div>
					<div class="col-md-3">
						<label>Rango</label>
						<div class="" ng-repeat="Rango in vm.Rangos">
							<div><input type="checkbox"  name="NombreRango" value="{{Rango}}" ng-model="Rango.selected">{{Rango.Title}}</input></div>
						</div>
					</div>
					<div class="col-md-3 pt2">
						<div class="input-group">
							<span class="input-group-addon">
							<input type="checkbox"  ng-model="checked" aria-label="...">
							</span>
							<label class="form-control">Viajes</label>
						</div>
					</div>
				</div>
				
				<div class="row MT2">

					<div class="col-md-3">  
						<label>Fin inicio</label>
						<div class='input-group'>
							<input type='text' class="form-control" />
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
					<div class="col-md-3">
						<label for="fechaFin">Fin fin</label>
						<div class='input-group'>
							<input type='text' class="form-control" />
							<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>
					</div>
					<div class="col-md-3">
						<label>Total</label>
						<input type="text" class="form-control" id="inputEmail3">
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-6" >
						<label>Area</label>
						<div class="input-group"><input class="form-control" id="area">
							<span class="input-group-addon"><span class="glyphicon glyphicon-plus-sign SpanL"></span></span>
						</div>
					</div>
					<div class="col-md-6" >
						<label >Asistente:</label>
						<div class="input-group"><input class="form-control" />
							<span class="input-group-addon"><span class="glyphicon glyphicon-plus-sign SpanL"></span></span>
						</div>
					</div>
				</div>		
				<div class="row MT2">
					<div class="col-md-6">
						<div class="contenedorSombra">
							<span>Area</span>
								<div class="checkbox form-group">
									<div><input type="checkbox">Sistemas</div>
									<div><input type="checkbox" checked>Contabilidad</div>
									<div><input type="checkbox">Legal</div>
								</div>
							<button type="button" class="btn btn-primary botonIzquierda">Eliminar</button>	
						</div>
					</div>
					<div class="col-md-6">
						<div class="contenedorSombra">
							<span>Asistentes</span>
							<div class="checkbox form-group">
								<div><input type="checkbox" checked>Andres Zapata</div>
								<div><input type="checkbox">Fernanda Salgado</div>
								<div><input type="checkbox" checked>Daniel Alvares</div>
							</div>
							<button type="button" class="btn btn-primary botonIzquierda">Eliminar</button>
						</div>
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-12 MT2">
						<Label>Temario</Label>
						<textarea class="form-control"></textarea>
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-12 MT2">
						<Label>Observaciones</Label>
						<div class="panel panel-default">
							<table class="table table-striped">
								<thead>
									<th>#</th>
									<th>Observación</th>
									<th>Autor</th>
								</thead>
								<tbody id="listaClientes">
									<tr>
										<td>1</td>
										<td>El seminario fue muy...</td>
										<td>Jose Camaro</td>
									</tr>
								</tbody>
							</table>
						</div>	
					</div>
				</div>
			</div>
		</div>
	
		<div class="panel panel-primary" ng-show="checked">
            <div class="panel-heading">Información de viaje</div>
            <div class="panel-body">
				<div class="row">
					<div class="col-md-4" >
						<label >Valor viáticos</label>
						<Input class="form-control"></input>
					</div>
					<div class="col-md-4" >
						<label>Valor tiquete</label>
						<Input class="form-control"></input>
					</div>
					<div class="col-md-4" >
						<label>Valor Transporte</label>
						<Input class="form-control"></input>
					</div>
				</div>
				<div class="row MT2">
					<div class="col-md-4" >
						<label>Valor Hotel</label>
						<Input class="form-control"></input>
					</div>	
				</div>
			</div>
		</div>
		
		<div class="panel panel-primary">
				<div class="panel-heading">Anexos </div>
					<div class="panel-body">
						<div class="fileUpload btn btn-primary" id="anexar">
							<span>Anexar <span class="glyphicon glyphicon-upload"></span></span>
							<input id="uploadBtn" type="file" class="upload" />
						</div>
						<div class="panel panel-default">
							<table class="table table-striped">
								<thead>
									<th>#</th>
									<th>Nombre del Archivo</th>
									<th>Fecha</th>
									<th>Tipo</th>
								</thead>
								<tbody id="listaClientes">
									<tr>
										<td>1</td>
										<td>Documento</td>
										<td>25/04/2017</td>
										<td>pdf</td>
									</tr>
									<tr>
										<td>2</td>
										<td>Certificado</td>
										<td>27/04/2017</td>
										<td>pdf</td>
									</tr>
								</tbody>
							</table>
						</div>	
					</div>	
		</div>
	</div>
</asp:Content>
