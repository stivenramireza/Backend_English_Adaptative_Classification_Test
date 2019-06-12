var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

/**
 * Función que permite habilitar el examen de un aspirante desde el frontend
 */
let habilitarExamen = function () {
    var doctype = $("#doc_type").val();
    var docnumber = $("#docnumber").val();

    if (doctype == '0' || docnumber == '') {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {
        var id = 0;
        var exito = false;
        var xhr1 = new XMLHttpRequest();
        var doc_number = document.getElementById("docnumber").value;
        var params = 'docnumber=' + doc_number;
        xhr1.responseType = 'json';
        xhr1.open('GET', '/api/candidate/list' + '?' + params, true);
        xhr1.setRequestHeader("Content-type", "application/json");
        xhr1.send(null);
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState == 4 && xhr1.status == 200) {
                if(xhr1.response.status == 'failed'){
                    exito = false;
                } else {
                    exito = true;
                    var texto = xhr1.response.info_candidate;
                    id = texto._id;
                    update(id);
                }
            }
        }
        setTimeout(function () {
            if (!exito) {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('El número de documento de identidad es incorrecto', 'error', 3);
            }
        }, 1000)
    }
}

/**
 * Función que permite actualizar la habilitación de un examen de un aspirante por id
 * @param {string} id 
 */
let update = function (id) {
    var http = new XMLHttpRequest();
    var params2 = 'idCandidate=' + id;
    http.responseType = 'json';
    http.open("PUT", "/api/candidate/update" + '?' + params2, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({
        examen_activo: true
    }));
    alertify.set('notifier', 'position', 'bottom-center');
    alertify.success('Se ha habilitado el examen correctamente');
    document.getElementById("doc_type").value = "0";
    document.getElementById("docnumber").value = "";
}
