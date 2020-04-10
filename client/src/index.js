// variables
let tasks = []
const categoryNames = []
let totalTasks = 0
let completedTasksArray = []

let addTask = false
const addTaskButton = document.querySelector('#new-task-button')
const taskForm = document.querySelector('.container')
const getFormInfo = document.querySelector('.add-task-form')
const getTaskList = document.querySelector('div.task-list')

const getTaskContent = () => document.getElementById('content').value 
const getCategoryName = () => document.getElementById('category').value
// const getTaskByWhen = () => document.getElementById('by_when').value


// event listeners

document.addEventListener('DOMContentLoaded', function() {
    getTasks()
    getFormInfo.addEventListener('submit', createNewTask)
    getAllCategories()
})

addTaskButton.addEventListener("click", () => {
    toggleNewFormButton()
});

// functions

function card(task, color) {
    return `
    <div class="card">
        <div class="card-content ${color}">
            <p><strong>${Formatter.titleize(task.content)}</strong></p>
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
        totalTasks = data.length
        // console.log(totalTasks)
        data.forEach( task => {
            if (task.completed === true) {
              completedTasksArray.push(task)
            }
        })
        //   console.log(data)
        // tasks = data.sort(function(taskA, taskB) {
        //     return taskB.id - taskA.id
        // })
        tasks = data
        renderTasks()
      })
      .then(function () {
        renderCirlce(completedTasksArray.length / totalTasks * 100)
      })
      .catch(errors => console.log(errors))
}

function renderCirlce(percentCompleted) {
    const ptag = document.getElementById('top-doc')
    ptag.insertAdjacentHTML('beforeend', circle(percentCompleted))
}

function circle(percentCompleted) {
    return `
    <svg viewBox="0 0 36 36" class="circular-chart">
        <path class="circle"
        stroke-dasharray="${percentCompleted}"
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
    </svg>
    `   
}

function renderTasks() {
    tasks.forEach(task => renderTask(task))
}

function renderTask(task) {
    const bigCard = document.getElementById(task.get_date) || createBigCard(task.get_date)
    // const completedButtonForTask = parseInt(document.querySelector('.completed-button').dataset.id)
    // get button
    
        if (task.category_id === 1) {
            let color = 'dodger'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 2) {
            let color = 'blue'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 11) {
            let color = 'royal'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 14) {
            let color = 'sky'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 15) {
            let color = 'selective'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 16) {
            let color = 'sandstorm'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 17) {
            let color = 'minion'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        } else if (task.category_id == 18) {
            let color = 'flavescent'
            bigCard.insertAdjacentHTML('afterbegin', card(task, color));
        }  
        
        const btns = document.querySelectorAll('.completed-button')
        btns.forEach(btn => btn.addEventListener('click', completeTask))
        const deleteButtons = document.querySelectorAll('.delete-button')
        deleteButtons.forEach(button => button.addEventListener('click', deleteTask))
        
        if (task.completed) {
            renderCompleted(task)
        }
}


function createBigCard(taskGetDate) {
    bigCard = document.createElement('div')
    bigCard.id = taskGetDate
    bigCard.classList.add('big-card')
    // getTaskList.appendChild(bigCard)
    getTaskList.insertBefore(bigCard, getTaskList.firstChild);

    // getTaskList.insertBefore(bigCard)
    // parentNode.insertBefore(newNode, referenceNode)
    // getTaskList.insertAdjacentElement('afterbegin', bigCard)
    // beforebegin
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
            content: Formatter.titleize(taskContent),
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
        json.forEach(cat => categoryNames.push(cat))
        return unique(categoryNames)
      })
      .then(function(categories) {
          makeDropDownListOfCategories(categories)
      })
      .catch(errors => console.log(errors));
}

function makeDropDownListOfCategories(cats) {
    // const inputTextNewTaskForm = document.querySelector('.input-text')
    // const label = document.createElement('label')
    // label.classList.add('categories-for-drop-down')

    // <!-- <select id="category" class="input-text">
    // <option disabled="disabled" selected="selected">Choose your category</option> 

    const selectElem = document.createElement('select')
    selectElem.classList.add('input-text')
    selectElem.id = 'category'
    // inputTextNewTaskForm.insertAdjacentElement('beforeend', selectElem)
    getFormInfo.appendChild(selectElem)

    const option = document.createElement('option')
    option.disabled = true
    option.selected = 'selected' 
    option.innerHTML = 'Choose your category'

    cats.forEach( cat => {
        // console.log(cat)
        const optionElem = document.createElement('option')
        optionElem.value = cat.name
        optionElem.innerHTML = cat.name
        selectElem.appendChild(optionElem)
    })
    // getFormInfo.appendChild(inputTextNewTaskForm)
}

function unique(array) {
    let arrA = []
    for (let i=0; i<array.length; i++) {
      if (!arrA.includes(array[i])) {
        arrA.push(array[i])
      } 
    }
    return arrA
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
    .then(function (){
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
      .then(function() {
        // renderCirlce(percentCompleted)
      })
      .catch(errors => console.log(errors))
  }
  
  function renderCompleted(json) {
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
    } else if (json.category_id === 11) {
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


