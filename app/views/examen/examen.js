//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open("GET", '/test/prestart', true);
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        var title = texto.question.title;
        console.log("title: ", title);
        document.getElementById("qidc").innerHTML = title;
        var opcionA = texto.question.responses[0];
        document.getElementById("opcionA").innerHTML = opcionA;
    }
}
