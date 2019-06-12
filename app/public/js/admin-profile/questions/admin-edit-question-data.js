var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

/** Petición GET que obtiene la primera pregunta del examen */
var http = new XMLHttpRequest();
var item = localStorage.getItem('item_pregunta');
var params = 'n_item='+item;
http.responseType = 'json';
http.open('GET', '/api/question/list'+'?'+ params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_pregunta;
        var pregunta = texto.pregunta;
        var opcion_A = texto.opcion_correcta[0];
        var opcion_B = texto.opcion_correcta[1];
        var opcion_C = texto.opcion_correcta[2];
        var parte = texto.parte;
        var texto_opcion_correcta = texto.texto;
        var opcionCorrecta = '';
        for(var i = 0; i < texto_opcion_correcta.length; i++){
            if(texto_opcion_correcta[i] == "S"){
                opcionCorrecta = i;
            }
        }
        document.getElementById("question").value = pregunta;
        document.getElementById("answer1").value = opcion_A;
        document.getElementById("answer2").value = opcion_B;
        document.getElementById("answer3").value = opcion_C;
        document.getElementById("difficult").value = parte;
        document.getElementById("correctAnswer").value = opcionCorrecta;
        localStorage.setItem('id_pregunta', texto._id);
    }
}

/**
 * Función que permite actualizar las preguntas que va respondiendo el aspirante
 * en tiempo real y enviándolas a la API de Inteligencia Artificial
 */
let update = function () {
    var http = new XMLHttpRequest();
    var id = localStorage.getItem('id_pregunta');
    var params = 'idPregunta='+id;
    http.responseType = 'json';
    http.open("PUT", "/api/question/update"+'?'+params, true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/admin/profile/edit-question');
        }
    }
    var answer1 = document.getElementById("answer1").value, 
        answer2 = document.getElementById("answer2").value,
        answer3 = document.getElementById("answer3").value;
    var correct = document.getElementById("correctAnswer").value;
    var texto = ["N", "N", "N"]
    texto[correct] = "S";
    var opcion_correcta = [answer1, answer2, answer3]
    var dificultad = document.getElementById("difficult").value;
    http.send(JSON.stringify({
        opcion_correcta: opcion_correcta,
        texto: texto,
        pregunta: document.getElementById("question").value,
        parte: document.getElementById("difficult").value,  
        dificultad: dificultad,
        n_item: item
    }));
};