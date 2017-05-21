AppController.controller('InicioController', InicioController);

function InicioController() {
    var vm = this;

    vm.GestorPresupuesto = queryList("../_api/web/lists/getbytitle('Gestores')/items?$select=Id,Rol,UsuarioId&$filter=Rol eq 'Gestor de presupuesto' ");

    $scope.mostrarPlan = true;

    if (vm.GestorPresupuesto.UsuarioId == vm.UsuarioActual.Id) {
        $scope.mostrarPlan = true;
    } else {
        $scope.mostrarPlan = false;
    }

    vm.myInterval = 3000;
    vm.noWrapSlides = false;
    vm.active = 0;
    //vm.slides = [
    //{
    //    image: 'http://lorempixel.com/400/200/'
    //},
    //{
    //    image: 'http://lorempixel.com/400/200/food'
    //},
    //{
    //    image: 'http://lorempixel.com/400/200/sports'
    //},
    //{
    //    image: 'http://lorempixel.com/400/200/people'
    //}
    //];

    var Imagenes = queryList("../_api/lists/getbytitle('Carousel')/items?");

    var slider = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Banner" });
    
    vm.slides = slider;

    var opcion1 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion1" });
    vm.opcion1 = opcion1[0];

    var opcion2 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion2" });
    vm.opcion2 = opcion2[0];

    var opcion3 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion3" });
    vm.opcion3 = opcion3[0];
}