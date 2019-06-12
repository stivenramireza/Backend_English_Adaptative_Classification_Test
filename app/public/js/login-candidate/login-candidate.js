/**
 * Función que permite loguearse a un aspirante
 */
let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/candidate", true);
    http.setRequestHeader("Content-type", "application/json");
    var exito = false;
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("docnumber", document.getElementById("docnumber").value);
            localStorage.setItem("doctype", document.getElementById("doctype").value);
            localStorage.setItem("mikey", http.response.token);
            if(http.response.status == 'failed'){
                exito = false;
            }else{
                exito = true;
                check();
            }
        }
    }
    var doc_type = document.getElementById("doctype").value;
    var doc_number = document.getElementById("docnumber").value;
    http.send(JSON.stringify({
        doctype: doc_type,
        docnumber: doc_number
    }));
    setTimeout(function () {
        if(!exito && doc_type != "0" && doc_number != ""){
            alertify.set('notifier','position', 'bottom-center');
            alertify.notify('El tipo de documento o el número de documento es incorrecto', 'error', 5);
        }
    }, 500)
}

/**
 * Función que revisa si el aspirante tiene exámenes activos o no
 */
let check = function () {
    setTimeout(function () {
        var exito = false;
        var http2 = new XMLHttpRequest();
        var doc_number = localStorage.getItem("docnumber");
        var params = 'docnumber=' + doc_number;
        http2.responseType = 'json';
        http2.open('GET', '/api/candidate/list' + '?' + params, true);
        http2.setRequestHeader("Content-type", "application/json");
        http2.send(null);
        http2.onreadystatechange = function () {
            if (http2.readyState == 4 && http2.status == 200) {
                var texto = http2.response.info_candidate;
                var examen_activo = texto.examen_activo;
                if(http2.response.status == 'failed'){
                    exito = false;
                } else {
                    exito = true;
                    if (!examen_activo) {
                        window.location.replace('/candidate/test/error');
                    } else {
                        window.location.replace('/candidate/profile');
                    }
                }
            } 
        }
        setTimeout(function () {
            if (!exito) {
                alertify.set('notifier','position', 'bottom-center');
                alertify.notify('El tipo de documento o el número de documento es incorrecto', 'error', 5);
            }
        }, 1000)
    }, 1000)
}

$(document).ready(function () {
    $('#btnLogin').click(function () {
        var doctype = $("#doctype").val();
        var docnumber = $("#docnumber").val();

        if (doctype == '0' || docnumber == '') {
            alertify.set('notifier','position', 'bottom-center');
            alertify.notify('No se han completado todos los campos', 'error', 3);
        }
    });
});