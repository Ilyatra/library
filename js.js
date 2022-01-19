let myLibrary = [];
let currentOrderBy = '';

function Book(title, author, pages, isRead, containerLength) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function(){
        return `${this.title} by ${author}, ${pages} pages, 
                ${isRead ? "it is read" : "not read yet"}`;
    }
}

function addToLocalLibrary(title, author, pages, isRead) {
    let localLibrary = JSON.parse(window.localStorage.getItem('library')) || [];
    let book = new Book(title, author, pages, isRead);
    localLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(localLibrary));
}

function updateMyLibrary() {
    const localLibrary = JSON.parse(window.localStorage.getItem('library'));
    myLibrary = localLibrary.map((item, index) => {
        let book = {};
        book.title = item.title;
        book.author = item.author;
        book.pages = item.pages;
        book.isRead = item.isRead;
        book.id = index;
        return book;
    }) || [];
}

function addBookToLibrary(title, author, pages, isRead, containerLength) {
    let book = new Book(title, author, pages, isRead, containerLength);
    myLibrary.push(book);
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function submitNewBook(event) {
    const elem = event.target;
    addToLocalLibrary(elem.title.value, elem.author.value, elem.pages.value, 
        elem['is-read'].checked);
    updateMyLibrary();
}

function sortMyLibrary(order) {
    currentOrderBy = order;
    switch (order) {
        case 'titleD':
            myLibrary.sort((a, b) => a.title > b.title);
            break;
        case 'titleU':
            myLibrary.sort((a, b) => a.title < b.title);
            break;
        case 'authorD':
            myLibrary.sort((a, b) => a.author > b.author);
            break;
        case 'authorU':
            myLibrary.sort((a, b) => a.author < b.author);
            break;
    }
}

function changeOrder(e) {
    let orderStr = e.target.firstChild.textContent.trim().split(' ')[0];
    if (!e.target.classList.contains('order-by__item_active')) {
        const oldOrderBy = document.querySelector('.order-by__item_active');
        oldOrderBy.classList.remove('order-by__item_active');
        let icon = oldOrderBy.querySelector('.fas');
        if (icon.classList.contains('fa-sort-up')) {
            icon.classList.remove('fa-sort-up');
            icon.classList.add('fa-sort-down');
        }
        e.target.classList.add('order-by__item_active');
        sortMyLibrary(orderStr + 'D');
        renderNav();
        return;
    }

    let icon = e.target.querySelector('.fas');
    if (icon.classList.contains('fa-sort-down')){
        icon.classList.remove('fa-sort-down');
        icon.classList.add('fa-sort-up');
        sortMyLibrary(orderStr + 'U');
    }else{
        icon.classList.remove('fa-sort-up');
        icon.classList.add('fa-sort-down');
        sortMyLibrary(orderStr + 'D');
    }
    renderNav();
}

function blink(e) {
    let elem = document.querySelector(e.target.hash).firstChild;
    console.log(elem)
    elem.classList.add('blink');  
    setTimeout(()=>{
        elem.classList.remove('blink');
    }, 600)
}

// addBookToLibrary('La Légende et les Aventures héroïques, joyeuses et glorieuses d\'Ulenspiegel et de Lamme Goedzak au pays de Flandres et ailleurs','Charles-Theodore-Henri De Coster','580','false', myLibrary.length);
// addBookToLibrary('The History and Remarkable Life of the truly Honourable Col. Jacque, commonly call\'d Col. Jack, who was Born a Gentleman, put \'Prentice to a Pick−Pocket, was Six and Twenty Years a Thief, and then Kidnapp\'d to Virginia, Came back a Merchant; was Five times married to Four Whores; went into the Wars, behav\'d bravely, got Preferment, was made Colonel of a Regiment, came over, and fled with the Chevalier, is still abroad compleating a Life of Wonders, and resolves to dye a General.','Daniel Defoe','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('La Légende et les Aventures héroïques, joyeuses et glorieuses d\'Ulenspiegel et de Lamme Goedzak au pays de Flandres et ailleurs','Charles-Theodore-Henri De Coster','580','false', myLibrary.length);
// addBookToLibrary('The History and Remarkable Life of the truly Honourable Col. Jacque, commonly call\'d Col. Jack, who was Born a Gentleman, put \'Prentice to a Pick−Pocket, was Six and Twenty Years a Thief, and then Kidnapp\'d to Virginia, Came back a Merchant; was Five times married to Four Whores; went into the Wars, behav\'d bravely, got Preferment, was made Colonel of a Regiment, came over, and fled with the Chevalier, is still abroad compleating a Life of Wonders, and resolves to dye a General.','Daniel Defoe','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('Book','Author','223','false', myLibrary.length);
// addBookToLibrary('Second book','Another author','549','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('13','13','222','false', myLibrary.length);
// addBookToLibrary('La Légende et les Aventures héroïques, joyeuses et glorieuses d\'Ulenspiegel et de Lamme Goedzak au pays de Flandres et ailleurs','Charles-Theodore-Henri De Coster','580','false', myLibrary.length);
// addBookToLibrary('The History and Remarkable Life of the truly Honourable Col. Jacque, commonly call\'d Col. Jack, who was Born a Gentleman, put \'Prentice to a Pick−Pocket, was Six and Twenty Years a Thief, and then Kidnapp\'d to Virginia, Came back a Merchant; was Five times married to Four Whores; went into the Wars, behav\'d bravely, got Preferment, was made Colonel of a Regiment, came over, and fled with the Chevalier, is still abroad compleating a Life of Wonders, and resolves to dye a General.','Daniel Defoe','549','false', myLibrary.length);
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
    let navElem = document.querySelector('.nav');
    let elemArr = myLibrary.map((elem) => {
        let navItem = document.createElement('a');
        navItem.classList.add('nav__item');
        navItem.innerHTML = elem.title;
        navItem.href = '#a' + elem.id;
        navItem.addEventListener('click', blink);
        return navItem;
    });

    while (navElem.lastChild) {
        navElem.removeChild(navElem.lastChild);
    }
    navElem.append(...elemArr);
}

