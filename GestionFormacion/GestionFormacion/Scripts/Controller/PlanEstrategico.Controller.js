AppPlanEstrategico.controller('PlanEstrategicoController', PlanEstrategicoController, ['$http']);

function PlanEstrategicoController($scope, $http) {
    var vm = this;
    var gestores = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId&$filter=Rol eq 'Gestor de presupuesto' ");
    vm.GestorPresupuesto = gestores.results[0];




    vm.UsuarioActual = queryList('../_api/web/currentUser/');
    vm.mostrarTodos = false;
    var TodosGestores = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId");
    vm.TodosGestores = TodosGestores.results;

    function permisosMenu() {
        var Ad = _.filter(vm.TodosGestores, function (G) { return G.Rol == 'Administrador' });
        var IDGh = _.filter(vm.TodosGestores, function (G) { return G.Rol == 'Gestion Humana' });
        if ((vm.UsuarioActual.Id == Ad[0].UsuarioId) || (vm.UsuarioActual.Id == IDGh[0].UsuarioId)) {
            vm.mostrarTodos = true;
        }
    }
    permisosMenu();
    $scope.mostrarPlan = true;

    if (vm.GestorPresupuesto.UsuarioId == vm.UsuarioActual.Id) {
        $scope.mostrarPlan = true;
    } else {
        $scope.mostrarPlan = false;
    }

    function ObtenerListaFormaciones() {

        var formaciones = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje,Total" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title,TipoFormacion/Title&$Expand=TipoFormacion&$Expand=Solicitante&$filter=((EstadoSolicitud eq 'Presupuestada') or  (EstadoSolicitud eq 'Aprobada'))");

        vm.Formaciones = formaciones.results;
        CargarListaFormaciones();
    }

    function CargarListaFormaciones() {
        $scope.reporteTodasOptions = {
            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,
                  data: vm.Formaciones,
                  schema:
                            {
                                model: {
                                    fields: {
                                        FechaInicio: { type: "date" },
                                        Fechasolicitud: { type: "date" },
                                    }
                                },
                                data: function (data) {
                                    return data.map(function (item) {
                                        item.Fechasolicitud = new Date(item.Fechasolicitud);
                                        return item;
                                    })
                                    //return data.value;
                                },
                                total: function (data) {
                                    return data.length;
                                }
                            }
              }
            ),

            scrollable: true,
            height: 450,
            filterable: {
                extra: false
            },
            resizable: true,
            sortable: true,
            pageable: true,
            noRecords: {
                template: "No se encontraron registros"
            },
            //select=,EstadoSolicitud,TipoFormacion/TipoFormacion&$orderby=Id%20desc&$top=3000&$expand=TipoFormacion";
            columns: [
          { field: "Solicitante.Title", title: "Autor", width: 150 },
          { field: "Formacion", title: "Título", width: 100 },
          { field: "Fechasolicitud", title: "Fecha solicitud", format: "{0:dd/MM/yyyy}" },
          { field: "TipoFormacion.Title", title: "Tipo de formación" },
          { field: "Duracion", title: "Duración en horas" , width:50},
          { field: "Cupos", title: "Numero de persona", width: 50 },
           { field: "FechaInicio", title: "Fecha de propuesta", format: "{0:dd/MM/yyyy}" },
          { field: "Total", title: "Valor" },
          { field: "EstadoSolicitud", title: "Estado" },
            { title: "",
                template: "<td><input type='checkbox' ng-disabled='#=SolicitudAprobada#' ng-checked='#=SolicitudAprobada#' ng-model='check#=ID#' ng-click='vm.aprobarDesaprobar(#=ID #)'></td>"
            },
            { title: "",
                template: "<div ng-click='vm.cancelarFormacion(#=ID #)' style='cursor:pointer'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></div>"
            } ],
            groupable: false
        }
        $scope.reporteTodasOptions.dataSource.read();
    }
    function ObtenerResponsable(rol) {
        vm.responsableProxi = queryList("../_api/lists/getbytitle('Gestores')/items?$filter=Rol eq '" + rol + "'");
        vm.ResponsableActualId = vm.responsableProxi.results[0].UsuarioId;
    }

    vm.aprobarDesaprobar = function (id) {
        ObtenerResponsable("Gestor financiero")
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.ResponsableActualId,
            EstadoSolicitud: "Aprobada",
            SolicitudAprobada: true,
        }
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + id + ")"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = updateItem(url, ContextoSolicitud, data);
        if (result) {
            vm.alertPeligro = false;
            vm.alertExito = true;
            vm.mesaje = "la solicitud fue aprobada";
            registroLog("Se aprobo la solicitud con el id " + id);
            envioCorreo(data, id)
            ObtenerListaFormaciones();
        } else {
            vm.mensajeError = true;
            vm.mesaje = "Intentelo nuevamente";
        }
    }

    vm.cancelarFormacion = function (id) {
        vm.mensajeAlert = true;
        vm.mesajeAlerts = "La solicitud se est\u00e1 cancelando";
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.ID,
            EstadoSolicitud: "Cancelada",
        }
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + id + ")"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = updateItem(url, ContextoSolicitud, data);
        if (result) {
            vm.alertPeligro = false;
            vm.alertExito = true;
            vm.mensajeAlert = false;
            vm.mesaje = "La solicitud fue cancelada con \u00e9xito ";
            registroLog("Se cancelo la formacion id " + id);
            ObtenerListaFormaciones();
        } else {
            vm.mensajeError = true;
            vm.mensajeAlert = false;
            vm.mesaje = "Su registro no se guard\u00F3, intentelo nuevamente";
        }
    }
    function registroLog(accion) {
        var data = {
            __metadata: { 'type': 'SP.Data.LogListItem' },
            Title: '',
            autorId: vm.UsuarioActual.Id,
            accion: accion,
            fechaCreacion: new Date()

        }
        var url = "../_api/lists/getbytitle('Log')/items"
        var ContextoSolicitud = getContext("../lists/Log");
        var result = createItem(url, ContextoSolicitud, data);
    }
    ObtenerListaFormaciones();
    function envioCorreo(data ,id) {
        var url = "https://flujovacaciones.azurewebsites.net/api/SolicitudGestionFormacion?NumeroSolicitud=" + id + "&Estado=" + data.EstadoSolicitud + " &Solicitante=" + vm.responsableProxi.results[0].Usuario.Title + "&CorreoReceptor=" + vm.responsableProxi.results[0].Usuario.EMail + "&url=conocimiento.sharepoint.com/teams/dev/gestionformacion";
        var result = queryList(url);
    }
}

