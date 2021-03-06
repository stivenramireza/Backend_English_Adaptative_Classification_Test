var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;

/**
 * Función que permite registrar un administrador desde el frontend
 */
let signup = function () {
    var doctype = $("#dt").val();
    var docnumber = $("#docnumber").val();
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var genero = $("#genero").val();
    var birthdate = $("#birthday").val();
    var department = $('#department').val();
    var city = $("#city").val();
    var phonenumber = $("#telefono").val();
    var email = $("#correo").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var sede = $("#sede").val();
    var habilita = document.getElementById("habilitaExamenes").checked;
    var reactiva = document.getElementById("reactivaExamenes").checked;
    var gestiona = document.getElementById("gestionaEstadisticas").checked;
    var clasifica = document.getElementById("clasificaAspirantes").checked;

    if (doctype == '0' || docnumber == '' || firstname == '' || lastname == '' ||
        genero == '0' || birthdate == '' || city == '' ||
        email == '' || department == '' || sede == '' || username == '' || password == '') {

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {

        if (docnumber.length < 5) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El número de documento de identidad debe tener al menos 5 caracteres', 'error', 3);
        } else if (firstname.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El nombre debe tener a lmenos 4 caracteres', 'error', 3);
        } else if (lastname.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('Los apellidos deben tener 4 caracteres', 'error', 3);
        } else if (username.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El usuario debe tener al menos 4 caracteres', 'error', 3);
        } else if (password.length < 8) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('La contraseña debe tener al menos 8 caracteres', 'error', 3);
        } else if (email.length < 7) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El email debe tener almenos 7 caracteres', 'error', 3);
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
                    currentdepartment: document.getElementById("department").value,
                    currentcity: document.getElementById("city").value,
                    phonenumber: document.getElementById("telefono").value,
                    email: document.getElementById("correo").value,
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value,
                    sede: document.getElementById("sede").value,
                    habilitar_examenes: habilita,
                    administrador_general: reactiva,
                    gestionar_estadisticas: gestiona,
                    clasificar_aspirantes: clasifica
                }));
                setTimeout(function () {
                    if (!exito) {
                        if (http.response.status == 'failed') {
                            if (http.response.message.includes("docnumber")) {
                                alertify.set('notifier', 'position', 'bottom-center');
                                alertify.notify('Ya existe un registro con el mismo número de documento de identidad dado', 'error', 5);
                            } else if (http.response.message.includes("email")) {
                                alertify.set('notifier', 'position', 'bottom-center');
                                alertify.notify('Ya existe un registro con el mismo correo dado', 'error', 5);
                            } else if (http.response.message.includes("username")) {
                                alertify.set('notifier', 'position', 'bottom-center');
                                alertify.notify('Ya existe un registro con el mismo usuario dado', 'error', 5);
                            } else {
                                alertify.set('notifier', 'position', 'bottom-center');
                                alertify.notify('Ya existe un registro con el mismo número de documento de identidad, con el correo o con el usuario dado', 'error', 5);
                            }
                        } else {
                            alertify.set('notifier', 'position', 'bottom-center');
                            alertify.notify('Error en los datos suministrados: Verifique que el número de documento de identidad, el número de télefono, el número celular deben ser numéricos, y que el correo sea un correo válido', 'error', 8);
                        }
                    } else {

                        alertify.set('notifier', 'position', 'bottom-center');
                        alertify.notify('El registro se ha completado exitosamente', 'success', 5);

                        setTimeout(function () {
                        window.location.replace('/admin/profile');
                        }, 2500)

                    }
                }, 1000)

            } else {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('No se ha seleccionado ningún rol que tendrá el aspirante', 'error', 3);
            }
        }
    }
}