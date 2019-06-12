var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
/** Petición GET que permite mostrar todas las preguntas de la base de datos en el frontend */
$(document).ready(function() {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open('GET', '/api/question/findall', true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(null);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var texto = http.response.preguntas;
            var table = $('#tabla_preguntas').DataTable({
                "language": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ preguntas",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando preguntas del _START_ al _END_ de un total de _TOTAL_ preguntas",
                    "sInfoEmpty":      "Mostrando preguntas del 0 al 0 de un total de 0 preguntas",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ preguntas)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero",
                        "sLast":     "Último",
                        "sNext":     "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                },
                "data": texto,
                "columns":[
                    {"data": "n_item"},
                    {"data": "parte"},
                    {"data": "pregunta"},
                    {"data": "opcion_correcta.0"},
                    {"data": "opcion_correcta.1"},
                    {"data": "opcion_correcta.2"},
                    {"defaultContent": "<button id='btnEditar'class='btn btn-primary'><i class='fa fa-edit'></i></button> <br><br> <button id='btnEliminar'type='button' class='btn btn-danger'data-toggle='modal' data-target='#myModal'><i class='fa fa-trash'></i></button>"}
                ]
            });
            $('#tabla_preguntas tbody').on( 'click', 'button', function () {
                var action = this.id;
                var data = table.row($(this).parents('tr')).data();
                localStorage.setItem('item_pregunta', JSON.stringify(data.n_item))
                if(action == 'btnEditar'){
                    window.location.replace('/admin/profile/edit-question/data');
                }                
            });
        }
    }
});

/**
 * Función que permite eliminar una pregunta de la base de datos desde el frontend
 */
let eliminar = function(){
    var http = new XMLHttpRequest();
    var item = localStorage.getItem('item_pregunta');
    var params = 'n_item='+item;
    http.responseType = 'json';
    http.open("DELETE", "/api/question/remove"+'?'+params, true); 
    http.setRequestHeader("Content-type", "application/json");
    http.send(null);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            window.location.replace('/admin/profile/edit-question');
        }
   }
}