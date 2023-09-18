function display() {
    //console.log to test function//
    console.log("hello i am a color");
}

const modal = document.querySelector(".keywords");
const openModal = document.querySelector(".colorbutton");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});




//accordion//
const accordion = document.getElementsByClassName('accordionSection');

for (let i=0; i<accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active')
  })
}