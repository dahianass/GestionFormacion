AppController.controller('InicioController', InicioController);

function InicioController() {
    var vm = this;
    vm.myInterval = 3000;
    vm.noWrapSlides = false;
    vm.active = 0;

    var Imagenes = queryList("../_api/lists/getbytitle('Carousel')/items?");

    var slider = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Banner" });
    
    vm.slides = slider;

    var opcion1 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion1" });
    vm.opcion1 = opcion1[0];

    var opcion2 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion2" });
    vm.opcion2 = opcion2[0];

    var opcion3 = _.filter(Imagenes.results, function (imagen) { return imagen.Choice == "Opcion3" });
    vm.opcion3 = opcion3[0];

    vm.functionGuardarDatos = function () {
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

        //areas
            var data = {
                __metadata: { 'type': 'SP.Data.AreasListItem' },
                Title: 'Contabilidad',
            }
            var url = "../_api/lists/getbytitle('Areas')/items"
            var ContextoSolicitud = getContext("../lists/Areas");
            var result = createItem(url, ContextoSolicitud, data);

            var data = {
                __metadata: { 'type': 'SP.Data.AreasListItem' },
                Title: 'Sistemas',
            }
            var url = "../_api/lists/getbytitle('Areas')/items"
            var ContextoSolicitud = getContext("../lists/Areas");
            var result = createItem(url, ContextoSolicitud, data);

        //Asistentes

            var data = {
                __metadata: { 'type': 'SP.Data.AsistentesListItem' },
                NombreId: 231,
                Title: 'Contabilidad',
                AreaId: 2,
                Cargo: "Contador"
            }
            var url = "../_api/lists/getbytitle('Asistentes')/items"
            var ContextoSolicitud = getContext("../lists/Asistentes");
            var result = createItem(url, ContextoSolicitud, data);


            var data = {
                __metadata: { 'type': 'SP.Data.AsistentesListItem' },
                NombreId: 216,
                Title: 'Sistemas',
                AreaId: 1,
                Cargo:"Analista"
            }
            var url = "../_api/lists/getbytitle('Asistentes')/items"
            var ContextoSolicitud = getContext("../lists/Asistentes");
            var result = createItem(url, ContextoSolicitud, data);




            //Formacion

            //var rango = {
            //    __metadata: { 'type': "Collection(Edm.Int32)" },
            //    results: 1
            //}

            var data = {
                __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
                ResponsableActualId:231,
                EstadoSolicitud: "En presupuesto GH",
                Formacion: "Formacion",
                TipoFormacionId: 1,
                SolicitanteId: 231,
                Fechasolicitud: "12/05/2017",
                FechaInicio: "12/06/2017",
                ClasifiacionId: 1,
                Duracion: 20,
                Evaluaci_x00f3_nId: 1,
                Cupos: 2,
                Entidad: "Joder",
                Valorindividual: 2500,
                TotalCurso: 5000,
                RequiereViaje:false,
                Temario:"ñsdjfñlakjslñd kfjañlksjdf",
                RangoId: rango,
                Total: 5000,
                SolicitudAprobada: false
            }

            var url = "../_api/lists/getbytitle('SolicitudesFormacion')/items"
            var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");

            var result = createItem(url, ContextoSolicitud, data);


            var data = {
                __metadata: { 'type': 'SP.Data.TiposFormacionesListItem' },
                Title: 'Seminario',
            }
            var url = "../_api/lists/getbytitle('TiposFormaciones')/items"
            var ContextoSolicitud = getContext("../lists/TiposFormaciones");
            var result = createItem(url, ContextoSolicitud, data);




        //Formacion

            var Asistentes = {
                __metadata: { 'type': "Collection(Edm.Int32)" },
                results: 1
            }
            
            var Area = {
                __metadata: { 'type': "Collection(Edm.Int32)" },
                results: 1
            }


            var data = {
                __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
                ResponsableActualId: 231,
                EstadoSolicitud: "Presupuestada",
                AreasId: Area,
                AsistentesId: Asistentes,
            }


            var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + vm.id + ")"
            var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
            var result = updateItem(url, ContextoSolicitud, data);

            var Asistentes = {
                __metadata: { 'type': "Collection(Edm.Int32)" },
                results: 2
            }

            var Area = {
                __metadata: { 'type': "Collection(Edm.Int32)" },
                results: 2
            }


            var data = {
                __metadata: { 'type': 'SP.Data.SolicitudesFormacionListItem' },
                ResponsableActualId: 231,
                EstadoSolicitud: "Presupuestada",
                AreasId: Area,
                AsistentesId: Asistentes,
            }

            var url = "../_api/lists/getbytitle('SolicitudesFormacion')/Items(" + vm.id + ")"
            var ContextoSolicitud = getContext("../lists/SolicitudesFormacion");
            var result = updateItem(url, ContextoSolicitud, data);

    }
}