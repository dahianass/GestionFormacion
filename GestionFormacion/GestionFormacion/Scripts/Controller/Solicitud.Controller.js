
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
    

    var id = getQueryStringParams("ID");
    if (id != undefined) {

    } else {
        ObtenerRolUsuario();
    }

    ListarFormaciones();
    ListarEvaluaciones();
    ListarClasificacion();
    ListarRangos();
    ListaAreas();

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
                  Id: vm.UsuarioActual.Id
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

    function GuardarObservaciones() {
        var data = {
            __metadata: { 'type': 'SP.Data.ObservacionesListItem' },
            Title: 'New title',
            AutorId: 231,
            Observaci_x00f3_n: 'Mi primera observacion',
        }
        var url = "../_api/lists/getbytitle('Observaciones')/items"
        var ContextoSolicitud = getContext("../lists/Observaciones");
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
    }

    GuardarDatosPruebas()

    vm.GuardarFormacion = function () {
        var data = {
            __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
            ResponsableActualId: 231,
            EstadoSolicitud: "Borrador",
            Formacion: "FormacionSharepoint",
            TipoFormacionId: 3,
            SolicitanteId: 231,
            Fechasolicitud: '2017-05-06T05:00:00Z',
            FechaInicio: '2017-12-06T05:00:00Z',
            ClasifiacionId: 2,
            Duracion: 20,
            Evaluaci_x00f3_nId: 1,
            Cupos: 2,
            Entidad: 'Universidad de Antioquia',
            Valorindividual: 20000,
            TotalCurso: 40000,
            InformacionviajeId: 1,
            Temario: 'Tema uno',
            SolicitudAprobada : false
        }
        var url = "../_api/lists/getbytitle('SolicitudesFormacion')/items"
        var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
        var result = createItem(url, ContextoSolicitud, data);
    }

}