let moodsData;

//fetches moods.json so we can access the data
fetch("./moods.json")
.then(res => res.json())
.then(data =>{
    moodsData = data;
}).then(() => {
    //console.log(moodsData);
    showKeywords();
    retrieveColors();
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
  //returning colorbutton to original position
  ZoomEnd();
  };
});
//close modal by using button//
//closeModal.addEventListener("click", closeDialog);


/*dymamic popup generation*/
function display(color){ //is called using onclick for now, gets the button's ID as a parameter
var zoomHere = document.getElementsByClassName("zoom");
for(let i=0; i<zoomHere.length;i++){
  zoomHere[i].classList.remove("zoom")
  }


var zoomed = document.getElementById(color);//needed to know what was clicked, move it and give zoom to it
const colorbuttonList = document.getElementsByClassName("colorbutton")//needed to give/take the hoverables 
zoomed.classList.add("zoom")
for(let i = 0; i<colorbuttonList.length; i++){
  colorbuttonList[i].classList.remove("hoverable")
}


//Pop Up
  const popup = document.querySelector(".popUpBox");
  let accordion = document.createElement('div');
  accordion.className = "accordion";
  popup.innerHTML = "";
  const entries = ["Gefühle", "Beispiele", "Körper", "Gedanken", "Strategien"]; //used for headlines
  const gridList = ["one", "two", "three", "four"]
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
            let accordionBtn = document.createElement('button');
            accordionBtn.className = "accordionBtn";
        
            let headline = document.createElement('h3');
            headline.innerHTML = entries[j-1];
            headline.className = "headline";
        
            let content = document.createElement('div');
            content.className = "accordionContent";
            content.append(createList(moodsData.Moods[i], keys[j]));
        
            accordionBtn.append(headline); //all the accordions are appended to an accordion container
            //section.append(accordionBtn);
            accordion.append(accordionBtn);
            accordion.append(content);
          }

/*
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
          }*/
      }
  }

  popup.append(accordion); //the accordion and the close button are appended to the dialog

  accSwitch()
 // accordionSwitch();/
 // accordionSwitch(accordionBtn);
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
/*const accordionSection = document.getElementsByClassName('accordionSection');
const accordionBtn = document.getElementsByClassName('accordionBtn');

function accordionSwitch(which){
  for (let i=0; i<which.length; i++) {
  if(which[i].classList.contains("active")){
      which.addEventListener('click', function () {
        console.log("145")
      accordionBtn.style.content = "\25B6";
      this.classList.remove('active')
      })
    }
  }
    for (let i=0; i<which.length; i++) {
      which[i].addEventListener('click', function () {
      console.log("153")
      accordionBtn[i].style.content = "\25BC";
      this.classList.add('active')
      })
    }
}*//*
function accordionSwitch(){
  const accordionSection = document.getElementsByClassName('accordionSection');
  const accordionBtn = document.getElementsByClassName('accordionBtn');
  for (let i=0; i<accordionBtn.length; i++) {
    accordionBtn[i].addEventListener('click', function () {
      console.log(this.style)
    this.classList.toggle('active')
    })
  }
  for (let i=0; i<accordionSection.length; i++) {
    accordionSection[i].addEventListener('click', function () {
    this.classList.toggle('active')
    })
  }
}*/
function accSwitch(){
var acc = document.getElementsByClassName("accordionBtn");
for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    //var panel = this.nextElementChild
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
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
    colorNavButtons("left");
  }

  else if (x === 0){ //checks if the user is at the left border
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
    colorNavButtons("right");
  }

  else{ //when the user is not at any of the borders, both buttons are displayed
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    colorNavButtons("left");
    colorNavButtons("right");
  }


  //checks if the user is at the bottom or top of the grid
  if(y === 0){
    upBtn.style.display = "none";
    downBtn.style.display = "inline-block";
    colorNavButtons("down");
  }

  else if(y === 1){
    upBtn.style.display = "inline-block";
    downBtn.style.display = "none";
    colorNavButtons("up");
  }
}

//colors the nav buttons. the color is read from the buttons in the grid itself
function colorNavButtons(btn){
  let color;
  let targetBtn;

  switch (btn){
    case "left":
      targetBtn = getComputedStyle(document.getElementById(colors[y][x-1]));
      color = targetBtn.getPropertyValue("background-color");
      prevBtn.style.backgroundColor = color;
      break;

    case "right":
      targetBtn = getComputedStyle(document.getElementById(colors[y][x+1]));
      color = targetBtn.getPropertyValue("background-color");
      nextBtn.style.backgroundColor = color;
      break;

    case "up":
      targetBtn = getComputedStyle(document.getElementById(colors[y-1][x]));
      color = targetBtn.getPropertyValue("background-color");
      upBtn.style.backgroundColor = color;
      break;

    case "down":
      targetBtn = getComputedStyle(document.getElementById(colors[y+1][x]));
      color = targetBtn.getPropertyValue("background-color");
      downBtn.style.backgroundColor = color;
      break;
  }
}

//event listeners for when the nav buttons are clicked
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


//dark mode
const darkModeSwitch = document.getElementById("darkModeSwitch");

darkModeSwitch.addEventListener("click", () => { //toggles the theme when the switch is clicked, also saves theme to localstorage
  document.body.classList.toggle("darkMode");

  if(document.body.classList.contains("darkMode")){
    localStorage.setItem("darkMode", "true");
  }
  else{
    localStorage.setItem("darkMode", "false");
  }
});

if(localStorage.getItem("darkMode") === "true"){ //checks if dark mode is true in localstorage and sets theme accordingly
  darkModeSwitch.checked = true;
  document.body.classList.add("darkMode");
}
else{
  darkModeSwitch.checked = false;
  document.body.classList.remove("darkMode");
}

// customizable colors

//gets userinput and inserts color into the right button
function changeColor(id, input){
  let userColor = document.getElementById(input).value;
    document.getElementById(id).style.backgroundColor = userColor;
    localStorage.setItem(id, userColor);
}

//toggles visibility of color change option
/*function showColors() {
  var x = document.getElementById("changeColor");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}*/


const colorPopUp = document.getElementById("changeColor");
const toggleButton = document.getElementById("toggleButton");

//stopPropagation means we have handled the click elsewhere and it doesn't need to apply to whole document
colorPopUp.addEventListener("click", (e) => {
  e.stopPropagation();
});

//closes color picker by clicking outside or on button
document.addEventListener("click", (e) => {
  //checks if click is inside color picker, in which case doesn't close
  if (
    (e.target === toggleButton || toggleButton.contains(e.target)) ||
    (e.target === colorPopUp || colorPopUp.contains(e.target))
  ) {
  } else {
    //The click is outside, close the colorpicker
    colorPopUp.classList.remove("show");
  }
});

// Toggle the colorPopUp when clicking the toggle button
toggleButton.addEventListener("click", () => {
  colorPopUp.classList.toggle("show");
});

/*local storage for user preferences*/
function retrieveColors() {
  for(let i of moodsData.Moods){
    if(localStorage.getItem(i.color) != undefined){
      document.getElementById(i.color).style.backgroundColor = localStorage.getItem(i.color);
    }
  }
}

//zoom
function ZoomEnd(){//remove zoom add hoverable and with that return colorbutton to original position
  var zoomed = document.getElementsByClassName("zoom")
  const colorbuttonList = document.getElementsByClassName("colorbutton")

  for(let i=0; i<colorbuttonList.length; i++){
    colorbuttonList[i].classList.add("hoverable")
  }

  for(let i=0; i<zoomed.length;i++){
  zoomed[i].classList.remove("zoom")
  }
}

