const helloModule = {
  sayHello: function () {
    const helloHeader = document.createElement("h1")
    helloHeader.textContent = "Hello"
    document.body.appendChild(helloHeader)
  },
}

export default helloModule
