let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/candidate", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("docnumber", document.getElementById("docnumber").value);
            localStorage.setItem("doctype", document.getElementById("doctype").value);
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/candidate/profile');
        }
    }
    http.send(JSON.stringify({ doctype: document.getElementById("doctype").value, 
                        docnumber: document.getElementById("docnumber").value }));
}

$(document).ready(function () {
    $('#failed').hide();
    $('#btnLogin').click(function () {
        var doctype = $("#doctype").val();
        var docnumber = $("#docnumber").val();

        if (doctype == '' || docnumber == '') {
            $('#failed').show();
        } 
    });
});