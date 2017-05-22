AppSolicitudesAsignadas.controller('SolicitudesAsignadasController', SolicitudesAsignadasController, ['$http']);

function SolicitudesAsignadasController($scope, $http) {
    var vm = this;
    function ObtenerListaFormaciones() {


        vm.UsuarioActual = queryList('../_api/web/currentUser/');

        var url = "../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje,Total" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title,TipoFormacion/Title&$Expand=TipoFormacion&$Expand=Solicitante&$filter=ResponsableActualId eq " + vm.UsuarioActual.Id;

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
                                        Fechasolicitud: { type: "date" }
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
              { field: "Formacion", title: "Título" },
              { field: "Fechasolicitud", title: "Fecha solicitud", format: "{0:dd/MM/yyyy}" },
               { field: "Solicitante.Title", title: "Solicitante" },
              { field: "TipoFormacion.Title", title: "Tipo de formación" },
              { field: "Duracion", title: "Duración en horas" },
              { field: "Cupos", title: "Numero de persona" },
               { field: "FechaInicio", title: "Fecha de propuesta", format: "{0:dd/MM/yyyy}" },
              { field: "Total", title: "Valor" },
              { field: "EstadoSolicitud", title: "Estado" },
              {
              field: "", title: "",
              template: "<button type='button' class='btn btn-default btn-xs noStyle' ng-click='vm.Redirecionar(#=ID#)'><span class='glyphicon glyphicon-list-alt' aria-hidden='true'></span></button>"
              }

            ],
            groupable: false
        }
    };
    ObtenerListaFormaciones();

    vm.Redirecionar = function (id) {
        window.location.href = "Solicitud.aspx?ID=" + id;
    }

}
