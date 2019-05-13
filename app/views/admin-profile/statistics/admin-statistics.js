let queryStatistics = function () {
    document.getElementById("header").style.display="inline";
    var clasificador = document.getElementById("clasificador").value;
    console.log(clasificador);
    var fecha_inicio = document.getElementById("fecha_inicio").value;
    var fecha_fin = document.getElementById("fecha_fin").value;
    var classified_level = document.getElementById("nivel").value;
    var final_level = document.getElementById("nivel_final").value;
    var req = new XMLHttpRequest();
    var params = 'clasificador=' + clasificador+'&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin+'&classified_level='+classified_level+'&final_level='+final_level;
    console.log(params);
    req.responseType = 'json';
    req.open("GET", '/test/statistics' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var textoId = req.response;
            console.log(textoId)
            console.log(textoId.info_examen.length)
            document.getElementById("registros").innerHTML = textoId.info_examen.length;
        }
    }
}