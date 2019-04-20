var req = new XMLHttpRequest();
var doc_number = localStorage.getItem("docnumber");
var sendData = "{ \"docnumber\" : \""+ doc_number + "\"  }"
console.log(sendData);
req.responseType = 'json';
req.open("GET", '/api/candidate/list', true);
req.setRequestHeader("Content-type", "application/json");
req.send(sendData);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        console.log(texto);
    }
}