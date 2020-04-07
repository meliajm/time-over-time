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