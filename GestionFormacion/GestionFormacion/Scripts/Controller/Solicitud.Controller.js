
AppSolicitud.controller('SolicitudController', SolicitudController);

function SolicitudController() {
    var vm = this;
    vm.disableGP = true;
    vm.disableGF = true;
    vm.disableGH = true;
    vm.TiposFormaciones = {};
    vm.ListaAreasAutocomplet = [];
    vm.ListObservaciones = [];
    vm.AreaSelect = "";
    vm.RangoSelected = {};
    
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
    selectPerfil();
    function ListarInformacionSolicitud(id) {

        var SolicitudFormacion = queryList("../_api/web/lists/getbytitle('SolicitudesFormacion')/items?$filter=ID eq "+ id );
        vm.SolicitudFormacion = SolicitudFormacion.results[0];
    }

    function ListarFormaciones() {
        var TiposFormaciones = queryList("../_api/lists/getbytitle('TiposFormaciones')/items?$select=ID,Title");
        vm.TiposFormaciones = TiposFormaciones.results;
        debugger;
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
    function ObtenerSolicitante() {
         return queryList('../_api/web/currentUser/'); 
    }
    function ObtenerRolUsuario() {
        vm.UsuarioActual = ObtenerSolicitante();
        vm.RolUserCurrent = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=ID,Title,Rol&$filter=UsuarioId eq " + vm.UsuarioActual.Id + "");
        PermisosRol();
        SolicitudFormacionFirst();
    }
    function ListaAreas() {
        
        var ListaAreas = queryList("../_api/lists/getbytitle('Areas')/items?$select=Title");
        angular.forEach(ListaAreas.results, function (value, key) {
            vm.ListaAreasAutocomplet.push(value.Title);
        });
    }
    vm.AnexarArchivos = function() {
        debugger;
        var file = $('#fileInput').val();
        var archivo = uploadFile(vm, file, "Anexos");
    }

    function PermisosRol() {

        if (vm.RolUserCurrent.Rol == "Gestor Prosupuestos")
        {
            if (vm.SolicitudFormacion.EstadoSolicitud == "Presupuestada")
                vm.disableGP = false;
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
        vm.ListAreas.push(opcion)
    }
    vm.addOservacion = function () {
          var observacionUsuario = vm.Observacion;
          if (observacionUsuario.trim() == "") {
              alert("No hay observación para agregar");
          } else {
              var autor = vm.UsuarioActual.Title;
              vm.notas = {
                  observacion: observacionUsuario,
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
                    Observaci_x00f3_n: value.observacion,
                    SolicitudFormacionId: idSolicitudes

                }
                var url = "../_api/lists/getbytitle('Observaciones')/items"
                var ContextoSolicitud = getContext("../lists/Observaciones");
                var result = createItem(url, ContextoSolicitud, data);
            }
        });
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

    //GuardarDatosPruebas();

    vm.GuardarFormacion = function () {
        var fechassolicitud =new Date(vm.SolicitudFormacion.Fechasolicitud);

        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: vm.UsuarioActual.Id,
            EstadoSolicitud: vm.SolicitudFormacion.EstadoSolicitud,
            Formacion: vm.SolicitudAprobada.Formacion,
            TipoFormacionId: vm.SolicitudAprobada.TipoFormacionId.ID,
            SolicitanteId: vm.UsuarioActual.Id,
            Fechasolicitud: vm.SolicitudFormacion.Fechasolicitud,
            FechaInicio: vm.SolicitudAprobada.fechaInicio,
            ClasifiacionId: vm.SelectClasificacion.ID,
            Duracion: parseInt(vm.SolicitudAprobada.Duracion),
            Evaluaci_x00f3_nId: vm.Evaluaci_x00f3_nId.ID,
            Cupos: parseInt(vm.SolicitudAprobada.Cupos),
            Entidad: vm.SolicitudAprobada.Entidad,
            Valorindividual: parseFloat(vm.SolicitudAprobada.VI),
            TotalCurso: parseFloat(vm.Cupos * vm.VI),
            RequiereViaje: vm.SolicitudAprobada.checkedViaje,
            Temario: vm.SolicitudAprobada.Temario,
            SolicitudAprobada: false
        }
    }

    function GuardarSolicitudFormacion(data){
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/items"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = createItem(url, ContextoSolicitud, data);

        GuardarObservaciones(result.d.ID);
    }

}