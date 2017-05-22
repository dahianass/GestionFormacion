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