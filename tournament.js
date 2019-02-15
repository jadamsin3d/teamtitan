var $ = require("jquery");

(function init() {
  const P1 = 'X';
  const P2 = 'O';
  let player;
  let game;
  let name;

  const socket = io.connect('http://localhost:3000');

  class Player {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.currentTurn = true;
      this.playsArr = 0;
    }

    static get wins() {
      return [7, 56, 448, 73, 146, 292, 273, 84];
    }
    updatePlaysArr(tileValue) {
      this.playsArr += tileValue;
    }

    getPlaysArr() {
      return this.playsArr;
    }

    // Set the currentTurn for player to turn and update UI to reflect the same.
    setCurrentTurn(turn) {
      this.currentTurn = turn;
      const message = turn ? 'Your turn' : 'Waiting for Opponent';
      $('#turn').text(message);
    }

    getPlayerName() {
      return this.name;
    }

    getPlayerType() {
      return this.type;
    }

    getCurrentTurn() {
      return this.currentTurn;
    }
  }

//tornament
class Tornament{
     constructor(tornamentId,tornamentName){
       this.tornamentId=tornamentId;
       this.tornamentName=tornamentName;
     } 
     getTornamentId(){
       return this.getTornamentId;
     }
     getTornamentName(){
       return this.getTornamentName;
     }
     displayTornamentPage(name) {
      $('#playersList').append($('<li>').text(name));
      $('.menu').css('display', 'none');
      $('#eachTornamentPage').css('display', 'block');
      // $('#user').html(message);
    }

}
  // roomId Id of the room in which the game is running on the server.
  class Game {
    constructor(roomId) {
      this.roomId = roomId;
      this.board = [];
      this.moves = 0;
    }
    // Create the Game board by attaching event listeners to the buttons.
    createGameBoard() {
      function tileClickHandler() {
        const row = parseInt(this.id.split('_')[1][0], 10);
        const col = parseInt(this.id.split('_')[1][1], 10);
        if (!player.getCurrentTurn() || !game) {
          alert('Its not your turn!');
          return;
        }

        if ($(this).prop('disabled')) {
          alert('This tile has already been played on!');
          return;
        }

        // Update board after your turn.
        game.playTurn(this);
        game.updateBoard(player.getPlayerType(), row, col, this.id);

        player.setCurrentTurn(false);
        player.updatePlaysArr(1 << ((row * 3) + col));

        game.checkWinner();
      }

      for (let i = 0; i < 3; i++) {
        this.board.push(['', '', '']);
        for (let j = 0; j < 3; j++) {
          $(`#button_${i}${j}`).on('click', tileClickHandler);
        }
      }
    }
       

    displayBoard(message) {
      $('.menu').css('display', 'none');
      $('.gameBoard').css('display', 'block');
      $('#user').html(message);
      this.createGameBoard();
    }

    updateBoard(type, row, col, tile) {
      $(`#${tile}`).text(type).prop('disabled', true);
      this.board[row][col] = type;
      this.moves++;
    }
    //insert the created game in the list
    UpdateList(gameId){
    $("#test").text(gameId);

    }
// here try to update the combo box with the game id
  
    getRoomId() {
      return this.roomId;
    }
    // Send an update to the opponent to update their UI's tile
    playTurn(tile) {
      const clickedTile = $(tile).attr('id');
      // Emit an event to update other player that you've played your turn.
      socket.emit('playTurn', {
        tile: clickedTile,
        room: this.getRoomId(),
      });
    }
      
    checkWinner() {
      const currentPlayerPositions = player.getPlaysArr();

      Player.wins.forEach((winningPosition) => {
        if ((winningPosition & currentPlayerPositions) === winningPosition) {
          game.announceWinner();
        }
      });

      const tieMessage = 'Game Tied :(';
      if (this.checkTie()) {
        socket.emit('gameEnded', {
          room: this.getRoomId(),
          message: tieMessage,
        });
        alert(tieMessage);
        location.reload();
      }
    }

    checkTie() {
      return this.moves >= 9;
    }
    announceWinner() {
      const message = `${player.getPlayerName()} wins!`;
      socket.emit('gameEnded', {
        room: this.getRoomId(),
        message,
      });
      alert(message);
      location.reload();
    }

    // End the game if the other player won.
    endGame(message) {
      alert(message);
      location.reload();
    }
  }
  //....................................................
//login clicked , modify it
$('#logIn').on('click', function()  {
  name = $('#userName').val();
  if (!name) {
    alert('Please enter your name.');
    return;
  }
  socket.emit('logInuser', { name });//see the event listiner on index
  player = new Player(name, P1);
});
//................................................................................................
// user loged In  logedIn
socket.on('logedIn', function(data)  {//event listner for event logedIn from index
  const message =
    `Hello, ${data.name}. welcome`;
  // game = new Game(data.room);
  displayPage(message);
});
//.................................................................
  // Create a new game. Emit newGame event.
  $('#new').on('click', function()  {
    socket.emit('createTournament', { name });//see the event listiner on index
    player = new Player(name, P1);
  });
//...............................................................................
  $('#makeBracket').on('click',function () {
    var players=[];
    var tornament=  $("#tornamentName").text();
    socket.emit('createBracket',{room:tornament} );//see the event listiner on index
    player = new Player(name, P1);
  });
//.................................................................................
  $('#startTournament').on('click', function()  {
    var tornament=  $("#tornamentName").text();
    socket.emit('startGame',{room:tornament} );//see the event listiner on index
    
  });
  //...............................................................................
  socket.on("sendGame", function(players){
    //  var g1= players.splice(0,2)
    var playersArry=[]

    for(player in players){
        playersArry.push(player);
    }

    for(var i=0; i<playersArry.length; i++)
        game = new Game(playersArry[i]);
        game.displayBoard();    
    })
//........................................................................
socket.on("showBracket", function(players){
//  var g1= players.splice(0,2)
var playersArry=[]
for(player in players){
  playersArry.push(player);
}
 $("#bracketOne").text( playersArry[0] +"\t\t\t\t"+"vs"+"\t\t\t\t"+ playersArry[2]);
 $("#bracketTwo").text( playersArry[1] +"\t\t\t\t\t\t"+"vs"+"\t\t\t\t"+ playersArry[3]);
 $('#makeBracket').attr("disabled","true")

})
//.........................................................................................
  // Join an existing game on the entered roomId. Emit the joinGame event.
  $('#join').on('click', function()  {
    // const name = $('#nameJoin').val();
    const roomID = $('#listOfTornaments').val();
    // if (!name || !roomID) {
      if ( !roomID) {
      alert('Please enter your name and game ID.');
      return;
    }
    socket.emit('joinTournament', { name, room: roomID });
    player = new Player(name, P2);
  });
  //..............................................................................................
  // New Game created by current client. Update the UI and create new Game var.
  socket.on('newTournament', function(data) {
    const message =
      `Hello, ${data.name}. you created a tournament with  ID: 
      ${data.room}. Waiting for player 2...`;
    game = new Game(data.room); 
    tornament = new Tornament(data.room);
    socket.emit('createGameList', data.room);  
    tornament.displayTornamentPage(data.name)
  });

  socket.on('updateusers', function(clients,room,data) {
    $('#playersDiv').empty();
    $("#tornamentName").text(room);
    for (var clientId in clients ) {
      var div=$("<div>")
           div.attr("id",clientId).attr("class","text-white").text(clientId);
          // $('#playersDiv').attr("class",clientId)

				// $('#playersDiv').append('<div>' + clientId + '</div>');
           $('#playersDiv').append(div);
		}
       
    });
  
  // });
   socket.on("addUser",function(name){
    // $('#userDiv').append('<div>' + name + '</div>');

   })
//update List .....................................
  socket.on('updateGameList', function(gameName) {
    // $('#test').append($('<li>').text(gameName));
            $('#listOfTornaments')
                      .append($("<option></option>")
                      .attr("value",gameName)
                      .text(gameName));   
  });

  socket.on('player1',function (data)  {
    const message = `Hello, ${player.getPlayerName()}`;
    $('#userHello').html(message);
    player.setCurrentTurn(true);
  });

  socket.on('player2', function(data)  {
    const message = `Hello, ${data.name}`;

    // Create game for player 2
    game = new Game(data.room);
    game.displayBoard(message);
    player.setCurrentTurn(false);
  });

  socket.on('player', function(data) {
    // const message = `Hello, ${data.name}`;
     tornament = new Tornament(data.room); 
    tornament.displayTornamentPage(data.name) 
  });

  socket.on('turnPlayed', function(data) {
    const row = data.tile.split('_')[1][0];
    const col = data.tile.split('_')[1][1];
    const opponentType = player.getPlayerType() === P1 ? P2 : P1;

    game.updateBoard(opponentType, row, col, data.tile);
    player.setCurrentTurn(true);
  });

  // If the other player wins, this event is received. Notify user game has ended.
  socket.on('gameEnd',function (data) {
    game.endGame(data.message);
    socket.leave(data.room);
  });
  socket.on('err',function(data)  {
    game.endGame(data.message);
  });


// function to display player page after login
  function  displayPage(message) {
    $('.logIn').css('display', 'none');
    $('.menu').css('display', 'block');
    $('#userHello').html(message);
  
  }
}());
