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
  i.addEventListener("click", () => {
    modal.showModal();
  });
}

function display(color){ //is called using onclick for now, gets the button's ID as a parameter
  const popup = document.getElementById("popup");
  const entries = ["Gefühle", "Beispiele", "Körperliches", "Mentales", "Mögliche Strategien"];
  let info = document.createElement('div');
  popup.innerHTML = "";
  let btn = document.createElement('button');
  btn.className = "button close-button";
  btn.innerHTML = "schließen";

  for(let i in moodsData.Moods){
      if(moodsData.Moods[i].color === color){
          const keys = Object.keys(moodsData.Moods[i]);
          for(let j = 1; j < keys.length; ++j){
            let headline = document.createElement('h3');
            headline.innerHTML = entries[j-1];
            info.append(headline);
            info.append(fillList(moodsData.Moods[i], keys[j]));
          }
      }
  }

  info.append(btn);
  popup.append(info);

  const closeModal = document.querySelector(".close-button");
  closeModal.addEventListener("click", () => {
    modal.close();
  });
}


function fillList(mood, listId){ //fills the specified HTML list with correct content from the specified mood

  console.log(listId);
  let list = document.createElement('ul');

  for(let i in mood[listId]){
    let el = document.createElement('li');
    el.innerText = mood[listId][i];
    console.log(el);
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

accordionSwitch(accordionSection,"on")
accordionSwitch(accordionBtn,"on")
