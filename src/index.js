import './style.css'
import PubSub from 'pubsub-js'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'
// import dataRetriever from './modules/retrieve-form-data.mjs'

const coordinator = (() => {
  return {
    loadCurrentTasks: () => {
      const currentTasks = taskData.getTaskArray()
      for (const task in currentTasks) {
        PubSub.publish('display task', currentTasks[task])
      }
      PubSub.publish('tasks displayed')
    },
    loadCurrentCategory: () => {
      const currentCategory = taskData.getCurrentCategory()
      PubSub.publish('display category', currentCategory)
    },
  }
})()

addEventListener('DOMContentLoaded', () => {
  coordinator.loadCurrentCategory()
  coordinator.loadCurrentTasks()
})
manipulateDOM.initialize()
// taskData.addCategory('Work')
// manipulateDOM.displayCurrentCategory('Work Stuff')
