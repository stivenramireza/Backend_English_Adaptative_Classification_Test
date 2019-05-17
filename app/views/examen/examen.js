// Obtiene la 1era pregunta
var req = new XMLHttpRequest();
var doc_type = localStorage.getItem("doctype");
var tmp_doc_type = localStorage.setItem("doc_type", doc_type);
var doc_number = localStorage.getItem("docnumber");
var doc_clasificador = "1039472987";
var params = 'doctype='+doc_type+'&docnumber='+doc_number+'&clasificador='+doc_clasificador;
req.responseType = 'json';
req.open("GET", '/test/prestart'+'?'+params, true);
req.setRequestHeader("Content-type", "application/json");
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        console.log(texto);
        var title = texto.question.title;
        document.getElementById("qidc").innerHTML = title;
        var opcionA = texto.question.responses[0];
        opcionA = opcionA.substring(3, opcionA.lenght);
        document.getElementById("opcionA").innerHTML = opcionA;
        var opcionB = texto.question.responses[1];
        opcionB = opcionB.substring(3, opcionB.lenght);
        document.getElementById("opcionB").innerHTML = opcionB;
        var opcionC = texto.question.responses[2];
        opcionC = opcionC.substring(3, opcionC.lenght);
        document.getElementById("opcionC").innerHTML = opcionC;
        var id = texto.question.n_item;
        localStorage.setItem("n_item", id);
    }
}

// Obtiene las siguientes preguntas
let questionPost = function (id, answer) {
    var tmp_doc_type = localStorage.getItem("doc_type");
    console.log("doctype:", tmp_doc_type);
    var doc_number = localStorage.getItem("docnumber");
    console.log("docnumber:", doc_number);
    var sendData = "{ \"doctype\": "+ tmp_doc_type +", \"docnumber\":"+ doc_number +", \"n_item\" : " + id + ", \"n_response\" : " + answer + "  }"
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open("POST", '/test/next_question', true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(sendData);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            var texto = req.response;
            var title = texto.question.title;
            document.getElementById("qidc").innerHTML = title;
            var opcionA = texto.question.responses[0];
            opcionA = opcionA.substring(3, opcionA.lenght);
            document.getElementById("opcionA").innerHTML = opcionA;
            var opcionB = texto.question.responses[1];
            opcionB = opcionB.substring(3, opcionB.lenght);
            document.getElementById("opcionB").innerHTML = opcionB;
            var opcionC = texto.question.responses[2];
            opcionC = opcionC.substring(3, opcionC.lenght);
            document.getElementById("opcionC").innerHTML = opcionC;
            var id = texto.question.n_item;
            localStorage.setItem("n_item", id);
        }
    }
}