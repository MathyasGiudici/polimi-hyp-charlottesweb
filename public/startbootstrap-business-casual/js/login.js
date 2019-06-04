//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

// error:function(jqXHR, textStatus, errorThrown){
//      console.log("Error:" + jqXHR + textStatus + errorThrown);
// }


$(document).ready(function() {

    console.log("script uploaded");
    $('#loginForm').submit(function(e) {

      e.preventDefault();
      console.log($("#inputEmail").val());
      console.log($("#inputPassword").val());
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

                console.log("operation succeded");
                console.log(JSON.stringify(data));
                console.log(id);

                if (data.response === 'Successful login') {
                    localStorage.user = {};
                    localStorage.user.userId =  id;
                    localStorage.user.isLogged = true;
                    console.log(localStorage.user.userId);
                    $("#error").fadeIn(10, function(){
                      $("#error").append('<div class="alert alert-success"><strong>Success! </strong>'+ data.response + ' </div>');
                    });
                    setTimeout(function () {
                      window.location.href='./index.html';
                    }, 2000);

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
