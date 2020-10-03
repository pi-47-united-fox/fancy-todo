let Todos = []
$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    }
    else {
        beforeLogin()
    }
})

// before-after login functionalities
function afterLogin(){
    // register and login form
    $("#register").hide()
    $("#loginForm").hide()
    // Navbar
    $("#HomeNav").show()
    $("#RegisterNav").hide()
    $("#NewTodoNav").show()
    $("#logout").show()
    // after login content
    $("#contentTodos").show()
    $("#jumbotron_addTodoForm").hide()
    $("#jumbotron_editTodoForm").hide()
    fetchTodo()
}

function beforeLogin(){
    // register and login form
    $("#register").hide()
    $("#loginForm").show()
    // Navbar
    $("#HomeNav").hide()
    $("#RegisterNav").show()
    $("#NewTodoNav").hide()
    $("#logout").hide()
    // after login content
    $("#contentTodos").hide()
    $("#jumbotron_addTodoForm").hide()
    $("#jumbotron_editTodoForm").hide()

}

// utitlity functions
function showRegisterForm(){
    $("#register").show()
    $("#loginForm").hide()
}

function showLoginForm(){
    $("#register").hide()
    $("#loginForm").show()
}

$("#logout").click(function (){
    localStorage.removeItem('access_token')
    beforeLogin()
    signOut() //google sign out
})

function showAddForm(){
    $("#contentTodos").hide()
    $("#jumbotron_addTodoForm").show()
    
}

