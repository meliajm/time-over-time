class Task {

  static all = []

  static completedTasksArray = []

  constructor(data) {
    this.id = data.id
    this.content = data.content
    this.category = data.category
    this.completed = data.completed
    this.get_date = data.get_date
    this.category_id = data.category_id
    this.user_id = data.user_id
    this.user = data.user
    this.save()
  }

  save() {
    if (Auth.currentUser.id === this.user_id) {
      Task.all.push(this)
    }
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
    Task.all.reverse().forEach(task => task.render())
  }

  render() {
    const bigCard = document.getElementById(this.get_date) || Task.createBigCard(this.get_date)
    // Task.createMonthCard(this.get_date)
    // let date = new Date(this.get_date)
    let color = colorObj[`${this.category_id}`]
    bigCard.insertAdjacentHTML('beforeend', this.card(color))
    const btns = document.querySelectorAll('.completed-button')
    btns.forEach(btn => btn.addEventListener('click', Task.completeTask))
    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => button.addEventListener('click', Task.deleteTask))
    
    if (this.completed) {
      Task.renderCompleted(this)
    }    
  }
  
  static createBigCard(taskGetDate) {
    const taskMonth = taskGetDate.slice(0, 2)
    const monthCard = document.getElementById(taskMonth) || Task.createMonthCard(taskMonth)
    // let monthCards = getTaskList.querySelectorAll('.month-card')
    let bigCard = document.createElement('div')
    bigCard.id = taskGetDate
    bigCard.classList.add('big-card')
    monthCard.appendChild(bigCard)
    Task.addWeekDayToBigCard()
    return bigCard
  }

  

  static createMonthCard(taskMonth) {
    let monthCard = document.createElement('div')
    const ptag = document.createElement('p')
    // monthCard.appendChild(ptag)
    ptag.classList = 'month-header'
    monthCard.id = taskMonth
    monthCard.classList.add('month-card')
    getTaskList.insertBefore(monthCard, null)
    Task.addMonthNameToMonthCard()
    return monthCard
  }

  static addMonthNameToMonthCard() {
    const monthsObj = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'June', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
    const divs = document.querySelectorAll('.month-card')
    const h = document.createElement('h5')
    for (let i=0; i<divs.length; i++) {
      const monthName = divs[i].id
      h.innerText = monthsObj[monthName]
      divs[i].insertAdjacentText('afterbegin', h.innerText)
    }
    
  }

  static addWeekDayToBigCard() {
    const divs = document.querySelectorAll('.big-card')
    const h = document.createElement('h5')
    for (let i=0; i<divs.length; i++) {
      // const card = divs[i].querySelectorAll('.card-content');
      // console.log(card)
      const dayAsNum = (new Date(divs[i].id)).getDay()
      h.innerText = daysObj[`${dayAsNum}`]
      // let text = daysObj[`${dayAsNum}`]
      
      divs[i].insertAdjacentElement('afterbegin', h)
      // card[0].insertAdjacentElement('afterbegin', h)
      // divs[i].insertBefore(h, null)
    }
    
    // divs.forEach( div => 
    //   dateStr= Date(div.id);
    //   newDate = new Date(dateStr);
    //   dayAsNum = dateJs.getDay();
    //   h.innerText = daysObj[`${dayAsNum}`];
    //   div.insertAdjacentElement('afterbegin', h)
    //   )
    
    // divs.forEach( div => console.log(div))
  }

  static createNewTask(e) {
    e.preventDefault()
    const categoryName = getCategoryName()
    const taskContent = getTaskContent()
    let strongParams = {
        category: {name: categoryName},
        task: {
            content: Formatter.titleize(taskContent),
        }
    }
    Api.post('/tasks', strongParams)
    .then(data => {
        let task = new Task(data)
        task.render()
        // console.log('here')
        // console.log((completedTasksArray.length))
        // console.log((totalTasks + 1))
        // updateRenderedCircle((completedTasksArray.length)/ (totalTasks) * 100)
        // console.log((completedTasksArray.length)/ (totalTasks + 1) * 100)
        // console.log('----------')
        clearNewTaskForm()
        toggleNewFormButton()
        // Task.getTasks()
        Task.apiCallUpdateRenderedCircle()
    })
  }

  static apiCallUpdateRenderedCircle() {
    let completedTasksA = []
    Api.get('/tasks')
      .then(function (data) {
        // console.log('here')
        totalTasks = data.length
        data.forEach( task => {
          if (task.completed === true) {
            completedTasksA.push(task)
          }
        })
        // console.log(completedTasksA.length)
        // console.log(totalTasks)
        // console.log(completedTasksA.length / totalTasks * 100)
      })
      .then(function() {
        updateRenderedCircle(completedTasksA.length / totalTasks * 100)
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
            Task.completedTasksArray.push(task)
          }
        })
      })
      .then(function () {
        renderCirlce(Task.completedTasksArray.length / totalTasks * 100)
      })
      // .catch(errors => console.log(errors))
  }

  static deleteTask(event) {
    const eventID = event.target.dataset.id 
    Api.delete(`/tasks/${eventID}`)
    .then(function () {
        const allDeleteButtons = document.querySelectorAll('.delete-button')
        for (let i=0; i<allDeleteButtons.length; i++) {
            if (allDeleteButtons[i].dataset.id === eventID) {
            // allDeleteButtons[i].parentElement.id = 'hide-complete'
            allDeleteButtons[i].parentElement.remove()
        }
      }
      // Task.all = Task.all.filter((task) => task.id !== eventID)
      Task.apiCallUpdateRenderedCircle()
      // updateRenderedCircle((completedTasksArray.length - 1)/ (totalTasks-1) * 100)
      
    })
    .then(function () {
    // Task.apiCallUpdateRenderedCircle()
    })
    // .then(console.log('here'))
  }

  static completeTask(event) {
    const eventID = event.target.dataset.id
    Api.patch(`/tasks/${eventID}`, {
        "completed": true
        }
      )
      .then(function (json) {
        Task.renderCompleted(json)
      })
      .then(function() {
        Task.apiCallUpdateRenderedCircle()
        // renderCirlce(percentCompleted)
        // renderCirlce((completedTasksArray.length + 1)/ totalTasks * 100)
        // updateRenderedCircle((completedTasksArray.length + 1)/ totalTasks * 100)

      })
      .catch(errors => console.log(errors))
  }
  
  static renderCompleted(json) {
    const allCompletedButtons = document.querySelectorAll('.completed-button')
    for (let i=0; i<allCompletedButtons.length; i++) {
      if (parseInt(allCompletedButtons[i].dataset.id) === json.id) {
        Task.colorTask(json, allCompletedButtons[i])
      }
    }
  }

  static colorTask(json, button) {
    button.classList.add(`completed-task-${colorObj[json.category_id]}`)
  }
  

}