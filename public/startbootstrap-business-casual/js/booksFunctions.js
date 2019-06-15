$(document).ready(function(){
  //Creating loading animation
  $("#allBooksContainer").parent().hide();
  $("#allBooksContainer").parent().before('<div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-spinner fa-spin"></i><h1></div>');

  $.ajax({
    url: baseUrl + "books",
    dataType: "json",
    success:function(data){
      data = data.sort(function(a,b){
        let sortA = a.title;
        let sortB = b.title;

        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }

        return 0;
      });

      let toAppend = myBooksListToAppend(data);
      //Removing loading animation + appending list
      $("#toBeDel").remove();
      $("#allBooksContainer").parent().show();
      $("#allBooksContainer").append(toAppend);
      },
      error:function(jqXHR, textStatus, errorThrown){
           console.log("Error:" + jqXHR + textStatus + errorThrown);
      }

  });

});

let myBooksListToAppend = function(books){
  let init = "<ul>";
  let eInit = '<li><a href="#" class="standard-link" onclick="handleBookClick(' + "'";
  let eMid = "')" + '">';
  let eEnd = "</a></li>";
  let end = "</ul>";

  let toAppend = init;

  books.forEach( b => {
      toAppend = toAppend + eInit + b.isbn + eMid + b.title + ' | ' + authorsToString(b.authors) + ' | ' + b.pubbDate.slice(0,4) + eEnd;
  });

  toAppend = toAppend + end;

  return toAppend;
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


let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}
