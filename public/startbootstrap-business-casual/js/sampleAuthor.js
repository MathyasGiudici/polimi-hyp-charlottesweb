//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function(){
  console.log("Author Loading");

  $.ajax({
    url: baseUrl + "authors/" + localStorage.authorId,
    dataType: "json",
    success:function(b){
      console.log(b);
      let beforePicture='<div class="col-lg-4 col-md-4 col-xs-12"><img class="img-responsive rounded book-image" id="BookImage" src="';
      let afterPicture='" alt=""></div>';

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
    //TODO: check FindBy
    url: baseUrl + "books/findBy?attribute=id&key=" + localStorage.authorId,
    dataType: "json",
    success:function(data){
      console.log("author's books");
      console.log(localStorage.authorId);
      console.log(data);
      for(let i=0; i<data.length; i++){
        console.log(data[i]);
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeTitle = '" onClick="handleBookClick('+ data[i].isbn +')"style="width: 70%" alt=""><div class="cta descr-padding"><div class="cta-inner rounded pt-2 pl-2 pr-2"><h5 class="mt-0" id="TitleBook">';
        let afterDescription = '</h5></div></div></div></div>';
        let toAppend = beforePhoto + data[i].photo + beforeTitle + data[i].title + afterDescription;
        $("#authorsBooks").append(toAppend);

      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });

});
