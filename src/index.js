import './style.css'
import manipulateDOM from './modules/DOM-manipulation.mjs'
import taskData from './modules/todo-data.mjs'

manipulateDOM.createPageStructure()
taskData.addCategory('Work', 'Do some of it brah')
taskData.addTask(
  'Do da hose down da gardin',
  'feb 25',
  'some notes',
  'schmoop',
  'more schmmop',
  'actually even more schmoop'
)
manipulateDOM.displayTask('Do some works', '09/01/2022')
manipulateDOM.displayTask('Do some other works', '09/02/2022')
manipulateDOM.displayCurrentCategory('Work Stuff')
manipulateDOM.displayNewTaskButton()
