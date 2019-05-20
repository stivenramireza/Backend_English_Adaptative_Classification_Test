var http = new XMLHttpRequest();
var username = localStorage.getItem("username");
var params = 'username='+username;
http.responseType = 'json';
http.open('GET', '/api/admin/list'+'?'+ params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_admin;
        var nombre = texto[0].firstname;
        var apellido = texto[0].lastname;
        var nombre_completo = nombre + " " + apellido;
        document.getElementById("nombreAdmin").innerHTML = nombre_completo;
        localStorage.setItem("nombre_admin", nombre_completo);

    }
}