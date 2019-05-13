let login = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/signin/admin", true); 
    http.setRequestHeader("Content-type", "application/json");
    var exito = false;
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var texto = http.response;
            localStorage.setItem("username", document.getElementById("inputUsername").value);
            localStorage.setItem("mikey", http.response.token);
            if(texto.status == 'failed'){
                exito = false;
            }else{
                exito = true;
                window.location.replace('/admin/profile');
            }
        }
    }
    var usernameAdmin = document.getElementById("inputUsername").value;
    var passwordAdmin = document.getElementById("inputPassword").value;
    http.send(JSON.stringify({ username: usernameAdmin, 
        password:  passwordAdmin}));
    if(!exito && usernameAdmin != "" && passwordAdmin != ""){
        alertify.set('notifier','position', 'bottom-center');
        alertify.notify('El usuario o clave es incorrecto', 'error', 3);
    }
}

$(document).ready(function () {
    $('#btnLogin').click(function () {
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();

        if (username == '' || password == '') {
            alertify.set('notifier','position', 'bottom-center');
            alertify.notify('No se han completado todos los campos', 'error', 3);
        }
    });
});