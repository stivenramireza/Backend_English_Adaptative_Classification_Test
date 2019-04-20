/** request();
var doc_number = localStorage.getItem("docnumber");
req.responseType = 'json';
req.open("GET", '/api/candidate/list', true);
req.setRequestHeader("Content-type", "application/json");
var sendData = "{ \"docnumber\" : \"1152224425\"}"
req.send(sendData);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        console.log(texto);
    }
}*/
var token = localStorage.getItem("mikey");
console.log("token: ", token);
var doc_number = localStorage.getItem("docnumber");
console.log("docnumber", doc_number);
var settings = {
    "url": "/api/candidate/list",
    "method": "GET",
    "headers": {
        "content-type": "application/json",
        "authorization": token,
    },
    "data": JSON.stringify({
        "docnumber": doc_number
    })
}
$.ajax(settings).done(function (response) {
    if (response.info_candidate.length != 0) {
        console.log(response.info_candidate);
    } else {
        console.log("No tienes información almacenada");
    }
}).fail(function (err) {
    console.log(err);
});