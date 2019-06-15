$(document).ready(function(){
  $.ajax({
    url: baseUrl + "authors/" + localStorage.authorId,
    dataType: "json",
    success:function(b){
      let beforePicture='<img class="img-responsive rounded book-image" style="width:110%;height:110%;" src="';
      let afterPicture='" alt="image of the author'+ b.id +'">';

      let toAppend= beforePicture +  b.photo + afterPicture;
      $("#AuthorName").text(b.name);
      $("#AuthorSurname").text(b.surname);
      $('#authorImage').append(toAppend);
      $('#authorBio').text(b.bio);

    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

  $.ajax({
    url: baseUrl + "books/findBy?attribute=author&key=" + localStorage.authorId,
    dataType: "json",
    success:function(data){
      //Retriving our best sellers
      let step = 1;
      let count=0;
      let toAppend = "";
      data.forEach( b => {
        //Setting up strings of code
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3" id="threeBookInRow">'
        + '<img id="threeBookInRowImg" class="align-self-start" alt="image of book: ' + b.isbn  + '" src="';
        let beforeTitle = '" onClick="handleBookClick(\''+ b.isbn +'\')" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let beforeAuthors = '</h5>';
        let beforePrice = '<i>Price: ';
        let afterPrice = '</i></div></div></div></div>';

        toAppend = toAppend + beforePhoto + b.photo + beforeTitle + b.title+ beforeAuthors +
                       beforePrice + b.price.value + " " + b.price.currency + afterPrice;
        if(step == 1){
          toAppend = '<div class="row ml-3" style="padding-bottom: 20px;">' + toAppend;
          step = 2;
          if((data.length-1) == count){
            toAppend = toAppend + "</div>";
            $("#authorsBooks").append(toAppend);
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
              $("#authorsBooks").append(toAppend);
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

  $.ajax({
    url: baseUrl + "events/findBy?attribute=author&key=" + localStorage.authorId,
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
        $("#v-pills-events").append("Sorry there are no events for this author");
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

let handleEventClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
}
