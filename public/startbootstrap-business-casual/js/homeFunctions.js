//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Home Loading");

  $.ajax({
    url: baseUrl + "events",
    dataType: "json",
    success:function(data){
      for(let i =0; i< data.length; i++){
        let firstPart;

        if(i == 0)
          firstPart = '<div class="carousel-item active" style="background-image: url('+ "'";
        else
          firstPart = '<div class="carousel-item" style="background-image: url('+ "'";

        let secondPart = "'" + ')"></div>';
        let toAppend = firstPart + data[i].photo + secondPart;
        $(".carousel-inner").append(toAppend);
      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });


  $.ajax({
    url: baseUrl + 'books/ourFavorite',
    dataType: "json",
    success:function(data){
      data.forEach( b => {
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeDescription = '</h5><p class="description" id="Description">';
        let afterDescription = '</p></div></div></div></div>';

        let toAppend = beforePhoto + b.photo + beforeTitle + b.title+ beforeDescription + b.description + afterDescription;
        $("#ourFavorite").append(toAppend);
      });
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

});

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}
