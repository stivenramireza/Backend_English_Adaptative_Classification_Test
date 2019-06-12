var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

/**
 * Función que permite actualizar los datos de un administrador desde el frontend
 */
let gestionar = function () {
    var doctype = document.getElementById("dt").value;
    var docnumber = document.getElementById("docnumber").value;
    if (doctype == '0' || docnumber == '') {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {
        var http = new XMLHttpRequest();
        var params = 'docnumber=' + docnumber;
        http.responseType = 'json';
        http.open('GET', '/api/admin/edit' + '?' + params, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(null);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                localStorage.setItem("docnumber", document.getElementById("docnumber").value);
                localStorage.setItem("doctype", document.getElementById("dt").value);
                window.location.replace('/admin/profile/edit-admin/data');
            }
        }
        setTimeout(function () {
            if (http.response.status == 'failed') {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('El número de documento de identidad es incorrecto', 'error', 3);
            }
        }, 1000)
    }
}