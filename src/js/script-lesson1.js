"use strict";

const todoInput = document.querySelector('.todo-list__input');
const todoButton = document.querySelector('.todo-list__button');
const todoList = document.querySelector('.list');
const filter = document.querySelector('.todo_list__filter');

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener('click', addTask);
todoList.addEventListener('click', deleteCheck);
filter.addEventListener('change', filterTodo);

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    if(todo != '') {
        todos.push(todo);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const div = document.createElement('div');
        div.classList.add('todo');
        if(todoInput.value != '') {
            todoList.appendChild(div);
        }

        const li = document.createElement('li');
        li.innerText = todo;
        div.appendChild(li);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');
        div.appendChild(buttons);

        const btnEdit = document.createElement('button');
        btnEdit.classList.add('edit-btn');
        btnEdit.innerHTML = '&#9998;';
        buttons.appendChild(btnEdit);

        const btnComplete = document.createElement('button');
        btnComplete.classList.add('complete-btn');
        btnComplete.innerHTML = '&#10004;';
        buttons.appendChild(btnComplete);

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('trash-btn');
        btnDelete.innerHTML = '&#10008;';
        buttons.appendChild(btnDelete);
    }); 
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTask (event) {
    event.preventDefault();

    const div = document.createElement('div');
    div.classList.add('todo');
    if(todoInput.value != '') {
        todoList.appendChild(div);
    }
    
    const li = document.createElement('li');
    li.textContent = todoInput.value;
    div.appendChild(li);
    
    saveLocalTodos(todoInput.value); //ADDING TO LOCAL STORAGE

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    div.appendChild(buttons);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit-btn');
    btnEdit.innerHTML = '&#9998;';
    buttons.appendChild(btnEdit);

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('complete-btn');
    btnComplete.innerHTML = '&#10004;';
    buttons.appendChild(btnComplete);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('trash-btn');
    btnDelete.innerHTML = '&#10008;';
    buttons.appendChild(btnDelete);

    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;

    if(item.classList[0] === 'trash-btn') {
        const elem = item.parentElement.parentElement;
        elem.remove();
        removeLocalTodos(elem);
    }

    if(item.classList[0] === 'complete-btn') {
        const elem = item.parentElement.previousElementSibling;
        elem.classList.toggle('completed');
    }

    if(item.classList[0] === 'edit-btn') {
        const elem = item.parentElement.previousElementSibling;
        const input = document.createElement('input');
        input.classList.add('edit');
        input.value = elem.textContent;
        input.style.outline = 'none';
        elem.textContent = '';
        elem.appendChild(input);

        
        input.addEventListener('blur', function () {
            elem.textContent = this.value;
        });
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.firstChild.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                } 
                break;
            case 'incomplete': 
                if(!todo.firstChild.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                } 
                break;
        }
    }); 
 
    
    
}