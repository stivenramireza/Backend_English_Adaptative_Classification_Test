// Obtiene los resultados finales del examen
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open("GET", '/test/statistics', true);
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var nota = req.response;
        var basico = ((nota.part1 * 10) / 2).toFixed(1);
        document.getElementById("part1").innerHTML = basico;
        var intermedio = ((nota.part2 * 10) / 2).toFixed(1);
        document.getElementById("part2").innerHTML = intermedio;
        var avanzado = ((nota.part3 * 10) / 2).toFixed(1);
        document.getElementById("part3").innerHTML = avanzado;
        var notaFinal = (((parseFloat(basico)) + (parseFloat(intermedio))+ (parseFloat(avanzado))) / 3).toFixed(1);
        document.getElementById("final_result").innerHTML = notaFinal;
    }

    // Set new default font family and font color to mimic Bootstrap's default styling
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';

    // Bar Chart Example
    var ctx = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Parte 1", "Parte 2", "Parte 3"],
        datasets: [{
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: [nota.part1 * 100, nota.part2 * 100, nota.part3 * 100],
        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
        padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
        }
        },
        scales: {
        xAxes: [{
            gridLines: {
            display: false,
            drawBorder: false
            },
            ticks: {
            maxTicksLimit: 6
            },
            maxBarThickness: 25,
        }],
        yAxes: [{
            ticks: {
            min: 0,
            max: 100,
            maxTicksLimit: 6,
            padding: 10,
            // Include a % sign in the ticks
            callback: function(value, index, values) {
                return value + '%';
            }
            },
            gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
            }
        }],
        },
        legend: {
        display: false
        },
        tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
            label: function(tooltipItem, chart) {
            return tooltipItem.yLabel + '%';
            }
        }
        },
    }
    });
      
}