﻿<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.rtl.min.css" />
    <link rel="stylesheet" href="https://kendo.cdn.telerik.com/2017.1.118/styles/kendo.silver.min.css" />

    <link href="../Content/style.css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
    <script src="../Scripts/Underscore.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://kendo.cdn.telerik.com/2017.1.118/js/kendo.all.min.js"></script>
    <script src="../Scripts/Checklist-model.js"></script>

    <script src="../Scripts/App/App.Solicitud.js"></script>
    <script src="../Scripts/Controller/Solicitud.Controller.js"></script>
    <script src="../Scripts/Controller/apiRest.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="container mainPrincipal" ng-app="SolicitudApp" ng-controller="SolicitudController as vm">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
        <div class="alert alert-success" role="alert" ng-show="vm.alertExito">
            {{vm.mesaje}}
        </div>
        <div class="alert alert-danger" role="alert" ng-show="vm.mensajeError">
            {{vm.mesaje}}
        </div>
        <div class="alert alert-warning" role="alert"  ng-show="vm.mensajeAlert">
            {{vm.mesajeAlerts}}
        </div>
        <div class="alert alert-danger" role="alert" ng-show="vm.alertPeligro">
            <table>
                <tr ng-repeat="mensaje in vm.mensajePeligro">
                    <td>{{mensaje}}</td>
                </tr>
            </table>
        </div>
        <div class="row">
            <div class="col-md-12 form-group">
                <button class="btn btn-primary pull-right mr-2" type="button" ng-click="vm.cancelarSolicitud()" ng-show="vm.disableCancelar" ng-disabled="vm.botones">Cancelar</button>
                <button class="btn btn-primary pull-right mr-2" type="button" ng-show="!vm.disableS" ng-click="vm.Enviar()" ng-disabled="vm.botones">Enviar</button>
                <button class="btn btn-primary pull-right mr-2" type="button" ng-click="vm.GuardarFormacion()" ng-show="!vm.disableS" ng-disabled="vm.botones">Guardar</button>
                <button class="btn btn-primary pull-right mr-2" type="button" ng-click="vm.ActualizarInforacion()" ng-show="vm.ShowActualizar" ng-disabled="vm.botones">{{vm.mensajeActualizar}}</button>
                <button class="btn btn-primary pull-right mr-2" type="button" onclick="window.location='../';">Cerrar</button>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">Información del revisor</div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-4">
                        <label>Responsable</label>
                        <label class="form-control" disabled>{{vm.SolicitudFormacion.ResponsableActual}}</label>
                    </div>
                    <div class="col-md-4">
                        <label>Estado</label>
                        <label class="form-control" ng-model="vm.Estado" disabled>{{vm.SolicitudFormacion.EstadoSolicitud}}</label>
                    </div>
                    <div class="col-md-4 pt2">
                        <fieldset>
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <input type="checkbox" ng-model="vm.SolicitudFormacion.SolicitudAprobada" ng-disabled="{{vm.disableGP}}">
                                </span>
                                <label class="form-control">Aprobada</label>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="row MT2">
                    <div class="col-md-4">
                        <label>Fecha de pago</label>
                        <input kendo-date-picker class="form-control fecha" ng-model="vm.SolicitudFormacion.FechaPago" ng-disabled="{{vm.disableGF}}" />
                    </div>
                    <div class="col-md-4">
                        <label>Solicitante</label>
                        <label class="form-control" disabled>{{vm.SolicitudFormacion.Solicitante}}</label>
                    </div>
                    <div class="col-md-4">
                        <label for="fechaSolicitud">Fecha de solicitud</label>
                        <input kendo-date-picker class="form-control fecha" ng-model="vm.SolicitudFormacion.Fechasolicitud" disabled />
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
                        <select class="form-control" ng-disabled="vm.disableS" ng-model="vm.SolicitudFormacion.TipoFormacion" ng-options="tipos.Title for tipos in vm.TiposFormaciones track by tipos.ID ">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>Formación</label>
                        <input type="text" ng-model="vm.SolicitudFormacion.Formacion" class="form-control" ng-disabled="vm.disableS" />
                    </div>
                    <div class="col-md-3">
                        <label>Fecha inicio</label>
                        <input kendo-date-picker ng-model="vm.SolicitudFormacion.FechaInicio" class="form-control fecha" ng-disabled="vm.disableSF" />
                    </div>
                    <div class="col-md-3">
                        <label>Clasificación</label>
                        <select class="form-control" ng-model="vm.SolicitudFormacion.Clasificacion" ng-options="Clasificacion.Title for Clasificacion in vm.Clasificaciones track by Clasificacion.ID " ng-disabled="vm.disableS">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="row MT2">
                    <div class="col-md-3">
                        <label>Evaluación</label>
                        <select class="form-control" ng-model="vm.SolicitudFormacion.Evaluaci_x00f3_nId" ng-options="Evaluacion.Title for Evaluacion in vm.Evaluaciones track by Evaluacion.ID " ng-disabled="vm.disableS">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label>Cupos</label>
                        <input type="number" ng-model="vm.SolicitudFormacion.Cupos" class="form-control" ng-disabled="vm.disableS">
                    </div>
                    <div class="col-md-6">
                        <label>Entidad</label>
                        <input type="text" ng-model="vm.SolicitudFormacion.Entidad" class="form-control" ng-disabled="vm.disableS">
                    </div>
                </div>
                <div class="row MT2">
                    <div class="col-md-3">
                        <label>Valor individual</label>
                        <input type="number" type="text" ng-model="vm.SolicitudFormacion.Valorindividual" class="form-control" ng-disabled="vm.disableS">
                    </div>
                    <div class="col-md-3">
                        <label>Total curso</label>
                        <label type="text" class="form-control" disabled>{{(vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos) || 0}}</label>
                    </div>
                    <div class="col-md-3">
                        <label>Rango</label>
                        <div class="" ng-repeat="Rango in vm.Rangos">
                            <div>
                                <input type="checkbox" checklist-model="vm.SolicitudFormacion.RangoId" checklist-value="Rango.ID" ng-disabled="vm.disableS">{{Rango.Title}}</input>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label>Duración</label>
                        <div class='input-group'>
                            <input type="number" class="form-control" ng-model="vm.SolicitudFormacion.Duracion" ng-disabled="vm.disableS">
                            <span class="input-group-addon">Horas</span>
                        </div>
                    </div>

                </div>

                <div class="row MT2">
                    <div class="col-md-3 pt2">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <input type="checkbox" ng-model="vm.SolicitudFormacion.RequiereViaje" ng-init="vm.init()" ng-disabled="vm.disableS">
                            </span>
                            <label class="form-control">Viajes</label>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label>Fecha de inicio viaje</label>
                        <input kendo-date-picker class="form-control fecha" ng-model="vm.InformacionViaje.FechaInicio" ng-disabled="vm.disableS" />
                    </div>
                    <div class="col-md-3">
                        <label for="fechaFin">Fecha fin viaje</label>
                        <input kendo-date-picker class="form-control fecha" ng-model="vm.InformacionViaje.FechaFin" ng-disabled="vm.disableS" />
                    </div>
                    <div class="col-md-3">
                        <label>Total</label>
                        <label type="text" class="form-control" disabled>{{vm.sumaTotal() || 0}}</label>
                    </div>
                </div>
                <div class="row MT2">
                    <fieldset ng-disabled="{{vm.disableGH}}">
                        <div class="col-md-6">
                            <label>Área</label>
                            <div class="input-group">
                                <input kendo-auto-complete ng-model="vm.AreaSelect" k-data-source="vm.ListaAreasAutocomplet" class="form-control">
                                <span class="input-group-addon" style="cursor: pointer" ng-click="vm.AgregarArea()"><span class="glyphicon glyphicon-plus-sign SpanL"></span></span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>Asistente:</label>
                            <div class="input-group">
                                <input kendo-auto-complete ng-model="vm.AsistentesSelect" k-data-source="vm.ListaAsistenteAutocomplet" class="form-control">
                                <span class="input-group-addon" style="cursor: pointer" ng-click="vm.AgregarAsistentes()"><span class="glyphicon glyphicon-plus-sign SpanL"></span></span>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="row MT2">
                    <fieldset ng-disabled="{{vm.disableGH}}">
                        <div class="col-md-6">
                            <div class="contenedorSombra">
                                <span>Área</span>
                                <div class="checkbox form-group" ng-repeat="areas in vm.ListAreas">
                                    <div>
                                        <input type="checkbox" checklist-model="vm.SolicitudFormacion.AreasId" checklist-value="areas.ID" ng-disabled="vm.disableGH">{{areas.Title}}</input>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary botonIzquierda" ng-click="vm.EliminarAreasSelecionada()">Eliminar</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="contenedorSombra">
                                <span>Asistentes</span>
                                <div class="checkbox form-group" ng-repeat="asistente in vm.listAsitentes">
                                    <div>
                                        <input type="checkbox" checklist-model="vm.SolicitudFormacion.AsistentesId" checklist-value="asistente.ID" ng-disabled="vm.disableGH">{{asistente.Nombre.Title}}</input>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary botonIzquierda" ng-click="vm.EliminarAsistentesSelecionada()">Eliminar</button>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="row MT2">
                    <div class="col-md-12 MT2">
                        <label>Temario</label>
                        <textarea ng-model="vm.SolicitudFormacion.Temario" class="form-control" ng-disabled="vm.disableS"></textarea>
                    </div>
                </div>
                <div class="row MT2">
                    <div class="col-md-12 MT2">
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ModalEncuesta">Observaciones</button>
                        <div class="panel panel-default">
                            <table class="table table-striped">
                                <thead>
                                    <th>#</th>
                                    <th>Observación</th>
                                    <th>Autor</th>
                                </thead>
                                <tbody ng-repeat="Observacion in vm.ListObservaciones">
                                    <tr>
                                        <td>{{$index + 1}}</td>
                                        <td>{{Observacion.Observaci_x00f3_n}}</td>
                                        <td>{{Observacion.autor || Observacion.Autor.Title}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-primary" ng-show="vm.SolicitudFormacion.RequiereViaje">
            <fieldset ng-disabled="{{vm.disableGHV}}">
                <div class="panel-heading">Información de viaje</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label>Valor viáticos</label>
                            <input type="number" ng-model="vm.InformacionViaje.ValorViaticos" class="form-control"></input>
                        </div>
                        <div class="col-md-4">
                            <label>Valor tiquete</label>
                            <input type="number" ng-model="vm.InformacionViaje.ValorTiquete" class="form-control"></input>
                        </div>
                        <div class="col-md-4">
                            <label>Valor transporte</label>
                            <input type="number" ng-model="vm.InformacionViaje.ValorTramsporte" class="form-control"></input>
                        </div>
                    </div>
                    <div class="row MT2">
                        <div class="col-md-4">
                            <label>Valor hotel</label>
                            <input type="number" ng-model="vm.InformacionViaje.ValorHotel" class="form-control"></input>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>

        <div class="panel panel-primary">
            <div class="panel-heading">Anexos </div>
            <div class="panel-body">
                <div class="fileUpload btn btn-primary" id="anexar">
                    <span>Anexar <span class="glyphicon glyphicon-upload"></span></span>
                    <input id="fileInput" type="file" class="upload" />
                </div>
                <input class="btn btn-primary btnAnexos" data-toggle="modal" data-target="#ModalTIpoAnexos" value="+" />
                <div class="panel panel-default">
                    <table class="table table-striped">
                        <thead>
                            <th>#</th>
                            <th>Nombre del archivo</th>
                            <th>Fecha</th>
                            <th>Autor</th>
                        </thead>
                        <tbody ng-repeat="anexo in vm.ListAnexos">
                            <tr>
                                <td>{{$index + 1}}</td>
                                <td>{{anexo.Title}}</td>
                                <td>{{anexo.Created | date:'MM/dd/yyyy'}}</td>
                                <td>{{anexo.Author.Title ||anexo.autor}}</td>
                                <td>{{anexo.TipoAnexo.Title}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ModalObservaciones -->
        <div class="modal fade" id="ModalEncuesta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog escuestaModal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Agregar observación</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Observación.</p>
                        <textarea class="form-control" ng-model="vm.Observacion"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" ng-click="vm.addOservacion()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ModalTipoAnexo -->
        <div class="modal fade" id="ModalTIpoAnexos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog escuestaModal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Selecione el tipo de anexo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <select class="form-control" ng-model="vm.TipoAnexoSelected" ng-options="tipos.Title for tipos in vm.TiposAnexos  track by tipos.ID ">
                            <option value="">Seleccione</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" ng-click="vm.AnexarArchivos()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
