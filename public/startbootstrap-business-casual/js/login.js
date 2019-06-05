//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

// error:function(jqXHR, textStatus, errorThrown){
//      console.log("Error:" + jqXHR + textStatus + errorThrown);
// }


$(document).ready(function() {

    $('#loginForm').submit(function(e) {

      e.preventDefault();

        $.ajax({
            type: "POST",
            url: baseUrl + 'users/login',
            dataType: "json",
            data:
            {
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val()
            },
            beforeSend: function(){
              $("#error").fadeOut();
            },
            success: function(data)
            {
                var id= ($("#inputEmail").val()).split('@')[0];


                if (data.response === 'Successful login') {
                    console.log("success")
                    //localStorage.user = {};
                    localStorage.userId =  id;
                    localStorage.isLogged = true;
                    $("#error").fadeIn(10, function(){
                      $("#error").append('<div class="alert alert-success"><strong>Success! </strong>'+ data.response + ' </div>');
                    });
                    setTimeout(function () {
                      window.location.href='./index.html';
                    }, 1000);


                }
                else {
                    //alert(data.response);
                    $("#error").fadeIn(10, function(){
                      $("#error").append('<div class="alert alert-danger"><strong>Error! </strong>'+ data.response + ' </div>');
                    });
               }

             }

            });

      });

});
