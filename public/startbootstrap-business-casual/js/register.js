//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function() {

    console.log("script uploaded");

    $('#registerForm').submit(function(e) {

        e.preventDefault();
        var gender = $("input[name='gender']:checked").val();
        let toSend = {
               firstName: $("#inputFirstName").val(),
               lastName: $("#inputLastName").val(),
               birthDay: $("#birth").val(),
               gender: gender,
               email: $("#inputEmail").val(),
               password: $("#inputPassword").val()
          };

        console.log(toSend);
        $.ajax({
            type: "POST",
            url: baseUrl + 'users/register',
            contentType: "application/json; charset=utf-8",
            processData: false,
            dataType: "json",
            data: JSON.stringify(toSend),
            beforeSend: function(){
              $("#error").fadeOut();
            },
            success: function(data)
            {
              console.log("operation succeded");
              console.log(data.response);

              if (data.response === 'Successful') {
                $("#error").fadeIn(10, function(){
                  $("#error").append('<div class="alert alert-success"><strong>Success! </strong>'+ data.response + ' </div>');
                });
                setTimeout(function () {
                  window.location.href='./login.html';
                }, 20);
                }
                else {

                  $("#error").fadeIn(10, function(){
                    $("#error").append('<div class="alert alert-danger"><strong>Error! </strong>'+ data.response + ' </div>');
                  });

                }


            }
        });

    });

    //password validation
    $('#inputPassword, #inputConfirmPassword').on('keyup', function () {
      if ($('#inputPassword').val() == $('#inputConfirmPassword').val()) {
        $("#message").html('<div class="alert alert-success"><strong>Passwords matching! </strong> </div>');
      } else
      $("#message").html('<div class="alert alert-danger"><strong>Passwords NOT matching! </strong> </div>');

    });

});
