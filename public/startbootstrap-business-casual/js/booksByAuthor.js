//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Books Loading");

  $.ajax({
    url: baseUrl + "books",
    dataType: "json",
    success:function(data){
      //sort alphabetically
      data = $(data).sort(sortByAuthor);

        let currentAuthor=' ';
        let toAppend;
        let ind=0;
        $.each(data, function(index, b){

          let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
          let beforeTitle = '" onClick="handleBook('+ b.isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
          let beforeDescription = '</h5><p class="description" id="Description">';
          let afterDescription = '</p></div></div></div></div>';

        if(b.author[0] != currentAuthor)
        {
          let authorTitle='<section class=" cta small-perimeter"><h1 class="site-heading text-center text-white d-lg-block small-perimeter">  <span class="site-heading-upper text mb-3">';
          let afterAuthor= '</span></h1></section>';
          let row = '<div class="row ml-3">';
          if(ind%3==0){
            toAppend =authorTitle+ b.author[0] + afterAuthor + row + beforePhoto + b.photo + beforeTitle + b.title+ beforeDescription + b.description + afterDescription ;
            flag = 1;
          } else toAppend = authorTitle+ b.author[0] + afterAuthor + row + beforePhoto + b.photo + beforeTitle + b.title+ beforeDescription + b.description + afterDescription ;
          currentAuthor = b.author[0];

        } else  toAppend = beforePhoto + b.photo + beforeTitle + b.title+ beforeDescription + b.description + afterDescription;

        $("#booksauthor").append(toAppend);
      });

      },
      error:function(jqXHR, textStatus, errorThrown){
           console.log("Error:" + jqXHR + textStatus + errorThrown);
      }
    });
  });

  let sortByAuthor= function(a, b){
    return a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1;
  }

  let handleBookClick = function(isbn){
    localStorage.isbn = isbn;
    window.location.href = './bookSample.html';
  }
