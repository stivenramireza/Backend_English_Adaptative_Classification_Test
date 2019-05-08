let gradeCandidate = function () {
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
}