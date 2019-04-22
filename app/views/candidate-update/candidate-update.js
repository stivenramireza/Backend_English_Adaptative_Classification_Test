var http = new XMLHttpRequest();
var doc_number = localStorage.getItem("docnumber");
var params = 'docnumber='+doc_number;
http.responseType = 'json';
http.open('GET', '/api/candidate/list'+'?'+ params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_candidate;
        var id = texto._id;
        localStorage.setItem("_id", id);
        var nombres = texto.firstname;
        document.getElementById("firstName").value = nombres;
        var apellidos = texto.lastname;
        document.getElementById("lastName").value = apellidos;
        var fecha_nacimiento = texto.birthdate;
        document.getElementById("birthdate").value = fecha_nacimiento;
        var direccion = texto.address;
        document.getElementById("address").value = direccion;
        var telefono = texto.phonenumber;
        document.getElementById("telefono").value = telefono;
        var celular = texto.mobilephonenumber;
        document.getElementById("celular").value = celular;
        var correo = texto.email;
        document.getElementById("correo").value = correo;
        var ciudad = texto.currentcity;
        document.getElementById("city").value = ciudad;
        var genero = texto.genre;
        document.getElementById("genero").value = genero;
    }
}

let update = function () {
    var http = new XMLHttpRequest();
    var id = localStorage.getItem('_id');
    var params = 'idCandidate='+id;
    http.responseType = 'json';
    http.open("PUT", "/api/candidate/update"+'?'+params, true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/candidate/test/pre_started');
        }
    }
    var isChecked = document.getElementById("same-address").checked;
    if(isChecked){
    http.send(JSON.stringify({ doctype: localStorage.getItem('doctype'), 
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
    }else{
        $('#failed').show();
    }
}