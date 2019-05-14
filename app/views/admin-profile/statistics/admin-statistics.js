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
            x.style.display = "block";
            y.style.display = "block";
        }
    }
}

let getGraph = function () {
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
                    ['Parte 1', 5],
                    ['Parte 2', 6],
                    ['Parte 3', 7],
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
                    ['Parte 1', 5],
                    ['Parte 2', 4],
                    ['Parte 3', 3],
                ]
            }]
        });
    }
}