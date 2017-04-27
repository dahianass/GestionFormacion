<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker.min.css" />
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/css/datepicker3.min.css" />
    <link href="../Content/style.css" rel="stylesheet" />
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="container">
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
				  <div class="col-md-4 form-group">
					<label for="Responsable" class="col-sm-4 control-label">Responsable</label>
					<div class="col-sm-8">
					  <input type="text" class="form-control" id="Responsable">
					</div>
				  </div>
				  <div class="col-md-4 form-group">
					<label for="Estado" class="col-sm-2 control-label">Estado</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control" id="Estado">
					</div>
				  </div>
				  <div class="col-md-4 form-group">
					<div class="checkbox form-group">
					<label>
					  <input type="checkbox" id="AprobadaOk">
					  Aprobada
					</label>
				   </div>
				  </div>
				  <div class="col-md-4 form-group">
					<label for="fechaPago" class="col-sm-5 control-label marginMenor">Fecha de pago</label>
					<div class='input-group date' id='datetimepicker1'>
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
					<div class="col-md-3 form-group">
						<label for="tdFormacion" class="col-sm-7 control-label">Tipo de formación</label>
							<div class="dropdown">
							  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								Selecione
								<span class="caret"></span>
							  </button>
							  <ul class="dropdown-menu tcurso" aria-labelledby="dropdownMenu1">
								<li><a href="#">Seminario</a></li>
								<li><a href="#">Curso</a></li>
								<li><a href="#">Capacitación</a></li>
							  </ul>
							</div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="Solicitante" class="col-sm-5 control-label">Solicitante</label>
					  <div class="col-sm-7">
						<Span class="name">Jorge Luis Lopez</span>
					  </div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="fechaSolicitud" class="col-sm-5 control-label">Fecha de solicitud</label>
					  <div class='input-group date' id='datetimepicker1'>
						  <input type='text' class="form-control" />
						  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
						  </span>
					  </div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="fechaFinIn" class="col-sm-5 control-label">Fecha fin inicio</label>
					  <div class= 'input-group date' id='datetimepicker1'>
						  <input type='text' class="form-control" />
						  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
						  </span>
					  </div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="Clasificacion" class="col-sm-7 control-label">Clasificación</label>
						<div class="dropdown">
							  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								Selecione
								<span class="caret"></span>
							  </button>
							  <ul class="dropdown-menu tcurso" aria-labelledby="dropdownMenu1">
								<li><a href="#">Externa</a></li>
								<li><a href="#">Interna</a></li>
							  </ul>
							</div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="Duracion" class="col-sm-4 control-label">Duración</label>
					  <div class="col-sm-4">
						<input type="text" class="form-control" id="Duracion">
					  </div>
					  <span for="Horas" class="col-sm-4 control-label Horas">Horas</span>
					</div>
					<div class="col-md-3 form-group">
					  <label for="Evaluacion" class="col-sm-7 control-label">Evaluación</label>
						<div class="dropdown">
							  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
								Selecione
								<span class="caret"></span>
							  </button>
							  <ul class="dropdown-menu tcurso" aria-labelledby="dropdownMenu1">
								<li><a href="#">Por definir</a></li>
								<li><a href="#">Interna</a></li>
							  </ul>
							</div>
					</div>
					<div class="col-md-3 form-group">
					  <label for="Cupos" class="col-sm-4 control-label">Cupos</label>
					  <div class="col-sm-8">
						<input type="text" class="form-control" id="Cupos">
					  </div>
					</div>
			  </div>
			</div>
			  <div class="row">
				<div class="col-md-6 form-group">
				  <label for="Entidad" class="col-sm-2 control-label Entidad">Entidad</label>
				  <div class="col-sm-10">
					<input type="text" class="form-control" id="Entidad">
				  </div>
				</div>
				  <div class="col-md-3">
					<label for="VInd" class="col-sm-5 control-label">Valor individual</label>
					<div class="col-sm-7">
					  <input type="text" class="form-control" id="VInd">
					</div>
				  </div>
				  <div class="col-md-3">
					<label for="totalCurso" class="col-sm-5 control-label">Total curso</label>
					<div class="col-sm-7">
					  <input type="text" class="form-control" id="inputEmail3">
					</div>
				  </div>
			  </div>
			  <div class="row maxMargin">
				<div class="col-md-6 form-group">
				  <label for="Rango" class="col-sm-3 control-label">Rango</label>
				  <div class="col-sm-4">
					  <div><input type="checkbox" checked>Directores y Personal</div>
					  <div><input type="checkbox">Gerente</div>
				  </div>
				</div>
			  </div>
			  <div class="row maxMargin">
				<div class="col-md-3 form-group">
					<label for="Rango" class="col-sm-3 control-label">Viajes</label>
					  <div class="col-sm-4">
						  <div><input type="checkbox" checked></div>
				 </div>
				</div>
				<div class="col-md-3 form-group">
				  <label for="fechaFinIn" class="col-sm-5 control-label">Fin inicio</label>
				  <div class='input-group date' id='datetimepicker1'>
					  <input type='text' class="form-control" />
					  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
					  </span>
				  </div>
				</div>
				<div class="col-md-3 form-group">
				  <label for="fechaFin" class="col-sm-5 control-label">Fin fin</label>
				  <div class='input-group date' id='datetimepicker1'>
					  <input type='text' class="form-control" />
					  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
					  </span>
				  </div>
				</div>
			  </div>
			  <div class="row maxMargin">
				<div class="col-md-3">
				  <label for="valorV" class="col-sm-5 control-label">Valor viáticos</label>
				  <div class="col-sm-7">
					<input type="text" class="form-control" id="ValorViatico">
				  </div>
				</div>
				<div class="col-md-3">
				  <label for="valorT" class="col-sm-5 control-label">Valor tiquete</label>
				  <div class="col-sm-7">
					<input type="text" class="form-control" id="ValorTiquete">
				  </div>
				</div>
				<div class="col-md-3">
				  <label for="ValorTr" class="col-sm-5 control-label">Valor Transporte</label>
				  <div class="col-sm-7">
					<input type="text" class="form-control" id="ValorTransporte">
				  </div>
				</div>
				<div class="col-md-3">
				  <label for="ValorH" class="col-sm-5 control-label">Valor Hotel</label>
				  <div class="col-sm-7">
					<input type="text" class="form-control" id="ValorHotel">
				  </div>
				</div>

			  </div>
			  <div class="row maxMargin">
				<div class="col-md-3 pull-right">
				  <label for="totalCurso" class="col-sm-5 control-label">Total</label>
				  <div class="col-sm-7">
					<input type="text" class="form-control" id="inputEmail3">
				  </div>
				</div>
			  </div>
	  		<div class="ContenedorForm">
			<div class="row">
				<div class="col-md-6" >
					<div class="Fila"><span>Area:</span></div>
					<div class="col-md-6"><input class="form-control" id="area"></div>
					<span class="glyphicon glyphicon-plus-sign SpanL"></span>
				</div>
				<div class="col-md-6" >
					<div class="Fila"><span class="">Asistente:</span> </div>
					<div class="col-md-6"><input class="form-control" /></div>
					<span class="glyphicon glyphicon-plus-sign SpanL"></span>
				</div>
			</div>		
			<div class="row contenedorDos">
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
			<div class="aprendido">
				<p>Temario</p>
				<textarea class="form-control"></textarea>
			</div>
			<div class="aprendido">
				<p>Observaciones</p>
				<textarea class="form-control"></textarea>
			</div>
			</div>
		</div>
		<div class="panel panel-default">
				<div class="panel-heading">Anexos </div>
					<div class="panel-body">
						<div class="fileUpload btn btn-primary" id="anexar">
							<span>Anexar <span class="glyphicon glyphicon-upload"></span></span>
							<input id="uploadBtn" type="file" class="upload" />
						</div>
						<div class="panel panel-primary">
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
				</div>
	</div>
</asp:Content>
