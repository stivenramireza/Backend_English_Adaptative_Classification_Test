let addQuestion = function () {
    var answer1 = document.getElementById("answer1").value, answer2 = document.getElementById("answer2").value,
        answer3 = document.getElementById("answer3").value;
    var correct = document.getElementById("correctAnswer").value;

    var opcion_correcta = ["N", "N", "N"]
    opcion_correcta[correct] = "S";

    var texto = [answer1, answer2, answer3]

    var http = new XMLHttpRequest();
    var doc_number = localStorage.getItem("docnumber");
    var params = 'docnumber=' + doc_number;
    http.responseType = 'json';
    http.open('GET', '/api/question/findall', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(null);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var findAllQuest = http.response.preguntas.length;
            console.log(findAllQuest+1)

            var http2 = new XMLHttpRequest();
            http2.responseType = 'json';
            http2.open("POST", "/api/register/question", true);
            http2.setRequestHeader("Content-type", "application/json");
            http2.onreadystatechange = function () {
                if (http2.readyState == 4 && http2.status == 200) {
                    console.log("pregunta registrada")
                }
            }

            http2.send(JSON.stringify({
                pregunta: document.getElementById("question").value,
                parte: document.getElementById("difficult").value,
                dificultad: document.getElementById("difficult").value,
                opcion_correcta: opcion_correcta,
                texto: texto,
                n_item: findAllQuest + 1
            }));
        }
    }
}