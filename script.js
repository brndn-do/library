"use strict";

const body = document.querySelector('body');
const books = document.querySelector('.books');
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('.newBook');
const formSubmit = document.querySelector('.formSubmit');

const myLibrary = [];

class Book {
    #title;
    #author;
    #pages;
    #read;
    #deleted;

    constructor(title, author, pages, read) {
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
        this.#deleted = false;
    }

    get title() {return this.#title;}
    get author() {return this.#author;}
    get pages() {return this.#pages;}
    get read() {return this.#read;}
    get deleted() {return this.#deleted;}

    changeReadStatus() {
        if (this.#read === "read") {
            this.#read = "not read";
        }
        else {
            this.#read = "read";
        }
    }

    delete() {
        this.#deleted = true;
    }
}

// adds a book object to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBook(event) {
    let index = event.target.parentNode.parentNode.id;
    myLibrary[index].delete();
    displayAllBooks();
}

function changeReadStatus(event) {
    let index = event.target.parentNode.parentNode.id;
    let book = myLibrary[index];
    book.changeReadStatus();
    displayAllBooks();
}

// goes through all books in the library and displays them on the webpage
function displayAllBooks() {

    // removes all books currently on screen
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }

    myLibrary.forEach(function(book, index) {
        if (!book.deleted) {
            let bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.id = `${index}`;

            let bookText = document.createElement('div');
            bookText.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
            bookElement.appendChild(bookText);

            let buttons = document.createElement('div');

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener("click", removeBook);
            buttons.appendChild(removeButton);

            let readButton = document.createElement('button');
            readButton.textContent = 'Read/unread';
            readButton.addEventListener("click", changeReadStatus);
            buttons.appendChild(readButton);

            bookElement.appendChild(buttons);

            books.appendChild(bookElement);
        }
    });
}

// shows the form on click
newBook.onclick = () => {
    dialog.showModal()
};

// resets all values and unchecks radio button on form
function resetForm() {
    const form = document.querySelector('form');
    form.reset();
    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach(function(radio) {
        radio.checked = false;
    });
}

// takes form results, create a new book, and add it to the library
function submitForm(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const readInput = document.querySelector('input[name="read?"]:checked');

    if (!title || !author || !pages || !readInput) {
        alert("Please fill out all fields.");
        return;
    }

    const newBook = new Book(title, author, pages, readInput.value);
    addBookToLibrary(newBook);
    resetForm();
    dialog.close();
    displayAllBooks();
}

formSubmit.addEventListener("click", submitForm);
