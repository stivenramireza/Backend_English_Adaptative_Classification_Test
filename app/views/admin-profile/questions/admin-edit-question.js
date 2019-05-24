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
            var lista_pregunta
            var array = [];
            for(var i = 0; i < texto.length; i++){
                array[i] = texto[i];
            }
            
            $('#tabla_preguntas').DataTable({
                
            });
            
        }
        
    }
    
});