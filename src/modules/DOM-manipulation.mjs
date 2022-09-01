import calendarIcon from '../images/cal-clock.svg'
import plusIcon from '../images/plus-circle-outline.svg'
import PubSub from 'pubsub-js'

const header = document.createElement('div')
const sidebar = document.createElement('div')
const content = document.createElement('div')

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
    PubSub.publish('create new task', [
      taskInput.value,
      dateInput.value,
      notesInput.value,
    ])
  })

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
    displayNewTaskForm()
    removeNewTaskButton()
  })

  return newFragment
}
const displayNewTaskForm = () => {
  const newTaskForm = createNewTaskForm()
  content.appendChild(newTaskForm)
}
const removeNewTaskForm = () => {
  const form = document.getElementsByClassName('new-task-form')
  form[0].remove()
}
const displayNewTaskButton = () => {
  const newTaskButton = createNewTaskButton()
  content.appendChild(newTaskButton)
}
const removeNewTaskButton = () => {
  const newTaskButton = document.getElementsByClassName('new-task-button')
  newTaskButton[0].remove()
}

addEventListener('DOMContentLoaded', displayNewTaskButton)
PubSub.subscribe('create new task', removeNewTaskForm)
PubSub.subscribe('create new task', displayNewTaskButton)

// Module to be exported starts here =================================
const manipulateDOM = {
  createPageStructure: () => {
    header.classList.add('header')
    sidebar.classList.add('sidebar')
    content.classList.add('content')
    document.body.appendChild(header)
    document.body.appendChild(sidebar)
    document.body.appendChild(content)
  },
  displayCurrentCategory: (currentCategory) => {
    const categoryHeader = document.createElement('h2')
    categoryHeader.textContent = currentCategory
    content.prepend(categoryHeader)
  },
  displayTask: (newTask, newDueDate) => {
    const taskContainer = document.createElement('div')
    const checkButton = document.createElement('input')
    const task = document.createElement('p')
    const dueDateDiv = document.createElement('div')
    const dateIcon = document.createElement('svg')
    const dueDate = document.createElement('p')

    taskContainer.classList.add('task-container')
    task.classList.add('task')
    dueDateDiv.classList.add('due-date-container')
    checkButton.setAttribute('type', 'checkbox')
    dateIcon.classList.add('date-icon')
    dueDate.classList.add('due-date')

    task.textContent = newTask
    dueDate.textContent = newDueDate
    dateIcon.innerHTML = calendarIcon

    content.appendChild(taskContainer)
    taskContainer.appendChild(checkButton)
    taskContainer.appendChild(task)
    taskContainer.appendChild(dueDateDiv)
    dueDateDiv.appendChild(dateIcon)
    dueDateDiv.appendChild(dueDate)
  },
  expandTask: () => {},
}

export default manipulateDOM
