// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryArray = []
const taskArray = []
const currentCategory = 'Work'

const addTask = (task, dueDate, notes) => {
  const newTask = [task, dueDate, notes]
  taskArray.push(newTask)
}

addTask('Do some works', '09/01/2022', 'notes about all kind stuff you know what I mean bro')
addTask('Do some other works', '09/02/2022', 'notes')

PubSub.subscribe('create new task', (msg, data) => {
  addTask(...data)
})

const taskData = {
  addCategory: (name) => {
    const tasks = []
    const newCategory = { name, tasks }
    categoryArray.push(newCategory)
  },
  getTaskArray: () => {
    return taskArray
  },
  getCurrentCategory: () => {
    return currentCategory
  },
}

// need a way to link tasks to their category
// need a way to get task objects out of module to render them

export default taskData
