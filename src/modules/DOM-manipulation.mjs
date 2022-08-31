import calendarIcon from '../images/cal-clock.svg'

const header = document.createElement('div')
const sidebar = document.createElement('div')
const content = document.createElement('div')

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
    console.log(calendarIcon)
    console.log(dateIcon)

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
