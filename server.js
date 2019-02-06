require("dotenv").config();
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var exphbs = require("express-handlebars");
var db = require("./models");
var PORT = process.env.PORT || 5000;

var rooms = 0;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

/*========================= start original listen =========================== */
// Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function() {
//   app.listen(PORT, function() {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser",
//       PORT,
//       PORT
//     );
//   });
// });
/*========================== end original listen ============================ */


/* =================== start new ====================== */

io.on('connection', function(socket){
	console.log('A user connected!'); // We'll replace this with our own events

  //  Create a new game room and notify the creator of game. 
  socket.on('createGame', function(data){
    socket.join('room-' + ++rooms);
    socket.emit('newGame', {name: data.name, room: 'room-'+rooms});
  });

  //  Connect the Player 2 to the room he requested. Show error if room full.
  socket.on('joinGame', function(data){
    var room = io.nsps['/'].adapter.rooms[data.room];
    if( room && room.length == 1){
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('player1', {});
      socket.emit('player2', {name: data.name, room: data.room })
    }
    else {
      socket.emit('err', {message: 'Sorry, The room is full!'});
    }
  });

  //  Handle the turn played by either player and notify the other. 
  socket.on('playTurn', function(data){
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: data.room
    });
  });

  //  Notify the players about the victor.
  socket.on('gameEnded', function(data){
    socket.broadcast.to(data.room).emit('gameEnd', data);
  });
});

server.listen(5000);

/* ==================== end new ======================= */
module.exports = app;