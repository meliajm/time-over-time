let addTask = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-task-btn");
  const taskForm = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addTask = !addTask;
//     if (addTask) {
//         taskForm.style.display = "block";
//     } else {
//         taskForm.style.display = "none";
//     }
//   });

});

function completeTask(event) {
  // debugger
  const eventID = event.target.dataset.id
  const completedBool = event.target.previousElementSibling.innerText.split(' ')[1]

    
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
    console.log(configObj)
    fetch(`http://localhost:3000/tasks/${eventID}`, configObj)
    .then(response=>response.json())
    .then(json=>{console.log(json)
    }
    )
}



document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  const addTaskForm = document.querySelector('.add-task-form');
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // let name = e.srcElement.name.value; 
    // let image = e.srcElement.image.value;
    let formData = {
      content: content,
      by_when: by_when,
      completed: completed,
      category: category
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
      }
      return fetch('http://localhost:3000/tasks', configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) { 
        //  console.log(object);
        renderTask(object)
      }) 
      // .then(renderToy(name, image, json))
      .then(toggleNewFormButton())
      .then(clearNewToyForm())      
    })
});

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

// function submitToy(name, image) {
//   let formData = {
//     name: name,
//     image: image
//   };
  
//   let configObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(formData)
//     }.then(fetchToys()); 
  

//   return fetch(toysUrl, configObj)
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(object) {
      
//     console.log(object);
//   })
// };


function fetchTasks() {
  return fetch('http://localhost:3000/tasks')
  .then(resp => resp.json())
  .then(json =>{
      renderTasks(json)
  });
}

function renderTasks(json) {
  const taskListClass = document.querySelector('.task-list')
  json.forEach(task => {
    const divToAdd = document.createElement('div')
    divToAdd.classList.add("card")
    const secondDiv = document.createElement('div')
    secondDiv.classList.add("card-content")
    taskListClass.appendChild(divToAdd)
    divToAdd.appendChild(secondDiv)

    const p = document.createElement('p')
    p.innerText = `Content: ${task.content}`
    secondDiv.appendChild(p)
    const p2 = document.createElement('p')
    p2.innerText = `By when: ${task.by_when}`
    const p3 = document.createElement('p')
    p3.innerText = `Category: ${task.category.name}`
    secondDiv.appendChild(p)
    secondDiv.appendChild(p2)
    secondDiv.appendChild(p3)
    const completedButton = document.createElement('button')
    completedButton.classList.add('completed-button')
    completedButton.innerText = 'Completed!'
    completedButton.addEventListener('click', completeTask)
    completedButton.dataset.id = task.id
    secondDiv.appendChild(completedButton)
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', completeTask)
    deleteButton.dataset.id = task.id
    secondDiv.appendChild(deleteButton)
    h5 = document.createElement('h5')
    h5.id = 'hide-complete'
    h5.innerText = `Completed: ${task.completed}`

  })
}

function renderTask(object) {
    const divToAdd = document.createElement('div')
    divToAdd.classList.add("card")
    const secondDiv = document.createElement('div')
    secondDiv.classList.add("card-content")
    taskListClass.appendChild(divToAdd)
    divToAdd.appendChild(secondDiv)

    const p = document.createElement('p')
    p.innerText = `Content: ${object.content}`
    secondDiv.appendChild(p)
    const p2 = document.createElement('p')
    p2.innerText = `By when: ${object.byWhen}`
    const p3 = document.createElement('p')
    p3.innerText = `Category: ${object.category.name}`
    secondDiv.appendChild(p)
    secondDiv.appendChild(p2)
    secondDiv.appendChild(p3)
    const completedButton = document.createElement('button')
    completedButton.classList.add('completed-button')
    completedButton.innerText = 'Completed!'
    completedButton.addEventListener('click', completeTask)
    completedButton.dataset.id = object.id
    secondDiv.appendChild(completedButton)
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', deleteTask)
    deleteButton.dataset.id = object.id
    secondDiv.appendChild(deleteButton)
    h5 = document.createElement('h5')
    h5.id = 'hide-complete'
    h5.innerText = `Completed: ${object.completed}`
}

// cannot like new toy before refreshing