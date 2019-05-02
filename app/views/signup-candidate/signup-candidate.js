let signup = function () {
    $('#failed').hide();
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("POST", "/api/register/candidate", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            window.location.replace('/signin/candidate');
        }
    }
    var isChecked = document.getElementById("same-address").checked;
    if(isChecked){
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
    }else{
        $('#failed').show();
    }
}

