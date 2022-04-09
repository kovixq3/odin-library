let myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    myLibrary.push(this)
}

new Book ('asd', 'asd', 295, true);
new Book ('asd22', 'asd22', 29, false);

const library = document.querySelector('.library');

const addBookBtn = document.querySelector('#add-new-book');
const modalWarning = document.querySelector('.modal--warning');
addBookBtn.addEventListener('click', addBookToLibrary);
function addBookToLibrary () {
    let t = document.querySelector('#title');
    let a = document.querySelector('#author');
    let p = document.querySelector('#pages');
    let r = document.querySelector('#read');

    if (t.value && a.value && p.value) {
        new Book (t.value, a.value, p.valueAsNumber, r.checked);
        displayLibrary();
        modal.style.display = "none";
    } else {
        modalWarning.style.display = 'block';
        setTimeout(() => modalWarning.style.display = 'none', 2500);
    }
}

function displayLibrary() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }

    for (let index = 0; index < myLibrary.length; index++) {
        let e = myLibrary[index];
        let div = document.createElement('div');
        let p = document.createElement('p');
        let btnDelete = document.createElement('button');
        let btnChange = document.createElement('button');

        p.textContent = `${e.title} by ${e.author}, ${e.pages} pages, ${e.read}`;

        btnDelete.textContent = 'X';
        btnDelete.addEventListener('click', (e) => {
            myLibrary.splice(e.target.parentNode.dataset.book, 1)
            displayLibrary();
        });

        btnChange.textContent = 'Read';
        btnChange.addEventListener('click', (e) => {
            if (myLibrary[e.target.parentNode.dataset.book].read == true) {
                myLibrary[e.target.parentNode.dataset.book].read = false
            } else {
                myLibrary[e.target.parentNode.dataset.book].read = true
            }
            displayLibrary();
        });

        div.dataset.book = index;
        div.appendChild(p);
        div.appendChild(btnDelete);
        div.appendChild(btnChange);
        library.appendChild(div);
    }
}
displayLibrary();

function changeReadStatus() {
    // access thru array
    // mylibrary[0].read === true ? false : true
}

const modalBtn = document.querySelector('#modal-btn');
const modal = document.querySelector('.modal');
modalBtn.addEventListener('click', () => modal.style.display = 'flex');
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});