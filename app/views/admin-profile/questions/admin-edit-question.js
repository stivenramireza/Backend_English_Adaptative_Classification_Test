var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

$(document).ready(function() {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open('GET', '/api/question/findall', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(null);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var texto = http.response.preguntas;
            console.log(texto);
            $('#tabla_preguntas').DataTable({
                "data": texto,
                "columns":[
                    {"data": "n_item"},
                    {"data": "parte"},
                    {"data": "pregunta"},
                    {"data": "opcion_correcta.0"},
                    {"data": "opcion_correcta.1"},
                    {"data": "opcion_correcta.2"},
                    {"defaultContent": "<center><button class='btn btn-primary'><i class='fa fa-edit'></i></button></center> <br> <button class='btn btn-danger'><i class='fa fa-trash'></i></button></center>"}
                ]
            });
            
        }
        
    }
    
});

let actualizar = function(){

}