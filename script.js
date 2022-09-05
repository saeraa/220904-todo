const listEl = document.getElementById("ul-todo")
const sortEl = document.getElementById("sort")
const btnEl = document.getElementById("btn-todo")
const msgEl = document.getElementById("message")
let todoList = []

const update = function() {
  addToLocalStorage()
  populateList()
}

const finishedNumber = function() {
  const num = todoList.filter(todo => todo.done === true)
  console.log(num)
  document.getElementById("finished").textContent = `${num.length} tasks completed`
}

const addToLocalStorage = function() {
  localStorage.setItem("todos", JSON.stringify(todoList))
}

const getFromLocalStorage = function() {
  const lsToDos = localStorage.getItem("todos")
  if (lsToDos) {
    todoList = JSON.parse(lsToDos)
    populateList()
    finishedNumber()
  }
}

window.addEventListener("load", getFromLocalStorage)

const sortList = function(event) {
  const { value } = event.target
  if (value === "newest") {
    todoList.sort((a, b) => a.time - b.time);
    update()
  } else if (value === "oldest") {
    todoList.sort((a, b) => b.time - a.time);
    update()
  } else if (value === "not-done") {
    todoList.sort((a, b) => a.done - b.done);
    update()
  }
}

const handleSubmit = function (event) {
  const text = event.target[0].value
  event.preventDefault()

  if (text.length < 3) { 
    msgEl.style.display = "inline-block"
    msgEl.textContent = "Your todo needs to be at least 3 characters long."
    return
  } else {
    todoList.push({ todo: text, time: new Date().getTime(), done: false })
    msgEl.textContent = ""
    msgEl.style.display = "none"
    event.target.reset()
    update()
  }
}

const markComplete = function(index) {
  todoList[index].done = !todoList[index].done

  document.getElementById("hourglass").classList.toggle("wiggle")
  setTimeout(() => {
    document.getElementById("hourglass").classList.toggle("wiggle")
  }, 2000)

  update()
  finishedNumber()
}

const deleteTodo = function(index) {
  todoList.splice(index, 1)
  update()
}

const populateList = function() {
  listEl.innerHTML = ""
  let htmlString = ""
  todoList.forEach((todo, i) => {
    htmlString += `
    <li>
    <span onclick="markComplete(${i})" class="${todo.done ? "done" : null}">${todo.todo}</span>
    <button onclick="deleteTodo(${i})" class="delete"></button>
    </li>
    `
  })
  listEl.innerHTML = htmlString
}