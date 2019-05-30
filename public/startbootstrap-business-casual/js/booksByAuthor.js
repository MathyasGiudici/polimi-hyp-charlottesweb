//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Books Loading");

  $.ajax({
    url: baseUrl + "books",
    dataType: "json",
    success:function(data){
      //sort alphabetically
        data = data.sort(sortByAuthor);

        let currentAuthor=' ';
        let toAppend = '';
        let ind = 0;


        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        //let beforeDescription = '<p class="description" id="Description">';
        let afterDescription = '</h5></div></div></div></div>';
        let row = '<div class="row ml-3">';
        let closeRow = '</div><div class="small-padding"></div>';
        let afterAuthor= '</span></h1></section>';


        $.each(data, function(index, b){
        let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let authorTitle='<section class=" cta small-perimeter"><h1 class="site-heading text-center text-white d-lg-block small-perimeter">  <span class="site-heading-upper text mb-3">';
        if(b.authors[0] != currentAuthor)
        {
          if(!(currentAuthor=='')){
            toAppend = toAppend + closeRow;
            $("#booksauthor").append(toAppend);
          }
          currentAuthor=b.authors[0]; //TO DO:da decidere come indicizzare per più autori
          ind = 0;

          //TO DO: da rivedereper il secondo autore
          toAppend =authorTitle+ b.authors[0].name + ' ' + b.authors[0].surname + afterAuthor + row + beforePhoto + b.photo + beforeTitle + b.title + afterDescription ;

        } else {
          ind = ind +1;
          toAppend = beforePhoto + b.photo + beforeTitle + b.title+ afterDescription;
          if( ind%2 == 0)
          {
              toAppend = toAppend + openRow;
          }
        }

      });

      },
      error:function(jqXHR, textStatus, errorThrown){
           console.log("Error:" + jqXHR + textStatus + errorThrown);
      }
    });
  });

//TO DO:da rivedere come ordinare per il secondo autore
  let sortByAuthor= function(a, b){
    return a.authors[0].surname.toLowerCase() > b.authors[0].surname.toLowerCase() ? 1 : -1;
  }

  let handleBookClick = function(isbn){
    localStorage.isbn = isbn;
    window.location.href = './bookSample.html';
  }
