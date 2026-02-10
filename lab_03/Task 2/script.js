const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Введите текст задачи!');
        return;
    }

    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    const uniqueId = 'task-' + Date.now();
    checkbox.id = uniqueId;

    const label = document.createElement('label');
    label.htmlFor = uniqueId;
    label.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '🗑';

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            todoItem.classList.add('completed');
        } else {
            todoItem.classList.remove('completed');
        }
    });

    deleteBtn.addEventListener('click', function() {
        todoList.removeChild(todoItem);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);

    todoList.appendChild(todoItem);

    taskInput.value = '';
    
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});