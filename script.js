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
const openModal = document.querySelectorAll(".colorbutton");
const closeModal = document.querySelector(".close-button");

for(i of openModal){
  i.addEventListener("click", () => {
    modal.showModal();
  });
}

closeModal.addEventListener("click", () => {
  modal.close();
});


const moodList = document.getElementById("moodList"); //HTML Liste mit den Keywords
const examples = document.getElementById("examples");
const body = document.getElementById("body");
const mind = document.getElementById("mind");
const strategy = document.getElementById("strategy");

function display(color){ //bekommt in color die ID übergeben
    moodList.innerHTML = "";
    examples.innerHTML = "";
    body.innerHTML = "";
    fetch('moods.json')
    .then(res => res.json())
    .then(function(data){
      document.getElementById("colorName").innerText = color;
      
        for(let i in data.Moods){
            if(data.Moods[i].color === color){
                for(let j in data.Moods[i].keywords){
                  //console.log(data.Moods[i].keywords[j]);
                  let el = document.createElement('li');
                  el.innerText = data.Moods[i].keywords[j];
                  moodList.appendChild(el);
                }
                for(let j in data.Moods[i].examples){
                  let el = document.createElement('li');
                  el.innerText = data.Moods[i].examples[j];
                  examples.appendChild(el);
                }
                for(let j in data.Moods[i].body){
                  let el = document.createElement('li');
                  el.innerText = data.Moods[i].body[j];
                  body.appendChild(el);
                }
                for(let j in data.Moods[i].mind){
                  let el = document.createElement('li');
                  el.innerText = data.Moods[i].mind[j];
                  mind.appendChild(el);
                }
                for(let j in data.Moods[i].strategy){
                  let el = document.createElement('li');
                  el.innerText = data.Moods[i].strategy[j];
                  strategy.appendChild(el);
                }
            }
        }
    });
}