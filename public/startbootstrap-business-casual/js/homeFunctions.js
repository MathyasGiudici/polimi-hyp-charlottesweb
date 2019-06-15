$(document).ready(function(){
  //Creating loading animation
  $("#myCarousel").before('<div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel_car"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-spinner fa-spin"></i><h1></div>');
  $("#ourFavorite").after('<div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel_ourFav"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-spinner fa-spin"></i><h1></div>');
  $("#ourBestsellers").after('<div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel_bestSell"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-spinner fa-spin"></i><h1></div>');

  $.ajax({
    url: baseUrl + "events",
    dataType: "json",
    success:function(data){
      //Removing loading animation
      $("#toBeDel_car").remove();
      //Setting up the carousel
      for(let i =0; i< data.length; i++){
        let firstPart;

        if(i == 0){
          firstPart = '<div class="carousel-item active" style="background-image: url(\'';
          $(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="0" class="active"></li>');
        }
        else{
          firstPart = '<div class="carousel-item" style="background-image: url(\'';
          $(".carousel-indicators").append('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>');
        }

        let secondPart = "'" + ')" onclick="handleEventClick(\''+ data[i].id +'\')"></div>';
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
      //Removing loading animation
      $("#toBeDel_ourFav").remove();
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

  $.ajax({
    url: baseUrl + 'books/bestSelling',
    dataType: "json",
    success:function(data){
      //Removing loading animation
      $("#toBeDel_bestSell").remove();

      //Retriving our best sellers
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

        toAppend = toAppend + beforePhoto + b.photo + beforeTitle + b.title+ beforeAuthors + authorsToString(b.authors) +
                       beforePrice + b.price.value + " " + b.price.currency + afterPrice;
        if(step == 1){
          toAppend = '<div class="row ml-3" style="padding-bottom: 20px;">' + toAppend;
          step = 2;
          if((data.length-1) == count){
            toAppend = toAppend + "</div>";
            $("#ourBestsellers").append(toAppend);
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
              $("#ourBestsellers").append(toAppend);
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

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleEventClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
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
