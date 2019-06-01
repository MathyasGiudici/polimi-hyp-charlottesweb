//let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";
let baseUrl = "https://webserver-test-polimi.herokuapp.com/api/";

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];


$(document).ready(function(){

  let d = new Date();
  $(".section-heading-lower").append("of " + monthNames[d.getMonth()] + "!");

  $.ajax({
    url: baseUrl + "events",
    dataType: "json",
    success:function(data){
        let filtered = filterMonthEvent(data);

        if(filtered.length != 0) {
          numberofEvents(filtered);
          contentTable(filtered);
        }else{
          $("#v-pills-tab").remove();
          $("#v-pills-tabContent").remove();
          $("#thismonthContainer").append("<h4>Sorry there are no events this month!</h4>");
        }
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
     toAppend = numEvents+(data[i].title)+endEvent;
    else
     toAppend = numEvents+(data[i].title)+endEvent;
    $("#v-pills-tab").append(toAppend);

   }
}

let contentTable = function(data){

    for(let i=0; i< data.length; i++){

      let tabelEvent = '<div class="tab-pane fade" id="evnumb'+i+'" role="tabpanel" aria-labelledby="eventnumb'+i+'">';
      let activeEvent= '<div class="tab-pane fade show active" id="evnumb0" role="tabpanel" aria-labelledby="eventnumb0">';
      let title= '<ul class="list-group-flush"><li class="list-group-item" style="margin-left:1rem"><b>Title:</b> ';
      let auth= '<li class="list-group-item" style="margin-left:1rem"><b>Author:</b> ';
      let date ='<li class="list-group-item" style="margin-left:1rem"><b>When:</b> ';
      let place='<li class="list-group-item" style="margin-left:1rem"><b>Where:</b> ';
      let close = '</li>';
      let endTable='</ul></div>';
      let closureActive='</div>';
      let button = '<li class="list-group-item" style="margin-left:1rem"><a href="#" onclick="handleClick(' + "'"+ data[i].id + "'" +
      ')" class="btn btn-primary">Read More</a></li>';


      if (i==0)
       toAppend = activeEvent + title + data[i].title + close + auth + authorsToString(data[i].authors) + close + date + resetDateTime(data[i].timestamp) +
       close + place + data[i].place + close + button + endTable + closureActive;
      else
       toAppend = tabelEvent + title + data[i].title + close + auth + authorsToString(data[i].authors) + close  + date + resetDateTime(data[i].timestamp) +
       close + place + data[i].place + close+ button + endTable;
      $("#v-pills-tabContent").append(toAppend);
    }
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

let resetDateTime = function(time){
  let array = time.split('T');
  return array[0] + " at " + array[1].slice(0,5);
}

let handleClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
}

let handleEventClick = function(id){
  localStorage.eventId = id;
  window.location.href = './eventSample.html';
}

let filterMonthEvent = function(data){
  let filtered = [];

  data.forEach( e => {
    //retriving timestamp
    let timestamp = e.timestamp;
    //Searching date
    timestamp = timestamp.split('T');
    //Searching month
    timestamp = timestamp[0].split('-');
    let month = parseInt(timestamp[1],10);

    //Searching current month
    var d = new Date();
    let currentMonth = d.getMonth();
    //Adding 1, months in JS goes from 0 to 11
    currentMonth = currentMonth + 1;

    if( month == currentMonth ){
      filtered.push(e);
    }
  });

  return filtered;
}
