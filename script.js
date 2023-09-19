//fetches moods.json so we can access the data
fetch("./moods.json")
    .then(function (response) {
    return response.json();
    })
    .then(function (data){ //now: do something with the data

        let moodElements = document.querySelectorAll(".keywords"); // selects all elements with the class="keywords"

        for (let i in data.Moods) { //iterates thru data.Moods and appends the first keyword of each mood to "p"
                let moodItem = data.Moods[i].keywords[0];
                let listItem = document.createElement("p");
                listItem.textContent = moodItem;
                moodElements[i].appendChild(listItem);
            }
    })
    .catch(function (error){
    console.error("Something went wrong with retrieving the moods.");
    console.error(error);
    })

/*opens and closes pop up*/
const modal = document.querySelector(".keywordPopup");
const openModal = document.querySelector(".colorbutton");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.close();
});




//accordion//
const accordionSection = document.getElementsByClassName('accordionSection');
const accordionBtn = document.getElementsByClassName('accordionBtn');

function accordionSwitch(which){
  for (let i=0; i<which.length; i++) {
    which[i].addEventListener('click', function () {
      this.classList.toggle('active')
    })
  }
}

accordionSwitch(accordionSection)
accordionSwitch(accordionBtn)