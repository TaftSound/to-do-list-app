// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryArray = []
const currentCategory = 'Work'
const taskMap = new Map()
let currentKey = 0

const addTask = (task, dueDate, notes) => {
  const newTask = [task, dueDate, notes, currentKey]
  taskMap.set(currentKey, newTask)
  currentKey++
}
const deleteTask = (key) => {
  taskMap.delete(key)
}

addTask('Do some works', '09/01/2022', 'notes about all kind stuff you know what I mean bro')
addTask('Do some other works', '09/02/2022', 'notes')

PubSub.subscribe('send task data', (msg, data) => {
  addTask(...data)
  PubSub.publish('clear and render')
})
PubSub.subscribe('delete task', (msg, key) => {
  deleteTask(key)
  PubSub.publish('clear and render')
  console.log('data deleted')
}) 

const taskData = {
  addCategory: (name) => {
    const tasks = []
    const newCategory = { name, tasks }
    categoryArray.push(newCategory)
  },
  getTaskMap: () => {
    return taskMap
  },
  getCurrentCategory: () => {
    return currentCategory
  },
}

// need a way to link tasks to their category

export default taskData
