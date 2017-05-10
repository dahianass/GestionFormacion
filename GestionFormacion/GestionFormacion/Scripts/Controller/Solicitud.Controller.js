
AppSolicitud.controller('SolicitudController', SolicitudController);

function SolicitudController() {
    var vm = this;
    vm.disableGP = true;
    vm.disableGF = true;
    vm.disableGH = true;
    vm.disableS = false;
    vm.TiposFormaciones = {};
    vm.ListaAreasAutocomplet = [];
    vm.ListObservaciones = [];
    vm.ListAnexos = []
    vm.ListAreas = [];
    vm.AreaSelect = "";
    vm.RangoSelected = {};
    vm.IdSolicitud = 1;
    
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
    selectPerfil();
    function ListarInformacionSolicitud(id) {

        var SolicitudFormacion = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$Select=Id,ResponsableActualId,ResponsableActualStringId,EstadoSolicitud,Formacion,FechaPago,TipoFormacionId,SolicitanteId,SolicitanteStringId"+
                                        ",Fechasolicitud,FechaInicio,ClasifiacionId,Duracion,Evaluaci_x00f3_nId"+
                                        ",Cupos,Entidad,Valorindividual,TotalCurso,RangoId,RequiereViaje"+
                                        ",Temario,SolicitudAprobada,ID,Solicitante/Title&$Expand=Solicitante&$filter=ID eq " + id);

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
    function ListarRangos(){
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
        if (vm.RolUserCurrent.results[0].Rol == "Gestion Humana")
        {
            if (vm.SolicitudFormacion.EstadoSolicitud == "Borrador")
                vm.disableGP = true;
                vm.disableGF = true;
                vm.disableGH = false;
                vm.disableS = true;
        }
    }

    function SolicitudFormacionFirst() {
        var FechaActual = formattedDate();
        vm.SolicitudFormacion = {
            ResponsableActual: vm.UsuarioActual.Title,
            EstadoSolicitud: 'Borrador',
            Formacion: '',
            FechaPago: '01/01/1900',
            Solicitante: vm.UsuarioActual.Title,
            Fechasolicitud: FechaActual
        }
    }
    vm.AgregarArea = function () {
        var opcion = vm.AreaSelect;
        vm.areaSelecionada = _.filter(vm.ListaAreas, function (area) { return area.Title == opcion});
        vm.ListAreas.push(vm.areaSelecionada[0])
    }
    vm.addOservacion = function () {
          var observacionUsuario = vm.Observacion;
          if (observacionUsuario.trim() == "") {
              alert("No hay observación para agregar");
          } else {
              var autor = vm.UsuarioActual.Title;
              vm.notas = {
                  Observaci_x00f3_n: Observaci_x00f3_n,
                  autor: autor,
                  ID: vm.UsuarioActual.Id,
                  SolicitudFormacionId:null
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
                if (value.SolicitudFormacionId == null) {
                    var data = {
                        __metadata: { 'type': 'SP.Data.ObservacionesListItem' },
                        Title: '',
                        AutorId: vm.UsuarioActual.Id,
                        ListObservaciones: value.ListObservaciones,
                        SolicitudFormacionId: idSolicitudes

                    }
                    var url = "../_api/lists/getbytitle('Observaciones')/items"
                    var ContextoSolicitud = getContext("../lists/Observaciones");
                    var result = createItem(url, ContextoSolicitud, data);
                }
            });
    }
    function GuardarAnexos() {
        angular.forEach(vm.ListAnexos, function (value, key) {
            var archivo = uploadFile(vm, value);
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
        var fechassolicitud = new Date(vm.SolicitudFormacion.Fechasolicitud);
        var rango = {
            __metadata:{'type':"Collection(Edm.Int32)"},
            results: vm.SolicitudFormacion.RangoId
        }

        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.Id,
            EstadoSolicitud: "Borrador",
            Formacion: vm.SolicitudFormacion.Formacion,
            TipoFormacionId:vm.SolicitudFormacion.TipoFormacion.ID,
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

        GuardarSolicitudFormacion(data);
    }

    function GuardarSolicitudFormacion(data){
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/items"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = createItem(url, ContextoSolicitud, data);
        if (result != null)
        {
            vm.IdSolicitud = result.d.ID;
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
    vm.ActualizarInforacion = function () {
        vm.SolicitudFormacion.AreasId
        console.log(vm.ListAreas);
        _.each(vm.SolicitudFormacion.AreasId, function (area) { 
            var ListAreas = _.filter(vm.ListAreas, function (areas) { return areas.ID != area });
            vm.ListAreas = ListAreas;
        });
        console.log(vm.ListAreas);
    }

}