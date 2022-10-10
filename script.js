// variables
const listEl = document.getElementById("ul-todo")
const btnEl = document.getElementById("btn-todo")
const msgEl = document.getElementById("message")
let todoList = []

// do these things when updating the list
const update = function () {
  addToLocalStorage()
  populateList()
  finishedNumber()
}

// how many todo items are finished?
const finishedNumber = function () {
  const num = todoList.filter(todo => todo.done === true)
  document.getElementById("finished").textContent = `${num.length} task${num.length === 1 ? "" : "s"} completed`
}

// using local storage as database for data persistance
const addToLocalStorage = function () {
  localStorage.setItem("todos", JSON.stringify(todoList))
}

// getting items from local storage
const getFromLocalStorage = function () {
  const lsToDos = localStorage.getItem("todos")
  if (lsToDos) {
    todoList = JSON.parse(lsToDos)
    populateList()
    finishedNumber()
  }
}

// get from local storage from earlier sessions
window.addEventListener("load", getFromLocalStorage)

// submitting form = adding new todo
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

// when clicking item, mark complete or incomplete
const markComplete = function (index) {
  todoList[index].done = !todoList[index].done

  // just for fun
  document.getElementById("hourglass").classList.toggle("wiggle")
  setTimeout(() => {
    document.getElementById("hourglass").classList.toggle("wiggle")
  }, 2000)

  update()
  finishedNumber()
}

// delete todoList item from Array and update the list
const deleteTodo = function (index) {
  todoList.splice(index, 1)
  update()
}

// add list to ul
const populateList = function () {
  listEl.innerHTML = "" // reset old list
  let htmlString = ""
  todoList.forEach((todo, i) => {
    htmlString += `
    <li class="${i === (todoList.length - 1) ? "latestEntry" : null}">
    <button onclick="deleteTodo(${i})" class="delete"></button>
    <span onclick="markComplete(${i})" class="${todo.done ? "done" : null}">${i + 1}. ${todo.todo}</span>
    </li>
    `
  })
  listEl.innerHTML = htmlString
}