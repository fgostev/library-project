const modal = document.getElementById('modalForm');
const bookShelf = document.getElementsByClassName('book-shelf')[0];
const openModalBtn = document.getElementById('new');
const closeModalBtn = document.getElementById('closeBtn');
const deleteBtns = document.getElementsByClassName('delete');
const books = document.getElementsByClassName('book')



const form = document.querySelector("form");
const done = document.getElementById('done');

// library object

let bookLibrary = [];

function Book(){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
};

let bookIndx = 0;

// book on loading
function defaultBook(){
    const firstBook = Object.create(Book)
    firstBook.title = "Lord Of The Rings";
    firstBook.author = "Tolkien";
    firstBook.pages = "2506";
    bookLibrary.push(firstBook);
    displayBooks();
}

defaultBook();

// books from form

function addBookToLibrary(){
    event.preventDefault();
    const newBook = Object.create(Book)
    newBook.title = document.getElementById('title').value;
    newBook.author = document.getElementById('author').value;
    newBook.pages = document.getElementById('pages').value;
    
    if(document.getElementById('yes').checked == true){
        newBook.read = "no";
    }else if (document.getElementById('no').checked == true){ 
        newBook.read = "yes";
    }
    
    bookIndx = bookLibrary.length;

    bookLibrary.push(newBook);
    displayBooks();

    modal.style.display = 'none';

    form.reset();

    Array.from(deleteBtns).forEach(button => {
        button.addEventListener("click", deleteBook);
    });
    
}

// create new book


function displayBooks(){

    let pushedBook = bookLibrary[bookLibrary.length - 1];

    bookLibrary.forEach(book => {

        
     if(book === pushedBook){   


        const container = document.getElementsByClassName('book-shelf')[0];

        const div = document.createElement("div");
        div.classList.add("book");
        div.id = bookIndx;
        container.appendChild(div);

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        div.appendChild(titleDiv);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        titleDiv.appendChild(deleteBtn);

        const icon = document.createElement("i");
        icon.className = 'far fa-trash-alt';
        deleteBtn.appendChild(icon);

        const title = document.createElement("h2");
        title.textContent = "Title: " + book.title;
        titleDiv.appendChild(title);

        const author = document.createElement("h3");
        author.textContent = "Author: " + book.author;
        div.appendChild(author);

        const pages = document.createElement("h3");
        pages.textContent = "Pages: " + book.pages;
        div.appendChild(pages);

        const read = document.createElement("h3");
        read.textContent = "Read: " + book.read;
        div.appendChild(read);

     }
     idMatchIndex();
    })
}

// id checker


function idMatchIndex(){

        for(i = 0; i < books.length; i++){
            books[i].id = i;
        }
     }

// delete book


function deleteBook(e){
    const bookCard = this.parentElement.parentElement;

    // console.log(bookCard.id)

    bookLibrary.splice(parseInt(bookCard.id), 1);

    bookCard.remove();
    idMatchIndex();
}


// functions for modal

function openModal(){
        modal.style.display = 'block';
    }

function closeModal(){
        modal.style.display = 'none';
    }
function clickOutside(e){
        if(e.target == modal){
            modal.style.display = 'none';
        }
    }

form.addEventListener('submit', addBookToLibrary);

Array.from(deleteBtns).forEach(button => {
    button.addEventListener("click", deleteBook);
});

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);