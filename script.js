document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("taskList");

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
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-button")) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains("edit-button")) {
            const span = e.target.previousElementSibling;
            const newText = prompt("Edit task:", span.textContent);
            if (newText !== null) {
                span.textContent = newText;
            }
        }
    });
});