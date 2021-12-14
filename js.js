let myLibrary = [];

function Book(title, author, pages, isRead, containerLength) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = containerLength;

    this.info = function(){
        return `${this.title} by ${author}, ${pages} pages, 
                ${isRead ? "it is read" : "not read yet"}`;
    }
}

function addBookToLibrary(title, author, pages, isRead, containerLength) {
    let book = new Book(title, author, pages, isRead, containerLength);
    myLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function submitNewBook(event) {
    const elem = event.target;
    addBookToLibrary(elem.title.value, elem.author.value, elem.pages.value, 
        elem['is-read'].checked, myLibrary.length);
}

// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);

function renderNav() {
    let elemArr = myLibrary.map(elem => {
        let navItem = document.createElement('span');
        navItem.innerHTML = elem.title;
        navItem.dataset.bookId = elem.id;
        navItem.addEventListener('click', selectBook);
        return navItem;
    });
    document.querySelector('.nav').append(...elemArr);
}

function renderBookCard(id) {
    const book = myLibrary[id];
    let bookCardElem = document.createElement('div');
    bookCardElem.classList.add('book-card');
    bookCardElem.dataset.bookId = book.id

    let titleElem = document.createElement('h2');
    titleElem.classList.add('book-card__title');
    titleElem.innerHTML = book.title;    
    bookCardElem.append(titleElem);
    
    let authorElem = document.createElement('span');
    authorElem.classList.add('book-card__author');
    authorElem,innerHTML = book.author;
    bookCardElem.append(authorElem);

    let pagesElem = document.createElement('span');
    pagesElem.classList.add('book-card__pages');
    pagesElem.innerHTML = 'pages: ' + book.pages;
    bookCardElem.append(pagesElem);

    let isReadElem = document.createElement('span');
    isReadElem.classList.add('book-card__is-read');
    isReadElem.innerHTML = `${book.isRead === true ? "it is read" : "not read yet"}`;
    bookCardElem.append(isReadElem);

    let removeButton = document.createElement('button');
    removeButton.classList.add('book-card__remove', 'button');
    removeButton.innerHTML = 'Remove';
    bookCardElem.append(removeButton);
    bookCardElem.addEventListener('click', removeBook);
    
    document.querySelector('.slider').append(bookCardElem);

    // document.querySelector('.book-card').dataset.bookId = book.id;
    // document.querySelector('.book-card__title').innerHTML = book.title;
    // document.querySelector('.book-card__author').innerHTML = book.author;
    // document.querySelector('.book-card__pages').innerHTML = 'pages: ' + book.pages;
    // document.querySelector('.book-card__is-read').innerHTML = `${book.isRead === true ? "it is read" : "not read yet"}`;
}

function showModalWindowNewBook() {
    document.querySelector('.body__modal').classList.toggle('not-visible');
}

function selectBook() {
    renderBookCard(this.dataset.bookId);
}

function removeBook() {
    const id = document.querySelector('.book-card').dataset.bookId;
    myLibrary.splice(id, 1);
    let localLibrary = JSON.parse(window.localStorage.getItem('library'));
    localLibrary.splice(id, 1);
    localStorage.setItem('library', JSON.stringify(localLibrary));
    // window.localStorage.removeItem([library[id]]);
    console.log(myLibrary)
}

function storageAvailable() {
	try {
		let storage = window.localStorage,
		    x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

if (storageAvailable()) {
    // localStorageLibrary = JSON.parse(window.localStorage.getItem('library'));
    // localStorage.setItem('library', JSON.stringify(myLibrary));
    myLibrary = JSON.parse(window.localStorage.getItem('library'));
    console.log(JSON.parse(window.localStorage.getItem('library'))[2])
    console.log(myLibrary);
}

document.querySelector('.add-book-button')
    .addEventListener('click', showModalWindowNewBook);
document.querySelector('.modal')
    .addEventListener('submit', submitNewBook)
// document.querySelector('.book-card__remove')
//     .addEventListener('click', removeBook)

renderNav();
myLibrary.forEach((element, index) => {
    renderBookCard(index);
});
