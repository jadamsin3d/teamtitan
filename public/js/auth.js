$(document).ready(function() {

    var url = window.location.search;

    var userName = $("#formGroupExampleInput");
    var userEmail = $("#exampleInputEmail1");
    var userPassword = $("#exampleInputPassword1");
    var authForm = $(".authForm")

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
            username: userName.val().trim(),
            password: userPassword.val().trim(),
            email: userEmail.val().trim()
        }

        console.log(newUser);

        submitUser(newUser);
    })

    function submitUser(User) {
        console.log("This is the submitUser function");
        $.post("/api/postuser", User, function() {
            // window.location.href = "/";
            console.log("posting...")
        }).then(function() {
        console.log("Submituser worked")
        })
    };
});

