document.addEventListener('DOMContentLoaded', function() {
    getTasks();
    getFormInfo().addEventListener('submit', createNewTask)
})

let tasks = []

const getFormInfo = () => document.querySelector('.add-task-form')
// not sure if this is needed below
const getTaskList = () => document.querySelector('')

const getTaskName = () => document.getElementById('').value 
const getCategory = () => document.getElementById('').value
const getContent = () => document.getElementById('').value

function card(task) {
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
    // fetch, sends a GET request by default
  
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
    get???

}

function createNewTask(e) {

    e.preventDefault()
    
}

