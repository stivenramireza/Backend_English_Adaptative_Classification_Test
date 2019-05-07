let queryStatistics = function () {
    var clasificador = document.getElementById("clasificador").value;
    var fecha_inicio = document.getElementById("fecha_inicio").value;
    var fecha_fin = document.getElementById("fecha_fin").value;
    var classified_level = document.getElementById("nivel").value;
    var req = new XMLHttpRequest();
    var params = 'clasificador=' + clasificador+'&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin+'&classified_level='+classified_level;
    console.log(params);
    req.responseType = 'json';
    req.open("GET", '/test/statistics' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var textoId = req.response;
            console.log(textoId)
        }
    }
}