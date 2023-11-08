'use strict';

const select = {
  booksPanel: {
    booksList: ('.books-list'),
    booksImages: ('.book__image')
  },
  filters: document.querySelector('.filters')
};











class BooksList {
  constructor(){
    const thisBooksList = this; 
    const favoriteBooks = [];
    const filters = [];

    thisBooksList.favoriteBooks = favoriteBooks;
    thisBooksList.filters = filters;
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.filterBooks();
    thisBooksList.initActions();
  
  }
  initData() {
    const thisBooksList = this; 
    this.data = dataSource.books;

    for(const bookId in this.data) {
      const book = this.data[bookId];
      book.ratingBgc = this.determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;
  
  
      const generatedHTML = Handlebars.compile(document.querySelector('#template-book').innerHTML)(book);
  
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
  
      const booksList = document.querySelector(select.booksPanel.booksList);
      booksList.appendChild(generatedDOM);
    };
  }

  getElements() {
    const thisBooksList = this; 
    this.bookList = document.querySelector(select.booksPanel.booksList);
  }

  initActions() {
    const thisBooksList = this; 

    const filters = this.filters;
    const favoriteBooks = this.favoriteBooks;

    this.bookList.addEventListener('dblclick', function(event){
      event.preventDefault();
  
      const image = event.target.offsetParent;
      console.log(image);
      
      if(event.target.offsetParent.classList.contains('book__image') == true){
  
          if(image.classList.contains('favorite') == false) {
            image.classList.add('favorite');
              
            const imageId = image.getAttribute('data-id');
            favoriteBooks.push(imageId);
            
          } else {
            image.classList.remove('favorite');
            const imageId = image.getAttribute('data-id');
            const indexOfimageId = favoriteBooks.indexOf(imageId);
            favoriteBooks.splice(indexOfimageId, 1);
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
        };
        thisBooksList.filterBooks()
      });
  
  }
  filterBooks() {
    const thisBooksList = this; 

    for(const bookId in this.data) {

      const book = this.data[bookId];
      let shouldBeHidden = false;
  
      for(const filter of this.filters){
        const bookDetail = book.details[filter];
        console.log(bookDetail);
  
        if(!bookDetail){
          shouldBeHidden = true;
          console.log(book)
          break;
        }
      };
  
      if(shouldBeHidden == true){
        const bookImage = document.querySelector(".book__image" + '[data-id = "' + book.id + '"]')
        bookImage.classList.add('hidden')
      } else {
        const bookImage = document.querySelector(".book__image" + '[data-id = "' + book.id + '"]')
        bookImage.classList.remove('hidden')
      }
    };
  }

  determineRatingBgc(rating) {
    const thisBooksList = this; 
    
    let background = '';

    if(rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  
    return background;
  }

}


const app = new BooksList();
