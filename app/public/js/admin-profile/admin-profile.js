/** Petición GET que obtiene las estadísticas de la última semana, último mes, último semestre y último año */
var http = new XMLHttpRequest();
http.responseType = 'json';
/** Última semana */
http.open('GET', '/test/statistics/lastweek', true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_examen;
        document.getElementById("week").innerHTML = texto.length;
        /** Último mes */
        http.open('GET', '/test/statistics/lastmonth', true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(null);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                var texto = http.response.info_examen;
                document.getElementById("month").innerHTML = texto.length;
                /** Último semestre */
                http.open('GET', '/test/statistics/lastsemester', true);
                http.setRequestHeader("Content-type", "application/json");
                http.send(null);
                http.onreadystatechange = function () {
                    if (http.readyState == 4 && http.status == 200) {
                        var texto = http.response.info_examen;
                        document.getElementById("semester").innerHTML = texto.length;
                        /** Último año */
                        http.open('GET', '/test/statistics/lastyear', true);
                        http.setRequestHeader("Content-type", "application/json");
                        http.send(null);
                        http.onreadystatechange = function () {
                            if (http.readyState == 4 && http.status == 200) {
                                var texto = http.response.info_examen;
                                document.getElementById("year").innerHTML = texto.length;
                            }
                        }
                    }
                }
            }
        }
    }
}


