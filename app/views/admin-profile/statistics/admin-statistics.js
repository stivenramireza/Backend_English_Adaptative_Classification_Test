var barGraphSeries, barGraphDrilldown, barGraphClasif, barAgrupClasif;

let queryStatistics = function () {
    document.getElementById("header").style.display = "inline";
    var clasificador = document.getElementById("clasificador").value;
    var fecha_inicio = document.getElementById("fecha_inicio").value;
    var fecha_fin = document.getElementById("fecha_fin").value;
    var classified_level = document.getElementById("nivel").value;
    var final_level = document.getElementById("nivel_final").value;
    var req = new XMLHttpRequest();
    var params = 'clasificador=' + clasificador + '&fecha_inicio=' + fecha_inicio + '&fecha_fin=' + fecha_fin + '&classified_level=' + classified_level + '&final_level=' + final_level;
    req.responseType = 'json';
    req.open("GET", '/test/statistics' + '?' + params, true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var query = req.response.info_examen;
            document.getElementById("registros").innerHTML = query.length;
            x.style.display = "block";
            y.style.display = "block";

            var groupByCL = query.reduce(function (cl, a) {
                cl[a.classified_level] = cl[a.classified_level] || [];
                cl[a.classified_level].push(a);
                return cl;
            }, Object.create(null));

            var groupByFL = query.reduce(function (fl, b) {
                fl[b.final_level] = fl[b.final_level] || [];
                fl[b.final_level].push(b);
                return fl;
            }, Object.create(null));

            var groupByClasificador = query.reduce(function (cla, c) {
                cla[c.clasificador] = cla[c.clasificador] || [];
                cla[c.clasificador].push(c);
                return cla;
            }, Object.create(null));

            var groupByMonth = query.reduce(function (acc, obj) {
                console.log(query)
                var year, month, week
                var b = obj.fecha.split(/\D/);
                // Get custom week number, zero padded
                var weekNum = '0' + Math.ceil(b[2] / 7);
                // Add year if not already present
                if (!acc[b[0]]) acc[b[0]] = {};
                year = acc[b[0]];
                // Add month if not already present
                if (!year[b[1]]) year[b[1]] = {};
                month = year[b[1]];
                // Add week if not already present
                if (!month[weekNum]) month[weekNum] = [];
                // Add object to  week
                month[weekNum].push(obj);
                return acc;
            }, Object.create(null))


            console.log("agrupacion por año, mes y semana")
            console.log(groupByMonth);
            console.log("agrupacion classified_level")
            console.log(groupByCL)
            console.log("agrupacion final_level")
            console.log(groupByFL)
            console.log("agrupacion clasificador")
            console.log(groupByClasificador)

            graphMonth(groupByMonth);
            graphClasif(groupByClasificador);
            graphClasifAgrup(groupByClasificador)

        }
    }
}

let graphMonth = function (yearsArray) {
    var array = [];
    var array2 = [];
    var tempMesTotal = 0
    var jsonTemporal, jsonTemporal2
    for (const year in yearsArray) {
        for (const month in yearsArray[year]) {

            jsonTemporal = "{ "
            jsonTemporal2 = "{ \"name\" : \"" + month + "/" + year + "\", \"id\" : \"" + month + "/" + year + "\", \"data\" : [ "

            for (const week in yearsArray[year][month]) {
                tempMesTotal = tempMesTotal + yearsArray[year][month][week].length;
                console.log("año: " + year + " mes: " + month + " semana: " + week + " #: " + yearsArray[year][month][week].length);
                jsonTemporal2 = jsonTemporal2 + "[ \"Semana " + week + "\"," + yearsArray[year][month][week].length + "],"
            }
            jsonTemporal = jsonTemporal + " \"name\" : \"" + month + "/" + year + "\", \"y\" : " + tempMesTotal + ", \"drilldown\" : \"" + month + "/" + year + "\" }"
            tempMesTotal = 0
            jsonTemporal2 = jsonTemporal2.substr(0, (jsonTemporal2.length - 1));
            jsonTemporal2 = jsonTemporal2 + "] }"
            array.push(JSON.parse(jsonTemporal))
            array2.push(JSON.parse(jsonTemporal2))

            barGraphSeries = array;
            barGraphDrilldown = array2;
        }
    }
}

let graphClasif = function (clasifArray) {
    var array = [];
    var jsonTemporal
    for (const clasif in clasifArray) {
        jsonTemporal = "{ \"name\" : \"" + clasif + "\", \"y\" : " + clasifArray[clasif].length + " }"
        array.push(JSON.parse(jsonTemporal))
    }
    barGraphClasif = array;
    console.log(barGraphClasif)
}

let graphClasifAgrup = function (clasifArray) {
    var array = [];
    var jsonTemporal
    for (const clasif in clasifArray) {
        jsonTemporal = "{ \"name\" : \"" + clasif + "\", \"data\" : ["
        for (i = 0; i < clasifArray[clasif].length; i++) {
            jsonTemporal = jsonTemporal + "{ \"value\" : 100 },"
        }
        jsonTemporal = jsonTemporal.substr(0, (jsonTemporal.length - 1));
        jsonTemporal = jsonTemporal + "] }"

        array.push(JSON.parse(jsonTemporal))
    }
    barAgrupClasif = array;
    console.log(barAgrupClasif)
}

let getGraph = function () {
    console.log(barGraphSeries)
    console.log(barGraphDrilldown)
    console.log(barAgrupClasif)
    y.style.display = "block";
    var tipo_grafica = document.getElementById("tipo_grafica").value;
    console.log(tipo_grafica)

    if (tipo_grafica == 0) {
        y.style.display = "none";
    } else if (tipo_grafica == 1) {
        x.style.display = "block";
        Highcharts.chart('g1', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Registro de examenes por meses, años y semanas'
            },
            subtitle: {
                text: 'Haz click en las barras para ver más información'
            },
            xAxis: {
                type: 'category',

            },
            yAxis: {
                title: {
                    text: 'Numero de registros'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> registros del total<br/>'
            },

            series: [
                {
                    name: " Meses y años",
                    colorByPoint: true,
                    data: barGraphSeries
                }
            ],
            drilldown: {
                series: barGraphDrilldown
            }
        });

    } else if (tipo_grafica == 2) {
        x.style.display = "block";
        Highcharts.chart('g1', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Registro de clasificadores'
            },
            xAxis: {
                type: 'category',
                title: {
                    text: 'Identificacion del clasificador'
                }
            },
            yAxis: {
                title: {
                    text: 'Numero de registros'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.0f}'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b> registros del total<br/>'
            },
            series: [
                {
                    name: "Id del clasificador",
                    colorByPoint: true,
                    data: barGraphClasif
                }
            ]
        });
    } else if (tipo_grafica == 3) {
        Highcharts.chart('g1', {
            chart: {
                type: 'packedbubble',
                height: '60%'
            },
            title: {
                text: 'Grafica de agrupamiento de clasificadores'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>Examen realizado</b>'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                }
            },
            series:
                barAgrupClasif
        });
    } else if (tipo_grafica == 4) {
        Highcharts.chart('g1', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Estadistica de clasificadores'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.0f}%',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Clasificadores',
                colorByPoint: true,
                data: barGraphClasif
            }]
        });
    }
}