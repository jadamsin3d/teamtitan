require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
// lidet
const path = require('path');
const server = require('http').createServer();
const io = require('socket.io')(server);
// end lidet

var db = require("./models");
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({extended: false}));
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
module.exports = app;

var syncOptions = {
    force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

let rooms = 0;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'game.html'));
});

io.on('connection', function (socket) {
    //..................................................................
    // login
    socket.on('logInuser', function (data) {
        /* here */
        socket.emit('logedIn', {
            name: data.name
        });
        console.log(`Data.Name from Log In: ${data.name}`);

    });
    //....................................................................    
    // Create a new game room and notify the creator of game.
    socket.on('createTournament', function (data) {

        socket.join(`Tournament-${++rooms}`);
        var roomm = `Tournament-${rooms}`
        clients = io.sockets.adapter.rooms[roomm].sockets

        io.in(roomm).emit('updateusers', clients, roomm)
        io.in(roomm).emit('addUser', data.name);
        socket.emit('newTournament', {
            name: data.name,
            room: `Tournament-${rooms}`
        });
        // io.in(data.room).emit('newTournament', { name: data.name, room: `Tournament-${rooms}` });
        // usernames = {};
    });
    //.............................................................................................

    //add to the list of game
    socket.on('createGameList', (game) => {
        socket.emit('updateGameList', game);
        io.emit('updateGameList', game);
    });
    //...........................................................................................
    socket.on("createBracket", function (data) {
        console.log(data)
        clients = io.sockets.adapter.rooms[data.room].sockets

        io.in(data.room).emit('showBracket', data.name)
        console.log("players to break")
        console.log(clients)
    })
    //........................................................................................................
    //// Connect the other player to the tornament he requested. Show error if the tornament is full.
    socket.on('joinTournament', function (data) {
        var room = io.nsps['/'].adapter.rooms[data.room];
        console.log(room);

        if (room && room.length < 4) {
            socket.join(data.room);
            socket.id = data.name;
            clients = io.sockets.adapter.rooms[data.room].sockets
            for (var clientId in clients) {
                /* here */
                console.log(`Data.Name: ${data.name}`);
                console.log(`Client ID: ${clientId}`);
                //this is the socket of each client in the room.
                var clientSocket = io.sockets.connected[clientId];

            }
            console.log("............................")
            io.in(data.room).emit('updateusers', clients, data.room)
            io.in(data.room).emit('addUser', data.name);

            io.in(data.room).emit('player', {
                name: data.name,
                room: data.room
            })
        } else {
            socket.emit('err', {
                message: 'Sorry, The room is full!'
            });
        }
        //  usernames = {};
    });
    //.................................................................................................. 
    //send the game for the players
    socket.on('startGame', function (data) {
        clients = io.sockets.adapter.rooms[data.room].sockets
        io.in(data.room).emit('sendGame', clients)
    });
    //...............................................................................................
    // Connect the Player 2 to the room he requested. Show error if room full.
    // socket.on('xjoinGame', function (data) {
    //     var room = io.nsps['/'].adapter.rooms[data.room];
    //     if (room && room.length === 1) {
    //         socket.join(data.room);
    //         socket.broadcast.to(data.room).emit('player1', {});
    //         socket.emit('player2', { name: data.name, room: data.room })
    //     } else {
    //         socket.emit('err', { message: 'Sorry, The room is full!' });
    //     }
    // });

    socket.on('playTurn', function (data) {
        socket.broadcast.to(data.room).emit('turnPlayed', {
            tile: data.tile,
            room: data.room
        });
    });

    socket.on('gameEnded', function (data) {
        socket.broadcast.to(data.room).emit('gameEnd', data);
    });
});

// Starting the server, syncing our models ------------------------------------/
server.listen(process.env.PORT, function () {
    db.sequelize.sync(syncOptions).then(function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT, 
            PORT
        );
    });
});