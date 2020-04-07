document.addEventListener('DOMContentLoaded', function() {
    getTasks()
    getFormInfo().addEventListener('submit', createNewTask)
    getAllCategories()
})

let tasks = []
let categories = []

let addTask = false
const addTaskButton = document.querySelector('#new-task-button')
const taskForm = document.querySelector('.container')
addTaskButton.addEventListener("click", () => {
    toggleNewFormButton()
});


const getFormInfo = () => document.querySelector('.add-task-form')
const getTaskList = () => document.querySelector('div.task-list')

const getTaskContent = () => document.getElementById('content').value 
const getCategoryName = () => document.getElementById('category').value
const getTaskByWhen = () => document.getElementById('by_when').value

function card(task) {
    return `
    <div class="card">
        <div class="card-content">
            <p>Content: ${task.content}</p>
            <p>By when: ${task.by_when}</p>
            <p>Category: ${task.category.name}</p>
            <h5>Completed: ${task.completed} </h5>
            <button class="completed-button" data-id=${task.id}>Completed!</button>
            <button class="delete-button" data-id=${task.id}>Delete</button>
        </div>
    </div>`   
}

// function addEventListenerToCompletedButton() {
//     const completedButton = document.querySelectorAll('.completed-button')
//     for (let i=0; i<completedButton.length; i++) {
//         completedButton[i].addEventListener('click', completeTask)
//         console.log(completedButton[i])
//     }
// }



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
    getTaskList().innerHTML += card(task)
    // add event listener to completed button
    const btn = document.querySelector('.completed-button')
    btn.addEventListener('click', completeTask)
    // add event listener to all completed buttons not just first one
    // debugger
}

function renderCategories() {
    categories.forEach(category => renderCategory(category))
}

function renderCategory(category) {
    getTaskList().innerHTML += card(category)
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

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(strongParams)
    })
    .then(response => response.json())
    .then(task => {
        tasks.push(task)
        renderTask(task)
    })
    .then(clearNewTaskForm())
    .then(toggleNewFormButton())
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

// complete button 

function completeTask(event) {
    console.log(event)
    const eventID = event.target.dataset.id
    console.log(eventID)
    console.log(event.target.previousElementSibling.innerText.split(' ')[1])
    const completedBool = event.target.previousElementSibling.innerText.split(' ')[1]
    // const completed = !completedBool
    // debugger
      
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "completed": !completedBool
      })
      }
      fetch(`http://localhost:3000/tasks/${eventID}`, configObj)
      .then(response=>response.json())
      .then(json=>{renderCompleted(json)
      }
      )
  }
  
  function renderCompleted(json) {
    // const ptags = document.querySelectorAll('p')
    // const cards = document.querySelectorAll('.card-content')
    const allCompletedButtons = document.querySelectorAll('.completed-button')
    for (let i=0; i<allCompletedButtons.length; i++) {
      if (parseInt(allCompletedButtons[i].dataset.id) === json.id) {
        colorTask(allCompletedButtons[i])
      }
    }
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

function colorTask(cardContent) {
    cardContent.classList.add('completed-task')
  }
  
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