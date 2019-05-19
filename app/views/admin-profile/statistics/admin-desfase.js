var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
let getGap = function () {

    var doctype = $("#doc_type").val();
    var docnumber = $("#docnumber").val();
    var tipo_grafica = $("#tipo_grafica").val();

    if (doctype == '' || docnumber == '' || tipo_grafica == "0") {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {

        var exito = false;
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
                exito = true;
                var texto = req.response.info_examen;
                console.log(texto.classified_level);
                clasificacion_escrita = texto.classified_level;
                var nivel_escrito = parseInt(clasificacion_escrita, 10);
                console.log("clasificacion escrita: ", nivel_escrito);
                var clasificacion_oral = texto.final_level;
                var nivel_oral = parseInt(clasificacion_oral, 10);
                console.log("clasificacion oral: ", nivel_oral);
                document.getElementById("texto_span").innerHTML = "Desfase Clasificación Escrita vs Oral";
                if (tipo_grafica == '0') {
                    x.style.display = "none";
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
                            pointFormat: 'Nivel: <b>{point.y:.0f}</b>'
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

        setTimeout(function () {
            if (!exito) {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('El número de documento de identidad es incorrecto', 'error', 3);
                x.style.display = "none";
            }
        } , 1000)
    }
}