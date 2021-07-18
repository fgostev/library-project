const modal = document.getElementById('modalForm');
const bookShelf = document.getElementsByClassName('book-shelf')[0];
const openModalBtn = document.getElementById('new');
const closeModalBtn = document.getElementById('closeBtn');
const deleteBtns = document.getElementsByClassName('delete');
const books = document.getElementsByClassName('book');
const toggleReadBtn = document.getElementsByClassName("toggleread");

const form = document.querySelector("form");
const done = document.getElementById('done');


// TEST STORAGE, TEST DEFAULT BOOK


// library object

let bookLibrary = [];
let bookIndx = 0;


// local storage

const saveToLocalStorage = () => {
    localStorage.setItem('storedBookLibrary', JSON.stringify(bookLibrary));
}

let storedInput = JSON.parse(localStorage.getItem('storedBookLibrary'));


if(storedInput){
    bookLibrary = storedInput;
    displayStroagedBooks();
}else{
    defaultBook();
}

// book object
class Book {
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

// function Book(){
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
// };


// book on loading
function defaultBook(){
    const firstBook = new Book;
    firstBook.title = "The Lord Of The Rings";
    firstBook.author = "J. R. R. Tolkien";
    firstBook.pages = "1178";
    firstBook.read = "Yes";
    bookLibrary.push(firstBook);
    displayPushedBook();
}


// books from form

function addBookToLibrary(){
    event.preventDefault();
    const newBook = new Book;
    newBook.title = document.getElementById('title').value;
    newBook.author = document.getElementById('author').value;
    newBook.pages = document.getElementById('pages').value;
    
    if(document.getElementById('yes').checked == true){
        newBook.read = "No";
    }else if (document.getElementById('no').checked == true){ 
        newBook.read = "Yes";
    }
    
    bookIndx = bookLibrary.length;

    bookLibrary.push(newBook);
    displayPushedBook();

    modal.style.display = 'none';

    form.reset();

    Array.from(deleteBtns).forEach(button => {
        button.addEventListener("click", deleteBook);
    });

    Array.from(toggleReadBtn).forEach(btn => {
        btn.addEventListener("click", toggleRead);
    })

    saveToLocalStorage();
    
}

// display books


function displayBooks(book){

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
        read.className = "readstatus";
        div.appendChild(read);

        const toggleRead = document.createElement("button");
        if(book.read === "Yes"){
            toggleRead.className = "toggleread";
            read.textContent = read.textContent + " " + "🤓";

        }else {
            toggleRead.className = "toggleread no";
            read.textContent = read.textContent + " " + "😞";
            titleDiv.className = "titleno";
            title.className = "h2no";
            author.className = "h3no";
            pages.className = "h3no";
            read.style.color = "rgb(143, 127, 118)"
        }
        div.appendChild(toggleRead);

        const toggleIcon = document.createElement("i");
        toggleIcon.className = "far fa-edit";
        toggleRead.appendChild(toggleIcon);


     idMatchIndex();
    
}

function displayPushedBook(){

    let pushedBook = bookLibrary[bookLibrary.length - 1];

    bookLibrary.forEach(book => {

     if(book === pushedBook){   
         
        displayBooks(book);
     
    }
})
};

// display storaged books

function displayStroagedBooks(){

    bookLibrary.forEach(book => {
        
displayBooks(book)
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
    saveToLocalStorage();
    idMatchIndex();
}


// toggle read function

function toggleRead(){
    const btn = this;
    const book = this.parentElement;
    const title = book.childNodes[0];
    const titleh2 = title.childNodes[1];
    const author = book.childNodes[1];
    const pages = book.childNodes[2];

    const read = document.getElementsByClassName("readstatus");

    btn.classList.toggle("no")

Array.from(read).forEach(read => {

    if(btn.className === "toggleread no" && read.parentElement === book){
        read.textContent = "Read: No 😞";
        bookLibrary[book.id].read = "No";
        title.className = "titleno";
        titleh2.className = "h2no";
        author.className = "h3no";
        pages.className = "h3no";
        read.style.color = "rgb(143, 127, 118)"

    } else if (btn.className === "toggleread" && read.parentElement === book){
        read.textContent = "Read: Yes 🤓";
        bookLibrary[book.id].read = "Yes";
        title.className = "title";
        titleh2.classList.remove("h2no");
        author.classList.remove("h3no");
        pages.classList.remove("h3no");
        read.style.color = "rgb(78, 151, 151)"
    }

    saveToLocalStorage();

})
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

Array.from(toggleReadBtn).forEach(btn => {
    btn.addEventListener("click", toggleRead);
})

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);


