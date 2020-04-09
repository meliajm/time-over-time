// variables
let tasks = []
const categoryNames = []

let addTask = false
const addTaskButton = document.querySelector('#new-task-button')
const taskForm = document.querySelector('.container')
const getFormInfo = () => document.querySelector('.add-task-form')
const getTaskList = () => document.querySelector('div.task-list')

const getTaskContent = () => document.getElementById('content').value 
const getCategoryName = () => document.getElementById('category').value
// const getTaskByWhen = () => document.getElementById('by_when').value


// event listeners

document.addEventListener('DOMContentLoaded', function() {
    getTasks()
    getFormInfo().addEventListener('submit', createNewTask)
    getAllCategories()
})

addTaskButton.addEventListener("click", () => {
    toggleNewFormButton()
});

// functions

function card(task) {
    return `
    <div class="card">
        <div class="card-content">
            <p><strong>${task.content}</strong></p>
            <p id="hide-complete">By when: </p>
            <p>${task.category.name}</p>
            <h5 id="hide-complete">Completed: ${task.completed} </h5>
            <button class="completed-button" data-id=${task.id}>Completed!</button>
            
            <button class="delete-button" data-id=${task.id}>x</button>
        </div>
    </div>
    <br>
    <br>`   
}

// get tasks 
function getTasks() {
    Api.get('/tasks')
      .then(function (data) {
        tasks = data;
        renderTasks()
      })
      .catch(errors => console.log(errors));
}

function renderTasks() {
    tasks.forEach(task => renderTask(task))
}

function renderTask(task) {
    const bigCard = document.getElementById(task.get_date) || createBigCard(task.get_date)
    // const completedButtonForTask = parseInt(document.querySelector('.completed-button').dataset.id)
    // get button

    bigCard.innerHTML += card(task)

    const btns = document.querySelectorAll('.completed-button')
    btns.forEach(btn => btn.addEventListener('click', completeTask))
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => button.addEventListener('click', deleteTask))
    
    if (task.completed) {
        for (let i=0;i<btns.length;i++){
            if (parseInt(btns[i].dataset.id) === 1) {
                btns[i].classList.add('completed-task-dodger')
            } else if (task.category_id === 2) {
                btns[i].classList.add('completed-task-blue')
            } else if (parseInt(btns[i].dataset.id) == 3) {
                btns[i].classList.add('completed-task-royal')
            } else if (parseInt(btns[i].dataset.id) === 4) {
                btns[i].classList.add('completed-task-sky')
            } else if (parseInt(btns[i].dataset.id) === 5) {
                btns[i].classList.add('completed-task-selective')
            } else if (parseInt(btns[i].dataset.id) === 6) {
                btns[i].classList.add('completed-task-sandstorm')
            } else if (parseInt(btns[i].dataset.id) === 7) {
                btns[i].classList.add('completed-task-minion')
            } else if (parseInt(btns[i].dataset.id) === 8) {
                btns[i].classList.add('completed-task-flavescent')
            }   
        }
    } else {
        btns.forEach( btn => {
            if (task.category_id === 1) {
                console.log(task.category_id)
                console.log(btn)
                btn.parentElement.classList.add('dodger')
            } else if (task.category_id === 2) {
                btn.parentElement.classList.add('blue')
            } else if (parseInt(btn.dataset.id) === 3) {
                btn.parentElement.classList.add('royal')
            } else if (parseInt(btn.dataset.id) === 4) {
                btn.parentElement.classList.add('sky')
            } else if (parseInt(btn.dataset.id) === 5) {
                btn.parentElement.classList.add('selective')
            } else if (parseInt(btn.dataset.id) === 6) {
                btn.parentElement.classList.add('sandstorm')
            } else if (parseInt(btn.dataset.id) === 7) {
                btn.parentElement.classList.add('minion')
            } else if (parseInt(btn.dataset.id) === 8) {
                btn.parentElement.classList.add('flavescent')
            }
        })
        
    }
   
    
}

function createBigCard(taskGetDate) {
    bigCard = document.createElement('div')
    bigCard.id = taskGetDate
    bigCard.classList.add('big-card')
    getTaskList().appendChild(bigCard)
    return bigCard
}

// create new task

function createNewTask(e) {
    e.preventDefault()
    const categoryName = getCategoryName()
    const taskContent = getTaskContent()
    // const taskByWhen = getTaskByWhen()
    let strongParams = {
        category: {name: categoryName},
        task: {
            content: taskContent,
            // by_when: taskByWhen
        }
    }
    Api.post('/tasks', strongParams)
    .then(task => {
        tasks.push(task)
        renderTask(task)
        clearNewTaskForm()
        toggleNewFormButton()
    })
    }
    
// new task form display
function getAllCategories() {
    Api.get('/categories')
      .then(function (json) {
        json.forEach(cat => categoryNames.push(cat.name))
        return categoryNames
      })
      .catch(errors => console.log(errors));
}

function toggleNewFormButton() {
    addTask = !addTask;
      if (addTask) {
        taskForm.style.display = "block";
        // document.querySelector('#category').placeholder = categoryNames
      } else {
        taskForm.style.display = "none";
      }
}

function clearNewTaskForm() {
    const inputTextAll = document.querySelectorAll(".input-text")
    inputTextAll.forEach( inputText => inputText.value = "")
}

function deleteTask(event) {
    const eventID = event.target.dataset.id 
    Api.delete(`/tasks/${eventID}`)
    .then(function (json){
        const allDeleteButtons = document.querySelectorAll('.delete-button')
        for (let i=0; i<allDeleteButtons.length; i++) {
            if (allDeleteButtons[i].dataset.id === eventID) {
            allDeleteButtons[i].parentElement.id = 'hide-complete'
        }
      }
    }) 
}

function completeTask(event) {
    const eventID = event.target.dataset.id
    Api.patch(`/tasks/${eventID}`, {
        "completed": true
        }
      )
      .then(function (json) {
        renderCompleted(json)
      })
      .catch(errors => console.log(errors))
  }
  
  function renderCompleted(json) {
      console.log(json)
    const allCompletedButtons = document.querySelectorAll('.completed-button')
    for (let i=0; i<allCompletedButtons.length; i++) {
      if (parseInt(allCompletedButtons[i].dataset.id) === json.id) {
        colorTask(json, allCompletedButtons[i])
      }
    }
  }

  function colorTask(json, button) {
    if (json.category_id === 1) {
        button.classList.add('completed-task-dodger')
    } else if (json.category_id === 2) {
        button.classList.add('completed-task-blue')
    } else if (json.category_id === 3) {
      button.classList.add('completed-task-royal')
    } else if (json.category_id === 4) {
      button.classList.add('completed-task-sky')
    } else if (json.category_id === 5) {
      button.classList.add('completed-task-selective')
    } else if (json.category_id === 6) {
      button.classList.add('completed-task-sandstorm')
    } else if (json.category_id === 7) {
    button.classList.add('completed-task-minion')
    } else if (json.category_id === 8) {
      button.classList.add('completed-task-flavescent')
    }
  }
