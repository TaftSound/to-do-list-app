// due-date, subtask-strings - stored in array, notes-string, category

const categoryArray = []
const taskArray = []

const taskData = {
  addCategory: (name) => {
    const tasks = []
    const newCategory = { name, tasks }
    categoryArray.push(newCategory)
  },
  addTask: (task, dueDate, notes, ...subTasks) => {
    const newTask = { dueDate, task, notes, subTasks }
    taskArray.push(newTask)
  },
}

// need a way to link tasks to their category
// need a way to get task objects out of module to render them

export default taskData
