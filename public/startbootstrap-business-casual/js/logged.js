$(document).ready(function() {
  if(localStorage.isLogged === "true"){
    //User is logged-in
    var string= '<a class="nav-link text-uppercase text-expanded" href="userProfile.html"><i class="fas fa-user"></i> ';
    var name = localStorage.userId + '</a>';
    var toAppend= string + name;
    console.log(localStorage.userId);
    $('#userNav').append(toAppend);
  } else{
    //User not logged-in
    var string= '<a class="nav-link text-uppercase text-expanded" href="login.html" ><i class="fas fa-user"></i></a>';
    $('#userNav').append(string);
  }
});
