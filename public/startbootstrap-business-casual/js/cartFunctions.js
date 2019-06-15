let currentCart ;

$(document).ready(function(){
  //Checking if the user is logged-in
  if(!(localStorage.isLogged == "true")){
    localStorage.redirectToCart = true;
    window.location.href = './login.html';
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
    $("#MyCartList").append('<div class="product"> <div class="product-image"> <i class="fas fa-shopping-cart fa-5x" style="color:black;"></i> </div> <div class="product-details"> <h3>Your cart is empty</h3> <h3 class="product-description">Shop on our amazing website!</h3> </div> <div class="product-price"> <span style="color:transparent;">Something</span> </div> <div class="product-quantity"> <span style="color:transparent;">Something</span> </div> <div class="product-removal"> <span style="color:transparent;">Something</span> </div> <div class="product-line-price"> <span style="color:transparent;">Something</span> </div> </div>');
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
  let toAppend = '<div class="product" id="book_' + book.isbn + '">';

  //Creating book's photo
  let photoCol = '<div class="product-image"><img src="';
  let photoColEnd = '" alt="image of book: ' + book.isbn +'" onclick="handleBookClick(\'' + book.isbn + '\')" ></div>';
  toAppend = toAppend.concat(photoCol).concat(book.photo).concat(photoColEnd);


  //Creating book's data
  let titleCol = '<div class="product-details"><div class="product-title"><a class="btn-link" style="font-weight:bold" onclick="handleBookClick(\'' + book.isbn + '\')">';
  toAppend = toAppend.concat(titleCol).concat(book.title).concat('</a></div><p class="product-description">');
  toAppend = toAppend.concat(authorsToString(book.authors,true)).concat('</p></div>');

  //Creating book's price
  toAppend = toAppend.concat('<div class="product-price">').concat(book.price.value).concat(' ').concat(book.price.currency).concat('</div>');

  //Creating book's quantity
  let quantityCol = '<div class="product-quantity"><input type="number" min="1" value="';
  toAppend = toAppend.concat(quantityCol).concat(quantity).concat('" id="book_quan_');
  toAppend = toAppend.concat(book.isbn).concat('" onchange="changingQuantity(\'');
  toAppend = toAppend.concat(book.isbn).concat('\');"></div>');

  //Creating book's deletion button
  toAppend = toAppend.concat('<div class="product-removal"><button class="btn btn-danger btn-md" onclick="deletionBook(\'');
  toAppend = toAppend.concat(book.isbn).concat('\');"><i class="fa fa-trash"></i></button></div>');

  //Creating book's subTot
  let subTot = book.price.value * quantity;
  subTot = subTot.toFixed(2);
  toAppend = toAppend.concat('<div class="product-line-price" id="book_subt_').concat(book.isbn);
  toAppend = toAppend.concat('">').concat(subTot).concat(' ').concat(book.price.currency).concat('</div>');


  //Closing the row
  toAppend = toAppend.concat('</div>');
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
    $("#MyCartList").append('<div class="product"> <div class="product-image"> <i class="fas fa-shopping-cart fa-5x" style="color:black;"></i> </div> <div class="product-details"> <h3>Your cart is empty</h3> <h3 class="product-description">Shop on our amazing website!</h3> </div> <div class="product-price"> <span style="color:transparent;">Something</span> </div> <div class="product-quantity"> <span style="color:transparent;">Something</span> </div> <div class="product-removal"> <span style="color:transparent;">Something</span> </div> <div class="product-line-price"> <span style="color:transparent;">Something</span> </div> </div>');
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
    let toAppend = tot.value.toFixed(2).toString() + " " + tot.currency;
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
  return '<a href="#"  class="standard-link" onclick="handleAuthorClick(' + "'" + author.id + "')" + '">' + author.name + " " + author.surname + "</a>";
}

let handleBookClick = function(isbn){
  localStorage.isbn = isbn;
  window.location.href = './bookSample.html';
}

let handleAuthorClick = function(id){
  localStorage.authorId = id;
  window.location.href = './authorSample.html';
}
