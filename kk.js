// const taskInput = document.getElementById('taskInput');
// const addBtn = document.getElementById('addBtn');
// const taskList = document.getElementById('taskList');

// // 1. Функция добавления новой задачи
// function addTask() {
//     const text = taskInput.value.trim();
//     if (text === '') return; // Если в поле ничего нет, выходим

//     // Создаем новый элемент списка <li>
//     const li = document.createElement('li');

//     // Наполняем его HTML-кодом
//     li.innerHTML = `
//         <input type="checkbox">
//         <span>${text}</span>
//         <button class="delete-btn">Delete</button>
//     `;

//     // Добавляем созданную задачу в конец списка
//     taskList.appendChild(li);
    
//     // Очищаем поле ввода
//     taskInput.value = '';
// }

// // Клик по кнопке "Add" вызывает функцию добавления
// addBtn.addEventListener('click', addTask);

// // Нажатие клавиши "Enter" в поле ввода тоже добавляет задачу
// taskInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         addTask();
//     }
// });


// // 2. Обработка кликов внутри списка (удаление и чекбоксы)
// taskList.addEventListener('click', (event) => {
    
//     // Если кликнули на кнопку удаления
//     if (event.target.classList.contains('delete-btn')) {
//         const li = event.target.parentElement; // находим строку <li>
//         li.remove(); // удаляем ее со страницы
//     }

//     // Если кликнули на чекбокс
//     if (event.target.type === 'checkbox') {
//         const li = event.target.parentElement; // находим строку <li>
//         li.classList.toggle('done'); // включаем или выключаем зачеркивание
//     }
// });
let taskInput = document.getElementById('taskInput');
let addBtn = getElementById('addBtn');
let taskList = getElementById('taskList')
let completed = getElementById('completed')
let uncompleted = getElementById('uncompleted')

function placeholder() {
    // let text = taskInput.value
    console.log(taskInput.value)
}

addBtn.EventListener('click', placeholder)
