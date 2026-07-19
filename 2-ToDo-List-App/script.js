// ==========================
// SELECT ELEMENTS
// ==========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");
const filterTask = document.getElementById("filterTask");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ==========================
// SAVE TASKS
// ==========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==========================
// RENDER TASKS
// ==========================

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = [...tasks];

    // Search
    const keyword = searchTask.value.toLowerCase();

    filteredTasks = filteredTasks.filter(task =>
        task.text.toLowerCase().includes(keyword)
    );

    // Filter
    if (filterTask.value === "completed") {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    if (filterTask.value === "pending") {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    if (filteredTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <input
                type="checkbox"
                class="complete-btn"
                ${task.completed ? "checked" : ""}
            >

            <span class="task-text">${task.text}</span>

            <div class="task-actions">

                <button class="edit-btn">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

        // Complete Task
        li.querySelector(".complete-btn").addEventListener("change", () => {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });

        // Edit Task
        li.querySelector(".edit-btn").addEventListener("click", () => {

            const newTask = prompt("Edit Task", task.text);

            if (newTask !== null && newTask.trim() !== "") {

                task.text = newTask.trim();

                saveTasks();

                renderTasks();

            }

        });

        // Delete Task
        li.querySelector(".delete-btn").addEventListener("click", () => {

            if (confirm("Delete this task?")) {

                tasks = tasks.filter(t => t !== task);

                saveTasks();

                renderTasks();

            }

        });

        taskList.appendChild(li);

    });

}

// ==========================
// ADD TASK
// ==========================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTask();

    }

});

// ==========================
// SEARCH
// ==========================

searchTask.addEventListener("input", renderTasks);

// ==========================
// FILTER
// ==========================

filterTask.addEventListener("change", renderTasks);

// ==========================
// CLEAR COMPLETED
// ==========================

clearCompletedBtn.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

});

// ==========================
// CLEAR ALL
// ==========================

clearAllBtn.addEventListener("click", () => {

    if(confirm("Delete all tasks?")){

        tasks = [];

        saveTasks();

        renderTasks();

    }

});

// ==========================
// INITIAL LOAD
// ==========================

renderTasks();