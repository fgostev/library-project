const modal = document.getElementById('modalForm');
const openModalBtn = document.getElementById('new');
const closeModalBtn = document.getElementById('closeBtn');

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

// check the radioboxes
// check the required


function addBookToLibrary(){
    const newBook = Object.create(Book)
    newBook.title = document.getElementById('title').value;
    newBook.author = document.getElementById('author').value;
    newBook.pages = document.getElementById('pages').value;
    
    if(document.getElementById('yes').checked == true){
        newBook.read = "no";
    }else if ((document.getElementById('no').checked == true)){ 
        newBook.read = "yes";
    }
    
    bookLibrary.push(newBook);
    event.preventDefault();
    modal.style.display = 'none';
    form.reset();
}

console.log(bookLibrary);

// function for modal

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

    function testResults (form) {
        var TestVar = form.inputbox.value;
        alert ("You typed: " + TestVar);
    }


done.addEventListener("click", addBookToLibrary);



openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', clickOutside);