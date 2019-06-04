//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  $.ajax({
    url: baseUrl + "authors",
    dataType: "json",
    success:function(data){
      let toAppend = '';
      let step = 1;
      for(let i = 0; i< data.length; i++){
        //photo
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3" id="threeBookInRow">' +
        '<img class="align-self-start" alt="image of author: ' + data[i].id  + '" src="';
        let beforeTitle = '" onClick="handleAuthorClick('+"'" + data[i].id +"'" +');" style="width: 70%" alt=""><div class="cta descr-padding"><h5 class="mt-0" id="AuthorsName">';
        //name and surname of the author
        let end = '</h5></div></div></div>';

        toAppend = toAppend + beforePhoto + data[i].photo + beforeTitle + data[i].name+' '+data[i].surname+ end ;

         if(step == 1){
           toAppend = '<div class="row ml-3" style="padding-bottom: 20px;">' + toAppend;
           step = 2;

           if((data.length-1) == i){
             toAppend = toAppend + "</div>";
             $("#authorsContainer").append(toAppend);
             toAppend = "";
             step = 1;
           }
         }
         else{
           if((data.length-1) == i){
             step = 3;
           }

           if(step == 2){
               step = 3;
           }
           else{
               toAppend = toAppend + "</div>";
               $("#authorsContainer").append(toAppend);
               toAppend = "";
               step = 1;
           }
         }
      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }

  });

});

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}
