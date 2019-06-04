//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  //Retriving book's info
  $.ajax({
    url: baseUrl + "books/" + localStorage.isbn,
    dataType: "json",
    success:function(b){

      //Setting up attributes (header)
      $("#BookImage").attr("src",b.photo);
      $("#BookImage").attr("alt","photo of the book:" + b.isbn);
      $("#BookTitle").text(b.title);
      $("#BookAuthor").append(authorsToString(b.authors, true));
      $("#BookReserve").on({
        'click': function(){
          reserveFunction(b.isbn);
        }
      });

      //Setting up attributes (description)
      $("#AttIsbn").text(b.isbn);
      $("#AttPubbdate").text(b.pubbDate.replace().slice(0,10));
      $("#AttGenre").text(b.genre.toUpperCase());
      $("#AttTheme").text(b.theme.toUpperCase());
      $("#AttType").text(b.type.toUpperCase());
      $("#AttNumOfP").text(b.numOfPages);
      $("#AttDescr").text(b.description);
    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

  //Retriving book's reviews
  $.ajax({
    url: baseUrl + "reviews/findBy?attribute=isbn&key=" + localStorage.isbn,
    dataType: "json",
    success:function(reviews){
      for(let i=0; i< reviews.length; i++){
        let  tab = '<li class="list-group-item" id="rev'+i+'"> "<i>';
        let  fin='</li>';
        let  toAppend= tab + reviews[i].title + '"</i> by '+ reviews[i].userId + fin + reviews[i].description;
        $("#reviews").append(toAppend);
        }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

  //Retriving book's events
  $.ajax({
    url: baseUrl + "events/findBy?attribute=book&key=" + localStorage.isbn,
    dataType: "json",
    success:function(events){
      if(events.length != 0){
        let toAppend = '<ul>';

        events.forEach( e => {
            toAppend = toAppend + '<li><a href="#" class="standard-link" onclick="handleEventClick(\'' +
            e.id + '\')">' + e.title + '</a></li>';
        });

        toAppend = toAppend + '</ul>';
        $("#v-pills-events").append(toAppend);
      } else{
        $("#v-pills-events").append("Sorry there are no events for this book");
      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

  //Retriving similars
  // $("#similars").append(toAppend);
  $.ajax({
    url: baseUrl + "books/" + localStorage.isbn +"/similar",
    dataType: "json",
    success:function(data){
      //Retriving similars
      let step = 1;
      let count=0;
      let toAppend = "";
      data.forEach( b => {
        //Setting up strings of code
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3" id="threeBookInRow">'
        + '<img id="threeBookInRowImg" class="align-self-start" alt="image of book: ' + b.isbn  + '" src="';
        let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeAuthors = '</h5><h6>';
        let beforePrice = '</h6><i>Price: ';
        let afterPrice = '</i></div></div></div></div>';

        toAppend = toAppend + beforePhoto + b.photo + beforeTitle + b.title+ beforeAuthors + authorsToString(b.authors, false) +
                       beforePrice + b.price.value + " " + b.price.currency + afterPrice;
        if(step == 1){
          toAppend = '<div class="row ml-3" style="padding-bottom: 20px;">' + toAppend;
          step = 2;
          if((data.length-1) == count){
            toAppend = toAppend + "</div>";
            $("#similars").append(toAppend);
            toAppend = "";
            step = 1;
          }
        }
        else{
          if((data.length-1) == count){
            step = 3;
          }

          if(step == 2){
              step = 3;
          }
          else{
              toAppend = toAppend + "</div>";
              $("#similars").append(toAppend);
              toAppend = "";
              step = 1;
          }
        }
        count++;
      });
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

});

let authorsToString = function(authors, isHeader){
     let string = "";
     if(authors.length == 1){
       if(isHeader){
         string = authorTitleToAppend(authors[0]);
       }else{
         string = authors[0].name + " " + authors[0].surname;
       }
     }
     else{
       for(let i = 0; i < authors.length ; i++){
         if(i == (authors.length - 1)){
           if(isHeader){
             string = string + authorTitleToAppend(authors[i]);
           }else{
             string = string + authors[i].name + " " + authors[i].surname;
           }
         }
         else{
           if(isHeader){
             string = string + authorTitleToAppend(authors[i]) + ", ";
           }else{
             string = string + authors[i].name + " " + authors[i].surname + ", ";
           }
         }
       }
     }
     return string;
}

let authorTitleToAppend = function(author){
  return '<a href="#" onclick="handleAuthorClick(' + "'" + author.id + "')" + '">' + author.name + " " + author.surname + "</a>";
}

let reserveFunction = function(isbn){
  // Animation
  $("#cartIcon").attr("class","fa fa-spinner " + "fa-pulse");
  setTimeout(function(){
    $("#cartIcon").attr("class","fas fa-shopping-cart");
  }, 1000);

  // TODO: adding to the cart
}

let handleEventClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}
