// Obtiene los resultados finales del examen
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open("GET", '/test/statistics', true);
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var nota = req.response;
        var basico = ((nota.part1 * 10) / 2).toFixed(1);
        var aciertosBasico = (nota.part1 * 100).toFixed(2);
        document.getElementById("part1").innerHTML = aciertosBasico;
        var intermedio = ((nota.part2 * 10) / 2).toFixed(1);
        var aciertosIntermedio = (nota.part2 * 100).toFixed(2);
        document.getElementById("part2").innerHTML = aciertosIntermedio;
        var avanzado = ((nota.part3 * 10) / 2).toFixed(1);
        var aciertosAvanzado = (nota.part3 * 100).toFixed(2);
        document.getElementById("part3").innerHTML = aciertosAvanzado;
        var notaFinal = (((parseFloat(basico)) + (parseFloat(intermedio))+ (parseFloat(avanzado))) / 3).toFixed(1);
        document.getElementById("final_result").innerHTML = notaFinal;
    }
}