const header = document.createElement("div")
const sidebar = document.createElement("div")
const content = document.createElement("div")

const manipulateDOM = {
  createPageStructure: () => {
    header.classList.add("header")
    sidebar.classList.add("sidebar")
    content.classList.add("content")
    document.body.appendChild(header)
    document.body.appendChild(sidebar)
    document.body.appendChild(content)
  },
}

export default manipulateDOM
