function generateBooksHTML(){
  for(const bookId in dataSource.books) {
    const book = dataSource.books[bookId];
    console.log(book);


    const generatedHTML = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);

    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    const booksList = document.querySelector('.books-list');
    booksList.appendChild(generatedDOM);
    console.log(generatedDOM);
  }
}



const favoriteBooks = [];

function initActions(){
  const booksImages = document.querySelectorAll('.book__image');
  console.log(booksImages);

  const booksList = document.querySelector('.books-list');

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const image = event.target.offsetParent;
      console.log(image);
    
      if(event.target.offsetParent.classList.contains('book__image') == true){

        console.log(image)




        
          if(image.classList.contains('favorite') == false) {
            image.classList.add('favorite');
            
            const imageId = image.getAttribute('data-id');
            favoriteBooks.push(imageId);
            console.log(favoriteBooks);
          
          } else {
            image.classList.remove('favorite');
            const imageId = image.getAttribute('data-id');
            const indexOfimageId = favoriteBooks.indexOf(imageId);
            favoriteBooks.splice(indexOfimageId, 1);
            console.log(favoriteBooks);
          }
      }
    });
  
}

generateBooksHTML();
initActions();