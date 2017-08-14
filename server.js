/**
 * Created by Kayvon Rahimi on 5-7-2017.
 */
var express = require('express');
var http = require('http');
var config = require('./config.json');
var db = require('./database/db_connector');

var app = express();

//Set the port for the server by fetching it from config.json
app.set('PORT' , config.webPort);
var port = process.env.PORT || app.get('PORT');

app.use('/api', require('./routes/userinfo/login.routes'));
app.use('/api', require('./routes/userinfo/register.routes'));
app.use('/api/planned', require('./routes/projects/planned.routes'));
app.use('/api/current', require('./routes/projects/current.routes'));
app.use('/api/finished', require('./routes/projects/finished.routes'));

//BodyParser to process input from post/put requests
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));


// Fallback voor als de opgegeven URL niet werkt
app.use('*', function(req, res) {
    res.status(400);
    res.json({
        'error': 'URL not found '+ '\n' + 'The URL you submitted is invalid. Check your URL and try again.'
    });
});

app.listen(port, function(request, response){
    console.log("The AFBW Server is running on port " + port + ".")
});

module.exports = app;