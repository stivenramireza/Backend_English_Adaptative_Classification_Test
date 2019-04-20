let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/admin", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/admin/profile');
        }
    }
    http.send(JSON.stringify({ username: document.getElementById("inputUsername").value, 
    password: document.getElementById("inputPassword").value }));
}

$(document).ready(function () {
    $('#failed').hide();
    $('#btnLogin').click(function () {
        var emailUser = $("#inputUsername").val();
        var passwordUser = $("#inputPassword").val();

        if (emailUser == '' || passwordUser == '') {
            $('#failed').show();
        } 
    });
});

