//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Loading Favourites");

  $.ajax({
    url: baseUrl + 'books/ourFavorite',
    dataType: "json",
    success:function(data){
      for(let i=0; i< data.length; i++){
        let toAppend;
        let newRow;
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeTitle = '" onClick="handleBookClick('+ data[i].isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeDescription = '</h5><p class="description" id="Description">';
        let afterDescription = '</p></div></div></div></div>';

        if(i%3==0 && i!=0){
         newRow='<div class="big-padding"></div>';
         toAppend=newRow+beforePhoto + data[i].photo + beforeTitle + data[i].title+ beforeDescription + data[i].description + afterDescription;
        }
        else toAppend = beforePhoto + data[i].photo + beforeTitle + data[i].title+ beforeDescription + data[i].description + afterDescription;

        $("#ourFavorite").append(toAppend);
      }
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
