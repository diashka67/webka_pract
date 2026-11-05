let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let taskList = document.querySelector('.only_tasks');
let completed = document.getElementById('completed');
let uncompleted = document.getElementById('uncompleted');

// Обновляем счётчики
function updateCounters() {
    let all = taskList.children.length;
    let done = taskList.querySelectorAll('.done').length;
    completed.textContent = done;
    uncompleted.textContent = all - done;
}

// Добавляем задачу
function addTask() {
    let text = taskInput.value.trim();
    if (text === '') return; // пустую задачу не добавляем

    let task = document.createElement('div');
    task.textContent = text;

    // клик по задаче: выполнена / не выполнена
    task.addEventListener('click', function () {
        task.classList.toggle('done');
        updateCounters();
    });

    // кнопка удаления
    let delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // чтобы клик не отмечал задачу выполненной
        task.remove();
        updateCounters();
    });

    task.append(' ', delBtn);
    taskList.appendChild(task);

    taskInput.value = '';
    updateCounters();
}

addBtn.addEventListener('click', addTask);
updateCounters();
