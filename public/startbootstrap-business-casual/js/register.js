//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function() {

    $('#registerBtn').click(function() {

        $.ajax({
            type: "POST",
            url: baseUrl + 'users/register',
            dataType: "json",
            data: {
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                birthDay: $("#birth").val(),
                gender: $("#gender").val(),

                email: $("#inputEmail").val(),
                password: $("#inputPassword").val()
            },
            success: function(data)
            {
                if (data === 200) {
                    window.location.replace('/index.html');
                    //show a message??
                }
                else {
                    alert(data);
                }
            },
            error:function(jqXHR, textStatus, errorThrown){
                 console.log("Error:" + jqXHR + textStatus + errorThrown);
            }
        });

    });

});
