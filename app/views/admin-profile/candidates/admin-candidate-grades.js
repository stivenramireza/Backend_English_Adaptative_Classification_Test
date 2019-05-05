let getGrades = function(){
    var doc_number = document.getElementById("docnumber").value;
    var nota_final = 0, level = 0, gap = 0;
    var req = new XMLHttpRequest();
    var params = 'docnumber=' + doc_number;
    req.responseType = 'json';
    req.open("GET", '/test/info' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        console.log("readyState = " + req.readyState)
        console.log("status = " + req.status)
        if (req.readyState == 4 && req.status == 200) {
            var texto = req.response;
            var textoId = req.response.info_examen;
            var id = textoId._id;
            console.log(id);
            document.getElementById('pa1').value=textoId.part1;
            var nota2 = textoId.part2;
            var nota3 = textoId.part3;
            var array_respuestas = textoId.responses;
            var array_partes = textoId.parts;
            var nota_final = textoId.grade;
            var nivel = textoId.classified_level;
        }
    }
}
