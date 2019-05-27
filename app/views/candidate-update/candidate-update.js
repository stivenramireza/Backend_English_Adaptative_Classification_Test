var http = new XMLHttpRequest();
var doc_number = localStorage.getItem("docnumber");
var params = 'docnumber=' + doc_number;
http.responseType = 'json';
http.open('GET', '/api/candidate/list' + '?' + params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {

        var texto = http.response.info_candidate;
        var id = texto._id;
        var nombres = texto.firstname;
        var apellidos = texto.lastname;
        var fecha_nacimiento = texto.birthdate;
        var direccion = texto.address;
        var telefono = texto.phonenumber;
        var celular = texto.mobilephonenumber;
        var correo = texto.email;
        var ciudad = texto.currentcity;
        var genero = texto.genre;

        setTimeout(function(){
            localStorage.setItem("_id", id);
            document.getElementById("firstName").value = nombres;
            document.getElementById("lastName").value = apellidos;
            document.getElementById("birthdate").value = fecha_nacimiento;
            document.getElementById("address").value = direccion;
            document.getElementById("telefono").value = telefono;
            document.getElementById("celular").value = celular;
            document.getElementById("correo").value = correo;
            document.getElementById("city").value = ciudad;
            document.getElementById("genero").value = genero;
        }, 1000);
    }
}

let update = function () {
    var first_name = document.getElementById("firstName").value;
    var last_name = document.getElementById("lastName").value;
    var genero = document.getElementById("genero").value;
    var birth_date = document.getElementById("birthdate").value;
    var city = document.getElementById("city").value;
    var direccion = document.getElementById("address").value;
    var mobilephone_number = document.getElementById("celular").value;
    var correo = document.getElementById("correo").value;

    if (first_name == '' || last_name == '' || genero == '0' || birth_date == '' ||
        city == '' || direccion == '' || mobilephone_number == '' || correo == '') {

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos obligatorios', 'error', 3);
    } else {

        var http = new XMLHttpRequest();
        var id = localStorage.getItem('_id');
        var params = 'idCandidate=' + id;
        http.responseType = 'json';
        http.open("PUT", "/api/candidate/update" + '?' + params, true);
        http.setRequestHeader("Content-type", "application/json");
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                localStorage.setItem("mikey", http.response.token);
                window.location.replace('/candidate/test/pre_started');
            }
        }
        var isChecked = document.getElementById("same-address").checked;
        if (isChecked) {
            http.send(JSON.stringify({
                doctype: localStorage.getItem('doctype'),
                docnumber: localStorage.getItem('docnumber'),
                firstname: document.getElementById("firstName").value,
                lastname: document.getElementById("lastName").value,
                genre: document.getElementById("genero").value,
                birthdate: document.getElementById("birthdate").value,
                currentcity: document.getElementById("city").value,
                address: document.getElementById("address").value,
                phonenumber: document.getElementById("telefono").value,
                mobilephonenumber: document.getElementById("celular").value,
                email: document.getElementById("correo").value
            }));
        } else {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('No se ha aceptado la autorización', 'error', 3);
        }
    }
}