document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    loadTasks();

    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="remove-button">Remove</button>
            `;

            taskList.appendChild(taskItem);
            taskInput.value = "";

            // Save tasks to local storage
            saveTasks();
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button")) {
            e.target.parentElement.remove();
            // Save tasks to local storage after removal
            saveTasks();
        } else if (e.target.classList.contains("edit-button")) {
            const span = e.target.previousElementSibling;
            const newText = prompt("Edit task:", span.textContent);
            if (newText !== null) {
                span.textContent = newText;
                // Save tasks to local storage after editing
                saveTasks();
            }
        }
    });

    function saveTasks() {
        // Save tasks to local storage
        const tasks = Array.from(taskList.children).map(task => ({
            text: task.querySelector('span').textContent,
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
                <button class="edit-button">Edit</button>
                <button class="remove-button">Remove</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
})