var nota1 = 0, nota2 = 0, nota3 = 0;
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
            document.getElementById('pa1').innerHTML = String(textoId.part1).substr(0, 3);
            document.getElementById('pa2').innerHTML = String(textoId.part2).substr(0, 3);
            document.getElementById('pa3').innerHTML = String(textoId.part3).substr(0, 3);
            document.getElementById('tot').innerHTML = String(textoId.grade).substr(0, 3);
            
            if (textoId.classified_level == 18){
                document.getElementById('niv').innerHTML = "Cursos avanzados";
            } else {
                document.getElementById('niv').innerHTML = textoId.classified_level;
            }
            
            if (textoId.final_level == 18){
                document.getElementById('fin').innerHTML = "Advanced Grammar";
            } else if (textoId.final_level == 19){
                document.getElementById('fin').innerHTML = "Vocabulary in Context";
            } else if (textoId.final_level == 20){
                document.getElementById('fin').innerHTML = "Listening and Speaking";
            } else if (textoId.final_level == 21){
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
        }
    }
}

let getPercentage = function () {
    y.style.display = "block";
    var tipo_grafica = document.getElementById("tipo_grafica").value;
    document.getElementById("texto_span").innerHTML = "Porcentaje de aciertos";
    if (tipo_grafica == '0') {
        y.style.display = "none";
    } else if (tipo_grafica == '1') {
        x.style.display = "block";
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Niveles de Clasificación'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Porcentaje: <b>{point.y:.0f}%</b>'
            },
            series: [{
                name: 'Porcentaje',
                data: [
                    ['Parte 1', nota1],
                    ['Parte 2', nota2],
                    ['Parte 3', nota3],
                ],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.0f}', // one decimal
                    y: 17, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    } else if (tipo_grafica == '2') {
        x.style.display = "block";
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
                    ['Parte 1', nota1],
                    ['Parte 2', nota2],
                    ['Parte 3', nota3],
                ]
            }]
        });
    }
}