let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/candidate", true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("docnumber", document.getElementById("docnumber").value);
            localStorage.setItem("doctype", document.getElementById("doctype").value);
            localStorage.setItem("mikey", http.response.token);
            check();
        }
    }
    http.send(JSON.stringify({
        doctype: document.getElementById("doctype").value,
        docnumber: document.getElementById("docnumber").value
    }));
}

let check = function () {
    setTimeout(function () {
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
                console.log()
                var examen_activo = texto.examen_activo;
                if (!examen_activo) {
                    window.location.replace('/candidate/test/error');
                } else {
                    window.location.replace('/candidate/profile');
                }
            }
        }
    }, 1000)
}


$(document).ready(function () {
    $('#btnLogin').click(function () {
        var doctype = $("#doctype").val();
        var docnumber = $("#docnumber").val();

        if (doctype == '' || docnumber == '') {
            alertify.set('notifier','position', 'bottom-center');
            alertify.notify('No se han completado todos los campos', 'error', 3);
        }
    });
});