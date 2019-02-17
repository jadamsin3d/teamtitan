
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
    
    app.get('/join', function(req, res){
        res.sendFile(__dirname + '../views/join.html')
    })
    
    app.get('/game', function(req, res){
        gameQuery = req.query
        getGameType(gameQuery)
        res.sendFile(__dirname + '../views/game.html')
    })
    
    app.get('/', function(req, res){
        res.sendFile(__dirname + '../views/index.html')
    })
    app.get('/Tournament', function(req, res){
        gameQuery = req.query
        getGameType(gameQuery)
        res.sendFile(__dirname + '../views/Tournament.html')
    })
};
