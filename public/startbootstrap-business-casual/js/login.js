let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";

$(document).ready(function() {
    $('#loginForm').submit(function(e) {

      e.preventDefault();
        $.ajax({
            type: "POST",
            url: baseUrl + 'users/login',
            dataType: "json",
            data:{
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val()
            },
            beforeSend: function(){
              $("#error").fadeOut();
            },
            success: function(data){
              if (data.response === 'Successful login') {
                  localStorage.userId =  $("#inputEmail").val();
                  localStorage.isLogged = true;
                  $("#error").fadeIn(10, function(){
                    $("#error").empty();
                    $("#error").append('<div class="alert alert-success"><strong>Success! </strong>'+ data.response + ' </div>');
                  });
                  setTimeout(function () {
                    if(localStorage.redirectToCart && (localStorage.redirectToCart == "true")){
                      delete localStorage.redirectToCart;
                      window.location.href='./cart.html';
                    } else{
                      window.location.href='./index.html';
                    }
                  }, 1000);
              }
              else {
                  $("#error").fadeIn(10, function(){
                    $("#error").empty();
                    $("#error").append('<div class="alert alert-danger"><strong>Error! </strong>'+ data.response + ' </div>');
                  });
             }
           },
           error: function(jqXHR, textStatus, errorThrown){
                 console.log("Error:" + jqXHR + textStatus + errorThrown);
           }
          });
      });
});
