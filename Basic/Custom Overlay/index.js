let openBtn = document.querySelector('#open-btn');
let modalContainer = document.querySelector('#modal-container');
let closeBtn = document.querySelector('#close-btn');

// Event

openBtn.addEventListener('click', function () {
    modalContainer.style.display = 'block';
});

closeBtn.addEventListener('click', function () {
    modalContainer.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target == modalContainer) {
        modalContainer.style.display = 'none';
    }
});