var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
let signup = function () {

    var doctype = $("#dt").val();
    var docnumber = $("#docnumber").val();
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var genero = $("#genero").val();
    var birthdate = $("#birthday").val();
    var city = $("#city").val();
    var address = $("#direccion").val();
    var phonenumber = $("#telefono").val();
    var mobilephonenumber = $("#celular").val();
    var email = $("#correo").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var habilita = document.getElementById("habilitaExamenes").checked;
    var reactiva = document.getElementById("reactivaExamenes").checked;
    var gestiona = document.getElementById("gestionaEstadisticas").checked;
    var clasifica = document.getElementById("clasificaAspirantes").checked;

    if (doctype == '0' || docnumber == '' || firstname == '' || lastname == '' ||
        genero == '0' || birthdate == '' || city == '' || address == '' ||
        phonenumber == '' || mobilephonenumber == '' || email == '' || username == '' ||
        password == '') {

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {

        if (password.length < 8) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('La contraseña debe tener al menos 8 caracteres', 'error', 3);
        } else {

            var exito = false;
            var http = new XMLHttpRequest();
            http.responseType = 'json';
            http.open("POST", "/api/register/admin", true);
            http.setRequestHeader("Content-type", "application/json");
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    exito = true;
                    localStorage.setItem("mikey", http.response.token);
                    window.location.replace('/admin/profile');
                }
            }
            if (habilita | reactiva | gestiona | clasifica) {
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
                setTimeout(function () {
                    if (!exito) {
                        alertify.set('notifier', 'position', 'bottom-center');
                        alertify.notify('Ya existe un registro con el mismo número de documento de identidad, con el correo o con el usuario dado', 'error', 5);
                    }
                } , 1000)
            } else {
                console.log("habilita | reactiva | gestiona | clasifica is not selected");
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('No se ha seleccionado ningún rol que tendrá el aspirante', 'error', 3);
            }
        }
    }
}