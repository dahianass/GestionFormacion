var app = angular.module('Consultas', ['kendo.directives']);
app.controller('getVistasConsulta', ['$scope', '$http', function ($scope, $http) {
    //carga de elementos a grilla para realizar consulta dependiendo de la funcion se realizara filtrado
    var vm = this;
    vm.UsuarioActual = queryList('../_api/web/currentUser/');
    var gestores = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId&$filter=Rol eq 'Gestor de presupuesto' ");
    vm.GestorPresupuesto = gestores.results[0];
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
    //funciones
    vm.abrirSolicitud = function (item) {
        window.location = "../pages/Solicitud.aspx?ID=" + item.Id;
    }
    $scope.abrirSolicitudKendo = function (item) {
        window.location = "../pages/Solicitud.aspx?ID=" + item.Id;
    }
    vm.iniciarTodas = function () {

        vm.titulo = "Consultar todos los reportes";

        vm.url = "../_api/web/lists/GetByTitle('SolicitudesFormacion')/items?$select=Id,Fechasolicitud,Duracion,Cupos,TotalCurso,EstadoSolicitud,TipoFormacion/Title&$orderby=Id%20desc&$top=3000&$expand=TipoFormacion";
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
                              url: vm.url
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
              { field: "Id", title: "Id" },
              { field: "Duracion", title: "Duracion" },
              { field: "Cupos", title: "Cupos" },
              { field: "TotalCurso", title: "Valor total" },
              { field: "EstadoSolicitud", title: "Estado" },
              { field: "TipoFormacion.Title", title: "Tipo formacion" },
              { field: "Fechasolicitud", title: "Fecha solicitud", format: "{0:dd/MM/yyyy}" },
              {
                  field: "Acciones", title: "Acciones",
                  template: '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><span class="glyphicon glyphicon-eye-open"></span></button></div>'
                  //template: '<div class="k-button" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><i class="fa fa-file-text-o"></i></div>'
              }
            ],
            groupable: false


        };

    }
    vm.consultarPorAutor = function () {
        //vm.ocultarAsignadas = true;
        //vm.mostrarVista = true;
        //vm.ocultarEstado = true;
        //vm.ocultarEstadoAccion = true;
        //var reporte = queryList("../_api/web/lists/GetByTitle('reportes')/items?$select=Estado,Categoria/Categoria,Fuente/Fuente,ID,FechaReporte,Author/Title,ResponsableProceso/Title&$orderby=ID%20desc&$top=100&$filter=AuthorId eq " + vm.UsuarioActual.Id + " &$expand=Categoria&$expand=Fuente&$expand=Author&$expand=ResponsableProceso").results;
        //for (var i = 0; i < reporte.length; i++) {
        //    var fecha = new Date(reporte[i].FechaReporte);
        //    fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes();
        //    reporte[i].FechaReporte = fecha;
        //}
        vm.titulo = "Consultar reportes creados por mi";
        //vm.products = reporte;
        vm.ocultarTodas = true;
        vm.ocultarAutor = false;
        vm.ocultarAsignadas = true;
        vm.mostrarVista = false;
        vm.ocultarEstado = true;
        vm.ocultarEstadoAccion = true;
        vm.url = "../_api/web/lists/GetByTitle('reportes')/items?$select=ID,Estado,Categoria/Categoria,Fuente/Fuente,ID,FechaReporte,Author/Title,ResponsableProceso/Title&$orderby=ID%20desc&$top=3000&$filter=AuthorId eq " + vm.UsuarioActual.Id + " &$expand=Categoria&$expand=Fuente&$expand=Author&$expand=ResponsableProceso";
        $scope.reporteAutorOptions = {
            //autoBind: false,
            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,

                  // type: "odata",
                  transport: {
                      read: function (e) {
                          $http({
                              method: 'GET',
                              url: vm.url
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
                                        FechaReporte: { type: "date" }
                                    }
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.FechaReporte = new Date(item.FechaReporte);
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
                template: "No se encontraron pedidos"
            },

            columns: [
              { field: "ID", title: "Consecutivo" },
              { field: "Estado", title: "Estado" },
              { field: "Categoria.Categoria", title: "Categoria" },
              { field: "Fuente.Fuente", title: "Fuente" },
              { field: "FechaReporte", title: "Fecha reporte", format: "{0:dd/MM/yyyy}" },
              { field: "Author.Title", title: "Autor" },
              { field: "ResponsableProceso.Title", title: "Responsable proceso" },
              {
                  field: "Acciones", title: "Acciones",
                  template: '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><span class="glyphicon glyphicon-eye-open"></span></button></div>'
                  //template: '<div class="k-button" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><i class="fa fa-file-text-o"></i></div>'
              }
            ],
            groupable: false


        };

    }
    vm.consultarAsignadas = function () {
        //vm.mostrarVista = true;
        //vm.ocultarEstado = true;
        //vm.ocultarEstadoAccion = true;
        //var reporte = queryList("../_api/web/lists/GetByTitle('reportes')/items?$select=Estado,Categoria/Categoria,Fuente/Fuente,ID,FechaReporte,Author/Title,ResponsableProceso/Title&$orderby=ID%20desc&$top=100&$filter=ResponsableProcesoId eq " + vm.UsuarioActual.Id + " &$expand=Categoria&$expand=Fuente&$expand=Author&$expand=ResponsableProceso").results;
        //for (var i = 0; i < reporte.length; i++) {
        //    var fecha = new Date(reporte[i].FechaReporte);
        //    fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate() + " " + fecha.getHours() + ":" + fecha.getMinutes();
        //    reporte[i].FechaReporte = fecha;
        //}
        vm.titulo = "Consultar reportes asignados a mi";
        vm.ocultarTodas = true;
        // vm.products = reporte;
        vm.ocultarAsignadas = false;
        vm.ocultarAutor = true;
        vm.mostrarVista = false;
        vm.ocultarEstado = true;
        vm.ocultarEstadoAccion = true;
        vm.url = "../_api/web/lists/GetByTitle('reportes')/items?$select=ID,Estado,Categoria/Categoria,Fuente/Fuente,ID,FechaReporte,Author/Title,ResponsableProceso/Title,ID&$orderby=ID%20desc&$top=3000&$filter=ResponsableProcesoId eq " + vm.UsuarioActual.Id + " &$expand=Categoria&$expand=Fuente&$expand=Author&$expand=ResponsableProceso";
        $scope.reporteAsignadasOptions = {
            //autoBind: false,
            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,

                  // type: "odata",
                  transport: {
                      read: function (e) {
                          $http({
                              method: 'GET',
                              url: vm.url
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
                                        FechaReporte: { type: "date" }
                                    }
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.FechaReporte = new Date(item.FechaReporte);
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
                template: "No se encontraron pedidos"
            },

            columns: [
              { field: "ID", title: "Consecutivo" },
              { field: "Estado", title: "Estado" },
              { field: "Categoria.Categoria", title: "Categoria" },
              { field: "Fuente.Fuente", title: "Fuente" },
              { field: "FechaReporte", title: "Fecha reporte", format: "{0:dd/MM/yyyy}" },
              { field: "Author.Title", title: "Autor" },
              { field: "ResponsableProceso.Title", title: "Responsable proceso" },
              {
                  field: "Acciones", title: "Acciones",
                  template: '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><span class="glyphicon glyphicon-eye-open"></span></button></div>'
                  //template: '<div class="k-button" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><i class="fa fa-file-text-o"></i></div>'
              }
            ],
            groupable: false


        };

    }
    vm.consultarEstado = function () {
        vm.ocultarTodas = true;
        vm.ocultarAsignadas = true;
        vm.mostrarVista = false;
        vm.ocultarEstado = false;
        vm.ocultarEstadoAccion = true;
        vm.url = "../_api/web/lists/GetByTitle('reportes')/items?$select=ID,Estado,Categoria/Categoria,Fuente/Fuente,ID,FechaReporte,Author/Title,ResponsableProceso/Title&$orderby=ID%20desc&$top=3000&$expand=Categoria&$expand=Fuente&$expand=Author&$expand=ResponsableProceso";
        vm.titulo = "Consultar reportes por estado";
        $scope.EstadoOptions = {
            //autoBind: false,
            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,

                  // type: "odata",
                  transport: {
                      read: function (e) {
                          $http({
                              method: 'GET',
                              url: vm.url
                          })
                            .then(function success(response) {
                                e.success(response.data)
                            }, function error(response) {
                                alert('something went wrong')
                                console.log(response);
                            })
                      },
                      dataType: "JSON",

                  },
                  group: { field: "Estado" }
                 , schema:
                            {
                                model: {
                                    fields: {
                                        FechaReporte: { type: "date" }
                                    }
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.FechaReporte = new Date(item.FechaReporte);
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
                template: "No se encontraron pedidos"
            },

            columns: [
              { field: "ID", title: "Consecutivo" },
              { field: "Estado", title: "Estado" },
              { field: "Categoria.Categoria", title: "Categor\u00eda" },
              { field: "Fuente.Fuente", title: "Fuente" },
              { field: "ID", title: "Consecutivo" },
              { field: "FechaReporte", title: "Fecha reporte", format: "{0:dd/MM/yyyy}" },
              { field: "Author.Title", title: "Autor" },
              { field: "ResponsableProceso.Title", title: "Responsable" },
              {
                  field: "Acciones", title: "Acciones",
                  template: '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><span class="glyphicon glyphicon-eye-open"></span></button></div>'
                  //template: '<div class="k-button" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><i class="fa fa-file-text-o"></i></div>'
              }
            ],
            groupable: false


        };
    }
    vm.consultarEstadoAccion = function () {
        vm.ocultarTodas = true;
        vm.ocultarAsignadas = true;
        vm.ocultarAutor = true;
        vm.mostrarVista = false;
        vm.ocultarEstado = true;
        vm.ocultarEstadoAccion = false;
        vm.url = "../_api/web/lists/GetByTitle('acciones')/items?$select=ID,Accion,ResponsableAccion/Title, FechaEstimada,FechaReal,Estado,ReporteId, Seguimiento,ID&$expand=ResponsableAccion&$orderby=ReporteId%20desc&$top=3000";
        $http.get(vm.url)
       .then(function (response) {
           var resultado = response.data.value;
           var groupBy = function (xs, key) {
               return xs.reduce(function (rv, x) {
                   (rv[x[key]] = rv[x[key]] || []).push(x);
                   return rv;
               }, {});
           };

           var grouped1 = groupBy(resultado, 'Estado');
           vm.listaEstadosAcciones = grouped1;
       });

        vm.titulo = "Consultar acciones por estado";
        $scope.EstadoAccionOptions = {
            //autoBind: false,
            dataSource: new kendo.data.DataSource(

              {
                  pageSize: 10,

                  // type: "odata",
                  transport: {
                      read: function (e) {
                          $http({
                              method: 'GET',
                              url: vm.url
                          })
                            .then(function success(response) {
                                e.success(response.data)
                            }, function error(response) {
                                alert('something went wrong')
                                console.log(response);
                            })
                      },
                      dataType: "JSON",

                  },
                  group: { field: "Estado" }
                 , schema:
                            {
                                model: {
                                    fields: {
                                        FechaEstimada: { type: "date" },
                                        FechaReal: { type: "date" }
                                    }
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.FechaEstimada = new Date(item.FechaEstimada);
                                        return item;
                                    })
                                    //return data.value;
                                },
                                data: function (data) {
                                    return data.value.map(function (item) {
                                        item.FechaReal = new Date(item.FechaReal);
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
                template: "No se encontraron pedidos"
            },

            columns: [
              { field: "ID", title: "Id de acci\u00f3n" },
              { field: "Accion", title: "Acci\u00f3n" },
              { field: "ResponsableAccion.Title", title: "Responsable acci\u00f3n" },
              { field: "FechaEstimada", title: "Fecha estimada", format: "{0:dd/MM/yyyy}" },
              { field: "FechaReal", title: "Fecha real", format: "{0:dd/MM/yyyy}" },
              { field: "Estado", title: "Estado" },
              { field: "ReporteId", title: "Consecutivo reporte" },
              {
                  field: "Acciones", title: "Acciones",
                  template: '<div class="btn-group"><button type="button" class="btn btn-primary btn-xs" ng-click="abrirSolicitudKendo({Id:this.dataItem.ReporteId})"><span class="glyphicon glyphicon-eye-open"></span></button></div>'
                  //template: '<div class="k-button" ng-click="abrirSolicitudKendo({Id:this.dataItem.Id})"><i class="fa fa-file-text-o"></i></div>'
              }
            ],
            groupable: false


        };
    }
    vm.UsuarioActual = queryList('../_api/web/currentUser/');
    vm.products;
    vm.titulo;
    vm.mostrarVista = true;
    vm.ocultarEstado = true;
    vm.ocultarEstadoAccion = true;
    vm.url;
    vm.iniciarTodas();
    //optiones para kendo grid                        
    $scope.EstadoOptions;
    $scope.EstadoAccionOptions;


}]);