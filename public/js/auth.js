$(document).ready(function() {

    var username = $("#formGroupExampleInput");
    var email = $("#exampleInputEmail1");
    var password = $("#exampleInputPassword1");

    $(".authSubmit").on("click", function handleFormSubmit(event) {
        event.preventDefault();
        if(!userName.val()) {
            alert("Please enter a username.")
            return;
        }
        if(!userPassword.val()) {
            alert("Please enter a password")
            return;
        }
        if(!userEmail.val()) {
            alert("Please enter an email")
            return;
        }
        
        var newUser = {
            username: username.val().trim(),
            password: password.val().trim(),
            email: email.val().trim()
        }

        console.log(newUser);

        submitUser(newUser);
    })

    function submitUser(User) {
        console.log("This is the submitUser function");
        $.post("/api/postuser", User, function() {
            console.log("posting...")
        }).then(function() {
        console.log("Submituser worked")
        window.location.href = "/";
        })
    };
});

