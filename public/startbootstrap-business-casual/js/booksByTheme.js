//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  $.ajax({
    url: baseUrl + "books",
    dataType: "json",
    success:function(data){
      //Retriving themes
      let themes = [];

      data.forEach( b => {
        themes.push(b.theme);
      });

      themes = [...new Set(themes)];

      //Sorting books by theme
      data = data.sort(function(a,b){
        let sortA = a.theme + a.title;
        let sortB = b.theme + b.title;

        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }

        return 0;
      });

      numberofThemes(themes);
      contentTable(data,themes);
    },
    error:function(jqXHR, textStatus, errorThrown){
       console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });
});

let numberofThemes = function(data){
  for(let i=0; i< data.length; i++){
    let book;
    let toAppend;

    if(i == 0)
      book = '<a class="nav-link active tab-link text-uppercase" id="booknumb0" data-toggle="pill" href="#bonumb0" role="tab" aria-controls="bonumb0" aria-selected="true">';
    else
      book = '<a class="nav-link tab-link text-uppercase" id="booknumb"+i data-toggle="pill" href="#bonumb'+i+'" role="tab" aria-controls="bonumb'+i+'" aria-selected="true">';

    let endBook = '</a>';

    if (i==0)
     toAppend = book + data[i] + endBook;
    else
     toAppend = book + data[i] + endBook;
    $("#v-pills-tab").append(toAppend);

   }
}

let contentTable = function(data,themes){

    for(let i=0; i<themes.length; i++){
      let tabelEvent = '<div class="tab-pane fade" id="bonumb'+i+'" role="tabpanel" aria-labelledby="booknumb'+i+'">';
      let activeEvent= '<div class="tab-pane fade show active" id="bonumb0" role="tabpanel" aria-labelledby="booknumb0">';
      let closure='</div>';
      let themeTitle = '<h4>' + themes[i] + '</h4>';

      if (i==0)
       toAppend = activeEvent+ themeTitle.toUpperCase() + myBooksListToAppend(themes[i],data) + closure;
      else
       toAppend = tabelEvent + themeTitle.toUpperCase() + myBooksListToAppend(themes[i],data) + closure;

      $("#v-pills-tabContent").append(toAppend);
    }
}

let myBooksListToAppend = function(theme, books){
  let init = "<ul>";
  let eInit = '<li><a href="#" onclick="handleBookClick(' + "'";
  let eMid = "')" + '">';
  let eEnd = "</a></li>";
  let end = "</ul>";

  let toAppend = init;

  books.forEach( b => {
    if(b.theme == theme)
      toAppend = toAppend + eInit + b.isbn + eMid + b.title + '<br/>' + authorsToString(b.authors) + eEnd;
  });

  toAppend = toAppend + end;

  return toAppend;
}

let authorTitleToAppend = function(author){
  return '<i><a href="#" onclick="handleAuthorClick(' + "'" + author.id + "')" + '">' + author.name + " " + author.surname + "</a></i>";
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}

let authorsToString = function(authors){
     let string = "";
     if(authors.length == 1){
       string = authorTitleToAppend(authors[0]);
     }
     else{
       for(let i = 0; i < authors.length ; i++){
         if(i == (authors.length - 1)){
           string = string + authorTitleToAppend(authors[i]);
         }
         else{
           string = string + authorTitleToAppend(authors[i]) + ", ";
         }
       }
     }
     return string;
}
