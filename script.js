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

    let children = document.querySelectorAll('.book')
    children.forEach(function(book) {
        books.removeChild(book);
    });

    myLibrary.forEach(function(book) {
        let bookElement = document.createElement('div');
        bookElement.className = 'book';
        bookElement.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
        books.appendChild(bookElement);
    });
}

// shows the form on click
newBook.onclick = () => {
    dialog.show()
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
    const read = document.querySelector('input[name="read?"]:checked').value;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    resetForm();
    dialog.close();
    displayAllBooks();
}

formSubmit.addEventListener("click", submitForm);
