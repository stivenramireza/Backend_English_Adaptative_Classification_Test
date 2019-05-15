let gradeCandidate = function () {

    var doctype = $("#dt").val();
    var docnumber = $("#docnumber").val();

    if (doctype == '0' || docnumber == '') {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('No se han completado todos los campos', 'error', 3);
    } else {

        var http = new XMLHttpRequest();
        var id = document.getElementById("docnumber").value;
        var lev = document.getElementById("level").value;
        var params = 'docnumber=' + id;
        console.log("Params: " + params);
        http.responseType = 'json';
        http.open("PUT", "/api/test/updatebydoc" + '?' + params, true);
        http.setRequestHeader("Content-type", "application/json");

        console.log("id: " + id);
        console.log("Level: " + lev)

        http.send(JSON.stringify({
            final_level: lev
        }))

        alertify.set('notifier', 'position', 'bottom-center');
        alertify.notify('La clasificación del estudiante se ha realizado exitosamente', 'success', 5);
        document.getElementById("dt").value = "0";
        document.getElementById("docnumber").value = "";
    }
}