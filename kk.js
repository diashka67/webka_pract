let tasks = []

const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.querySelector('.only_tasks')
const completedCounter = document.getElementById('completed')
const uncompletedCounter = document.getElementById('uncompleted')

let openedEdit = null


function addTask() {
    let text = taskInput.value.trim()

    if (text === '') {
        return
    }

    let task = {
        id: crypto.randomUUID(),
        text: text,
        done: false
    }

    tasks.push(task)
    createTaskElement(task)

    taskInput.value = ''
    updateCounters()
}


function createTaskElement(task) {
    let taskDiv = document.createElement('div')
    taskDiv.className = 'task'
    taskList.append(taskDiv)

    let contentMode = document.createElement('div')
    contentMode.className = 'content'
    taskDiv.append(contentMode)

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    contentMode.append(checkbox)

    let taskText = document.createElement('p')
    taskText.innerText = task.text
    contentMode.append(taskText)

    let buttons = document.createElement('div')
    buttons.className = 'buttons'
    contentMode.append(buttons)

    createDeleteButton(buttons, taskDiv, task)
    createEditButton(buttons, taskDiv, contentMode, taskText, task)

    checkbox.addEventListener('change', function () {
        task.done = checkbox.checked

        if (task.done) {
            taskText.classList.add('done')
        } else {
            taskText.classList.remove('done')
        }

        updateCounters()
    })
}


function createDeleteButton(buttons, taskDiv, task) {
    let deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.className = 'delete-btn'
    buttons.append(deleteButton)

    deleteButton.addEventListener('click', function () {
        deleteTask(taskDiv, task.id)
    })
}


function deleteTask(taskDiv, id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id
    })
    taskDiv.remove()
    updateCounters()
}


function createEditButton(buttons, taskDiv, contentMode, taskText, task) {
    let editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.className = 'edit-btn'
    buttons.append(editButton)

    editButton.addEventListener('click', function () {
        if (openedEdit !== null) {
            closeEditMode(openedEdit.contentMode, openedEdit.editMode)
        }

        contentMode.style.display = 'none'
        createEditWindow(taskDiv, contentMode, taskText, task)
    })
}


function createEditWindow(taskDiv, contentMode, taskText, task) {
    let editMode = document.createElement('div')
    editMode.className = 'edit'
    taskDiv.append(editMode)

    let editInput = document.createElement('input')
    editInput.type = 'text'
    editInput.value = task.text
    editMode.append(editInput)

    let saveButton = document.createElement('button')
    saveButton.innerText = 'Save'
    saveButton.className = 'save-btn'
    editMode.append(saveButton)

    let cancelButton = document.createElement('button')
    cancelButton.innerText = 'Cancel'
    cancelButton.className = 'cancel-btn'
    editMode.append(cancelButton)

    saveButton.addEventListener('click', function () {
        let newText = editInput.value.trim()

        if (newText === '') {
            return
        }

        task.text = newText
        taskText.innerText = newText
        closeEditMode(contentMode, editMode)
    })

    cancelButton.addEventListener('click', function () {
        closeEditMode(contentMode, editMode)
    })

    openedEdit = {
        contentMode: contentMode,
        editMode: editMode
    }
}


function closeEditMode(contentMode, editMode) {
    contentMode.style.display = 'flex'
    editMode.remove()
    openedEdit = null
}


function updateCounters() {
    let completed = 0

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].done) {
            completed++
        }
    }

    completedCounter.innerText = completed
    uncompletedCounter.innerText = tasks.length - completed
}


addBtn.addEventListener('click', addTask)

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask()
    }
})
