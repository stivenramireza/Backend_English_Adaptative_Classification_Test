let update = function () {
    var http = new XMLHttpRequest();
    http.responseType = 'json';
    http.open("GET", "/api/register/candidate", true); 
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            localStorage.setItem("mikey", http.response.token);
            //window.location.replace('/candidate/test/pre-started');
        }
    }
    http.send(JSON.stringify({
        doctype: document.getElementById("dt").value,
        docnumber: document.getElementById("docnumber").value,  
        firstname: document.getElementById("firstName").innerHTML = firstname,
        lastname: document.getElementById("lastName").value,
        genre: document.getElementById("genero").value,
        birthdate: document.getElementById("birthday").value,
        currentcity: document.getElementById("city").value,
        address: document.getElementById("direccion").value,
        phonenumber: document.getElementById("telefono").value,
        mobilephonenumber: document.getElementById("celular").value,
        email: document.getElementById("correo").value,
    }));
}