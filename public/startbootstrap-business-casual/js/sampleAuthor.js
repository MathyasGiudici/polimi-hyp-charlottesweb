//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function(){
  console.log("Author Loading");

  $.ajax({
    url: baseUrl + "authors/" + localStorage.authorId,
    dataType: "json",
    success:function(b){
      console.log(b);
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

  $.ajax({
    //TODO: check FindBy
    url: baseUrl + "events/findBy?attribute=authors&key=" + localStorage.authorId,
    dataType: "json",
    success:function(data){
      for(let i=0; i<data.length; i++){


      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });



});
