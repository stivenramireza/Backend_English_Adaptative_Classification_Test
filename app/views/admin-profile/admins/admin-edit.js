var nombre_completo = localStorage.getItem('nombre_admin');
document.getElementById("nombreAdmin").innerHTML = nombre_completo;
let gestionar = function () {
    localStorage.setItem("docnumber", document.getElementById("docnumber").value);
    localStorage.setItem("doctype", document.getElementById("dt").value);
    window.location.replace('/admin/profile/edit-admin/data');
}