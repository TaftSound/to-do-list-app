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
  newTaskMap.set('order', categoryOrderNumber)
  categoryOrderNumber++
  categoryMap.set(categoryName, newTaskMap)
  setCurrentCategory(categoryName)
}

const deleteCategory = (categoryName) => {
  if (currentCategory === categoryName) {
    const nextCategory = getNextCategory(categoryName)
    setCurrentCategory(nextCategory)
    localStorage.setItem('category', nextCategory)
  }
  categoryMap.delete(categoryName)
  localStorage.removeItem(categoryName)
}

const getNextCategory = (categoryName) => {
  const index = categoryMap.get(categoryName).get('order')
  const allCategories = Array.from(categoryMap.values())
  const nextCategory = allCategories[index]
  if (!nextCategory) { return '' }
  return nextCategory.get('name')
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
  
  const orderedCategoryArray = []

  for (const key of keys) {
    if (key === 'category') { continue }
    const parsedCategory = JSON.parse(localStorage.getItem(key))
    const index = parsedCategory[1]
    orderedCategoryArray[index] = parsedCategory
  }

  for (let i = 1; i < orderedCategoryArray.length; i++) {
    const categoryData = orderedCategoryArray[i]
    if (!categoryData) { continue }
    createCategory(categoryData[0], categoryData[1])
    for (let i = 2; i < categoryData.length; i++) {
      addTask(...categoryData[i])
    }
  }
  currentCategory = localStorage.getItem('category')
}


PubSub.subscribe('send category data', (msg, category) => {
  createCategory(category)
  updateLocalStorage()
  PubSub.publish('clear and render categories')
})
PubSub.subscribe('delete category', (msg, category) => {
  deleteCategory(category)
  PubSub.publish('clear and render categories')
})
PubSub.subscribe('change category', (msg, category) => {
  setCurrentCategory(category)
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
