var req = new XMLHttpRequest();
var textoJSON;
req.open('GET', 'http://ec2-34-207-193-227.compute-1.amazonaws.com/test/prestart', false); 
req.send(null);
if (req.status == 200)
    textoJSON = req.responseText;

var textoJSON = JSON.parse(req.responseText);

let cargarTexto = function(textoJSON){
    var title = textoJSON.question.title;
    document.getElementById("qid").innerHTML = title;
    var responseA = textoJSON.question.responses[0];
    var responseB = textoJSON.question.responses[1];
    var responseC = textoJSON.question.responses[2];
}

