let form = document.getElementById("task-form");
let input = document.getElementById("task-input");
let category = document.getElementById("category-input");
let date = document.getElementById("date-input");
let priority = document.getElementById("priority-input");

let list = document.getElementById("task-list");
let search = document.getElementById("search-input");

let finished = document.getElementById("finished");
let unfinished = document.getElementById("unfinished");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "All";

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if(input.value == "") {
        return;
    }


    tasks.push({
        name: input.value,
        category: category.value,
        date: date.value,
        priority: priority.value,
        completed: false
    });

    input.value = "";
    date.value = "";

    save();
    show();
});

function save() {
    localStorage.setItem
}

function show() {
    list.innerHTML = "";
    
    let done = 0;
    let notDone = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {

        } else {
            notDone++;
        }

        if ((filter == "All" || tasks[i].category == filter)
        )
    }
}