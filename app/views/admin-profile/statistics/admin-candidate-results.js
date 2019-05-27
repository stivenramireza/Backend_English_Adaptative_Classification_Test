var nota1 = 0, nota2 = 0, nota3 = 0;
let getGrades = function () {

    var doctype = $("#dt").val();
    var docnumber = $("#docnumber").val();

    if (doctype == '0' || docnumber == '') {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {
        var exito = false;
        var doc_number = document.getElementById("docnumber").value;
        var req = new XMLHttpRequest();
        var params = 'docnumber=' + doc_number;
        req.responseType = 'json';
        req.open("GET", '/test/info' + '?' + params, true);
        req.setRequestHeader("Content-type", "application/json");
        req.send(null);
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                exito = true;
                var textoId = req.response.info_examen;
                document.getElementById('fec').innerHTML = new Date(textoId.fecha);
                document.getElementById('pa1').innerHTML = String(textoId.part1).substr(0, 3);
                document.getElementById('pa2').innerHTML = String(textoId.part2).substr(0, 3);
                document.getElementById('pa3').innerHTML = String(textoId.part3).substr(0, 3);
                document.getElementById('tot').innerHTML = String(textoId.grade).substr(0, 3);
                if (textoId.classified_level == 18) {
                    document.getElementById('niv').innerHTML = "Cursos avanzados";
                } else {
                    document.getElementById('niv').innerHTML = textoId.classified_level;
                }

                if (textoId.final_level == 18) {
                    document.getElementById('fin').innerHTML = "Advanced Grammar";
                } else if (textoId.final_level == 19) {
                    document.getElementById('fin').innerHTML = "Vocabulary in Context";
                } else if (textoId.final_level == 20) {
                    document.getElementById('fin').innerHTML = "Listening and Speaking";
                } else if (textoId.final_level == 21) {
                    document.getElementById('fin').innerHTML = "Reading and Writing";
                } else {
                    document.getElementById('fin').innerHTML = textoId.final_level;
                }

                var array_respuestas = textoId.responses;
                var array_partes = textoId.parts;
                nota1 = textoId.part1 * 20;
                nota2 = textoId.part2 * 20;
                nota3 = textoId.part3 * 20;

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
                    document.getElementById("table").style.display = "inline-table";
                    x.style.display = "block";
                }
                // Table Results
                var preguntas = textoId.questions;
                var respuestas = textoId.responses;
                var tamano_preguntas = preguntas.length;
                $("#dataTable").append('<tbody>');
                Object.keys(preguntas, respuestas).forEach(function (key) {
                    getQuestion(preguntas[key], respuestas[key], tamano_preguntas);
                })
                $("#dataTable").append('</tbody>');
            }
        }
        setTimeout(function () {
            if (!exito) {
                alertify.set('notifier', 'position', 'bottom-center')
                alertify.notify('El número de documento de identidad es incorrecto', 'error', 3);
                document.getElementById("table").style.display = "none";
                x.style.display = "none";
            }
        }, 1000)
    }
}

function getQuestion(id_pregunta, respuesta_dada, tamano_preguntas) {
    var req = new XMLHttpRequest();
    var params = 'n_item=' + id_pregunta;
    req.responseType = 'json';
    req.open("GET", '/api/question/list' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var lista_preguntas = '', lista_respuestas = '', lista_partes = '', lista_respuesta_dada = '';
            var texto = req.response.info_pregunta;
            for (var i = 0; i < tamano_preguntas; i++) {
                lista_preguntas = texto.pregunta;
                lista_respuestas = texto.opcion_correcta;
                lista_partes = texto.parte;
                lista_respuesta_dada = respuesta_dada;
                lista_correcta = texto.texto;
            }
            // Mapeo de respuestas dadas
            if (lista_respuesta_dada == true) {
                lista_respuesta_dada = '<span class="iconify" data-icon="dashicons:saved" height="30" data-inline="false"></span>';
            } else {
                lista_respuesta_dada = '<span class="iconify" data-icon="dashicons:no-alt" height="30" data-inline="false"></span>'
            }

            $("#dataTable").append('<tr><td>' + ' ' + '</td>' +
                '<td>' + lista_partes + '</td>' +
                '<td>' + lista_preguntas + '</td>' +
                '<td>' + lista_respuestas[0] + '</td>' +
                '<td>' + lista_respuestas[1] + '</td>' +
                '<td>' + lista_respuestas[2] + '</td>' +
                '<td>' + lista_respuesta_dada + '</td></tr>');
        }
    }
}