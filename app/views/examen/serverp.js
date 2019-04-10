var express = require('express')
var cors = require('cors')
var app = express()
var request = require('request')

var corsOptions = {
    origin: 'http://ec2-34-207-193-227.compute-1.amazonaws.com/',
    optionsSuccessStatus: 200
}

app.post('/test/next_question', cors(corsOptions), function(req, res, next){
    request.post('http://ec2-34-207-193-227.compute-1.amazonaws.com/test/next_question', function(error, response, data){
        res.send(JSON.stringify({
            "n_item": 0,
            "n_response": 2
        }))
        console.log(body);
    });
});

app.listen(3000, function(){
    console.log('CORS-enabled web server listening on port: 3000');
});