//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function(){
  console.log("Author Loading");

  $.ajax({
    url: baseUrl + "authors/" + localStorage.authorId,
    dataType: "json",
    success:function(b){
      console.log(b);
      let beforePicture='<div class="col-lg-4 col-md-4 col-xs-12"><img class="img-responsive rounded book-image" id="BookImage" src="';
      let afterPicture='" alt=""></div>';

      let toAppend= beforePicture +  b.photo + afterPicture;
      $("#AuthorName").text(b.name);
      $("#AuthorSurname").text(b.surname);

    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });



});
