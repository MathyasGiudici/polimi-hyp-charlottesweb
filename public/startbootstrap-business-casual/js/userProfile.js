$(document).ready(function(){
    $.ajax({
        url: baseUrl + "users/me",
        dataType: "json",
        success:function(data){
            contentTable(data);
            $('#Username').append(localStorage.userId);
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log("Error:" + jqXHR + textStatus + errorThrown);
        }

    });

    //Retriving user's reviews
    $.ajax({
        url: baseUrl + "reviews/findBy?attribute=userId&key=" + localStorage.userId,
        dataType: "json",
        success:function(reviews){
          if(reviews.length == 0){
            $("#reviews").append("You don't have posted any reviews");
            return;
          }

          for(let i=0; i< reviews.length; i++){
                let  tab = '<li class="list-group-item" id="rev'+i+'"> "<i>';
                let  fin='</li>';
                let  toAppend= tab + reviews[i].title + '"</i> ' + fin + reviews[i].description;
                $("#reviews").append(toAppend);
          }
        },
        error:function(jqXHR, textStatus, errorThrown){
            console.log("Error:" + jqXHR + textStatus + errorThrown);
        }

    });
});

let handleLogout = function(){
  //Handling logout
  $.ajax({
    type: "POST",
    url: baseUrl + 'users/logout',
    dataType: "json",
    success: function(data){
        if (data.response === 'Successful logout') {
            localStorage.isLogged = false;
            localStorage.userId = "";

            setTimeout(function () {
              window.location.href='./index.html';
            }, 1000);
          } else {
            $("#error").before('<br/>');
            $("#error").fadeIn(10, function(){
              $("#error").empty();
              $("#error").append('<div class="alert alert-danger"><strong>Error! </strong>'+ data.response + ' </div>');
            });
       }

     }
  });
}

let contentTable = function(data){
    $("#UserFirstName").text(data.firstName);
    $("#UserLastName").text(data.lastName);
    $("#UserEmail").text(data.email);
    $("#UserGender").text(data.gender.toUpperCase());
    $("#UserBirthDay").text(data.birthDay.replace().slice(0,10));
}
