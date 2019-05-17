var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
let signup = function () {
    $('#failed').hide();
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/register/admin", true); 
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
    if(habilita | reactiva | gestiona | clasifica){
    http.send(JSON.stringify({
        doctype: document.getElementById("dt").value,
        docnumber: document.getElementById("docnumber").value,
        estado: true,  
        firstname: document.getElementById("firstName").value,
        lastname: document.getElementById("lastName").value,
        genre: document.getElementById("genero").value,
        birthdate: document.getElementById("birthday").value,
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
}