function display() {
    //console.log to test function//
    console.log("hello i am a color");
}

//fetches moods.json so we can access the data
fetch("./moods.json")
    .then(function (response) {
    return response.json();
    })
    .then(function (data){ //do something with the data
        const moodList = document.getElementById("moodList");

        for (let i = 0; i < data.Moods.length; i++) {
            let moodItem = data.Moods[i].keywords[0];
            let listItem = document.createElement("li");
            listItem.textContent = moodItem;
            moodList.appendChild(listItem);
          };
    })
    .catch(function (error){
    console.error("Something went wrong with retrieving the moods.");
    console.error(error);
    })