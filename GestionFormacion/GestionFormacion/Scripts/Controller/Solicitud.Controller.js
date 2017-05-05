
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

}