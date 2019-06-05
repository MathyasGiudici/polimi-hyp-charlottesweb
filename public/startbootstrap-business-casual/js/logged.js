
$(document).ready(function() {
  console.log("script uploaded");
  if(localStorage.isLogged === "true"){
    var string= '<a class="nav-link text-uppercase text-expanded" href="userProfile.html"><i class="fas fa-user"></i>';
    var name = '<span> '+ localStorage.userId + ' </span></a>';
    var toAppend= string + name;
    console.log(localStorage.userId);
    $('#userNav').append(toAppend);
  }else {
    var string= '<a class="nav-link text-uppercase text-expanded" href="login.html" ><i class="fas fa-user"></i></a>';
    $('#userNav').append(string);
  }

});
