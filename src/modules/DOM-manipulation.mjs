import calendarIcon from '../images/cal-clock.svg'
import plusIcon from '../images/plus-circle-outline.svg'
import PubSub from 'pubsub-js'

const header = document.createElement('div')
const sidebar = document.createElement('div')
const content = document.createElement('div')

// Create elements stored in Document Fragments ==================
const createPageStructure = () => {
  header.classList.add('header')
  sidebar.classList.add('sidebar')
  content.classList.add('content')
  document.body.appendChild(header)
  document.body.appendChild(sidebar)
  document.body.appendChild(content)
}

const createNewTaskForm = () => {
  const newFragment = new DocumentFragment()
  const formContainer = document.createElement('div')
  const form = document.createElement('form')
  const dateLabel = document.createElement('label')
  const dateInput = document.createElement('input')
  const taskLabel = document.createElement('label')
  const taskInput = document.createElement('input')
  const notesLabel = document.createElement('label')
  const notesInput = document.createElement('textarea')
  const submitButton = document.createElement('button')

  formContainer.classList.add('new-task-form')
  dateLabel.textContent = 'Due:'
  dateInput.type = 'date'
  taskLabel.textContent = 'Task:'
  taskInput.type = 'text'
  notesLabel.textContent = 'Notes:'
  submitButton.textContent = 'Submit'
  submitButton.type = 'button'

  newFragment.appendChild(formContainer)
  formContainer.appendChild(form)
  form.appendChild(dateLabel)
  form.appendChild(dateInput)
  form.appendChild(taskLabel)
  form.appendChild(taskInput)
  form.appendChild(notesLabel)
  form.appendChild(notesInput)
  form.appendChild(submitButton)

  submitButton.addEventListener('click', () => {
    PubSub.publish('send task data', [
      taskInput.value,
      dateInput.value,
      notesInput.value,
    ])
    PubSub.publish('form submitted')
  })

  return newFragment
}

const createBackgroundOverlay = () => {
  const newFragment = new DocumentFragment()
  const newOverlay = document.createElement('div')
  newOverlay.classList.add('overlay')
  newFragment.appendChild(newOverlay)
  return newFragment
}

const createNewTaskButton = () => {
  const newFragment = new DocumentFragment()
  const newTaskButton = document.createElement('button')
  const newTaskIcon = document.createElement('svg')

  newTaskButton.classList.add('new-task-button')
  newTaskIcon.classList.add('new-task-icon')
  newTaskIcon.innerHTML = plusIcon

  newFragment.appendChild(newTaskButton)
  newTaskButton.appendChild(newTaskIcon)

  newTaskButton.addEventListener('click', () => {
    PubSub.publish('open task form')
  })

  return newFragment
}

const createNewTask = (newTask, newDueDate, newNotes, key) => {
  const newFragment = new DocumentFragment()
  const taskContainer = document.createElement('div')
  const checkButton = document.createElement('input')
  const task = document.createElement('p')
  const dueDateDiv = document.createElement('div')
  const dateIcon = document.createElement('svg')
  const dueDate = document.createElement('p')
  const expandButton = document.createElement('input')
  const notesContainer = document.createElement('div')
  const notes = document.createElement('p')
  const menuButton = document.createElement('div')
  const menu = document.createElement('div')
  const deleteButton = document.createElement('button')
  // const editButton = document.createElement('button')

  taskContainer.classList.add('task-container')
  task.classList.add('task')
  dueDateDiv.classList.add('due-date-container')
  checkButton.setAttribute('type', 'checkbox')
  checkButton.classList.add('task-checkbox')
  expandButton.setAttribute('type', 'checkbox')
  expandButton.classList.add('expand-button')
  menuButton.classList.add('task-menu-button')
  menu.classList.add('task-menu')
  dateIcon.classList.add('date-icon')
  dueDate.classList.add('due-date')
  notesContainer.classList.add('notes-container')

  task.textContent = newTask
  dueDate.textContent = newDueDate
  dateIcon.innerHTML = calendarIcon
  notes.textContent = newNotes
  // editButton.textContent = 'Edit'
  deleteButton.textContent = 'Delete'

  newFragment.appendChild(taskContainer)
  taskContainer.appendChild(expandButton)
  taskContainer.appendChild(menuButton)
  menuButton.appendChild(menu)
  // menu.appendChild(editButton)
  menu.appendChild(deleteButton)
  taskContainer.appendChild(checkButton)
  taskContainer.appendChild(task)
  taskContainer.appendChild(dueDateDiv)
  taskContainer.appendChild(notesContainer)
  notesContainer.appendChild(notes)
  dueDateDiv.appendChild(dateIcon)
  dueDateDiv.appendChild(dueDate)

  deleteButton.addEventListener('click', () => {
    PubSub.publish('delete task', key)
  })

  return newFragment
}

// Display and remove elements =================================
const displayTask = (newTask, newDueDate, newNotes, key) => {
  const task = createNewTask(newTask, newDueDate, newNotes, key)
  content.appendChild(task)
}
const displayNewTaskForm = () => {
  const backgroundOverlay = createBackgroundOverlay()
  const newTaskForm = createNewTaskForm()
  content.appendChild(backgroundOverlay)
  content.appendChild(newTaskForm)
}
const removeNewTaskForm = () => {
  const overlay = document.getElementsByClassName('overlay')
  const form = document.getElementsByClassName('new-task-form')
  form[0].remove()
  overlay[0].remove()
}
const displayNewTaskButton = () => {
  const newTaskButton = createNewTaskButton()
  content.appendChild(newTaskButton)
}
const removeNewTaskButton = () => {
  const newTaskButton = document.getElementsByClassName('new-task-button')
  newTaskButton[0].remove()
}
const displayCategory = (currentCategory) => {
  const categoryHeader = document.createElement('h2')
  categoryHeader.textContent = currentCategory
  content.prepend(categoryHeader)
}
// Modify existing DOM elements ===============================

// Add listeners and subscribers ==============================
PubSub.subscribe('open task form', () => {
  removeNewTaskButton()
  displayNewTaskForm()
})
PubSub.subscribe('form submitted', (msg, data) => {
  removeNewTaskForm()
  displayNewTaskButton()
})
PubSub.subscribe('display task', (msg, data) => {
  displayTask(...data)
})
PubSub.subscribe('display new task button', () => {
  displayNewTaskButton()
})
PubSub.subscribe('display category', (msg, category) => {
  displayCategory(category)
})

// Module to be exported starts here =================================
const manipulateDOM = {
  initialize: () => {
    createPageStructure()
  },
  clearContent: () => {
    const currentContent = document.getElementsByClassName('content')[0]
    while (currentContent.firstChild) {
      currentContent.firstChild.remove()
    }
  },
  expandTask: () => {},
}

export default manipulateDOM
