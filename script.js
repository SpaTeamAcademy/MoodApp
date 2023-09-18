function display() {
    /*console.log to test function*/
    console.log("hello i am a color");
}

/*opens and closes pop up*/
const modal = document.querySelector(".keywords");
const openModal = document.querySelector(".colorbutton");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});
