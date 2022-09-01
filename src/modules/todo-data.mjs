// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryArray = []
const taskArray = []

const addTask = (msg, task, dueDate, notes) => {
  const newTask = { dueDate, task, notes }
  taskArray.push(newTask)
}

PubSub.subscribe('create new task', (msg, data) => {
  addTask(msg, ...data)
})

const taskData = {
  addCategory: (name) => {
    const tasks = []
    const newCategory = { name, tasks }
    categoryArray.push(newCategory)
  },
}

// need a way to link tasks to their category
// need a way to get task objects out of module to render them

export default taskData
