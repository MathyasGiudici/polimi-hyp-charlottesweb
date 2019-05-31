//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Books Loading");

  $.ajax({
    url: baseUrl + "books",
    dataType: "json",
    success:function(data){
      //sort alphabetically
      data = data.sort(sortByTheme);

        let currentTheme=' ';
        let toAppend = '';
        let ind = 0;

        //Declarations
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeDescription = '</font></b></h5><h5 class="mt-0" id="author">';
        let priz='</h5><div class="small-padding"></div><h5 class="mt-0" id="price">';
        let afterDescription = '</h5></div></div></div></div>';

        let themeTitle='<section class=" cta small-perimeter"><h1 class="site-heading text-center text-white d-lg-block small-perimeter">  <span class="site-heading-upper text mb-3">';
        let afterTheme= '</span></h1></section>';
        let openRow = '<div class="row ml-3">';
        let closeRow = '</div><div class="small-padding"></div>';

        console.log(data);
        data.forEach(function(b){

          let beforeTitle = '" onClick="handleBookClick('+ b.isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook"><b><font size="+2">';

          if(b.theme != currentTheme)
          {
            if(!(currentTheme == ' ')){
              toAppend = toAppend + closeRow;
              $("#bookstheme").append(toAppend);
            }
            currentTheme = b.theme;
            ind = 0;
            toAppend = themeTitle+ b.theme + afterTheme + openRow + beforePhoto + b.photo + beforeTitle + b.title + beforeDescription + setAuthors(b.authors) + priz + b.price.value + ' '+ b.price.currency + afterDescription ;
          }
          else{
            ind = ind +1;
            toAppend = toAppend + beforePhoto + b.photo + beforeTitle + b.title + beforeDescription + setAuthors(b.authors) + priz + b.price.value + ' '+ b.price.currency + afterDescription;
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

  let sortByTheme= function(a, b){
    return a.theme.toLowerCase() > b.theme.toLowerCase() ? 1 : -1;
  }

  let handleBookClick = function(isbn){
    localStorage.isbn = isbn;
    window.location.href = './bookSample.html';
  }


  let setAuthors = function(authors)
  {
        let com = " ";
        if(authors.length == 1){
          com = authors[0].name + " " + authors[0].surname;
        }
        else{
          let i;
          for(i = 0; i < authors.length ; i++){
            if(i == (authors.length - 1)){
              com = com + authors[i].name + " " + authors[i].surname;
            }else com = com + authors[i].name + " " + authors[i].surname + ", ";

          }
        }
        return com;
  }
