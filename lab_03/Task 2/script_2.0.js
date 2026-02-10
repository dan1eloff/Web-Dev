const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const activeTasks = document.getElementById('activeTasks');
const completedTasks = document.getElementById('completedTasks');
const currentDate = document.getElementById('currentDate');

function displayCurrentDate() {
    const now = new Date();
    
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    
    const days = [
        'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
        'Четверг', 'Пятница', 'Суббота'
    ];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    const dateString = `${dayName}, ${day} ${month} ${year}`;
    
    currentDate.textContent = dateString;
}

displayCurrentDate();


// Создать задачу
function createTaskElement(taskText) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task-' + Date.now();

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            todoItem.classList.add('completed');
            completedTasks.appendChild(todoItem);
        } else {
            todoItem.classList.remove('completed');
            activeTasks.appendChild(todoItem);
        }
    });

    deleteBtn.addEventListener('click', function() {
        todoItem.classList.add('removing');
        
        setTimeout(function() {
            if (checkbox.checked) {
                completedTasks.removeChild(todoItem);
            } else {
                activeTasks.removeChild(todoItem);
            }
        }, 300);
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);

    return todoItem;
}


// Добавка задачи
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        taskInput.style.borderColor = '#e74c3c';
        setTimeout(function() {
            taskInput.style.borderColor = '';
        }, 500);
        return;
    }

    const todoItem = createTaskElement(taskText);
    
    activeTasks.appendChild(todoItem);

    taskInput.value = '';
    
    taskInput.focus();
}


// Enter
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});