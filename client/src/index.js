let tasks = []

let addTask = false
const addTaskButton = document.querySelector('#new-task-button')
const taskForm = document.querySelector('.container')
const getFormInfo = () => document.querySelector('.add-task-form')
const getTaskList = () => document.querySelector('div.task-list')

const getTaskContent = () => document.getElementById('content').value 
const getCategoryName = () => document.getElementById('category').value
const getTaskByWhen = () => document.getElementById('by_when').value

document.addEventListener('DOMContentLoaded', function() {
    getTasks()
    getFormInfo().addEventListener('submit', createNewTask)
    getAllCategories()
})

addTaskButton.addEventListener("click", () => {
    toggleNewFormButton()
});


function card(task) {
    return `
    <div class="card">
        <div class="card-content">
            <p>Content: ${task.content}</p>
            <p>By when: ${task.by_when}</p>
            <p>Category: ${task.category.name}</p>
            <h5 id="hide-complete">Completed: ${task.completed} </h5>
            <button class="completed-button" data-id=${task.id}>Completed!</button>
            <button class="delete-button" data-id=${task.id}>Delete</button>
        </div>
    </div>`   
}


function getTasks() {
    fetch('http://localhost:3000/tasks')
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
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
    // find or create big card by day
    const bigCard = document.getElementById(task.get_date) || createBigCard(task.get_date)
    // const bigCard = findOrCreateBigCard(task.get_date)
    // attach task to big card
    bigCard.innerHTML += card(task)
    const btns = document.querySelectorAll('.completed-button')
    btns.forEach(btn => btn.addEventListener('click', completeTask))
}

function createBigCard(taskGetDate) {
    bigCard = document.createElement('div')
    bigCard.id = taskGetDate
    bigCard.classList.add('big-card')
    getTaskList().appendChild(bigCard)
    return bigCard
}

function createNewTask(e) {
    e.preventDefault()
    const categoryName = getCategoryName()
    const taskContent = getTaskContent()
    const taskByWhen = getTaskByWhen()
    let strongParams = {
        category: {name: categoryName},
        task: {
            content: taskContent,
            by_when: taskByWhen
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
    
const categoryNames = []

function getAllCategories() {
    fetch('http://localhost:3000/categories')
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
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
        document.querySelector('#category').placeholder = categoryNames
      } else {
        taskForm.style.display = "none";
      }
}

function clearNewTaskForm() {
    const inputTextAll = document.querySelectorAll(".input-text")
    inputTextAll.forEach( inputText => inputText.value = "")
}


function completeTask(event) {
    const eventID = event.target.dataset.id
    console.log('event id')
    console.log(eventID)
    const completedBool = event.target.previousElementSibling.innerText.split(' ')[1]   
    console.log(completedBool)
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "completed": true
      })
      }
      fetch(`http://localhost:3000/tasks/${eventID}`, configObj)
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json()
      })
      .then(function (json) {
        renderCompleted(json)
      })
      .catch(errors => console.log(errors))
  }
  
  function renderCompleted(json) {
    const allCompletedButtons = document.querySelectorAll('.completed-button')
    for (let i=0; i<allCompletedButtons.length; i++) {
      if (parseInt(allCompletedButtons[i].dataset.id) === json.id) {
        colorTask(allCompletedButtons[i].parentElement)
      }
    }
  }

  function colorTask(cardContent) {
      cardContent.classList.add('completed-task')
    }

/*
when user clicks on completed button, card or task changes to new color
triggered by click
when can be trigger dom loaded

Access to fetch at 'http://localhost:3000/tasks/1' from origin 'null'
 has been blocked by CORS policy: Response to preflight request doesn't
  pass access control check: No 'Access-Control-Allow-Origin' header is
   present on the requested resource. If an opaque response serves your
    needs, set the request's mode to 'no-cors' to fetch the resource with 
    CORS disabled.
*/

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelectorAll('.card-content').forEach(elem => addEventListener('click', handleClick))
// })

  
// function clearTaskColor(cardContent) {
//     cardContent.classList.remove('completed-task')
// }

// function handleClick(e) {
//     mimicServerCall()
//     .then(response => {
//       if (e.target.classList !== 'completed-task') {
//         colorTask(e.target)
//       } else {
//         clearTaskColor(e.target)
//       }  
//     })
//     .catch((error) => {
//       showError()
//     })
// }




// delete action -- destroy