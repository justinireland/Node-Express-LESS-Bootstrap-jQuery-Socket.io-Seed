var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var lessMiddleware = require('less-middleware');

var port = 3001;

// Express configuration
app.set('view engine', 'jade');
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
// Make config data available to template engine
app.use(function(req, res, next) {
    res.locals.config = require('./data/config.json');
    next();
});

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

server.listen(port,function(){
    console.log('HTTP server listening on port ' + port);
});

// Socket.io bindings
io.on('connection', function(socket){
    console.log('Client connected');

    socket.on('disconnect', function(){
        console.log('Client disconnected');
    });
});
