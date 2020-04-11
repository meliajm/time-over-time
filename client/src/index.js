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

document.addEventListener('DOMContentLoaded', function () {
    Task.getTasks() 
    getFormInfo.addEventListener('submit', Task.createNewTask)
    getAllCategories()
  })

// event listeners

// document.addEventListener('DOMContentLoaded', function() {
//     getTasks()
//     getFormInfo.addEventListener('submit', createNewTask)
//     getAllCategories()
// })

addTaskButton.addEventListener("click", () => {
    toggleNewFormButton()
});

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
    const selectElem = document.createElement('select')
    selectElem.classList.add('input-text')
    selectElem.id = 'category'
    getFormInfo.appendChild(selectElem)
    const option = document.createElement('option')
    option.disabled = 'disabled'
    option.selected = 'selected' 
    option.innerHTML = 'Choose your category'
    selectElem.appendChild(option)

    cats.forEach( cat => {
        const optionElem = document.createElement('option')
        optionElem.value = cat.name
        optionElem.innerHTML = cat.name
        selectElem.appendChild(optionElem)
    })
    const inputSubmit = document.createElement('input')
    inputSubmit.type = 'submit'
    inputSubmit.name = 'name'
    inputSubmit.value = 'Create'
    inputSubmit.classList.add('submit')
    const brk = document.createElement('br')
    getFormInfo.appendChild(brk)
    getFormInfo.appendChild(inputSubmit)
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

// function deleteTask(event) {
//     const eventID = event.target.dataset.id 
//     Api.delete(`/tasks/${eventID}`)
//     .then(function (){
//         const allDeleteButtons = document.querySelectorAll('.delete-button')
//         for (let i=0; i<allDeleteButtons.length; i++) {
//             if (allDeleteButtons[i].dataset.id === eventID) {
//             allDeleteButtons[i].parentElement.id = 'hide-complete'
//         }
//       }
//     }) 
// }

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


