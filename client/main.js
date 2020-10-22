$(document).ready(function () {
    if (localStorage.access_token) {
        afterLogin()
    } else {
        beforeLogin()
    }
});

// -----------------button------------

$("#btn-register").click(function () {
    $("#register").show()
    $("#login").hide()
});

$("#btn-login").click(function () {
    $("#register").hide()
    $("#login").show()
});

$("#btn-logout").click(function () { // token dihapus --> tampilkan form login
    localStorage.clear()
    $("#email").val()
    $("#password").val()
    signOutGoogle()
    $('#addTodos').hide()
    $('#updateTodos').hide()
    $(".after-login").hide()
    beforeLogin()
});

// ---------------------after-before login-------------

function afterLogin() {
    fetchTodo()
    $(".after-login").show()
    $(".before-login").hide()
    $("#btn-logout").show()
    $('#btn-login').hide()
    $('#register').hide()
    $('#btn-register').hide()
    $('#addTodos').show()
    
}

function beforeLogin() {
    $(".after-login").hide()
    $(".before-login").show()
    $("#btn-logout").hide()
    $('#register').hide()
    $('#btn-login').show()
    $('#btn-register').show()
    $('#addTodos').hide()
    $('#updateTodos').hide()
}


// ---------------------function Login-------------

function loginApp(event) {
    event.preventDefault()
    let email = $("#login-email").val()
    let password = $("#login-password").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email, password
        }
    })
    .done(result => {
        console.log(result.UserId, "Success login")
        // localStorage.access_token = result.access_token
        localStorage.setItem('UserId',result.UserId)
        localStorage.setItem('access_token', result.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log("error", error)
    })
}

function registerApp(event) {
    event.preventDefault()
    let email = $("#register-email").val()
    let password = $("#register-password").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email,
            password
        }
    })
    .done(result => {
        console.log(result,'Result register')
        $('#login').show()
        $('#register').hide()
    })
    .fail(err => {
        console.log("Error register", err)
    })
}

// ----------------- function Data Manipulation -----------------
function fetchTodo() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        let Todos = result
        $("#todolist").empty()
        $.each(Todos, function(key, value){
            console.log(value.id)
            $("#todolist").append(`
        <div class="col-4 mb-2">
      <div class="card" style="width: 18rem;">
        <img src="${value.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><b>${value.title}</b></h5>
          <p class="card-text">${value.description}</p>
          <p class="card-text">Artist: <b>${value.artist}</b></p>
          <p class="card-text">Song: <b>${value.song}</b></p>
          <p class="card-text">Status: <b>${value.status}</b></p>
          <a href="${value.link}" class="btn btn-primary btn-lg btn-block">Dengerin musiknya</a><br>
          <button class="btn btn-outline-danger btn-block" onclick="deleteTodo(${value.id})">Delete</button>
          <button class="btn btn-outline-primary btn-block" onclick="updateTodo(${value.id},event)">Edit</button>
          <button class="btn btn-outline-success btn-block" onclick="patchTodo(${value.id},event)">Completed</button>
        </div>
      </div>
    </div>
    `)
        })
    })
    .fail(err => {
        console.log("error", err)
    })
}

function addTodos(event) {
    event.preventDefault()
    let title = $("#title").val()
    let description = $("#description").val()
    let due_date = $("#due_date").val()
    let artist = $("#artist").val()
  
    $.ajax({
      method:'POST',
      url:'http://localhost:3000/todos',
      data:{
          title : title,
          description: description,
          due_date: due_date,
          artist: artist,
          UserId : localStorage.UserId
      },
      headers:{
        access_token:localStorage.access_token
      }
    })
    .done(result=>{
    //   console.log(result)
        fetchTodo()
        afterLogin()
    })
    .fail(err =>{
      console.log(err)
    })
}

function deleteTodo(input){
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/todos/${input}`,
      headers: {
          access_token: localStorage.access_token
      }
    })
    .done(result=>{
      console.log(result)
      fetchTodo()
    })
    .fail(err=>{
      console.log(error, 'error')
    })
}

function updateTodo(input, event){
    event.preventDefault()
    $('#todolist').hide()
    $('#addTodos').hide()
    $('#updateTodos').show()

    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${input}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        let Todos = result
        console.log(Todos)
        $("#updateTodos").empty()
        $("#updateTodos").append(`
        <h2>Edit your Todo list</h2>
        <form>
            <div class="form-group">
                <label for="titletodos">Title Todos</label>
                <input type="text" class="form-control " value="${result.title}" name="title" id="title">
            </div>
            <div class="form-group">
                <label for="descriptiontodos">Description</label>
                <input type="text" class="form-control" value="${result.description}" name="description" id="description">
            </div>
            <div class="form-group">
                <label for="duedatetodos">Due Date</label>
                <input type="date" class="form-control" value="${result.due_date}" name="due_date" id="due_date">
            </div>
            <div class="form-group">
                <label for="artisttodos">Music Artist</label>
                <input type="text" class="form-control" name="${result.artist}" value="artist" id="artist">
            </div>
            <button type="submit" class="btn btn-primary" onsubmit="putTodo(${result.id}, event)">Update</button>
        </form>
        `)
    })

}

function putTodo(input,event){
    event.preventDefault()
    let title = $("#title").val()
    let description = $("#description").val()
    let due_date = $("#due_date").val()
    let artist = $("#artist").val()

    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${input}`,
        data: {
            title : title,
            description: description,
            due_date: due_date,
            artist: artist
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        console.log(result)
        fetchData()
        afterLogin()
    })
    .fail(err => {
        console.log("error", err)
    })
}

function patchTodo(input){
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/todos/${input}`,
        data: {
            status: "Completed"
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(result => {
        console.log(result)
        afterLogin()
    })
    .fail(err => {
        console.log("error", err)
    })
}

// ---------------------login Google---------------

function onSignIn(googleUser) {
    console.log('masuk googleloginclient')
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/googleLogin',
        headers: {
            google_access_token : id_token
        }
    })
    .done(result => {
        localStorage.setItem('UserId',result.UserId)
        localStorage.setItem('access_token',result.access_token)
        afterLogin()
    })
    .fail(err => {
        console.log('error', err)
    })
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}