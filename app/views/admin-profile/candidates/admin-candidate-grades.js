let getGrades = function () {
    var doc_number = document.getElementById("docnumber").value;
    var nota_final = 0, level = 0, gap = 0;
    var req = new XMLHttpRequest();
    var params = 'docnumber=' + doc_number;
    req.responseType = 'json';
    req.open("GET", '/test/info' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var textoId = req.response.info_examen;
            document.getElementById('fec').innerHTML = new Date(textoId.fecha);
            document.getElementById('pa1').innerHTML = String(textoId.part1).substr(0,3);
            document.getElementById('pa2').innerHTML = String(textoId.part2).substr(0,3);
            document.getElementById('pa3').innerHTML = String(textoId.part3).substr(0,3);
            document.getElementById('tot').innerHTML = String(textoId.grade).substr(0,3);
            document.getElementById('niv').innerHTML = textoId.classified_level;
            var array_respuestas = textoId.responses;
            var array_partes = textoId.parts;
            var a = new Date(textoId.hora_inicio);
            var b = new Date(textoId.hora_fin);
            var c = ((a - b) / 1000);
            console.log(c);

            var http = new XMLHttpRequest();
            var params = 'docnumber=' + doc_number;
            http.responseType = 'json';
            http.open('GET', '/api/candidate/list' + '?' + params, true);
            http.setRequestHeader("Content-type", "application/json");
            http.send(null);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    var texto2 = http.response.info_candidate;
                    var nombres = texto2.firstname;
                    var apellidos = texto2.lastname;
                    document.getElementById('est').innerHTML = nombres + " " + apellidos;
                }
            }
        }
    }
}