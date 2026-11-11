//задачи будут приходить в массив. Удалить задачи из массива через ID, 

// let tasks = [
//     {
//         id: 1,
//         text: taskInput.value
//     }
// ]

// tasks[0].text


//два дива контент(чекбокс и тд) и эдитконтент(сохранить отменить и тд) в два окошка отдельными дивами, они будут добавляться в общий див

// const taskInput = document.getElementById('taskInput');
// const addBtn = document.getElementById('addBtn');
// const taskList = document.querySelector('.only_tasks');
// const completedCounter = document.getElementById('completed');
// const uncompletedCounter = document.getElementById('uncompleted');

// let tasks = [];



let tasks = []
let editFlags = []
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.querySelector('.only_tasks');
const completedCounter = document.getElementById('completed');
const uncompletedCounter = document.getElementById('uncompleted');


let commonDiv = document.querySelector('.only_tasks');

function createTask(){  
    let task = {
        id: Math.random(),
        text: taskInput.value
    }
    tasks.push(task)
    let taskDiv = document.createElement('div')
    commonDiv.append(taskDiv)

    let contentMode = document.createElement('div')
    taskDiv.append(contentMode)

    let taskText = document.createElement('p')
    taskText.innerText = task.text
    contentMode.append(taskText)

    createDeleteButton(contentMode, taskDiv, task.id)
    createEditButton(contentMode, taskDiv, task )

}



function addTaskToArray(){
    tasks.push({id: Math.random(), text: taskInput.value })
}


function addTaskText(){
    createTask()
    taskInput.value = ''
}



function createDeleteButton(contentMode, task ){
    let deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    taskDiv.append(deleteButton)

    deleteButton.addEventListener('click', function(){
        deleteTask(task)
    })
}


function deleteTask(task, id){
    task.remove()
    tasks = tasks.filter(task => task.id != id)
}


function createEditButton(contentMode, taskDiv, task){
    let editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    contentMode.append(editButton)

    editButton.addEventListener('click', function(){
        contentMode.style.display = 'none'
        createEditWindow(taskDiv, task, contentMode)
    })
}

function createEditWindow(taskDiv, task, contentMode){

    for (let i = 0; i < editFlags.length; ++i) {
        if (editFlags[i].isOpen === 1) {
            cancelEditMode(editFlags[i].contentMode, editFlags[i].editMode);
        }
    }
    let editMode = document.createElement('div')
    taskDiv.append(editMode)

    let editInput = document.createElement('input')
    editInput.value = task.text
    editMode.append(editInput)
     
    createSaveButton(editMode, contentMode)
    createcancelButton(editMode, contentMode)


    editFlags.push({
        isOpen: 1,
        contentMode: contentMode,
        editMode: editMode
    });
}
function createSaveButton(editMode, contentMode){
    let saveButton = document.createElement('button')
    saveButton.innerText = 'Save'
    contentMode.append(saveButton)

    saveButton.addEventListener('click', function () {
        saveTask(editMode, contentMode)
    })

}
function createcancelButton(editMode, contentMode){
    let cancelButton = document.createElement('button')
    cancelButton.innerText = 'cancel'
    editMode.append(cancelButton)

    cancelButton.addEventListener('click', function(){
        cancelEditMode(editMode, contentMode)
    })

    cancelEditMode(contentMode, editMode)

}

function cancelEditMode(contentMode, editMode){
    contentMode.style.display = 'block'
    editMode.remove()
    for (let i = 0; i < editFlags.length; ++i) {
        if (editFlags[i].editMode === editMode) {
            editFlags[i].isOpen = 0;
        }
    }
}

addBtn.addEventListener('click', addTaskText);

