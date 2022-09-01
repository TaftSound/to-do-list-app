// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryArray = []
const taskArray = []

const addTask = (task, dueDate, notes) => {
  const newTask = [ task, dueDate, notes ]
  taskArray.push(newTask)
}

addTask('Do some works', '09/01/2022', 'notes')
addTask('Do some other works', '09/02/2022', 'notes')

const sendTaskArray = () => {
  for (const task in taskArray) {
    PubSub.publish('create task', taskArray[task])
  }
  PubSub.publish('display new task bttn')
}

PubSub.subscribe('create new task', (msg, data) => {
  addTask(...data)
})

const taskData = {
  initialize: () => {
    sendTaskArray()
  },
  addCategory: (name) => {
    const tasks = []
    const newCategory = { name, tasks }
    categoryArray.push(newCategory)
  },
}

// need a way to link tasks to their category
// need a way to get task objects out of module to render them

export default taskData
