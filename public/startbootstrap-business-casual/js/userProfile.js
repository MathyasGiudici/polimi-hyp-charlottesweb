//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
    $.ajax({
        url: baseUrl + "users/me",
        dataType: "json",
        success:function(data){
            contentTable(data);
            console.log(data.response);
            $('#AuthorSurname').text(localStorage.userId);
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

    //Logout function
    $('#logoutBtn').click(function() {
      localStorage.isLogged=false;
      localStorage.userId="";

    });

});


let contentTable = function(data){

    $("#UserName").text(data.firstName);
    $("#UserLastName").text(data.lastName);
    $("#UserEmail").text(data.email);
    $("#UserGender").text(data.gender);
    $("#UserBirthDay").text(data.birthDay);

}
