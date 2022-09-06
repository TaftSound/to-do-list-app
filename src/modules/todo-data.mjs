// due-date, subtask-strings - stored in array, notes-string, category
import PubSub from 'pubsub-js'

const categoryMap = new Map()
let currentCategory
let currentTaskKey = 0
let categoryOrderNumber = 1


const setCurrentCategory = (selectedCategory) => {
  currentCategory = selectedCategory
}

const createCategory = (categoryName, existingOrder) => {
  const newTaskMap = new Map()
  newTaskMap.set('name', categoryName)
  if (existingOrder) { newTaskMap.set('order', existingOrder) }
  else {
    newTaskMap.set('order', categoryOrderNumber)
    categoryOrderNumber++
  }
  categoryMap.set(categoryName, newTaskMap)
  setCurrentCategory(categoryName)
}

const addTask = (task, dueDate, notes, oldKey) => {
  const newTask = [task, dueDate, notes, currentTaskKey]
  const category = categoryMap.get(currentCategory)
  category.set(currentTaskKey, newTask)
  currentTaskKey++
}
const deleteTask = (key) => {
  const taskMap = categoryMap.get(currentCategory)
  taskMap.delete(key)
}
const updateLocalStorage = () => {
  for (const category of categoryMap.values()) {
    const storageArray = Array.from(category.values())
    localStorage.setItem(category.get('name'), JSON.stringify(storageArray))
  }
  localStorage.setItem('category', currentCategory)
}
const loadFromStorage = () => {
  if (!localStorage.length) {
    return
  }
  const keys = Object.keys(localStorage)
  for (const key of keys) {
    if (key === 'category') { continue }
    const returnedTaskArray = JSON.parse(localStorage.getItem(key))
    createCategory(key, returnedTaskArray[1])
    for (let i = 2; i < returnedTaskArray.length; i++) {
      addTask(...returnedTaskArray[i])
    }
  }
  currentCategory = localStorage.getItem('category')
}


PubSub.subscribe('send category data', (msg, category) => {
  createCategory(category)
  updateLocalStorage()
  PubSub.publish('clear and render categories')
})
PubSub.subscribe('send task data', (msg, data) => {
  addTask(...data)
  updateLocalStorage()
  PubSub.publish('clear and render tasks')
})
PubSub.subscribe('delete task', (msg, key) => {
  deleteTask(key)
  updateLocalStorage()
  PubSub.publish('clear and render tasks')
})
PubSub.subscribe('change category', (msg, category) => {
  setCurrentCategory(category)
  updateLocalStorage()
  PubSub.publish('clear and render categories')
})

const taskData = {
  getTaskMap: () => {
    const currentTaskMap = categoryMap.get(currentCategory)
    return currentTaskMap
  },
  getCurrentCategory: () => {
    return currentCategory
  },
  getCategories: () => {
    return categoryMap
  },
  initialize: () => {
    // localStorage.clear()
    loadFromStorage()
  },
}

export default taskData
