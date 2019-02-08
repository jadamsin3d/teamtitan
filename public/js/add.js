// Code here handles what happens when a user submits a new character on the form.
// Effectively it takes the form inputs then sends it to the server to save in the DB.

// when user clicks add-btn
$("#submit").on("click", function(event) {
  event.preventDefault();

  // make a newTournmanet obj
  var newTournament = {
    // tournament name from name input
    tournament_name: $("#tournament_name_input").val().trim(),
  };

  // send an AJAX POST-request with jQuery
  $.post("/api/new_tournament", newTournament)
    // on success, run this callback
    .then(function(data) {
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding new tournament...");
    });

  // empty each input box by replacing the value with an empty string
  $("#tournament_name_input").val("");
});