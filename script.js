let moodsData;

//fetches moods.json so we can access the data
fetch("./moods.json")
.then(res => res.json())
.then(data =>{
    moodsData = data;
}).then(() => {
    console.log(moodsData);
    showKeywords();
})
.catch(function (error){
    console.error("Something went wrong with retrieving the moods.");
    console.error(error);
});


function showKeywords(){
    let moodElements = document.querySelectorAll(".keywords"); // selects all elements with the class="keywords"

    for (let i in moodsData.Moods) { //iterates thru data.Moods and appends the first keyword of each mood to "p"
        let moodItem = moodsData.Moods[i].keywords[0];
        let listItem = document.createElement("p");
        listItem.textContent = moodItem;
        moodElements[i].appendChild(listItem);
    }
}


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


const moodList = document.getElementById("moodList"); //HTML lists that are filled with the corresponding text each time display is called
const examples = document.getElementById("examples");
const body = document.getElementById("body");
const mind = document.getElementById("mind");
const strategy = document.getElementById("strategy");

function display(color){ //is called using onclick for now, gets the button's ID as a parameter
    moodList.innerHTML = ""; //all lists are emptied first
    examples.innerHTML = "";
    body.innerHTML = "";
    mind.innerHTML = "";
    strategy.innerHTML = "";
    document.getElementById("colorName").innerText = color;

    for(let i in moodsData.Moods){ //each for loop within this one fills one of the lists
        if(moodsData.Moods[i].color === color){
            for(let j in moodsData.Moods[i].keywords){
              let el = document.createElement('li');
              el.innerText = moodsData.Moods[i].keywords[j];
              moodList.appendChild(el);
            }
            for(let j in moodsData.Moods[i].examples){
              let el = document.createElement('li');
              el.innerText = moodsData.Moods[i].examples[j];
              examples.appendChild(el);
            }
            for(let j in moodsData.Moods[i].body){
              let el = document.createElement('li');
              el.innerText = moodsData.Moods[i].body[j];
              body.appendChild(el);
            }
            for(let j in moodsData.Moods[i].mind){
              let el = document.createElement('li');
              el.innerText = moodsData.Moods[i].mind[j];
              mind.appendChild(el);
            }
            for(let j in moodsData.Moods[i].strategy){
              let el = document.createElement('li');
              el.innerText = moodsData.Moods[i].strategy[j];
              strategy.appendChild(el);
            }
        }
    }
}