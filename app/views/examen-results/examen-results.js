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

    //pie
    var ctxP = document.getElementById("pieChart").getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
        labels: ["Parte 1", "Parte 2", "Parte 3"],
        datasets: [{
            data: [nota.part1 * 100, nota.part2 * 100, nota.part3 * 100,],
            backgroundColor: ["#001a72", "#46BFBD", "#007bff"],
            hoverBackgroundColor: ["#1132a2", "#5AD3D1", "#2c79cc"]
        }]
        },
        options: {
        responsive: true
        }
    });
      
}