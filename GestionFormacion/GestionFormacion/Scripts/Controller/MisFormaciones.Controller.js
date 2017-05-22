AppMisFormaciones.controller('MisFormacionesController', MisFormacionesController, ['$http']);

function MisFormacionesController($scope, $http) {
    var vm = this;
    vm.Formaciones = [];
    //


    function CargarFormaciones() {
        vm.UsuarioActual = queryList('../_api/web/currentUser/');
        var asistente = queryList("../_api/lists/getbytitle('Asistentes')/items?$filter=NombreId eq " + vm.UsuarioActual.Id);
        vm.asistente = asistente.results[0]

        vm.Formaciones = [];
        var Formaciones = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId%20,Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId%20,Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje,Temario,SolicitudAprobada,AreasId,ID,Solicitante/Title,TipoFormacion/Title,TipoFormacion/ID,AsistentesId/Id&$Expand=TipoFormacion&$Expand=Solicitante&$filter=AsistentesId eq " + vm.asistente.ID);
        var Certificados = queryList("../../_api/web/lists/getbytitle('Certificados')/items?$filter=AsistenteId eq " + vm.UsuarioActual.Id);
        var EncuestasFiltradas = queryList("../_api/web/lists/getbytitle('Encuestas')/items?$filter=AsistenteId  eq " + vm.UsuarioActual.Id);
        _.each(Formaciones.results, function (formacion) {
            var Bcertificado= true;
            var BEncuesta = true;
            var certifica = "Pendientes";
            var Encuesta = "Pendientes";
            var obj = _.filter(Certificados.results, function (certificado) { return certificado.FormacionId == formacion.Id; });
            if (obj.length) {
                Bcertificado= false;
                certifica = "Anexado";
            }
            var ObjEnc = _.filter(EncuestasFiltradas.results, function (Encuesta) { return Encuesta.FormacionId == formacion.Id; });
            if (ObjEnc.length) {
                BEncuesta = false;
                Encuesta = "Realizado";
            }
            var objFormacion = {
                ID: formacion.ID,
                Formacion: formacion.Formacion,
                FechaInicio: formacion.FechaInicio,
                Certificado: certifica,
                BCertificado: Bcertificado,
                Encuesta: Encuesta,
                BEncuesta: BEncuesta,
                TipoFormacion: formacion.TipoFormacion,
                Entidad: formacion.Entidad
            };
            vm.Formaciones.push(objFormacion);
        });
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
              { field: "Formacion", title: "Título de formactió" },
              { field: "FechaInicio", title: "Fecha de Inicio", format: "{0:dd/MM/yyyy}" },
                            { field: "Encuesta", title: "Encuesta" },
            {
                field: "", title: "",
                template: "<div class='btn-group' ng-show='#=BEncuesta#'><button type='button' class='btn btn-default btn-xs noStyle' ng-click='vm.ModalEncuesta( #=ID #)'><span class='glyphicon glyphicon-th-list' aria-hidden='true'></span></button></div>"
            },
              { field: "Certificado", title: "Certificados" },
            {
                field: "", title: "",
                template: "<div class='btn-group' ng-show='#=BCertificado#'><button type='button' class='btn btn-default btn-xs noStyle' ng-click='vm.ModalCertificado( #=ID #)'><span class='glyphicon glyphicon-upload' aria-hidden='true'></span></button></div>"
                }
            ],
            groupable: false
        }
    }
    CargarFormaciones()
    vm.ModalCertificado = function (idFormu) {
        $("#ModalArchivo").modal();
        var formacionSelected = _.filter(vm.Formaciones, function (formacion) { return formacion.ID == idFormu })
        vm.formacionSelected =formacionSelected[0];
    };
    vm.ModalEncuesta = function (id) {
        $("#ModalEncuesta").modal();
        var formacionSelected = _.filter(vm.Formaciones, function (formacion) { return formacion.ID == id })
        vm.formacionSelected = formacionSelected[0];
    }

    vm.guardarEncuesta = function () {
        var data = {
            __metadata: { 'type': 'SP.Data.EncuestasListItem' },
            AsistenteId: vm.UsuarioActual.Id,
            Cargo:vm.asistente.Cargo,
            FormacionId:vm.formacionSelected.ID,
            TipoFormacionId:vm.formacionSelected.TipoFormacion.ID,
            RespuestaEncuesta: vm.RespuestaEncuesta
        }
        var url = "../_api/lists/getbytitle('Encuestas')/items"
        var ContextoSolicitud = getContext("../lists/Encuestas");
        var result = createItem(url, ContextoSolicitud, data);
        //actualizar tabla 
        CargarFormaciones()
    }

    vm.anexarCertificado = function(){
        vm.Certificado = {
            fileInput: jQuery('#fileInput'),
            nombreBiblioteca: "Certificados",
            Title: $('#fileInput').val(),
            autor: vm.UsuarioActual.Title,
            AsistenteId: vm.UsuarioActual.Id,
            Cargo: vm.asistente.Cargo,
            FormacionId: vm.formacionSelected.ID,
            TipoFormacionId: vm.formacionSelected.TipoFormacion.ID,
        };
    }

    vm.GuardarCertificado = function () {
        function callback(quepaso) {
            vm.mesaje = "";
            vm.mensajeAlert = false;
            vm.alertExito = true;
            vm.mesaje = "Gracias por su espera, el archivo se guardo con exito";
            $scope.$apply();

            CargarFormaciones();
        }
        var archivo = uploadFile2(vm, vm.Certificado, callback);
        vm.mensajeAlert = true;
        vm.mesajeAlerts = "Su cerificado se está guardando"
        var repeticion = window.setInterval("vm.detener()", 50000);
    }
    vm.detener = function () {
        window.clearInterval(repeticion);
        vm.mesaje = "";
        vm.mensajeAlert = false;
        vm.alertExito = true;
        vm.mesaje = "Error en cargar la infomacion";
        $scope.$apply();
        CargarFormaciones();
    }

}

