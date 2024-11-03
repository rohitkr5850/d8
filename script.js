document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = [];

    // Function to display tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            taskItem.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">
                    ${task.status === "Completed" ? "Mark as Incomplete" : "Mark as Complete"}
                </button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    // Add task
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const status = document.getElementById("status").value;

        const newTask = { title, description, status };
        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    });

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Edit task
    window.editTask = (index) => {
        const task = tasks[index];
        document.getElementById("title").value = task.title;
        document.getElementById("description").value = task.description;
        document.getElementById("status").value = task.status;
        
        deleteTask(index);  // Remove original task before re-adding it
    };

    // Toggle complete status
    window.toggleComplete = (index) => {
        tasks[index].status = tasks[index].status === "Completed" ? "In Progress" : "Completed";
        renderTasks();
    };
});