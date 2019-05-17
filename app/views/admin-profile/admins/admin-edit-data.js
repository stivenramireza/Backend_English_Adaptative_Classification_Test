var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
var http = new XMLHttpRequest();
var docnumber = localStorage.getItem("docnumber");
var params = 'docnumber='+docnumber;
http.responseType = 'json';
http.open('GET', '/api/admin/edit'+'?'+ params, true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_admin;
        var id = texto._id;
        localStorage.setItem("id_admin", id);
        var tipo_documento = texto.doctype;
        document.getElementById("dt").value = tipo_documento;
        var nro_documento = texto.docnumber;
        document.getElementById("docnumber").value = nro_documento;
        var nombres = texto.firstname;
        document.getElementById("firstName").value = nombres;
        var apellidos = texto.lastname;
        document.getElementById("lastName").value = apellidos;
        var username = texto.username;
        document.getElementById("username").value = username;
        document.getElementById("password").value = '**************';
        var fecha_nacimiento = texto.birthdate;
        document.getElementById("birthdate").value = fecha_nacimiento;
        var direccion = texto.address;
        document.getElementById("direccion").value = direccion;
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
        var estado = texto.estado;
        if(estado){
            document.getElementById("estado_cuenta").value = 'Activo/a';
        }else{
            document.getElementById("estado_cuenta").value = 'Inactivo/a"';
        }
        var habilitar = texto.habilitar_examenes;
        document.getElementById("habilitaExamenes").checked = habilitar;
        var reactivar = texto.reactivar_examenes;
        document.getElementById("reactivaExamenes").checked = reactivar;
        var gestionar = texto.gestionar_estadisticas;
        document.getElementById("gestionaEstadisticas").checked = gestionar;
        var clasificar = texto.clasificar_aspirantes;
        document.getElementById("clasificaAspirantes").checked = clasificar;
    }
}

let update = function () {
    var http = new XMLHttpRequest();
    var id = localStorage.getItem('id_admin');
    var params = 'idAdmin='+id;
    http.responseType = 'json';
    http.open("PUT", "/api/admin/update"+'?'+params, true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/admin/profile');
        }
    }
    var habilita = document.getElementById("habilitaExamenes").checked;
    var reactiva = document.getElementById("reactivaExamenes").checked;
    var gestiona = document.getElementById("gestionaEstadisticas").checked;
    var clasifica = document.getElementById("clasificaAspirantes").checked;
    var estado_cuenta = document.getElementById("estado_cuenta").value;
    if(estado_cuenta == 'Activo/a'){
        estado_cuenta = true;
    }else{
        estado_cuenta = false;
    }
    if(habilita | reactiva | gestiona | clasifica){
        http.send(JSON.stringify({
            doctype: document.getElementById("dt").value,
            docnumber: document.getElementById("docnumber").value,
            estado: estado_cuenta,  
            firstname: document.getElementById("firstName").value,
            lastname: document.getElementById("lastName").value,
            genre: document.getElementById("genero").value,
            birthdate: document.getElementById("birthdate").value,
            currentcity: document.getElementById("city").value,
            address: document.getElementById("direccion").value,
            phonenumber: document.getElementById("telefono").value,
            mobilephonenumber: document.getElementById("celular").value,
            email: document.getElementById("correo").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            habilitar_examenes: habilita,
            reactivar_examenes: reactiva,
            gestionar_estadisticas: gestiona,
            clasificar_aspirantes: clasifica
        }));
    }else{
        $('#failed').show();
        console.log("habilita | reactiva | gestiona | clasifica is not selected");
    }
};
