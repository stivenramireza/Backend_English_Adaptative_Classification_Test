let addQuestion = function () {
    var answer1 = document.getElementById("answer1").value,  
    answer2 = document.getElementById("answer2").value,
    answer3 = document.getElementById("answer3").value;
    var texto = [answer1, answer2, answer3]

    var correct = document.getElementById("correctAnswer").value;
    var difficult = document.getElementById("difficult").value;
    
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/register/question", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            window.location.replace('/signin/candidate');
        }
    }
        

    http.send(JSON.stringify({
        pregunta: document.getElementById("question").value,
        parte: difficult,
        dificultad: difficult,
        texto: texto
    }));

}