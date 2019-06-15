$(document).ready(function(){

  $.ajax({
    url: baseUrl + "events/" + localStorage.eventId,
    dataType: "json",
    success:function(b){
      //Setting strings
      let afterPicture='" alt="">';
      let beforePicture='<img class="img-responsive rounded book-image" id="EventImage" alt="image of event: '+ b.id +'" src="';

      //Retriving book related to the event
      $.ajax({
        url: baseUrl + "books/" + b.book,
        dataType: "json",
        success:function(data){
          $("#book_presented").append('<a href="#" class="standard-link" onclick="handleBookClick(' + "'" + data.isbn + "'" + ')">' + data.title + "</a>");
        }});

      //Appending event's info
      let toAppend= beforePicture +  b.photo + afterPicture;
      $("#EventName").text(b.title);
      $("#EventImage").append(toAppend);
      $("#auth").append(setAuthors(b.authors));
      $("#when").text(resetDateTime(b.timestamp));
      $("#place").text(b.place);
    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });

});


let setAuthors = function(authors){
      let toRet = " ";
      if(authors.length == 1){
        //Only one author case
        toRet = '<a href="#" class="standard-link" onclick="handleAuthorClick(' + "'" + authors[0].id + "'" + ')">' + authors[0].name + " " + authors[0].surname + "</a>";
      }
      else{
        //More than 1 author
        for(let i = 0; i < authors.length ; i++){
          if(i == (authors.length - 1)){
            //Final author of the list (no comma)
            toRet = toRet + '<a href="#" class="standard-link" onclick="handleAuthorClick(' + "'" + authors[i].id + "'" + ')">' + authors[i].name + " " + authors[i].surname + "</a>";
          }else{
            //Auhtor in the list
            toRet = toRet + '<a href="#" class="standard-link" onclick="handleAuthorClick(' + "'" + authors[i].id + "'" + ')">' + authors[i].name + " " + authors[i].surname + "</a>" + ", ";
          }
        }
      }
      return toRet;
}

let resetDateTime = function(time){
  //Makes the timestamp more readeable
  let array = time.split('T');
  return array[0] + " at " + array[1].slice(0,5);
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}
