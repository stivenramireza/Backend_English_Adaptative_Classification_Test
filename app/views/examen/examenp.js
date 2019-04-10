var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var req = new XMLHttpRequest();
req.responseType = 'json';
req.open("POST", 'http://localhost:8000/test/next_question', true);
req.setRequestHeader("Content-type", "application/json");
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        console.log("melo caramelo");
    }
}
req.send(JSON.stringify({
    n_item: 0,
    n_response: 2
}));