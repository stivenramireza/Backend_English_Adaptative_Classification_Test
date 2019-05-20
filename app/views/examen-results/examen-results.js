function updateCandidate() {
    var http2 = new XMLHttpRequest();
    var dn = localStorage.getItem('docnumber');
    var params3 = 'docnumber=' + dn;
    console.log(params)
    http2.responseType = 'json';
    http2.open("PUT", "/api/candidate/update-doc" + '?' + params3, true);
    http2.setRequestHeader("Content-type", "application/json");
    http2.send(JSON.stringify({
        examen_activo: false
    }));

}


function updateExamen(nota_final, level) {
    var http = new XMLHttpRequest();
    var id = localStorage.getItem('_idExamen');
    var params2 = 'idExamen=' + id;
    console.log("Params: " + params2);
    http.responseType = 'json';
    http.open("PUT", "/api/test/update" + '?' + params2, true);
    http.setRequestHeader("Content-type", "application/json");

    console.log("id: " + id);
    console.log("Nota final: " + nota_final)
    console.log("Level: " + level)
    localStorage.setItem("lv", level);


    http.send(JSON.stringify({
        grade: nota_final,
        classified_level: level,
        part1: c_parte1,
        part2: c_parte2,
        part3: c_parte3
    }))
}

function post() {
    var sendData = "{ \"c_part1\": " + c_parte1 + ", \"c_part2\":" + c_parte2 + ", \"c_part3\" : " + c_parte3 + "  }"
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", '/test/statistics/level', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(sendData);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var texto = req.response;
            gap = texto.student.level;
            console.log("Nota 1: " + c_parte1);
            console.log("Nota 2: " + c_parte2);
            console.log("Nota 3: " + c_parte3);
            console.log("Rango: " + gap);

            //gap = 1;
            //c_parte1 = "3.25";
            //c_parte3 = 0;
            //c_parte2 = 0;

            if (gap == 0) {
                level = "Preparatorio";
            } else if (gap == 1) {
                if (c_parte1 >= 1.5 && c_parte1 <= 2.245) {
                    level = "1";
                } else {
                    level = "2";
                }
            } else if (gap == 2) {
                if (c_parte1 >= 3 && c_parte1 <= 3.495) {
                    level = "3";
                } else {
                    level = "4";
                }
            } else if (gap == 3) {
                if (c_parte1 >= 4 && c_parte1 <= 4.5) {
                    level = "5";
                } else {
                    level = "6";
                }
            } else if (gap == 4) {
                if (c_parte2 >= 0 && c_parte2 <= 1.495) {
                    level = "7";
                } else {
                    level = "8";
                }
            } else if (gap == 5) {
                if (c_parte2 >= 3 && c_parte2 <= 3.495) {
                    level = "9";
                } else {
                    level = "10";
                }
            } else if (gap == 6) {
                if (c_parte2 >= 4 && c_parte2 <= 4.5) {
                    level = "11";
                } else {
                    level = "12";
                }
            } else if (gap == 7) {
                if (c_parte3 >= 0 && c_parte3 <= 1.495) {
                    level = "13";
                } else {
                    level = "14";
                }
            } else if (gap == 8) {
                if (c_parte3 >= 3 && c_parte3 <= 3.495) {
                    level = "15";
                } else {
                    level = "16";
                }
            } else {
                if (c_parte3 >= 4 && c_parte3 <= 4.5) {
                    level = "17";
                } else {
                    level = "18";
                }
            }

            console.log("Nivel: " + level);
        }
    }

    console.log("Nivel Test: " + level);
}

function calcularNotas(array_respuestas, array_partes) {
    var arrayRespuestas = array_respuestas;
    var arrayPartes = array_partes;
    var counter1 = 0, counter2 = 0, counter3 = 0;
    var i;
    for (i = 0; i < arrayRespuestas.length + 1; i++) {
        if (arrayPartes[i + 1] == 1) {
            counter1++;
            if (arrayRespuestas[i + 1] == true) {
                c_parte1 = c_parte1 + 5;
            }
        } else if (arrayPartes[i + 1] == 2) {
            counter2++;
            if (arrayRespuestas[i + 1] == true) {
                c_parte2 = c_parte2 + 5;
            }
        } else if (arrayPartes[i + 1] == 3) {
            counter3++;
            if (arrayRespuestas[i + 1] == true) {
                c_parte3 = c_parte3 + 5;
            }
        }
    }
    if (counter1 == 0) {
        c_parte1 = 5;
    } else {
        c_parte1 = c_parte1 / counter1;
    }
    if (counter2 == 0 && c_parte3 > 3) {
        c_parte2 = 5;
    } else {
        c_parte2 = c_parte2 / counter2;
    } if (c_parte1 < 4) {
        c_parte2 = 0;
    }
    if (counter3 == 0) {
        c_parte3 = 0;
    } else {
        c_parte3 = c_parte3 / counter3;
    } if (c_parte2 < 4) {
        c_parte3 = 0;
    }
    if (c_parte2 == 0 && c_parte3 == 0) {
        nota_final = c_parte1.toFixed(1);
    } else if (c_parte3 == 0) {
        nota_final = ((c_parte1 + c_parte2) / 2).toFixed(1);
    } else {
        nota_final = ((c_parte1 + c_parte2 + c_parte3) / 3).toFixed(1);
    }
    return nota_final;
}

var c_parte1 = 0, c_parte2 = 0, c_parte3 = 0, nota_final = 0, level = 0, gap = 0;
var req = new XMLHttpRequest();
var doc_number = localStorage.getItem("docnumber");
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
        localStorage.setItem("_idExamen", id);
        console.log(id);
        var array_respuestas = texto.info_examen.responses;
        var array_partes = texto.info_examen.parts;
        nota_final = calcularNotas(array_respuestas, array_partes);
        setTimeout(function () {
            console.log("Nota calculada: " + nota_final)
            document.getElementById("final_result").innerHTML = nota_final;
            setTimeout(function () {
                post();
                document.getElementById("texto_span").innerHTML = "Porcentaje de aciertos";
            Highcharts.chart('container', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45
                    }
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        innerSize: 100,
                        depth: 45
                    }
                },
                tooltip: {
                    pointFormat: 'Porcentaje: <b>{point.y:.0f}%</b>'
                },
                series: [{
                    name: 'Porcentaje',
                    data: [
                        ['Aciertos', ((textoId.part1 * 20) + (textoId.part2 * 20) + (textoId.part3 * 20) / 3)],
                        ['Desaciertos', 100 - ((textoId.part1 * 20) + (textoId.part2 * 20) + (textoId.part3 * 20) / 3)],
                    ]
                }]
            });
                console.log("post melo")
                setTimeout(function () {
                    updateExamen(nota_final, level);
                    console.log("update melo")
                    setTimeout(function () {
                        updateCandidate();
                        console.log("candidate updated")
                    }, 1000)
                }, 1000)
            }, 1000);
        }, 1000);


    }
}
