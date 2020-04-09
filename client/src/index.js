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

function card(task, color) {
    return `
    <div class="card">
        <div class="card-content ${color}">
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
    if (task.completed) {
        if (task.category_id === 1) {
            let color = 'dodger'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 2) {
            let color = 'blue'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 3) {
            let color = 'royal'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 4) {
            let color = 'sky'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 5) {
            let color = 'selective'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 6) {
            let color = 'sandstorm'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 7) {
            let color = 'minion'
            bigCard.innerHTML += card(task, color)
        } else if (task.category_id == 8) {
            let color = 'flavescent'
            bigCard.innerHTML += card(task, color)
        }   
    } else {
        bigCard.innerHTML += card(task)
    }
    const btns = document.querySelectorAll('.completed-button')
    btns.forEach(btn => btn.addEventListener('click', completeTask))
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => button.addEventListener('click', deleteTask))
}

// function renderTask(task) {
//     const bigCard = document.getElementById(task.get_date) || createBigCard(task.get_date)
//     // const completedButtonForTask = parseInt(document.querySelector('.completed-button').dataset.id)
//     // get button

//     bigCard.innerHTML += card(task)
//     console.log(task)
//     console.log(task.category_id)
//     console.log('-------------')
//     const btns = document.querySelectorAll('.completed-button')
//     btns.forEach(btn => btn.addEventListener('click', completeTask))
//     const deleteButtons = document.querySelectorAll('.delete-button')
//     deleteButtons.forEach(button => button.addEventListener('click', deleteTask))
//     // {1: 'dodger', 2: 'blue', 11: 'royal', 4: 'sky', 5: 'selective', 6: 'sandstorm', 7: 'minion', 8: 'flavescent'}
//     // btns.forEach( btn => {
//     //     if (task.category_id === 1) {
//     //         btn.parentElement.classList.add('dodger')
//     //     } else if (task.category_id === 2) {
//     //         btn.parentElement.classList.add('blue')
//     //     } else if (task.category_id === 3) {
//     //         btn.parentElement.classList.add('royal')
//     //     } else if (task.category_id === 4) {
//     //         btn.parentElement.classList.add('sky')
//     //     } else if (task.category_id === 5) {
//     //         btn.parentElement.classList.add('selective')
//     //     } else if (task.category_id === 6) {
//     //         btn.parentElement.classList.add('sandstorm')
//     //     } else if (task.category_id === 7) {
//     //         btn.parentElement.classList.add('minion')
//     //     } else if (task.category_id === 8) {
//     //         btn.parentElement.classList.add('flavescent')
//     //     }
//     // })
    
//     if (task.completed) {
//         // btns.forEach( btn => {
//         //     colorTask(task, btn)
//         // })
//     } else {
//         console.log('else')
//         console.log(task.category_id)
//         console.log('------')

           
//     }
// }

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
    //   console.log(json)
    const allCompletedButtons = document.querySelectorAll('.completed-button')
    for (let i=0; i<allCompletedButtons.length; i++) {
      if (parseInt(allCompletedButtons[i].dataset.id) === json.id) {
        colorTask(json, allCompletedButtons[i])
      }
    }
  }

  function colorTask(json, button) {
    console.log('colortask')
    console.log(json.category_id)
    console.log('------')

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
