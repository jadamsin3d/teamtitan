$(document).ready(function () {
    var loginForm = $("#loginForm");
    var emailInput = $("#loginName");
    var passwordInput = $("#loginPassword");

    // When the form is submitted, we validate there's an email and password entered
    $(".btnSubmit").on("click", function (event) {
        event.preventDefault();
        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            alert("Email or Password is incorrect");
            return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            console.log("is this happening?")
            window.location.href = "/dashboard"
        }).catch(function (err) {
            console.log(err);
        });
    }

    $('.btnRegister').click(function() {
        event.preventDefault();
        console.log('register clicked');
        window.location.href = "/auth";
    });

});
