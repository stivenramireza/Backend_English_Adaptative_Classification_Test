$(document).ready(function () {
    $('#btnLogin').click(function () {
        var usernameAdmin = $("#inputUsername").val();
        var passwordAdmin = $("#inputPassword").val();

        if (usernameAdmin == '' || passwordAdmin == '') {
            console.log("Completa todos los campos");
        } else {
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": "/api/signin/admin",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache"
                },
                "data": JSON.stringify({
                    "username": usernameAdmin,
                    "password": passwordAdmin
                })
            }

            $.ajax(settings).done(function (data) {
                Cookies.set('token', "Bearer " + data.token);
                Cookies.set('username', usernameAdmin);
                Cookies.set('password', passwordAdmin);
                window.location.replace('/admin/profile');
            }).fail(function (data) {
               console.log(data.responseJSON.message);
            });

        }
    });
});