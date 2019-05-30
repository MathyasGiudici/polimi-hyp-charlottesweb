//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function(){
  console.log("Books Loading");

  $.ajax({
    url: baseUrl + "books/" + localStorage.isbn,
    dataType: "json",
    success:function(b){
      console.log(b);
      let beforePicture='<div class="col-lg-4 col-md-4 col-xs-12"><img class="img-responsive rounded book-image" id="BookImage" src="';
      let afterPicture='" alt=""></div>';

      let toAppend= beforePicture +  b.photo + afterPicture;

      //console.log("com:" + com);
      setAuthors(b.authors);
      //localStorage.removeItem(isbn);
      $("#booksection").append(toAppend);
      $("#BookTitle").text(b.title);
      $("#BookAuthor").text(setAuthors(b.authors));
      $("#isbntest").text(b.isbn);
      $("#pubbdate").text(b.pubbDate);
      $("#genr").text(b.genre);
      $("#theme").text(b.theme);
      $("#typ").text(b.type);
      $("#numpg").text(b.numOfPages);
      $("#bookdescript").text(b.description);
    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });

  $.ajax({
    url: baseUrl + "books/" + localStorage.isbn +"/similar",
    dataType: "json",
    success:function(data){
      data.forEach( b => {
        console.log(b);
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeDescription = '</h5><p class="description" id="Description">';
        let afterDescription = '</p></div></div></div></div>';

        let toAppend = beforePhoto + b.photo + beforeTitle + b.title + beforeDescription + setAuthors(b.authors);
        $("#similars").append(toAppend);
      });
    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });
  $.ajax({
    url: baseUrl + "reviews/findBy?attribute=isbn&key=" + localStorage.isbn,
    dataType: "json",
    success:function(reviews){
      console.log(localStorage.isbn);
      console.log(reviews);
      for(let i=0; i< reviews.length; i++){
        let  tab = '<li class="list-group-item" id="rev'+i+'">Review ';
        let  fin='</li>';
        let  toAppend= tab + (i+1)+ " : " + reviews[i].title + " by "+ reviews[i].userId + fin + reviews[i].description;
        $("#reviews").append(toAppend);
        }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });

});

let setAuthors = function(authors)
{
      let com = " ";
      if(authors.length == 1){
        com = authors[0].name + " " + authors[0].surname;
      }
      else{
        let i;
        for(i = 0; i < authors.length ; i++){
         com = com + authors[i].name + " " + authors[i].surname + ", ";
          if(i == (authors.length - 1)){
            com = com + authors[i].name + " " + authors[i].surname;
          }
        }
      }
      return com;
    //$("#BookAuthor").text(com);
}
