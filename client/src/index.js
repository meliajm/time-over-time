document.addEventListener('DOMContentLoaded', function() {
    getTasks();
    getFormInfo().addEventListener('submit', createNewTask)
})

let tasks = []

const getFormInfo = () => document.querySelector('.add-task-form')
const getTaskList = () => document.querySelector('div.task-list')

const getTaskContent = () => document.getElementById('content').value 
const getCategoryName = () => document.getElementById('category').value
const getTaskByWhen = () => document.getElementById('by_when').value

function card(task) {
    console.log(task)
    return `
    <div class="card">
        <div class="card-content">
            <p>Content: ${task.content}</p>
            <p>By when: ${task.by_when}</p>
            <p>Category: ${task.category.name}</p>
        </div>
    </div>
    `
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
}