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