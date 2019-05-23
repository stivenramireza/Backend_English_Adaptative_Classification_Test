let addQuestion = function () {
    var answer1 = document.getElementById("answer1").value,  answer2 = document.getElementById("answer2").value,
        answer3 = document.getElementById("answer3").value;
    var correct = document.getElementById("correctAnswer").value;

    var opcion_correcta = ["N","N","N"]
    opcion_correcta[correct] = "S";
    
    var texto = [answer1, answer2, answer3]

    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/register/question", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
           console.log("pregunta registrada")
        }
    }
        
    http.send(JSON.stringify({
        pregunta: document.getElementById("question").value,
        parte: document.getElementById("difficult").value,
        dificultad: document.getElementById("difficult").value,
        opcion_correcta: opcion_correcta,
        texto: texto
    }));

}