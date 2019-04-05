$(document).ready(function () {
    $('#alert1').hide();
    $('#alert2').hide();

    $('#btnLogin').click(function () {
        var usernameAdmin = $("#inputUsername").val();
        var passwordAdmin = $("#inputPassword").val();

        if (usernameAdmin == '' || passwordAdmin == '') {
            $('#alert1').html('Completa todos los campos. Intenta de nuevo.');
            $('#alert1').show();

        } else {
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": "/api/signin",
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
                Cookies.set('userId', data.userId);
                Cookies.set('userName', data.userName);
                window.location.replace('/admin/profile');
            }).fail(function (data) {
                $('#alert1').html(data.responseJSON.message);
                $('#alert1').show();
            });

        }
    });
});