"use strict";

const body = document.querySelector('body');
const books = document.querySelector('.books');
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('.newBook');
const formSubmit = document.querySelector('.formSubmit');

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// adds a book object to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// goes through all books in the library and displays them on the webpage
function displayAllBooks() {
    function read(book) {
        if (book.read) {
            return "read";
        }
        else {
            return "not read"
        }
    }

    myLibrary.forEach(function(book) {
        let bookElement = document.createElement('div');
        bookElement.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${read(book)}`;
        books.appendChild(bookElement);
    });
}

// shows the form on click
newBook.onclick = () => {
    dialog.show()
};

// takes form results, create a new book, and add it to the library
function submitForm(event) {
    const title = ;
    const author = ;
    const pages = ;
    const read = ;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    event.preventDefault();
}

formSubmit.addEventListener("click", submitForm);
