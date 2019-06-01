//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  $.ajax({
    url: baseUrl + 'books/ourFavorite',
    dataType: "json",
    success:function(data){
      //Retriving our favorites
      data.forEach( b => {
        //Setting up strings of code
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3" id="threeBookInRow">'
        + '<img id="threeBookInRowImg" class="align-self-start" alt="image of book: ' + b.isbn  + '" src="';
        let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeAuthors = '</h5><h6>';
        let beforePrice = '</h6><i>Price: ';
        let afterPrice = '</i></div></div></div></div>';

        let toAppend = beforePhoto + b.photo + beforeTitle + b.title+ beforeAuthors + authorsToString(b.authors) +
                       beforePrice + b.price.value + " " + b.price.currency + afterPrice;
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

let authorsToString = function(authors){
     let string = "";
     if(authors.length == 1){
       string = authors[0].name + " " + authors[0].surname;
     }
     else{
       for(let i = 0; i < authors.length ; i++){
         if(i == (authors.length - 1)){
           string = string + authors[i].name + " " + authors[i].surname;
         }
         else{
           string = string + authors[i].name + " " + authors[i].surname + ", ";
         }
       }
     }
     return string;
}
