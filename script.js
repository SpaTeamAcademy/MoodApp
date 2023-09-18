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