// selectors
const input = document.querySelector(".todo-input");
const button = document.querySelector(".todo-button");
const list = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getToDos);
button.addEventListener("click", addToDoList);
list.addEventListener('click', deleteCheckToDoList);
filter.addEventListener('click', filterToDoList);


//Functions
function addToDoList(event) {
    event.preventDefault();
    // console.log('is list working?');

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    // newTodo.innerText = 'Hello';
    newTodo.innerText = input.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add TODO to localstorage
    saveToDoListToLocal(input.value);

    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    // Append to list

    list.appendChild(todoDiv);

    // clear input value
    input.value = "";
}

function deleteCheckToDoList(e) {
    // console.log(e.target);
    const item = e.target;
    if (item.classList[0] === 'trash-btn') {
        // item.remove();
        const todo = item.parentElement;
        todo.classList.add('fall'); // animation
        // todo.remove();
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function () {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterToDoList(e) {
    const todos = list.childNodes;
    console.log(todos);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none"; // remove
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none"; // remove
                }
                break;
        }
    });
}


// save in local storage
function saveToDoListToLocal(todo) {
    //check if i have todolist in the local storage?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getToDos() {
    // console.log('hello');
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        // newTodo.innerText = 'Hello';
        // newTodo.innerText = todoInput.value;
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit-btn");
        todoDiv.appendChild(editButton);

        // Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        list.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    // console.log(todos.indexOf('book'));
    todos.splice(todos.indexOf(todoIndex), 1); // remove from the array
    localStorage.setItem('todos', JSON.stringify(todos));   // remove from the local
}