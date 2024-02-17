const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";

    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    tasksContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value = "";
    taskCount += 1;
    displayCount(taskCount);
};

// Event delegation for delete and edit buttons
tasksContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete") || e.target.parentNode.classList.contains("delete")) {
        e.target.closest('.task').remove();
        taskCount -= 1;
    } else if (e.target.classList.contains("edit") || e.target.parentNode.classList.contains("edit")) {
        const taskElement = e.target.closest('.task');
        newTaskInput.value = taskElement.querySelector('.taskname').innerText;
        taskElement.remove();
        taskCount -= 1;
    }
    displayCount(taskCount);
});

// Event delegation for checkboxes
tasksContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("task-check")) {
        e.target.nextElementSibling.classList.toggle("completed");
        if (e.target.checked) {
            taskCount -= 1;
        } else {
            taskCount += 1;
        }
        displayCount(taskCount);
    }
});

addBtn.addEventListener("click", addTask);
