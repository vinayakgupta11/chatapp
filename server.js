const express = require('express');
const bodyParser = require('body-parser');
const routes= require('../ChatApp/router/routes');
// create express app
const app = express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/frontEnd/index.html');
  });
 io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('EmiterEvent',{description:"Hey i am Vinayak"})
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
   });
const expressValidator = require('express-validator');
app.use(express.static('../ChatApp/frontEnd'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
 app.use(expressValidator());
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to  application. "});
});
app.use('/',routes);
// listen for requests
// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });
http.listen(3000, function() {
    console.log('listening on localhost:3000');
 });