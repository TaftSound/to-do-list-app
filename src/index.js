import './style.css'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'
// import dataRetriever from './modules/retrieve-form-data.mjs'

manipulateDOM.createPageStructure()
taskData.addCategory('Work')
manipulateDOM.displayTask('Do some works', '09/01/2022')
manipulateDOM.displayTask('Do some other works', '09/02/2022')
manipulateDOM.displayCurrentCategory('Work Stuff')

