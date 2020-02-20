var modal = document.querySelectorAll(".modal");
var trigger = document.querySelectorAll(".man_button");
var closeButton = document.querySelectorAll(".close-button");
let idx = 0;
let i = 0;

function toggleModal() {
    console.log("Vegin: " + idx + " I: " + i)
    modal[i].classList.toggle("show-modal");
    console.log("Success")
}

function windowOnClick(event) {
    for (idx = 0; idx < modal.length; idx++) {
        if (event.target === modal[idx]) {
            i = idx
            toggleModal();
            break;
        }
    }
}

for (idx = 0; idx < trigger.length; idx++ ) {
    //console.log(idx)
    i = idx
    trigger[idx].addEventListener("click", toggleModal);
    closeButton[idx].addEventListener("click", toggleModal);
}

window.addEventListener("click", windowOnClick);
