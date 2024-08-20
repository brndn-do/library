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
    this.deleted = false;
}

Book.prototype.changeReadStatus = function() {
    if (this.read === "read") {
        this.read = "not read";
    }
    else {
        this.read = "read";
    }
}

// "deletes" the book without changing the array
Book.prototype.delete = function() {
    this.deleted = true;
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
    const read = document.querySelector('input[name="read?"]:checked').value;
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    resetForm();
    dialog.close();
    displayAllBooks();
}

formSubmit.addEventListener("click", submitForm);
