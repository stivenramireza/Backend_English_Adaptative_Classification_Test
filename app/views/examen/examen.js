//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open("GET", '/test/prestart', true);
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        var title = texto.question.title;
        document.getElementById("qidc").innerHTML = title;
        var opcionA = texto.question.responses[0];
        opcionA = opcionA.substring(3,opcionA.lenght);
        document.getElementById("opcionA").innerHTML = opcionA;
        var opcionB = texto.question.responses[1];
        opcionB = opcionB.substring(3,opcionB.lenght);
        document.getElementById("opcionB").innerHTML = opcionB;
        var opcionC = texto.question.responses[2];
        opcionC = opcionC.substring(3,opcionC.lenght);
        document.getElementById("opcionC").innerHTML = opcionC;
    }
}