// user login
function login(event) {
    event.preventDefault()
    let email = $('#input_email').val()
    let password = $('#input_password').val()
    // console.log(email, password)
    // afterLogin()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email,
            password
        }
    })
        .done(result => {
            // console.log(result)
            localStorage.access_token = result.access_token
            afterLogin()
        })
        .fail(err => {
            // console.log('Error')
            beforeLogin()
            $("#login_error_message").empty()
            $("#login_error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
        .always(() => {
            console.log('Complete')
            // $('#loginForm').trigger("reset")
        })
}

// user register
function register(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    // console.log(name, email, password)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
        .done(() => {
            // console.log(result)
            beforeLogin()
        })
        .fail(err => {
            // console.log('Error')
            showRegisterForm()
            $("#register_error_message").empty()
            $("#register_error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
        .always(() => {
            console.log('Complete')
            // $('#registerForm').trigger("reset")
        })
}

// read todos
function fetchTodo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // console.log(result)
            Todos = result
            $("#todos").empty()
            $.each(result, function (key, value) {
                $("#todos").append(`
                <div class="col-4 mb-2">
                    <div class="card text-dark border-dark" style="width: 18rem;">
                    <div class="card-header"><h3>${value.title}</h3></div>
                    <img src="https://steelcase-res.cloudinary.com/image/upload/c_fill,dpr_auto,q_70,h_656,w_1166/v1583265056/www.steelcase.com/2020/03/03/20-0136082-CROP.jpg" class="img-thumbnail"></img>
                    <div class="card-body">
                        <button type="button" class="btn btn-dark" onclick="updateTrack(${value.id}, event)">Track</button>
                        <p class="card-text">Description: ${value.description}<p>
                        <p class="card-text">Track: ${(!value.track) ? "Click 'track' to add music" : value.track}<p>
                        <p class="card-text">Status: ${value.status}</p>
                        <p class="card-text">Due date: ${(value.due_date).substring(0, 10)}<p>
                        <button type="button" class="btn btn-primary" onclick="updateTodo(${value.id}, event)">Edit</button>
                        <button type="button" class="btn btn-info" onclick="patchTodo(${value.id}, event)">Status</button>
                        <button type="button" class="btn btn-danger" onclick="removeTodo(${value.id}, event)">Delete</button>
                        </div>
                    </div>
                </div>
                `)
            })
        })
        .fail(err => {
            // console.log('Error')
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })

}

// create
function addTodo(event){
    event.preventDefault()
    let title = $("#title").val()
    let description = $("#description").val()
    let status = $("#status").val()
    let due_date = $("#date").val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        data: {
            title,
            description,
            status,
            due_date
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            afterLogin()
        })
        .fail(err => {
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
        .always(() => {
            $('#addTravelForm').trigger("reset")
        })

}

// update
function updateTodo(id, event){
    event.preventDefault()
    $("#contentTodos").hide()
    $("#jumbotron_editTodoForm").show()
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // append the data from "result"
            let data = result
            console.log(data)
            $("#editTodoForm").empty()
            $("#editTodoForm").append(`
            <form onsubmit="updateToDb(${data.id}, event)">
                <h3>Edit</h3>
                <div class="form-group">
                    <label for="edit-title">Title</label>
                    <input type="text" class="form-control" id="edit-title" value="${data.title}">
                </div>
                <div class="form-group">
                    <label for="edit-description">Description</label>
                    <input type="text" class="form-control" id="edit-description" value="${data.description}">
                </div>
                <div class="form-group">
                    <label for="edit-status">Status</label>
                    <select class="form-control" id="edit-status">  
                        <option>Please select one</option>
                        <option value="On progress" ${data.status === "On progress" ? "selected" : ""}>On progress</option>
                        <option value="Cancel" ${data.status === "Cancel" ? "selected" : ""}>Cancel</option>
                        <option value="Done" ${data.status === "Done" ? "selected" : ""}>Done</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-date">Due Date</label>
                    <input type="date" class="form-control" id="edit-date" value="${data.due_date.substring(0, 10)}">
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-danger" onclick="afterLogin()">Cancel</button>
            </form>
            `)

        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

function updateToDb(id, event){
    event.preventDefault()
    let title = $("#edit-title").val()
    let description = $("#edit-description").val()
    let status = $("#edit-status").val()
    let due_date = $("#edit-date").val()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
        .done(() => {
            afterLogin()
            $("#error_message").empty()
        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

// patch status
function patchTodo(id, event){
    event.preventDefault()
    $("#contentTodos").hide()
    $("#jumbotron_editTodoForm").show()
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(result => {
            // append the data from "result"
            let data = result
            console.log(data)
            $("#editTodoForm").empty()
            $("#editTodoForm").append(`
            <form onsubmit="patchToDb(${data.id}, event)">
                <h3>Edit</h3>
                <div class="form-group">
                    <label for="modify-title">Title</label>
                    <input type="text" class="form-control" id="modify-title" value="${data.title}" disabled>
                </div>
                <div class="form-group">
                    <label for="modify-description">Description</label>
                    <input type="text" class="form-control" id="modify-description" value="${data.description}" disabled>
                </div>
                <div class="form-group">
                    <label for="modify-status">Status</label>
                    <select class="form-control" id="modify-status">  
                        <option>Please select one</option>
                        <option value="On progress" ${data.status === "On progress" ? "selected" : ""}>On progress</option>
                        <option value="Cancel" ${data.status === "Cancel" ? "selected" : ""}>Cancel</option>
                        <option value="Done" ${data.status === "Done" ? "selected" : ""}>Done</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="modify-date">Due Date</label>
                    <input type="date" class="form-control" id="modify-date" value="${data.due_date.substring(0, 10)}" disabled>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-danger" onclick="afterLogin()">Cancel</button>
            </form>
            `)

        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

function patchToDb(id, event){
    event.preventDefault()
    let status = $("#modify-status").val()
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: { status }
    })
        .done(() => {
            afterLogin()
            $("#error_message").empty()
        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

// delete
function removeTodo(id, event){
    event.preventDefault()
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            afterLogin()
        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

// update track
function updateTrack(id, event){
    event.preventDefault()
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}/music`,
        headers: {
            access_token: localStorage.access_token
        }
    })
        .done(() => {
            afterLogin()
            $("#error_message").empty()
        })
        .fail(err => {
            // console.log(err)
            afterLogin()
            $("#error_message").empty()
            $("#error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

// social login
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var google_access_token = googleUser.getAuthResponse().id_token;
    // console.log(google_access_token)
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers:{
            google_access_token
        }
    })
        .done(result => {
            localStorage.setItem("access_token", result.access_token)
            afterLogin()
        })
        .fail(err => {
            beforeLogin()
            $("#login_error_message").empty()
            $("#login_error_message").append(`
            <p>${err.responseJSON.message}</p>
            `)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}