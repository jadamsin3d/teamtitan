$('#register').click(function() {
    event.preventDefault();
    console.log('register clicked');
    window.location.href = "/auth";
});

$('#host').click(function() {
    event.preventDefault();
    console.log('host a tournament clicked');
    window.location.href = "/game";
});