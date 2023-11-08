'use strict';

const select = {
  booksPanel: {
    booksList: ('.books-list'),
    booksImages: ('.book__image')
  },
  filters: document.querySelector('.filters')
};



function generateBooksHTML(){
  for(const bookId in dataSource.books) {
    const book = dataSource.books[bookId];
    console.log(book);


    const generatedHTML = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);

    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    const booksList = document.querySelector(select.booksPanel.booksList);
    booksList.appendChild(generatedDOM);
    console.log(generatedDOM);
  };
};



const favoriteBooks = [];
const filters = [];

function initActions(){
  const booksList = document.querySelector(select.booksPanel.booksList);

  booksList.addEventListener('dblclick', function(event){
    event.preventDefault();

    const image = event.target.offsetParent;
    console.log(image);
    
    if(event.target.offsetParent.classList.contains('book__image') == true){

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
        };
      };
    });

    select.filters.addEventListener('click', function(event){
      if(event.target.type == 'checkbox' && event.target.tagName == 'INPUT' && event.target.name == 'filter' && event.target.checked == true){
        const filterValue = event.target.value;
        filters.push(filterValue);
        console.log(filters)
      } else {
          const filterValue = event.target.value;
          const indexOfFilterId = filters.indexOf(filterValue);
          filters.splice(indexOfFilterId, 1);
          console.log(filters);
      };
      filterBooks();
    });

};

function filterBooks(){
  for(const bookId in dataSource.books) {
    const book = dataSource.books[bookId];


    let shouldBeHidden = false;

    for(const filter of filters){
      const bookDetail = book.details[filter];
      console.log(bookDetail);

      if(!bookDetail){
        shouldBeHidden = true;
        console.log(book)
        break;
      }
    }

    if(shouldBeHidden == true){
      const bookImage = document.querySelector(".book__image" + '[data-id = "' + book.id + '"]')
      bookImage.classList.add('hidden')
    } else {
      const bookImage = document.querySelector(".book__image" + '[data-id = "' + book.id + '"]')
      bookImage.classList.remove('hidden')
    }
  }
}

generateBooksHTML();
initActions();
