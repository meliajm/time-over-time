document.addEventListener('DOMContentLoaded', function() {
    getTasks()
    getFormInfo().addEventListener('submit', createNewTask)
})

let tasks = []

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
    getTaskList().innerHTML += card(task)

}

function createNewTask(e) {

    e.preventDefault()
    /* 
    strong params:
    {
        category: {
            name: 'Mental Health'
        },
        task: {
            content: 'Go to grocery',
            by_when: '2020-06-30T20:56:36.024Z'
        }
    }
    */

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

function toggleNewFormButton() {
    addTask = !addTask;
      if (addTask) {
        taskForm.style.display = "block";
      } else {
        taskForm.style.display = "none";
      }
}

function clearNewTaskForm() {
    const inputTextAll = document.querySelectorAll(".input-text")
    inputTextAll.forEach( inputText => inputText.value = "")
}

// complete button 




/*
when user clicks on completed button, card or task changes to new color
triggered by click
when can be trigger dom loaded
*/

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card-content').forEach(elem => addEventListener('click', handleClick))
})

function colorTask(cardContent) {
    cardContent.classList.add('completed-task')
  }
  
function clearTaskColor(cardContent) {
    cardContent.classList.remove('completed-task')
}

function handleClick(e) {
    mimicServerCall()
    .then(response => {
      if (e.target.classList !== 'completed-task') {
        colorTask(e.target)
      } else {
        clearTaskColor(e.target)
      }  
    })
    .catch((error) => {
      showError()
    })
}




// delete action -- destroy