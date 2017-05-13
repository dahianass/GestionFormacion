
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
    vm.id = 0;
    vm.ShowActualizar = false;
    function selectPerfil() {
        var id = getQueryStringParams("ID");
        if (id != undefined) {
            ListarInformacionSolicitud(id);
        } else {
            ObtenerRolUsuario();
        }
    }

    //GuardarDatosPruebas();
    ListarFormaciones();
    ListarEvaluaciones();
    ListarClasificacion();
    ListarRangos();
    ListaAreas();
    ListarAsistentes()
    selectPerfil();

    function ListarInformacionSolicitud(id) {

        var SolicitudFormacion = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId" +
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId" +
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje" +
                                        ",Temario,SolicitudAprobada,AreasId,AsistentesId,ID,Solicitante/Title&$Expand=Solicitante&$filter=ID eq " + id);
        vm.id = SolicitudFormacion.results[0].Id;

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
        var listAnexosAs = queryList("../../_api/web/lists/getbytitle('Anexos')/items?$Select=Created,Title,Author/Title&$Expand=Author&$filter=SolicitudFormacion eq " + id)
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

        var ListaAsistentes = queryList("../_api/lists/getbytitle('Asistentes')/items");
        vm.listaAsitentes = ListaAsistentes.results;
        angular.forEach(ListaAsistentes.results, function (value, key) {
            vm.ListaAsistenteAutocomplet.push(value.Title);
        });
    }


    vm.AnexarArchivos = function () {
        vm.notas = {
            fileInput: jQuery('#fileInput'),
            nombreBiblioteca: "Anexos",
            Title: $('#fileInput').val(),
            Created: formattedDate(),
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

                        }

                    } else if (vm.RolUserCurrent.results[0].Rol == "Gestor de presupuesto") {
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
                        } else {
                            NoPermisos();
                        }
                    } else if (vm.RolUserCurrent.results[0].Rol == "Gestor financiero") {
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
                        } else {
                            NoPermisos();
                        }

                    } else if (vm.RolUserCurrent.results[0].Rol == "Administrador") {
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
        vm.AsistentesSelecionada = _.filter(vm.listaAsitentes, function (a) { return a.Title == opcion });
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
                var archivo = uploadFile(vm, value);
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

    function GuardarDatosPruebas() {
        var data = {
            __metadata: { 'type': 'SP.Data.TiposFormacionesListItem' },
            Title: 'Seminario',
        }
        var url = "../_api/lists/getbytitle('TiposFormaciones')/items"
        var ContextoSolicitud = getContext("../lists/TiposFormaciones");
        var result = createItem(url, ContextoSolicitud, data);

        //
        var data = {
            __metadata: { 'type': 'SP.Data.TiposFormacionesListItem' },
            Title: 'Curso',
        }
        var url = "../_api/lists/getbytitle('TiposFormaciones')/items"
        var ContextoSolicitud = getContext("../lists/TiposFormaciones");
        var result = createItem(url, ContextoSolicitud, data);


        //
        var data = {
            __metadata: { 'type': 'SP.Data.ClasificacionesListItem' },
            Title: 'Interna',
        }
        var url = "../_api/lists/getbytitle('Clasificaciones')/items"
        var ContextoSolicitud = getContext("../lists/Clasificaciones");
        var result = createItem(url, ContextoSolicitud, data);


        //
        var data = {
            __metadata: { 'type': 'SP.Data.EvaluacionesListItem' },
            Title: 'Por definir',
        }
        var url = "../_api/lists/getbytitle('Evaluaciones')/items"
        var ContextoSolicitud = getContext("../lists/Evaluaciones");
        var result = createItem(url, ContextoSolicitud, data);

        //
        var data = {
            __metadata: { 'type': 'SP.Data.RangosListItem' },
            Title: 'Cordinadores',
        }
        var url = "../_api/lists/getbytitle('Rangos')/items"
        var ContextoSolicitud = getContext("../lists/Rangos");
        var result = createItem(url, ContextoSolicitud, data);
        //
        var data = {
            __metadata: { 'type': 'SP.Data.RangosListItem' },
            Title: 'Gerente',
        }
        var url = "../_api/lists/getbytitle('Rangos')/items"
        var ContextoSolicitud = getContext("../lists/Rangos");
        var result = createItem(url, ContextoSolicitud, data);

    }

    vm.GuardarFormacion = function () {

        var data = getDataSolicitud("Borrador");
        GuardarSolicitudFormacion(data);
    }

    function getDataSolicitud(estado) {
        var fechassolicitud = new Date(vm.SolicitudFormacion.Fechasolicitud);
        var rango = {
            __metadata: { 'type': "Collection(Edm.Int32)" },
            results: vm.SolicitudFormacion.RangoId
        }

        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.Id,
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
            SolicitudAprobada: false
        }
        return data;
    }

    function GuardarSolicitudFormacion(data) {
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
                GuardarAnexos();
            }
            alert("Guardo")
        }
    }

    vm.sumaTotal = function () {
        var total = 0;
        if (vm.InformacionViaje != undefined) {
            //total = (vm.InformacionViaje.ValorHotel + vm.InformacionViaje.ValorTramsporte + vm.InformacionViaje.ValorTiquete + vm.InformacionViaje.ValorViaticos + vm.SolicitudFormacion.Valorindividual * vm.SolicitudFormacion.Cupos)
        }
        return total;
    }

    vm.ActualizarInforacion = function () {
        var data
        if (vm.id != 0) {
            if (vm.RolUserCurrent.results.length > 0) {
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
                    data = getDataSolicitud("En presupuesto GH");
                }
            } else {
                data = getDataSolicitud("En presupuesto GH");
            }
        } else {
            data = getDataSolicitud("En presupuesto GH");
        }

        GuardarObservaciones(vm.id);
        GuardarAnexos();

        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + vm.id + ")"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = updateItem(url, ContextoSolicitud, data);
        if (result) {
            alert("Actualizado")
            console.log(result);
        }
    }

    function dataActualizacionGF() {
        var estado = EstadoSolicitud();
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.Id,
            EstadoSolicitud: estado,
            FechaPago: vm.SolicitudFormacion.FechaPago
        }
        return data;
    }

    function dataActualizacionGP() {
        var estado = EstadoSolicitud();
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.Id,
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
            ResponsableActualId: vm.UsuarioActual.Id,
            EstadoSolicitud: estado,
            AreasId: Area,
            AsistentesId: Asistentes,
        }
        return data;
    }

    function ActualizacionInformacionViaje() {
        var data = {
            __metadata: { 'type': 'SP.Data.InformacionViajesListItem' },
            ValorViaticos: vm.InformacionViaje.ValorViaticos,
            ValorTiquete: vm.InformacionViaje.ValorTiquete,
            ValorTramsporte: vm.InformacionViaje.ValorTramsporte,
            ValorHotel: vm.InformacionViaje.ValorHotel,
            ValorTotal: ((vm.InformacionViaje.ValorHotel + vm.InformacionViaje.ValorTramsporte + vm.InformacionViaje.ValorTiquete + vm.InformacionViaje.ValorViaticos) * vm.SolicitudFormacion.Cupos),

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
        if (vm.id > 0) {
            vm.ActualizarInforacion();
        } else {
            var data = getDataSolicitud("En presupuesto GH");
            GuardarSolicitudFormacion(data);

        }
    }

    vm.init = function () {
        if (vm.SolicitudFormacion.RequiereViaje == true || vm.SolicitudFormacion.RequiereViaje != undefined) {
            true;
        } else {
            false;
            vm.SolicitudFormacion.RequiereViaje = false;
        }
    }

    vm.cancelarSolicitud = function () {
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            EstadoSolicitud: "Cancelada",
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
}