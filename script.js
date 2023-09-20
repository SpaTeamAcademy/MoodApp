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


for(i of openModal){
  i.addEventListener("click", () => {
    modal.showModal();
  });
}

function display(color){ //is called using onclick for now, gets the button's ID as a parameter
  const popup = document.getElementById("popup");
  let info = document.createElement('div');
  popup.innerHTML = "";
  let btn = document.createElement('button');
  btn.className = "button close-button";
  btn.innerHTML = "schließen";

  for(let i in moodsData.Moods){
      if(moodsData.Moods[i].color === color){
          info.append(fillList(moodsData.Moods[i], "keywords"));
          info.append(fillList(moodsData.Moods[i], "examples"));
          info.append(fillList(moodsData.Moods[i], "body"));
          info.append(fillList(moodsData.Moods[i], "mind"));
          info.append(fillList(moodsData.Moods[i], "strategy"));
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

  let list = document.createElement('ul');

  for(let i in mood[listId]){
      let el = document.createElement('li');
      el.innerText = mood[listId][i];
      list.appendChild(el);
  }
    
  return list;
}
