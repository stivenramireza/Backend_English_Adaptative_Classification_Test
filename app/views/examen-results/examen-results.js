var req = new XMLHttpRequest();
var doc_number = localStorage.getItem("docnumber");
var params = 'docnumber='+doc_number;
req.responseType = 'json';
req.open("GET", '/test/info'+'?'+params, true);
req.setRequestHeader("Content-type", "application/json");
req.send(null);
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
            var texto = req.response;
            var array_respuestas = texto.info_examen.responses;
            var array_partes = texto.info_examen.parts;
            var nota_final = calcularNotas(array_respuestas, array_partes);
            document.getElementById("final_result").innerHTML = nota_final;
    }
}

function calcularNotas(array_respuestas, array_partes){
            var arrayRespuestas = array_respuestas;
            var arrayPartes = array_partes;
            var c_parte1 = 0, c_parte2 = 0, c_parte3 = 0;
            var counter1 = 0, counter2 = 0, counter3 = 0;
            var i;
            for (i = 0; i < arrayRespuestas.length + 1; i++){
                if(arrayPartes[i+1] == 1){
                    counter1++;
                    if(arrayRespuestas[i+1] == true){
                        c_parte1 = c_parte1 + 5;
                    }
                }else if(arrayPartes[i+1] == 2){
                    counter2++;
                    if(arrayRespuestas[i+1] == true){
                        c_parte2 = c_parte2 + 5;
                    }
                }else if(arrayPartes[i+1] == 3){
                    counter3++;
                    if(arrayRespuestas[i+1] == true){
                        c_parte3 = c_parte3 + 5;
                    }
                }
            }
            
            if(counter1 == 0){
                c_parte1 = 5;
            }else{
                c_parte1 = c_parte1/counter1;
            }
            if(counter2 == 0 && c_parte3 > 3){
                c_parte2 = 5;
            }else{
                c_parte2 = c_parte2/counter2;
            }
            if(counter3 == 0){
                c_parte3 = 0;
            }else{
                c_parte3 = c_parte3/counter3;
            }
            var nota_final = ((c_parte1 + c_parte2 + c_parte3) / 3).toFixed(1);
    return nota_final;
}