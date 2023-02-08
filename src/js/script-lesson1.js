"use strict";

const todoInput = document.querySelector('.todo-list__input');
const todoButton = document.querySelector('.todo-list__button');
const todoList = document.querySelector('.list');
const filter = document.querySelector('.todo_list__filter');

todoButton.addEventListener('click', addTask);

function addTask (event) {
    event.preventDefault();

    const div = document.createElement('div');
    div.classList.add('todo');
    todoList.appendChild(div);

    const li = document.createElement('li');
    li.classList.add('list-item');
    li.textContent = todoInput.value;
    div.appendChild(li);

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit-btn');
    btnEdit.innerHTML = '&#9998;';
    div.appendChild(btnEdit);

    const btnComplete = document.createElement('button');
    btnComplete.classList.add('complete-btn');
    btnComplete.innerHTML = '&#10004;';
    div.appendChild(btnComplete);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('trash-btn');
    btnDelete.innerHTML = '&#10008;';
    div.appendChild(btnDelete);

    todoInput.value = '';
}