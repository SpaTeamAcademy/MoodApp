let moodsData;

//fetches moods.json so we can access the data
fetch("./moods.json")
.then(res => res.json())
.then(data =>{
    moodsData = data;
}).then(() => {
    //console.log(moodsData);
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

for(i of openModal){
  i.addEventListener("click", (e) => {
    modal.showModal();
    modal.style.display = "grid";
  });
}

//close function for button and clicking outside modal//
function closeDialog() {
  modal.close();
  modal.style.display = "none";
}
//closing modal by clicking outside//
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
  closeDialog();
   //closing accordions when closing modal//
  accordionSwitch(accordionSection,"off");
  accordionSwitch(accordionBtn,"off")};
});
//close modal by using button//
//closeModal.addEventListener("click", closeDialog);


/*dymamic popup generation*/
function display(color){ //is called using onclick for now, gets the button's ID as a parameter
  const popup = document.querySelector(".popUpBox");
  let accordion = document.createElement('div');
  accordion.className = "accordion";
  popup.innerHTML = "";
  const entries = ["Gefühle", "Beispiele", "Körper", "Gedanken", "Strategien"]; //used for headlines
  /*let closeBtn = document.createElement('button');
  closeBtn.className = "button close-button";
  closeBtn.innerHTML = "schließen";*/

  getPosition(color);
  displayBtns();

  for(let i in moodsData.Moods){
      if(moodsData.Moods[i].color === color){ //checks which of the objects matches the ID
          const keys = Object.keys(moodsData.Moods[i]);
  
          let keywords = document.createElement('ul');//the keywords list is created, which is not an accordion
          keywords.append(createList(moodsData.Moods[i], "keywords"));
          popup.append(keywords); //the list is appended to the dialog element

          for(let j = 2; j < keys.length; ++j){ //the 4 accordions are created. the for loop iterates the object itself
            let section = document.createElement('div');
            section.className = "accordionSection";

            let accordionBtn = document.createElement('div');
            accordionBtn.className = "accordionBtn";

            let headline = document.createElement('h3');
            headline.innerHTML = entries[j-1];

            let content = document.createElement('div');
            content.className = "accordionContent";
            content.append(createList(moodsData.Moods[i], keys[j]));

            accordionBtn.append(headline); //all the accordions are appended to an accordion container
            section.append(accordionBtn);
            section.append(content);
            accordion.append(section);
          }
      }
  }

  popup.append(accordion); //the accordion and the close button are appended to the dialog
  //popup.append(closeBtn);

  accordionSwitch(accordionSection,"on");
  accordionSwitch(accordionBtn,"on");
  
  //for dynamically generating a close button
  /*const closeModal = document.querySelector(".close-button");
  closeModal.addEventListener("click", () => {
    modal.close();
  });*/
}


function createList(mood, listId){ //creates an unordered list and fills it using the specified values
  let list = document.createElement('ul');

  for(let i in mood[listId]){
    let el = document.createElement('li');
    el.innerText = mood[listId][i];
    list.appendChild(el);
  }
    
  return list;
}  

//accordion//
const accordionSection = document.getElementsByClassName('accordionSection');
const accordionBtn = document.getElementsByClassName('accordionBtn');

function accordionSwitch(which,mode){
  if(mode==="on"){
    for (let i=0; i<which.length; i++) {
      which[i].addEventListener('click', function () {
      this.classList.toggle('active')
      })
    }
  }
  if(mode==="off"){
    for(let i=0; i<which.length; i++){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
    }
  }
}

//navigation
const colors = [["violet", "red", "orange", "yellow"],["indigo", "blue", "turquoise", "green"]]; //2 dimensional array containing all the IDs corresponding to the grid positions
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const upBtn = document.querySelector(".upBtn");
const downBtn = document.querySelector(".downBtn");
const row = 2;
const col = 4;
let x = 0;
let y = 0;

function getPosition(color){ //checks which position in the grid the color is at
  for(let i = 0; i < row; ++i){
    for(let j = 0; j < col; ++j){
      if(color === colors[i][j]){
        x = j, y = i;
      }
    }
  }
}

function displayBtns(){ //labels the buttons with the colors left and right of the current one


    //if the color is at the grid's border, the button at the border's side will not be displayed
  if(x === 3){ //checks if the user is at the right border
    nextBtn.style.display = "none";
    prevBtn.style.display = "inline-block";
  }

  else if (x === 0){ //checks if the user is at the left border
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
  }

  else{ //when the user is not at any of the borders, both buttons are displayed
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
  }


  if(y === 0){
    upBtn.style.display = "none";
    downBtn.style.display = "inline-block";
  }

  else if(y === 1){
    upBtn.style.display = "inline-block";
    downBtn.style.display = "none";
  }
}

prevBtn.addEventListener("click", () => {
  x--;
  display(colors[y][x]);
  displayBtns();
});

nextBtn.addEventListener("click", () => {
  x++;
  display(colors[y][x]);
  displayBtns();
});

upBtn.addEventListener("click", () => {
  y--;
  display(colors[y][x]);
  displayBtns();
});

downBtn.addEventListener("click", () => {
  y++;
  display(colors[y][x]);
  displayBtns();
});