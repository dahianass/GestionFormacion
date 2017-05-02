
AppSolicitud.controller('SolicitudController', SolicitudController);

SolicitudController.$inject = ['ngAutocomplete'];

function SolicitudController(ngAutocomplete) {
    var vm = this;
    vm.TiposFormaciones = {};
    vm.Solicitante = "Jose Restrepo";
    ListarFormaciones();
    ListarEvaluaciones();
    ListarClasificacion();
    ListarRangos();
    ObtenerSolicitante();
    

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
        vm.UsuarioActual = queryList('../_api/web/currentUser/');
        console.log(vm.TiposFormaciones);
    }
    
}