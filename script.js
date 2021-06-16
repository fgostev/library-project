let bookLibrary = [];

function Book(){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};


function addBookToLibrary(){
    const newBook = Object.create(Book)
    newBook.title = prompt('title')
    newBook.author = prompt('author')
    newBook.pages = prompt('pages')
    newBook.red = prompt('read')
    bookLibrary.push(newBook);
}

console.log(bookLibrary);

