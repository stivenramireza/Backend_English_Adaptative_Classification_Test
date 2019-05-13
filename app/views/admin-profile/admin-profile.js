var http = new XMLHttpRequest();
var username = localStorage.getItem("username");
console.log("username: ", username);
var params = 'username='+username;
http.responseType = 'json';
http.open('GET', '/api/admin/list'+'?'+ params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_admin;
        var nombre = texto.firstname;
        var apellido = texto.lastname;
        var nombre_completo = nombre + " " + apellido;
        document.getElementById("nombreAdmin").innerHTML = nombre_completo;
    }
}