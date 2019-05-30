//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";


$(document).ready(function(){
  console.log("Author Loading");

  $.ajax({
    url: baseUrl + "events/" + localStorage.eventId,
    dataType: "json",
    success:function(b){
      console.log(b);
      let afterPicture='" alt="">';
      let beforePicture='<img class="img-responsive rounded book-image" id="EventImage" src="';


      let toAppend= beforePicture +  b.photo + afterPicture;
      $("#EventName").text(b.title);
      $("#EventImage").append(toAppend);
      $("#auth").text(setAuthors(b.authors));
      $("#book").text(b.book);
      $("#when").text(b.timestamp);
      $("#place").text(b.place);





    },

    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });

});


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
    //$("#authors").text(com);
}
