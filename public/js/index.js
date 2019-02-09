// $(document).ready(function() {
//   let username = $("#loginName");
//   let password = $("#loginPassword");
// })

$('#register').click(function() {
    event.preventDefault();
    console.log('register clicked');
    window.location.href = "/auth";
});