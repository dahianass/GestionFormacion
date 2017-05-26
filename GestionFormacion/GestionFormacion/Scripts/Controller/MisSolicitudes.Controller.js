AppMisSolicititudes.controller('MisSolicitudesController', MisSolicitudesController, ['$http']);

function MisSolicitudesController($scope, $http) {
    var vm = this;
    vm.GestorPresupuesto = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId&$filter=Rol eq 'Gestor de presupuesto' ");
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


        

        var url = "../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje,Total" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title,TipoFormacion/Title&$Expand=TipoFormacion&$Expand=Solicitante&$filter=SolicitanteId eq " + vm.UsuarioActual.Id;

        $scope.reporteTodasOptions = {
            //autoBind: false,

            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,

                  // type: "odata",
                  transport: {
                      read: function (e) {
                          $http({
                              method: 'GET',
                              url: url
                          })
                            .then(function success(response) {
                                e.success(response.data)
                            }, function error(response) {
                                alert('something went wrong')
                                console.log(response);
                            })
                      },
                      dataType: "JSON",

                  }
                 , schema:
                            {
                                model: {
                                    fields: {
                                        Fechasolicitud: { type: "date" },
                                        FechaInicio: { type: "date" }
                                    }
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.Fechasolicitud = new Date(item.Fechasolicitud);
                                        return item;
                                    })
                                    //return data.value;
                                },
                                total: function (data) {
                                    return data.value.length;
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
              //{ field: "Id", title: "Id",width:50, attributes: { "class": "porcentual10" } },
              { field: "Formacion", title: "Título" },
              { field: "Fechasolicitud", title: "Fecha solicitud", format: "{0:dd/MM/yyyy}" },
              { field: "TipoFormacion.Title", title: "Tipo de formación" },
              { field: "Duracion", title: "Duración en horas", width: 50, },
              { field: "Cupos", title: "Número de persona", width: 50,},
               { field: "FechaInicio", title: "Fecha de propuesta", format: "{0:dd/MM/yyyy}" },
              { field: "Total", title: "Valor" },
              { field: "EstadoSolicitud", title: "Estado" }
            ],
            groupable: false
        }
    };
    ObtenerListaFormaciones();
}
