var http = new XMLHttpRequest();
http.responseType = 'json';
http.open('GET', '/test/statistics/lastweek', true);
http.setRequestHeader("Content-type", "application/json");
http.send(null);
http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        var texto = http.response.info_examen;
        document.getElementById("week").innerHTML = texto.length;
        
        http.open('GET', '/test/statistics/lastmonth', true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(null);
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                var texto = http.response.info_examen;
                document.getElementById("month").innerHTML = texto.length;

                http.open('GET', '/test/statistics/lastsemester', true);
                http.setRequestHeader("Content-type", "application/json");
                http.send(null);
                http.onreadystatechange = function () {
                    if (http.readyState == 4 && http.status == 200) {
                        var texto = http.response.info_examen;
                        document.getElementById("semester").innerHTML = texto.length;

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


