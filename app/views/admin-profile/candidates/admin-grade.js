var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

let gradeCandidate = function () {

    var doctype = $("#dt").val();
    var docnumber = $("#docnumber").val();

    if (doctype == '0' || docnumber == '') {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {

        var exito = false;
        var http = new XMLHttpRequest();
        var id = document.getElementById("docnumber").value;
        var lev = document.getElementById("level").value;
        var params = 'docnumber=' + id;
        http.responseType = 'json';
        http.open('GET', '/api/candidate/list' + '?' + params, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(null);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                exito = true;
            }
        }

        setTimeout(function () {
            if (exito) {

                console.log("Params: " + params);
                var http2 = new XMLHttpRequest();
                http2.responseType = 'json';
                http2.open("PUT", "/api/test/updatebydoc" + '?' + params, true);
                http2.setRequestHeader("Content-type", "application/json");

                console.log("id: " + id);
                console.log("Level: " + lev)

                http2.send(JSON.stringify({
                    final_level: lev
                }))

                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('La clasificación del estudiante se ha realizado exitosamente', 'success', 5);
                document.getElementById("dt").value = "0";
                document.getElementById("docnumber").value = "";
            } else {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('El número de documento de identidad es incorrecto', 'error', 3);
            }
        }, 1000)
    }
}