let habilitarExamen = function () {
    var xhr1 = new XMLHttpRequest();
    var doc_number = document.getElementById("docnumber").value;
    var params = 'docnumber=' + doc_number;
    xhr1.responseType = 'json';
    xhr1.open('GET', '/api/candidate/list' + '?' + params, true);
    xhr1.setRequestHeader("Content-type", "application/json");
    xhr1.send(null);
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState == 4 && xhr1.status == 200) {
            var texto = xhr1.response.info_candidate;
            var id = texto._id;
        }
        update(id);
    }
}

let update = function (id) {
    var http = new XMLHttpRequest();
    var params2 = 'idCandidate=' + id;
    http.responseType = 'json';
    http.open("PUT", "/api/candidate/update" + '?' + params2, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify({
        examen_activo: true
    }));
}
