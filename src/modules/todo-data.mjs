// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryMap = new Map()
let currentCategory
let currentKey = 0

const createCategory = (categoryName) => {
  const newTaskMap = new Map()
  newTaskMap.set('name', categoryName)
  categoryMap.set(categoryName, newTaskMap)
  setCurrentCategory(categoryName)
}
const setCurrentCategory = (selectedCategory) => {
  currentCategory = selectedCategory
}
const addTask = (task, dueDate, notes, oldKey) => {
  const newTask = [task, dueDate, notes, currentKey]
  const category = categoryMap.get(currentCategory)
  category.set(currentKey, newTask)
  currentKey++
}
const deleteTask = (key) => {
  const taskMap = categoryMap.get(currentCategory)
  taskMap.delete(key)
}
const updateLocalStorage = () => {
  if (!categoryMap.size) { localStorage.clear() }
  for (const category of categoryMap.values()) {
    const storageArray = Array.from(category.values())
    localStorage.setItem(category.get('name'), JSON.stringify(storageArray))
  }
  localStorage.setItem('category', currentCategory)
}
const loadFromStorage = () => {
  if (!localStorage.length) { return }
  const keys = Object.keys(localStorage)
  for (const key of keys) {
    if (key === 'category') { continue }
    const returnedArray = JSON.parse(localStorage.getItem(key))
    createCategory(key)
    for (const task of returnedArray) {
      if (task === currentCategory) { continue }
      addTask(...task)
    }
  }
  currentCategory = localStorage.getItem('category')
}

loadFromStorage()

PubSub.subscribe('create category', (msg, category) => {
  createCategory(category)
  updateLocalStorage()
})
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
  getTaskMap: () => {
    const currentTaskMap = categoryMap.get(currentCategory)
    return currentTaskMap
  },
  getCurrentCategory: () => {
    return currentCategory
  },
}

export default taskData
