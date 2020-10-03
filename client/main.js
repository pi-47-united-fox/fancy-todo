
$(document).ready(() => {
    if(!localStorage.access_token) {
        hideAll()
        $("#login-form").show()
    } else {
        afterLogin()
    }
})

function afterLogin() {
    $('.after-login').show()
    $('.before-login').hide()
}

function beforeLogin() {
    $('.after-login').hide()
    $('.before-login').show()
}

function hideAll() {
    $('.after-login').hide()
    $('.before-login').hide()
    $('#todo-list-dashboard').hide()
    $('#todo-list-form').hide()
    $('#view-todo-details').hide()
    $("#view-todo-details").hide()


}

function backToHome() {
    hideAll()
    viewAllTodosOfUser()
    $('#todo-list-dashboard').show()
}


// Login using email and password
function loginApp(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    console.log(email, password)
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: email,
            password: password
        }
    })
    .done(result => {
        localStorage.setItem('access_token', `${result.access_token}`)
        console.log("Success")
        afterLogin()
    })
    .fail(error => {
        console.log(error)
    })
    .always(() => {
      $('#email').val('')
      $('#password').val('')
    })
}


// Click login on nav
$("#btn-login").click(() => {
    hideAll()
    $("#login-form").show()
})

// Click register on nav
$("#btn-register").click(() => {
    hideAll()
    $("#signup-form").show()
})

// Register a new user
function register(event) {
    event.preventDefault()
    let emailInput = $('#emailregister').val()
    let passwordInput = $('#passwordregister').val()
    console.log("masuk")
    
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email: emailInput,
            password: passwordInput
        }
    })
    .done(result => {
        console.log("success")
        hideAll()
        $("#login-form").show()
    })
    .fail(err => {
        console.log(err)
    })

}

// Sign in with google
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax({
        method: "POST",
        url: 'http://localhost:3000/googlelogin',
        headers : {
            google_access_token : id_token
        }
    })
    .done(result => {
        localStorage.setItem('access_token', result.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log(err)
    })

 }

// Signout
function signOutAll() {
    localStorage.removeItem('access_token');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

$("#btn-logout").click(()=> {
    signOutAll()
    hideAll()
    $("#login-form").show()
})


$("#btn-add-todo-form").click(() => {
    hideAll()
    $("#todo-list-form").show()
})

$("#btn-nav-my-todo-list").click(() => {
    hideAll()
    $("#todo-list-dashboard").show()
    viewAllTodosOfUser()
})

// Add new todo list
// -> Add tradional todo list
function addTodoListItem(event) {
    event.preventDefault()
    let title = $("#titleInputAddTask").val()
    let description = $("#descriptionInputAddTask").val()
    let due_date = $("#dueDateInputAddTask").val()

    $.ajax({
        method: "POST",
        url: 'http://localhost:3000/todos',
        headers: {access_token: localStorage.access_token},
        data: {
            title: title,
            description: description,
            due_date: due_date
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
}

// -> Add writing todo list
function addTodoWrite(event) {
    event.preventDefault()
    let topic = $("#topicInput").val()
    $.ajax({
        method: "POST",
        url: `http://localhost:3000/dowrite?search=${topic}`,
        headers: { access_token: localStorage.access_token },
    })
    .done(result => {
        console.log(result)
        hideAll()
        $("#todo-list-dashboard").show()
    })
    .fail(err => {
        console.log(err)
    })
}

// view todo list dashboard
function viewAllTodosOfUser() {
    $("#user-todo-list").empty()
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/dashboard",
        headers: { access_token: localStorage.access_token }
    })
    .done(result => {
        $.each(result, (key, value) => {
            console.log(value)
            $("#user-todo-list").append(`
            <div class="todo-list-item">
                <div class="card" style="width: 30rem;">
                    <div class="card-body">
                    <h5 class="card-title">${value.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${value.due_date} (${value.status})</h6>
                    <p class="card-text">${value.description}</p>

                    <button type="button" class="btn btn-primary btn-sm" onclick="viewTodoItemById(${value.id})">View</button>
                    <button type="button" class="btn btn-secondary btn-sm">Edit</button>
                    <button type="button" class="btn btn-success btn-sm" onclick="completeTodoItem(${value.id})">Complete</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodoItem(${value.id})">Delete</button>

                    </div>
                </div>
            </div>

            `)
        })
    })

}


// view todo list details by id
function viewTodoItemById(id) {
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(result => {
        console.log(result)
        hideAll()
        $("#view-todo-details").empty()
        $("#view-todo-details").show()
        $("#view-todo-details").append(`
        <h1>Todo Details</h1>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="showEditForm(${result})">Edit</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="deleteTodoItem(${result.id})">Delete</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onclick="backToHome()">Back</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title"><b>${result.title}</b></h5>
            <p class="card-text text-muted">Deadline: ${result.due_date} (${result.status})</p>
            <p class="card-text">${result.description}</p>
            <a href="#" class="btn btn-primary" onclick="completeTodoItem(${result.id})">Mark as Complete</a>
          </div>
        </div>
        
        `)

    })
}

// Delete todo list
function deleteTodoItem(id) {
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(result => {
        console.log(result, "success")
        hideAll()
        backToHome()
    })
    .fail(err => {
        console.log(err, "Error")
    })

}

// Mark as complete todo list
function completeTodoItem(id) {
    $.ajax({
        method: "PATCH",
        url: `http://localhost:3000/todos/${id}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(result => {
        console.log(result, "success")
        backToHome()
    })
    .fail(err => {
        console.log(err, "Error")
    })

}

// edit todo show form
function showEditForm(object){
    console.log(object)
    hideAll()
    $("#edit-form-update").append(`
    <br>
    <h1>Edit Task</h1>
    <div class="card">
      <div class="card-body">
        <div>
          <p><b>Please update the data</b><p>
          <form onsubmit="editTodoListItem(event)">
            <div class="form-group">
              <label for="titleInputEditTask">Title</label>
              <input type="text" class="form-control" name="titleInputEditTask" id="titleInputEditTask" value=${object.title}>
            </div>
  
            <div class="form-group">
              <label for="descriptionInputEditTask">Description</label>
              <textarea class="form-control" id="descriptionInputEditTask" rows="3" value=${object.description}></textarea>
            </div>

            <div class="form-group">
              <label for="statusInputEditTask">Status</label>
              <input type="text" class="form-control" name="statusInputEditTask" id="statusInputEditTask" value=${object.status}>
            </div>
  
            <div class="form-group">
              <label for="dueDateInputEditTask">Due Date</label>
              <input type="date" class="form-control" name="dueDateInputEditTask" id="dueDateInputEditTask" value=${object.due_date}>
            </div>
            
            <button type="submit" class="add btn btn-primary font-weight-bold todo-list-add-btn">Update task</button>
          </form>

        </div>
      </div>
    </div>
    
    `)
    $("#edit-form-update").show()


}


// edit todo function
function editTodoListItem(event) {
    event.preventDefault()
    let title = $("#titleInputEditTask").val()
    let description = $("#descriptionInputEditTask").val()
    let status = $("#statusInputEditTask").val()
    let due_date = $("#dueDateInputEditTask").val()

    $.ajax({
        method: "UPDATE",
        url: 'http://localhost:3000/todos',
        headers: {access_token: localStorage.access_token},
        data: {
            title: title,
            description: description,
            status: status,
            due_date: due_date
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
}