// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryArray = []
const currentCategory = 'Work'
const taskMap = new Map()
let currentKey = 0

const addTask = (task, dueDate, notes, oldkey) => {
  const newTask = [task, dueDate, notes, currentKey]
  taskMap.set(currentKey, newTask)
  currentKey++
}
const deleteTask = (key) => {
  taskMap.delete(key)
}

const updateLocalStorage = () => {
  if (!taskMap.size) { localStorage.clear() }
  const storageArray = Array.from(taskMap.values())
  localStorage.setItem('task array', JSON.stringify(storageArray))
}
const loadFromStorage = () => {
  if (!localStorage.length) { return }
  const returnedArray = JSON.parse(localStorage.getItem('task array'))
  for (const task of returnedArray) {
    addTask(...task)
  }
}

loadFromStorage()

PubSub.subscribe('send task data', (msg, data) => {
  addTask(...data)
  updateLocalStorage()
  PubSub.publish('clear and render')
})
PubSub.subscribe('delete task', (msg, key) => {
  deleteTask(key)
  updateLocalStorage()
  PubSub.publish('clear and render')
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
