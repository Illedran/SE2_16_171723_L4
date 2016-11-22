"use strict";

//express lib
var express = require('express');
//inspect
var util = require('util');

//instantiate express
var app = express();

var model = require('./model.js');
//POST
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

//JSON post
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 1337));

//use: for both POST and GET

// Servo tutti i file client side: in particolare i file HTML (non uso template per comodità), JS e CSS
app.use('/', express.static('static'));

app.use('/get', function (request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    var employee = model.get_employee(request.body.id);
    var data;
    if (employee === undefined) {
        data = {'error' : 'Employee not found'};
    } else {
        data = employee;
    }
    response.end(JSON.stringify(data));
});

app.use('/remove', function (request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    var deleted = model.delete_employee(request.body.id);
    console.log(request.body);
    var data;
    if (deleted === [] || request.body.id === '') {
        data = {'error': 'Employee not found'};
    } else {
        data = {'success': "Employee removed"};
    }
    response.end(JSON.stringify(data));
});

app.use('/add', function (request, response) {
    response.writeHead(200, {"Content-Type": "application/json"});
    console.log(request.body);
    var id  = model.insert_employee(request.body.id === '' ? undefined : request.body.id, request.body.name,
                                    request.body.surname, request.body.level, request.body.salary);
    response.end(JSON.stringify({id: id}));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:'+ app.get('port') +'/');
});