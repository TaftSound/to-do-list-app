import './style.css'
import PubSub from 'pubsub-js'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'

const coordinator = (() => {
  return {
    renderTasks: () => {
      const currentTasks = taskData.getTaskMap()
      for (const task of currentTasks.values()) {
        PubSub.publish('display task', task)
      }
      PubSub.publish('tasks displayed')
    },
    loadCurrentCategory: () => {
      const currentCategory = taskData.getCurrentCategory()
      PubSub.publish('display category', currentCategory)
    },
  }
})()

manipulateDOM.initialize()
coordinator.loadCurrentCategory()
coordinator.renderTasks()

PubSub.subscribe('clear and render', () => {
  manipulateDOM.clearContent()
  coordinator.renderTasks()
  coordinator.loadCurrentCategory()
})
