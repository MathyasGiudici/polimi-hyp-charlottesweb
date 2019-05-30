//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

$(document).ready(function(){
  console.log("Carousel Loading");

  $.ajax({
    url: baseUrl + "events",
    dataType: "json",
    success:function(data){
      for(let i =0; i< data.length; i++){
        let firstPart;

        if(i == 0)
          firstPart = '<div class="carousel-item active" onClick="handleEventClick('+ "'" + data[i].id + "'" +')" style="background-image: url('+ "'";
        else
          firstPart = '<div class="carousel-item" onClick="handleEventClick('+ "'" + data[i].id +"'" +')" style="background-image: url('+ "'";

        let secondPart = "'" + ')"></div>';
        let toAppend = firstPart + data[i].photo + secondPart;
        $(".carousel-inner").append(toAppend);
      }
    },
    error:function(jqXHR, textStatus, errorThrown){
         console.log("Error:" + jqXHR + textStatus + errorThrown);
    }
  });


  $.ajax({
    url: baseUrl + "events",
    dataType: "json",
    success:function(data){
        numberofEvents(data);
        contentTable(data);
      },
      error:function(jqXHR, textStatus, errorThrown){
           console.log("Error:" + jqXHR + textStatus + errorThrown);
      }

  });

});


let numberofEvents = function(data){
  for(let i=0; i< data.length; i++){
    let numEvents;
    let toAppend;

    if(i == 0)
      numEvents = '<a class="nav-link active tab-link text-uppercase" id="eventnumb0" data-toggle="pill" href="#evnumb0" role="tab" aria-controls="evnumb0" aria-selected="true">';
    else
      numEvents = '<a class="nav-link tab-link text-uppercase" id="eventnumb"+i data-toggle="pill" href="#evnumb'+i+'" role="tab" aria-controls="evnumb'+i+'" aria-selected="true">';

    let endEvent = '</a>';

    if (i==0)
     toAppend = numEvents+('Event '+(i+1))+endEvent;
    else
     toAppend = numEvents+('Event '+(i+1))+endEvent;
    $("#v-pills-tab").append(toAppend);

   }
}

let handleEventClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
}

let contentTable = function(data){

    for(let i=0; i< data.length; i++){

      //let separator='</div><div class="col-1"></div>';
      //let content='<div class="tab-content" id="v-pills-tabContent">';
      let tabelEvent = '<div class="tab-pane fade" id="evnumb'+i+'" role="tabpanel" aria-labelledby="eventnumb'+i+'">';
      let activeEvent= '<div class="tab-pane fade show active" id="evnumb0" role="tabpanel" aria-labelledby="eventnumb0">';
      let auth= '<ul class="list-group-flush"><li class="list-group-item" style="margin-left:1rem">Author: ';
      let book='<li class="list-group-item" style="margin-left:1rem">Book: ';
      let date ='<li class="list-group-item" style="margin-left:1rem">When: ';
      let place='<li class="list-group-item" style="margin-left:1rem">Where: ';
      let close = '</li>';
      let endTable='</ul></div>';
      let closureActive='</div>';


      if (i==0)
       toAppend = activeEvent+auth+data[i].author+close+book+data[i].book+close+date+data[i].timestamp+close+place+data[i].place+close+endTable+closureActive;
      else
       toAppend = tabelEvent+auth+data[i].author+close+book+data[i].book+close+date+data[i].timestamp+close+place+data[i].place+close+endTable;
      $("#v-pills-tabContent").append(toAppend);
    }
}
