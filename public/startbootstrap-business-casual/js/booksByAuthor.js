let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";

$(document).ready(function(){
  //Creating loading animation
  $(".row.cta-inner-border").parent().hide();
  $(".row.cta-inner-border").parent().before('<div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-spinner fa-spin"></i><h1></div>');

  $.ajax({
    url: baseUrl + "authors",
    dataType: "json",
    success:function(data){
      //Sorting authors
      data = data.sort(function(a,b){
        let sortA = (a.surname + a.name).toUpperCase();
        let sortB = (b.surname + b.name).toUpperCase();

        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }

        return 0;
      });

      //Setting up authors column
      numberofAuthors(data);

      //Creating object of parameters
      let obj = {};
      obj.authors = data;

      //Retriving books
      $.ajax({
        url: baseUrl + "books",
        dataType: "json",
        success:function(data){
          obj.books = data;
          //Setting up content table
          contentTable(obj);
        }});
      },
      error:function(jqXHR, textStatus, errorThrown){
           console.log("Error:" + jqXHR + textStatus + errorThrown);
      }
  });
});


let numberofAuthors = function(data){
  for(let i=0; i< data.length; i++){
    let author;
    let toAppend;

    if(i == 0)
      author = '<a class="nav-link active tab-link text-uppercase" id="authornumb0" data-toggle="pill" href="#aunumb0" role="tab" aria-controls="aunumb0" aria-selected="true">';
    else
      author = '<a class="nav-link tab-link text-uppercase" id="authornumb"+i data-toggle="pill" href="#aunumb'+i+'" role="tab" aria-controls="aunumb'+i+'" aria-selected="true">';

    let endEvent = '</a>';

    if (i==0)
     toAppend = author + data[i].surname + endEvent;
    else
     toAppend = author + data[i].surname + endEvent;

    $("#v-pills-tab").append(toAppend);
   }
}

let contentTable = function(obj){
    for(let i=0; i< obj.authors.length; i++){
      let tabelEvent = '<div class="tab-pane fade" id="aunumb'+i+'" role="tabpanel" aria-labelledby="authornumb'+i+'">';
      let activeEvent= '<div class="tab-pane fade show active" id="aunumb0" role="tabpanel" aria-labelledby="authornumb0">';
      let closure='</div>';

      if (i==0)
       toAppend = activeEvent+ authorTitleToAppend(obj.authors[i]) + myBooksListToAppend(obj.authors[i],obj.books) + closure;
      else
       toAppend = tabelEvent + authorTitleToAppend(obj.authors[i]) + myBooksListToAppend(obj.authors[i],obj.books) + closure;

      $("#v-pills-tabContent").append(toAppend);
    }
    //Removing loading animation
    $("#toBeDel").remove();
    $(".row.cta-inner-border").parent().show();
}

let authorTitleToAppend = function(author){
  return '<h4><a href="#" class="standard-link" onclick="handleAuthorClick(' + "'" + author.id + "')" + '">' + author.name + " " + author.surname + "</a>'s Books </h4>'";
}

let myBooksListToAppend = function(author, books){
  let init = "<ul>";
  let eInit = '<li><a href="#" class="standard-link" onclick="handleBookClick(' + "'";
  let eMid = "')" + '">';
  let eEnd = "</a></li>";
  let end = "</ul>";

  let toAppend = init;

  books.forEach( b => {
    b.authors.forEach( a => {
      if(author.id == a.id)
        toAppend = toAppend + eInit + b.isbn + eMid + b.title + eEnd;
    });
  });

  toAppend = toAppend + end;

  return toAppend;
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}
