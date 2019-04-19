var req = new XMLHttpRequest();
var doc_type = localStorage.getItem("doctype");
console.log("doctype: ", doc_type);
var doc_number = localStorage.getItem("docnumber");
console.log("docnumber: ", doc_number);
req.responseType = 'json';
req.open("GET", '/api/candidate/list', true);
req.setRequestHeader("Content-type", "application/json");
req.send(JSON.stringify({doctype: doc_type, docnumber: doc_number}));
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        var texto = req.response;
        console.log(texto);
    }
}