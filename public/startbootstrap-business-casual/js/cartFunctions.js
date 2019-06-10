let baseUrl = "https://polimi-hyp-charlottesweb.herokuapp.com/api/";

let fakeCart = '{ "id": "mario.rossi@mail.polimi.it", "books": [ { "book": "9780061124952", "quantity": 2, "price": { "value": 8.04, "currency": "euro" } } ], "total": { "value": 16.08, "currency": "euro" } }';
let currentCart = JSON.parse(fakeCart);

$(document).ready(function(){
  //Checking if the user is logged-in
  if(!(localStorage.isLogged == "true")){
    localStorage.redirectToCart = true;
    window.location.href = './login.html';
  }

  //Checking if there is reason to have continueShopping
  if(!localStorage.isbn){
    $("#ContinueShopping").attr("disabled", true);
  }

  $.ajax({
      url: baseUrl + "users/me/cart",
      dataType: "json",
      success:function(data){
        currentCart = data;

        if(localStorage.redirectFromBook){
          var promise = new Promise((resolve, reject) => {resolve(1);});

          //Sequential schedule
          promise.then( v => {
             putFromBook();
             return v;
          }).then( v => {
            showCart();
            return v;
          });
        }else{
          showCart();
        }
      },
      error:function(jqXHR, textStatus, errorThrown){
          console.log("Error:" + jqXHR + textStatus + errorThrown);
      }
  });
});


let showCart = function(){
  //Removing animation
  $("#MyCartList").empty();

  //Empty cart
  if(currentCart.books.length == 0){
    $("#MyCartList").append('<tr><td colspan="5" style="width:100%; text-align: center;"><div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-shopping-cart" style="color:black;"></i><h1></div><strong>Your cart is empty!</strong></td></tr>');
    updateTotal();
    return;
  }

  var promise = new Promise((resolve, reject) => {
    //Filling cart
    currentCart.books.forEach( b => {
      $.ajax({
        url: baseUrl + "books/" + b.book,
        dataType: "json",
        success:function(data){
          //Creating rows of book
          createBookLine(data,b.quantity);

          //resolve if is the last
          if(currentCart.books.indexOf(b) == (currentCart.books.length - 1)){
            resolve(1);
          }
        },
        error:function(jqXHR, textStatus, errorThrown){
             console.log("Error:" + jqXHR + textStatus + errorThrown);
        }
      });
    });
  });

  //Sequential schedule
  promise.then( v => {
    //Updating the total
    updateTotal();
    return v;
  });
}

let createBookLine = function(book,quantity){
  let toAppend = '<tr id="book_' + book.isbn + '">';

  //Creating book's photo
  let photoCol = '<td data-th="Product"><div class="row" ><div class="col-sm-4 hidden-xs"><img src="';
  let photoColEnd = '" style="width: 100%" alt="image of book: ' + book.isbn +'" class="img-responsive"/></div>';
  toAppend = toAppend.concat(photoCol).concat(book.photo).concat(photoColEnd);


  //Creating book's data
  let titleCol = '<div class="col-sm-8 "><a class="standard-link" style="font-weight:bold" onclick="handleBookClick(\'' + book.isbn + '\')">';
  toAppend = toAppend.concat(titleCol).concat(book.title).concat('</a><p>');
  toAppend = toAppend.concat(authorsToString(book.authors,true)).concat('</p></div></div></td>');

  //Creating book's price
  toAppend = toAppend.concat('<td data-th="Price">').concat(book.price.value).concat(' ').concat(book.price.currency).concat('</td>');

  //Creating book's quantity
  let quantityCol = '<td data-th="Quantity"><input type="number" class="form-control text-center" min="1" value="';
  toAppend = toAppend.concat(quantityCol).concat(quantity).concat('" id="book_quan_');
  toAppend = toAppend.concat(book.isbn).concat('" onchange="changingQuantity(\'');
  toAppend = toAppend.concat(book.isbn).concat('\');" ></td>');

  //Creating book's subTot
  let subTot = book.price.value * quantity;
  subTot = subTot.toFixed(2);
  toAppend = toAppend.concat('<td data-th="Subtotal" id="book_subt_').concat(book.isbn);
  toAppend = toAppend.concat('" class="text-center">').concat(subTot).concat(' ').concat(book.price.currency).concat('</td>');

  //Creating book's deletion button
  toAppend = toAppend.concat('<td class="actions" data-th="DelButton"><button class="btn btn-danger btn-md" onclick="deletionBook(\'');
  toAppend = toAppend.concat(book.isbn).concat('\');"><i class="fa fa-trash"></i></button></td>');

  //Closing the row
  toAppend = toAppend.concat('</tr>');
  $("#MyCartList").append(toAppend);

  //Adding price at the currentCart
  currentCart.books.forEach( b => {
    if(b.book == book.isbn){
      b.price = book.price;
    }
  });

}


