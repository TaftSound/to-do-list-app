import './style.css'
import PubSub from 'pubsub-js'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'

const coordinator = (() => {
  return {
    renderTasks: () => {
      const currentTasks = taskData.getTaskMap()
      if (!currentTasks) { return }
      for (const task of currentTasks.values()) {
        if (task === currentTasks.get('name')) { continue }
        if (task === currentTasks.get('order')) { continue }
        PubSub.publish('display task', task)
      }
      PubSub.publish('display new task button')
    },
    renderCategories: () => {
      const categoryMap = taskData.getCategories()
      for (const category of categoryMap.values()) {
        if (category.get('name') === taskData.getCurrentCategory()) {
          PubSub.publish('display current category', category.get('name'))
          continue
        }
        PubSub.publish('display category', category.get('name'))
      }
      PubSub.publish('display new category button')
    },
    renderCategoryHeader: () => {
      const currentCategory = taskData.getCurrentCategory()
      PubSub.publish('display category header', currentCategory)
    },
    // render: () => {
    //   coordinator.renderTasks()
    //   coordinator.renderCategories()
    //   coordinator.renderCurrentCategory()
    // },
  }
})()
manipulateDOM.initialize()
taskData.initialize()
coordinator.renderCategories()
coordinator.renderCategoryHeader()
coordinator.renderTasks()

PubSub.subscribe('clear and render tasks', () => {
  manipulateDOM.clearContent()
  coordinator.renderTasks()
  coordinator.renderCategoryHeader()
})
PubSub.subscribe('clear and render categories', () => {
  manipulateDOM.clearCategories()
  coordinator.renderCategories()
  manipulateDOM.clearContent()
  coordinator.renderTasks()
  coordinator.renderCategoryHeader()
})
