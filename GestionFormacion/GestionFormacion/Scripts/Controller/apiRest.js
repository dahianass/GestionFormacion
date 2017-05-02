getQueryStringParams = function (sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}


function queryListPromise(url) {
    var dataResults;
    var p =jQuery.ajax({
        url: url,
        type: "GET",
        async: true,
        headers: { "Accept": "application/json;odata=verbose" }
    });
     p.then(function (data) {
        resultadoOperacion = data.d;
    },
        function (error) {
            console.log(error);
        });
    return p;
}

function queryList(url) {
    var dataResults;
    jQuery.ajax({
        url: url,
        type: "GET",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },

        success: function (data) {
            dataResults = data.d;
        },
        error: function (xhr, textStatus, errorThrown) {
          	return null;
        }
    });
    return dataResults;
}

function createItem(url, context, data) {

    var resultadoOperacion = null;
    var idRegistro = "";
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": context,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),

        success: function (data) {
	        resultadoOperacion=data;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return resultadoOperacion;
}

function createItemPromise(url, context, data) {

    var resultadoOperacion = null;
    var idRegistro = "";
    var p = $.ajax({
        url: url,
        type: "POST",
        async: true,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": context,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data)
    });

    p.then(function (data) {
        resultadoOperacion = data;
    },
        function (error) {
            console.log(error);
        });
    return p;
}

function updateItem(url, contexto, item) {

    var resultadoOperacion = null;
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": contexto,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH", //test MERGE
            "If-Match": "*"
        },

        data: JSON.stringify(item),
        success: function (data) {
            resultadoOperacion = true;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return resultadoOperacion;
}

function getContext(nombreLista) {

    var dataResults;
    jQuery.ajax({
        url: nombreLista + "/_api/contextinfo",
        type: "POST",
        async: false,
        headers: { "Accept": "application/json;odata=verbose" },

        success: function (data) {
            dataResults = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
    return dataResults;
}

function getContextPromise(nombreLista) {

    var dataResults;
    var p = jQuery.ajax({
        url: nombreLista + "/_api/contextinfo",
        type: "POST",
        async: true,
        headers: { "Accept": "application/json;odata=verbose" },
    });

    r = p.then(function (data) {
        dataResults = data.d.GetContextWebInformation.FormDigestValue;
        return dataResults;

    },
        function (xhr, textStatus, errorThrown) {
            console.log(textStatus);

        });

    return r;
}


function deleteItem(url, contexto, oldItem) {

    $.ajax({
        url: url,
        type: "DELETE",
        async: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": contexto,
            "If-Match": oldItem.__metadata.etag
        },
        success: function (data) {
            return data;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}

function isInGroup(pIdGrupo) {
    var resultado = false;
    var UsuarioActual = queryList('/_api/web/currentUser/?$expand=groups');
    var grupos = UsuarioActual.Groups;

    for (var ig = 0; ig < grupos.results.length; ig++) {
        if (pIdGrupo == grupos.results[ig].Id)
            return true;

    }
    return false;

}// Funciones para carga de archivos a Sharepoint

// Upload the file.
// You can upload files up to 2 GB with the REST API.

// Get test values from the file input and text input page controls.
var FileReturn;

function uploadFile(controlador, UrlToFolder, callback) {

    // Define the folder path for this example.
    var serverRelativeUrlToFolder = UrlToFolder;
    // Get the server URL.
    var fileInput = jQuery('#fileInput');


    // Initiate method calls using jQuery promises.

    // Get the local file as an array buffer.
    var getFile = getFileBuffer(fileInput);
    getFile.done(function (arrayBuffer) {

        // Add the file to the SharePoint folder.
        var addFile = addFileToFolder(arrayBuffer, fileInput, serverRelativeUrlToFolder);
        addFile.done(function (file, status, xhr) {

            // Get the list item that corresponds to the uploaded file.
            var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
            getItem.done(function (listItem, status, xhr) {

                // Change the display name and title of the list item.
                var changeItem = updateListItem(listItem.d.__metadata, controlador, listItem, fileInput, serverRelativeUrlToFolder);
                changeItem.done(function (data, status, xhr) {

                    //document.getElementById('enviar').disabled = true;
                    //document.getElementById('aprobar').disabled = true;
                    document.getElementById('fileInput').blur();
                    //document.getElementById('btnObservacion').focus();
                    callback();
                    //listar todos los anexos del pedido
                    //var urlArchivo = "../../_api/web/lists/GetByTitle('" + serverRelativeUrlToFolder + "')/items?$select=FileLeafRef, Id, AuthorId, TipoFactura&$filter=FacturaNro eq '" + controlador.factura + "'";
                    //var archivos = queryList(urlArchivo);
                    // //borrar todo el body de la tabla
                    // var borrarTabla = jQuery('#anexosTabla tbody').empty();
                    // //llenar la tabla  con los elementos obtenidos por la consulta de anexos
                    // for (var i = 0 ; i < archivos.results.length; i++) {
                    //     var usuarioAutor = queryList("../../_api/web/getUserById(" + archivos.results[i].AuthorId + ")");
                    //     var nombreUsuario = usuarioAutor.Title;
                    //  var tableRef = jQuery('#anexosTabla tbody').append(
                    //  "<tr>"+
                    //   "<td>"+archivos.results[i].FileLeafRef+"</td>"+ 
                    //   "<td> <a href='../../"+serverRelativeUrlToFolder+"/"+archivos.results[i].FileLeafRef+"' target='_blank'><input type='button' value='Ver'/></a> " +
                    //            "<input type='button' class='new-button' ID=" + archivos.results[i].Id + " value='Eliminar' /></td>" +
                    //   "<td>" + nombreUsuario + " </td>" +
                    //   "<td>" + archivos.results[i].TipoFactura + " </td>" +
                    //  "</tr>");                                               
                    // }
                    //finalizacion de adicion a la tabla 
                    //aviso para informar Sobre carga

                });
                changeItem.fail(onError);
            });
            getItem.fail(onError);
        });
        addFile.fail(onError);
    });
    getFile.fail(onError);


    //Fin de Metodo	
}
// funciones
// Get the local file as an array buffer.
function getFileBuffer(fileInput) {
    var deferred = jQuery.Deferred();
    var reader = new FileReader();
    reader.onloadend = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(fileInput[0].files[0]);
    return deferred.promise();
}
// Add the file to the file collection in the Shared Documents folder.
function addFileToFolder(arrayBuffer, fileInput, serverRelativeUrlToFolder) {

    // Get the file name from the file input control on the page.
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];

    // Construct the endpoint.
    var fileCollectionEndpoint = "../../_api/web/getfolderbyserverrelativeurl('" + serverRelativeUrlToFolder + "')/files" +
    "/add(overwrite=true,url='" + fileName + "')";

    // This call returns the SharePoint file.
    return jQuery.ajax({
        url: fileCollectionEndpoint,
        type: "POST",
        data: arrayBuffer,
        processData: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": getContext("../../" + serverRelativeUrlToFolder),
            // "content-length": arrayBuffer.byteLength,
            "content-type": "application/json;odata=verbose"
        }

    });
}

// Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
function getListItem(fileListItemUri) {

    // Send the request and return the response.
    return jQuery.ajax({
        url: fileListItemUri,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" }
    });
}
// Change the display name and title of the list item.
function updateListItem(itemMetadata, controlador, listitem, fileInput, serverRelativeUrlToFolder) {

    var contextoArchivo = getContext("../../" + serverRelativeUrlToFolder);
    var parts = fileInput[0].value.split('\\');
    var fileName = parts[parts.length - 1];


    // Define the list item changes. Use the FileLeafRef property to change the display name. 
    // For simplicity, also use the name as the title. 
    // The example gets the list item type from the item's metadata, but you can also get it from the
    // ListItemEntityTypeFullName property of the list.
    var body = { __metadata: { type: itemMetadata.type }, NumeroIncidente: controlador.Solicitudes.Id.toString(), TipoArchivo: controlador.radio.name, FileLeafRef: "" + listitem.d.Id + "-" + fileName, Title: "" + listitem.d.Id + "-" + fileName };
    body = JSON.stringify(body);


    // Send the request and return the promise.
    // This call does not return response content from the server.
    return jQuery.ajax({
        url: itemMetadata.uri,
        async: false,
        type: "POST",
        data: body,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": contextoArchivo,
            "content-type": "application/json;odata=verbose",
            //"content-length": body.length,
            "IF-MATCH": itemMetadata.etag,
            "X-HTTP-Method": "MERGE"
        }

    });

}

// Display error messages. 
function onError(error) {
    console.log(error);
}

function queryListAsync(url, async) {
    var dataResults;
    jQuery.ajax({
        url: url,
        type: "GET",
        async: async,
        headers: { "Accept": "application/json;odata=verbose" },

        success: function (data) {
            dataResults = data.d;
        },
        error: function (xhr, textStatus, errorThrown) {
            return null;
        }
    });
    return dataResults;
}

function createItemPromise(url, context, data) {

    var resultadoOperacion = null;
    var idRegistro = "";
    var p = $.ajax({
        url: url,
        type: "POST",
        async: true,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": context,
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),
    });

    p.then(function (data) {
        resultadoOperacion = data;
    },
    function (error) {
        console.log(error);
    });
    return p;
}

function updateItemAsync(url, contexto, item, async) {

    var resultadoOperacion = null;
    $.ajax({
        url: url,
        type: "POST",
        async: async,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": contexto,
            "content-Type": "application/json;odata=verbose",
            "X-Http-Method": "PATCH", //test MERGE
            "If-Match": "*"
        },

        data: JSON.stringify(item),
        success: function (data) {
            resultadoOperacion = true;
        },
        error: function (error) {
            console.log(error);
        }
    });
    return resultadoOperacion;
}

function getContextAsync(nombreLista, async) {

    var dataResults;
    jQuery.ajax({
        url: nombreLista + "/_api/contextinfo",
        type: "POST",
        async: async,
        headers: { "Accept": "application/json;odata=verbose" },

        success: function (data) {
            dataResults = data.d.GetContextWebInformation.FormDigestValue;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
    return dataResults;
}

function getContextPromise(nombreLista) {

    var dataResults;
    var p = jQuery.ajax({
        url: nombreLista + "/_api/contextinfo",
        type: "POST",
        async: true,
        headers: { "Accept": "application/json;odata=verbose" },
    });

    r = p.then(function (data) {
        dataResults = data.d.GetContextWebInformation.FormDigestValue;
        return dataResults;

    },
     function (xhr, textStatus, errorThrown) {
         console.log(textStatus);

     });

    return r;
}


function deleteItemAsync(url, contexto, oldItem, async) {

    $.ajax({
        url: url,
        type: "DELETE",
        async: async,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": contexto,
            "If-Match": oldItem.__metadata.etag
        },
        success: function (data) {
            return data;
        },
        error: function (error) {
            console.log(JSON.stringify(error));
        }
    });
}
function deshabilitarBoton(nombreBoton, accion) {
    document.getElementById('' + nombreBoton).disabled = accion;
}
