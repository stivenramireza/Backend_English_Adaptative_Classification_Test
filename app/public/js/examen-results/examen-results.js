function updateCandidate() {
    var http2 = new XMLHttpRequest();
    var dn = localStorage.getItem('docnumber');
    var params3 = 'docnumber=' + dn;
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
    http.responseType = 'json';
    http.open("PUT", "/api/test/update" + '?' + params2, true);
    http.setRequestHeader("Content-type", "application/json");
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
        }
    }
}

function calcularNotas(array_respuestas, array_partes) {
    var arrayRespuestas = array_respuestas;
    var arrayPartes = array_partes;
    var counter1 = 0, counter2 = 0, counter3 = 0;
    var i;
    for (i = 0; i < arrayRespuestas.length; i++) {
        if (arrayPartes[i] == 1) {
            counter1++;
            if (arrayRespuestas[i] == true) {
                c_parte1 = c_parte1 + 5;
            }
        } else if (arrayPartes[i] == 2) {
            counter2++;
            if (arrayRespuestas[i] == true) {
                c_parte2 = c_parte2 + 5;
            }
        } else if (arrayPartes[i] == 3) {
            counter3++;
            if (arrayRespuestas[i] == true) {
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
    } else if (counter2 == 0) {
        c_parte2 = 0;
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
var idExam = localStorage.getItem("idEx")
var params = '_id=' + idExam;
req.responseType = 'json';
req.open("GET", '/test/infoById' + '?' + params, true);
req.setRequestHeader("Content-type", "application/json");
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        var textoId = req.response.info_examen;
        var id = textoId._id;
        localStorage.setItem("_idExamen", id);
        var array_respuestas = texto.info_examen.responses;
        var array_partes = texto.info_examen.parts;
        nota_final = calcularNotas(array_respuestas, array_partes);
        setTimeout(function () {
            var porcentajeAciertos = ((c_parte1 * 20) + (c_parte2 * 20) + (c_parte3 * 20) ) / 3;
            document.getElementById("texto_span").innerHTML = "Porcentaje de aciertos y desaciertos";
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
                        ['Aciertos', porcentajeAciertos],
                        ['Desaciertos', 100 - porcentajeAciertos],
                    ]
                }]
            });
            setTimeout(function () {
                post();
                setTimeout(function () {
                    updateExamen(nota_final, level);
                    setTimeout(function () {
                        updateCandidate();
                    }, 1000)
                }, 1000)
            }, 1000);
        }, 1000);
    }
}
