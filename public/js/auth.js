$(document).ready(function(){

    var url = window.location.search;

    var userName = $(".usernameText");
    var userEmail = $(".emailText");
    var userPassword = $(".submittedPassword");
    var authForm = $(".authForm")

    $(authForm).on("authSubmit", function handleFormSubmit(event) {
        event.preventDefault();
        if(!userName.val().trim()) {
            alert("Please enter a username.")
            return;
        }
        else if(!userPassword.val().trim()) {
            alert("Please enter a password")
            return;
        }
        else if(!userEmail.val().trim()) {
            alert("Please enter an email")
            return;
        }
        
        var newUser = {
            username: userName.val().trim(),
            security: userPassword.val().trim(),
            email: userEmail.val().trim()
        }

        console.log(newUser);

        submitUser(newUser);
    })

    function submitUser(User) {
        $.post("/api/postuser", User, function() {
            window.location.href = "/";
        });
    }
});

