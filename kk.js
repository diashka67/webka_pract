const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.querySelector('.only_tasks');
const completedCounter = document.getElementById('completed');
const uncompletedCounter = document.getElementById('uncompleted');

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    // Создаём элементы задачи
    const task = document.createElement('div');
    task.className = 'tasks_flex';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskText = document.createElement('p');
    taskText.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    task.append(checkbox, taskText, deleteBtn, editBtn);
    taskList.append(task);
    taskInput.value = '';

    // Удалить
    deleteBtn.addEventListener('click', function () {
        task.remove();
        updateCounters();
    });

    // Отметить выполненной (выполненные уходят вниз)
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            task.classList.add('done');
            taskList.append(task);
        } else {
            task.classList.remove('done');
            taskList.prepend(task);
        }
        updateCounters();
    });

    // Редактировать
    editBtn.addEventListener('click', function () {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';

        // Прячем обычный вид, показываем режим редактирования
        taskText.style.display = 'none';
        editBtn.style.display = 'none';
        deleteBtn.style.display = 'none';
        task.append(editInput, saveBtn, cancelBtn);

        function closeEdit() {
            editInput.remove();
            saveBtn.remove();
            cancelBtn.remove();
            taskText.style.display = '';
            editBtn.style.display = '';
            deleteBtn.style.display = '';
        }

        saveBtn.addEventListener('click', function () {
            if (editInput.value.trim() !== '') {
                taskText.textContent = editInput.value.trim();
            }
            closeEdit();
        });

        cancelBtn.addEventListener('click', closeEdit);
    });

    updateCounters();
}

function updateCounters() {
    const all = taskList.querySelectorAll('input[type="checkbox"]');
    const done = taskList.querySelectorAll('input[type="checkbox"]:checked');

    completedCounter.textContent = done.length;
    uncompletedCounter.textContent = all.length - done.length;
}

addBtn.addEventListener('click', addTask);

// Добавление по Enter
taskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();
});
