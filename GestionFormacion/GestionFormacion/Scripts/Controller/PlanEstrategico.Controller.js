AppPlanEstrategico.controller('PlanEstrategicoController', PlanEstrategicoController, ['$http']);

function PlanEstrategicoController($scope, $http) {
    var vm = this;
    vm.GestorPresupuesto = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId&$filter=Rol eq 'Gestor de presupuesto' ");
    vm.UsuarioActual = queryList('../_api/web/currentUser/');
    $scope.mostrarPlan = true;

    if (vm.GestorPresupuesto.UsuarioId == vm.UsuarioActual.Id) {
        $scope.mostrarPlan = true;
    } else {
        $scope.mostrarPlan = false;
    }
    function ObtenerListaFormaciones() {
        
        var formaciones = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title,TipoFormacion/Title&$Expand=TipoFormacion&$Expand=Solicitante&$filter=((EstadoSolicitud ne 'Pago Realizado') or  (EstadoSolicitud ne 'En proceso'))");

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
                                        FechaInicio: { type: "date" }
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
          { field: "Solicitante.Title", title: "Autor" },
          { field: "Formacion", title: "Título" },
          { field: "Fechasolicitud", title: "Fecha solicitud", format: "{0:dd/MM/yyyy}" },
          { field: "TipoFormacion.Title", title: "Tipo de formación" },
          { field: "Duracion", title: "Duración en horas" },
          { field: "Cupos", title: "Numero de persona" },
           { field: "FechaInicio", title: "Fecha de propuesta", format: "{0:dd/MM/yyyy}" },
          { field: "Total", title: "Valor" },
          { field: "EstadoSolicitud", title: "Estado" },
            {
                field: "Aprobar", title: "",
                template: "<td><input type='checkbox' ng-model='vm.Check' ng-click='vm.aprobarDesaprobar(#=ID #)'></td>"
            },
            {
                field: "Deshaprobar", title: "",
                template: "<div ng-click='vm.cancelarFormacion(#=ID #)' ><span class='glyphicon glyphicon-upload' aria-hidden='true'></span></div>"
            }
            ],
            groupable: false
        }
    }


    vm.aprobarDesaprobar = function (id) {
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.ID,
            EstadoSolicitud: "Aprobada",
            SolicitudAprobada: True,
        }
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + id + ")"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = updateItem(url, ContextoSolicitud, data);
        if (result) {
            vm.alertPeligro = false;
            vm.alertExito = true;
            vm.mesaje = "la solicitud a sido aprobada";
        } else {
            vm.mensajeError = true;
            vm.mesaje = "Intentelo nuevamente";
        }
    }

    vm.cancelarFormacion = function (id) {
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
            vm.mesaje = "Felicidades su registro se guard\u00F3 con \u00e9xito ";
        } else {
            vm.mensajeError = true;
            vm.mesaje = "Su registro no se guard\u00F3, intentelo nuevamente";
        }
    }
    ObtenerListaFormaciones();
}

