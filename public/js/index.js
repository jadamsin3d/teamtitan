// Get references to page elements
var $tournament_name_input = $("#tournament_name_input");
var $submitBtn = $("#submit");
// or list of tournaments...below
// var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTournament: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/new_tournament",
      data: JSON.stringify(example)
    });
  },
  getTournament: function() {
    return $.ajax({
      url: "api/tournaments",
      type: "GET"
    });
  },
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var tournament = {
    tournament_name: $tournament_name_input.val().trim(),
  };

  if (!tournament) {
    alert("You must enter a tournament name!");
    return;
  }

  API.saveTournament(tournament).then(function() {
    console.log('new tournament sent to server');
    // refreshExamples();
  });

  $tournament_name_input.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
