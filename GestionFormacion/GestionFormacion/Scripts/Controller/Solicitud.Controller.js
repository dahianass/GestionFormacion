
AppSolicitud.controller('SolicitudController', SolicitudController);

function SolicitudController() {
    var vm = this;
    vm.disableGP = true;
    vm.disableGF = true;
    vm.disableGH = true;
    vm.disableGHV = true;
    vm.disableS = false;
    vm.disableCancelar = true;
    vm.disableGF = true;
    vm.TiposFormaciones = {};
    vm.ListaAreasAutocomplet = [];
    vm.ListaAsistenteAutocomplet = [];
    vm.ListObservaciones = [];
    vm.ListAnexos = []
    vm.ListAreas = [];
    vm.listaAsitentes = [];
    vm.AreaSelect = "";
    vm.RangoSelected = {};
    vm.listAsitentes = [];
    vm.RolUserCurrent = [];
    vm.mensajePeligro = [];
    vm.id = 0;
    vm.Rol = 0;
    vm.ShowActualizar = false;
    vm.solicitudEnLista = false;
    function selectPerfil() {
        var id = getQueryStringParams("ID");
        if (id != undefined) {
            ListarInformacionSolicitud(id);
        } else {
            ObtenerRolUsuario();
        }
    }
    ListarFormaciones();
    ListarEvaluaciones();
    ListarClasificacion();
    ListarRangos();
    ListaAreas();
    ListarTiposAnexos();
    ListarAsistentes();
    selectPerfil();

    function ListarInformacionSolicitud(id) {

        var SolicitudFormacion = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title&$Expand=Solicitante&$filter=ID eq " + id);
        vm.id = SolicitudFormacion.results[0].Id;

        vm.solicitudEnLista = true;

        vm.SolicitudFormacion = SolicitudFormacion.results[0];
        var objTipoFormacion = _.filter(vm.TiposFormaciones, function (tiposformacion) { return tiposformacion.ID == vm.SolicitudFormacion.TipoFormacionId });
        vm.SolicitudFormacion.TipoFormacion = objTipoFormacion[0];

        var objClasificacion = _.filter(vm.Clasificaciones, function (Clasificacion) { return Clasificacion.ID == vm.SolicitudFormacion.ClasifiacionId });
        vm.SolicitudFormacion.Clasificacion = objClasificacion[0];

        var objEvaluaciones = _.filter(vm.Evaluaciones, function (Evaluacion) { return Evaluacion.ID == vm.SolicitudFormacion.Evaluaci_x00f3_nId });
        vm.SolicitudFormacion.Evaluaci_x00f3_nId = objEvaluaciones[0];

        vm.SolicitudFormacion.RangoId = vm.SolicitudFormacion.RangoId.results;

        vm.SolicitudFormacion.Solicitante = vm.SolicitudFormacion.Solicitante.Title;
        var ResponsableActual = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=ResponsableActual/Title&$Expand=ResponsableActual&$filter=ID eq " + id);
        vm.SolicitudFormacion.ResponsableActual = ResponsableActual.results[0].ResponsableActual.Title;


        //Listar Anexos
        var listAnexosAs = queryList("../../_api/web/lists/getbytitle('Anexos')/items?$Select=Created,Title,Author/Title,TipoAnexo/Title&$Expand=Author&$Expand=TipoAnexo&$filter=SolicitudFormacion eq " + id)
        vm.ListAnexos = listAnexosAs.results;

        var listObservacionesAs = queryList("../_api/lists/getbytitle('Observaciones')/items?$Select=Observaci_x00f3_n,Created,Autor/Title&$Expand=Autor&$filter=SolicitudFormacionId eq " + id);
        vm.ListObservaciones = listObservacionesAs.results;

        var InformacionViaje = queryList("../_api/lists/getbytitle('InformacionViajes')/items?$filter=SolicitudFormacionId eq " + id);
        vm.InformacionViaje = InformacionViaje.results[0];
        rolGestion();
        funtionListarAutocomplet();
    }

    function funtionListarAutocomplet() {
        vm.SolicitudFormacion.AreasId = vm.SolicitudFormacion.AreasId.results
        _.each(vm.SolicitudFormacion.AreasId, function (x) {
            vm.areaSelecionada = _.filter(vm.ListaAreas, function (area) { return area.ID == x });
            vm.ListAreas.push(vm.areaSelecionada[0]);
        });
        vm.SolicitudFormacion.AsistentesId = vm.SolicitudFormacion.AsistentesId.results;
        _.each(vm.SolicitudFormacion.AsistentesId, function (a) {
            vm.AsistentesSelecionada = _.filter(vm.listaAsitentes, function (b) { return b.ID == a });
            vm.listAsitentes.push(vm.AsistentesSelecionada[0])
        });
    }

    function ListarTiposAnexos() {
        var TiposAnexos = queryList("../../_api/lists/getbytitle('TiposAnexos')/items?$select=ID,Title");
        vm.TiposAnexos = TiposAnexos.results;
    }
    function ListarFormaciones() {
        var TiposFormaciones = queryList("../_api/lists/getbytitle('TiposFormaciones')/items?$select=ID,Title");
        vm.TiposFormaciones = TiposFormaciones.results;
    }
    function ListarEvaluaciones() {
        var Evaluaciones = queryList("../_api/lists/getbytitle('Evaluaciones')/items?$select=ID,Title");
        vm.Evaluaciones = Evaluaciones.results;
    }
    function ListarClasificacion() {
        var Clasificaciones = queryList("../_api/lists/getbytitle('Clasificaciones')/items?$select=ID,Title");
        vm.Clasificaciones = Clasificaciones.results;
    }
    function ListarRangos() {
        var Rangos = queryList("../_api/lists/getbytitle('Rangos')/items?$select=ID,Title");
        vm.Rangos = Rangos.results;
    }
    function obtenerUsuarioActual() {
        return queryList('../_api/web/currentUser/');
    }
    function rolGestion() {
        vm.UsuarioActual = obtenerUsuarioActual();
        vm.RolUserCurrent = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=ID,Title,Rol&$filter=UsuarioId eq " + vm.UsuarioActual.Id);
        PermisosRol();
    }
    function ObtenerRolUsuario() {
        vm.UsuarioActual = obtenerUsuarioActual();
        SolicitudFormacionFirst();
    }
    function ListaAreas() {
        var ListaAreas = queryList("../_api/lists/getbytitle('Areas')/items");
        vm.ListaAreas = ListaAreas.results;
        angular.forEach(ListaAreas.results, function (value, key) {
            vm.ListaAreasAutocomplet.push(value.Title);
        });
    }
    function ListarAsistentes() {

        var ListaAsistentes = queryList("../_api/lists/getbytitle('Asistentes')/items?$Select=ID,Id,Nombre/Title&$Expand=Nombre");
        vm.listaAsitentes = ListaAsistentes.results;
        angular.forEach(ListaAsistentes.results, function (value, key) {
            vm.ListaAsistenteAutocomplet.push(value.Nombre.Title);
        });
    }


    vm.AnexarArchivos = function () {
        vm.notas = {
            fileInput: jQuery('#fileInput'),
            nombreBiblioteca: "Anexos",
            Title: $('#fileInput').val(),
            Created: formattedDate(),
            TipoAnexo: vm.TipoAnexoSelected,
            autor: vm.UsuarioActual.Title
        };


        vm.ListAnexos.push(vm.notas);
    }

    function PermisosRol() {
        if (vm.SolicitudFormacion.EstadoSolicitud != "Cancelada") {
            if (vm.RolUserCurrent.results.length == 0) {
                if (vm.SolicitudFormacion.SolicitanteId == vm.UsuarioActual.Id) {
                    if (vm.SolicitudFormacion.EstadoSolicitud == "Borrador") {
                        vm.disableGP = true;
                        vm.disableGF = true;
                        vm.disableGH = true;
                        vm.disableGHV = true;
                        vm.disableS = false;
                        vm.disableCancelar = true;
                        vm.ShowActualizar = false;
                    } else {
                        NoPermisos();
                        vm.disableCancelar = true;
                    }
                } else {
                    NoPermisos();
                }
            } else {
                if (vm.SolicitudFormacion.EstadoSolicitud == "Borrador") {
                    if (vm.SolicitudFormacion.SolicitanteId == vm.UsuarioActual.Id) {
                        vm.disableGP = true;
                        vm.disableGF = true;
                        vm.disableGH = true;
                        vm.disableS = false;
                        vm.disableGHV = true;
                        vm.EstadoSolicitudChange = 5;
                        vm.disableCancelar = true;
                    } else {
                        vm.disableGP = true;
                        vm.disableGF = true;
                        vm.disableGH = true;
                        vm.disableS = true;
                        vm.disableGHV = true;
                        vm.disableCancelar = false;
                    }
                } else {
                    if (vm.RolUserCurrent.results[0].Rol == "Gestion Humana") {
                        vm.Rol = 1;
                        vm.mensajeActualizar = "Presupuestar"
                        if (vm.SolicitudFormacion.EstadoSolicitud == "En presupuesto GH") {
                            vm.disableGP = true;
                            vm.disableGF = true;
                            vm.disableGH = false;
                            vm.disableGHV = false;
                            vm.disableS = true;
                            vm.disableCancelar = false;
                            vm.ShowActualizar = true;
                            vm.SolicitudFormacion.ResponsableActual = vm.UsuarioActual.Title;
                            vm.EstadoSolicitudChange = 1;
                            ObtenerResponsable("Gestor de presupuesto");
                        } else if (vm.SolicitudFormacion.EstadoSolicitud != "finalizada") {
                            vm.disableGP = true;
                            vm.disableGF = true;
                            vm.disableGH = false;
                            vm.disableGHV = true;
                            vm.disableS = true;
                            vm.disableCancelar = false;
                            vm.ShowActualizar = true;
                            vm.SolicitudFormacion.ResponsableActual = vm.UsuarioActual.Title;
                            vm.EstadoSolicitudChange = 4;
                            vm.ResponsableActualId = vm.UsuarioActual.Id;

                        }

                    } else if (vm.RolUserCurrent.results[0].Rol == "Gestor de presupuesto") {
                        vm.Rol = 2;
                        vm.mensajeActualizar = "Aprobar"
                        if (vm.SolicitudFormacion.EstadoSolicitud == "Presupuestada") {
                            vm.disableGP = false;
                            vm.disableGF = true;
                            vm.disableGH = true;
                            vm.disableGHV = true;
                            vm.disableS = true;
                            vm.disableCancelar = true;
                            vm.ShowActualizar = true;
                            vm.SolicitudFormacion.ResponsableActual = vm.UsuarioActual.Title;
                            vm.EstadoSolicitudChange = 2;

                            ObtenerResponsable("Gestor financiero");
                        } else {
                            NoPermisos();
                        }
                    } else if (vm.RolUserCurrent.results[0].Rol == "Gestor financiero") {
                        vm.Rol = 3;
                        vm.mensajeActualizar = "Pago realizado";
                        if (vm.SolicitudFormacion.EstadoSolicitud == "Aprobada") {
                            vm.disableGP = true;
                            vm.disableGF = false;
                            vm.disableGH = true;
                            vm.disableGHV = true;
                            vm.disableS = true;
                            vm.disableCancelar = false;
                            vm.ShowActualizar = true;
                            vm.SolicitudFormacion.ResponsableActual = vm.UsuarioActual.Title;
                            vm.EstadoSolicitudChange = 3;
                            ObtenerResponsable("Gestion Humana");
                        } else {
                            NoPermisos();
                        }

                    } else if (vm.RolUserCurrent.results[0].Rol == "Administrador") {
                        vm.mensajeActualizar = "Actualizar";
                        if (vm.SolicitudFormacion.EstadoSolicitud != "finalizada") {
                            vm.disableGP = true;
                            vm.disableGF = true;
                            vm.disableGH = false;
                            vm.disableGHV = true;
                            vm.disableS = true;
                            vm.ShowActualizar = true;
                            vm.SolicitudFormacion.ResponsableActual = vm.UsuarioActual.Title;
                            vm.EstadoSolicitudChange = 4;
                            vm.disableCancelar = true;
                            vm.ResponsableActualId = vm.UsuarioActual.Id;
                        }
                    }
                }
            }
        } else {
            NoPermisos();
        }
    }

    function NoPermisos() {
        vm.disableGP = true;
        vm.disableGF = true;
        vm.disableGH = true;
        vm.disableGHV = true;
        vm.disableS = true;
        vm.disableCancelar = false;
        vm.ShowActualizar = false;
    }

    function SolicitudFormacionFirst() {
        var FechaActual = formattedDate();
        vm.SolicitudFormacion = {
            ResponsableActual: vm.UsuarioActual.Title,
            EstadoSolicitud: 'Borrador',
            Formacion: '',
            Solicitante: vm.UsuarioActual.Title,
            Fechasolicitud: FechaActual
        }
    }

    vm.AgregarArea = function () {
        var opcion = vm.AreaSelect;
        vm.areaSelecionada = _.filter(vm.ListaAreas, function (area) { return area.Title == opcion });
        vm.ListAreas.push(vm.areaSelecionada[0]);
    }

    vm.AgregarAsistentes = function () {
        var opcion = vm.AsistentesSelect;
        vm.AsistentesSelecionada = _.filter(vm.listaAsitentes, function (a) { return a.Nombre.Title == opcion });
        vm.listAsitentes.push(vm.AsistentesSelecionada[0])
    }

    vm.addOservacion = function () {
        var observacionUsuario = vm.Observacion;
        if (observacionUsuario.trim() == "") {
            alert("No hay observación para agregar");
        } else {
            var autor = vm.UsuarioActual.Title;
            vm.notas = {
                Observaci_x00f3_n: observacionUsuario,
                autor: autor,
                ID: vm.UsuarioActual.Id,
                SolicitudFormacionId: null
            };
            vm.ListObservaciones.push(vm.notas);
            vm.Observacion = "";
        }

    }

    function formattedDate() {
        var d = new Date
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return month + "/" + day + "/" + year;
    }

    function GuardarObservaciones(idSolicitudes) {
        angular.forEach(vm.ListObservaciones, function (value, key) {
            if (value.ID != null) {
                var data = {
                    __metadata: { 'type': 'SP.Data.ObservacionesListItem' },
                    Title: '',
                    AutorId: vm.UsuarioActual.Id,
                    Observaci_x00f3_n: value.Observaci_x00f3_n,
                    SolicitudFormacionId: idSolicitudes

                }
                var url = "../_api/lists/getbytitle('Observaciones')/items"
                var ContextoSolicitud = getContext("../lists/Observaciones");
                var result = createItem(url, ContextoSolicitud, data);
                console.log(value);
            }
        });
    }

    function GuardarAnexos() {
        angular.forEach(vm.ListAnexos, function (value, key) {
            if (value.Author == undefined) {
                function callback(quepaso) {
                    console.log(quepaso);
                }
                var archivo = uploadFile(vm, value, callback);
            }
        });
    }

    function GuardarInfoViaje(IdSolicitud) {
        var data = {
            __metadata: { 'type': 'SP.Data.InformacionViajesListItem' },
            FechaInicio: vm.InformacionViaje.FechaInicio,
            FechaFin: vm.InformacionViaje.FechaFin,
            SolicitudFormacionId: IdSolicitud
        }
        var url = "../_api/lists/getbytitle('InformacionViajes')/items"
        var ContextoSolicitud = getContext("../lists/InformacionViajes");
        var result = createItem(url, ContextoSolicitud, data);
    }



    vm.GuardarFormacion = function () {
        if (validacionCampoRol()) {
            vm.ResponsableActualId = vm.UsuarioActual.Id;
            var data = getDataSolicitud("Borrador");
            GuardarSolicitudFormacion(data);
        }
    }

    function ObtenerResponsable(rol) {
        var responsableProxi = queryList("../_api/lists/getbytitle('Gestores')/items?$filter=Rol eq '" + rol + "'");
        vm.ResponsableActualId = responsableProxi.results[0].UsuarioId;
    }

    function getDataSolicitud(estado) {
        var fechassolicitud = new Date(vm.SolicitudFormacion.Fechasolicitud);
        var rango = {
            __metadata: { 'type': "Collection(Edm.Int32)" },
            results: vm.SolicitudFormacion.RangoId
        }


        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.ResponsableActualId,
            EstadoSolicitud: estado,
            Formacion: vm.SolicitudFormacion.Formacion,
            TipoFormacionId: vm.SolicitudFormacion.TipoFormacion.ID,
            SolicitanteId: vm.UsuarioActual.Id,
            Fechasolicitud: vm.SolicitudFormacion.Fechasolicitud,
            FechaInicio: vm.SolicitudFormacion.FechaInicio,
            ClasifiacionId: vm.SolicitudFormacion.Clasificacion.ID,
            Duracion: parseInt(vm.SolicitudFormacion.Duracion),
            Evaluaci_x00f3_nId: vm.SolicitudFormacion.Evaluaci_x00f3_nId.ID,
            Cupos: parseInt(vm.SolicitudFormacion.Cupos),
            Entidad: vm.SolicitudFormacion.Entidad,
            Valorindividual: parseFloat(vm.SolicitudFormacion.Valorindividual),
            TotalCurso: parseFloat(vm.SolicitudFormacion.Cupos * vm.SolicitudFormacion.Valorindividual),
            RequiereViaje: vm.SolicitudFormacion.RequiereViaje,
            Temario: vm.SolicitudFormacion.Temario,
            RangoId: rango,
            Total: vm.sumaTotal(),
            SolicitudAprobada: false
        }
        return data;
    }

    function GuardarSolicitudFormacion(data) {
        vm.ResponsableActualId = vm.UsuarioActual.Id;
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/items"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = createItem(url, ContextoSolicitud, data);
        if (result != null) {
            vm.id = result.d.ID;
            if (vm.ListObservaciones != null) {
                GuardarObservaciones(result.d.ID);
            }
            if (vm.SolicitudFormacion.RequiereViaje != false) {
                GuardarInfoViaje(result.d.ID);
            }
            if (vm.ListAnexos != null) {
                GuardarAnexos(result.d.ID);
            }
            if (result) {
                vm.alertPeligro = false;
                vm.alertExito = true;
                vm.mesaje = "Felicidades su registro se guard\u00F3 con \u00e9xito ";
            } else {
                vm.mensajeError = true;
                vm.mesaje = "Su registro no se guard\u00F3, intentelo nuevamente";
            }

        }
    }

    vm.sumaTotal = function () {
        var total = 0;
        if (vm.SolicitudFormacion.RequiereViaje) {
            if (vm.InformacionViaje == undefined) {
                total = vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos;
            } else {
                if (vm.InformacionViaje.ValorHotel == undefined) {
                    total = vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos;
                } else {
                    total = (vm.InformacionViaje.ValorHotel + vm.InformacionViaje.ValorTramsporte + vm.InformacionViaje.ValorTiquete + vm.InformacionViaje.ValorViaticos + vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos)
                }
            }
        } else {
            total = vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos;
        }
        return total;
    }

    vm.ActualizarInforacion = function () {
        var data
        if (validacionCampoRol()) {
            if (vm.id != 0) {
                if (vm.solicitudEnLista) {
                    if (vm.RolUserCurrent.results.length > 0) {
                        if (vm.SolicitudFormacion.SolicitanteId == vm.UsuarioActual.Id) {
                            ObtenerResponsable("Gestion Humana");
                            data = getDataSolicitud("En presupuesto GH");
                        } else {

                            if (vm.RolUserCurrent.results[0].Rol == "Gestion Humana") {
                                data = dataActualizacionGH();

                            } else if (vm.RolUserCurrent.results[0].Rol == "Gestor de presupuesto") {
                                if (vm.SolicitudFormacion.SolicitudAprobada) {
                                    data = dataActualizacionGP();
                                } else {
                                    alert("Debe aprobar o cancelar la solicitud")
                                }

                            } else if (vm.RolUserCurrent.results[0].Rol == "Gestor financiero") {
                                data = dataActualizacionGF();
                            }
                            else if (vm.RolUserCurrent.results[0].Rol == "Administrador") {

                            } else {
                                ObtenerResponsable("Gestion Humana");
                                data = getDataSolicitud("En presupuesto GH");
                            }
                        }
                    } else {
                        ObtenerResponsable("Gestion Humana");
                        data = getDataSolicitud("En presupuesto GH");
                    }
                } else {
                    ObtenerResponsable("Gestion Humana");
                    data = getDataSolicitud("En presupuesto GH");
                }
            }

            GuardarObservaciones(vm.id);
            GuardarAnexos();

            var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + vm.id + ")"
            var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
            var result = updateItem(url, ContextoSolicitud, data);
            if (result) {
                vm.alertPeligro = false;
                vm.alertExito = true;
                vm.mesaje = "Felicidades su registro se actualiz\u00F3 con \u00e9xito ";
            } else {
                vm.mensajeError = true;
                vm.mesaje = "Su registro no se guard\u00F3, intentelo nuevamente";
            }
        }
    }

    function dataActualizacionGF() {
        var estado = EstadoSolicitud();
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.ResponsableActualId,
            EstadoSolicitud: estado,
            FechaPago: vm.SolicitudFormacion.FechaPago
        }
        return data;
    }

    function dataActualizacionGP() {
        var estado = EstadoSolicitud();
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.ResponsableActualId,
            EstadoSolicitud: estado,
            SolicitudAprobada: vm.SolicitudFormacion.SolicitudAprobada,
        }
        return data;
    }

    function dataActualizacionGH() {
        var estado = EstadoSolicitud();
        if (vm.SolicitudFormacion.RequiereViaje) {
            var result = ActualizacionInformacionViaje();
        }

        var objAsistentes = _.pluck(vm.listAsitentes, 'ID')
        var Asistentes = {
            __metadata: { 'type': "Collection(Edm.Int32)" },
            results: objAsistentes
        }
        var objAreas = _.pluck(vm.ListAreas, 'ID');
        var Area = {
            __metadata: { 'type': "Collection(Edm.Int32)" },
            results: objAreas
        }

        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.ResponsableActualId,
            EstadoSolicitud: estado,
            AreasId: Area,
            AsistentesId: Asistentes,
            Total: vm.sumaTotal(),
        }
        return data;
    }

    function ActualizacionInformacionViaje() {
        var data = {
            __metadata: { 'type': 'SP.Data.InformacionViajesListItem' },
            ValorViaticos: vm.InformacionViaje.ValorViaticos,
            ValorTiquete: vm.InformacionViaje.ValorTiquete,
            ValorTramsporte: vm.InformacionViaje.ValorTramsporte,
            ValorHotel: vm.InformacionViaje.ValorHotel

        }
        var url = "../_api/lists/getbytitle('InformacionViajes')/Items(" + vm.InformacionViaje.ID + ")";
        var ContextoSolicitud = getContext("../lists/InformacionViajes");
        var result = updateItem(url, ContextoSolicitud, data);
    }

    function EstadoSolicitud() {
        switch (vm.EstadoSolicitudChange) {
            case 1: return "Presupuestada";
            case 2: return "Aprobada";
            case 3: return "Pago Realizado";
            case 4: return vm.SolicitudFormacion.EstadoSolicitud;
            case 5: return "En presupuesto GH";
        }
    }

    vm.EliminarAreasSelecionada = function () {
        vm.SolicitudFormacion.AreasId
        _.each(vm.SolicitudFormacion.AreasId, function (area) {
            var ListAreas = _.filter(vm.ListAreas, function (areas) { return areas.ID != area });
            vm.ListAreas = ListAreas;
        });
    }

    vm.EliminarAsistentesSelecionada = function () {
        vm.SolicitudFormacion.AsistentesId
        _.each(vm.SolicitudFormacion.AsistentesId, function (a) {
            var obj = _.filter(vm.listAsitentes, function (b) { return b.ID != a });
            vm.listAsitentes = obj;
        });
    }

    vm.Enviar = function () {
        if (validacionCampoRol()) {
            if (vm.id > 0) {
                vm.ActualizarInforacion();
            } else {
                ObtenerResponsable("Gestion Humana");
                var data = getDataSolicitud("En presupuesto GH");
                GuardarSolicitudFormacion(data);

            }
        }
    }

    vm.init = function () {
        if (vm.SolicitudFormacion.RequiereViaje == true || vm.SolicitudFormacion.RequiereViaje != undefined) {
            true;
        } else {
            vm.SolicitudFormacion.RequiereViaje = false;
            false;
        }
    }

    vm.cancelarSolicitud = function () {
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            EstadoSolicitud: "Cancelada",
            ResponsableActualId: vm.ResponsableActualId,
        }
        GuardarObservaciones(vm.id);
        GuardarAnexos();

        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + vm.id + ")"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = updateItem(url, ContextoSolicitud, data);
        if (result) {
            alert("Actualizado")
        }
    }

    function validacionCampoRol() {
        vm.mensajePeligro = [];
        if (vm.Rol == 0) {
            if (vm.SolicitudFormacion.TipoFormacion == undefined) {
                vm.mensajePeligro.push("Debe selecionar un Tipo Formaci\u00F3n");
            }
            if (vm.SolicitudFormacion.FechaInicio == undefined) {
                vm.mensajePeligro.push("Debe selecionar una fecha de inicio ");
            }
            if (vm.SolicitudFormacion.Formacion == "") {
                vm.mensajePeligro.push("Debe escribir el nombre de la formaci\u00F3n");
            }
            if (vm.SolicitudFormacion.Clasificacion == undefined) {
                vm.mensajePeligro.push("Debes selecionar una clasificaci\u00F3n");
            }
            if (vm.SolicitudFormacion.Evaluaci_x00f3_nId == undefined) {
                vm.mensajePeligro.push("Debes selecionar una Evaluaci\u00F3n");
            }
            if (vm.SolicitudFormacion.Cupos == undefined) {
                vm.mensajePeligro.push("Debes agregar n\u00FAmero de cupos");
            }
            if (vm.SolicitudFormacion.Entidad == "") {
                vm.mensajePeligro.push("Debes agregar Entidad de formac\u00F3n");
            }
            if (vm.SolicitudFormacion.Valorindividual == undefined) {
                vm.mensajePeligro.push("Debes agregar Valor individual ");
            }
            if (vm.SolicitudFormacion.RangoId == undefined) {
                vm.mensajePeligro.push("Debes selecionar un rango ");
            }
            if (vm.SolicitudFormacion.Duracion == undefined) {
                vm.mensajePeligro.push("Debes agregar la duraci\u00F3n ");
            }
            if (vm.SolicitudFormacion.RequiereViaje) {
                if (vm.InformacionViaje == undefined) {
                    vm.mensajePeligro.push("Debes selecionar fecha de inicio y final del viaje");
                } else {
                    if (vm.InformacionViaje.FechaInicio == undefined) {
                        vm.mensajePeligro.push("Debes selecionar fecha de inicio del viaje ");
                    }
                    if (vm.InformacionViaje.FechaFin == undefined) {
                        vm.mensajePeligro.push("Debes selecionar fecha fin del viaje ");
                    }
                }

            }
        } else if (vm.Rol == 1) {
            if (vm.SolicitudFormacion.RequiereViaje) {
                if (vm.InformacionViaje == undefined) {
                    vm.mensajePeligro.push("Debes agregar los valores de viaje");
                } else {
                    if (vm.InformacionViaje.ValorViaticos == undefined) {
                        vm.mensajePeligro.push("Debes agregar el valor de los viaticos ");
                    }
                    if (vm.InformacionViaje.ValorTiquete == undefined) {
                        vm.mensajePeligro.push("Debes agregar el valor de los tiquetes ");
                    }
                    if (vm.InformacionViaje.ValorTramsporte == undefined) {
                        vm.mensajePeligro.push("Debes agregar el valor del transporte ");
                    }
                    if (vm.InformacionViaje.ValorHotel == undefined) {
                        vm.mensajePeligro.push("Debes agregar el valor del hotel ");
                    }
                }
                if (vm.listAsitentes.length == 0) {
                    vm.mensajePeligro.push("Debes agregar los asistentes ");
                }
                if (vm.ListAreas.length == 0) {
                    vm.mensajePeligro.push("Debes agregar las areas ");
                }
            }
        } else if (vm.Rol == 2) {
            if(vm.SolicitudFormacion.SolicitudAprobada == false)
                vm.mensajePeligro.push("Recuerda checkear el campo aprobación");
        } else if (vm.Rol == 3) {
            if (vm.SolicitudFormacion.FechaPago == undefined)
                vm.mensajePeligro.push("Se debe selecionar fecha de pago"); 
        }
        if (vm.mensajePeligro.length > 0) {
            vm.alertPeligro = true;
            return false;
        } else {
            return true;
        }
    }
}