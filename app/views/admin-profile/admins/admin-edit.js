let gestionar = function () {
    localStorage.setItem("docnumber", document.getElementById("docnumber").value);
    localStorage.setItem("doctype", document.getElementById("dt").value);
    window.location.replace('/admin/profile/edit-admin/data');
}