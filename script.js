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

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let newTask = {
        name: input.value,
        category: category.value,
        date: date.value,
        priority: priority.value,
        completed: false
    };

    tasks.push(newTask);

    input.value = "";
    date.value = "";

    save();
    show();
});

function show() {
    list.innerHTML = "";

    let done = 0;
    let notDone = 0;

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        if (task.completed == true) {
            done++;
        } else {
            notDone++;
        }

        if ((filter == "All" || task.category == filter) &&
            task.name.toLowerCase().includes(search.value.toLowerCase())) {

            let item = document.createElement("div");
            item.className = "task-item";

            if (task.completed == true) {
                item.className = "task-item completed";
            }

            let check = document.createElement("input");
            check.type = "checkbox";
            check.checked = task.completed;

            check.addEventListener("change", function() {
                task.completed = check.checked;
                save();
                show();
            });

            let info = document.createElement("div");
            info.className = "task-info";


            let name = document.createElement("h3");
            name.textContent = task.name;

            
            let details = document.createElement("p");

            details.textContent = task.category + " | " +

                task.priority + " Priority | " +
                (task.date || "No date");

            let del = document.createElement("button");

            del.textContent = "Delete";
            del.className = "delete-btn";

            del.addEventListener("click", function() {

                tasks.splice(tasks.indexOf(task), 1);

                save();
                show();
            });

            info.appendChild(name);
            info.appendChild(details);


            item.appendChild(check);
            item.appendChild(info);
            item.appendChild(del);


            list.appendChild(item);
        }
    }


    finished.textContent = done;
    unfinished.textContent = notDone;


    if (list.children.length == 0) {

        document.getElementById("empty-message").style.display = "block";

    } else {

        document.getElementById("empty-message").style.display = "none";

    }
    
}

let buttons = document.querySelectorAll(".filter");


for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function() {
        filter = buttons[i].getAttribute("data-filter");


        for (let j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove("active");
        }


        buttons[i].classList.add("active");
        show();
    });
}

search.addEventListener("input", function() {
    show();
});

show();