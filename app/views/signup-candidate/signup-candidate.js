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
        phonenumber == '' || mobilephonenumber == '' || email == '') {

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else if (isChecked != true) {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se ha aceptado la autorización', 'error', 3);
    } else {
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
            phonenumber: document.getElementById("telefono").value,
            mobilephonenumber: document.getElementById("celular").value,
            email: document.getElementById("correo").value,
            examen_activo: false
        }));
        console.log(http.readyState);
        console.log(http.status);

        setTimeout(function () {
            if (http.response.status == 'failed') {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('Ya existe un registro con el mismo número de documento de identidad dado', 'error', 5);
            } else {
                alertify.set('notifier', 'position', 'bottom-center');
                alertify.notify('El registro se ha completado exitosamente', 'success', 5);
                
                setTimeout(function () {
                    window.location.replace('/signin');
                }, 2500)

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
    }
}