document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = document.createElement("li");
            const timestamp = new Date().toLocaleString(); // Add timestamp
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <small>${timestamp}</small> <!-- Display timestamp -->
                <button class="edit-button">Edit</button>
                <button class="remove-button">Remove</button>
            `;

            taskList.appendChild(taskItem);
            taskInput.value = "";

            // Save tasks to local storage
            saveTasks();
        }
    }

    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button")) {
            e.target.parentElement.remove();
            // Save tasks to local storage after removal
            saveTasks();
        } else if (e.target.classList.contains("edit-button")) {
            const taskItem = e.target.parentElement;
            const span = taskItem.querySelector('span');
            const newText = prompt("Edit task:", span.textContent);
            if (newText !== null) {
                span.textContent = newText;
                // Save tasks to local storage after editing
                saveTasks();
            }
        }
    });

    function saveTasks() {
        // Save tasks to local storage with timestamp
        const tasks = Array.from(taskList.children).map(task => ({
            text: task.querySelector('span').textContent,
            timestamp: task.querySelector('small').textContent,
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        // Load tasks from local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <small>${task.timestamp}</small>
                <button class="edit-button">Edit</button>
                <button class="remove-button">Remove</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
});
