const one = document.querySelector("#one")
const two = document.querySelector("#two")
const three = document.querySelector("#three")
const four = document.querySelector("#four")
const styles = document.querySelector("#styles")

one.addEventListener("click", () => {
  styles.href = "first.css";
  document.querySelector("h1").textContent = "Do some ToDos"
  update()
})
two.addEventListener("click", () => {
  document.querySelector("h1").textContent = "to-do-list"
  styles.href = "style.css";
  update()
})
three.addEventListener("click", () => {
  document.querySelector("h1").textContent = "ToDo List"
  styles.href = "third.css";
  update()
})
four.addEventListener("click", () => {
  document.querySelector("h1").textContent = "ToDo List"
  styles.href = "fourth.css";
  update()
})

// variables
const listEl = document.getElementById("ul-todo")
const btnEl = document.getElementById("btn-todo")
const msgEl = document.getElementById("message")
let todoList = []

// do these things when updating the list
const update = function () {
  console.log("update")
  setTimeout(function () {
    todoList = todoList.map(entry => {
      return { ...entry, justAdded: false }
    })
  }, 2000)

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
    msgEl.style.display = "block"
    msgEl.textContent = "Your todo needs to be at least 3 characters long."
    return
  } else {
    todoList.push({ todo: text, time: new Date().getTime(), done: false, justAdded: true })
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

  const trueOrNot = styles.href.includes("third")

  if (trueOrNot) {
    console.log("hi")
    todoList.forEach((todo, i) => {
      htmlString += `
      <li class="${todo.justAdded ? "latestEntry" : null}">
      <span onclick="markComplete(${i})" class="${todo.done ? "done" : null}">${todo.todo}</span>
      <button onclick="deleteTodo(${i})" class="delete"></button>
      </li>
      `
    })
  } else {
    todoList.forEach((todo, i) => {
      htmlString += `
      <li class="${todo.justAdded ? "latestEntry" : null}">
      <span onclick="markComplete(${i})" class="${todo.done ? "done" : null}">${i + 1}. ${todo.todo}</span>
      <button onclick="deleteTodo(${i})" class="delete"></button>
      </li>
      `
    })
  }

  listEl.innerHTML = htmlString
}