function renderBookCard(index) {
    const book = myLibrary[index];

    function cut(str) {
        return str.slice(0, 77) + '…';
    }

    let wrapper = document.createElement('div');
    wrapper.classList.add('slider__book-card');
    wrapper.setAttribute('id', 'a' + book.id);

    let bookCardElem = document.createElement('div');
    bookCardElem.classList.add('book-card');

    let titleElem = document.createElement('h2');
    titleElem.classList.add('book-card__title');
    if (book.title.length > 22) titleElem.style.fontSize = '17px';
    if (book.title.length > 77) {
        titleElem.innerHTML = cut(book.title);   
    }else{
        titleElem.innerHTML = book.title;   
    }
     
    bookCardElem.append(titleElem);
    
    let authorElem = document.createElement('span');
    authorElem.classList.add('book-card__author');
    if (book.author.length > 22) authorElem.style.fontSize = '14px';
    if (book.author.length > 77) {
        authorElem.innerHTML = cut(book.author);   
    }else{
        authorElem.innerHTML = book.author;   
    }
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
    let removeIcon = document.createElement('i');
    removeIcon.classList.add('fas', 'fa-backspace')
    removeButton.classList.add('book-card__remove', 'button');
    removeButton.append(removeIcon);
    removeButton.addEventListener('click', removeBook);
    bookCardElem.append(removeButton);
    
    wrapper.append(bookCardElem);
    wrapper.append(removeButton);
    
    document.querySelector('.slider').append(wrapper);
}

function renderSlider() {
    const sliderElem = document.querySelector('.slider');

    while (sliderElem.lastChild) {
        sliderElem.removeChild(sliderElem.lastChild);
    }

    myLibrary.forEach((element, index) => {
        renderBookCard(index);
    });
    let addNewBookButton = document.createElement('button');
    addNewBookButton.classList.add('button', 'add-book-button', 'fas', 'fa-plus');
    sliderElem.appendChild(addNewBookButton);
}

function showModalWindowNewBook() {
    document.querySelector('.body__modal').classList.toggle('not-visible');
}

function removeBook() {
    const id = this.parentElement.id.slice(1);
    console.log(id)
    let localLibrary = JSON.parse(window.localStorage.getItem('library'));
    localLibrary.splice(id, 1);
    localStorage.setItem('library', JSON.stringify(localLibrary));
    updateMyLibrary();
    sortMyLibrary(currentOrderBy)
    renderNav();
    renderSlider();
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
    updateMyLibrary();
    renderSlider();
    if (myLibrary.length) {
        sortMyLibrary('titleD');
        renderNav();
    }
}

document.querySelectorAll('.add-book-button')[0]
    .addEventListener('click', showModalWindowNewBook);
document.querySelector('.modal__cancel')
    .addEventListener('click', showModalWindowNewBook);
document.querySelector('.modal__submit')
    .addEventListener('click', submitNewBook)
document.querySelector('.order-by')
    .addEventListener('click', changeOrder); 