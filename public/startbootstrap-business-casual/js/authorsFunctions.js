//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Authors Loading");

  $.ajax({
    url: baseUrl + "authors",
    dataType: "json",
    success:function(data){
      for(let i = 0; i< data.length; i++){
        let toAppend;

        //photo
        let beforePhoto = '<div class="col-md-4 col-xs-12 bestseller-item"><div class="align-self-center mr-3"><img class="align-self-start" src="';
        let beforeTitle = '" onClick="handleAuthorClick('+"'" + data[i].id +"'" +');" style="width: 70%" alt=""><div class="cta descr-padding"><h5 class="mt-0" id="AuthorsName">';
        //name and surname of the author
        let beforeDescription = '</h5>';
        let afterDescription = '</div></div></div></div>';

        if(i%3==0 && i!=0 && i!=data.length-1){
         newRow='<div class="small-padding"></div>';
         toAppend=newRow+beforePhoto + data[i].photo + beforeTitle + data[i].name+' '+data[i].surname+ beforeDescription + afterDescription ;
        }
         toAppend = beforePhoto + data[i].photo + beforeTitle + data[i].name+' '+data[i].surname+ beforeDescription + afterDescription ;


        $("#authors").append(toAppend);
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



// let showBio= function() {
//   let dots = document.getElementById("dots");
//   let moreText = document.getElementById("more");
//   let btnText = document.getElementById("myBtn");
//
//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "Read more";
//     moreText.style.display = "none";
//   } else {
//     dots.style.display = "none";
//     btnText.innerHTML = "Read less";
//     moreText.style.display = "inline";
//   }
//
//   // var x = document.getElementById("more");
//   // if (x.style.display === "none") {
//   //   x.style.display = "block";
//   // } else {
//   //   x.style.display = "none";
//   // }
// }
