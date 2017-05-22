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
    <script src="../Scripts/App/App.MisFormaciones.js"></script>
    <script src="../Scripts/Controller/MisFormaciones.Controller.js"></script>
    <script src="../Scripts/Controller/apiRest.js"></script>

</asp:Content>


<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />
    <div class="ContenedorPrincipal" ng-app="MisFormacionessApp" ng-controller="MisFormacionesController as vm">
        <div class="MenuLateral">
            <div class="panel panel-primary">
                <div class="panel-heading center">MENú</div>
                <div class="btn-group-vertical" role="group" aria-label="">
                    <button type="button" class="btn btn-default left" onclick="window.location='MisFormaciones.aspx';">Mis Formaciónes</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='MisSolicitudes.aspx';">Mis Solicitudes</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='Solicitud.aspx';">Crear solicitudes de formación</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='PlanEstrategico.aspx';">Plan estratégico</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='SolicitudesAsignadas.aspx';">Solicitudes asignadas a mí</button>
                    <button type="button" class="btn btn-default left" onclick="window.location='TodasSolicitudes.aspx';">Todas las solicitudes</button>
                </div>
            </div>
        </div>
        <div class="Contenedor">
            <div class="TablaFormaciones panel panel-primary">
                <div class="panel-heading">MIS FORMACIONES</div>
                <div id="kg-Todas" kendo-grid="kgTodas" k-options="reporteTodasOptions"></div>

            </div>
        </div>


        <!-- ModalEncuesta -->
        <div class="modal fade" id="ModalEncuesta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog escuestaModal" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Encuesta de formación</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <label for="NombreAsistente">Nombre</label>
                                <label class="form-control">{{vm.UsuarioActual.Title}}</label>
                            </div>
                            <div class="col-md-4">
                                <label for="CargoAsistente">Cargo</label>
                                <label class="form-control" id="CargoAsistente">{{vm.asistente.Cargo}}</label>
                            </div>
                            <div class="col-md-4">
                                <label for="FormacionAsistente">Formación</label>
                                <label class="form-control">{{vm.formacionSelected.Formacion}}</label>
                            </div>
                        </div>
                        <div class="row contenedorDos">
                            <div class="col-md-6">
                                <label for="tipoFormacionAsistente">Tipo de formación</label>
                                <label class="form-control">{{vm.formacionSelected.TipoFormacion.Title}}</label>
                            </div>
                            <div class="col-md-6">
                                <label for="entidadAsistente">Entidad</label>
                                <label class="form-control" id="">{{vm.formacionSelected.Entidad}}</label>
                            </div>
                        </div>
                        <div class="aprendido">
                            <p>De lo que aprendió en el evento en el evento al que asistió qué cree que puede aplicar en su proceso o a de acuerdo con la responsabilidad , autoridad y/o roles asignados.</p>
                            <textarea class="form-control" ng-model="vm.RespuestaEncuesta"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" ng-click="vm.guardarEncuesta()">Guardar</button>
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
                            <span>Anexar <span class="glyphicon glyphicon-upload"></span></span>
                            <input id="fileInput" type="file" class="upload" />
                        </div>
                        <input class="btn btn-primary btnAnexos" ng-click="vm.anexarCertificado()" value="+" />
                        <label class="form-control">{{vm.Certificado.Title}}</label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" ng-click="vm.GuardarCertificado()">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
