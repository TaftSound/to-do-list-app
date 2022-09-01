import './style.css'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'
// import dataRetriever from './modules/retrieve-form-data.mjs'

manipulateDOM.initialize()
taskData.addCategory('Work')
taskData.initialize()
manipulateDOM.displayCurrentCategory('Work Stuff')

