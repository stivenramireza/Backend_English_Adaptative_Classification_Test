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
    var isChecked = document.getElementById("same-address").checked;

    if (doctype == '0' || docnumber == '' || firstname == '' || lastname == '' ||
        genero == '0' || birthdate == '' || city == '' || address == '' ||
        mobilephonenumber == '' || email == '') {

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos obligatorios', 'error', 3);
    } else if (isChecked != true) {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se ha aceptado la autorización', 'error', 3);
    } else {
        if (docnumber.length < 5) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El número de documento de identidad debe ser mayor a 4 caracteres', 'error', 3);
        } else if (firstname.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El nombre debe ser mayor a 3 caracteres', 'error', 3);
        } else if (lastname.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('Los apellidos deben ser mayor a 3 caracteres', 'error', 3);
        } else if (address.length < 4) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('La dirección de residencia debe ser mayor a 3 caracteres', 'error', 3);
        } else if (mobilephonenumber.length < 12) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El número de celular debe ser mayor a 11 caracteres', 'error', 3);
        } else if (email.length < 7) {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El email debe ser mayor a 6 caracteres', 'error', 3);
        //} else if (!j) {
            //alertify.set('notifier', 'position', 'bottom-center');
            //alertify.notify('El email dado no es un email válido', 'error', 3);
        } else {
        var phone = document.getElementById("telefono").value;
        if (typeof phone == 'number' || phone == '') {
            console.log(typeof phone);
            var http = new XMLHttpRequest();
            http.responseType = 'json';
            http.open("POST", "/api/register/candidate", true);
            http.setRequestHeader("Content-type", "application/json");
            http.send(JSON.stringify({
                doctype: document.getElementById("dt").value,
                docnumber: document.getElementById("docnumber").value,
                firstname: document.getElementById("firstName").value,
                lastname: document.getElementById("lastName").value,
                genre: document.getElementById("genero").value,
                birthdate: document.getElementById("birthday").value,
                currentcity: document.getElementById("city").value,
                address: document.getElementById("direccion").value,
                phonenumber: phone,
                mobilephonenumber: document.getElementById("celular").value,
                email: document.getElementById("correo").value,
                examen_activo: false
            }));
            console.log(http.readyState);
            console.log(http.status);
            console.log(http.response);

            setTimeout(function () {
                var message = http.response.message;
                if (http.response.status == 'failed') {
                    if (message.includes("docnumber_1")) {
                        alertify.set('notifier', 'position', 'bottom-center');
                        alertify.notify('Ya existe un registro con el mismo número de documento de identidad dado', 'error', 5);
                    } else if (message.includes("email")) {
                        alertify.set('notifier', 'position', 'bottom-center');
                        alertify.notify('Ya existe un registro con el mismo email dado', 'error', 5);
                    } else {
                        alertify.set('notifier', 'position', 'bottom-center');
                        alertify.notify('Ya existe un registro con el mismo número de documento de identidad o el email dado', 'error', 5);
                    }            
                } else {
                    alertify.set('notifier', 'position', 'bottom-center');
                    alertify.notify('El registro se ha completado exitosamente', 'success', 5);

                    //setTimeout(function () {
                    //window.location.replace('/signin');
                    //}, 2500)

                    setTimeout(function () {
                        document.getElementById("dt").value = "0";
                        document.getElementById("docnumber").value = "";
                        document.getElementById("firstName").value = "";
                        document.getElementById("lastName").value = "";
                        document.getElementById("birthday").value = "";
                        document.getElementById("direccion").value = "";
                        document.getElementById("telefono").value = "";
                        document.getElementById("celular").value = "";
                        document.getElementById("correo").value = "";
                        document.getElementById("city").value = "";
                        document.getElementById("genero").value = "0";
                        document.getElementById("same-address").checked = null;
                    }, 500)
                }
            }, 1000)

        } else {
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.notify('El teléfono debe ser númerico', 'error', 5);
        }
    }
    }
}