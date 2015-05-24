var http = require('http');
var https = require('https');
var fs = require("fs");
var sys = require('sys');
var url = require('url');
var qs = require('querystring');

module.exports = function (app) {
    app.all('/node', function (reqIN, resIN) {
        console.log('A connection was successfully established with the NODE server');

        // POST request from client ::
        if (reqIN.method == 'POST') {
            var topic, ip;
            // request from client ::
            reqIN.on('data', function (data) {

                topic = data.toString();
                ip = reqIN.connection.remoteAddress;

            });
            // request from client ::
            reqIN.on('end', function () {

                var options = {
                    host: 'ajax.googleapis.com',
                    path: '/ajax/services/search/news?v=1.0&topic=' + topic + '&rsz=8&userip=' + ip
                };
                var ajaxData = '';
                // request from google server ::
                var reqOUT = http.request(options, function (resOUT) {

                    resOUT.setEncoding('utf8');
                    resOUT.on('data', function (chunk) {

                        // append data ::
                        ajaxData += chunk;
                    });
                    // request from google server ::
                    resOUT.on('end', function (message) {
                        // write Ajax message to body as a response for Client POST request ::
                        resIN.writeHead(200, { 'Content-Type': 'text/plain' });
                        resIN.write(ajaxData);
                        resIN.end();
                    });
                });

                reqOUT.on('error', function (e) {
                    console.log('problem with request: ' + e.message);
                });

                reqOUT.end();

            });
        }
    });
}