let getGap = function () {
    var doc_number = document.getElementById("docnumber").value;
    var tipo_grafica = document.getElementById("tipo_grafica").value;
    var req = new XMLHttpRequest();
    var params = 'docnumber=' + doc_number;
    req.responseType = 'json';
    req.open("GET", '/test/info' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var texto = req.response.info_examen;
            var clasificacion_escrita = (texto.classified_level).substring(0,2);
            var nivel_escrito = parseInt(clasificacion_escrita, 10);
            console.log("clasificacion escrita: ", nivel_escrito);
            var clasificacion_oral = texto.final_level;
            var nivel_oral = parseInt(clasificacion_oral, 10);
            console.log("clasificacion oral: ", nivel_oral);
            document.getElementById("texto_span").innerHTML = "Desfase Clasificación Escrita vs Oral";
            if(tipo_grafica == '0'){
                $('#container').hide();
            }else if(tipo_grafica == '1'){
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
                        pointFormat: 'Nivel: <b>{point.y:.1f}</b>'
                    },
                    series: [{
                        name: 'Nivel',
                        data: [
                            ['Escrito', nivel_escrito],
                            ['Oral', nivel_oral],
                        ],
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#FFFFFF',
                            align: 'right',
                            format: '{point.y:.1f}', // one decimal
                            y: 17, // 10 pixels down from the top
                            style: {
                                fontSize: '13px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    }]
                });
            }else if(tipo_grafica == '2'){
                document.getElementById("texto_span").innerHTML = "Desfase Clasificación Escrita vs Oral";
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
                    series: [{
                        name: 'Nivel',
                        data: [
                            ['Escrito', nivel_escrito],
                            ['Oral', nivel_oral],
                        ]
                    }]
                });
            }
        }
    }
}