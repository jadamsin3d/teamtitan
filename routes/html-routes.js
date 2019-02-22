
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
    
    app.get('/join', function(req, res){
        res.sendFile(__dirname + '../views/join.html')
    })
    
    
    app.get('/', function(req, res){
        res.sendFile(__dirname + '../views/index.html')
    })
    
};