let changingQuantity = function(isbn){
  //Retriving quantity
  let string = "#book_quan_" + isbn;
  var newQuantity = parseInt($(string).val());

  //Getting the current book
  var cBook;

  currentCart.books.forEach( b => {
    if (b.book == isbn){
      b.quantity = newQuantity;
      cBook = b;
    }
  });

  //Updating sub total
  var subTot = cBook.price.value * newQuantity;
  string = "#book_subt_" + isbn;
  $(string).empty();
  let toAppend = subTot.toFixed(2).toString() + " " + cBook.price.currency;
  $(string).append(toAppend);

  //Updating total
  updateTotal();

  //Updating server side
  putChange();
}

let deletionBook = function(isbn){
  //Removing the row in the page
  let row = "#book_" + isbn;
  $(row).remove();


  //Getting the index + removing in currentCart
  var index = -1;
  currentCart.books.forEach( b => {
    if(b.book == isbn)
      index = currentCart.books.indexOf(b);
  });

  currentCart.books.splice(index,1);

  //Updating total
  updateTotal();

  //Empty cart
  if(currentCart.books.length == 0){
    $("#MyCartList").append('<tr><td colspan="5" style="width:100%; text-align: center;"><div class="cta small-perimeter" style="background-color: rgba(0,0,0,0);"id="toBeDel"><h1 class="site-heading text-center text-white d-lg-block small-perimeter"><i class="fas fa-shopping-cart" style="color:black;"></i><h1></div><strong>Your cart is empty!</strong></td></tr>');
    updateTotal();
  }

  //Updating server side
  putChange();
}

let putChange = function(){

  var parsedCart = jQuery.extend(true, {}, currentCart);

  if(parsedCart.books.length !== 0){
    parsedCart.books.forEach( b => {
      delete b.price;
    });
  }

  $.ajax({
      type: "PUT",
      url: baseUrl + 'users/me/cart',
      contentType: "application/json; charset=utf-8",
      processData: false,
      dataType: "json",
      data: JSON.stringify(parsedCart),
      success: function(data){ return data;},
      error: function(jqXHR, textStatus, errorThrown){
            console.log("Error:" + jqXHR + textStatus + errorThrown);
      }
    });
}

let updateTotal = function(){
  //Getting new tot
  var tot = getTotalOfCart();

  //Updating in currentCart
  currentCart.total = tot;

  //Updating in page
  $("#TotalOfCart").empty();

  if(tot.value !== 0){
    let toAppend = "Total: " + tot.value.toFixed(2).toString() + " " + tot.currency;
    $("#TotalOfCart").append(toAppend);
  }
}

let getTotalOfCart = function(){
  var toRet = {
    value: 0,
    currency: 'euro'
  };

  currentCart.books.forEach( b => {
    toRet.value = toRet.value + (b.price.value * b.quantity);
    toRet.currency = b.price.currency;
  });

  return toRet;
}

let putFromBook = function(){
  var redBook = JSON.parse(localStorage.redirectFromBook);
  //Cleaning the localStorage
  delete localStorage.redirectFromBook;

  //Updating cart total
  currentCart.total.value = currentCart.total.value + redBook.price.value;

  var isIn = 0;
  //Book already in the cart
  currentCart.books.forEach( b => {
    if(b.book == redBook.book){
      isIn = 1;
      b.quantity = b.quantity + 1;
      b.price = redBook.price;
    }
  });

  //Book not in the cart
  if(isIn == 0){
    delete redBook.price;
    currentCart.books.push(redBook);
  }

  //Updating server side
  putChange();
}

let authorsToString = function(authors, isHeader){
     var string = "";
     if(authors.length == 1){
       if(isHeader){
         string = authorTitleToAppend(authors[0]);
       }else{
         string = authors[0].name + " " + authors[0].surname;
       }
     }
     else{
       for(var i = 0; i < authors.length ; i++){
         if(i == (authors.length - 1)){
           if(isHeader){
             string = string + authorTitleToAppend(authors[i]);
           }else{
             string = string + authors[i].name + " " + authors[i].surname;
           }
         }
         else{
           if(isHeader){
             string = string + authorTitleToAppend(authors[i]) + ", ";
           }else{
             string = string + authors[i].name + " " + authors[i].surname + ", ";
           }
         }
       }
     }
     return string;
}

let authorTitleToAppend = function(author){
  return '<a href="#" onclick="handleAuthorClick(' + "'" + author.id + "')" + '">' + author.name + " " + author.surname + "</a>";
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}
