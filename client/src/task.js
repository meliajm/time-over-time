class Task {

  static all = []

  constructor(data) {
    this.id = data.id
    this.content = data.content
    this.category = data.category
    this.completed = data.completed
    this.get_date = data.get_date
    this.category_id = data.category_id
    this.save()
  }

  save() {
    Task.all.push(this)
  }

  card(color) {
    return `
    <div class="card">
        <div class="card-content ${color}">
            <p><strong>${Formatter.titleize(this.content)}</strong></p>
            <p id="hide-complete">By when: </p>
            <p>${this.category.name}</p>
            <h5 id="hide-complete">Completed: ${this.completed} </h5>
            <button class="completed-button" data-id=${this.id}>Completed!</button>
            
            <button class="delete-button" data-id=${this.id}>x</button>
        </div>
    </div>
    <br>
    <br>`  
  }

  static renderTasks() {
    Task.all.forEach(task => task.render())
  }

  render() {
    // console.log(this)
    // console.log(this.get_date)
    const bigCard = document.getElementById(this.get_date) || Task.createBigCard(this.get_date)
        if (this.category_id === 1) {
            let color = 'dodger'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 2) {
            let color = 'blue'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 11) {
            let color = 'royal'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 14) {
            let color = 'sky'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 15) {
            let color = 'selective'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 16) {
            let color = 'sandstorm'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 17) {
            let color = 'minion'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        } else if (this.category_id == 18) {
            let color = 'flavescent'
            bigCard.insertAdjacentHTML('afterbegin', this.card(color));
        }  
        
        const btns = document.querySelectorAll('.completed-button')
        btns.forEach(btn => btn.addEventListener('click', completeTask))
        const deleteButtons = document.querySelectorAll('.delete-button')
        deleteButtons.forEach(button => button.addEventListener('click', Task.deleteTask))
        
        if (this.completed) {
            renderCompleted(this)
        }
  }

  static createBigCard(taskGetDate) {
    let bigCard = document.createElement('div')
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

  static createNewTask(e) {
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
    .then(data => {
        let task = new Task(data)
        task.render()
        clearNewTaskForm()
        toggleNewFormButton()
    })
    }

    

  static getTasks() {
    Api.get('/tasks')
      .then(function (data) {
        totalTasks = data.length
        data.forEach( task => new Task(task))
          Task.renderTasks()
        data.forEach( task => { 

          if (task.completed === true) {
            completedTasksArray.push(task)
          }
        })
      })
      .then(function () {
        renderCirlce(completedTasksArray.length / totalTasks * 100)
      })
      .catch(errors => console.log(errors))
  }

  static deleteTask(event) {
    const eventID = event.target.dataset.id 
    Api.delete(`/tasks/${eventID}`)
    .then(function () {
        const allDeleteButtons = document.querySelectorAll('.delete-button')
        for (let i=0; i<allDeleteButtons.length; i++) {
            if (allDeleteButtons[i].dataset.id === eventID) {
            allDeleteButtons[i].parentElement.id = 'hide-complete'
        }
      }
    }) 
  }
  




}