const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


// Add Event Listener for Form Submission
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === "") {
    alert("Please enter a task!");
    return;
  }
  todoInput.value = "";
  addTask(newTask);
});

// Create a Function to Add Tasks
function addTask(task) {
  const listItem = document.createElement("li");

  // create checkBox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add('check-box');
  listItem.appendChild(checkBox);

  // create taskText
  const taskText = document.createElement("span");
  taskText.textContent = task;
  taskText.classList.add('task-text');
  listItem.appendChild(taskText);

  // create Edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add('edit-button');
  listItem.appendChild(editButton);

  // create Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add('delete-button');
  listItem.appendChild(deleteButton);

  
  todoList.appendChild(listItem);


//   Task Completion 
  checkBox.addEventListener("change", function () {
    if (this.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });

// Task Deletion
  deleteButton.addEventListener("click", function () {
    todoList.removeChild(listItem);
  });

  editButton.addEventListener("click", function () {
    const isEditing = listItem.classList.contains("editing");

    if (isEditing) {
      taskText.textContent = this.previousSibling.value;
      listItem.classList.remove("editing");
      editButton.textContent = "Edit";
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.value = taskText.textContent;
      listItem.insertBefore(input, taskText);
      listItem.removeChild(taskText);
      listItem.classList.add("editing");
      editButton.textContent = "Save";
    }
  });

  saveTasksToLocalStorage();
}

// Saving Tasks to Local Storage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach((task) => {
    const taskText = task.querySelector("span").textContent;
    const isCompleted = task.classList.contains("completed");
    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Loading Tasks from Local Storage on Page Load
document.addEventListener("DOMContentLoaded", function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTask(task.text);
  });
});

new li("Attend a zoom meeting");
