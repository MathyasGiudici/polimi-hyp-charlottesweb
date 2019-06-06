let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";

$(document).ready(function() {
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
            success: function(data){
              if (data.email === toSend.email) {
                $("#error").fadeIn(10, function(){
                  $("#error").empty();
                  $("#error").append('<div class="alert alert-success"><strong>Success! you will be redirected to the login... </strong></div>');
                });
                setTimeout(function () {
                  window.location.href='./login.html';
                }, 2000);
                }
                else {
                  $("#error").fadeIn(10, function(){
                    $("#error").empty();
                    $("#error").append('<div class="alert alert-danger"><strong>Error! Probably you have already registered </strong></div>');
                  });
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                  console.log("Error:" + jqXHR + textStatus + errorThrown);
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
