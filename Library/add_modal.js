let modal = document.querySelectorAll(".modal");
let trigger = document.querySelectorAll(".man_button");
let closeButton = document.querySelectorAll(".close-button");

function toggleModal() {
    modal[0].classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal[0]) {
        toggleModal();
    }
}

trigger[0].addEventListener("click", toggleModal);
closeButton[0].addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function toggleModal2() {
    modal[1].classList.toggle("show-modal");
}

function windowOnClick2(event) {
    if (event.target === modal[1]) {
        toggleModal2();
    }
}

trigger[1].addEventListener("click", toggleModal2);
closeButton[1].addEventListener("click", toggleModal2);
window.addEventListener("click", windowOnClick2);